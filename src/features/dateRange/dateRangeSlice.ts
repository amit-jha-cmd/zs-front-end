import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'lib/dao/store';
import { DateSelectorState } from 'features/dateRange/dateRangeInterfaces';

const initialState: DateSelectorState = {
  startDateTime: new Date().toISOString(),
  endDateTime: new Date().toISOString(),
};

export const dateRangeSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateStartDateTime(state, action: PayloadAction<string>) {
      state.startDateTime = action.payload;
    },
    updateEndDateTime(state, action: PayloadAction<string>) {
      state.endDateTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStartDateTime, updateEndDateTime } = dateRangeSlice.actions;

export const dateRangeSelector = (state: RootState) => state.date;

export default dateRangeSlice.reducer;
