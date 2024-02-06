import {createAsyncThunk} from "@reduxjs/toolkit";
import AttacksApis from "../../lib/apis/attacks/attacksApis";
import {RootState} from "../../lib/dao/store";
import {tableSelector} from "./tableSlice";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";

export const fetchAttacks = createAsyncThunk(
    "table/fetchAttacks",
    async (_, thunkAPI) => {
        let state = thunkAPI.getState() as RootState;
        const tableState = tableSelector(state);
        let dateState = dateRangeSelector(state);

        const response = await AttacksApis.fetch({
            startDateTime: dateState.startDateTime,
            endDateTime: dateState.endDateTime,
            page: tableState.pageNumber,
            pageSize: 10,
            sortBy: tableState.sortBy,
        });
        return response.data;
    }
);