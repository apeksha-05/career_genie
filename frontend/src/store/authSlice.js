import { createSlice } from '@reduxjs/toolkit';
import { isTokenExpired, getRoleFromToken } from '../utils/jwt';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      // Derive the authoritative role from the JWT payload so the stored
      // user object can never be tampered with independently via DevTools.
      const roleFromToken = getRoleFromToken(token);
      const safeUser = { ...user, role: roleFromToken ?? user.role };
      state.user = safeUser;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(safeUser));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    restoreAuth: (state) => {
      const storedToken = localStorage.getItem('token');
      const storedUser  = localStorage.getItem('user');

      // Reject if there is no token or the token is expired.
      if (!storedToken || !storedUser || isTokenExpired(storedToken)) {
        // Clean up stale data so the user is prompted to re-login.
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return; // state stays as initialState (unauthenticated)
      }

      // Derive the role from the JWT, not the stored user object.
      // This prevents localStorage.user.role tampering from bypassing route guards.
      const roleFromToken = getRoleFromToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      const safeUser = { ...parsedUser, role: roleFromToken ?? parsedUser.role };

      state.user = safeUser;
      state.token = storedToken;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
