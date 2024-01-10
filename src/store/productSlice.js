import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let product = createSlice({
  name: "product",
  initialState: "kim",
});

export default product;
