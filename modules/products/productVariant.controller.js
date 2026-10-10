
const variantService = require("./productVariant.service");

const getVariants = async (req, res, next) => {
  try {
    const variants = await variantService.getVariants(req.params.productId);

    return res.status(200).json({
      success: true,
      data: variants,
    });
  } catch (error) {
    next(error);
  }
};

const createVariants = async (req, res, next) => {
  try {
    const result = await variantService.createVariants(
      req.params.productId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Product variants created successfully",
      data: result.variants,
      totalStock: result.totalStock,
    });
  } catch (error) {
    next(error);
  }
};

const updateVariant = async (req, res, next) => {
  try {
    const result = await variantService.updateVariant(
      req.params.productId,
      req.params.variantId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Product variant updated successfully",
      data: result.variant,
      totalStock: result.totalStock,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    const result = await variantService.deleteVariant(
      req.params.productId,
      req.params.variantId
    );

    return res.status(200).json({
      success: true,
      message: "Product variant deleted successfully",
      totalStock: result.totalStock,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVariants,
  createVariants,
  updateVariant,
  deleteVariant,
};
