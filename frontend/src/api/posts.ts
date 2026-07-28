import { api } from './client';
import type { LikeResult } from '@/types';

export async function likePost(postId: string): Promise<LikeResult> {
  const { data } = await api.post<LikeResult>(`/posts/${postId}/like`);
  return data;
}

export async function unlikePost(postId: string): Promise<LikeResult> {
  const { data } = await api.delete<LikeResult>(`/posts/${postId}/like`);
  return data;
}
