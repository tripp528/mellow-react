import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import BoulderForm from 'Boulder/Form'


const BoulderModalForm = ({
  boulder,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...boulder})

  return (
    <div>
      <Modal
        title="Update Boulder"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <BoulderForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default BoulderModalForm
