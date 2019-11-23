import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import { Redirect } from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'

class Signin extends Component {
	state={
		id:'',
		toHome: false
	}

	handleChange=(e)=>{
		e.preventDefault()
			this.setState({
			id: e.target.value
		})	
		
	}
	handleClick=(e)=>{
		e.preventDefault()
		this.setState({
			toHome: true
		})

		this.props.dispatch(setAuthedUser({
			authedUser: this.state.id
		}))
	
		
	}

	render(){


		const {from} = this.props.location.state || {from: {pathname: '/home'}};

        if (this.props.authedUser!==null) {
            return <Redirect to={from.pathname}/>;
        }

		return (
			
			<div className="signin-form">
				<h2>Would You Rather </h2>
				<p>To start please sign in</p>
				<form className='form-container' >
					<select className='select' onChange={this.handleChange}>
						<option value='select user' >Select a user to sign in</option>
						{this.props.userData.map((data)=> (
						<option key={data.id} value={data.id}>{data.name}</option>
						))}
					</select>
					<button className='btn' onClick={(e)=>this.handleClick(e)} >Sign in</button>
				</form>
			</div>

			)
	}
}

function mapStateToProps ({authedUser, users}, authed) {
	
	return {
		userData: Object.values(users),
		authedUser,
		authed

	}

}

export default connect(mapStateToProps)(Signin)