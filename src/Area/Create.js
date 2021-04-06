import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

import { Button, Modal } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import AreaForm from 'Area/Form'

const delete_image_subcollection = (images_ref) => {

  // delete any images that were uploaded from storage
  images_ref.get()
  .then((querySnapshot) => {
    querySnapshot.forEach(img_doc => {

      // delete the image from storage
      const url = img_doc.data().url
      const img_storage_ref = firebase.storage().refFromURL(url)
      img_storage_ref.delete()
      .then(() => {

        // once image is delete from storage, delete the image document from firestore
        img_doc.ref.delete()
        .catch(err => utils.error_msg(err))
      })
      .catch(err => utils.error_msg(err))
    })
  })
  .catch(err => utils.error_msg(err))
}

const maybe_delete_image_subcollection = (area_ref) => {
  // TODO: split this into delete_storage, delete_subcollection_with_urls, etc.

  area_ref.get()
  .then(area_doc => {
    if (!area_doc.exists) {
      delete_image_subcollection(area_doc.ref.collection('images'))
    }
  })
}

const CreateArea = () => {

  const { db } = useContext(FirestoreContext)
  const [modal_showing, set_modal_showing] = useState(false)

  const new_area = () => {
    const id = utils.uuid()
    return {
      id: id,
      doc_ref: db.doc(utils.collections.AREAS + '/' + id),
      name: ""
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
        onCancel={() => {

          // delete images from storage and the subcollection
          maybe_delete_image_subcollection(form_vals.doc_ref)

          // reset form vals
          set_form_vals(new_area())

          // hide modal
          set_modal_showing(false)
        }}
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
