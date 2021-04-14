import React, { useState, useContext } from 'react'
import { Button, Modal } from 'antd'
import firebase from 'firebase/app'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import RockTypeForm from 'RockType/Form'


const CreateRockType = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_rock_type = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.rock_types + '/' + id),
      name: "",
      rating: -1,
    }
  }
  const [form_vals, set_form_vals] = useState(new_rock_type())

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Rock Type </Button>

      <Modal
        title="Create Rock Type"
        visible={modal_showing}
        footer={null}
        onCancel={() => {

          // delete images from storage and the subcollection
          utils.maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_rock_type())

          // hide modal
          set_modal_showing(false)
        }}
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

export default CreateRockType
