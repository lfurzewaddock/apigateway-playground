const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apikey = require("apikey");

mongoose.Promise = global.Promise;

const Customer = mongoose.model('customers', {
  fullname: String,
});

const app = express();

app.use(bodyParser.json());

app.get('/:id?', (req, res) => {
  let query = {};

  if (req.params.id)
    query._id = req.params.id;

  Customer.find(query).lean()
    .then(
      (customers) => res.json(customers.map((customer) => ({
        ...customer,
        invoices_url: `http://invoices.apitest.lan/${customer._id}/invoices`,
        url: `http://customers.apitest.lan/${customer._id}`
      }))),
      (err) => res.status(500).send(err));
});

app.post('/', (req, res) => {
  Customer.create(req.body)
    .then(
      (entity) => res.status(201).send(entity),
      (err) => res.status(500).send(err));
});

mongoose.connect("mongodb://mongo/application", { useMongoClient: true })
  .then(() => app.listen(3000, () => { console.log("Application is ready to go!") }),
    (err) => console.error(`Error during database connection: ${err}`));
