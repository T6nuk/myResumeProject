const mongoose = require('mongoose');
require('../models/userInfo');
const mongoData = mongoose.model('UserInfo');

exports.getMainPage = (req, res) =>{
    

    mongoData.find((error, userinfos) =>{
        if(!error){
            res.render('home.ejs', {myData: userinfos})
        } else {
            console.log(error);
        }
    });
};

exports.getAdminPage = (req, res) => {
    
    mongoData.find((error, userinfos) =>{
        if(!error){
            res.render('admin.ejs', {myData: userinfos});
        } else {
            console.log(error);
        }
    });
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