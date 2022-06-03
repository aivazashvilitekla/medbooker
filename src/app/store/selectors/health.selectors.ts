import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";

const selectHealthPageState = (state: AppState) => state.healthPage

export const selectPastBookings = createSelector(
    selectHealthPageState,
    (state)=> state.pastBookings
)

export const selectedPastBooking = createSelector(
    selectHealthPageState,
    (state)=> state.selectedPastBooking
)