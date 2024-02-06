import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  credentials: {
    client_email: "cloudstorage@sortable-ai.iam.gserviceaccount.com",
    private_key: process.env.SECRET_FOR_LONG,
  },
  projectId: "sortable-ai",
});

const getFile = async (a: string) => {
  const file = storage.bucket("medium-blog-project").file(`${a}`);

  const [signedUrl] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 300 * 1000,
  });

  const b = await file.exists();
  if (!b[0]) {
    return "undefined";
  } else {
    return [signedUrl];
  }
};

export const profileRouter = createTRPCRouter({
  getAvataruser: publicProcedure
    .input(z.object({ fileName: z.string() }))
    .query(({ input }) => {
      return getFile(input.fileName);
    }),
  getinforProfilebyUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          name: true,
          image: true,
          email: true,
        },
      });
    }),
  createBio: publicProcedure
    .input(z.object({ userId: z.string(), bio: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const bioData = await ctx.db.bio.findUnique({
        where: {
          userId: input.userId,
        },
      });
      if (!bioData) {
        return ctx.db.bio.create({
          data: {
            userId: input.userId,
            bio: input.bio,
          },
        });
      } else {
        return ctx.db.bio.update({
          where: {
            userId: input.userId,
          },
          data: {
            bio: input.bio,
          },
        });
      }
    }),
  getBio: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.bio.findUnique({
        where: {
          userId: input.userId,
        },
        select: {
          bio: true,
          user: {
            select: {
              email: true,
              name: true,
              image: true,
            },
          },
        },
      });
    }),
});
