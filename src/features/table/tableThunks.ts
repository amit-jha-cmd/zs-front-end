import {createAsyncThunk} from "@reduxjs/toolkit";
import AttacksApis from "../../lib/apis/attacks/attacksApis";

export const fetchAttacks = createAsyncThunk(
    "table/fetchAttacks",
    async (_, thunkAPI) => {
        // let state = <RootState>thunkAPI.getState();
        // let graphState = graphSelector(state);

        const startDateTime = new Date("2021-08-04T00:00:00.0000");
        const endDateTime: Date = new Date("2021-08-06T15:20:41.628Z");

        const response = await AttacksApis.fetch({
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
            page: 1,
            pageSize: 10,
            sortBy: undefined
        });
        return response.data;
    }
);