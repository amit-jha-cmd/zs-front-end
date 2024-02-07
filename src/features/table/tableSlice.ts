import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAttacks } from 'features/table/tableThunks';
import { TableState } from 'features/table/tableInterfaces';

const initialState: TableState = {
  status: 'idle',
  data: [],
  isLoading: false,
  error: '',
  pageNumber: 1,
  sortBy: undefined,
  selectedColumns: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    jumpToPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    updateSortBy(state, action: PayloadAction<string>) {
      if (state.sortBy === action.payload) {
        state.sortBy = undefined;
      } else {
        state.sortBy = action.payload;
      }
    },
    updateSelectedColumn(state, action: PayloadAction<string>) {
      if (!state.selectedColumns.includes(action.payload)) {
        state.selectedColumns.push(action.payload);
      } else {
        state.selectedColumns = state.selectedColumns.filter((value) => value !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttacks.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    }).addCase(fetchAttacks.fulfilled, (state, action) => {
      state.status = 'done';
      state.isLoading = false;
      state.data = action.payload.data ?? [];
    }).addCase(fetchAttacks.rejected, (state, action) => {
      state.status = 'done';
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { updateSortBy, updateSelectedColumn, jumpToPage } = tableSlice.actions;

export default tableSlice.reducer;
