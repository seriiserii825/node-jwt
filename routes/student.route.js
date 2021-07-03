const { Router } = require("express");
const router = Router();
const {
  create,
  login,
  validate
} = require("./../controllers/student.controller");

router.post("/student/create", create);
router.post("/student/login", login);
router.post("/student/validate", validate);

module.exports = router;
