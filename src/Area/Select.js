import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const AreaSelect = ({
  value,
  set_value,
  placeholder="Select Area",
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to areas collection in firestore
  const [areas, loading, error] = useCollectionData(db.collection(utils.collections.areas), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = areas && areas.map(area => ({
    label: area.name,
    value: area.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder={placeholder}
        allowClear
      />
    </div>
  )
}

export default AreaSelect
