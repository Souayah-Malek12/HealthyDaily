const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")

const registreController = async (req, res) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const { username,  email, password, role, age, sex, height, weight , dailyActivity, goal,coordinates } = req.body;


        if (!username) {
            return res.status(400).send({ success: false, message: "Name is required" });
        }
        
        if (!email) {
            return res.status(400).send({ success: false, message: "Email is required" });
        }
        if (!role) {
            return res.status(400).send({ success: false, message: "Role is required" });
        }
        if(role =="Consommateur"){
        if (!sex) {
            return res.status(400).send({ success: false, message: "Sex is required" });
        }
        
        if (!height) {
            return res.status(400).send({ success: false, message: "Height is required" });
        }
        
        if (!weight) {
            return res.status(400).send({ success: false, message: "Weight is required" });
        }
        
        if (!goal) {
            return res.status(400).send({ success: false, message: "Goal is required" });
        }
        
        if (!dailyActivity) {
            return res.status(400).send({ success: false, message: "Daily activity is required" });
        }
        
        if (!password) {
            return res.status(400).send({ success: false, message: "Password is required" });
        }
        
        if (!age) {
            return res.status(400).send({ success: false, message: "Age is required" });
        }
    }
        if (!coordinates || coordinates.length < 2) {
            return res.status(400).send({ success: false, message: "Location (latitude and longitude) is required" });
        }
        
       
        

        if (!emailRegex.test(email)) {
            return res.status(400).send({
                success: false,
                message: "Please enter a valid email format"
            });
        }

        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.send({
                success: false,
                message: 'This email is already in use '
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user =await userModel.create({
            username,
            email,
            password: hashedPassword,
           coordinates,
            role,
            age,
            sex,
            height,
            weight,
            dailyActivity,
            goal
            
        })
        return res.status(201).send({
            success : true,
            message: "Account  created successfully",
            user,
            
        })
    }catch(error){
        console.error("Error in user registration:", error);
        return res.status(500).send({
            success: false,
            message: `Error in registre api ${error.message}`,
            
        });
    }}


    const loginController = async(req, res)=>{
        try{
            const {email, password, role} = req.body;
            
           
            const userExist = await userModel.findOne({ email}) 
            
                                                                                                                  
        if(!userExist){
            return res.status(404).send({
                success : false,
                message: "Check your email/password",
            })
        }
        if(role.toLowerCase() !== userExist.role.toLowerCase()){
            return res.status(401).send({   
                success : false,
                message: "Check  role",
                
            })
        }
        
        const isMatch = await bcrypt.compare(password,  userExist.password)

        if(!isMatch){
            return res.status(401).send({   
                success : false,
                message: "Password do not  match",
                
            })
        }
       
        
        const token =  JWT.sign( { id: userExist._id}, process.env.SECRET, {
            expiresIn : '2d'
        })
        

        userExist.password = undefined;
        return  res.status(200).send({
            success : true,
            message: 'logged in successfully',
            id: userExist._id,
            username: userExist.username,
            token   
            
        })
       
        }catch(err){
            console.error("Error in user Login:", err);
        return res.status(500).send({
            success: false,
            message: "Error in login api"
        });
        }
    }
module.exports = {registreController, loginController}