import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const {name} = input   
      const item = await ctx.db.users.create({
        data: {
          name,
        }
      })
      return item
    }),
  //   post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
    
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.users.findMany()  
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "Hello Nam! This text comes from tRPC";
  }),
});
