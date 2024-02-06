import {createAsyncThunk} from "@reduxjs/toolkit";
import AttacksApis from "../../lib/apis/attacks/attacksApis";
import {RootState} from "../../lib/dao/store";
import {tableSelector} from "./tableSlice";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";

export const fetchAttacks = createAsyncThunk(
    "table/fetchAttacks",
    async (_, thunkAPI) => {
        let state = <RootState>thunkAPI.getState();
        let tableState = tableSelector(state);
        let dateState = dateRangeSelector(state);

        // const startDateTime = new Date("2021-08-04T00:00:00.0000");
        // const endDateTime: Date = new Date("2021-08-06T15:20:41.628Z");


        const response = await AttacksApis.fetch({
            startDateTime: dateState.startDateTime,
            endDateTime: dateState.endDateTime,
            page: tableState.pageNumber,
            pageSize: 10,
            sortBy: undefined
        });
        return response.data;
    }
);