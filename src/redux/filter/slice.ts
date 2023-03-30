import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: "популярности (-)",
    sortProperty: SortPropertyEnum.RATING_DESC,
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

    // setFilters(state, action: PayloadAction<FilterSliceState>) {  // TODO Old version.
    //   state.sort = action.payload.sort;
    //   state.currentPage = Number(action.payload.currentPage);
    //   state.categoryId = Number(action.payload.categoryId);
    // },

    setFilters(state, action: PayloadAction<FilterSliceState>) {  // TODO New version.
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "популярности (-)",
          sortProperty: SortPropertyEnum.RATING_DESC,
        }
      }
    }

  }
});

export const {
                setCategoryId,
                setSort,
                setCurrentPage,
                setFilters,
                setSearchValue
              } = filterSlice.actions;

export default filterSlice.reducer;
