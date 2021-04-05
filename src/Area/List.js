import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateArea from 'Area/Create'
import UpdateArea from 'Area/Update'
import ListItem from 'UI/ListItem'

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
        itemLayout="horizontal"
        renderItem={area => (
          <ListItem
            title={area.name}
            description={"description"}
            other_content={"other content"}
            image_url={area.image_url}
            edit={<UpdateArea area={area} />}
          />
        )}
      />
    </div>
  )
}

export default AreaList
