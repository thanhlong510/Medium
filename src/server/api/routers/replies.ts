import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const repliesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        repliesContent: z.string(),
        postId: z.string(),
        userId: z.string(),
        parentId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.replies.create({
        data: {
          repliesContent: input.repliesContent,
          postId: input.postId,
          userId: input.userId,
          parentId: input.parentId,
        },
      });
    }),
  getReplies: publicProcedure
    .input(z.object({ postId: z.string(), parentId: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.db.replies.findMany({
        where: {
          postId: input.postId,
          parentId: null
        },
        orderBy: [{ createdAt: "desc" }],
        select: {
          children: true,
          id: true,
          user: {
            select: {
              name: true,
              id: true,
              image:true,
            },
          },
          repliesContent: true,
        },
      });
    }),
});
