import { getUsers } from '../actions/users'
import { getQuestions } from '../actions/questions'
import { getInitialData } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'

//let AUTHED_ID='johndoe'

export function handleInitial (id){
	return(dispatch) => {
		return getInitialData()
		.then(({ users, questions }) => {
			dispatch(getUsers(users))
			dispatch(getQuestions(questions))
			dispatch(setAuthedUser(id ? id : null))
		})
	}
}
