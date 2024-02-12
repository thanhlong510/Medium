import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { ALL } from "dns";


export const postRouter = createTRPCRouter({
  getPostexample: publicProcedure
  .input(z.object({content:z.string()}))
  .query(({input})=>{
    return input.content
  }),
  getPostsbyUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          userId: input.userId,
        },
        select: {
          user: {
            select: { name: true, image: true, email: true },
          },
          createdAt: true,
          description: true,
          title: true,
          content: true,
          postId: true,
          userId: true,
        },
      });
    }),
  getUnhidePostbyUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          userId: input.userId,
          hide: false,
        },
        select: {
          user: {
            select: { name: true, image: true, email: true, bio:{
              select:{
                avatarImage:true
              }
            } },
          },
          createdAt: true,
          description: true,
          title: true,
          content: true,
          postId: true,
          userId: true,
          categories: {
            select: {
              category: true,
            },
          },
        },
      });
    }),
  getHidePostbyUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          userId: input.userId,
          hide: true,
        },
        select: {
          user: {
            select: { name: true, image: true, email: true,bio:{
              select:{
                avatarImage:true
              }
            } },
          },
          createdAt: true,
          description: true,
          title: true,
          content: true,
          postId: true,
          userId: true,
          categories: {
            select: {
              category: true,
            },
          },
        },
      });
    }),
  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      where: {
        hide: false,
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      select: {
        user: {
          select: { name: true, image: true, email: true,
          bio:{
            select:{
              avatarImage:true
            }
          }
          },
        },
        createdAt: true,
        description: true,
        title: true,
        content: true,
        postId: true,
        userId: true,
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }),
  getPostById: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          postId: input.postId,
        },
        select: {
          user: {
            select: { name: true, image: true, id: true },
          },
          categories:{
            select:{
              category:true,
              id:true
            }
          },
          createdAt: true,
          description: true,
          title: true,
          content: true,
          postId: true,
          userId: true,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        title: z.string(),
        content: z.string(),
        postId: z.string(),
        // categories: z.array(z.string()),
        // categoryId: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.post.update({
        where: {
          postId: input.postId,
        },
        data: {
          title: input.title,
          description: input.description,
          content: input.content,
        //   categories: { update: { where:{
        //     id: input.categoryId
        //   },
        //   data:{
        //     category: input.categories 
        //   } 
        //  } },
        },
      });

      return item;
    }),
  create: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        title: z.string(),
        content: z.string(),
        categories: z.array(z.string()),
        coverImageName:z.string(z.string())
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.post.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
          content: input.content,
          categories: { create: { category: input.categories } },
          coverImageName:input.coverImageName
        },
      });
      return item;
    }),
  delete: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.db.post.delete({
        where: {
          postId: input.postId,
        },
      });
      return section;
    }),
  hidePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.db.post.update({
        where: {
          postId: input.postId,
        },
        data: {
          hide: true,
        },
      });
      return section;
    }),
  unHidePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const section = await ctx.db.post.update({
        where: {
          postId: input.postId,
        },
        data: {
          hide: false,
        },
      });
      return section;
    }),
  getPostbyCategories: publicProcedure
    .input(z.object({ categories: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        take: ALL,
        where: {
          categories: {
            some: {
              category: {
                has: input.categories,
              },
            },
          },
          hide: false,
        },
        select: {
          user: {
            select: { name: true, image: true, id: true },
          },
          createdAt: true,
          description: true,
          title: true,
          content: true,
          postId: true,
          userId: true,
        },
      });
    }),
});
