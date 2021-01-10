import React from "react";


const Headers=()=>{
    let tableHeaders=["ID","Process Type","Time"];
    return tableHeaders.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     })
  }


const processComponent = (props) => {

  return (
    <React.Fragment>
         <tr>  <Headers/> </tr> 
      <tr key={props.id}>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.time}</td>
      </tr>
      </React.Fragment>
  );
};
export default processComponent;
