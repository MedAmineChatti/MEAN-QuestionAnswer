require("dotenv").config({ path: "./.env" });
const
    express = require("express"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    app = express(),
    ConnectionURL =  process.env.MONGODB_URL,
    PORT = process.env.PORT,
    cookieParser = require('cookie-parser');

 
//express configuration
app.use(cors(
    {
        origin: 'http://localhost:4200',
        credentials:true
    }
));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }))
   
// Set EJS as templating engine 
app.set("view engine", "ejs");

//Routing
app.use('/auth',require("./routes/authRouter"));
app.use('/admin', require("./routes/adminRouter"));
app.use('/user', require("./routes/userRouter"));

// Connect to mongodb
mongoose.connect(ConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
});

//Listen to the port
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
});













  
