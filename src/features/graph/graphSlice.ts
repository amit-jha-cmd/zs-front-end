import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "lib/dao/store";
import {GraphState} from "./graphInterfaces";
import {fetchOverview} from "./graphThunks";

const initialState: GraphState = {
    status: "idle",
    data: [],
    isLoading: false,
    error: ""
};

export const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOverview.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        }).addCase(fetchOverview.fulfilled, (state, action) => {
            state.status = "done";
            state.isLoading = false;
            state.data = action.payload.data ?? [];
        }).addCase(fetchOverview.rejected, (state, action) => {
            state.status = "done";
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
})

// Action creators are generated for each case reducer function
export const {} = graphSlice.actions;

export const graphSelector = (state: RootState) => state.graph;

export default graphSlice.reducer;