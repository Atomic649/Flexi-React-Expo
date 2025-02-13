import { Request, Response } from "express";
import { IncomeChannel, PrismaClient } from "@prisma/client";
import Joi from "joi";

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Interface for request body from client
interface Store {
  platform: IncomeChannel;
  accName: string;
  accId: string;
  businessAcc: number;
  memberId: string;
}

// Validation schema for request body
const storeSchema = Joi.object({
    platform: Joi.string().valid(
        "Facebook", "Line", "Tiktok", "Shopee", "Lazada", "Instagram", "X", 
        "Youtube", "Google", "SCB", "KBANK", "KTB", "BBL", "TMB", "store"
    ).required(),
    accName: Joi.string().required(),
    accId: Joi.string().required(),
    businessAcc: Joi.number().required(),
    memberId: Joi.string().required(),
});

// Create store
const createStore = async (req: Request, res: Response) => {
  const store: Store = req.body;
  const { error } = storeSchema.validate(store);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
// find businessid by memberid
const businessAcc = await prisma.businessAcc.findFirst({
    where: {
        memberId: store.memberId
    }
})

  try {
    const newStore = await prisma.store.create({
      data: {
        platform: store.platform,
        accName: store.accName,
        accId: store.accId,
        businessAcc: businessAcc?.id ?? 0
        
      },
    });
    res.status(201).json(newStore);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create store" });
  }
};




export { createStore};
