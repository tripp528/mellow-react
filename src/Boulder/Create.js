import React, { useState, useContext } from 'react'
import { Button, Modal } from 'antd'
import firebase from 'firebase/app'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import BoulderForm from 'Boulder/Form'


const CreateBoulder = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_boulder = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.boulders + '/' + id),
      name: "",
      summary: "",
      location: new firebase.firestore.GeoPoint(0,0),
      area: null,
    }
  }
  const [form_vals, set_form_vals] = useState(new_boulder())

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Boulder </Button>

      <Modal
        title="Create Boulder"
        visible={modal_showing}
        footer={null}
        onCancel={() => {

          // delete images from storage and the subcollection
          utils.maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_boulder())

          // hide modal
          set_modal_showing(false)
        }}
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
