
const mongoose = require("mongoose");

const productRepository = require("./product.repository");
const variantRepository = require("./productVariant.repository");

const {
  createVariantsSchema,
  updateVariantSchema,
} = require("./productVariant.validation");

const ensureProductExists = async (productId) => {
  if (!mongoose.isValidObjectId(productId)) {
    const error = new Error("Invalid product ID");
    error.statusCode = 400;
    throw error;
  }

  const product = await productRepository.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

const syncTotalStock = async (productId) => {
  const totalStock = await variantRepository.calculateTotalStock(
    new mongoose.Types.ObjectId(productId)
  );

  await productRepository.updateById(productId, { totalStock });

  return totalStock;
};

const getVariants = async (productId) => {
  await ensureProductExists(productId);
  return variantRepository.findByProductId(productId);
};

const createVariants = async (productId, data) => {
  await ensureProductExists(productId);

  const validated = createVariantsSchema.parse(data);

  const variants = validated.variants.map((variant) => ({
    ...variant,
    productId,
  }));

  const createdVariants = await variantRepository.createMany(variants);
  const totalStock = await syncTotalStock(productId);

  return { variants: createdVariants, totalStock };
};

const updateVariant = async (productId, variantId, data) => {
  await ensureProductExists(productId);

  if (!mongoose.isValidObjectId(variantId)) {
    const error = new Error("Invalid variant ID");
    error.statusCode = 400;
    throw error;
  }

  const validated = updateVariantSchema.parse(data);

  // Product association must never be changed through this request.
  delete validated.productId;

  const existing = await variantRepository.findById(variantId);

  if (!existing || existing.productId.toString() !== productId) {
    const error = new Error("Variant not found for this product");
    error.statusCode = 404;
    throw error;
  }

  const updatedVariant = await variantRepository.updateById(
    variantId,
    validated
  );

  const totalStock = await syncTotalStock(productId);

  return { variant: updatedVariant, totalStock };
};

const deleteVariant = async (productId, variantId) => {
  await ensureProductExists(productId);

  if (!mongoose.isValidObjectId(variantId)) {
    const error = new Error("Invalid variant ID");
    error.statusCode = 400;
    throw error;
  }

  const existing = await variantRepository.findById(variantId);

  if (!existing || existing.productId.toString() !== productId) {
    const error = new Error("Variant not found for this product");
    error.statusCode = 404;
    throw error;
  }

  await variantRepository.deleteById(variantId);
  const totalStock = await syncTotalStock(productId);

  return { totalStock };
};

module.exports = {
  getVariants,
  createVariants,
  updateVariant,
  deleteVariant,
};
