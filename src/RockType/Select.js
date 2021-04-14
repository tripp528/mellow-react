import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const RockTypeSelect = ({
  value,
  set_value
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to rock_types collection in firestore
  const [rock_types, loading, error] = useCollectionData(db.collection(utils.collections.rock_types), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = rock_types && rock_types.map(rock_type => ({
    label: rock_type.name,
    value: rock_type.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder="Select RockType"
      />
    </div>
  )
}

export default RockTypeSelect;
