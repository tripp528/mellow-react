import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BoulderList from 'BoulderList'

const MainTabs = () => {
  const [value, set_value] = React.useState(0);

  // define order for tabs
  const tabs = [
    "Boulder",
    "Area",
  ]

  const tab_content = {
    "Boulder": <BoulderList />,
    "Area": <div> Areasss </div>
  }

  return (
    <div>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, new_val) => set_value(new_val)}
        >
          {tabs.map(x => <Tab key={x} label={x} />)}
        </Tabs>
      </Paper>

      {tab_content[tabs[value]]}

    </div>
  );
}
export default MainTabs
