const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["accountant", "manager", "admin"],
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: false }
);

const User = model("user", userSchema);

module.exports = User;
