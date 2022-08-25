import jwt from "jsonwebtoken";
import ApiError from "../exceptions/api-error.js";
import tokenModel from "../models/token-model.js";
class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      throw null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      throw null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      user: userId,
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshtoken) {
    const tokenData = await tokenModel.deleteOne({ refreshtoken });
    console.log(tokenData);
    return tokenData;
  }

  async findToken(refreshtoken) {
    const tokenData = await tokenModel.findOne({ refreshtoken });
    return tokenData;
  }
}

export default new TokenService();
