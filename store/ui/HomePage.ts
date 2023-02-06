import { CLIENT_RENEG_LIMIT } from 'tls';
import { RootState } from '../configureStore';
import {createSlice} from '@reduxjs/toolkit';
import { Movie } from '../../typings';
import { DocumentData } from 'firebase/firestore';

interface HomePageState {
	modal: boolean;
	movie: Movie | DocumentData | null
}
const initialState: HomePageState = {
		modal: false,
		movie: null,
}
const slice = createSlice({
	name: "HomePage",
	initialState: initialState,
	reducers: {
		modalShowed: (HomePageState) => {
			console.log('Reducer reached');
			HomePageState.modal = true;
		},
		modalClosed: (HomePageState) => {
			HomePageState.modal = false;
		}
	}
})

export const {
	modalShowed,
	modalClosed
} = slice.actions;

export default slice.reducer;