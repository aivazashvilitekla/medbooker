import { createReducer, on } from "@ngrx/store";
import { HealthState, initialHealthState } from "../states/health.state";
import * as HealthActions from '../actions/health.actions'
export const featureKey = 'healthRecord';

export const healthRecordReducer = createReducer(
    initialHealthState,
    on(HealthActions.loadPastBookingsSuccess, (state, action): HealthState => {
        return {
            ...state,
            pastBookings: action.bookings
        }
    }),
    on(HealthActions.loadPastBookingsFailure, (state, action): HealthState => {
        return {
            ...state,
            pastBookings: []
        }
    }),
    on(HealthActions.SelectPastBooking, (state, action): HealthState => {
        return {
            ...state,
            selectedPastBooking: action.booking
        }
    }),
    on(HealthActions.clearSelectedPastBooking, (state, action): HealthState => {
        return {
            ...state,
            selectedPastBooking: undefined
        }
    })

)