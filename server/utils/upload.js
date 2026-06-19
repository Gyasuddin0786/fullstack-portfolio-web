const AWS = require('aws-sdk');
const cloudinary = require('cloudinary').v2;

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const generateS3PresignedUrl = (key, contentType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 300, // 5 minutes
    ContentType: contentType,
    ACL: 'public-read'
  };

  return s3.getSignedUrl('putObject', params);
};

const generateCloudinarySignature = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'portfolio' },
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
  };
};

module.exports = {
  generateS3PresignedUrl,
  generateCloudinarySignature
};