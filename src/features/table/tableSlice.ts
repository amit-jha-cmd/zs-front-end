import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "lib/dao/store";
import {fetchAttacks} from "./tableThunks";
import {TableState} from "./tableInterfaces";

const initialState: TableState = {
    status: "idle",
    data: [],
    isLoading: false,
    error: ""
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAttacks.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        }).addCase(fetchAttacks.fulfilled, (state, action) => {
            state.status = "done";
            state.isLoading = false;
            state.data = action.payload.data ?? [];
        }).addCase(fetchAttacks.rejected, (state, action) => {
            state.status = "done";
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
})

// Action creators are generated for each case reducer function
export const {} = tableSlice.actions;

export const tableSelector = (state: RootState) => state.table;

export default tableSlice.reducer;