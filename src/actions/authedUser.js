export const SET_UTHED_USER='SET_UTHED_USER'

export function setAuthedUser (id){
	return {
		type: SET_UTHED_USER,
		id
	}
}