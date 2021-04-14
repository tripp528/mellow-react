import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const BoulderProblemSelect = ({
  value,
  set_value
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to boulder_problems collection in firestore
  const [boulder_problems, loading, error] = useCollectionData(db.collection(utils.collections.boulder_problems), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = boulder_problems && boulder_problems.map(boulder_problem => ({
    label: boulder_problem.name,
    value: boulder_problem.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder="Select BoulderProblem"
      />
    </div>
  )
}

export default BoulderProblemSelect;
