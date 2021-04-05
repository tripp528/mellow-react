import React, { useState } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import BoulderForm from 'Boulder/Form'


const CreateBoulder = () => {

  const [modal_showing, set_modal_showing] = useState(false)
  const [form_vals, set_form_vals] = useState({
    name: "",
    location: new firebase.firestore.GeoPoint(0,0),
    area: null
  })

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Boulder </Button>

      <Modal
        title="Create Boulder"
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

export default CreateBoulder
