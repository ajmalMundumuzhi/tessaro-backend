require("dotenv").config();

const mongoose = require("mongoose");

const {
    Admin,
  Product,
  ProductVariant,
  InventoryLog,
} = require("../models");

const seedVariants = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    const admin = await Admin.findOne({
  email: "admin@tesaaro.local",
});

if (!admin) {
  throw new Error(
    "Seed admin not found. Run: node seed/seed.js first"
  );
}

console.log("✅ Seed admin found");

    // -----------------------------------
    // GET ALL PRODUCTS
    // -----------------------------------

    const products = await Product.find({});

    if (!products.length) {
      console.log("❌ No products found.");
      console.log("Run this first: node seed/seed.js");

      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`📦 Found ${products.length} products`);

    // -----------------------------------
    // CLEAR OLD VARIANTS + LOGS
    // -----------------------------------

    console.log("🗑️ Clearing old variants and inventory logs...");

    await InventoryLog.deleteMany({});
    await ProductVariant.deleteMany({});

    console.log("✅ Old variants cleared");

    // -----------------------------------
    // VARIANT OPTIONS
    // -----------------------------------

    const colors = [
      "Gold",
      "Silver",
      "Rose Gold",
      "Black",
    ];

    const sizes = [
      "Free Size",
      "Small",
      "Medium",
      "Large",
    ];

    const variants = [];
    const inventoryLogs = [];

    // -----------------------------------
    // CREATE VARIANTS
    // -----------------------------------

    products.forEach((product, productIndex) => {
      /*
       * Every product gets 1–3 variants.
       *
       * Some products are intentionally
       * out of stock to make the admin
       * stock dashboard realistic.
       */

      let variantCount;

      if (productIndex % 5 === 0) {
        variantCount = 3;
      } else if (productIndex % 2 === 0) {
        variantCount = 2;
      } else {
        variantCount = 1;
      }

      // About 15% products out of stock
      const isOutOfStock =
        productIndex % 7 === 0;

      // About 30% products on sale
      const isSaleProduct =
        productIndex % 3 === 0;

      for (
        let variantIndex = 0;
        variantIndex < variantCount;
        variantIndex++
      ) {
        const color =
          colors[
            (productIndex + variantIndex) %
              colors.length
          ];

        const size =
          sizes[
            (productIndex + variantIndex) %
              sizes.length
          ];

        let stock;

        if (isOutOfStock) {
          stock = 0;
        } else {
          stock =
            5 +
            ((productIndex * 7 +
              variantIndex * 3) %
              26);
        }

        let price = product.sellingPrice;

        // Give approximately 30% products
        // a discounted variant price.
        if (isSaleProduct) {
          price = Math.round(
            product.originalPrice * 0.75
          );
        }

        const variantSku =
          `${product.sku}-${color
            .replace(/\s+/g, "")
            .toUpperCase()}-${size
            .replace(/\s+/g, "")
            .toUpperCase()}`;

        variants.push({
          productId: product._id,

          color,

          size,

          weight: null,

          sku: variantSku,

          stock,

          price,

          image: product.thumbnail,
        });
      }
    });

    // -----------------------------------
    // INSERT VARIANTS
    // -----------------------------------

    const createdVariants =
      await ProductVariant.insertMany(
        variants
      );

    console.log(
      `✅ ${createdVariants.length} variants created`
    );

    // -----------------------------------
    // CREATE INVENTORY LOGS
    // -----------------------------------

    createdVariants.forEach((variant) => {
      if (variant.stock > 0) {
        inventoryLogs.push({
            productId: variant.productId,
            variantId: variant._id,
            type: "IN",
            quantity: variant.stock,
            reason: "Initial seed stock",
            createdBy: admin._id,
        });
      }
    });

    if (inventoryLogs.length) {
      await InventoryLog.insertMany(
        inventoryLogs
      );
    }

    console.log(
      `✅ ${inventoryLogs.length} inventory logs created`
    );

    // -----------------------------------
    // UPDATE PRODUCT TOTAL STOCK
    // -----------------------------------

    for (const product of products) {
      const productVariants =
        createdVariants.filter(
          (variant) =>
            variant.productId.toString() ===
            product._id.toString()
        );

      const totalStock =
        productVariants.reduce(
          (total, variant) =>
            total + variant.stock,
          0
        );

      await Product.findByIdAndUpdate(
        product._id,
        {
          totalStock,
        }
      );
    }

    console.log(
      "✅ Product total stock updated"
    );

    // -----------------------------------
    // SUMMARY
    // -----------------------------------

    const outOfStockVariants =
      createdVariants.filter(
        (variant) => variant.stock === 0
      ).length;

    const inStockVariants =
      createdVariants.filter(
        (variant) => variant.stock > 0
      ).length;

    console.log("\n🎉 VARIANT SEED COMPLETED!\n");

    console.log(
      `Products:          ${products.length}`
    );

    console.log(
      `Variants:          ${createdVariants.length}`
    );

    console.log(
      `In-stock variants:  ${inStockVariants}`
    );

    console.log(
      `Out-of-stock:       ${outOfStockVariants}`
    );

    console.log(
      `Inventory logs:     ${inventoryLogs.length}`
    );

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("\n❌ VARIANT SEED FAILED\n");

    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedVariants();