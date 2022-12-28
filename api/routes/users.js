//Importo el enrutador
const router = require("express").Router();
//Importo metodos del controller
const { getUserInfo, updateUser, getUsers } = require("../controllers/userController");

router.get("/user", getUserInfo);
router.put("/user", updateUser);
router.get("/", getUsers);

module.exports = router;
