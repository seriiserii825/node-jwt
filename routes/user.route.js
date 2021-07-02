const { Router } = require("express");
const router = Router();
const { create, login, valid } = require("./../controllers/user.controller");

router.post("/user/create", create);
router.post("/user/login", login);
router.post("/user/validate", valid);

module.exports = router;
