import { create } from 'zustand';

/**
 * Estado local de likes "en vuelo" (Zustand). Te dejamos el store montado;
 * úsalo (o no) desde `useToggleLike` como veas.
 */
interface LikesState {
  /** postId → hay una petición de like/unlike en curso. */
  pending: Record<string, boolean>;
  isPending: (postId: string) => boolean;
  setPending: (postId: string, value: boolean) => void;
}

export const useLikesStore = create<LikesState>((set, get) => ({
  pending: {},
  isPending: (postId) => Boolean(get().pending[postId]),
  setPending: (postId, value) =>
    set((state) => ({ pending: { ...state.pending, [postId]: value } })),
}));
