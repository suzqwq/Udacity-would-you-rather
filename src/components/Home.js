import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPage from './QuestionPage'
import { Redirect } from 'react-router-dom'

class Home extends Component {
	state={
		qs:'unanswered'
	}


	handleClick=(e)=>{
		if(e.target.value==='answered')
		this.setState({
			qs: 'answered'
		})
	else
		this.setState({
			qs: 'unanswered'
		})
	}

	render(){

		if(this.props.authedUser==null){
			return <Redirect
			to={{
				pathname:'/',
				state: {from: this.props.location}
			}}
			/>

		}

		else {

			const {sA, unanswered}=this.props
		return (

			<div className='home-wrap'>
				<h3>Questions</h3>
				<div className='answered-unanswered'>
					<button value='unanswered' onClick={this.handleClick}>Unanswered</button>
					<button value='answered' onClick={this.handleClick}>Answered</button>
				</div>
			<div>
			{
				this.state.qs==='unanswered'  && (
					<ul className='home-container'>
						{ unanswered && unanswered.map((id)=> (
							<li key={id}>
								<QuestionPage id={id} qs={this.state.qs} />
							</li>
						))}
					</ul>
				)
			}


			{
				this.state.qs==='answered' && (
					<ul className='home-container'>
						{ sA && sA.map((id)=> (
							<li key={id}>
								<QuestionPage id={id} qs={this.state.qs} />
							</li>
						))}
					</ul>

					)
			}
		
			</div>
			</div>
			

			)


		}

		
	}
	
}

function arrangeAnswered(arr1=[], obj={})
{
	let result={}
	for(let id in obj){
		if(arr1.indexOf(id)>-1){
			result[id]=obj[id]
		}
	}
	
	return result
}

function mapStateToProps({authedUser, users, questions}){
	 authedUser=authedUser && authedUser['authedUser']
	const  currUser = users[authedUser]
	const currAnswers=currUser && currUser.answers
	const answered=currUser && Object.keys(currAnswers)
	const qIds=Object.keys(questions).sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
	const sA=arrangeAnswered(answered, questions)
	
	return {
		currUser,
		sA: Object.keys(sA).sort((a,b)=> sA[b].timestamp - sA[a].timestamp ),
		qIds,
		authedUser,
		unanswered: currUser && questions && Object.keys(questions).filter(qid=> !answered.includes(qid) )
			.sort((a,b)=> questions[b].timestamp - questions[a].timestamp)	
	}
}


export default connect(mapStateToProps)(Home)
