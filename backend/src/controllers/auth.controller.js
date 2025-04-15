import bcrypt from "bcrypt"
import userModel from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"



export const signup = async (req, res) =>{
    const {fullname, email, password} = req.body

    try {
        //has password
         if(password.length > 6){
            return  res.status(400).json({success: false , message: "Password must be at least 6 characrter"})
         }

         const user = userModel.findOne({email})

         if(user) return res.status(400).json({success:false , message : "Email already exist"})

         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt)
         
        const newUser =  new userModel({fullName, email, password: hashPassword})
        

        if(newUser){
            //generate jwt
            generateToken(newUser._id, res)
            await newUser.save();


        }else{
            return res.status(400).json({message: false , message: "Invalid user data"})
        }



        
    } catch (error) {
        return res.status(500).json({success:false , message: error})
    }

}
export const login = (req, res) =>{
    res.send("login route")
}
export const logout = (req, res) =>{
    res.send("logout route")
}