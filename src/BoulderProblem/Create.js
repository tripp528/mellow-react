import React, { useState, useContext } from 'react'
import { Button, Modal } from 'antd'
import firebase from 'firebase/app'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import BoulderProblemForm from 'BoulderProblem/Form'


const CreateBoulderProblem = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_boulder_problem = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.boulder_problems + '/' + id),
      name: "",
      boudler: null,
      summary: "",
      rating: -1,

      // List of Climbing Style Tags
      // Grade (not user based)
    }
  }
  const [form_vals, set_form_vals] = useState(new_boulder_problem())

  return (
    <div>
      <Button
        onClick={() => set_modal_showing(true)}
      > Create New BoulderProblem </Button>

      <Modal
        title="Create BoulderProblem"
        visible={modal_showing}
        footer={null}
        onCancel={() => {

          // delete images from storage and the subcollection
          utils.maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_boulder_problem())

          // hide modal
          set_modal_showing(false)
        }}
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

export default CreateBoulderProblem
