import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

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
