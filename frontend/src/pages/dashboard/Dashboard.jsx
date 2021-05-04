import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Line from "../../components/graph/Line";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ minHeight: 500, maxHeight: 500 }}>
          Total Average
          <Line />
        </Grid>
        <Grid item xs={6}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
            >
              <Tab label="Daily" />
              <Tab label="Weekly" />
              <Tab label="Monthly" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item {value}
            <Line />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item {value}
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item {value}
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
