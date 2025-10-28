import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { userService } from "@/lib/services";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Verify user from database
        const user = userService.verify(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Handle OAuth users - save to database and get consistent user ID
      if (account && profile && account.provider !== 'credentials') {
        // Use provider account ID as stable identifier (e.g., GitHub user ID)
        // This ensures the same user always gets the same ID across sessions
        const stableUserId = `${account.provider}-${account.providerAccountId}`;

        userService.createOAuthUser(
          stableUserId,
          user?.email || (profile as any).email,
          user?.name || (profile as any).name,
          user?.image || (profile as any).avatar_url || (profile as any).picture,
          account.provider
        );

        // Set the stable ID in the token
        token.id = stableUserId;
      }
      // For credentials provider, use the user ID from the database
      else if (user?.id) {
        token.id = user.id;
      }
      // Fallback: if token already has an ID from previous session, keep it
      else if (!token.id && token.sub) {
        token.id = token.sub;
      }

      return token;
    },
    async session({ session, token }) {
      // Add user ID to session - always required
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      // Allow public routes
      const isPublicRoute = ['/auth/signin', '/auth/signup', '/'].includes(pathname);
      if (isPublicRoute) return true;

      return !!auth;
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
});
