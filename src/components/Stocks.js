import React, { Component } from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'

export default class Stocks extends Component {
	constructor(props){
		super(props)
		this.state={
			results:null,
			input:"",
			openData:[],
			highData:[],
			lowData:[],
			closeData:[],
			graphMin:null,
			graphMax:null,
			graphData:{
				labels:[],
				datasets:[
					{
						label:['Open'],
						data:[],
						backgroundColor:['rgb(0,255,0,.2)']
					},
					{
						label:['High'],
						data:[],
						backgroundColor:['rgb(255,255,0,.2)']
					},
					{
						label:['Low'],
						data:[],
						backgroundColor:['rgb(0,255,255,.2)']
					},
					{
						label:['Close'],
						data:[],
						backgroundColor:['rgb(255,0,255,.2)']
					},
				]
			}
		}
	}


	getStocks = () => {
    const {REACT_APP_ALPHAVANTAGE} = process.env
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.input}&interval=5min&apikey=${REACT_APP_ALPHAVANTAGE}`).then(res => {
			this.setState({ results: res.data});
			this.objMap();
			console.log('getting stocks...')
    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });
	};
	
	handleInput(val){
		this.setState({input:val})
	}

	objMap(){
		let timeSeries = "Time Series (5min)";
		let open = "1. open"
		let openData = []
		let high = "2. high"
		let highData = []
		let low = "3. low"
		let lowData = []
		let close = "4. close"
		let closeData = []

		for(let i in this.state.results[timeSeries]){
			openData.push(this.state.results[timeSeries][i][open]*1)
			highData.push(this.state.results[timeSeries][i][high]*1)
			lowData.push(this.state.results[timeSeries][i][low]*1)
			closeData.push(this.state.results[timeSeries][i][close]*1)
		}

		let newlabels = []
		for (let i = 0 ; i < 100 ; i ++){
			newlabels.push(5 * i)}

		let min = Math.min(...lowData)
		let max = Math.max(...highData)


		let newState = {...this.state}
			newState.graphData.labels = newlabels
			newState.graphMin = min
			newState.graphMax = max

		this.setState({openData:openData,highData:highData,lowData:lowData,closeData:closeData,})

			newState.graphData.datasets[0].data = openData
			newState.graphData.datasets[1].data = highData
			newState.graphData.datasets[2].data = lowData
			newState.graphData.datasets[3].data = closeData

		this.setState({...newState})
		console.log(this.state)
	}

	render(){
		let {graphMax,graphMin} = this.state
		return (
			<div>
				<input onChange={(e)=>this.handleInput(e.target.value)}/>
				<button onClick={()=>this.getStocks()}>Click For Stocks</button>
				<div style={{height:"600px",width:"800px",backgroundColor:"rgba(0,0,0,.8)"}}>
				<Line
                    data={this.state.newState? this.state.newState.graphData.datasets : this.state.graphData}
                    options={{
                        legend:{
                            labels:{
                                fontColor:'white',
                                boxWidth:80,
                                fontSize:18,
                                fontFamily:"'Arial'",
                            }
                        },
                        maintainAspectRatio: true,
                        scales:{
                            yAxes:[{
                                gridLines:{
                                    display:true,
                                    color:"white",
                                    zeroLineColor:'white',
                                    zeroLineWidth: 3,
                                },
                                ticks:{
                                    max:(graphMax *1),
                                    min:(graphMin *1),
                                    stepSize:((graphMax - graphMin)/10),
                                    fontColor:'white',
                                }
                            }],
                            xAxes:[{
                                gridLines:{
                                    display:false,
                                    color:"white"
                                },
                                ticks:{
                                    fontColor:'white'
                                }
                            }],
                        }

                    }}
                />
								</div>
								{/* Graph Ends One Line Above */}
			</div>
		)
	}
}
