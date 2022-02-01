const mongoose = require('mongoose');
const passport = require('passport');
require('../models/userInfo');
const mongoData = mongoose.model('UserInfo');
const User = require('../models/user');

exports.getMainPage = (req, res) =>{

    mongoData.find((error, userinfos) =>{
        if(!error){
            res.render('home.ejs', {myData: userinfos})
        } else {
            console.log(error);
        }
    });
};

exports.getLoginPage = (req, res) => {
    res.render('login.ejs');
};

exports.postLogin = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error) => {
        if(error){
            console.log(error);
            res.redirect('/login');
        } else {
            passport.authenticate('local')(req, res, ()=>{
                console.log("redirecting to admin page");
                res.redirect('/admin');
            })
        }
    })
}

exports.getRegisterPage = (req, res) => {
    res.render('register.ejs');
}

exports.postRegister = (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user) => {
        if(error){
            console.log(error);
            res.redirect('/register')
        } else {
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/admin');
            })
        }
    })
}

exports.getAutorizationPage = (req, res) => {
    res.render('authorize.ejs');
}

exports.getAdminPage = (req, res) => {
    if(req.isAuthenticated()){
        mongoData.find((error, userinfos) =>{
            if(!error){
                console.log(userinfos)
                res.render('admin', {myData: userinfos});
            } else {
                console.log(error);
            }
        });
    } else {
        console.log("redirecting");
        res.redirect('/login');
    }
    
};

exports.postNewData = (req, res) =>{

    const uFullName = req.body.fullName;
    const uDateOfBirth = req.body.dateOfBirth;
    const uResidence = req.body.residence;
    const uEducation = req.body.education;
    const uDateOfGraduation = req.body.dateOfGraduation;
    const uTechnicalSkills = req.body.technicalSkills;
    const uSoftSkills = req.body.softSkills;
    const uImage = req.file.filename;

    let newData = new mongoData();
    newData.fullName = uFullName;
    newData.dateOfBirth = uDateOfBirth;
    newData.residence = uResidence;
    newData.education = uEducation;
    newData.dateOfGraduation = uDateOfGraduation;
    newData.technicalSkills = uTechnicalSkills;
    newData.softSkills = uSoftSkills;
    newData.image = uImage;
    newData.save();

    res.redirect('/admin');

    const showForm = false;
    

}

exports.deleteData = (req, res) => {

    const fs = require('fs');
    const itemIdCheck = req.body.checkbox;
    const imageName = req.body.imgName;
    let filePath = `./images/${imageName}`; 

    fs.unlinkSync(filePath);
    mongoData.findByIdAndRemove(itemIdCheck, (error)=>{
        if(!error){
            res.redirect('/admin');
        } else {
            console.log("Delete failed")
        }
    })
};

exports.updateData = (req, res) => {
    
    const fs = require('fs');
    const itemIdCheck = req.body.checkbox;
    const imageName = req.body.imgName;

    mongoData.findByIdAndUpdate(itemIdCheck,
        {$set:{
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth,
            residence: req.body.residence,
            education: req.body.education,
            dateOfGraduation: req.body.dateOfGraduation,
            technicalSkills: req.body.technicalSkills,
            softSkills: req.body.softSkills,
            image: imageName,
          }},
          {new: true},
        (error)=>{
        if(!error){
            res.redirect('/admin');
            console.log(itemIdCheck);
        } else {
            console.log("Delete failed")
        }
    })
};

exports.userLogout = (req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
}