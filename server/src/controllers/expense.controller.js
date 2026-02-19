import { Expense } from "../models/expense.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

import { User } from "../models/user.model.js";

import mongoose from "mongoose";

// --TEMPORARYYY BASISS----
const DUMMY_USER = "6973f4aa8164e4e2b1bbe9d0";

const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, date, note, type } = req.body;
  const user = req?.user?._id;

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  if (!title || !amount) {
    throw new ApiError(400, "Title and amount are required!");
  }

  const expense = await Expense.create({
    user: user,
    title,
    amount,
    category,
    date,
    type,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { expense: expense }, "Expense added successfully!"),
    );
});

const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    throw new ApiError(400, "Invalid expense ID");
  }

  const deletedExpense = await Expense.findByIdAndDelete(expenseId);

  if (!deletedExpense) {
    throw new ApiError(404, "Expense not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deletedExpense }, "Expense deleted successfully"),
    );
});

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user?._id }).sort({
    date: -1,
  });

  if (!expenses) {
    throw new ApiError(500, "Something went wrong while fetching expenses");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses fetched successfully!"));
});

const somethingfunc = asyncHandler(async (req, res) => {});

export { addExpense, deleteExpense, getExpenses };
