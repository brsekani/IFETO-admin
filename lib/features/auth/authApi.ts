import { apiSlice } from "@/lib/store/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/admin/auth/create-admin",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyAuthCode: builder.mutation<any, { code: string; userId: string }>({
      query: (data) => ({
        url: "/auth/admin/verify-auth-code",
        method: "POST",
        body: data,
      }),
    }),
    resendVerificationCode: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: "/auth/admin/resend-verification-code",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/admin/auth/logout",
        method: "POST",
      }),
    }),
    renewTokens: builder.mutation<any, void>({
      query: () => ({
        url: "/admin/auth/renew-tokens",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyAuthCodeMutation,
  useResendVerificationCodeMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
  useRenewTokensMutation,
} = authApi;
