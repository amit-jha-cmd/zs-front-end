import {createAsyncThunk} from "@reduxjs/toolkit";
import AttacksApis from "../../lib/apis/attacks/attacksApis";
import {RootState} from "../../lib/dao/store";
import {graphSelector} from "./graphSlice";
import {dateRangeSelector} from "../dateRange/dateRangeSlice";

export const fetchOverview = createAsyncThunk(
    "graph/fetchOverview",
    async (_, thunkAPI) => {
        let state = <RootState>thunkAPI.getState();
        let dateRangeState = dateRangeSelector(state);

        const response = await AttacksApis.overview({
            startDateTime: dateRangeState.startDateTime,
            endDateTime: dateRangeState.endDateTime,
        });
        return response.data;
    }
);