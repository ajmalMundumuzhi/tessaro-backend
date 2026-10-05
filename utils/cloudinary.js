const cloudinary = require("../shared/config/cloudinary");

const uploadToCloudinary = async (filePath, folder = "tesaaro") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
};