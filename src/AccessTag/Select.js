import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const AccessTagSelect = ({
  value,
  set_value
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to access_tags collection in firestore
  const [access_tags, loading, error] = useCollectionData(db.collection(utils.collections.access_tags), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = access_tags && access_tags.map(access_tag => ({
    label: access_tag.name,
    value: access_tag.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder="Select AccessTag"
      />
    </div>
  )
}

export default AccessTagSelect;
