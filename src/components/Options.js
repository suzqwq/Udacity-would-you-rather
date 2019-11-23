import React, { Component } from 'react'

class Options extends Component{

		questionID=(userQs)=>{

	console.log(userQs)

		const {allQuestions}=this.props
		let qIds
		for (let i=0; i<userQs.length; i++){
			 qIds=allQuestions.filter((q)=> (
				q.id === userQs[i])) 
			}
		qIds=qIds[0]

		console.log(qIds && qIds.optionOne)
		if(qIds && qIds.id)
		{
			return  <form className="options-overview">
			<option type="radio">
				{qIds.optionOne.text}
			</option>
			<option type="radio">
				{qIds.optionTwo.text}
			</option> 
			</form>
		}
		
		
	}

	render(){
		const {user}=this.props

		return (
			<div>Would you rather...
			
						{this.questionID(user.questions)}

			</div>

			)
	}
}

export default Options