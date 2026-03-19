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
// ✅ আধুনিক Mongoose (Async/Await) পদ্ধতি:
UserSchema.pre("save", async function () {
  // password change না হলে skip করো
  if (!this.isModified("password")) return;

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // এখানে আলাদা করে next() কল করার দরকার নেই যদি ফাংশনটি async হয়
});

// Password compare করার method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
