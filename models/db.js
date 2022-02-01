const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://vugA5WDnaaM4HaOJ:Muparool123@cluster0.ysgei.mongodb.net/Cluster0', {useNewUrlParser: true, useUnifiedTopology: true});

require('./userInfo');
require('./user');