import React from "react";


const Headers=(props)=>{
    let tableHeaders=[props.header];
    return tableHeaders.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     })
  }


const processComponent = (props) => {

  return (
    <React.Fragment>
         <tr>  <Headers header={props.header}/> </tr> 
      <tr key={props.id}>
      <td>{props.info}</td>
        
       
      </tr>
      </React.Fragment>
  );
};
export default processComponent;
