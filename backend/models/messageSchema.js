import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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

    }, message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain atleast 10 charac"]
    },
})

export const Message = mongoose.model("Message", messageSchema)