import type { NextApiRequest, NextApiResponse } from "next";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignedPostPolicyV4Output | string>
) {
  const { query, method } = req;
  if (method !== "POST") {
    res.status(405).json("Method not allowed");
    return;
  }
  const storage = new Storage({
    projectId: "sortable-ai",
    credentials: {
      client_email: "cloudstorage@sortable-ai.iam.gserviceaccount.com",
      private_key: process.env.SECRET_FOR_LONG,
    },
  });
  const bucket = storage.bucket("medium-blog-project");
  const file = bucket.file(query.file as string);
  const options = {
    expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
    fields: { "x-goog-meta-source": "nextjs-project" },
  };
  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
}
