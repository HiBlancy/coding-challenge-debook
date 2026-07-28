import type { Post } from '@/types';

/**
 * 🚧 TODO — Posts del perfil (paginados). Usa `fetchProfilePosts`
 * (`@/api/users`) y expón la forma de abajo para la lista y sus estados.
 */
export function useProfilePosts(userId: string): {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
} {
  void userId;
  // Placeholder para que la pantalla compile mientras lo implementas.
  return {
    posts: [],
    isLoading: false,
    isError: false,
    refetch: () => {},
    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
  };
}
