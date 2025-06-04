'use client';
import css from "./page.module.css";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Lead } from "./shared/interfaces/lead";
import { Status } from "./shared/enums/status";
import LeadsList from "./components/leads-list";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Home() {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={css.page}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={css.tab}
          aria-label="leads"
        >
          <Tab label="Invited" />
          <Tab label="Accepted" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="flex-row gap-y-10">
          <LeadsList status={Status.PENDING} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LeadsList status={Status.ACCEPTED} />
      </CustomTabPanel>
    </div>
  );
}
