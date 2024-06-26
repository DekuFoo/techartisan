const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Forbidden = require("../utils/Errors.js");
const Unauthorized = require("../utils/Errors.js");
dotenv.config();

class TokenService {
  static async generateAccessToken(payload) {
    const JWTToken = await jwt.sign(payload, "access_abracadabra", {
      expiresIn: "30m",
    });
    return JWTToken;
  }

  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, "refresh_abracadabra", {
      // Добавить Реализацию токенв REFRESHTOKEN и aCCES
      expiresIn: "15d",
    });
  }

  static async verifyAccessToken(accessToken) {
    return await jwt.verify(accessToken, "access_abracadabra");
  }

  static async verifyRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, "refresh_abracadabra");
  }

  static async checkAccess(req, _, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")?.[1];

    if (!token) {
      return next(new Unauthorized());
    }

    try {
      req.user = await TokenService.verifyAccessToken(token);
    } catch (error) {
      return next(new Error(error));
    }

    next();
  }
}

module.exports = TokenService;
