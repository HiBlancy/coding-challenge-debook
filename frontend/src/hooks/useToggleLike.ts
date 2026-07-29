import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { likePost, unlikePost } from '@/api/posts';
import { PROFILE_USER_ID } from '@/api/client';
import { useLikesStore } from '@/store/likes';
import type { LikeResult, Post, PostsPage } from '@/types';

const profilePostsKey = ['profilePosts', PROFILE_USER_ID] as const;

type PostsCache = InfiniteData<PostsPage>;

function mapPostInCache(
  data: PostsCache | undefined,
  postId: string,
  map: (post: Post) => Post,
): PostsCache | undefined {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.map((item) =>
        item.id === postId ? map(item) : item,
      ),
    })),
  };
}

/**
 * Like / unlike con update optimista sobre el caché de `useProfilePosts`.
 */
export function useToggleLike(): {
  toggleLike: (post: Post) => void;
  isPending: (postId: string) => boolean;
} {
  const queryClient = useQueryClient();
  const pendingMap = useLikesStore((state) => state.pending);
  const setPending = useLikesStore((state) => state.setPending);

  const mutation = useMutation({
    mutationFn: (post: Post) =>
      post.likedByMe ? unlikePost(post.id) : likePost(post.id),

    onMutate: async (post) => {
      setPending(post.id, true);
      await queryClient.cancelQueries({ queryKey: profilePostsKey });

      const previous =
        queryClient.getQueryData<PostsCache>(profilePostsKey);

      queryClient.setQueryData<PostsCache>(profilePostsKey, (current) =>
        mapPostInCache(current, post.id, (item) => {
          const likedByMe = !item.likedByMe;
          return {
            ...item,
            likedByMe,
            likesCount: Math.max(
              0,
              item.likesCount + (likedByMe ? 1 : -1),
            ),
          };
        }),
      );

      return { previous, postId: post.id };
    },

    onError: (_error, post, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(profilePostsKey, context.previous);
      }
      setPending(post.id, false);
    },

    onSuccess: (result: LikeResult) => {
      queryClient.setQueryData<PostsCache>(profilePostsKey, (current) =>
        mapPostInCache(current, result.postId, (item) => ({
          ...item,
          likedByMe: result.likedByMe,
          likesCount: result.likesCount,
        })),
      );
    },

    onSettled: (_data, _error, post) => {
      setPending(post.id, false);
    },
  });

  return {
    toggleLike: (post: Post) => {
      if (pendingMap[post.id]) return;
      mutation.mutate(post);
    },
    isPending: (postId: string) => Boolean(pendingMap[postId]),
  };
}
