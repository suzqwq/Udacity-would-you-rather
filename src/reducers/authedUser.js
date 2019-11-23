import {SET_UTHED_USER} from '../actions/authedUser'

export  default function setAuthedUser (state = null, action){
	switch(action.type){
		case SET_UTHED_USER :
		return action.id
		default : 
		return state
	}
}
