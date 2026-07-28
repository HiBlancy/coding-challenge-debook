import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * Auth simplificada para la prueba: el usuario autenticado se identifica con la
 * cabecera `x-user-id`. En producción esto vendría de un JWT / guard real.
 *
 * Uso:  like(@CurrentUserId() userId: string, ...)
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const userId = request.header('x-user-id');

    if (!userId) {
      throw new UnauthorizedException(
        'Falta la cabecera x-user-id (auth simplificada de la prueba).',
      );
    }

    return userId;
  },
);
