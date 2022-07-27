const
 
    router = require("express").Router(),
    userCtrl = require("../controllers/userController"),
    auth= require("../middleware/auth");
 
 
/*
description :add new question   
role:admin 
req type : post  
route : http://localhost:5000/user/newquestion/:id
*/ 
router.post( '/newquestion/:id' , userCtrl.askQuestion );



/*
description :get Questions By User Id
role:user 
req type : get  
route : http://localhost:5000/user/getQuestionsByUserId/:id
*/ 
router.get( '/getquestionsbyuserid/:id' , userCtrl.getQuestionByUserId );



/*
description :get Question  By Id
role:user 
req type : get  
route : http://localhost:5000/user/getQuestioNByid/:id
*/ 
router.get( '/getquestionbyid/:id' , userCtrl.getQuestionById );


/*
description : get all Questions   
role:admin,user 
req type : get  
route : http://localhost:5000/user/getallquestions
*/ 
router.get('/getallquestions' , userCtrl.getAllQuestions);

/*
description : get question by tag name
role:user 
req type : get  
route : http://localhost:5000/user/getquestionbytagname/:title
*/ 
router.get('/getquestionbytagname/:title' , userCtrl.getQuestionByTagName);


/*
description : get tag by tag name
role:user 
req type : get  
route : http://localhost:5000/user/gettagbytagname/:title
*/ 
router.get('/gettagbytagname/:title' , userCtrl.getTagByTagName);


/*
description : get tag by tag name
role:user 
req type : get  
route : http://localhost:5000/user/gettagbytagname/:title
*/ 
router.get('/getawnserbyquestionid/:id' , userCtrl.getAwsersByQuestionId);











/*
description : send email to admin
role : user
req type : post  
route : http://localhost:5000/user/sendemailtoadmin
*/ 
router.post('/sendemailtoadmin', userCtrl.sndEmailToAdmin);



/*
description : add one raiting answer
role:user 
req type : put  
route : http://localhost:5000/user/add/rating/:id
*/ 
router.put('/add/rating/:id' , userCtrl.addOneRaitingAnswer);




/*
description : subtract one raiting answer
role:user 
req type : put  
route : http://localhost:5000/user/subtract/rating/:id
*/ 
router.put('/subtract/rating/:id' , userCtrl.subtractOneRaitingAnswer);



module.exports = router;