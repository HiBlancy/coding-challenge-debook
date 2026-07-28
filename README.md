# 🚀 Debook — Prueba Técnica Full-Stack

Reto **corto pero intenso**: un trozo real de Debook de punta a punta. Buscamos criterio de ingeniería, no cantidad de features.

Construyes la **pantalla de perfil** de un usuario y su feed de _Convos_, con la API que la alimenta. La app consume el backend que tú mismo completas.

- 📱 [`frontend/`](./frontend/README.md) — **React Native + Expo + TypeScript** (Expo Router, React Query, Zustand, Reanimated).
- ⚙️ [`backend/`](./backend/README.md) — **NestJS + TypeScript + PostgreSQL** (TypeORM).

**Diseño (Figma):** <https://www.figma.com/design/ef5IRANCX4qEFsh50z4CpL/Prueba-Full-Stack-Debook?node-id=1-1503>

> Ambas partes ya **arrancan**. Tu trabajo es completar lo marcado con `TODO` y llevar la UI a **pixel perfect** con el Figma. Lee el README de cada carpeta.

---

## 🎯 Qué construyes

1. **Backend** — sobre los datos ya sembrados:
   - `GET /v1/users/:id/posts` — los posts del perfil, paginados y con contadores.
   - `POST` / `DELETE` `/v1/posts/:id/like` — dar / quitar like.
2. **Frontend** — consume esos endpoints y reproduce la pantalla del Figma, con la lista de posts (estados de carga/vacío/error) y el like desde la app.

No hay pantalla de "publicar post": los posts se insertan por seed.

---

## 🧭 Cómo entregar

1. **Crea un repositorio Git privado tuyo** a partir de este (súbelo a tu repo, conservando el historial de commits).
2. Trabaja ahí, con **commits pequeños y descriptivos**.
3. Al terminar:
   - **Invita como colaborador a `fran@debook.app`**.
   - Envía un email a **`fran@debook.app`** y **`ernest@debook.app`** con el link del repo y un párrafo breve: qué construiste, qué decisiones tomaste y qué dejarías para una v2.

> `.claude/`, `CLAUDE.md`, `AGENTS.md` y `.ai-logs/` viajan con el repo. No los borres.

---

## 🤖 Uso de IA: permitido y evaluado

En Debook trabajamos a diario con IA (Claude Code, Codex, Cursor...), así que **puedes y debes usarla**. Pero no evaluamos solo el código final — **evaluamos cómo trabajas con la IA**: qué le pides, cómo iteras, qué decides tú y qué delegas, y cómo revisas lo que te genera.

Este repo ya trae el registro montado:

- **Claude Code** (recomendado): los hooks de `.claude/` guardan tus prompts y transcripciones en `.ai-logs/` automáticamente. Acepta los hooks cuando te lo pida.
- **Otra herramienta** (Codex, Cursor...): `AGENTS.md` le indica que mantenga `.ai-logs/agent-log.md`. Comprueba de vez en cuando que lo hace.
- **Chat externo** (ChatGPT, Claude.ai...): exporta la conversación a un archivo dentro de `.ai-logs/`.

**Reglas:**

1. **Incluye `.ai-logs/` en tus commits.** Una entrega sin logs (o vaciados) se considera incompleta, salvo que hicieras la prueba sin IA (indícalo en tu README).
2. **No edites ni "limpies" los logs.** Un log real, con idas y venidas, dice más de ti que uno impecable.
3. En la entrevista repasaremos juntos algunos momentos del log.

---

## ⏱️ Tiempo orientativo

Pensado para unas **pocas horas**. Si algo te llevaría demasiado, **decide, hazlo simple y explícalo** en tu README. Ese criterio también puntúa.

¡Suerte! 🍀
