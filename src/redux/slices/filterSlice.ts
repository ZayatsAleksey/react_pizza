import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
}

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  searchValue: string;
  currentPage: number;
}

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности (-)",
    sortProperty: "rating",
  },
  searchValue: "",
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {

    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },

  }
});

export const selectFilter = (state: RootState) => state.filter;
export const selectCategory = (state: RootState) => state.filter.categoryId;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;

export const {
                setCategoryId,
                setSort,
                setCurrentPage,
                setFilters,
                setSearchValue
              } = filterSlice.actions;

export default filterSlice.reducer;
