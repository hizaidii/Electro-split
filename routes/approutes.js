const path = require("path");
const express = require("express");
const router = express.Router();

const appController = require("../controller/appcontroller");

router.get("/", appController.getIndex);
router.get("/newCycle", appController.getNewCycle);
router.post("/addNewCycle", appController.postAddNewCycle);

router.get("/about", appController.getAbout);
router.get("/settings", appController.getSettings);

router.post("/saveNames", appController.postSaveNames);

module.exports = router;
