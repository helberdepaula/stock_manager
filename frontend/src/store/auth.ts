import { defineStore } from "pinia";
export interface IAuthLogin {
  password: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials: IAuthLogin) {
      try {
        // Simulate API call for login
        console.log(credentials);
        const response = {
          data: {
            user: { name: "Test User" },
            token: "fake-jwt-token",
          },
        };

        this.user = { name: "Test User" };
        this.token = response.data.token;
        this.isAuthenticated = true;
        return true; // Indicate successful login
      } catch (error) {
        console.error("Login failed:", error);
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        throw error; // Re-throw for component to handle
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      // Clear any stored tokens (e.g., in localStorage)
    },
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
});
