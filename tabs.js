var Tabs = React.createClass({
  getInitialState: function () {
    return {selected: 0};
  },

  handleClick: function (index) {
    this.setState({selected: index});
  },

  render: function(){
    return (
      <div>
        <ul className="head group">
          {
            this.props.library.map(function (el, index) {
              return <li onClick={this.handleClick.bind(this, index)}>{el.title}</li>
            }.bind(this))
          }
        </ul>
        <div>
          {
            this.props.library[this.state.selected].content
          }
        </div>
      </div>
    );
  }
});

var lib = [
  {title: "First", content: "My first stuff"},
  {title: "2nd", content: "My second stuff"}
];

React.render(<Tabs library={lib}/>, document.getElementById("tabs"));
