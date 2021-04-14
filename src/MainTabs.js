import React from 'react'
import { Tabs } from 'antd'
import BoulderList from 'Boulder/List'
import BoulderProblemList from 'BoulderProblem/List'
import ClimbingStyleTagList from 'ClimbingStyleTag/List'
import GradeList from 'Grade/List'
import RockTypeList from 'RockType/List'
import AccessTagList from 'AccessTag/List'
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
        <TabPane tab="Boulder Problem" key="3">
          <BoulderProblemList />
        </TabPane>
        <TabPane tab="Climbing Style Tag" key="4">
          <ClimbingStyleTagList />
        </TabPane>
        <TabPane tab="Grade" key="5">
          <GradeList />
        </TabPane>
        <TabPane tab="Rock Type" key="6">
          <RockTypeList />
        </TabPane>
        <TabPane tab="Access Tag" key="7">
          <AccessTagList />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default MainTabs
