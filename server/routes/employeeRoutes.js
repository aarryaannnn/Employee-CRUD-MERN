const {
  create,
  getAllEmp,
  remove,
  update,
} = require("../controllers/employeeController");

const router = require("express").Router();

router.post("/create", create);
router.get("/getallemp", getAllEmp);
router.put("/update/:id", update);
router.delete("/remove/:id", remove);

module.exports = router;
