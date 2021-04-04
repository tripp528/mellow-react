import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import { Input, InputNumber, Button, Divider, Result } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import AreaSelect from 'Area/Select'

const BoulderForm = ({
  form_vals,
  set_form_vals
}) => {

  const { db } = useContext(FirestoreContext)

  const [submit_success, set_submit_success] = useState(false)
  const [submit_error, set_submit_error] = useState(false)

  const submit_boulder = (new_boulder) => {
    const data = {
      name: new_boulder.name,
      location: new_boulder.location,
      area: new_boulder.area
    }
    const add_or_update = () => {
      if (new_boulder.doc_ref) return new_boulder.doc_ref.set(data)
      else return db.collection(utils.collections.BOULDERS).add(data)
    }
    add_or_update()
    .then((docRef) => {
      set_submit_success(true)
    })
    .catch((error) => {
      set_submit_error(true)
    })
  }

  const get_result = () => {
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
          <Input
            value={form_vals.name}
            placeholder="Name"
            onChange={(e) => {
              const new_form_vals = {...form_vals}
              new_form_vals.name = e.target.value
              set_form_vals(new_form_vals)
            }}
          />

          <AreaSelect
            value={form_vals.area}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.area = val
              set_form_vals(new_form_vals)
            }}
          />

          {/* latitude */}
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
          <Button
            type="primary"
            onClick={() => {
              submit_boulder(form_vals)
            }}
          > Submit </Button>

        </div>
        :
        <div>{get_result()}</div>
      }
    </div>
  )
}

export default BoulderForm
