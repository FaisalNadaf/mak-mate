import { Users } from "../models/userModel.js";
import { hashString } from "../utils/index.js";

export const Register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName || lastName || email || password)) {
    next("Provide Required Fields");
    return;
  }
  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Adderess Already Exists");
      return;
    }

    const hashedPassword = await hashString(password);
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    sendVerificationEmail(user, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
