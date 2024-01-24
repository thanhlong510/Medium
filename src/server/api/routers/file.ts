// import { z } from "zod";
// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";
// import { Storage } from "@google-cloud/storage";
// import path from "path";
// import fs from "fs";
// import { ALL } from "dns";

// generateFileLocation({ fileName, isPublic }: { fileName?: string; isPublic: boolean }) {
//     const randomString = crypto.randomBytes(20).toString('hex');
//     const filePath = path.join(
//       randomString,
//       slugify(fileName || 'file-with-no-name-' + crypto.randomBytes(14).toString('hex')),
//     );

//     let bucketName: string;
//     if (isPublic) {
//       bucketName = this.config.publicStorageBucket || '';
//     } else {
//       bucketName = this.config.privateStorageBucket || '';
//     }

//     const fullFilePath = isPublic
//       ? `https://storage.googleapis.com/${this.config.publicStorageBucket}/${filePath}`
//       : filePath;

//     return { filePath, bucketName, fullFilePath, cloudUri: filePath };
//   }

//   public async generateSignedUrl(
//     isPublic: boolean,
//     fileName: string,
//     fileContentType: FileContent,
//     companyId?: string,
//     userId?: string,
//   ): Promise<{
//     signedUrl: string;
//     filePath: string;
//     bucketName: string;
//     fullFilePath: string;
//     downloadKey: string;
//   }> {
//     const { filePath, bucketName, fullFilePath, cloudUri } = this.generateFileLocation({ fileName, isPublic });

//     const { downloadKey } = await this.prisma.file.create({
//       data: {
//         cloudStorageUri: cloudUri,
//         cloudStorageBucket: bucketName,
//         isPublic: isPublic,
//         fileFormatType: this.utils.getFileFormatType(fileName),
//         fileContentType,
//         fileName: fileName,
//         companyId,
//         userId: userId,
//       },
//     });

//     const bucket = this.storageClient.bucket(bucketName);
//     const file = bucket.file(filePath);
//     const [url] = await file.getSignedUrl({
//       version: 'v4',
//       action: 'write',
//       expires: Date.now() + 15 * 60 * 1000, // 15 minutes
//     });
//     return { signedUrl: url, filePath, bucketName, fullFilePath, downloadKey };
//   }

// // Then it is used in trpc like this
// export const filesRouter = router({
//   generateSignedUploadUrl: adminProcedure
//     .input(
//       z.object({
//         isPublic: z.boolean(),
//         fileName: z.string(),
//         fileContent: z.string(),
//         companyId: z.string().optional(),
//         userId: z.string().optional(),
//       }),
//     )
//     .mutation(async ({ input }) => {
//       try {
//         const { signedUrl, downloadKey } = await fileHelper.generateSignedUrl(
//           input.isPublic,
//           input.fileName,
//           input.fileContent as FileContent,
//           input.companyId,
//           input.userId,
//         );
//         return { signedUrl, downloadKey };
//       } catch (e: any) {
//         throw new TRPCError(e);
//       }
//     }),
// });