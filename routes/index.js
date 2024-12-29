var express = require("express");
var router = express.Router();
var inventoryRouter = require("./inventory");

router.use("/inventory", inventoryRouter);

module.exports = router;
