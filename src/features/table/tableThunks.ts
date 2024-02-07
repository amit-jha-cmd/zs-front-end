import { createAsyncThunk } from '@reduxjs/toolkit';
import AttacksApis from 'lib/apis/attacks/attacksApis';
import { RootState } from 'lib/dao/store';
import { dateRangeSelector } from 'features/dateRange/dateRangeSlice';
import { tableSelector } from 'features/table/tableSelectors';

export const fetchAttacks = createAsyncThunk(
  'table/fetchAttacks',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const tableState = tableSelector(state);
    const dateState = dateRangeSelector(state);

    const response = await AttacksApis.fetch({
      startDateTime: dateState.startDateTime,
      endDateTime: dateState.endDateTime,
      page: tableState.pageNumber,
      pageSize: 10,
      sortBy: tableState.sortBy,
    });
    return response.data;
  },
);
