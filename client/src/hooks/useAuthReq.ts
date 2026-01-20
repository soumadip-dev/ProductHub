import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import type { InternalAxiosRequestConfig } from 'axios';

// Flag to ensure the Axios interceptor is registered only once : Prevents duplicate interceptors on re-renders or multiple hook usages
let isInterceptorRegistered = false;

function useAuthReq() {
  // Clerk authentication helpers and state
  const { getToken, isSignedIn, isLoaded } = useAuth();

  //  useEffect sets up an Axios request interceptor. The interceptor automatically attaches the auth token to every outgoing request if the user is signed in.
  useEffect(() => {
    // Avoid registering the interceptor multiple times
    if (isInterceptorRegistered) return;

    // Register a request interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Only attach token if the user is authenticated
        if (isSignedIn) {
          // Retrieve JWT token from Clerk
          const token = await getToken();

          // If a token exists, add it to Authorization header
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        // Return the modified config to continue the request
        return config;
      }
    );

    // Mark interceptor as registered
    isInterceptorRegistered = true;

    /**
     * Cleanup function
     * Runs when the component using this hook unmounts
     * or when dependencies change.
     * Removes the interceptor to avoid memory leaks.
     */
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
      isInterceptorRegistered = false;
    };
  }, [getToken, isSignedIn]);

  // Expose auth state to components using this hook
  return {
    isSignedIn, // Whether the user is authenticated
    isClerkLoaded: isLoaded, // Whether Clerk auth state has finished loading
  };
}

export default useAuthReq;
