import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List, Typography, Divider } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import CreateBoulder from 'CreateBoulder'

const BoulderList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to boulders collection in firestore
  const boulders_ref = db.collection('boulders')
  const [boulders] = useCollectionData(boulders_ref, {
    idField: 'id',
    refField: 'doc_ref'
  })

  return (
    <div>
      <CreateBoulder />

      <List
        dataSource={boulders}
        renderItem={boulder => (
          <List.Item>
            {boulder.name}
          </List.Item>
        )}
      />
    </div>
  )
}

export default BoulderList
