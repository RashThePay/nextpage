import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import axios from 'axios'

const options = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                identifier: { label: " شناسه کاربری", type: "text", placeholder: "ایمیل یا نام کاربری" },
                password: { label: "رمز عبور", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("https://royaserver.chbk.run/api/auth/local?populate[role]=*", {
                        method: "POST",
                        body: JSON.stringify({
                            identifier: credentials.identifier,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    if (!res.ok) {
                        // credentials are invalid
                        return null;
                    }

                    const token = await res.json();
                    const res2 = await fetch("https://royaserver.chbk.run/api/users/"+token.user.id+"?populate[role]=*")
                    const json = await res2.json();
                    const role = json.role.name;
                    token.user.role = role;
                    // You can make more request to get other information about the user eg. Profile details

                    // return user credentials together with jwt
                    return token
                        ;
                } catch (e) {
                    return null;
                }
            },
        }
        )
    ],
    debug: true,
    session: {
        strategy: "jwt",
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
            token.name = user.user.username;
            token.jwt = user.jwt,
            token.email = user.user.email;
            token.picture = null;
            token.sub = null;
            token.role = user.user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {...session.user, ...{role: token.role}, ...{token: token.jwt}}

            }
            
            return session
          }

    },
    pages: {
        signIn: "/auth/login",
    }
}




export default (req, res) => NextAuth(req, res, options)