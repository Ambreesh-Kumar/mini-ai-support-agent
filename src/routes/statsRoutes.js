const express = require("express");
const router = express.Router();

const { getStats } = require("../services/statsService");

router.get("/", (req, res) => {
  res.json(getStats());
});

module.exports = router;