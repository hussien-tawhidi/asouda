import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "user";
      name?: string | null;
      phone?: string | null;
      isVerified?: boolean | null;
      isActive?: boolean | null;
      email?: string | null;
      addresses?: AddressSchema | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    phone: string;
    isVerified: boolean;
    isActive: boolean;
    addresses: AddressSchema;
    role: "admin" | "user";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "user";
  }
}
