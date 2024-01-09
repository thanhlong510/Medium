import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { TRPCError } from "@trpc/server";
const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:9000",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
  },
});
export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  //   createPresignedUrl: protectedProcedure
  //   .input(z.object({ courseId: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     // const userId = ctx.session.user.id;
  //     const course = await ctx.db.post.findUnique({
  //       where: {
  //         id: input.courseId,
  //       },
  //     });

  //     if (!course) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "the course does not exist",
  //       });
  //     }
  //     const imageId = uuidv4();
  //     await ctx.db.post.update({
  //       where: {
  //         id: course.id,
  //       },
  //       data: {
  //         imageId,
  //       },
  //     });

  //     return createPresignedPost(s3Client, {
  //       Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
  //       Key: imageId,
  //       Fields: {
  //         key: imageId,
  //       },
  //       Conditions: [
  //         ["starts-with", "$Content-Type", "image/"],
  //         ["content-length-range", 0, 100000],
  //       ],
  //     });
  //   }),
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
    
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.users.findMany()  
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "Hello Nam! This text comes from tRPC";
  }),
});
