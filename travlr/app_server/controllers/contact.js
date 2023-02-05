var fs = require('fs');

// var about = JSON.parse(fs.readFileSync('./data/about.json', 'utf8'));
// var about2 = JSON.parse(fs.readFileSync('./data/about2.json', 'utf8'));

/* GET travel view */
const contact = (req, res) => {
    res.render('contact', { title: 'Travlr Getaways'});
   };
   module.exports = {
    contact
   };