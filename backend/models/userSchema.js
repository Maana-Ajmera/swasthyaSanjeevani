import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name should contain atleast 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name should contain atleast 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "It should contain exact 11 digits"],
        maxLength: [11, "It should contain exact 11 digits"],

    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC contain exact 13 digits"],
        maxLength: [13, "NIC contain exact 13 digits"],
    },
    dob: {
        type: String,
        required: [true, "Date of Birth is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should contain atleast 8 characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
        default: "User"
    },
    doctorDepartment: {
        type: String,

    },
    docAvatar: {
        public_id: String,
        url: String,
    }
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}
export const User = mongoose.model("User", userSchema)