import React, { useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import AreaForm from 'Area/Form'


const CreateArea = ({
  area,
}) => {

  if (!area) area = {
    name: ""
  }

  const [modal_showing, set_modal_showing] = useState(false)
  const [form_vals, set_form_vals] = useState(area)

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Area </Button>

      <Modal
        title="Create Area"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <AreaForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default CreateArea
