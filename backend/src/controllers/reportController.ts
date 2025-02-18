import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//Create  instance of PrismaClient
const prisma = new PrismaClient();

const dailyReport = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const bills = await prisma.bill.findMany({
      where: {
        memberId: memberId,
      },
       select: {
        purchaseAt: true,
        amount: true,
        price: true,
      },
      take: 100, // Limit to 100 records
    });

    // Group by date and sum adsCost
    const adsCost = await prisma.adsCost.findMany({
      where: {
        memberId: memberId,
      },
      select: {
        date: true,
        adsCost: true,
      },
      take: 100, // Limit to 100 records
    });

    // Group by purchaseAt and sum amount and price
    const dailyBills = bills.reduce((acc: any, bill) => {
      const date = bill.purchaseAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          date: date,
          amount: 0,
          price: 0,
        };
      }
      acc[date].amount += bill.amount;
      acc[date].price += bill.price;
      return acc;
    }, {});

    // Group by date and sum adsCost
    const dailyAdsCost = adsCost.reduce((acc: any, adsCost) => {
      const date = adsCost.date.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          date: date,
          adsCost: 0,
        };
      }
      acc[date].adsCost += adsCost.adsCost;
      return acc;
    }, {});

    // Merge dailyBills and dailyAdsCost
    const result = Object.keys(dailyBills).map((date) => {
      const adsCost = dailyAdsCost[date]?.adsCost || 0;
      const price = dailyBills[date].price;
      const profit = price - adsCost;
      const percentageAds = adsCost ? parseFloat(((adsCost / price) * 100).toFixed(2)) : 0.00;
      const ROI = adsCost ? parseFloat(((profit / adsCost) ).toFixed(1)) : 0.00;
      return {
        date: date,
        amount: dailyBills[date].amount,
        sale: price,
        adsCost: adsCost,
        profit: profit,
        percentageAds: percentageAds,
        ROI: ROI,
      };
    });

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get bills" });
  
  }


};

export default dailyReport; 