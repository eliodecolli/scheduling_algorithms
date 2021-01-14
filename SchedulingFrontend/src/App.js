import React from "react";
import axios from "axios";
import ProcessComponent from "./Components/processComponent";
import "./App.css";

class App extends React.Component {
  state = {
    processData: [],
    students: [

    ],
    processChosen: "",
    isBackendCalled: false,
  };
  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, age } = student; //destructuring
      return <ProcessComponent id={id} name={name} time={age} />;
    });
  }

  onClickHandler = async (e) => {
    e.preventDefault();
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
  };
    await axios
      .get("http://127.0.0.1:5000/",config)
      .then(async function (response) {
        const process = response.data;
      })
      .catch(function (error) {
        // handle error
      });
      this.setState({ processData: process});
      this.setState({isBackendCalled: true })
  };
  async onSelectHandler(event) {
    await this.setState({ processChosen: event.target.value });
    console.log(this.state.processChosen);
  }

  render() {
    if (this.state.isBackendCalled === false) {
      return (
        <div className="App">
          <h1>Operating Systems Project</h1>
          <h2>Project Manager Shefqet Meda</h2>
          <h2>
            Project members:Arber Gjonaj, Elidor Varros, Eljo Decolli, Kristian
            Shatraj, Siner Sakollar, Ulger Boja
          </h2>

          <form>
            <label>{"Process types"}</label>
            <select
              name="process"
              id="process"
              onClick={(e) => this.onSelectHandler(e)}
            >
              <option value={"processA"}>{"A"}</option>
              <option value={"processB"}>{"B"}</option>
            </select>
            <input
              onClick={(e) => this.onClickHandler(e)}
              type="submit"
              value="Submit"
            ></input>
          </form>
        </div>
      );
    } else if(this.state.isBackendCalled === true){
      return (
        <div className="App">
          <h1>Operating Systems Project</h1>
          <h2>Project Manager Shefqet Meda</h2>
          <h2>
            Project members:Arber Gjonaj, Elidor Varros, Eljo Decolli, Kristian
            Shatraj, Siner Sakollar, Ulger Boja
          </h2>

          <form>
            <label>{"Process types"}</label>
            <select
              name="process"
              id="process"
              onClick={(e) => this.onSelectHandler(e)}
            >
              <option value={"processA"}>{"A"}</option>
              <option value={"processB"}>{"B"}</option>
            </select>
            <input
              onClick={(e) => this.onClickHandler(e)}
              type="submit"
              value="Submit"
            ></input>
          </form>
          <table id="students">
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      );
  }
}
}
export default App;
