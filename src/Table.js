import React from 'react'
import "./Table.css"
import numeral from 'numeral'

function Table({list}){
  return(
    <div className="table">
     {list.map((item,i) => <tr key={i}>
                              <td>{item.country}</td>
                                <td><strong>{numeral(item.cases).format("0,0")}</strong></td>
                              </tr>)}
    </div>
  )
}

export default Table