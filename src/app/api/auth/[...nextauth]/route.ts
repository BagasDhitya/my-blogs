import NextAuth from "next-auth";
import { authConfig } from "@/utils/auth/next-auth";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
