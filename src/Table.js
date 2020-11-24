import React from 'react'

function Table({list}){

  


  return(
    <div className="table">
     {list.map((item,i) => <tr key={i}>
                              <td>{item.country}</td>
                                <td>{item.cases}</td>
                              </tr>)}
    </div>
  )
}

export default Table