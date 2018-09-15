import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import {Switch, Route, Link} from 'react-router-dom'
import Comp1 from './components/Comp1'
import Comp4 from './components/Comp4'
import Stocks from './components/Stocks'

class App extends Component {
  constructor(props){
  super(props)
  this.state={
    results:'',
    query:'',
    input:'',
    get:'',
    post:'',
    put:'',
    delete:'',
    hotUpdater:'',
    numnum:1
    }
  }

  performSearch = (query = this.state.input) => {
    const {REACT_APP_UNSPLASH} = process.env
    axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=20&query=${this.state.query}&client_id=${REACT_APP_UNSPLASH}`).then(res => {
      this.setState({ results: res.data.results });
    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });
  };

  changeHandler(val){
    this.setState({query:val})
  }
  handleInput(val){
    this.setState({input:val})
  }
  getter(){
    axios.get('/api/waffle').then(res=>this.setState({get:res.data}))
  }
  getterQuery(){
    axios.get(`/api/get/?turtle=${this.state.input}`).then(res=>this.setState({get:res.data}))
  }
  poster(){
    axios.post('/api/post').then(res=>this.setState({post:res.data}))
  }
  putter(){
    axios.put('/api/meow/1').then(res=>this.setState({put:res.data}))
  }
  deleter(){
    axios.delete('/api/dog/1').then(res=>this.setState({delete:res.data}))
  }
  componentDidUpdate(prevProps,prevState){

  }
  handleNum(val){
    this.setState({numnum:val})
  }

  render() {

    console.log(this.props)

    return (
        <div className="App">
        <input onChange={(e)=>this.changeHandler(e.target.value)}/>
        <button onClick={()=>this.performSearch()}>Get Datars!</button>
        <button onClick={()=>this.getter()}>GET Endpoint</button>
        <input onChange={(e)=>{this.handleInput(e.target.value)}}/>
        <button onClick={()=>this.getterQuery()}>QUERY Endpoint</button>
        <button onClick={()=>this.poster()}>POST Endpoint</button>            
        <button onClick={()=>this.putter()}>PUT Endpoint</button>
        <button onClick={()=>this.deleter()}>DELETE Endpoint</button>
        <p>{this.state.get}</p>
        <p>{this.state.post}</p>
        <p>{this.state.put}</p>
        <p>{this.state.delete}</p>
        <p>{JSON.stringify(this.state.results)}</p>
        <Link to={`/waffle/${this.state.numnum}`}>CLICK ME :D</Link>
        <input type="number" onChange={(e)=>this.handleNum(e.target.value)}/>
        <Switch>
          <Route  exact path="/"  component={Comp1}/>
          <Route  path="/waffle/:id"     component={Comp4}/>
        </Switch>
        <Stocks/>
      </div>
    );
  }
}

export default App;
