import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: CATEGORY_URL,
                method: 'POST',
                body: newCategory
            }),
        }),

        updateCategory: builder.mutation({
            query: ({ categoryId, updatedCategory }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: updatedCategory
            }),
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'DELETE'
            }),
        }),

        fetchCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
            }),
        }),
    }),
});

export const { 
        useCreateCategoryMutation, 
        useUpdateCategoryMutation, 
        useDeleteCategoryMutation, 
        useFetchCategoriesQuery 
    } = categoryApiSlice;