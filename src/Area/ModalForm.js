import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import AreaForm from 'Area/Form'


const AreaModalForm = ({
  area,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...area})

  return (
    <div>
      <Modal
        title="Update Area"
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

export default AreaModalForm
