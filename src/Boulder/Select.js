import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const BoulderSelect = ({
  value,
  set_value
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to boulders collection in firestore
  const [boulders, loading, error] = useCollectionData(db.collection(utils.collections.boulders), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = boulders && boulders.map(boulder => ({
    label: boulder.name,
    value: boulder.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder="Select Boulder"
      />
    </div>
  )
}

export default BoulderSelect;
