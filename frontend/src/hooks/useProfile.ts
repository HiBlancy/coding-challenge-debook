import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/api/users';

/**
 * ✅ IMPLEMENTADO — referencia del estilo esperado (React Query + tipado).
 * Trae el header del perfil.
 */
export function useProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId),
    staleTime: 60_000,
  });
}
