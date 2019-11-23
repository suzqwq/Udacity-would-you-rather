import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
	state= {
		optionOne:'',
		optionTwo: '',
		toHome: false
	}

	handleSubmit =(e)=> {
		e.preventDefault()
		const { optionOne, optionTwo}= this.state
		 const { dispatch, currUser }=this.props
		 console.log(this.state)
		dispatch(handleAddQuestion(optionOne, optionTwo, currUser ))
	
		this.setState(()=>({
			optionOne: '',
			optionTwo:'',


		}))
		console.log(this.state)

		const parag=document.createElement('p')
		parag.innerHTML="Question Added!"
		document.getElementById('myform').appendChild(parag)
		document.getElementById('added').disabled=true
		
	
		
	}

	handleChange=(e)=>{
		const dataInfo=e.target.value
		this.setState({
			[e.target.name]: dataInfo
			
		})
	}


	render (){

		if(this.props.authedUser==null){
			return <Redirect
			to={{
				pathname:'/',
				state: {from: this.props.location}
			}}
			/>

		}


		return (
			<div className="signin-form">
				<h2>Would You Rather </h2>
					<p>Create a new question</p>
					<form className='form-container' id='myform' onSubmit ={this.handleSubmit} >
						<input 
							type='text'
							placeholder='Option one'
							name='optionOne'
							onChange={this.handleChange}
						/>
						<input 
							type='text'
							placeholder='Option two'
							name='optionTwo'
							onChange={this.handleChange}

						/>
						<button className='btn' id='added' type='submit'>Add poll</button>
					</form>
			</div>
		)
	}
}

function mapStateToProps ({questions, users, authedUser}){

	return {
		questions,
		users,
		authedUser,
		currUser: authedUser && authedUser['authedUser'],
	}

}

export default connect(mapStateToProps)(NewPoll)
