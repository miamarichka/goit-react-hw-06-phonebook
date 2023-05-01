import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        UPDATE_FILTER(state, action){return (state = action.payload)},
    }
})

export const { UPDATE_FILTER } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;