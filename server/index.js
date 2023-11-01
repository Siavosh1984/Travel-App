// to start: npm init -y (initiallizing package.json)
// npm install body-parser cors express mongoos nodemon
// I also need to add ("type": "module",) in "package.json" file and replace ("test": "echo \"Error: no test specified\" && exit 1") in "Scripts" with ("start": "nodemon index.js")

import express from 'express';
//'body-parser' : https://www.simplilearn.com/tutorials/nodejs-tutorial/body-parser-in-express-js#:~:text=BootcampExplore%20Program-,What%20Is%20Body%2Dparser%3F,allows%20you%20to%20access%20req.
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
/* "cors": https://stackabuse.com/handling-cors-with-node-js/ */
//'cors' : https://www.scaler.com/topics/nodejs/cors-in-node-js/
import cors from 'cors';
import dotenv from 'dotenv';


import postRoutes from './routes/posts.js';
import userRouter from "./routes/users.js";


// bodyParser:    https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
// bodyParser.urlencoded() :https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
/* "app.use(cors())" : https://stackoverflow.com/questions/46024363/what-does-app-usecors-do */


// "postRoutes" means every routes inside the posts.js routes starts with "/posts". Instead of "postRoutes" anything could be put. it is just a name!
// that means "/" route inside the posts and get request "/" is not reached by "localhost:8000/", but by "localhost:8000/posts"

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use("/posts", postRoutes);
app.use("/user", userRouter);



// https://www.mongodb.com/atlas/database

/* "process.env.PORT": https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js */
const PORT = process.env.PORT || 8000;


//mongodb connection (a promise)
/* "async", "await", "fetch", "promise", "JSON.stringify()":
https://blog.faradars.org/async-%D9%8 8-await-%D8%AF%D8%B1-%D8%AC%D8%A7%D9%88%D8%A7-%D8%A7%D8%B3%DA%A9%D8%B1%DB%8C%D9%BE%D8%AA/#:~:text=%D8%AF%D8%B1%20%D8%B2%D8%A8%D8%A7%D9%86%20%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87%20%D9%86%D9%88%DB%8C%D8%B3%DB%8C%20%D8%AC%D8%A7%D9%88%D8%A7%20%D8%A7%D8%B3%DA%A9%D8%B1%DB%8C%D9%BE%D8%AA%20%D8%8C%20%DA%A9%D9%84%D9%85%D8%A7%D8%AA,%D8%B9%D9%85%D9%84%DB%8C%D8%A7%D8%AA%20%D9%86%D8%A7%D9%87%D9%85%D8%B2%D9%85%D8%A7%D9%86%DB%8C%20%D8%B1%D8%A7%20%D8%AF%D8%B1%20%D8%AC%D8%A7%D9%88%D8%A7%20%D8%A7%D8%B3%DA%A9%D8%B1%DB%8C%D9%BE%D8%AA%20%DB%8C%D8%A7%D8%AF%20%D8%A8%DA%AF%DB%8C%D8%B1%D9%86%D8%AF.
https://blog.faradars.org/%D8%AA%D8%A7%D8%A8%D8%B9-fetch-%D8%AF%D8%B1-%D8%AC%D8%A7%D9%88%D8%A7-%D8%A7%D8%B3%DA%A9%D8%B1%DB%8C%D9%BE%D8%AA/
https://blog.faradars.org/understanding-promises-in-javascript/ 
https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_stringify */

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Databse"))
  .catch((error) => console.log(`${error} did not connect`));



console.log(process.env.CONNECTION_URL);


//server is ruuning
/* "app.listen()": https://www.tutorialspoint.com/express-js-app-listen-method */
app.listen(PORT, () => console.log("server is running at port : " + PORT));


  