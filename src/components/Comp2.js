import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Comp2 extends Component {
	constructor(props){
		super(props)
	}
	render() {
		console.log(this.props.match)

		return (
			<div>
				This is Comp 2
				<Link to='/3'>Go to 3</Link>
				<div></div>
				<Link to={`${this.props.match.params.id}`}>Back?</Link>
				
			</div>
		)
	}
}
