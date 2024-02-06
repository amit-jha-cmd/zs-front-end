import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "lib/dao/store";
import {fetchAttacks} from "./tableThunks";
import {TableState} from "./tableInterfaces";

const initialState: TableState = {
    status: "idle",
    data: [],
    isLoading: false,
    error: "",
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
            state.sortBy = action.payload;
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
export const {updateSortBy, updateSelectedColumn, jumpToPage} = tableSlice.actions;

export const tableSelector = (state: RootState) => state.table;

export default tableSlice.reducer;