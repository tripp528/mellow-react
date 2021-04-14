import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const GradeSelect = ({
  value,
  set_value
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to grades collection in firestore
  const [grades, loading, error] = useCollectionData(db.collection(utils.collections.grades), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = grades && grades.map(grade => ({
    label: grade.name,
    value: grade.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder="Select Grade"
      />
    </div>
  )
}

export default GradeSelect;
