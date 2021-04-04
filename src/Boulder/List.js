import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import CreateBoulder from 'Boulder/Create'
import UpdateBoulder from 'Boulder/Update'
import * as utils from 'utils'

const BoulderList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to boulders collection in firestore
  const [boulders, loading, error] = useCollectionData(db.collection(utils.collections.BOULDERS), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateBoulder />
      <List
        loading={loading}
        dataSource={boulders}
        renderItem={boulder => (
          <List.Item>
            {boulder.name} <UpdateBoulder boulder={boulder} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default BoulderList
