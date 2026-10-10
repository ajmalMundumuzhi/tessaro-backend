require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

async function fixPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await Admin.findOne({
      email: "admin@tesaaro.local",
    });

    if (!admin) {
      console.log("❌ Admin not found");
      return;
    }

    const passwordHash = await bcrypt.hash("admin123", 10);

    const result = await Admin.updateOne(
      { _id: admin._id },
      { $set: { password: passwordHash } }
    );

    if (result.modifiedCount === 1) {
      console.log("✅ Admin password successfully hashed");
    } else {
      console.log("⚠️ No document was modified");
    }

    const updatedAdmin = await Admin.findById(admin._id);
    const passwordMatches = await bcrypt.compare(
      "admin123",
      updatedAdmin.password
    );

    console.log("Password verification:", passwordMatches);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

fixPassword();