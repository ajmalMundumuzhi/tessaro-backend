const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("./auth.repository");

const createAccessToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    }
  );
};

const createRefreshToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
};

const login = async (email, password) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  await authRepository.updateLastLogin(admin._id);

  const accessToken = createAccessToken(admin);
  const refreshToken = createRefreshToken(admin);

  return {
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    },
    accessToken,
    refreshToken,
  };
};

const getMe = async (adminId) => {
  const admin = await authRepository.findAdminById(adminId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin;
};

const refresh = async (refreshToken) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const admin = await authRepository.findAdminById(
      decoded.id
    );

    if (!admin) {
      throw new Error("Admin not found");
    }

    const accessToken = createAccessToken(admin);

    return {
      accessToken,
    };
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

module.exports = {
  refresh,
  login,
  getMe,
  createAccessToken,
  createRefreshToken,
};