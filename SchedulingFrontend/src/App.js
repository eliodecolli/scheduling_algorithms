import React from "react";
import axios from "axios";
import ProcessComponent from "./Components/processComponent";
import "./App.css";

class App extends React.Component {
  state = {
    processData: [],
    students: [
      { id: 1, name: "Arber", age: 18 },
      { id: 2, name: "Elidor", age: 19 },
      { id: 3, name: "Ulger", age: 16 },
    ],
    processChosen: "",
    isBackendCalled: false,
  };
  renderTableData(data) {
   
      const { att, awt, completion_time,seq_processes,turnaround_time,waiting_time } = data; //destructuring
   const  COMPLETION_TIME= completion_time.map((data,index)=>{
        return <ProcessComponent header={"Completion Time"} id={index} info={data} />
      })
      
        
      
      const TURNAROUND_TIME=turnaround_time.map((data,index)=>{
        return <ProcessComponent header={"Turn Around Time"} id={index} info={data} />
      })
      const WAITING_TIME=waiting_time.map((data,index)=>{
        return <ProcessComponent header={"Waiting Time"} id={index} info={data} />
      })
      console.log(data)
      console.log(awt)
      return(<>
      <div class="thefloatr" >
      <ProcessComponent header={"ATT"} id={52315} info={att}  />
      </div> 
       <div  class="thefloatr">
        <ProcessComponent header={"AWT"} id={13645} info={awt} />
      
        </div>
        <div class="thefloatl">
        {COMPLETION_TIME}
        </div>
        <div  class="thefloatr">
                  <ProcessComponent header={"Sequence Processes"} id={124124} info={seq_processes} />
        </div>
<div class="thefloatl">
   {TURNAROUND_TIME}
</div>
       <div class="thefloatl"> 
          {WAITING_TIME}
       </div>
      
        </>
        )
  }

  onClickHandler = async (e) => {
    var process='';
    e.preventDefault();
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
  };
    await axios
      .get("http://127.0.0.1:5000/",config)
      .then(async function (response) {
        process = response.data;
        console.log(process)
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
          <div class={"center"}>
          <table id="students">
            <tbody>{this.renderTableData(this.state.processData)}</tbody>
          </table>
          </div>
        </div>
      );
  }
}
}
export default App;
