import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectCategory = (state: RootState) => state.filter.categoryId;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
