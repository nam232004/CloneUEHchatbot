import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavState } from "../Components/Types/Nav";

const initialState: NavState = {
    activeIndex: null,
};

const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setActiveIndex: (state, action: PayloadAction<number | null>) => {
            state.activeIndex = action.payload;
        },
    },
});

export const { setActiveIndex } = navSlice.actions;
export default navSlice.reducer;
