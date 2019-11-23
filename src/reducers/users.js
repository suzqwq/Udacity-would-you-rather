import { GET_USERS } from '../actions/users'
import { ADD_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function (state={}, action){
	switch(action.type) {
		case GET_USERS :
		return {
			...state,
			...action.users
		}

		case ADD_QUESTION :
		console.log(action)
		return {

			...state,
			[action.question.author]:{
				...state[action.question.author],
				questions: [...state[action.question.author].questions, action.question.id]
			}
			
		}

		case ADD_ANSWER : 
		return {
			...state,
			[action.answer.authedUser]: {
				...state[action.answer.authedUser],
				answers: {
					...state[action.answer.authedUser].answers,
					[action.answer.qid]: action.answer.answer
				}
			}

		}

	default : 
		return state
	}


}