import React, { useState, useContext, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/app'
import { Input, InputNumber, Button, Divider, Result } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import ImageUpload from 'UI/ImageUpload'
import AreaSelect from 'Area/Select'
import RockTypeSelect from 'RockType/Select'
import AccessTagsSelect from 'AccessTag/Select'

const { TextArea } = Input;


const BoulderForm = ({
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

  const submit_boulder = (new_boulder) => {
    const data = { ...new_boulder }
    delete data.id
    delete data.doc_ref
    new_boulder.doc_ref.set(data)
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

          <Divider/>

          {/* area */}
          Area
          <AreaSelect
            value={form_vals.area}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.area = val
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* rock_type */}
          Rock Type
          <RockTypeSelect
            value={form_vals.rock_type}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.rock_type = val
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* access_tags */}
          Access Tags
          <AccessTagsSelect
            value={form_vals.access_tags}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.access_tags = val
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* latitude */}
          <p>Location (be as accurate as possible!)</p>
          <InputNumber
            min="-90"
            max="90"
            stringMode // for high precision
            value={form_vals.location.latitude}
            placeholder="Latitude"
            onChange={(latitude) => {
              const new_form_vals = {...form_vals}
              new_form_vals.location = new firebase.firestore.GeoPoint(latitude, new_form_vals.location.longitude)
              set_form_vals(new_form_vals)
            }}
          />
          {/* longitude */}
          <InputNumber
            min="-180"
            max="180"
            stringMode // for high precision
            value={form_vals.location.longitude}
            placeholder="Longitude"
            onChange={(longitude) => {
              const new_form_vals = {...form_vals}
              new_form_vals.location = new firebase.firestore.GeoPoint(new_form_vals.location.latitude, longitude)
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

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

          <Divider/>

          {/* images */}
          Images
          <ImageUpload
            images_ref={images_ref}
            images={images}
          />

          <Divider/>
          <Button
            type="primary"
            onClick={() => {
              submit_boulder(form_vals)
            }}
          > Save </Button>

        </div>
        :
        <div>{get_subission_result()}</div>
      }
    </div>
  )
}

export default BoulderForm
