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

    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),
    getDepartmentDetails: builder.query({
      query: (id) => `/departments/${id}`,
      providesTags: ["Departments"],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),

    // clearance category
    createClearanceCategory: builder.mutation({
      query: (credentials) => ({
        url: "/clearancecategory",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["clearancecategory"],
    }),

    getClearanceCategories: builder.query({
      query: () => "/clearancecategory",
      providesTags: ["clearancecategory"],
    }),
    getClearanceCategoryDetails: builder.query({
      query: (id) => `/clearancecategory/${id}`,
      providesTags: ["clearancecategory"],
    }),
    updateClearanceCategory: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/clearancecategory/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["clearancecategory"],
    }),
    deleteClearanceCategory: builder.mutation({
      query: (id) => ({
        url: `/clearancecategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["clearancecategory"],
    }),

    // student
    createStudentAcc: builder.mutation({
      query: (credentials) => ({
        url: "/student",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["student"],
    }),

    getStudentList: builder.query({
      query: () => "/student",
      providesTags: ["student"],
    }),

    getStudentDetails: builder.query({
      query: (id) => `/student/${id}`,
      providesTags: ["student"],
    }),

    updateStudent: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/student/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),

    createStudentClearance: builder.mutation({
      query: (credentials) => ({
        url: "/clearance",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["clearance"],
    }),

    getStudentBaseClearance: builder.query({
      query: (id) => `/clearance/by-student/${id}`,
      providesTags: ["clearance"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useCreateInstituteMutation,
  useGetInstituteQuery,
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentDetailsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useCreateClearanceCategoryMutation,
  useGetClearanceCategoriesQuery,
  useGetClearanceCategoryDetailsQuery,
  useUpdateClearanceCategoryMutation,
  useDeleteClearanceCategoryMutation,

  useCreateStudentAccMutation,
  useGetStudentListQuery,
  useGetStudentDetailsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  useCreateStudentClearanceMutation,
  useGetStudentBaseClearanceQuery,
} = apiSlice;
