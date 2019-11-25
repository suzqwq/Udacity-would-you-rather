import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import { connect} from 'react-redux'

class InvalidPage extends React.Component{

	render(){

		if(this.props.authedUser==null){
			return <Redirect
			to={{
				pathname:'/',
				state: {from: {pathname: '/question/invalid'}}
			}}
			/>
		}
			return (
		
			<div className='invalid'>
			<h3>404 <br/> Looks like this question does not exist!</h3>
			<Link to='/' >Go Back</Link>
			</div>

			
			

				)
}
			

	
	}

function mapStateToProps({authedUser}){

	return {
		authedUser
	}
}	


export default connect(mapStateToProps)(InvalidPage)