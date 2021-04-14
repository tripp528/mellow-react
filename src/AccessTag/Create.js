import React, { useState, useContext } from 'react'
import { Button, Modal } from 'antd'
import firebase from 'firebase/app'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import AccessTagForm from 'AccessTag/Form'


const CreateAccessTag = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_access_tag = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.access_tags + '/' + id),
      name: "",
      color: "",
    }
  }
  const [form_vals, set_form_vals] = useState(new_access_tag())

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Access Tag </Button>

      <Modal
        title="Create Access Tag"
        visible={modal_showing}
        footer={null}
        onCancel={() => {

          // delete images from storage and the subcollection
          utils.maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_access_tag())

          // hide modal
          set_modal_showing(false)
        }}
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

export default CreateAccessTag
