import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Storage } from "@google-cloud/storage";
import path from "path";
import fs from "fs";
import { ALL } from "dns";

const storage = new Storage({
  credentials: {
    client_email: "cloudstorage@sortable-ai.iam.gserviceaccount.com",
    private_key: process.env.SECRET_FOR_LONG,
  },
  projectId: "sortable-ai",
});

const isFile = async (a: string) => {
  const file = storage.bucket("medium-blog-project").file(`${a}`);

  const b = await file.exists();
  return b;
};

const getFile = async (a: string) => {
  const file = storage.bucket("medium-blog-project").file(`${a}`);

  const [signedUrl] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 300 * 1000,
  });

  return [signedUrl];
};

export const postRouter = createTRPCRouter({
  sendData: publicProcedure
    .input(z.object({ fileName: z.string() }))
    .query(({ input }) => {
      return getFile(input.fileName);
    }),
  getData: publicProcedure
    .input(z.object({ fileName: z.string() }))
    .query(({ input }) => {
      return isFile(input.fileName);
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
            select: { name: true, image: true, email: true },
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
            select: { name: true, image: true, email: true },
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
          select: { name: true, image: true, email: true },
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
