import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Domain Account",
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.BACKEND_URL}/login`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                // console.log("res", res)
                if (!res.ok) {
                    console.log("error")
                    throw new Error(data.message);
                }
                // If no error and we have user data, return it
                if (res.ok && data) {
                    
                    return data;
                }
                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({
            token,
            user,
            account
        }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                };
            }

            return token;
        },

        async session({
            session,
            token
        }) {
            session.user.accessToken = token.accessToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
});