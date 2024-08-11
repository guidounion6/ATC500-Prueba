const UsersService = require("../services/users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const usersService = new UsersService();

require("dotenv").config();
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  try {
    const user = await usersService.register(req.body);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email o contraseña inválidos" });
    }
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: "Error al iniciar sesión", error });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const tokens = generateTokens(user);
    res.json(tokens);
  });
};


module.exports = {
    register,
    login,
    refreshToken,
}