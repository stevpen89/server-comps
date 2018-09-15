import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Comp1 extends Component {
	constructor(props){
		super(props)
		this.state={

		}
	}
	render() {
		console.log(this.props.match)
		return (
			<div>
				This is Comp 1
				<Link to='/2'>Go to 2</Link>
				<div></div>
				<Link to={`${this.props.match.params.id}`}>Back?</Link>
			</div>
		)
	}
}
