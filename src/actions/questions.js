import { saveQuestion, saveAnswer } from '../utils/api'
export const GET_QUESTIONS= 'GET_QUESTIONS'
export const ADD_QUESTION='ADD_QUESTION'
export const ADD_ANSWER='ADD_ANSWER'


export function getQuestions (questions) {
	return {
		type: GET_QUESTIONS,
		questions,
	}
}

export function addQuestion (question){
	console.log(question)
	return {
		type: ADD_QUESTION,
		question,
	}
}


export function handleAddQuestion(optionOneText, optionTwoText, author){
	console.log(optionOneText, optionTwoText, author)
	return dispatch=> {

		return saveQuestion({optionOneText, optionTwoText, author})
		.then ((question)=>dispatch(addQuestion(question)))
	}
}

export function addAnswer(answer){
	console.log('answer:', answer)
	return {
		type: ADD_ANSWER,
		answer,
	}
}

export function handleSaveQuestionAnswer(authedUser, qid, answer){
	return dispatch=> {
		dispatch(addAnswer({authedUser, qid, answer}))

			return saveAnswer({
		type: ADD_ANSWER,
		authedUser,
		qid,
		answer
		
	})



	}

}