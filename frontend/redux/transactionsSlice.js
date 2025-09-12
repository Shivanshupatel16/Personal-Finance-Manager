import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, { getState }) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
