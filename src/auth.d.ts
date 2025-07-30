import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        objectId?: string,
        name?: string,
        email?: string
    }
    interface Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            objectId?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        objectId?: string,
        name?: string,
        email?: string
    }
}