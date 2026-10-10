
const Product = require("../../models/Product");

const findAll = ({ filter = {}, skip = 0, limit = 10, sort = { createdAt: -1 } } = {}) => {
  return Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

const count = (filter = {}) => {
  return Product.countDocuments(filter);
};

const findById = (id) => {
  return Product.findById(id);
};

const findBySlug = (slug) => {
  return Product.findOne({ slug });
};

const create = (data) => {
  return Product.create(data);
};

const updateById = (id, data) => {
  return Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteById = (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  count,
  findById,
  findBySlug,
  create,
  updateById,
  deleteById,
};
