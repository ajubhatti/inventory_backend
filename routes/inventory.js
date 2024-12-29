var express = require("express");
var router = express.Router();

const inventoryController = require("../controller/inventoryController");

router.post("/", inventoryController.addItem);
router.post("/create", inventoryController.createItems);
router.put("/:id", inventoryController.updateItem);
router.delete("/:id", inventoryController.deleteItem);
router.get("/", inventoryController.getAllItems);

module.exports = router;
