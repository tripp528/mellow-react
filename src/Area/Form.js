import React, { useState, useContext } from 'react'
import firebase from 'firebase/app'
import { Input, InputNumber, Button, Divider, Result } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'


const AreaForm = ({
  form_vals,
  set_form_vals
}) => {

  const { db } = useContext(FirestoreContext)
  const [submit_success, set_submit_success] = useState(false)
  const [submit_error, set_submit_error] = useState(false)

  const submit_area = (new_area) => {
    const data = {
      name: new_area.name,
    }
    const add_or_update = () => {
      console.log(new_area)
      if (new_area.doc_ref) return new_area.doc_ref.set(data)
      else return db.collection(utils.collections.AREAS).add(data)
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

          <Divider/>
          <Button
            type="primary"
            onClick={() => {
              submit_area(form_vals)
            }}
          > Submit </Button>

        </div>
        :
        <div>{get_result()}</div>
      }
    </div>
  )
}

export default AreaForm
