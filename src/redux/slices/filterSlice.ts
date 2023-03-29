import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  searchValue: string;
  currentPage: number;
}

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности (-)",
    sortProperty:  SortPropertyEnum.RATING_DESC,
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
