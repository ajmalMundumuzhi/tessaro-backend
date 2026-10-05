require("dotenv").config();

const mongoose = require("mongoose");

const {
    Admin,
  Category,
  SubCategory,
  ChildCategory,
  Product,
} = require("../models");

const categories = require("./data/categories");
const subCategories = require("./data/subCategories");
const childCategories = require("./data/childCategories");
const products = require("./data/products");

const seedDatabase = async () => {
  try {
    // -----------------------------------
    // CONNECT TO DATABASE
    // -----------------------------------

    console.log("🔌 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    // -----------------------------------
    // CLEAR OLD SEED DATA
    // -----------------------------------

    console.log("🗑️ Clearing old seed data...");
    // -----------------------------------
// CREATE SEED ADMIN
// -----------------------------------

let admin = await Admin.findOne({
  email: "admin@tesaaro.local",
});

if (!admin) {
  admin = await Admin.create({
    name: "Tesaaro Admin",
    email: "admin@tesaaro.local",
    password: "admin123",
    role: "super_admin",
    permissions: [],
  });

  console.log("✅ Seed admin created");
} else {
  console.log("✅ Seed admin already exists");
}

    await Product.deleteMany({});
    await ChildCategory.deleteMany({});
    await SubCategory.deleteMany({});
    await Category.deleteMany({});

    console.log("✅ Old seed data cleared");

    // -----------------------------------
    // CREATE CATEGORIES
    // -----------------------------------

    const createdCategories =
      await Category.insertMany(categories);

    const categoryMap = {};

    createdCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    console.log(
      `✅ ${createdCategories.length} categories created`
    );

    // -----------------------------------
    // CREATE SUBCATEGORIES
    // -----------------------------------

    const subCategoryData = subCategories.map((item) => ({
      categoryId: categoryMap[item.category],
      name: item.name,
      slug: item.slug,
      position: item.position,
      status: true,
    }));

    const createdSubCategories =
      await SubCategory.insertMany(subCategoryData);

    const subCategoryMap = {};

    createdSubCategories.forEach((subCategory) => {
      subCategoryMap[subCategory.name] =
        subCategory._id;
    });

    console.log(
      `✅ ${createdSubCategories.length} subcategories created`
    );

    // -----------------------------------
    // CREATE CHILD CATEGORIES
    // -----------------------------------

    const childCategoryData = childCategories.map(
      (item) => ({
        subCategoryId:
          subCategoryMap[item.subCategory],

        name: item.name,

        slug: item.slug,

        position: item.position,

        status: true,
      })
    );

    const createdChildCategories =
      await ChildCategory.insertMany(
        childCategoryData
      );

    const childCategoryMap = {};

    createdChildCategories.forEach(
      (childCategory) => {
        childCategoryMap[childCategory.name] =
          childCategory._id;
      }
    );

    console.log(
      `✅ ${createdChildCategories.length} child categories created`
    );

    // -----------------------------------
    // CREATE PRODUCTS
    // -----------------------------------

    const productData = products.map(
      (product, index) => ({
        name: product.name,

        createdBy: admin._id,

        slug: product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),

        categoryId:
          categoryMap[product.category],

        subCategoryId:
          subCategoryMap[product.subCategory],

        childCategoryId:
          childCategoryMap[
            product.childCategory
          ],

        sku: product.sku,

        shortDescription:
          product.shortDescription,

        description:
          product.shortDescription,

        thumbnail:
          `https://placehold.co/800x1000?text=${encodeURIComponent(
            product.name
          )}`,

        images: [
          `https://placehold.co/800x1000?text=${encodeURIComponent(
            product.name
          )}`,
        ],

        sellingPrice:
          product.sellingPrice,

        originalPrice:
          product.originalPrice,

        makingCharge: 0,

        metalType:
          product.metalType,

        purity:
          product.purity,

        averageRating: 0,

        reviewCount: 0,

        totalStock: 0,

        isTopSelling: index < 8,

        buyTwoGetOne:
          index % 10 === 0,

        freeShipping:
          product.sellingPrice >= 500,

        positionInSubCategory:
          index + 1,

        seoTitle:
          product.name,

        seoDescription:
          product.shortDescription,

        status: "active",
      })
    );

    const createdProducts =
      await Product.insertMany(productData);

    console.log(
      `✅ ${createdProducts.length} products created`
    );

    // -----------------------------------
    // SUMMARY
    // -----------------------------------

    console.log("\n🎉 DATABASE SEED COMPLETED!\n");

    console.log(
      `Categories:       ${createdCategories.length}`
    );

    console.log(
      `SubCategories:    ${createdSubCategories.length}`
    );

    console.log(
      `ChildCategories:  ${createdChildCategories.length}`
    );

    console.log(
      `Products:         ${createdProducts.length}`
    );

    console.log("\n🌱 Seed finished successfully.");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("\n❌ SEED FAILED\n");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();