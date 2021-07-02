const {Router} = require('express');
const router = Router();
const {create, login} = require('./../controllers/user.controller');

router.post('/user/create', create);
router.post('/user/login', login);

module.exports = router;
