
const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  slug: z.string().trim().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "Subcategory is required"),
  childCategoryId: z.string().nullable().optional(),
  sku: z.string().trim().min(1, "SKU is required"),
  barcode: z.string().trim().optional(),
  shortDescription: z.string().trim().optional(),
  description: z.string().optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  images: z.array(z.string().url()).optional(),
  sellingPrice: z.coerce.number().min(0, "Selling price cannot be negative"),
  originalPrice: z.coerce.number().min(0).nullable().optional(),
  makingCharge: z.coerce.number().min(0).optional(),
  metalType: z.string().nullable().optional(),
  purity: z.string().nullable().optional(),
  isTopSelling: z.boolean().optional(),
  buyTwoGetOne: z.boolean().optional(),
  freeShipping: z.boolean().optional(),
  positionInSubCategory: z.coerce.number().int().min(0).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(["active", "draft", "hidden"]).optional(),
});

const updateProductSchema = createProductSchema.partial();

module.exports = {
  createProductSchema,
  updateProductSchema,
};
