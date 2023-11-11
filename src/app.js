require('dotenv').config()
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session')
const methodOverride =  require('method-override'); 
const paginate = require('express-paginate')

const app = express();

app.use(express.static(path.join(__dirname, '../public')));  
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method')); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); 

app.use(paginate.middleware(4, 50))

const mainRouter = require('./routes/main'); 
const productsRouter = require('./routes/products'); 
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/apis')

app.use((req,res,next) => {
  if(req.session.userLogin){
    res.locals.userLogin = req.session.userLogin
  }
  next()
})

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter)
app.use('/apis/products', adminRouter)


app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
