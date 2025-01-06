import { Request, Response } from "express";
import { BusinessType, PrismaClient, taxType } from "@prisma/client";
import Joi from "joi";

// Create  instance of PrismaClient
const prisma = new PrismaClient();

// Interface for request body from client
interface businessAccInput {
  businessName: string;
  vatId: string;
  businessType: BusinessType;
  taxType: taxType;
  userId: number;
  memberId: string;

}

// validate the request body
const schema = Joi.object({
  businessName: Joi.string().required(),
  vatId: Joi.string().min(13).max(13).required(),
  businessType: Joi.string().required(),
  taxType: Joi.string().valid("Juristic", "Individual").required(),
  userId: Joi.number().required(),
  memberId: Joi.string().required(),
});

// Create a Business Account - Post
const createBusinessAcc = async (req: Request, res: Response) => {
  const businessAccInput: businessAccInput = req.body;

  // Validate the request body
  const { error } = schema.validate(businessAccInput);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {   
    // check if business account already exists
    const existingBusinessAcc = await prisma.businessAcc.findUnique({
      where: {
        businessName: businessAccInput.businessName,
        vatId: businessAccInput.vatId,
      },
    })
    if (existingBusinessAcc) {
      return res.status(400).json({
        status: "error",
        message: "business account already exists",
      });
    }   
    const businessAcc = await prisma.businessAcc.create({
      data: {
        businessName: businessAccInput.businessName,
        vatId: businessAccInput.vatId,
        businessType: businessAccInput.businessType,
        taxType: businessAccInput.taxType,
        userId: businessAccInput.userId,
        memberId: businessAccInput.memberId,
      },
    });
    res.json({
      status: "ok",
      message: "business account created successfully",
      businessAcc: {
        businessName: businessAcc.businessName,
        vatId: businessAcc.vatId,
        businessType: businessAcc.businessType,
        taxType: businessAcc.taxType,
        userId: businessAcc.userId,
        memberId: businessAcc.memberId,
        id: businessAcc.id,
  }});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to create business account" });
  }
};

// Get All Business Accounts - Get
const getBusinessAcc = async (_: Request, res: Response) => {
  console.log("get business accounts");

  try {
    const businessAcc = await prisma.businessAcc.findMany();
    res.json(businessAcc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get business accounts" });
  }
};
// Get a Business Account by ID - Get
const getBusinessAccByUserId = async (req: Request, res: Response) => {
  const { userId} = req.params;
  try {
    const businessAcc = await prisma.businessAcc.findMany({
      where: {
        userId : Number(userId),
      },
    });
    res.json({
      status : "ok",
      message : "already sign in with business account ", 
      businessAcc : {
        id : businessAcc[0].id,
        businessName: businessAcc[0].businessName,
        vatId : businessAcc[0].vatId,
        businessAddress : businessAcc[0].businessAddress,
        
      }});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get business account" });
  }
};

// Get a Business Account Detail by ID - Get
const getBusinessDetail = async (req: Request, res: Response) => {
  const { userId} = req.params;
  try {
    const businessAcc = await prisma.businessAcc.findMany({
      where: {
        userId : Number(userId),
      },
      select: {        
        businessName: true,
        vatId: true,
        taxType: true,        
        memberId: true,
      },
    });
    res.json(
      businessAcc[0]
        
      );
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get business account" });
  }
};


// Update a Business Account by ID - Put
const updateBusinessAcc = async (req: Request, res: Response) => {
  const { id } = req.params;
  const businessAccInput: businessAccInput = req.body;
  try {
    const businessAcc = await prisma.businessAcc.update({
      where: {
        id: Number(id),
      },
      data: businessAccInput,
    });
    res.json(businessAcc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to update business account" });
  }
};

// Delete a Business Account by ID - Delete
const deleteBusinessAcc = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const businessAcc = await prisma.businessAcc.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(businessAcc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to delete business account" });
  }
};
// Search for a Business Account by keyword - Get
const searchBusinessAcc = async (req: Request, res: Response) => {
  const { keyword } = req.params;
  try {
    const businessAcc = await prisma.businessAcc.findMany({
      where: {
        OR: [
          {
            memberId: {
              contains: keyword,
            },
          },
          {
            businessName: {
              contains: keyword,
            },
          },
          {
            vatId: {
              contains: keyword,
            },
          },
          
          
        ],
      },
    });
    res.json(businessAcc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to search business account" });
  }
};



// Export the functions
export {
  createBusinessAcc,
  getBusinessAcc,
  getBusinessAccByUserId,
  getBusinessDetail,
  updateBusinessAcc,
  deleteBusinessAcc,
  searchBusinessAcc,
  
 
};
