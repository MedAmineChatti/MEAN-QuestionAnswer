const 
    User = require("../models/userModel"),
    Tag = require("../models/tagModel"),  
    Question= require("../models/questionModel"), 
    Answer= require("../models/awnserModel"), 
    Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey'),
    adminCtrl = { 
        //Get all users
        getAllUsers: async(req,res) => {   
            try {
                const user  = await User.find({role:0}).sort({firstName:1});
                res.status(201).json(user);
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            } 
        },
        // Get user by id
        getUser: async(req,res) => {   
            try {
                const user = await User.findById({_id:req.params.id});  
                if(!user){                  
                    return res.status(300).json({msg: "User Does Not Exist"}); 
                }
                else{  
                    return res.status(201).json(user);
                }
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        } ,
         // add user  
         addUser: async(req, res) => {
            try {
                const   {firstName, lastName,language,email, password } = req.body;
                console.log(firstName, lastName, email, password) 
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
                         // Create new user
                        let newUser = new User({
                            firstName,
                            lastName,
                            password:cryptr.encrypt(password),
                            email,
                            language,
                            verified:true,
                            password_clear:password
                        }); 
                        // Save the new user
                        await newUser.save(); 
                        return res.status(200).json({msg: "Signup success "});
                    }
                }
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        //update User by Id
        updateUserWithId: async(req, res) =>{
            try { 
                    let 
                        firstName = req.body.firstName ,
                        lastName = req.body.lastName ,   
                        language = req.body.language ,
                        password_clear = req.body.password_clear , 
                        password = cryptr.encrypt(password_clear);
                      
                    await User.findOneAndUpdate({_id: req.params.id}, {
                        firstName,
                        lastName,  
                        password,
                        language,
                        password_clear
                    });
        
                    res.status(200).json({msg: "Updated a User Successfuly"})
                    
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        } ,
        // delete user by id
        deleteUser: async(req, res) =>{
            try {
                await User.findByIdAndDelete(req.params.id)
                res.json({msg: "User Deleted  Successfuly"})
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        //Get all tags  
        getAllTags:async(req,res) => {   
            try {
                const tags  = await Tag.find(); 
                res.status(201).json(tags);
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            } 
        },  
         // Get user by id
        getTagById:async(req,res) => {  
             try {
                    const tag = await Tag.findById({_id:req.params.id});  
                    
                    if(!tag){                  
                        return res.status(300).json({msg: "Tag Does Not Exist"}); 
                    }
                    else{  
                        return res.status(201).json(tag);
                    }
    
                } 
                catch (error) {
                    console.log( error.message)
                    return res.status(500).json({msg: "Server error"});
                }
        } ,
        // add tag    
        addTag: async(req, res) =>{
            try {
                const   {title, description} = req.body;  
                // Search the tag title in the database
                const tag = await Tag.findOne({title});
                if(tag){
                    return res.status(400).json({msg: "The tag already exists."});
                }
                else{ 
                     // Create new Tag
                    let newTag = new Tag({
                        title,
                        description 
                    }); 
                    // Save the new user
                    await newTag.save(); 
                    return res.status(200).json({msg: "Signup success "});
                } 
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        }, 
        // delete tag by id
        deleteTagById: async(req, res) =>{
            try {
                await Tag.findByIdAndDelete(req.params.id)
                res.json({msg: "Tag Deleted  Successfuly"})
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        //update User by Id
        updateTagById: async(req, res) =>{
            try { 
                     const   {title, description} = req.body;   
                     const tag = await Tag.findById({_id:req.params.id});                  
                     if(!tag){                  
                         return res.status(300).json({msg: "Tag Does Not Exist"}); 
                     }
                     else{  
                         await Tag.findOneAndUpdate({_id: tag._id}, {
                            title,
                            description 
                        }); 
                        res.status(200).json({msg: "Updated a tag Successfuly"})
                     } 
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        } ,
          //Get all users
        getAllAnswers:async(req,res) => {   
            try {
                const answer  = await Answer.find({role:0}).sort({title:1}); 
                console.table( answer)

                res.status(201).json(answer);
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            } 
        },
         // delete tag by id
         deleteQuestionById: async(req, res) =>{
            try {
                await Question.findByIdAndDelete(req.params.id)
                res.json({msg: "Question Deleted  Successfuly"})
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        //update User by Id
        updateQuestionrWithId: async(req, res) =>{   
         try { 
            let 
                title = req.body.title ,
                description = req.body.description;
              
            await Question.findOneAndUpdate({_id: req.params.id}, {
                title,
                description
            });
            res.status(200).json({msg: "Updated a Question Successfuly"})
         } 
         catch (error) {
        console.log( error.message)
        return res.status(500).json({msg: "Server error"});
    }
        },
          // delete answer by id
        deleteAnswerById: async(req, res) =>{
            try {
                console.log(req.params.id)
                await Answer.findByIdAndDelete(req.params.id)
                res.json({msg: "Answer Deleted  Successfuly"})
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        }, 
        //update User by Id
        updateAnswerWithId: async(req, res) =>{   
            try { 
                    let 
                        raiting = req.body.raiting,
                        userName = req.body.userName,
                        description = req.body.decscription;
                    console.log(description,raiting,userName)
                    await Answer.findOneAndUpdate({_id: req.params.id}, { 
                        description,
                        raiting,
                        userName
                    });
                    res.status(200).json({msg: "Answer a Question Successfuly"})
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // Get user by id
         getAnswerById:async(req,res) => {   
            try {
                   const answer = await Answer.findById({_id:req.params.id});  
                   if(!answer){                  
                       return res.status(300).json({msg: "answer Does Not Exist"}); 
                   }
                   else{  
                       return res.status(201).json(answer);
                   }
               } 
               catch (error) {
                   console.log( error.message)
                   return res.status(500).json({msg: "Server error"});
               }
       }
    }
    module.exports = adminCtrl;














//extra function

const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}




