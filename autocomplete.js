var AutoResults = React.createClass({
  render: function(){
    return (<ul>
      {
        this.props.results.map(function(result){
          return <li onClick={this.props.handleClick}>{result}</li>
        }.bind(this))
      }
    </ul>);
  }
});

var AutoComplete = React.createClass({
  getInitialState: function(){
    return {inputVal: ""};
  },

  handleKeypress: function(e){
    this.setState({inputVal: e.target.value});
  },

  handleClick: function(e){
    this.setState({inputVal: e.target.innerHTML });
  },

  render: function(){
    var inputV = this.state.inputVal.toLowerCase();
    var results = this.props.library.filter(function(name) {
      return (name.toLowerCase().indexOf(inputV) === 0);
    }.bind(this));
    return(
      <div>
        <input value={this.state.inputVal} onChange={this.handleKeypress}/>
        <AutoResults results={results} handleClick={this.handleClick}/>
      </div>
    );
  }
});

var names = ["Eric", "Jeff", "Jade", "Judy", "Jon", "Max", "Ryan", "Ned", "Kush", "Markov"];
React.render(<AutoComplete library={names}/>, document.getElementById('autocomplete'));
