import { Request, Response } from "express";
import { Bank, PrismaClient } from "@prisma/client";
import Joi from "joi";

//Create  instance of PrismaClient
const prisma = new PrismaClient();

// Interface for request body from client
interface userInput {
  date: Date;
  amount: number;
  group: string;
  image: string;
  memberId: string;
  businessAcc: number;
  note: string;
  desc: string;
  channel: Bank;
}

// Validate the request body
const schema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().required(),
  group: Joi.string(),
  image: Joi.string(),
  memberId: Joi.string().required(),
  businessAcc: Joi.number().required(),
  note: Joi.string(),
  channel: Joi.string(),
});

//  create a new expense - Post
const createExpense = async (req: Request, res: Response) => {
  const expenseInput: userInput = req.body;
  console.log(expenseInput);

  // validate the request body
  const { error } = schema.validate(expenseInput);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const expense = await prisma.expense.create({
      data: {
        date: expenseInput.date,
        amount: expenseInput.amount,
        group: expenseInput.group,
        image: expenseInput.image,
        memberId: expenseInput.memberId,
        businessAcc: expenseInput.businessAcc,
        note: expenseInput.note,
        channel: expenseInput.channel,
      },
    });
    res.json(expense);
  } catch (e) {
    console.error(e);
  }
};

// Get All Expenses - Get
const getExpenses = async (_: Request, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get expenses" });
  }
};

// Get a Expense by ID - Get
const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(expense);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get expense" });
  }
};

// Update a Expense by ID - Put
const updateExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expenseInput: userInput = req.body;
  try {
    const expense = await prisma.expense.update({
      where: {
        id: Number(id),
      },
      data: {
        date: expenseInput.date,
        amount: expenseInput.amount,
        group: expenseInput.group,
        image: expenseInput.image,
        memberId: expenseInput.memberId,
      },
    });
    res.json(expense);
  } catch (e) {
    console.error(e);
  }
};

// search Expense by date - Get
const searchExpenseByDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  try {
    const expense = await prisma.expense.findMany({
      where: {
        date: date,
      },
    });
    res.json(expense);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to search expense" });
  }
};

// auto delete if save is false
const autoDeleteExpense = async () => {
  try {
    const expense = await prisma.expense.deleteMany({
      where: {
        save: false,
      },
    });
    console.log(expense);
  } catch (e) {
    console.error(e);
  }
};


export {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpenseById,
  searchExpenseByDate,
  autoDeleteExpense
  
};
