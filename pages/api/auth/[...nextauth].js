import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const user = {id: 1, name: "Victor Marcas", email: "victor@correo.com"};

          if (user) {
            return user;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async session(session, user) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
