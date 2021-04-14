import React, { useState, useContext } from 'react'
import { Button, Modal } from 'antd'
import firebase from 'firebase/app'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import GradeForm from 'Grade/Form'


const CreateGrade = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_grade = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.grades + '/' + id),
      name: "",
    }
  }
  const [form_vals, set_form_vals] = useState(new_grade())

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New Grade </Button>

      <Modal
        title="Create Grade"
        visible={modal_showing}
        footer={null}
        onCancel={() => {

          // delete images from storage and the subcollection
          utils.maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_grade())

          // hide modal
          set_modal_showing(false)
        }}
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

export default CreateGrade
