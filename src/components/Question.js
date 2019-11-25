import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'
import InvalidPage from './InvalidPage'

class Question extends Component{
	state={
		choice: ''
	}

	handleSubmit=(id, e)=>{
		e.preventDefault()
		const {currUser, qId, submitAnswer }=this.props
		const {choice}= this.state
		submitAnswer(currUser.id, qId, choice)
		//dispatch(handleSaveQuestionAnswer(currUser.id, qId, choice))


		this.setState({
			choice: ''
		})

		const changeDiv=document.getElementById('from-q-to-answer')
		changeDiv.classList.add('new-div')

			return (changeDiv)

	}


	handleChange=(e)=>{
		this.setState({
			choice: e.target.value
		}, ()=> console.log(this.state))
	}

	answersAverageO1=()=>{
		const { question, total }= this.props
		const average= question && total && (question.optionOne.votes.length/total).toFixed(2)
		return average * 100 +'%'

	}
	answersAverageO2=()=>{
		const { question, total }= this.props
		const average= question && total && (question.optionTwo.votes.length/total).toFixed(2)
		return average * 100+'%'

	}


	render(){


		const { qId, question, invalidQ, answer, name, avatar }=this.props

		if(invalidQ || !qId ){

			return <InvalidPage/>

		}

		else {

			if(!answer){

				return(

					<div className='home-wrap'>
						<div className='unique-question-box'>
							<div className='user-container'>
								<img src={avatar} alt={question.author} />
								<p>{name}</p><br/>
								<p className='asks'>asks</p>
							</div>
							<div id='from-q-to-answer' className='question-overview-container'>
								<h6>Would you rather:</h6>
								<form onSubmit={e=>this.handleSubmit(qId, e)}>
									<label className='label'><input type='radio' className='option' value='optionOne' onChange={this.handleChange} />{`  a. ${question.optionOne.text}`}</label><br/>
									<label className='label'><input type='radio' className='option' value='optionTwo' onChange={this.handleChange} />{`  b. ${question.optionTwo.text}`}</label>
									<button className='vote-button' type='submit'>Submit Answer</button>
								</form>
								
							</div>
						</div>
					</div>
				)


			}
			else{

				return(

					<div className='home-wrap'>
						<div className='unique-question-box'>
							<div className='user-container'>
								<img src={avatar} alt={name} />
								<p>{name}</p><br/>
								<p className='asks'>asks</p><br />
							</div>
							<div className='question-overview-container'>
								<div className='answered-options'>
									<h6>Would you rather:</h6>
									<p className='option'>1. {question.optionOne.text}</p>
									<p className='option'>2. {question.optionTwo.text}</p>
								</div>
								<p>Your answer was: {question[answer].text}</p>
								
								<div>
								<p>{question.optionOne.votes.length} voted. {this.answersAverageO1()} of people chose option one</p>
								<p>{question.optionTwo.votes.length} votes. {this.answersAverageO2()} of people chose option two</p>
								</div>
							</div>
						</div>
					</div>
				)

			}

		}
		
	}
}

function mapDispatchToProps(dispatch){
	return ({

		submitAnswer: (id, qid, answer)=>{dispatch(handleSaveQuestionAnswer(id, qid, answer))},
		
	})

}

function mapStateToProps({users, questions, authedUser}, props){

	const qId=props.match.params.id
	const question = questions[qId]
	const invalidQ=!questions[qId]
		  authedUser=authedUser && authedUser['authedUser']
	const currUser=users[authedUser]
	const answer= currUser && currUser.answers[qId]
	const total= question && question.optionOne.votes.length + question.optionTwo.votes.length
	const avatar= users && question && users[question.author].avatarURL
	const name= users && question && users[question.author].name
	
	return {
		question,
		invalidQ,
		currUser,
		answer,
		total,
		avatar,
		name,
		qId,
		authedUser
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Question)