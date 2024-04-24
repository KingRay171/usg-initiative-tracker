import { init, user } from "@prisma/client";
import { User, Session } from "lucia";

export type UnknownSession = {
  user: User;
  session: Session;
} | {
  user: null;
  session: null;
}

export type ValidatedSession = {
  user: User;
  session: Session;
}



export type InitEditable = Omit<init, "createdAt" | "lastUpdated" | "type">
export type InitWithLeaders = InitEditable & {leaders: user[]}
