require('dotenv').config();
const mysql = require("mysql");
const bcrypt = require("bcrypt");


const connect = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
}

const validateUser = (username) => {
  return username.length >= 3 && username.length <= 25;
}

const validateEmail = (email) => {
  return email.length < 40;
}

const register = (user, callback) => {
  console.log("registering")
  const { username, email, password } = user;
  if (!validateUser(username) || !validateEmail(email)) {
    console.log("username or email not validated");
    return callback({ staus: false, err: "username or email not validated", code: 1 });
  }

  const hash = bcrypt.hashSync(password, 10);

  let connection = connect();
  connection.query('INSERT INTO users VALUES (?, ?, ?)', [email, username, hash], (err, res) => {
    if (err) {
      console.log(err);
      return callback({ status: false, err: err, code: 2 });
    }
    return callback({ status: true });
  });
  connection.end();
}

const login = (user, callback) => {
  console.log("loging in")
  const { email, password } = user;

  let connection = connect()
  connection.query('SELECT password FROM users WHERE email = ?', email, (err, res) => {
    if (err) {
      console.log(err);
      return callback({ status: false, err: err, code: 2 });
    }
    if (res[0])
      if (bcrypt.compareSync(password, res[0].password))
        return callback({ status: true });
      else
        return callback({ status: false, err: "wrong login or password", code: 3 });
    else
      return callback({ status: false, err: "user doesn't exist", code: 4 });
  });
  connection.end();
}

const addFav = (fav, callback) => {
  console.log("adding fav")
  const { email, favId } = fav;

  let connection = connect();
  connection.query('INSERT INTO favourites VALUES (?, ?)', [email, favId], (err, res) => {
    if (err) {
      console.log(err);
      return callback({ status: false, err: err, code: 2 })
    }
    return callback({ staus: true });
  });
  connection.end();
}

const remFav = (fav, callback) => {
  console.log("removing fav")
  const { email, favId } = fav;

  let connection = connect();
  connection.query('DELETE FROM favourites WHERE email = ? AND beerId = ?', [email, favId], (err, res) => {
    if (err) {
      console.log(err);
      return callback({ status: false, err: err, code: 2 })
    }
    const aff = res.affectedRows
    if (aff != 1) {
      msg = `removed ${aff} rows instead of 1`
      console.log(msg);
      return callback({ status: false, err: msg, code: 2 })
    }
    return callback({ status: true })
  });
  connection.end();
}

const getFav = (user, callback) => {
  console.log("getting favs");
  const { email } = user;

  let connection = connect();
  connection.query('SELECT beerId FROM favourites WHERE email = ?', email, (err, res) => {
    if (err) {
      console.log(err);
      return callback({ status: false, err: err, code: 2 })
    }
    return callback({ status: true, data: res })
  });
}

module.exports.register = register;
module.exports.login = login;
module.exports.addFav = addFav;
module.exports.remFav = remFav;
module.exports.getFav = getFav;
