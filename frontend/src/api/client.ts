import axios from 'axios';
import { Platform } from 'react-native';

/**
 * Base URL de la API.
 *
 * - iOS simulator / web: `localhost` funciona.
 * - Android emulator: `localhost` apunta al propio emulador → usa `10.0.2.2`.
 * - Dispositivo físico: usa la IP de tu ordenador en la LAN.
 *
 * Puedes sobreescribirla con la env pública `EXPO_PUBLIC_API_URL`.
 */
const DEFAULT_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const baseURL =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${DEFAULT_HOST}:3000/v1`;

/**
 * Auth simplificada: el backend identifica al usuario con `x-user-id`.
 * Por defecto usamos a "Mario" (el usuario de la barra inferior del diseño),
 * que es quien da los likes. Coincide con el seed del backend.
 */
export const CURRENT_USER_ID = '33333333-3333-3333-3333-333333333333';

/** ID del perfil que se muestra (Alberto), según el seed del backend. */
export const PROFILE_USER_ID = '11111111-1111-1111-1111-111111111111';

export const api = axios.create({
  baseURL,
  headers: {
    'x-user-id': CURRENT_USER_ID,
  },
});
