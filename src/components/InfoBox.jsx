import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, totalCases }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title */}
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>

        {/* cases */}
        <h2 className="infobox__cases">{cases}</h2>

        {/* Total cases */}
        <Typography className="infobox__total" color="textSecondary">
          {totalCases}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
