const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require("lodash");
const exampleData = require("./exampleData");

const app = express();
const port = 3005;
app.use(cors());

app.use(bodyParser.json());

app.post("/data", (req, res) => {
  const { keywords } = req.body;

  const keyProperties = Object.keys(exampleData[0]);
  const val = [];

  const searchResult = _.reduce(
    exampleData,
    (acc, data) => {
      const searchVal = [];
      _.each(keyProperties, (key) => {
        if (data[key].toString().toLowerCase().includes(keywords))
          searchVal.push(data);
      });
      return [...acc, ...searchVal];
    },
    val
  );
  const lastResult = _.uniqBy(searchResult, (value) => value.id);

  if (_.size(lastResult) > 0) {
    res.status(200).send(lastResult);
  } else {
    res.status(200).send([]);
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
