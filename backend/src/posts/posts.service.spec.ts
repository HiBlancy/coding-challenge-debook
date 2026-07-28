import { NotFoundException } from '@nestjs/common';
import { DataSource, MoreThan } from 'typeorm';
import { LikeEntity } from '../likes/like.entity';
import { PostEntity } from './post.entity';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  const postId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  const userId = '33333333-3333-3333-3333-333333333333';

  let service: PostsService;
  let mockManager: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    delete: jest.Mock;
    increment: jest.Mock;
    decrement: jest.Mock;
    createQueryBuilder: jest.Mock;
  };
  let dataSource: { transaction: jest.Mock };
  let deleteExecute: jest.Mock;

  beforeEach(() => {
    deleteExecute = jest.fn();

    mockManager = {
      findOne: jest.fn(),
      create: jest.fn((_entity: unknown, data: unknown) => data),
      save: jest.fn(),
      delete: jest.fn(),
      increment: jest.fn(),
      decrement: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        execute: deleteExecute,
      })),
    };

    dataSource = {
      transaction: jest.fn((callback: (manager: typeof mockManager) => unknown) =>
        callback(mockManager),
      ),
    };

    service = new PostsService(
      {} as never,
      dataSource as unknown as DataSource,
    );
  });

  describe('like()', () => {
    it('inserta like y sube likesCount en 1 cuando no había like previo', async () => {
      mockManager.findOne
        .mockResolvedValueOnce({ id: postId, likesCount: 10 })
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: postId, likesCount: 11 });
      mockManager.save.mockResolvedValue({ userId, postId });

      const result = await service.like(postId, userId);

      expect(mockManager.create).toHaveBeenCalledWith(LikeEntity, {
        userId,
        postId,
      });
      expect(mockManager.save).toHaveBeenCalledWith(LikeEntity, {
        userId,
        postId,
      });
      expect(mockManager.increment).toHaveBeenCalledWith(
        PostEntity,
        { id: postId },
        'likesCount',
        1,
      );
      expect(result).toEqual({
        postId,
        likedByMe: true,
        likesCount: 11,
      });
    });

    it('ignora like repetido y no sube likesCount dos veces', async () => {
      mockManager.findOne
        .mockResolvedValueOnce({ id: postId, likesCount: 10 })
        .mockResolvedValueOnce({ id: 'like-1', userId, postId })
        .mockResolvedValueOnce({ id: postId, likesCount: 10 });

      const result = await service.like(postId, userId);

      expect(mockManager.save).not.toHaveBeenCalled();
      expect(mockManager.increment).not.toHaveBeenCalled();
      expect(result).toEqual({
        postId,
        likedByMe: true,
        likesCount: 10,
      });
    });

    it('lanza NotFoundException si el post no existe', async () => {
      mockManager.findOne.mockResolvedValueOnce(null);

      await expect(service.like(postId, userId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockManager.save).not.toHaveBeenCalled();
      expect(mockManager.increment).not.toHaveBeenCalled();
    });
  });

  describe('unlike()', () => {
    it('borra like existente y baja likesCount en 1', async () => {
      mockManager.findOne
        .mockResolvedValueOnce({ id: postId, likesCount: 10 })
        .mockResolvedValueOnce({ id: postId, likesCount: 9 });
      deleteExecute.mockResolvedValue({ affected: 1 });

      const result = await service.unlike(postId, userId);

      expect(deleteExecute).toHaveBeenCalled();
      expect(mockManager.decrement).toHaveBeenCalledWith(
        PostEntity,
        { id: postId, likesCount: MoreThan(0) },
        'likesCount',
        1,
      );
      expect(result).toEqual({
        postId,
        likedByMe: false,
        likesCount: 9,
      });
    });

    it('no falla ni cambia likesCount si el like no existía', async () => {
      mockManager.findOne
        .mockResolvedValueOnce({ id: postId, likesCount: 10 })
        .mockResolvedValueOnce({ id: postId, likesCount: 10 });
      deleteExecute.mockResolvedValue({ affected: 0 });

      const result = await service.unlike(postId, userId);

      expect(mockManager.decrement).not.toHaveBeenCalled();
      expect(result).toEqual({
        postId,
        likedByMe: false,
        likesCount: 10,
      });
    });

    it('lanza NotFoundException si el post no existe', async () => {
      mockManager.findOne.mockResolvedValueOnce(null);

      await expect(service.unlike(postId, userId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(deleteExecute).not.toHaveBeenCalled();
      expect(mockManager.decrement).not.toHaveBeenCalled();
    });
  });
});
