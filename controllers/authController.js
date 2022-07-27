const 
    User = require("../models/userModel"),
    jwt = require('jsonwebtoken'),
    Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey'),
    Token = require("../models/token"),
    sendEmail = require('../utils/sendEmail'),
    crypto = require('crypto'), 
    authCtrl = {
        register: async(req, res) => {
            try {
                const   {firstName, lastName, password,email } = req.body; 
                if(!isEmail(email)) {
                    return res.status(400).json({msg: "Write a real email."});
                }
                else {
                    // Search the user email in the database
                    const user = await User.findOne({email});
                    if(user){
                        return res.status(400).json({msg: "The email already exists."});
                    }
                    else{
                        // Password Encryption 
                        const 
                             passwordEncypted = cryptr.encrypt(password),
                             verif=false;
                        // Create new user
                        let newUser = new User({
                            firstName,
                            lastName,
                            password:passwordEncypted,
                            email, 
                            verified:verif,
                            password_clear:password
                        }); 
                        // Save the new user
                        await newUser.save(); 
                        let newToken = new Token({
                            userId:newUser._id,
                            token: crypto.randomBytes(32).toString('hex')
                        });
                        await newToken.save();
                        const url =`http://localhost:4200/${newUser._id}/verify/${newToken.token}`; 
                        await sendEmail(newUser.email,"Verify Email",url);	
                        return res.status(200).json({msg: "Signup success, You need to verify your email"});
                    }
                }
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        verifyEmailLink: async (req,res)=>{
            try {
                const   
                    {id, token } = req.body,
                    emailToken=token, 
                    uid =id, 
                    user = await User.findOne({_id:uid});
                if (!user){
                    return res.status(400).json({msg: 'User not found'}); 
                }
                else{
                    if(user.verified==true){
                        return res.status(400).json({msg: 'You are already confirmed'}); 

                    }
                    else{
                        const token = await Token.findOne({
                            userId:user._id,
                            token:emailToken
                        });
                        if (!token){
                            return res.status(400).json({msg: "This link has expired."  });
                        }
                        else{
                             
                            await User.findOneAndUpdate({ _id:uid},{  
                                verified:true
                            });
                             
                            await token.remove();
    
                            res.status(200).json({msg: "Email verified successfully." });
                        }
                    }
                }
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        login: async(req,res)=>{
            try {
                const 
                    {email, password} = req.body,
                    user = await User.findOne({email});
                // Testing exists user
                if(!user){
                    return res.status(400).json({msg: "User does not exist."})
                } 
                else{
                    const 
                        decryptedPassword = cryptr.decrypt(user.password),
                        isMatch = (password===decryptedPassword) ? true : false;

                    //Testing Mutch Password
                    if(!isMatch){
                        return res.status(400).json({msg: "Incorrect password."})
                    }
                    else{
                        if(user.verified==false){ 
                            return res.status(400).json({msg: "You must verfiey your account. check your email" })

                        } else{ 
                             // If login success , create access token and refresh token
                        const 
                        accesstoken = createAccessToken({id: user._id}),
                        refreshtoken = createRefreshToken ({id: user._id});
                    res.cookie('refreshtoken', refreshtoken, {
                        httpOnly: true,
                    path: 'http://localhost:5000/user/refresh_token',
                        maxAge: 7*24*60*60*1000 // 7d
                    })
                    return res.status(200).json({accesstoken,user})
                    }                       
                    } 
                }
            }
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },       
        logout: async (req, res) =>{
            try {
                res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
                return res.status(200).json({msg: "Logged out"})
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        refreshToken: (req, res) =>{
            try {
                const rf_token = req.cookies.refreshtoken;
                
                if(!rf_token){
                    return res.status(400).json({msg: "Please Login"})
                } 
                else{
                    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                        if(err) {
                            console.log(rf_token);
                            return res.status(400).json({msg: "Please Login"})
                        }
                        else{
                            const accesstoken = createAccessToken({id: user.id})
                            return res.status(500).json({accesstoken})
                        } 
                    })
                }
        } 
        catch (error) {
            console.log( error.message)
            return res.status(500).json({msg: "Server error"});
        }       
        } 
    };
module.exports = authCtrl;
//extra function 
const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
         
const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}