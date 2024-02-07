import { createAsyncThunk } from '@reduxjs/toolkit';
import AttacksApis from 'lib/apis/attacks/attacksApis';
import { RootState } from 'lib/dao/store';
import { dateRangeSelector } from 'features/dateRange/dateRangeSlice';

export const fetchOverview = createAsyncThunk(
  'graph/fetchOverview',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const dateRangeState = dateRangeSelector(state);

    const response = await AttacksApis.overview({
      startDateTime: dateRangeState.startDateTime,
      endDateTime: dateRangeState.endDateTime,
    });
    return response.data;
  },
);
