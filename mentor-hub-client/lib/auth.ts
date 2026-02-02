import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.AUTH_URL, // Example: http://localhost:5000

  user: {
    modelName: "User",
    fields: {
      id: "id",
      email: "email",
      name: "name",
      image: "image",
      role: "role", // IMPORTANT
    },
  },

  session: {
    modelName: "Session",
    fields: {
      userId: "userId",
      expiresAt: "expiresAt",
    },
    maxAge: 60 * 60 * 24 * 30, // 30 days
    freshAge: 60 * 60 * 24,    // 1 day
  },
});