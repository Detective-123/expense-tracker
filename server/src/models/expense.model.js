import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "expense"
    },
    category: {
      type: String,
      enum: [
        "General",
        "Food",
        "Transport",
        "Rent",
        "Shopping",
        "Entertainment",
        "Health",
        "Bills",
        "Other",
      ],
      default: "Other",
      index: true,
    },
    note: {
      type: String,
      maxlength: 200,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Expense = mongoose.model("Expense", expenseSchema);
