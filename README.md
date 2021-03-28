# Fav Ale
Application to choose your favorite beer. Part of recruitment for web dev.

## Dependencies:
To run app (build web-app and run server) you need to have these installed:
- Node.js
- mySQL

## Setup
App is ready to run, but with some limitations. If you want your app to be accessible outside of your server, you need to change *REACT_APP_API_HOST* constant to match your server's IP address.
(I hope to change **setup-app.bat** to do that automatically) Then you need to run **setup-app.bat**.

Other option is to run `npm i` in both */server* and */web-app*. Addtionally you need to run `npm run build` inside */web-app* and move so created folder into */server*.

You also need to set up your mySQL database. You should do it by running **database_setup.sql** as root in mysql.

## Running Server
To start application you can run **run-app.bat** or run command `node server.js` from */server*.

## Additional configuration
All configurable variables are stored in **.env** files in both main directories. If you know what you're doing, go ahead and change what you like.