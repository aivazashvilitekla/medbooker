import { Doctor } from 'src/app/models';

export interface SearchState {
  doctors: Doctor[];
  markersCount: number | undefined
}

export const initialSearchState: SearchState = {
  doctors: [],
  markersCount: undefined
};
