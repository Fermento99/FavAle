require("dotenv").config();
const express = require("express");
const dbmanager = require("./dbmanager");
const jwt = require("jsonwebtoken")

let app = express();
app.use(express.json());

// JWT
const createToken = user => {
  return jwt.sign({ email: user.email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '15m' });
}

const checkToken = (token, callback) => {
  jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      callback({ status: false, err: err, code: 10 });
    } else
      callback({ status: true, email: payload.email });
  })
}


// managing favourites
app.post('/favs', (req, res) => {
  const { beerId } = req.body;
  const token = req.headers.authorization;
  checkToken(token, (jwtres) => {
    if (jwtres.status)
      dbmanager.addFav({ email: jwtres.email, favId: beerId }, (dbres) => {
        if (dbres.status)
          res.sendStatus(200);
        else {
          res.status(400);
          res.json({dbresponse: dbres, token: createToken(jwtres)});
        }
      });
    else {
      res.status(401);
      res.json(jwtres);
    }
  })
});

app.delete('/favs', (req, res) => {
  const { beerId } = req.body;
  const token = req.headers.authorization;
  checkToken(token, (jwtres) => {
    if (jwtres.status)
      dbmanager.remFav({ email: jwtres.email, favId: beerId }, (dbres) => {
        if (dbres.status) {
          res.status(200);
          res.json({token: createToken(jwtres)})
        }
        else {
          res.status(400);
          res.json({dbresponse: dbres, token: createToken(jwtres)});
        }
      });
    else {
      res.status(401);
      res.json(jwtres);
    }
  })
});

app.get('/favs', (req, res) => {
  const { beerId } = req.body;
  const token = req.headers.authorization;
  checkToken(token, (jwtres) => {
    if (jwtres.status)
      dbmanager.getFav({ email: jwtres.email, favId: beerId }, (dbres) => {
        if (dbres.status)
          res.json({data: dbres.data, token: createToken(jwtres)});
        else {
          res.status(400);
          res.json({dbresponse: dbres, token: createToken(jwtres)});
        }
      });
    else {
      res.status(401);
      res.json(jwtres);
    }
  })
});

// managing account
app.post('/auth/login', (req, res) => {
  console.log(req.body)
  dbmanager.login(req.body, (response) => {
    if (response.status)
      res.json({token: createToken(req.body), status: true});
    else {
      res.status(401);
      res.json(response);
    }
  });
});

app.post('/auth/register', (req, res) => {
  console.log(req.body);
  dbmanager.register(req.body, (response) => {
    if (response.status)
      res.sendStatus(200);
    else {
      res.status(400);
      res.json(response);
    }
  });
});

// serving app
app.get('/app/*', (req, res) => {
  //TODO: implement
});

// mail
app.get('/mail', (req, res) => {
  //TODO: implement
});

// running server
const port = 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));
