const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name দাও"],
  },
  email: {
    type: String,
    required: [true, "Email দাও"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password দাও"],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Save করার আগে password hash করো
UserSchema.pre("save", async function (next) {
  // password change না হলে skip করো
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password compare করার method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
