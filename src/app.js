//app.js
const express = require('express');
const app = express()
const path = require('path')
const subscriberModel = require("./models/subscribers");


// Display the written message 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/home/index.html'))
  })
// 1. Get an array of all subscribers from the database
app.get("/subscribers", async (req, res) => {
  const subscribers = await subscriberModel.find().select("name");
  res.json(subscribers);
});
// 2. Get an array of subscriber's name and subscribed channel from the database
app.get("/subscribers/names", async (req, res) => {
  const subscribers = await subscriberModel
    .find()
    .select("-_id -subscribedDate -__v");
  res.json(subscribers);
});
// 3. Get a particular subscriber from the database using _id
app.get("/subscribers/:id", async (req, res) => {
  const id = req.params.id;
  await subscriberModel
    .findById(id)
    .select("-__v")
    .then((data) => {
      if (!data) {
        // for error
        error = Error(`Subscriber doesn't exist with the given _id: ${id}.`);
        res.status(400).json({ message: error.message });
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      // When the id is not entered in the correct format.
      res.status(400).json({
        message: `ther is no subscriber for given _id: ${id}.`,
      });
    });
});
// for unexpected requests.
app.use((req, res) => {
  res.status(404).json({ message: "this route is not found" });
});

module.exports = app;
