import { apiSlice } from "@/lib/store/api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface VendorProfile {
  id: string;
  vendorId: string;
  businessName: string;
  country: string;
  state: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  weight: number;
  quantity: number;
  images: string[];
  storageInstructions: string;
  status: string; // "PUBLISHED" | "DRAFT"
  approvalStatus: string; // "PENDING" | "APPROVED" | "REJECTED"
  rejectionReason: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  vendorId: string;
  categoryId: string;
  sellingPrice: number;
  category: Category;
  vendorProfile?: VendorProfile;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface AdminProductsResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  data: {
    products: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  status?: string; // "DRAFT" | "PUBLISHED" | "ARCHIVED"
  approvalStatus?: string; // "DRAFT" | "PENDING" | "APPROVED" | "REJECTED"
  vendorId?: string;
}

export interface GetProductStatsParams {
  startDate?: string;
  endDate?: string;
  vendorId?: string;
}

export interface GetProductStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    draft: number;
  };
  statusCode: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  baseCost: number;
  weight: number;
  quantity: number;
  categoryId: string;
  images: string[];
  storageInstructions: string;
  status: "DRAFT" | "PUBLISHED"; // Assuming these are valid statuses based on example
}

export interface UpdateProductRequest {
  id: string; // Needed for URL
  body: Partial<CreateProductRequest>;
}

export interface ApproveProductRequest {
  id: string;
  sellingPriceOverride: number;
}

export interface RejectProductRequest {
  id: string;
  reason: string;
}

export interface BulkUpdateProductPricesRequest {
  percentage: number;
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface GetProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<AdminProductsResponse, GetProductsParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        if (params?.status && params.status !== "all")
          queryParams.append("status", params.status);
        if (params?.approvalStatus && params.approvalStatus !== "all")
          queryParams.append("approvalStatus", params.approvalStatus);
        if (params?.categoryId && params.categoryId !== "all")
          queryParams.append("categoryId", params.categoryId);
        if (params?.vendorId) queryParams.append("vendorId", params.vendorId);

        return `/admin/products?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
    getAdminProductStats: builder.query<
      GetProductStatsResponse,
      GetProductStatsParams
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.startDate)
          queryParams.append("startDate", params.startDate);
        if (params?.endDate) queryParams.append("endDate", params.endDate);
        if (params?.vendorId) queryParams.append("vendorId", params.vendorId);

        return `/admin/products/stats?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
    approveProduct: builder.mutation<void, ApproveProductRequest>({
      query: ({ id, sellingPriceOverride }) => ({
        url: `/admin/products/${id}/approve`,
        method: "PATCH",
        body: { sellingPriceOverride },
      }),
      invalidatesTags: ["Products"],
    }),
    rejectProduct: builder.mutation<void, RejectProductRequest>({
      query: ({ id, reason }) => ({
        url: `/admin/products/${id}/reject`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Products"],
    }),
    bulkUpdateProductPrices: builder.mutation<
      void,
      BulkUpdateProductPricesRequest
    >({
      query: (body) => ({
        url: "/admin/products/bulk-price-update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAdminProductsQuery,
  useGetAdminProductStatsQuery,
  useApproveProductMutation,
  useRejectProductMutation,
  useBulkUpdateProductPricesMutation,
} = productsApi;
