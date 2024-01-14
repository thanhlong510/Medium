import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  credentials: {
    client_email: 'cloudstorage@sortable-ai.iam.gserviceaccount.com',
    private_key: process.env.SECRET_FOR_LONG,
  },
  projectId: 'sortable-ai',
});
const file = storage.bucket('medium-blog-project').file('Anh_The.jpg');
const [signedUrl] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 300 * 1000,
  });

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(({ ctx }) => {
   return ctx.db.post.findMany({
      take:3,
      select:{
        content:true,
        description:true,
        title:true,
        postId:true,
        user: {
          select:{name:true,
          image:true
          }
        }
      }
    });
  }),

  getPostById: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          postId: input.postId,
        },
        select:{
          user:{
            select:{name:true,
            image:true
            }
          },
          createdAt:true,
          description:true,
          title:true,
          content:true,
          postId:true,
          userID:true,
        }
      });
    }),

  isEdit:protectedProcedure
  .input(
    z.object({
      postId:z.string()
    })
  )
  .query(({ctx,input})=>{

  }),
  // edit
  // getImage
  // editImage
  create: protectedProcedure
    .input(z.object({ description: z.string(), title:z.string(), content:z.string()  }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.db.post.create({
        data: {
          userId:ctx.session.user.id,
          title:input.title,
          description:input.description,
          content:input.content,
        }
      })
      return item
    }),
  
});
