import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import "./infoBox.css"

function InfoBox({ title, cases, total, active, ...props  }) {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} `}>
      <CardContent>

        <Typography color='textSecondary' gutterBottom >
            {title}
        </Typography>

        <h2 className={`infoBox__cases`}>{cases}</h2>

        <Typography className="infoBox__total" color='textSecondary'>
          {total} Total
        </Typography>
        
      </CardContent>
    </Card>
  )
}

export default InfoBox

