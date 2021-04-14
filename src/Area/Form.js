import React, { useState, useContext, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/app'
import { Input, InputNumber, Button, Divider, Result } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import ImageUpload from 'UI/ImageUpload'

const { TextArea } = Input;


const AreaForm = ({
  form_vals,
  set_form_vals
}) => {

  const { db } = useContext(FirestoreContext)
  const [submit_success, set_submit_success] = useState(false)
  const [submit_error, set_submit_error] = useState(false)

  // subscribe to the images subcollection
  const images_ref = form_vals.doc_ref.collection('images')
  const [images, loading, error] = useCollectionData(images_ref, {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const submit_area = (new_area) => {
    const data = { ...new_area }
    delete data.id
    delete data.doc_ref
    new_area.doc_ref.set(data)
    .then((docRef) => {
      set_submit_success(true)
    })
    .catch((error) => {
      set_submit_error(true)
    })
  }

  const get_subission_result = () => {
    if (submit_success) {
      return (
        <Result
          status="success"
          title="Success!"
          subTitle="Some info"

        />
      )
    } else if (submit_error) {
      return (
        <Result
          status="error"
          title="Error!"
          subTitle="Some info"
        />
      )
    }
  }


  return (
    <div>
      {!submit_success && !submit_error ?
        <div>

          {/* name */}
          Name
          <Input
            value={form_vals.name}
            placeholder="Name"
            onChange={(e) => {
              const new_form_vals = {...form_vals}
              new_form_vals.name = e.target.value
              set_form_vals(new_form_vals)
            }}
          />

          {/* summary */}
          Summary
          <TextArea
            value={form_vals.summary}
            placeholder="Summary"
            onChange={(e) => {
              const new_form_vals = {...form_vals}
              new_form_vals.summary = e.target.value
              set_form_vals(new_form_vals)
            }}
          />

          {/* image */}
          Images
          <ImageUpload
            images_ref={images_ref}
            images={images}
          />

          <Divider/>
          <Button
            type="primary"
            onClick={() => {
              submit_area(form_vals)
            }}
          > Save </Button>

        </div>
        :
        <div>{get_subission_result()}</div>
      }
    </div>
  )
}

export default AreaForm
