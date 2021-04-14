import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import RockTypeForm from 'RockType/Form'


const RockTypeModalForm = ({
  rock_type,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...rock_type})

  return (
    <div>
      <Modal
        title="Update RockType"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <RockTypeForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default RockTypeModalForm
