import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import AccessTagForm from 'AccessTag/Form'


const AccessTagModalForm = ({
  access_tag,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...access_tag})

  return (
    <div>
      <Modal
        title="Update AccessTag"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <AccessTagForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default AccessTagModalForm
