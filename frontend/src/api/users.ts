import { api } from './client';
import type { PostsPage, UserProfile } from '@/types';

export async function fetchProfile(userId: string): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>(`/users/${userId}`);
  return data;
}

export async function fetchProfilePosts(
  userId: string,
  cursor?: string,
  limit = 10,
): Promise<PostsPage> {
  const { data } = await api.get<PostsPage>(`/users/${userId}/posts`, {
    params: { cursor, limit },
  });
  return data;
}
