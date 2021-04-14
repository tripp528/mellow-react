import React, { useState, useContext } from 'react'
import { Button, Modal } from 'antd'
import firebase from 'firebase/app'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import ClimbingStyleTagForm from 'ClimbingStyleTag/Form'


const CreateClimbingStyleTag = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_climbing_style_tag = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.climbing_style_tags + '/' + id),
      name: "",
      color: "",
    }
  }
  const [form_vals, set_form_vals] = useState(new_climbing_style_tag())

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Climbing Style Tag </Button>

      <Modal
        title="Create Climbing Style Tag"
        visible={modal_showing}
        footer={null}
        onCancel={() => {

          // delete images from storage and the subcollection
          utils.maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_climbing_style_tag())

          // hide modal
          set_modal_showing(false)
        }}
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

export default CreateClimbingStyleTag
