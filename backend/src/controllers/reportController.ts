import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//Create  instance of PrismaClient
const prisma = new PrismaClient();

// Function to generate date range from startDate to endDate
function generateDateRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange: string[] = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dateRange.push(new Date(date).toISOString().split('T')[0]);
  }

  return dateRange;
}

// Daily report get data by prisma ads cost and bill by each date
export const dailyReport = async (req: Request, res: Response) => {
  const businessAcc = parseInt(req.params.businessAcc);
  const startDate = '2024-01-01'; // Adjust the start date as needed
  const endDate = new Date().toISOString().split('T')[0]; // Current date

  try {
    const adsCost = await prisma.adsCost.findMany({
      where: {
        businessAcc: businessAcc,
      },
      select: {
        date: true,
        adsCost: true,
      },
    
      
    });

    const bill = await prisma.bill.findMany({
      where: {
        businessAcc: businessAcc,
      },
      select: {
        purchaseAt: true,
        price: true,
      },
      orderBy: { purchaseAt: 'desc' },
    });

    const mergedData = adsCost.map((ad) => {
      const matchingBill = bill.find((b) => {
        const adDate = new Date(ad.date).toISOString().split('T')[0];
        const billDate = new Date(b.purchaseAt).toISOString().split('T')[0];
        return adDate === billDate;
      });
      return {
        date: new Date(ad.date).toISOString().split('T')[0],
        adsCost: ad.adsCost,
        price: matchingBill ? matchingBill.price : 0,
      };
    });

    const dailyReport = mergedData.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = {
          date: item.date,
          adsCost: 0,
          price: 0,
        };
        
      }
      acc[date].adsCost += item.adsCost;
      acc[date].price += item.price || 0;
      return acc;
    }, {} as { [date: string]: { date: string; adsCost: number; price: number } });

    // Generate a complete date range
    const dateRange = generateDateRange(startDate, endDate);

    // Ensure every date in the range is included in the response
    const response = dateRange
      .map((date) => {
        if (dailyReport[date]) {
          return dailyReport[date];
        } else {
          return { date, adsCost: 0, price: 0 };
        }
      })
      .reverse() // Reverse the order of the items
      .slice(0, 30); // Limit the response to 30 items

    res.status(200).json(response);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to get daily report" });
  }
};