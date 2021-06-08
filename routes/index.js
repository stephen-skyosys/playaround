var express = require('express');
var router = express.Router();
const MySql = require('./server').MySql;
const mysql = new MySql();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', (req, res) => {
  let standardResponse = {
    state: boolean = false,
    message: string = '',
    docs: []
  }

  let user = {
    username: req.body.username,
    password: req.body.password
  }


  // console.log(user)
  let query = `call userReg('${user.username}','${user.password}')`

  mysql.execute(query, (err, data) => {
    if (err) {
      standardResponse.message = err;
      res.send(standardResponse)
    }
    else {
      if (data[0][0]['@state'] == 0) {
        standardResponse.state = false;
        standardResponse.message = data[0][0]['@message']
        res.send(standardResponse)
      } else {
        standardResponse.state = true;
        standardResponse.message = data[0][0]['@message']
        res.send(standardResponse)
      }

    }
  })
})


module.exports = router;
