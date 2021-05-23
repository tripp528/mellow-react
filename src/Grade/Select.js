import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const GradeSelect = ({
  value,
  set_value,
  type,
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to grades collection in firestore
  const [grades, loading, error] = useCollectionData(db.collection(utils.collections.grades), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  // filter by type
  let filtered_grades = grades && [...grades] || []
  if (type && type.toUpperCase() === 'US') {
    filtered_grades = filtered_grades.filter(grade => grade.type === 'US')
  }
  if (type && type.toUpperCase() === 'EU') {
    filtered_grades = filtered_grades.filter(grade => grade.type === 'EU')
  }
  console.log(filtered_grades)

  let options = filtered_grades.map(grade => ({
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
        allowClear
      />
    </div>
  )
}

export default GradeSelect;
