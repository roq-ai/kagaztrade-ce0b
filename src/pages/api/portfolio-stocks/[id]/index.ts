import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { portfolioStockValidationSchema } from 'validationSchema/portfolio-stocks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.portfolio_stock
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPortfolioStockById();
    case 'PUT':
      return updatePortfolioStockById();
    case 'DELETE':
      return deletePortfolioStockById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPortfolioStockById() {
    const data = await prisma.portfolio_stock.findFirst(convertQueryToPrismaUtil(req.query, 'portfolio_stock'));
    return res.status(200).json(data);
  }

  async function updatePortfolioStockById() {
    await portfolioStockValidationSchema.validate(req.body);
    const data = await prisma.portfolio_stock.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePortfolioStockById() {
    const data = await prisma.portfolio_stock.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
