import jwt from "jsonwebtoken";

const generateToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"30d"
    });


    res.cookie("jwt",token,{
        maxAge:30 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSites:"strict",
        secure: process.env.NODE_ENV != "devolopment"
    })


    return token;
}


export default generateToken;