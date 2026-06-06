import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useAnalysisStore from '../store/useAnalysisStore';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { API_BASE } from '../utils/constants';

const AuthContext = createContext();

const applyAuthHeader = (authToken) => {
  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applyAuthHeader(token);

    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_BASE}/auth/me`);
          setUser(res.data.user);
        } catch (err) {
          console.error("Token invalid, ejecting user session");
          localStorage.removeItem('token');
          applyAuthHeader(null);
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.removeItem('resume-analysis-store'); // Clear any stale analysis reports from a different user session
    try {
      useAnalysisStore.getState().clearAnalysis(); // Clear live in-memory Zustand state
    } catch (e) {
      console.error("Zustand clearAnalysis failed:", e);
    }
    localStorage.setItem('token', newToken);
    applyAuthHeader(newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    try {
      signOut(auth);
    } catch (e) {
      console.error("Firebase signOut failed:", e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('resume-analysis-store'); // Clear analysis reports on logout for data privacy
    try {
      useAnalysisStore.getState().clearAnalysis(); // Clear live in-memory Zustand state
    } catch (e) {
      console.error("Zustand clearAnalysis failed:", e);
    }
    applyAuthHeader(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
