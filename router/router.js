const express = require("express");
const { countries } = require("../database/countries");
const router = express.Router();

router.get("/countries", (req, res) => {
  res.status(200).json(countries);
});

router.get("/country/:iso2", (req, res) => {
  const { iso2 } = req.params;
  const country = countries.find((country) => country.iso2 === iso2);
  if (!country) {
    res.status(404).send({ message: "Country not found" });
  }
  res.status(200).json(country);
});

router.post("/country", (req, res) => {
  countries.push(req.body);
  res.status(201).send(req.body);
});

router.put("/country", (req, res) => {
  const { body } = req;
  const countryIndex = countries.findIndex(
    (country) => country.iso2 === body.iso2
  );
  if (countryIndex < 0) {
    res.status(404).send({ message: "Country not found" });
  }
  const countryObject = { ...countries[countryIndex], ...body };
  countries[countryIndex] = countryObject;
  res.status(200).json(countryObject);
});

router.delete("/country/:iso2", (req, res) => {
  const { iso2 } = req.params;
  const countryIndex = countries.findIndex(
    (country) => country.iso2 === iso2
  );
  if (countryIndex < 0) {
    res.status(404).send({ message: "Country not found" });
  }
  const countryObject = countries.splice(countryIndex, 1);
  res.status(200).json(countryObject[0]);
});

module.exports = router;
