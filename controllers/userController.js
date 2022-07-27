const 
    User = require("../models/userModel"),
    sendEmailToAdmin = require('../utils/sendEmailToAdmin'),
    Question= require("../models/questionModel"),
    Awnser= require("../models/awnserModel"),
    Tag= require("../models/tagModel"),
    userCtrl={ 
        //Get all Questions
        getAllQuestions: async(req,res) => {   
            try {
                const question  = await Question.find().sort({creationDate:1});                       
                res.status(201).json(question);
            } 
            catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            } 
        },
        //qet user by user_id
        getQuestionByUserId:async(req,res)=>{
            try {
                console.log(req.params.id);
                const _id = req.params.id;
                const user = await User.findById(_id);
                if(!user){
                    return res.status(404).json({msg: "This user is not exist"});                                                                                                           
                }else
                {
                    const questions  = await Question.find({userId:user._id})
                    res.status(201).json(questions);
                }       
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        //qet question by _id
        getQuestionById:async(req,res)=>{
            try {
                console.log("this is question id: " +req.params.id);
                const _id = req.params.id;
                    const question = await Question.findOne({_id})
                    if(!question){
                        return res.status(404).json({msg: "This question is not exist"});     
                    }
                    else{
                        res.status(201).json(question);
                    } 
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // ask questioon
        askQuestion : async(req,res) => {
            try {
                let 
                    user= await User.findById({_id: req.params.id}); 
                if(!user){
                    return res.status(404).json({msg: "This user is not exist"});                                                                                                           
                }
                else{
                    console.log(user._id );
                    const question = await Question.findOne({title:req.body.title});
                    if(question){
                        return res.status(404).json({msg: "This question already exist"});                                                                                                           
                    }else{
                        const newQuestion =  new Question({
                            title:req.body.title,
                            description:req.body.description,
                            tags:req.body.tags,
                            userId:user._id
                        });
                        // Save the new user
                        await newQuestion.save();                       
                        return res.status(200).json({msg: "Question added successfully"});
                    }
                    
                }
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // Get Question By Tag Name
        getQuestionByTagName: async (req, res)=>{
            try {
                 const title = req.params.title;
                const question  = await Question.find({tags:title});
                if(!question ){
                    return res.status(404).json({msg: "This  question is not exist"});   
                }else
                {  
                    res.status(201).json(question); 
                }
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // Get Tag By Tag Name
        getTagByTagName: async (req, res)=>{
            try {
                 const title = req.params.title;
                const tag  = await Tag.findOne({title:title});
                if(!tag ){
                    return res.status(404).json({msg: "This  Tag is not exist"});   
                }else
                {  
                    res.status(201).json(tag); 
                }
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // Send msg to admin
        sndEmailToAdmin: async (req, res)=>{
            try{
                const 
                email= req.body.email,
                title = req.body.title,
                description = req.body.description;
            
            await sendEmailToAdmin(email,title,description);	
            return res.status(200).json({msg: "Msg success"});
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
            
        },
        // get Answer by question Id 
        getAwsersByQuestionId: async (req, res) => {
            try {
                console.log(req.params.id);
                const _id = req.params.id;
                const question  = await Question.findById(_id);
                if(!question ){
                    return res.status(404).json({msg: "This  question is not exist"});     
                }else
                {  
                    const awnsers  = await Awnser.find({questionId:question._id}) 
                    res.status(201).json(awnsers); 
                }
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // Add answer 
        addAnswer: async (req, res) => {
            try {
                console.log("this is question id: " +req.params.id);
                const _id = req.params.id;
                  

                    const question = await Question.findOne({_id})

                    if(!question){
                        return res.status(404).json({msg: "This question is not exist"});     
                    }
                    else{
                        const user = await User.findOne({_id:question.userId})

                        if(!user){
                            return res.status(404).json({msg: "This user is not exist"});     
                        }
                        else{
                            
                            const 
                                userName = user.firstName + " " +user.lastName, 
                                newAwnser=  new Awnser({
                                    decscription:req.body.decscription,
                                    raiting: 0,
                                    userName:userName,
                                    userId:question.userId,
                                    questionId:req.params.id
                                }); 

                                // Save the new Answer
                                await newAwnser.save();
                           
                            return res.status(200).json({msg: "Awnser added successfully"});
                        }




                        
                    } 
                    
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // add one raiting answer
        addOneRaitingAnswer: async (req, res) => {
            try { 
                const awnser   = await Awnser.findOne({_id: req.params.id}) 
                 if(!awnser) {
                    return res.status(404).json({msg: "This answer is not exist"});     
                }
                else{
 
                    let raiting = awnser.raiting+1 ;
                    await Awnser.findOneAndUpdate({_id: awnser._id}, {
                        raiting:raiting
                    });
                    res.status(200).json({msg: "Rating Added Successfuly"})
                }     
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        // subtract one raiting answer
        subtractOneRaitingAnswer: async (req, res) => {
            try { 
                const awnser   = await Awnser.findOne({_id: req.params.id}) 
                 if(!awnser) {
                    return res.status(404).json({msg: "This answer is not exist"});     
                }
                else{
                    let raiting = awnser.raiting - 1 ;
                    await Awnser.findOneAndUpdate({_id: awnser._id}, {
                        raiting:raiting
                    });
                    res.status(200).json({msg: "Rating Subtracted Successfuly"})
                }     
            } catch (error) {
                console.log( error.message)
                return res.status(500).json({msg: "Server error"});
            }
        }
    };
    module.exports = userCtrl;