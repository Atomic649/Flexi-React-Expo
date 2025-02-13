import { Request, Response } from "express";
import { Prisma, PrismaClient, SocialMedia } from "@prisma/client";
import Joi from "joi";

// Create  instance of PrismaClient
const prisma = new PrismaClient();

// Interface for request body from client
interface platformInput {
  platform: SocialMedia;
  accName: string;
  accId: string;
  businessAcc: number;
  adsCost?: number;
}

// validate the request body
const schema = Joi.object({
  platform: Joi.string().valid(
    "Facebook",
    "Tiktok",
    "Shopee",
    "Instagram",
    "Youtube",
    "Lazada",
    "Line",
    "X",
    "Google"
  ),
  accName: Joi.string().required(),
  accId: Joi.string().required(),
  businessAcc: Joi.number().required(),
});


//  Create a New platform - Post
const createPlatform = async (req: Request, res: Response) => {
  const jsonBody = req.body as Prisma.PlatformCreateInput;
  const platformInput: platformInput = jsonBody as unknown as platformInput;

  // Validate the request body
  const { error } = schema.validate(platformInput);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // Convert Form data to Type that is valid with Prisma
  platformInput.platform = platformInput.platform as SocialMedia;
  platformInput.businessAcc = Number(platformInput.businessAcc);
  platformInput.accId = String(platformInput.accId);
  platformInput.accName = String(platformInput.accName);

  try {
    const platform = await prisma.platform.create({
      data: {
        platform: platformInput.platform,
        accName: platformInput.accName,
        accId: platformInput.accId,
        businessAcc: platformInput.businessAcc,
      },
    });
    res.json(platform);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to create platform" });
  }
};

//  get all platforms in only this business account by businessACC - Get
const getPlatforms = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const platforms = await prisma.platform.findMany({
      select: {
        id: true,
        platform: true,
        accName: true,
        accId: true,
      },
      where: {
        businessAcc: Number(memberId),
      },
    });

    res.json(
      platforms.map((platform) => {
        return {
          ...platform,
          adsCost: 0,
        };
      })
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get platforms" });
  }
};
// Get a platform by ID - Get
const getPlatformById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const platform = await prisma.platform.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(platform);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get platform" });
  }
};

// Delete a platform - Delete
const deletePlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const platform = await prisma.platform.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(platform);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to delete platform" });
  }
};

// Update a platform - Put
const updatePlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  const platformInput: platformInput = req.body;
  try {
    const platform = await prisma.platform.update({
      where: {
        id: Number(id),
      },
      data: {
        platform: platformInput.platform,
        accName: platformInput.accName,
        accId: platformInput.accId,
      },
    });
    res.json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to update platform" });
  }
};

// Search platforms - Get by enum
const searchPlatform = async (req: Request, res: Response) => {
  const { SocialMedia } = req.params;

  // Validate the SocialMedia parameter
  if (!Object.values(SocialMedia).includes(SocialMedia)) {
    return res.status(400).json({ message: "Invalid platform" });
  }

  try {
    const platform = await prisma.platform.findMany({
      where: {
        platform: SocialMedia as SocialMedia,
      },
    });
    res.json(platform);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to get platform" });
  }
};
export {  
  createPlatform,
  getPlatforms,
  getPlatformById,
  deletePlatform,
  updatePlatform,
  searchPlatform,
};
