const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    nrc: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
    },
    updatedDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const CustomerModel = mongoose.model('Customer', customerSchema);
export default CustomerModel;
