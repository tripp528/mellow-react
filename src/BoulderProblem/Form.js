import React, { useState, useContext, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/app'
import { Input, InputNumber, Button, Divider, Result, Rate } from 'antd'

import * as utils from 'utils'
import { FirestoreContext } from 'FirestoreProvider'
import ImageUpload from 'UI/ImageUpload'
import BoulderSelect from 'Boulder/Select'
import GradeSelect from 'Grade/Select'
import ClimbingStyleTagsSelect from 'ClimbingStyleTag/Select'

const { TextArea } = Input;


const BoulderProblemForm = ({
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

  const submit_boulder_problem = (new_boulder_problem) => {
    const data = { ...new_boulder_problem }
    delete data.id
    delete data.doc_ref
    new_boulder_problem.doc_ref.set(data)
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

          {/* boulder */}
          Boulder
          <BoulderSelect
            value={form_vals.boulder}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.boulder = val
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* us_grade */}
          US Grade
          <GradeSelect
            type={'US'}
            value={form_vals.us_grade}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.us_grade = val
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* eu_grade */}
          EU Grade
          <GradeSelect
            type={'EU'}
            value={form_vals.eu_grade}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              if (val) new_form_vals.eu_grade = val
              else new_form_vals.eu_grade = null
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* temp  */}
          Grade
          <GradeSelect
            value={form_vals.grade}
            set_value={(val) => {
              // const new_form_vals = {...form_vals}
              // new_form_vals.grade = val
              // set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* climbing_style_tags */}
          Climbing Style Tags
          <ClimbingStyleTagsSelect
            value={form_vals.climbing_style_tags}
            set_value={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.climbing_style_tags = val
              set_form_vals(new_form_vals)
            }}
          />

          <Divider/>

          {/* rating */}
          <p>Rating </p>
          <Rate
            count={5}
            value={form_vals.rating}
            onChange={(val) => {
              const new_form_vals = {...form_vals}
              new_form_vals.rating = val
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

          {/* first_ascent */}
          First Ascent
          <Input
            value={form_vals.first_ascent}
            placeholder="First Ascent"
            onChange={(e) => {
              const new_form_vals = {...form_vals}
              new_form_vals.first_ascent = e.target.value
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
              submit_boulder_problem(form_vals)
            }}
          > Save </Button>

        </div>
        :
        <div>{get_subission_result()}</div>
      }
    </div>
  )
}

export default BoulderProblemForm
