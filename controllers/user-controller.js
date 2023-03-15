import User from "../models/User";
import bcrypt from 'bcryptjs'


export const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();

    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:'No Users Found'});
    }
    return res.status(200).json({users});
};



export const signUp = async(req,res,next)=>{
    const {name, email, password}=req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists!"})
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]

    });
    
    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({user})
};


export const login = async (req,res,next)=>{
    const {email, password}=req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldn't find user"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"});
    }
    else{;
        return res
        .status(200)
        .json({message:"login succussfull",user:existingUser});
    }
}