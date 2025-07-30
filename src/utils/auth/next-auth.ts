import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiUser } from "../api/user.api";

export const authConfig: NextAuthOptions = {
    pages: {
        signIn: '/auth/login'
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 3
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your username" },
                password: { label: "Password", type: "password", placeholder: "your password" }
            },
            async authorize(credentials) {
                let user = null;

                const response = await apiUser.get('/users');
                const data = response.data;
                user = data[0];

                if (!user) {
                    // jika user yang login tidak terdaftar, maka akan dikembalikan null
                    return null;
                }

                // jika user ditemukan, maka kembalikan datanya
                return user;
            },
        })
    ],
    callbacks: {
        async signIn() {
            return true
        },
        async session({ token, session }) {
            if (session.user) {
                console.log('session : ', session)

                session.user.objectId = token.sub as string
                session.user.name = token.name
                session.user.email = token.email
            }

            return session
        },
        async jwt({ token, user }) {
            if (user) {

                token.objectId = user.objectId
                token.name = user.name
                token.email = user.email
            }

            return token
        }
    }
}
