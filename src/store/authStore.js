import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { getErrorMsg } from "../lib/utils";

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  isCheckingAuth: null,
  loading: false,
  error: null,
  isAdmin: false,
  //   signUp function
  signUp: async (name, email, password) => {
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    if (!trimmedEmail || !trimmedName || !password) {
      toast.error("All fields are required", { id: "signup" });
    }
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/sign-up", {
        email: trimmedEmail,
        name: trimmedName,
        password,
      });
      set({
        accessToken: response.data.axiosInstance,
        user: response.data.user,
      });
      return { success: true };
    } catch (error) {
      const errMsg = getErrorMsg(error);
      console.log(errMsg);
      toast.error(errMsg);
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
  login: async (email, password) => {
    const trimmedEmail = email?.trim();
    if (!trimmedEmail || !password)
      return toast.error("Email and Password are required", { id: "login" });
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: trimmedEmail,
        password,
      });
      set({ accessToken: response.data.accessToken, user: response.data.user });
      return { success: true };
    } catch (error) {
      const errMsg = getErrorMsg(error);
      console.log(error);
      toast.error(errMsg, { id: "loginError" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
  // logout function
  logout: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success(response.data.message, { id: "logout" });
      return { success: true };
    } catch (err) {
      const errMsg = getErrorMsg(err);
      toast.error(errMsg, { id: "logout error" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
  // check auth function
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    console.log("hhhh");
    try {
      const response = await axiosInstance.get("/auth/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get().accessToken}`,
        },
      });
      console.log({ response });
      set({
        user: response.data.user,
        isAdmin: response.data.user.role === "admin",
      });
      return { success: true };
    } catch (err) {
      const errMsg = getErrorMsg(err);
      console.log(errMsg);
      set({ user: null });
      return { success: false };
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
