import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './HomePage'

export default combineReducers({
	homePage: homeReducer,
})