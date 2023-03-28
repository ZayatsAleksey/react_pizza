import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {

    const { category, sortBy, order, currentPage} = params;

    const {data} = await axios.get(
      `https://635917c1ff3d7bddb998b12a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=4`
    );

    return data;

  }
)

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {

    setItems(state, action) {
      state.items = action.payload;
    },

  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    }
  }
});

export const selectPizzaData = state => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
