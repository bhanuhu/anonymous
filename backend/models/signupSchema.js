const mongoose = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate(value) {
      if (!validate.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userschema.methods.generateAuthtoken = async function () {
  try {
    const token1 = jwt.sign({ _id: this._id }, process.env.KEYSECRET, {
      expiresIn: "8h",
    });
    this.tokens = this.tokens.concat({ token: token1 });
    await this.save();
    return token1;
  } catch (error) {
    res.status(404).json({ error: "some errors are there" });
  }
};

const SignUp = mongoose.model("SignUp", userschema);
module.exports = SignUp;
