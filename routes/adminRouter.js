const
 
    router = require("express").Router(),
    adminCtrl = require("../controllers/adminController");
     


/*
description : Add user
role:admin
req type : post  
route : http://localhost:5000/admin/adduser
*/ 
router.post('/adduser' , adminCtrl.addUser);   


 
/*
description : get all Users   
role:admin 
req type : get  
route : http://localhost:5000/admin/getallusers
*/ 
router.get('/getallusers' , adminCtrl.getAllUsers);

/*
description : get   User by id   
role:admin 
req type : get  
route : http://localhost:5000/admin/getUser/:id
*/ 
router.get('/getUser/:id' , adminCtrl.getUser);

/*
description : Update User by id   
role:admin 
req type : put  
route : http://localhost:5000/admin/updateuser/:id
*/ 
router.put( '/updateuser/:id' , adminCtrl.updateUserWithId );




/*
description : Delete User by id   
role:admin 
req type : delete  
route : http://localhost:5000/admin/deleteuser/:id
*/  
router.delete( '/deleteuser/:id' , adminCtrl.deleteUser);






/*
description : add new tag
role:user 
req type : post  
route : http://localhost:5000/admin/addtag
*/ 
router.post('/addtag' , adminCtrl.addTag);




/*
description : get all tags   
role:admin,user 
req type : get  
route : http://localhost:5000/admin/getalltags
*/ 
router.get('/getalltags' , adminCtrl.getAllTags);




/*
description : get all tag by id   
role:admin,user 
req type : get  
route : http://localhost:5000/admin/gettagbyid/:id
*/ 
router.get('/gettagbyid/:id' , adminCtrl.getTagById);


  
/*
description : Delete tag by id   
role:admin 
req type : delete  
route : http://localhost:5000/admin/deletetag/:id
*/  
router.delete( '/deletetag/:id' , adminCtrl.deleteTagById);






/*
description : Update Tag by id   
role:admin 
req type : put  
route : http://localhost:5000/admin/updatetagbyid/:id
*/ 
router.put( '/updatetagbyid/:id' , adminCtrl.updateTagById );

/*
description :get all answers 
role:admin 
req type : get  
route : http://localhost:5000/admin/getallanswers
*/ 
router.get( '/getallanswers' , adminCtrl.getAllAnswers );





/*
description : Delete tag by id   
role:admin 
req type : delete  
route : http://localhost:5000/admin/deletetag/:id
*/  
router.delete( '/deletetag/:id' , adminCtrl.deleteTagById);








/*
description : Delete question by id   
role:admin 
req type : delete  
route : http://localhost:5000/admin/deletequestion/:id
*/  
router.delete( '/deletequestion/:id' , adminCtrl.deleteQuestionById);


/*
description : Update question by id   
role:admin 
req type : put  
route : http://localhost:5000/admin/updatequestion/:id
*/ 
router.put( '/updatequestion/:id' , adminCtrl.updateQuestionrWithId );

/*
description : Delete answer by id   
role:admin 
req type : delete  
route : http://localhost:5000/admin/deleteanswerbyid/:id
*/  
router.delete( '/deleteanswerbyid/:id' , adminCtrl.deleteAnswerById);



/*
description : Update answer by id   
role:admin 
req type : put  
route : http://localhost:5000/admin/updateanswer/:id
*/ 
router.put( '/updateanswer/:id' , adminCtrl.updateAnswerWithId );





/*
description :get all answers 
role:admin 
req type : get  
route : http://localhost:5000/admin/getanswerbyid/:id
*/ 
router.get( '/getanswerbyid/:id' , adminCtrl.getAnswerById );








/*
description : Update answer by id   
role:admin 
req type : put  
route : http://localhost:5000/admin/updateanswer/:id
*/ 
router.put( '/updateanswer/:id' , adminCtrl.updateAnswerWithId );









/*
description : Update answer by id   
role:admin 
req type : put  
route : http://localhost:5000/admin/updateanswer/:id
*/ 
router.put( '/updateanswer/:id' , adminCtrl.updateAnswerWithId );









module.exports = router; 