import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, tokenReceived } from "@/lib/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("ifetoAdminToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

let refreshPromise: Promise<string | null> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if a refresh is already in progress
  if (refreshPromise) {
    await refreshPromise;
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          // Attempt to renew token
          const refreshResult = await baseQuery(
            {
              url: "/admin/auth/renew-tokens",
              method: "POST",
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            console.log("Token Refresh Result Data:", refreshResult.data);
            // Allow for different response structures
            const data = refreshResult.data as any;
            const newToken =
              data.accessToken ||
              data.token ||
              data.data?.accessToken ||
              data.data?.token;

            if (newToken) {
              // Store new token
              if (typeof window !== "undefined") {
                localStorage.setItem("ifetoAdminToken", newToken);
              }
              // Update Redux state
              api.dispatch(tokenReceived(newToken));
              return newToken;
            }
          }

          // No token in response or refresh failed, logout
          api.dispatch(logout());
          if (typeof window !== "undefined") {
            localStorage.removeItem("ifetoAdminToken");
          }
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const newToken = await refreshPromise;

    if (newToken) {
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Products", "Orders", "Vendors"],
  endpoints: (builder) => ({}),
});
