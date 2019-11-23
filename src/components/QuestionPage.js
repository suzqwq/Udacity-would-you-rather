import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'

class QuestionPage extends Component{

	render(){


		const { question, user, questionId}=this.props
		return (
			<div className='home-wrap'>
				<div className='question-box'>
					<div className='user-container'>
					<img src={user && user.avatarURL} alt={user && user.name} />
					<p>{user && user.name}</p><br/>
					<p className='asks'>asks</p>

					</div>
					<div className='question-overview-container'>
						<h6>Would you rather:</h6>
						<p className='option'>1. {question.optionOne.text}</p>
						<p className='option'>2. {question.optionTwo.text}</p>
						<div>
							<Link to={`/question/${questionId}`}>
							{	this.props.qs==='unanswered' && (
								<button className='vote-button'>Answer Question</button>

								)
							}
							{
								this.props.qs==='answered' && (
									<button className='view-button'>View Question</button>
									)
							}
							
							</Link>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
function mapStateToProps({users, questions, authedUser}, {id}){

	const question=questions[id]
	const questionId=question.id
	const user=question && users[question.author]

	return {
		question,
		questionId,
		user
	}

}

export default connect(mapStateToProps)(QuestionPage)