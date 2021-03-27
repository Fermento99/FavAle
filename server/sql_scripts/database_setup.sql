CREATE DATABASE favale;
USE favale;

CREATE TABLE users (
  email VARCHAR(40) NOT NULL,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(60) NOT NULL,
  PRIMARY KEY(email)
);

CREATE TABLE favourites (
  email VARCHAR(40) NOT NULL,
  beerId INT NOT NULL,
  PRIMARY KEY (email, beerId),
  FOREIGN KEY (email) REFERENCES users(email)
);

CREATE USER bartender@localhost IDENTIFIED BY "changeme12";
GRANT SELECT, INSERT ON TABLE users TO bartender@localhost;
GRANT SELECT, INSERT, DELETE ON TABLE favourites TO bartender@localhost;
FLUSH PRIVILEGES;

