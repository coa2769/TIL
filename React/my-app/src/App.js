import React, { Component } from 'react';
import './App.css';

import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';


class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      selected_content_id : 2,
      subject : {title:'WEB', sub:'World Wide Web!'},
      welcome : {title : 'Welcome', desc : 'Hello, React!!'},
      contents : [
        {id:1, title : 'HTML', desc : 'HTML is HyperText ...' },
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id : 3, title : 'JavaScript', desc : 'JavaScript is for interactive'},
      ],
    };
  }

  render(){
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].desc;
          break;
        }
        i = i+1;
      }
    }

    return (
      <div className='App'>
        {/* <header>
          <h1> <a href='/' onClick={function(e){
            e.preventDefault();              
            this.setState({
              mode:'welcom'
            });
          }.bind(this)}>{this.state.subject.title}</a></h1>
          { this.state.subject.sub }
        </header> */}
          <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            // alert('hihihi');
            this.setState({
              mode : 'welcome',
            })
          }.bind(this)}
          ></Subject>
          <TOC 
          onChangePage={function(id){
            // alert('hi');
            this.setState({
              mode:'read',
              selected_content_id : Number(id),
            });
            
          }.bind(this)} 
          data={this.state.contents}
          ></TOC>
          <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
  
}

// function App() {
//   return (
//     <div className="App">
      // <header className="App-header">
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header>
//     </div>
//   );
// }

export default App;
