import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, phone, gender, dob, nic, role } = req.body;
    if (!firstName || !lastName || !email || !password || !phone || !gender || !dob || !nic || !role) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone, dob, gender, nic, role
    });
    generateToken(user, "User registered successfully", 200, res);

});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !role || !confirmPassword) {
        return next(new ErrorHandler("Please provide all details", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password does not match", 400))
    };
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("User not found", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("Invalid Role", 401));
    }
    generateToken(user, "User logged in successfully", 200, res);

});
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, phone, gender, dob, nic } = req.body;
    if (!firstName || !lastName || !email || !password || !phone || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already exists  with this email`, 400));
    }
    const admin = await User.create({
        firstName, lastName, email, password, phone, gender, dob, nic, role: "Admin"
    });
    res.status(200).json({
        success: true,
        message: "Admin registered successfully",
    })
})
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    })
});
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
});
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", " ", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Admin logged out successfully"
    })
});
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", " ", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Patient logged out successfully"
    })
});
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || !Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload a photo", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400));
    }
    const { firstName, lastName, email, password, phone, gender, dob, nic, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !password || !phone || !gender || !dob || !nic || !doctorDepartment) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already exists with this email`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(cloudinaryResponse.error || "unknown error in uploading");
    }
    const doctor = await User.create({
        firstName, lastName, email, password, phone, gender, dob, nic, doctorDepartment, role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200).json({
        success: true,
        message: "Doctor registered successfully",
        doctor
    })
})