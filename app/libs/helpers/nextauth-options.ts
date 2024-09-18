import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { loginWithOauth, getUserByEmail } from "@/app/libs/utils/auth.actions"

export const nextauthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.type === "oauth" && profile) {
                return await loginWithOauth({ account, profile })
            }
            return true
        },
        async jwt({ token, trigger, session }) {
            if (token.email) {
                const user = await getUserByEmail({ email: token.email })
                token.name = user.name
                token._id = user._id
                token.role = user.role
                token.provider = user.provider
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    _id: token._id,
                    role: token.role,
                    provider: token.provider
                }
            }
        }
    }
}