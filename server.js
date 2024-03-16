const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const PORT = 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/test")
    .then(() => {
        console.log("Mongoose connect success");
    })
    .catch((e) => {
        console.log("Error");
    })

const userRegister = require("./router/UserRegister.Route")
const userLogin = require("./router/UserLogin.Route")
const userForGotPass = require("./router/ForgotPass.Route")
const userResetPass = require("./router/ResetPass.Route")
const UserProfile = require("./router/ProFile.Route")
const UserUploadContent = require("./router/UploadStatus.Router")
const HomeRouter = require("./router/Home.Router")

app.use('/register', userRegister)
app.use('/login', userLogin)
app.use('/forgotpass', userForGotPass)
app.use('/resetpass', userResetPass)
app.use('/profile', UserProfile)
app.use('/userupload' , UserUploadContent)
app.use('/home' , HomeRouter)

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
})