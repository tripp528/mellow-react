import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import { Button, Modal } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import AreaForm from 'Area/Form'


const CreateArea = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_area = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.AREAS + '/' + id),
      name: "",
      image_url: null,
    }
  }
  const [form_vals, set_form_vals] = useState(new_area())

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
