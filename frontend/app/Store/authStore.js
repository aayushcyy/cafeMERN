"use client";

import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,

  login: async (phone, password) => {
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");
      const data = await response.json();
      localStorage.setItem("token", data.token);

      set({ user: data.user });
    } catch (error) {
      console.error("Login failed: ", error);
    }
  },

  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:4000/profile/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const userData = await response.json();
      set({ user: userData });
    } catch (error) {
      console.error("Error fetching user: ", error);
      set({ user: null });
      localStorage.removeItem("token");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
