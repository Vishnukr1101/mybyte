const { S3Client, HeadObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({ region: process.env.AWS_REGION });

export const checkFile = async (key: string) => {
  try {
    const result = await s3.send(new HeadObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key }));
    return result;
  } catch (err) {
    console.error("File not found in S3", err);
    throw err;
  }
};
