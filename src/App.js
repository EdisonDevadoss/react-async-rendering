import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { addData, fetchData } from "./firebase/firebase";
//https://jsonplaceholder.typicode.com/todos/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "",
      age: "",
      data: {}
    };
  }
  componentDidMount() {
    this.fetchRealTime = this.fetchRealTime();
  }

  componentWillUnmount() {
    this.fetchRealTime();
  }

  fetchRealTime = () => {
    fetchData.on("value", snapshot => {
      console.log("snapshot", snapshot.val());
      this.setState({ data: snapshot.val() });
    });
  };

  handleChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };
  handleSubmit = event => {
    const detail = {
      name: this.state.name,
      age: this.state.age
    };
    addData(detail)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("err", err);
      });
    event.preventDefault();
  };
  render() {
    const { data, name, age } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              name="name"
              onChange={this.handleChange.bind(this, "name")}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              value={age}
              name="age"
              onChange={this.handleChange.bind(this, "age")}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {Object.values(data).map((val, i) => {
          return (
            <div key={i}>
              <p>{val.name}</p>
              <p>{val.age}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
