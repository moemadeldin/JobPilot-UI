import { create } from "zustand";
import api from "../lib/axios";
import type { User, RegisterResponse, LoginResponse, ForgotPasswordResponse, VerifyCodeResponse, ResetPasswordResponse } from "../types/auth";

const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user'
} as const;

class AuthStorage {
  static saveAuth(user: User, accessToken: string): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static loadAuth(): { user: User; accessToken: string } | null {
    const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);

    if (!accessToken || !userStr) return null;

    try {
      return { user: JSON.parse(userStr), accessToken };
    } catch {
      return null;
    }
  }

  static clearAuth(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
  }
}

class ApiAuthConfig {
  static setAuthHeader(token: string): void {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  static clearAuthHeader(): void {
    delete api.defaults.headers.common['Authorization'];
  }
}

const extractErrorMessage = (error: any, defaultMessage: string): string => {
  return error.response?.data?.message || defaultMessage;
};

interface AuthState { 
  user: User | null;
  isLoading: boolean;
  error: string | null;
  access_token: string | null;
  recoveryEmail: string | null
}

interface AuthActions {
  register: (email: string, password: string, password_confirmation: string) => Promise<void>; 
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyCode: (email:string, code: string) => Promise<void>;
  resetPassword: (new_password:string, new_password_confirmation: string) => Promise<void>;
  initializeAuth: () => void;
  clearError: () => void;
}

const withLoadingState = async (
  set: any,
  action: () => Promise<void>,
  defaultError: string
) => {
  set({ isLoading: true, error: null });
  try {
    await action();
    set({ isLoading: false });
  } catch (error: any) {
    const message = extractErrorMessage(error, defaultError);
    set({ isLoading: false, error: message });
    throw error;
  }
};

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({ 
  user: null,          
  isLoading: false,   
  error: null,
  access_token: null,
  recoveryEmail: null,

  initializeAuth: () => {
    const auth = AuthStorage.loadAuth();
    if (auth) {
      ApiAuthConfig.setAuthHeader(auth.accessToken);
      set({ access_token: auth.accessToken, user: auth.user });
    }
  },

  register: (email, password, password_confirmation) =>
    withLoadingState(set, async () => {
      const res = await api.post<RegisterResponse>("/register", {
        email, password, password_confirmation
      });
      
      const { id, email: userEmail, access_token } = res.data.data;
      const user: User = { id, email: userEmail };
      
      AuthStorage.saveAuth(user, access_token);
      ApiAuthConfig.setAuthHeader(access_token);
      set({ user, access_token });
    }, "Registration failed. Please try again."),

  login: (email, password) =>
    withLoadingState(set, async () => {
      const res = await api.post<LoginResponse>("/login", { email, password });
      const { user, access_token } = res.data.data;

      AuthStorage.saveAuth(user, access_token);
      ApiAuthConfig.setAuthHeader(access_token);
      set({ user, access_token });
    }, "Login failed. Please try again."),

  logout: async () => {
    set({ isLoading: true });
    try {
      await api.delete("/logout");
    } catch (error: any) {
      console.error("Logout API error:", error);
    } finally {
      AuthStorage.clearAuth();
      ApiAuthConfig.clearAuthHeader();
      set({ user: null, access_token: null, recoveryEmail: null, error: null, isLoading: false });
    }
  },

  forgotPassword: (email) =>
    withLoadingState(set, async () => {
      const res = await api.post<ForgotPasswordResponse>("/forgot-password", { email });
      const { access_token } = res.data.data;
      
      ApiAuthConfig.setAuthHeader(access_token);
      set({ recoveryEmail: email, access_token });
    }, "Email does not exist."),

  verifyCode: (email, code) =>
    withLoadingState(set, async () => {
      const res = await api.post<VerifyCodeResponse>("/verify-code", { email, code });
      const { access_token } = res.data.data;
      
      ApiAuthConfig.setAuthHeader(access_token);
      set({ access_token });
    }, "Verification Code is not correct."),

  resetPassword: (new_password, new_password_confirmation) =>
    withLoadingState(set, async () => {
      await api.post<ResetPasswordResponse>("/reset-password", {
        new_password, new_password_confirmation
      });
      
      ApiAuthConfig.clearAuthHeader();
      set({ recoveryEmail: null, access_token: null });
    }, "Password reset failed."),

  clearError: () => set({ error: null })
}));