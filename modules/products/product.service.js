
const productRepository = require("./product.repository");
const { createProductSchema, updateProductSchema } = require("./product.validation");

const createProduct = async (data, adminId) => {
  const validatedData = createProductSchema.parse(data);

  const slug =
    validatedData.slug ||
    validatedData.name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const product = await productRepository.create({
    ...validatedData,
    slug,
    createdBy: adminId,
    totalStock: 0,
    images: validatedData.images || [],
  });

  return product;
};

const updateProduct = async (productId, data) => {
  const validatedData = updateProductSchema.parse(data);

  // Do not allow clients to change server-managed fields.
  delete validatedData.createdBy;
  delete validatedData.totalStock;

  if (validatedData.name && !validatedData.slug) {
    validatedData.slug = validatedData.name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const product = await productRepository.updateById(productId, validatedData);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

const getProducts = async ({ page = 1, limit = 10, search, status } = {}) => {
  const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 10));

  const filter = {};

  if (search) {
    filter.name = { $regex: String(search).trim(), $options: "i" };
  }

  if (["active", "draft", "hidden"].includes(status)) {
    filter.status = status;
  }

  const [products, total] = await Promise.all([
    productRepository.findAll({
      filter,
      skip: (safePage - 1) * safeLimit,
      limit: safeLimit,
    }),
    productRepository.count(filter),
  ]);

  return {
    products,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

const getProductById = async (productId) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

const deleteProduct = async (productId) => {
  const product = await productRepository.deleteById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
};
