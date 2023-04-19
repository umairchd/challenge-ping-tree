const router = require("express").Router()
const targetController = require('../controllers/targets.controller')

//post a target
router.post("/targets", targetController.createTarget);
//get all target
router.get("/targets", targetController.getTargets);
//get a target
router.get("/targets/:id", targetController.getTarget);
//update a target
router.post("/targets/:id", targetController.updateTarget);

//post a decision
router.post("/decision", targetController.targetDecision);

// Module exports
module.exports = router