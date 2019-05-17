if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false })); //sirve para interpretar los datos de  front json y peticiones
app.use(express.json());

//Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/category'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));



//Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});