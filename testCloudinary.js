require("dotenv").config();

const {
  uploadToCloudinary,
} = require("./utils/cloudinary");

const testUpload = async () => {
  try {
    console.log("☁️ Uploading image...");

    const result = await uploadToCloudinary(
      "./test/test-image.jpg",
      "tesaaro/test"
    );

    console.log("✅ Upload successful!");
    console.log("URL:", result.url);
    console.log("Public ID:", result.publicId);

    process.exit(0);
  } catch (error) {
    console.error("❌ Upload failed");
    console.error(error);

    process.exit(1);
  }
};

testUpload();