const { Router } = require("express");
const router = Router();
const { create } = require("./../controllers/student.controller");

router.post("/student/create", create);

module.exports = router;
