import React, { useContext, useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import BoulderProblemForm from 'BoulderProblem/Form'


const BoulderProblemModalForm = ({
  boulder_problem,
  modal_showing,
  set_modal_showing
}) => {

  const [form_vals, set_form_vals] = useState({...boulder_problem})

  return (
    <div>
      <Modal
        title="Update BoulderProblem"
        visible={modal_showing}
        footer={null}
        onCancel={() => set_modal_showing(false)}
        destroyOnClose
      >
        <BoulderProblemForm
          form_vals={form_vals}
          set_form_vals={set_form_vals}
        />
      </Modal>

    </div>
  )
}

export default BoulderProblemModalForm
