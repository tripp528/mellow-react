import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import ClimbingStyleTagForm from 'ClimbingStyleTag/Form'


const ClimbingStyleTagModalForm = ({
  climbing_style_tag,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...climbing_style_tag})

  return (
    <div>
      <Modal
        title="Update ClimbingStyleTag"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <ClimbingStyleTagForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default ClimbingStyleTagModalForm
