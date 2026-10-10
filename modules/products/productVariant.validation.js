const { z } = require("zod");

const variantSchema = z.object({
  color: z.string().trim().nullable().optional(),
  size: z.string().trim().nullable().optional(),
  weight: z.coerce.number().min(0).nullable().optional(),
  sku: z.string().trim().min(1, "Variant SKU is required"),
  stock: z.coerce.number().int().min(0).default(0),
  price: z.coerce.number().min(0).nullable().optional(),
  image: z.string().url().nullable().optional(),
});

const createVariantsSchema = z.object({
  variants: z.array(variantSchema).min(1, "Add at least one variant"),
});

const updateVariantSchema = variantSchema.partial();

module.exports = {
  createVariantsSchema,
  updateVariantSchema,
};
