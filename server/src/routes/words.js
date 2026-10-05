const express = require("express");
const { checkWord } = require("../controllers/word.controller");

const router = express.Router();

router.get("/check/:word", checkWord);

module.exports = router;