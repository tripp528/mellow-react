import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Select } from 'antd'
import * as utils from 'utils'

import { FirestoreContext } from 'FirestoreProvider'

const ClimbingStyleTagsSelect = ({
  value,
  set_value
}) => {

  const { db } = useContext(FirestoreContext)
  // reference to climbing_style_tags collection in firestore
  const [climbing_style_tags, loading, error] = useCollectionData(db.collection(utils.collections.climbing_style_tags), {
    idField: 'id',
    refField: 'doc_ref'
  })
  if (error) utils.error_msg(error)

  const options = climbing_style_tags && climbing_style_tags.map(climbing_style_tag => ({
    label: climbing_style_tag.name,
    value: climbing_style_tag.id
  }))

  return (
    <div>
      <Select
        value={value}
        onChange={set_value}
        options={options}
        style={{ width: '100%' }}
        placeholder="Select Climbing Style Tags"
        mode="multiple"
        defaultValue={[]}
        allowClear
      />
    </div>
  )
}

export default ClimbingStyleTagsSelect
