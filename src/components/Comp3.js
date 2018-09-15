import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Comp3 extends Component {
	constructor(props){
		super(props)
	}
	render() {
		console.log(this.props.match)

		return (
			<div>
				This is Comp 3
				<Link to='/4'>Go to 4</Link>
				<div></div>
				<Link to={`${this.props.match.params.id}`}>Back?</Link>
			</div>
		)
	}
}
