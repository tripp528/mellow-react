import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateArea from 'Area/Create'
import UpdateArea from 'Area/Update'
import ListItem from 'UI/ListItem'

const AreaListItem = ({ area }) => {
  const [images, loading, error] = useCollectionData(area.doc_ref.collection('images'))
  if (error) utils.error_msg(error)
  const image_url = images && images.length && images[0] && images[0].url

  return (
    <ListItem
      title={area.name}
      description={"description"}
      other_content={"other content"}
      image_url={image_url}
      edit={<UpdateArea area={area} />}
    />
  )
}

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
        renderItem={area => <AreaListItem area={area} /> }
      />
    </div>
  )
}

export default AreaList
