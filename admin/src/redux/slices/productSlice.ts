import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 API CALL (backend se data lana)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("YOUR_API_URL"); // yahan apni API lagao
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🧠 Slice
const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],     // products store hongy
    loading: false,
    error: null,
  },

  reducers: {
    // agar manually data set karna ho
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // ⏳ Loading
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      // ❌ Error
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;