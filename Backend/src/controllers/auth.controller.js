import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";


async function sendTokenResponse(user,res){
    const token = jwt.sign({id:user._id},config.JWT_SECRET,{expiresIn:"7d"})
}


export const registerUser = async (req, res) => {
    const { email, password, contact, fullname} = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({ email, password, contact, fullname });

    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}