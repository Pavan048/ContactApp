const express = require('express');
const connectDb = require("./config/dbConnnection");
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
connectDb();
const app = express()
const port = process.env.PORT || 5000;


// middlware {if req come from user..if we console it we get undefined . so we need body parser to handle it}
app.use(express.json());
//routes related middleware(because /api/contacts is coomon url in these project)
app.use("/api/contacts" , require("./routes/contactRoutes"));

// routes for user 

 app.use("/api/user" , require("./routes/userRoutes"));
// error handler middle ware
app.use(errorHandler);
// something...

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})

