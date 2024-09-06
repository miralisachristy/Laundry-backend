const User = require("../models/userModel");
const baseResponse = require("../utils/baseResponse");

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

      //Username dan password valid, success get user
      return res.status(200).json(baseResponse(200, user, "Login Berhasil"));
    } catch (error) {
      console.log(error);
    }

    return res
      .status(200)
      .json(baseResponse(200, user, "Data berhasil didapatkan"));
  },
};

module.exports = authControllers;
