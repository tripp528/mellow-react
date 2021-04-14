import React, { useState } from 'react'
import { Button, Popover } from 'antd'
import {DeleteFilled} from '@ant-design/icons'

const DeleteButton = ({
  onDelete
}) => {

  const [pop_showing, set_pop_showing] = useState(false)
  const [pop2_showing, set_pop2_showing] = useState(false)

  return (
    <div>
      <Popover
        content={() => {
          return(
            <div>
              <Popover
                content={
                  <div>
                    <Button
                      danger
                      type="primary"
                      onClick={() => {
                        set_pop2_showing(false)
                        set_pop_showing(false)
                        onDelete()
                      }}
                    > Delete </Button>
                  </div>
                }
                title="Are you positive? This can't be undone."
                trigger="click"
                visible={pop2_showing}
                onVisibleChange={visible => set_pop2_showing(visible)}
              >
                <Button
                  danger
                  type="primary"
                  onClick={() => set_pop2_showing(true)}
                > Delete </Button>
              </Popover>
            </div>
          )
        }}
        title="Are you sure you want to delete?"
        trigger="click"
        visible={pop_showing}
        onVisibleChange={visible => set_pop_showing(visible)}
      >
        <Button
          danger
          shape="circle"
          // type="primary"
          // size="small"
          icon={<DeleteFilled />}
          onClick={() => set_pop_showing(true)}
        />
      </Popover>
    </div>
  )
}


export default DeleteButton
