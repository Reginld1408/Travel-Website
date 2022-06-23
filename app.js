
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// Proxy the dash request to the Python server
app.all(/(data|_dash|_reload)\S*/, require("./routes/data-proxy"));
// ------------------------------------------------------------
var mongoose = require('mongoose');
var connAtlas = "mongodb+srv://Vlkn12454885:zyuoUBPzCbPi2MxC@cluster0.ez43k.mongodb.net/test";
mongoose.connect(process.env.MONGO_URL || connAtlas, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("we're connected!");
});
// --------------------------------------------------------------

require("./my-passport").init(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/blog', (req, res) => {
  res.render("blog")
})

app.post('/thankyoureg', (req, res) => {
    res.render("thankyoureg")
})

app.post('/index', (req, res) => {
   const data = req.body
   console.log(data)

   console.log(data.username, data.password)

   res.redirect('/thankyoureg')

   console.log(req.url)

});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {

  res.render("404page")

})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

