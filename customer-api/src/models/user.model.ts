const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    },
    createdDate: {
      type: Date,
      required: true,
    },
    updatedDate: {
      type: Date,
      required: true,
    }
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
