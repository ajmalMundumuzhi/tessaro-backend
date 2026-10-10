
const ProductVariant = require("../../models/ProductVariant");

const findByProductId = (productId) => {
  return ProductVariant.find({ productId })
    .sort({ createdAt: -1 })
    .lean();
};

const findById = (variantId) => {
  return ProductVariant.findById(variantId);
};

const createMany = (variants) => {
  return ProductVariant.insertMany(variants, { ordered: true });
};

const create = (variantData) => {
  return ProductVariant.create(variantData);
};

const updateById = (variantId, data) => {
  return ProductVariant.findByIdAndUpdate(variantId, data, {
    new: true,
    runValidators: true,
  });
};

const deleteById = (variantId) => {
  return ProductVariant.findByIdAndDelete(variantId);
};

const deleteByProductId = (productId) => {
  return ProductVariant.deleteMany({ productId });
};

const calculateTotalStock = async (productId) => {
  const result = await ProductVariant.aggregate([
    { $match: { productId: productId } },
    {
      $group: {
        _id: null,
        totalStock: { $sum: "$stock" },
      },
    },
  ]);

  return result[0]?.totalStock || 0;
};

module.exports = {
  findByProductId,
  findById,
  createMany,
  create,
  updateById,
  deleteById,
  deleteByProductId,
  calculateTotalStock,
};
