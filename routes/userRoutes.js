const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", userController.register);

router.post("/login", userController.login);

// router.get("/some", authenticateToken, aController.some);

module.exports = router;