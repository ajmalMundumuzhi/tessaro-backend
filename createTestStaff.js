require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");

async function createTestStaff() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "teststaff@tesaaro.local";

    const existingStaff = await Admin.findOne({ email });

    if (existingStaff) {
      console.log("Test staff account already exists.");
      return;
    }

    await Admin.create({
      name: "Test Staff",
      email,
      password: "StaffTest123!",
      role: "staff",
      permissions: [],
    });

    console.log("Test staff account created successfully.");
    console.log("Email:", email);
    console.log("Password: StaffTest123!");
  } catch (error) {
    console.error("Failed to create test staff:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createTestStaff();