import React from 'react'
import { Tabs } from 'antd'
import BoulderList from 'Boulder/List'
import AreaList from 'Area/List'

const { TabPane } = Tabs

const MainTabs = () => {
  const [value, set_value] = React.useState(0)

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={() => console.log("tab change")}>
        <TabPane tab="Area" key="1">
          <AreaList />
        </TabPane>
        <TabPane tab="Boulder" key="2">
          <BoulderList />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default MainTabs
