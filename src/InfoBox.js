import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import "./InfoBox.css";

function InfoBox({ title, cases, total,active, isRed, ...props  }) {
  return (
    <Card className={`infoBox ${active && "infoBox--selected"} ${
      isRed && "infoBox--red"
    }`}>
      <CardContent>

        <Typography className="info__title" color='textSecondary' >
            {title}
        </Typography>

        <h2 className="info__cases">{cases}</h2>

        <Typography className="info__total" color='textSecondary'>
          {total} Total
        </Typography>

      </CardContent>
    </Card>
  )
}

export default InfoBox

