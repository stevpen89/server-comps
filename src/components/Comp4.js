import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Comp4 extends Component {
	render() {
		console.log(this.props.match)

		return (
			<div>
				This is Comp 4
				<h1>{this.props.match.params.id}</h1>
				<Link to={this.props.match.params.id}>Go to 1</Link> 
				<div></div>
				<Link to='/3'>Back?</Link>
			</div>
		)
	}
}
