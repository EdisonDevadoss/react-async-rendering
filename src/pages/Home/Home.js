import React, { Component } from "react";
import { connect } from "react-redux";
import { addData, fetchData } from "../../firebase/firebase";
import fetchRealTimeData from "./fetch.action";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "",
      age: "",
      data: {}
    };
  }
  chatThreadRef = React.createRef();

  componentDidMount() {
    this.fetchRealTime = this.props.dispatch(fetchRealTimeData()).then(() => {
      const { fetchData } = this.props;
      this.setState({ data: fetchData });
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { fetchData } = props;
    if (fetchData !== state.data) {
      return { data: fetchData };
    }
    // Return null to indicate no change to state.
    return null;
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   if (
  //     Object.values(this.state.data).length >
  //     Object.values(prevState.data).length
  //   ) {
  //     const chatThreadRef = this.chatThreadRef.current;
  //     return chatThreadRef.scrollHeight - chatThreadRef.scrollTop;
  //   }
  //   return null;
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (snapshot !== null) {
  //     const chatThreadRef = this.chatThreadRef.current;
  //     chatThreadRef.scrollTop = chatThreadRef.scrollHeight - snapshot;
  //   }
  // }

  componentWillUnmount() {
    this.fetchRealTime();
  }

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
    const { fetchData } = this.props;
    console.log("fetchData", fetchData);
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
            <div key={i} ref={this.chatThreadRef}>
              <li>{val.name}</li>
              <li>{val.age}</li>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchData: state.fetchData.data
});

export default connect(mapStateToProps)(Home);
