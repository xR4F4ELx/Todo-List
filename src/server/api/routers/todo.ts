import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { initTRPC, TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// eslint-disable-next-line import/prefer-default-export
export const todoRouter = createTRPCRouter({
  getAllTodos: publicProcedure.query(async ({ ctx }) => {
    try {
      const todos = await ctx.db.todo.findMany();
      return todos;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch todos',
        cause: error,
      });
    }
  }),

  createtodo: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createdTodo = await ctx.db.todo.create({
          data: {
            title: input.title,
            content: input.content,
          },
        });
        return createdTodo;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create todo',
          cause: error,
        });
      }
    }),

    updatetodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, title, content } = input;

        const updatedTodo = await ctx.db.todo.update({
          where: {
            id,
          },
          data: {
            title,
            content,
          },
        });

        if (!updatedTodo) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'todo not found for update',
          });
        }

        return updatedTodo;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update todo',
          cause: error,
        });
      }
    }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
      try {
        const latestTodo = await ctx.db.todo.findFirst({
          orderBy: { createdAt: 'desc' },
        });
    
        if (!latestTodo) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No todos found',
          });
        }
    
        return latestTodo;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch latest todo',
          cause: error,
        });
      }
    }),

    deletetodo: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedTodo = await ctx.db.todo.delete({
          where: {
            id: input,
          },
        });

        if (!deletedTodo) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'todo not found for deletion',
          });
        }

        return deletedTodo;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete todo',
          cause: error,
        });
      }
    }),
    
    getSpecifictodo: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const specificTodo = await ctx.db.todo.findUnique({
          where: {
            id: input,
          },
        });

        if (!specificTodo) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'todo not found',
          });
        }

        return specificTodo;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch specific todo',
          cause: error,
        });
      }
    }),
});