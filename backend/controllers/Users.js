import users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const GetUsers = async (req, res) => {
  try {
    const users_ = await users.findAll();
    res.json(users_);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "confirmation does not match the password" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Success" });
  } catch (error) {
    console.log(error);
  }
};
