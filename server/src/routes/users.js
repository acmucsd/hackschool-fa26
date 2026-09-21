const express = require("express");
const {
  getUsers,
  getUserByName,
  getRecentUsers,
  createUser
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/recent", getRecentUsers);
router.get("/:username", getUserByName);

router.post("/", createUser);

module.exports = router;