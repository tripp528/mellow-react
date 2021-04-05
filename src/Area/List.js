import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateArea from 'Area/Create'
import UpdateArea from 'Area/Update'

const AreaList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to areas collection in firestore
  const [areas, loading, error] = useCollectionData(db.collection(utils.collections.AREAS), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateArea />
      <List
        loading={loading}
        dataSource={areas}
        renderItem={area => (
          <List.Item>
            {area.name}
            <img src={area.image_url} />
            <UpdateArea area={area} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default AreaList
