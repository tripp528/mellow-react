import React from 'react'
import { Tabs } from 'antd'
import BoulderList from 'BoulderList'

const { TabPane } = Tabs

const MainTabs = () => {
  const [value, set_value] = React.useState(0)

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={() => console.log("tab change")}>
        <TabPane tab="Boulder" key="1">
          <BoulderList />
        </TabPane>
        <TabPane tab="Area" key="2">
          Areasssss
        </TabPane>
      </Tabs>
    </div>
  )
}
export default MainTabs
