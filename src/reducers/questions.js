import { GET_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from '../actions/questions'

export default function questions(state={}, action) {
	switch(action.type) {
		case GET_QUESTIONS :
	
			return {
				...state,
				...action.questions,
			}
		case ADD_QUESTION :
		console.log(action.question)
	
	return {
		...state,
		[action.question.id]: action.question,

	}

		case ADD_ANSWER :
		

			return {
				...state,
				[action.answer.qid]: {
					...state[action.answer.qid],[action.answer.answer]: {
						...state[action.answer.qid][action.answer.answer],
				votes: state[action.answer.qid][action.answer.answer].votes.concat([action.answer.authedUser])

					}

				}
			}
        

		
		default :
			return state

	}
}