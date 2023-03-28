import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: "",
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {

    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },

    setSort(state, action) {
      state.sort = action.payload;
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },

  }
});

export const selectFilter = (state) => state.filter;
export const selectCategory = (state) => state.filter.categoryId;
export const selectSort = (state) => state.filter.sort;
export const selectCurrentPage = (state) => state.filter.currentPage;

export const {
                setCategoryId,
                setSort,
                setCurrentPage,
                setFilters,
                setSearchValue
              } = filterSlice.actions;

export default filterSlice.reducer;
