const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTRO
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(502).json("Campos requeridos");
  }

  const { name, email, password } = req.body;

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(501).json(error);
  }
};

//LOGIN
const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(502).json("Campos requeridos");
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).select(
      "name email password"
    );
    if (!user) {
      return res.status(404).json("No se encontro ningun usuario con ese email");
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status().json("Contraseña incorrecta");
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_PASS, { expiresIn: "1D" });
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login success" });
  } catch (error) {
    res.status(501).json(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ meesage: "Usted cerro sesion correctamente" });
};

const isLoggedIn = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_PASS, (error) => {
    if (error) {
      return res.json(false);
    }
    return res.json(true);
  });
};

module.exports = {
  register,
  login,
  logout,
  isLoggedIn,
};
