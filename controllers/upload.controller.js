const {
  uploadBufferToCloudinary,
} = require("../utils/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      "tesaaro/products"
    );

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.url,
        publicId: result.publicId,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};