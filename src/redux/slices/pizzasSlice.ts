import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: string[];
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  category: string,
  sortBy: string,
  order: string,
  currentPage: string,
  search: string,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {

    const { category, sortBy, order, currentPage} = params;

    const {data} = await axios.get<Pizza[]>(
      `https://635917c1ff3d7bddb998b12a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=4`
    );

    return data;

  }
)


const pizzasSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {

    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },

  },

  extraReducers: (builder) => {

    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING,
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

     builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });

  },

});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
