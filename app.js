const express = require("express");
const app = express();
const path = require("path");
const PORT = 3333;
const bodyparser = require("body-parser");
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
// const cors = require('cors');

app.set("view engine", "hbs");
require("dotenv").config();

// --> Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: "asdasfasfsarfrasdaed asdasfd",
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
//   })
// );
// app.use(cors(
//   {
//     origin: ["https://xxxxx.vercel.app"],
//     methods: ["POST, "GET"],
//     credentials: true
//   }
// )};
  

// --> Routes
app.get("/", require("./routes/approutes"));
app.post("/addNewCycle", require("./routes/approutes"));
app.use("/history", require("./routes/historyroutes")); //middleware for ALL routes starting with /history
app.get("/about", require("./routes/approutes"));
app.get("/settings", require("./routes/approutes"));
app.post("/saveNames", require("./routes/approutes"));

//  --> Handlebars Helpers
hbs.registerHelper("formatDate", (newDate) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = newDate.getDate();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();
  let monthName = monthNames[month];
  let strTime = monthName + " " + date + ", " + year;
  return strTime;
});

// --> Error Handling
app.use((req, res, next) => {
  res.render("error");
});

// --> Database Connection
mongoose.connect('mongodb+srv://hizaidii:Welcome123@cluster0.b5btdyc.mongodb.net/?retryWrites=true&w=majority').then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT);
  });
});
