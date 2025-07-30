import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiUser } from "../api/user.api";

export const authConfig: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 3, // 3 jam
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your@mail.com" },
                password: { label: "Password", type: "password", placeholder: "your password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const response = await apiUser.get('/users'); // Ambil semua user
                    const users = response.data;

                    // Temukan user yang cocok berdasarkan email
                    const matchedUser = users.find((user: any) => {
                        return (
                            user.email === credentials.email
                        );
                    });

                    if (!matchedUser) return null;

                    return matchedUser; // kembalikan user
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            return !!user; // hanya lanjut kalau user valid
        },
        async session({ token, session }) {
            if (session.user) {
                session.user.objectId = token.objectId as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.objectId = (user as any).objectId;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
    },
};
