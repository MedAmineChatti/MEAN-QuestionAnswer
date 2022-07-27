const
 
    router = require("express").Router(),
    authCtrl = require("../controllers/authController");

/*
description : register account
role:user 
req type : post  
route : http://localhost:5000/auth/register
*/  
router.post("/register", authCtrl.register);

/*
description : verify account  
role:user 
req type : post  
route : http://localhost:5000/auth/verify
*/  
router.post("/verify",authCtrl.verifyEmailLink);

/*
description : login account  
role:user 
req type : post  
route : http://localhost:5000/auth/login
*/   
router.post('/login',authCtrl.login);    

/*
description : Delete User by id   
role:user 
req type : delete  
route : http://localhost:5000/auth/logout
*/  
router.get('/logout',authCtrl.logout);

/*
description : refresh Token  
role:user 
req type : get  
route : http://localhost:5000/auth/refreshToken
*/  
router.get('/refresh_token', authCtrl.refreshToken);

 
module.exports = router;