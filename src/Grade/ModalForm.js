import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import GradeForm from 'Grade/Form'


const GradeModalForm = ({
  grade,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...grade})

  return (
    <div>
      <Modal
        title="Update Grade"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <GradeForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default GradeModalForm
