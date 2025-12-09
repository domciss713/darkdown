import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { Readable } from "node:stream";

const client =
  process.env.STORAGE_S3_ENDPOINT && process.env.STORAGE_S3_ACCESS_KEY_ID
    ? new S3Client({
        region: process.env.STORAGE_S3_REGION,
        endpoint: process.env.STORAGE_S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.STORAGE_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.STORAGE_S3_SECRET_ACCESS_KEY!
        },
        forcePathStyle: true
      })
    : null;

const bucket = process.env.STORAGE_S3_BUCKET ?? "darkdown-attachments";

export async function putAttachment(
  key: string,
  data: Buffer,
  contentType: string
) {
  if (!client) throw new Error("S3 not configured");
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: data,
      ContentType: contentType
    })
  );
}

export async function getAttachmentStream(
  key: string
): Promise<{ stream: Readable; contentType?: string }> {
  if (!client) throw new Error("S3 not configured");
  const res = await client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key
    })
  );
  const body = res.Body;
  if (!(body instanceof Readable)) {
    throw new Error("Invalid S3 body");
  }
  return { stream: body, contentType: res.ContentType };
}
