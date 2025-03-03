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

    getLoginLogs: builder.query({
      query: () => "/user/login-logs",
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
        url: `/user/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    getUserList: builder.query({
      query: () => "/user/",
      providesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),

    getDeptByUserDetails: builder.query({
      query: (id) => `/user/dept-details/${id}`,
      providesTags: ["User"],
    }),

    addUserCsv: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("file", data.file); // Append the file here

        return {
          url: "/users/csv/import",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    changeUserPassword: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/user/change-password/${id}`,
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
    getInstituteDetails: builder.query({
      query: () => "/institute",
      providesTags: ["Institute"],
    }),

    updateInstitute: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/institute/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Institute"],
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

    getDeptStudentsReport: builder.query({
      query: () => "/student/deptstudentreport",
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

    getDepartmentClearanceReport: builder.query({
      query: () => "/clearance/department-clearance-report",
      providesTags: ["clearance"],
    }),

    addStudentsCsv: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("file", data.file); // Append the file here

        return {
          url: "/students/csv/import",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["student"],
    }),

    // duepayment

    createDuePayment: builder.mutation({
      query: (credentials) => ({
        url: "/student/duepayment",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["duepayment"],
    }),

    getDuePaymentListByStudent: builder.query({
      query: (studentId) => `/student/duepayment/due/${studentId}`,
      providesTags: ["duepayment"],
    }),
    getDuePaidReport: builder.query({
      query: () => `/student/duepayment/due-list`,
      providesTags: ["duepayment"],
    }),
    getDuePaymentDetails: builder.query({
      query: (id) => `/student/duepayment/${id}`,
      providesTags: ["duepayment"],
    }),
    getTotalDueByStudentId: builder.query({
      query: (id) => `/student/duepayment/due-total/${id}`,
      providesTags: ["duepayment"],
    }),
    deleteDuePayment: builder.mutation({
      query: (id) => ({
        url: `/student/duepayment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["duepayment"],
    }),

    createDueStuPayment: builder.mutation({
      query: (credentials) => ({
        url: "/student/duestupayment",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["duestupayment"],
    }),
    getAllDuePaymentList: builder.query({
      query: () => `/student/duestupayment/payment`,
      providesTags: ["duestupayment"],
    }),

    updateDuePayment: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/student/duestupayment/${id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["duestupayment"],
    }),

    deleteStuDuePayment: builder.mutation({
      query: (id) => ({
        url: `/student/duestupayment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["duestupayment"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetLoginLogsQuery,
  useGetDeptByUserDetailsQuery,
  useCreateInstituteMutation,
  useGetInstituteQuery,
  useGetInstituteDetailsQuery,
  useUpdateInstituteMutation,
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
  useGetDeptStudentsReportQuery,
  useGetStudentDetailsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetDuePaidReportQuery,

  useCreateStudentClearanceMutation,
  useGetStudentBaseClearanceQuery,
  useAddStudentsCsvMutation,
  useGetUserListQuery,
  useGetUserDetailsQuery,
  useAddUserCsvMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useChangeUserPasswordMutation,

  useCreateDuePaymentMutation,
  useGetDuePaymentListByStudentQuery,
  useDeleteDuePaymentMutation,
  useGetDuePaymentDetailsQuery,
  useGetTotalDueByStudentIdQuery,

  useCreateDueStuPaymentMutation,
  useGetAllDuePaymentListQuery,
  useUpdateDuePaymentMutation,
  useDeleteStuDuePaymentMutation,
  useGetDepartmentClearanceReportQuery,
} = apiSlice;
