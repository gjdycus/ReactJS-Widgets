var WeatherClock = React.createClass({
  render: function () {
    return (
      <div>
        <Clock/>
        <Weather/>
      </div>
    );
  }
});

var Weather = React.createClass({
  getInitialState: function () {
    return {tmp: "", maxTmp: "", minTmp: "", conditions: "", location: "Weather Loading..."};
  },

  getWeather: function(lat, lng){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng
    var http = new XMLHttpRequest();
    http.open("GET", url);
    http.addEventListener("load", function(res){
      this.renderWeather(JSON.parse(res.currentTarget.responseText));
    }.bind(this))
    http.send();
  },

  componentDidMount: function(){
    navigator.geolocation.getCurrentPosition(function(pos){
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      this.getWeather(lat, lng);
    }.bind(this));
  },

  renderWeather: function (weatherObject) {
    this.setState({
      tmp: "Current: " + this._kToF(weatherObject.main.temp) + "°F",
      maxTmp: "Max: " + this._kToF(weatherObject.main.temp_max) + "°F",
      minTmp: "Min: " + this._kToF(weatherObject.main.temp_min) + "°F",
      location: weatherObject.name + " Weather",
      conditions: weatherObject.weather[0].description
    });
  },

  _kToF: function(k) {
    return (((k-273.15) * (9/5)) + 32).toFixed(1);
  },

  render: function(){
    return(
      <div>
        <h2>{ this.state.location }</h2>
        <div>{this.state.conditions }</div>
        <div>{ this.state.tmp }</div>
        <br/>
        <div>{ this.state.maxTmp }</div>
        <div>{ this.state.minTmp }</div>
      </div>
    );
  }
});

var Clock = React.createClass({
  getInitialState: function () {
    return {currentTime: new Date()};
  },

  componentDidMount: function () {
    setInterval(this._tick, 1000);
  },

  _tick: function () {
    this.state.currentTime.setSeconds(this.state.currentTime.getSeconds() + 1);
    this.setState({currentTime: this.state.currentTime});
  },

  render: function () {
    return <h1>{this.state.currentTime.toString()}</h1>
  }
});

React.render(<WeatherClock/>, document.getElementById("weather"));
