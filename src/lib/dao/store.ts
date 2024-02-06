import { configureStore } from '@reduxjs/toolkit'
import graphReducer from "features/graph/graphSlice";
import tableReducer from "features/table/tableSlice";
import dateReducer from "features/dateRange/dateRangeSlice";

export const store = configureStore({
    reducer: {
        graph: graphReducer,
        table: tableReducer,
        date: dateReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch