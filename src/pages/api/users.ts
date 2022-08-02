// src/pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.users.findMany();
  res.status(200).json(users);
};

export default users;
