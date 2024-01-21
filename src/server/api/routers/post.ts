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
// const file = storage.bucket("medium-blog-project");

export const uploadImageToGCS = async (
  filePath: string,
  fileName: string,
): Promise<string> => {
  try {
    const bucket = storage.bucket("medium-blog-project");
    const fullFilePath = path.join(filePath, fileName);

    // Read date from file

    const fileBuffer = fs.readFileSync(fullFilePath);
    if (fileBuffer) return "";
    // Upload file to GCS
    const destinationFileName = `images/${fileName}`;
    await bucket.upload(fileBuffer, {
      destination: destinationFileName,
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    // Get image after uploading
    const imageUrl = `https://storage.googleapis.com/medium-blog-project/${destinationFileName}`;
    console.log("Image uploaded successfully. URL:", imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to GCS:", error);
    throw new Error("Error uploading image to GCS.");
  }
};

export const postRouter = createTRPCRouter({
  uploadImageTRPC: protectedProcedure
    .input(
      z.object({
        file: z.object({
          filePath: z.string(),
          fileName: z.string(),
        }),
      }),
    )
    .query(async ({ input }) => {
      const imageUrl = await uploadImageToGCS(
        input.file.fileName,
        input.file.filePath,
      );
      return { imageUrl };
    }),

  getPostbyUserId: publicProcedure
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

  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      take: ALL,
      select: {
        content: true,
        description: true,
        title: true,
        postId: true,
        user: {
          select: { name: true, image: true },
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.post.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
          content: input.content,
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
  
  getProfilebyUserId: publicProcedure
  .input(z.object({userId:z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.profile.findFirst({
      where: {
        userId:input.userId
      },
      select:{
        image: true,
        user:{
          select:{
            name:true,
            email:true,
            image:true
          }
        }
      }
    });
  }),
});
