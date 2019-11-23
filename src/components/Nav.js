import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component{
	render(){
		const { authedUser, allUsers}= this.props

  			return (


				<nav className='nav'>
					<ul className='nav-left'>
						<li>
							<NavLink to='/home' exact activeClassName='active'>Home</NavLink></li>
						<li>
							<NavLink to='/leaderboard'  activeClassName='active'>Leader Board</NavLink></li>
						<li>
							<NavLink to='/add'  activeClassName='active'>New Poll</NavLink></li>
					</ul>
					<div className='nav-right'>
					{  allUsers.map((user)=>(
						user.id===authedUser && 
							<ul key={user.id}>
							 
								<li className='name'>{user.name}</li>
								<li ><img className='authed-avatar' src={user.avatarURL} alt={authedUser} /></li>
								<li ><a href='/'>Sign out</a></li>
							</ul>
						)
					)}
					</div>
				</nav>


  			)
  		}
  
	}
//}

function mapStateToProps({  authedUser}) {
	return{
		authedUser: authedUser ? authedUser['authedUser'] : '',
	}
}

export default connect(mapStateToProps)(Nav)