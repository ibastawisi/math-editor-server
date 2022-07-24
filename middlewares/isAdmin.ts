import { Request, RequestHandler } from "express";
import { User } from "../models";

export type AuthorizedRequest = Request & { user: User };

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    assertAdmin(req);
    next();
  } catch (error: any) { 
    res.status(401).send(error.message);
  }
};

function assertAdmin(req: Request): asserts req is AuthorizedRequest {
  const user = req.user as User;
  if (!user?.admin) throw new Error("Not Allowed");
}

export default isAdmin;