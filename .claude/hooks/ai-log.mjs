#!/usr/bin/env node
/**
 * Debook coding challenge — AI usage logger (hook de Claude Code)
 *
 * Registra en .ai-logs/ :
 *   - prompts.jsonl          → cada prompt que el candidato envía (evento UserPromptSubmit)
 *   - session-<id>.jsonl     → transcripción completa de la sesión (prompts, respuestas,
 *                              herramientas usadas), copiada en cada Stop / SessionEnd
 *   - session-<id>.md        → versión legible de la conversación para revisión rápida
 *
 * Nunca bloquea el flujo del candidato: cualquier error termina con exit 0.
 * Requiere Node >= 16 (ya necesario para la prueba). Funciona en Windows/macOS/Linux.
 */
import {
  appendFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter((b) => b && b.type === 'text' && typeof b.text === 'string')
      .map((b) => b.text)
      .join('\n');
  }
  return '';
}

function transcriptToMarkdown(jsonlPath) {
  const lines = readFileSync(jsonlPath, 'utf8').split('\n').filter(Boolean);
  const out = ['# Sesión de IA — transcripción legible\n'];
  for (const line of lines) {
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    if (obj.type !== 'user' && obj.type !== 'assistant') continue;
    const text = extractText(obj.message?.content).trim();
    if (!text) continue;
    const who = obj.type === 'user' ? '🧑 Candidato' : '🤖 Asistente';
    const ts = obj.timestamp ? ` — ${obj.timestamp}` : '';
    out.push(`## ${who}${ts}\n\n${text}\n`);
  }
  return out.join('\n');
}

try {
  const input = JSON.parse(readStdin() || '{}');
  const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
  const logDir = path.join(projectDir, '.ai-logs');
  mkdirSync(logDir, { recursive: true });

  const event = input.hook_event_name;
  const sid = String(input.session_id || 'unknown').slice(0, 8);

  if (event === 'UserPromptSubmit') {
    const entry = {
      ts: new Date().toISOString(),
      session: sid,
      prompt: input.prompt ?? '',
    };
    appendFileSync(path.join(logDir, 'prompts.jsonl'), JSON.stringify(entry) + '\n', 'utf8');
  }

  if (
    (event === 'Stop' || event === 'SessionEnd') &&
    input.transcript_path &&
    existsSync(input.transcript_path)
  ) {
    copyFileSync(input.transcript_path, path.join(logDir, `session-${sid}.jsonl`));
    try {
      writeFileSync(
        path.join(logDir, `session-${sid}.md`),
        transcriptToMarkdown(input.transcript_path),
        'utf8',
      );
    } catch {
      /* la copia .jsonl ya garantiza el registro */
    }
  }
} catch {
  /* nunca romper la sesión del candidato */
}
process.exit(0);
