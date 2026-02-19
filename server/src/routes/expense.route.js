import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT, addExpense);
router.route("/get").get(verifyJWT, getExpenses);
router.route("/:expenseId").delete(verifyJWT, deleteExpense);

export default router;
