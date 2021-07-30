var express = require('express');
var router = express.Router();


const contdetails = require("../models/contactmdl").details
var greetings = ['Hello',
'Hello There',
'Well Hello There',
'Greetings',
'Shalom',
'Word',
'Sup.',
'Hihi',
'What is crack a lacking?',
'Howyadoin\'?',
'Dudester!',
'Alrighty then!',
'Hola',
'Guten Tag',
'Oh Hiii',
'Oh hi there',
'Howdy',
'Bonjour',
'Speak!',
'Hey',
'Hey There',
'Moshi moshi',
'Yo',
'What\'s up?',

'Good day to you!',
'A Hoy Hoy!'];



/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express', greet: greetings[Math.floor(Math.random() * greetings.length)] });
});

router.get('/thankyou', function(req, res, next) {

  res.render('thankyou',  {name:req.session.name});
});

router.use('/blog', (req, res) => {
  res.render("blog")
})

router.post('/', (req, res) => {
  console.log(req.body)
  const details = new contdetails();
  details.name = req.body.name;
  details.email = req.body.email;
  details.number = req.body.number;
  details.comment = req.body.comment;
  console.log('Savig the contact data')
  details.save(err => {
    // if(err) throw err;
    if (err) {
      console.log(err)
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      return res.render("index", {
        errors: errorArray
      });
    }
    
    // details.findOne({ name: details.name }, (err, post) => {
    //   res.render("thankyou", {username: post});
    // });
   console.log('Going to thank you page')
    req.session.name = req.body.name;
    res.redirect('/thankyou');

  });
 
})

router.post('/index', (req, res) => {
  const data = req.body
  console.log(data)

  console.log(data.username, data.password)
  req.session.name = req.body.name;
  res.redirect('/thankyou')

  console.log(req.url)

});



module.exports = router;

