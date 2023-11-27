import React from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Tabs,
  Tab,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import IncomePanel from "./IncomePanel";
import ExpensePanel from "./ExpensePanel";
import IncomesTable from "./IncomesTable";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`financial-tabpanel-${index}`}
      aria-labelledby={`financial-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {typeof children === "string" ? (
            <Typography>{children}</Typography>
          ) : (
            children
          )}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `financial-tab-${index}`,
    "aria-controls": `financial-tabpanel-${index}`,
  };
}
export default function FinancialTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="financial tabs">
          <Tab label="Receitas" {...a11yProps(0)} />
          <Tab label="Despesas" {...a11yProps(1)} />
          <Tab label="Balancete" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container alignContent="center" width="100vw">
          <Grid item xs={4}>
            <IncomePanel />
          </Grid>
          <Grid item xs={6} mt={2} ml={4}>
            <Stack spacing={2} maxWidth="48vw">
              <Typography>Últimas receitas inseridas:</Typography>
              <IncomesTable />
            </Stack>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ExpensePanel />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Balancete
      </CustomTabPanel>
    </Box>
  );
}
