import { apiSlice } from "@/lib/store/api/apiSlice";

export interface OrderItem {
  id: string;
  cartId: string;
  product: {
    id: string;
    name: string;
    images: string[];
    weight: number;
    sellingPrice: number;
  };
  quantity: number;
  productId: string;
  priceAtTime: number;
  weightAtTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalWeight: number;
  deliveryFee: number;
  totalAmountPaid: number;
  trackingNumber: string | null;
  shippingCarrier: string | null;
  status: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRateAtTime: number;
  subtotal: number;
  paymentStatus: string;
  canceledAt: string | null;
  deliveredAt: string | null;
  processedAt: string | null;
  shippedAt: string | null;
  user: User;
  deliveryAddress: any;
  assignments: any[];
  createdAt: string;
  updatedAt: string;
}

export interface GetAdminOrdersParams {
  page?: number;
  limit?: number;
  vendorId?: string;
  customerId?: string;
  status?: string;
}

export interface GetAdminOrdersResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    meta: {
      total?: number;
      page?: number;
      limit?: number;
      totalPages?: number;
    };
  };
  statusCode: number;
}

export interface GetAdminOrderStatsParams {
  startDate?: string;
  endDate?: string;
  vendorId?: string;
  customerId?: string;
}

export interface GetAdminOrderStatsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    pending: number;
    processing: number;
    intransit: number;
    delivered: number;
    canceled: number;
    unassigned: number;
  };
  statusCode: number;
}

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<GetAdminOrdersResponse, GetAdminOrdersParams>(
      {
        query: (params) => {
          const queryParams = new URLSearchParams();
          if (params?.page) queryParams.append("page", params.page.toString());
          if (params?.limit)
            queryParams.append("limit", params.limit.toString());
          if (params?.vendorId) queryParams.append("vendorId", params.vendorId);
          if (params?.customerId)
            queryParams.append("customerId", params.customerId);
          if (params?.status && params.status !== "all")
            queryParams.append("status", params.status);

          return `/admin/orders?${queryParams.toString()}`;
        },
        providesTags: ["Orders"] as any, // Adding tags if order invalidation is needed
      },
    ),
    routeOrder: builder.mutation<
      { success: boolean; message: string },
      { id: string; vendorId: string }
    >({
      query: ({ id, vendorId }) => ({
        url: `/admin/orders/${id}/route`,
        method: "POST",
        body: { vendorId },
      }),
      invalidatesTags: ["Orders"],
    }),
    getAdminOrder: builder.query<
      { success: boolean; message: string; data: Order; statusCode: number },
      string
    >({
      query: (id) => `/admin/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),
    updateOrderStatus: builder.mutation<
      { success: boolean; message: string },
      { id: string; status: string; comment?: string }
    >({
      query: ({ id, status, comment }) => ({
        url: `/admin/orders/${id}/status`,
        method: "PATCH",
        body: { status, comment },
      }),
      invalidatesTags: ["Orders"],
    }),
    getAdminOrderStats: builder.query<
      GetAdminOrderStatsResponse,
      GetAdminOrderStatsParams | void
    >({
      query: (params) => {
        let url = "/admin/orders/stats";
        if (params) {
          const qs = new URLSearchParams();
          if (params.startDate) qs.set("startDate", params.startDate);
          if (params.endDate) qs.set("endDate", params.endDate);
          if (params.vendorId) qs.set("vendorId", params.vendorId);
          if (params.customerId) qs.set("customerId", params.customerId);
          const queryString = qs.toString();
          if (queryString) url += `?${queryString}`;
        }
        return url;
      },
      providesTags: ["Orders"] as any,
    }),
  }),
});

export const {
  useGetAdminOrdersQuery,
  useGetAdminOrderQuery,
  useRouteOrderMutation,
  useGetAdminOrderStatsQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
