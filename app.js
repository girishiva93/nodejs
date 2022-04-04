const express = require("express");
const app = express();

const Mongoose  = require("mongoose");
const morgan = require("morgan")

const dotenv = require("dotenv");
dotenv.config()

const bodyParser = require("body-parser")

// cookie-parser
var cookieParser = require('cookie-parser')

// validators
const expressValidator = require("express-validator")

const cors = require('cors');

//db
Mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("DB Connected"))

Mongoose.connection.on("error", err => {
    console.log(`DB Connection error : ${err.message}`);
});

// Bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const { UnauthorizedError } = require("express-jwt");
const userRoutes = require("./routes/user");
// apiDocs
app.get('/api', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
      if (err) {
          res.status(400).json({
              error: err
          });
      }
      const docs = JSON.parse(data);
      res.json(docs);
  });
});


// middleware

app.use(morgan("dev"))

app.use(expressValidator());

app.use(cors());

app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/",postRoutes);
app.use("/",authRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized!!!');
  }
});

app.use("/", userRoutes);


const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`A Node JS Api is listing on Port ${port}`);
})