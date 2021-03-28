require("dotenv").config();
const express = require("express");
const dbmanager = require("./dbmanager");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");
const fetch = require("node-fetch");

// Mailer setup
const transporter = mailer.createTransport({
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

let app = express();
app.use(express.json());

// JWT
const createToken = user => {
  return jwt.sign({ email: user.email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '15m' });
}

const checkToken = (token, callback) => {
  console.log(token);
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
        console.log(dbres)
        if (dbres.status) {
          res.status(200);
          res.json({ dbresponse: false, token: createToken(jwtres) });
        }
        else {
          res.status(400);
          res.json({ dbresponse: dbres, token: createToken(jwtres) });
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
          res.json({ dbresponse: false, token: createToken(jwtres) });
        }
        else {
          res.status(400);
          res.json({ dbresponse: dbres, token: createToken(jwtres) });
        }
      });
    else {
      res.status(401);
      res.json(jwtres);
    }
  })
});

app.get('/favs', (req, res) => {
  const token = req.headers.authorization;

  checkToken(token, (jwtres) => {
    if (jwtres.status)
      dbmanager.getFav({ email: jwtres.email }, (dbres) => {
        if (dbres.status)
          res.json({ data: dbres.data, token: createToken(jwtres) });
        else {
          res.status(400);
          res.json({ dbresponse: dbres, token: createToken(jwtres) });
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
      res.json({ token: createToken(req.body), status: true });
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
const getBeer = async beerList => {
  let out = [];
  for (let i = 0; i < beerList.length; i++) {
    await fetch(`https://api.punkapi.com/v2/beers/${beerList[i].beerId}`)
      .then(res => res.json())
      .then(data => out.push({ index: i + 1, id: data[0].id, name: data[0].name }))
      .catch(err => { console.log("fetcherr", err) })
  }
  return out;
}

app.get('/mail', (req, res) => {
  console.log('sendimg email');
  const token = req.headers.authorization;

  checkToken(token, (jwtres) => {
    if (jwtres.status) {
      const email = jwtres.email;
      dbmanager.getName({ email: email }, dbres => {
        if (dbres.status) {
          const name = dbres.data;
          dbmanager.getFav({ email: email }, dbres => {
            if (dbres.status) {
              getBeer(dbres.data).then(beerList => {
                let contents = `Hello ${name}!\nHere is list of your favourite beers:\n\n`;
                console.log(beerList)
                beerList.forEach(beer => { contents += `${beer.index}. ${beer.name} (id: ${beer.id})\n` });
                contents += "\nDon't drink too much at once!\nYour Fav Bartender";
                const mailOptions = {
                  from: process.env.EMAIL_USER,
                  to: email,
                  subject: 'List of Your Fav Ale!',
                  text: contents
                };
                transporter.sendMail(mailOptions, (err) => {
                  if (err) {
                    res.status(400);
                    res.json(err);
                    console.log(err);
                  } else {
                    res.sendStatus(200);
                  } 
                })
              })

            } else {
              res.status(400);
              res.json(dbres);
            }
          })
        } else {
          res.status(400);
          res.json(dbres);
        }
      });
    } else {
      res.status(401)
      res.json(jwtres)
    }
  });
});

// running server
const port = 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));
