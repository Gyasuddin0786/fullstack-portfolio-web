const { generateS3PresignedUrl, generateCloudinarySignature } = require('../utils/upload');

// @desc    Generate presigned URL for file upload
// @route   POST /api/v1/uploads/presign
// @access  Private
const generatePresignedUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({
        success: false,
        message: 'fileName and fileType are required'
      });
    }

    const key = `portfolio/${Date.now()}-${fileName}`;

    try {
      // Try S3 first
      const presignedUrl = generateS3PresignedUrl(key, fileType);
      const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      res.status(200).json({
        success: true,
        provider: 's3',
        presignedUrl,
        publicUrl,
        key
      });
    } catch (s3Error) {
      // Fallback to Cloudinary
      const cloudinaryData = generateCloudinarySignature();

      res.status(200).json({
        success: true,
        provider: 'cloudinary',
        ...cloudinaryData,
        folder: 'portfolio'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  generatePresignedUrl
};