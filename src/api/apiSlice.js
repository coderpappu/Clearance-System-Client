import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",

    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // getState().auth.token ||
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // user Related EndPoints
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // user login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["User"],
    }),

    // user create
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "/user",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: () => "/user/getuser",
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/user/update/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // institute endpoint
    createInstitute: builder.mutation({
      query: (credentials) => ({
        url: "/institute",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Institute"],
    }),
    getInstitute: builder.query({
      query: () => "/institutes",
      providesTags: ["Institute"],
    }),

    // department
    createDepartment: builder.mutation({
      query: (credentials) => ({
        url: "/departments",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useCreateInstituteMutation,
  useGetInstituteQuery,
  useCreateDepartmentMutation,
} = apiSlice;
