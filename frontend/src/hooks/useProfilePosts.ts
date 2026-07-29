import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProfilePosts } from '@/api/users';
import type { Post } from '@/types';

/**
 * Posts del perfil (paginados) vía React Query infinite query.
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
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['profilePosts', userId],
    queryFn: ({ pageParam }) =>
      fetchProfilePosts(userId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 60_000,
  });

  return {
    posts: (data?.pages ?? []).flatMap((page) => page.items),
    isLoading,
    isError,
    refetch: () => {
      void refetch();
    },
    fetchNextPage: () => {
      void fetchNextPage();
    },
    hasNextPage,
    isFetchingNextPage,
  };
}
