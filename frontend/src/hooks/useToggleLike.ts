import type { Post } from '@/types';

/**
 * 🚧 TODO — Dar/quitar like. Usa `likePost` / `unlikePost` (`@/api/posts`).
 * Devuelve `toggle()` para el botón y un flag `isPending`.
 */
export function useToggleLike(post: Post): {
  toggle: () => void;
  isPending: boolean;
} {
  void post;
  return {
    toggle: () => {
      throw new Error('TODO: implementa useToggleLike');
    },
    isPending: false,
  };
}
