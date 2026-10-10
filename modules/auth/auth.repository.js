const Admin = require("../../models/Admin");

const findAdminByEmail = async (email) => {
  return Admin.findOne({ email });
};

const findAdminById = async (id) => {
  return Admin.findById(id);
};

const createAdmin = async (adminData) => {
  return Admin.create(adminData);
};

const updateLastLogin = async (adminId) => {
  return Admin.findByIdAndUpdate(
    adminId,
    {
      lastLogin: new Date(),
    },
    {
      new: true,
    }
  );
};

module.exports = {
  findAdminByEmail,
  findAdminById,
  createAdmin,
  updateLastLogin,
};