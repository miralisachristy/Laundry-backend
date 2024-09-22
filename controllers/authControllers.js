const User = require("../models/userModel");
const baseResponse = require("../utils/baseResponse");
const { generateToken, generateRefreshToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

const authControllers = {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json(baseResponse(400, null, "Username tidak boleh kosong"));
    }

    if (!password) {
      return res
        .status(400)
        .json(baseResponse(400, null, "Password tidak boleh kosong"));
    }

    try {
      //Check username
      const user = await User.findByUsername(username);
      if (!user) {
        return res
          .status(400)
          .json(baseResponse(400, null, "Username tidak ditemukan"));
      }

      //Check password
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(400).json(baseResponse(400, null, "Password Salah"));
      }

      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      user.token = token;
      user.refreshToken = refreshToken;

      console.log("auth user: ", user);

      User.updateUserToken(user.id_user, token, refreshToken);

      //Username dan password valid, success get user
      return res.status(200).json(baseResponse(200, user, "Login Berhasil"));
    } catch (error) {
      console.log(error);
    }

    return res
      .status(200)
      .json(baseResponse(200, user, "Data berhasil didapatkan"));
  },

  async authRefreshToken(req, res) {
    const { refresh_token } = req.body;

    //Kalau tidak ada token, kirim res 400
    if (!refresh_token) {
      return res.status(400).json(baseResponse(400, null, "Tidak ada Token"));
    }

    try {
      const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
      const userId = decoded.userId;

      const user = User.findByUserId(userId);
      const newToken = generateToken(user);
      const newRefreshToken = generateRefreshToken(user);

      user.token = newToken;
      user.refreshToken = newRefreshToken;

      User.updateUserToken(user.id, newToken, newRefreshToken);

      return res
        .status(200)
        .json(baseResponse(200, user, "Refresh Token Berhasil"));
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json(baseResponse(401, null, "Invalid token"));
      } else {
        return res
          .status(500)
          .json(baseResponse(500, null, "Internal Server Error"));
      }
    }
  },
};

module.exports = authControllers;
