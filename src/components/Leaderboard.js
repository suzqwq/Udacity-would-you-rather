import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component{


	render(){

		if(this.props.authedUser==null){
			return <Redirect
			to={{
				pathname:'/',
				state: {from: this.props.location}
			}}
			/>
		}

		const {users}=this.props

		let user=Object.keys(users).map((id, i)=>{
			let answered=Object.keys(users[id].answers).length
			let asked=Object.keys(users[id].questions).length
			return {
				'name': users[id].name,
				'avatarURL':users[id].avatarURL,
				'asked': asked,
				'answered': answered,
				'total': answered+asked

			}
		})

		user.sort((a,b)=>{
			if(b.total>a.total) return 1
			if(b.total<a.total) return -1

			return 0
		})

		return(
			<div className='home-wrap'>
				<ul className='home-container'>
					{user.map((i, id)=> (
						<li key={id} className='leader-box'>
							<div className='user-container'>
								<img src={i.avatarURL} alt={i.name} className='avatar' />
								<span>{i.name}</span>
								<div className='leader-details'>
								<p>Questions asked: {i.asked}</p>
								<p>Questions answered: {i.answered}</p>
								</div>
							</div>
							<div className='question-overview-container ranking-box'>
								
								<div className='ranking-icon'>{i.total}</div>
							</div>

						</li> 
					))}
				</ul>
			</div>

			)
	}
}

function mapStateToProps({authedUser, users}){
	return {
		authedUser,
		users,
	}
}
export default connect(mapStateToProps)(Leaderboard)
