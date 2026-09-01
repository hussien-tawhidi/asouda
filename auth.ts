import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "./model/User";
import { connectDB } from "./lib/db";
import { userAddressesType } from "./types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("AUTH START");

        await connectDB();
        console.log("DB CONNECTED");

        if (!credentials?.email || !credentials?.password) {
          throw new Error("ایمیل و رمز عبور الزامی است.");
        }

        const user = await User.findOne({
          email: credentials.email,
        }).select("+password");
        console.log("USER:", user);
        if (!user) {
          throw new Error("ایمیل یا رمز عبور اشتباه است.");
        }

        if (!user.isActive) {
          throw new Error("حساب کاربری شما غیرفعال شده است.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("ایمیل یا رمز عبور اشتباه است.");
        }

        // if (user.role !== "admin") {
        //   throw new Error("شما اجازه ورود به پنل مدیریت را ندارید.");
        // }
        const addresses = user.addresses.map((address: userAddressesType) => ({
          title: address.title,
          province: address.province,
          city: address.city,
          address: address.address,
          postalCode: address.postalCode,
          receiver: address.receiver,
          phone: address.phone,
          isDefault: address.isDefault,
        }));
        return {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          role: user.role,
          email: user.email,
          image: user.image,
          isVerified: user.isVerified,
          addresses,
          isActive: user.isActive,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.isVerified = user.isVerified;
        token.addresses = user.addresses;
        token.isActive = user.isActive;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "user";
        session.user.phone = token.phone as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.addresses = token.addresses;
        session.user.isActive = token.isActive as boolean;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
});
