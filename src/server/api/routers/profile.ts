import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  credentials: {
    client_email: "cloudstorage@sortable-ai.iam.gserviceaccount.com",
    private_key: process.env.SECRET_FOR_LONG
  },
  projectId: "sortable-ai",
});
const bucketName = "medium-blog-project"; // Replace with your GCP bucket name

export const profileRouter = createTRPCRouter({
  getProfilebyUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where:{
            id:input.userId
        },
        select:{
            name:true,
            image:true,
            email:true,
        }

      })
      
    }),

    uploadImage: protectedProcedure
    .input(
      z.object({
        file: z.string(), // Change the type to string
      })
    )
    .query(async ({ ctx, input }) => {
      // Now you can directly use input.file as a string (file path or URL)
      const imagePath = input.file;
      const uploadResult = await uploadImageToGCP(imagePath);

      // Save the image URL or any other relevant information to your database
      // For example, you can save the image URL to the user's profile in the database

      return { success: true, imageUrl: uploadResult };
    }),
});

// Helper function to upload an image to GCP Storage
async function uploadImageToGCP(imagePath: string): Promise<string> {
  const bucket = storage.bucket(bucketName);
  const uniqueFileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}_${imagePath}`;
  const file = bucket.file(uniqueFileName);

  await file.save(imagePath, {
    metadata: {
      contentType: "image/jpeg", // Set the appropriate content type for your image
    },
  });

  // Make the file publicly accessible
  await file.makePublic();

  // Get the public URL of the uploaded file
  const imageUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;

  return imageUrl;
}
