import { apiSlice } from "@/lib/store/api/apiSlice";

export interface Vendor {
  id: string; // The UUID
  vendorId: string; // e.g. "VEN-IFETO-77488"
  businessName: string;
  supportEmail: string;
  contactPhone: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface GetAdminVendorsResponse {
  success: boolean;
  message: string;
  data: Vendor[];
  statusCode: number;
}

export const vendorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminVendors: builder.query<GetAdminVendorsResponse, void>({
      query: () => "/admin/vendors",
      providesTags: ["Vendors"],
    }),
  }),
});

export const { useGetAdminVendorsQuery } = vendorsApi;
