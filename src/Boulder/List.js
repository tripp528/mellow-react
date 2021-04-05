import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import CreateBoulder from 'Boulder/Create'
import UpdateBoulder from 'Boulder/Update'
import * as utils from 'utils'
import ListItem from 'UI/ListItem'

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
          <ListItem
            title={boulder.name}
            description={"description"}
            other_content={"other content"}
            image_url={boulder.image_url}
            edit={<UpdateBoulder boulder={boulder} />}
          />
        )}
      />
    </div>
  )
}

export default BoulderList
