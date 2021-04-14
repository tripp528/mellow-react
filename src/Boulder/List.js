import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateBoulder from 'Boulder/Create'
import BoulderEdit from 'Boulder/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const BoulderListItem = ({ boulder }) => {
  const [images, loading, error] = useCollectionData(boulder.doc_ref.collection('images'))
  if (error) utils.error_msg(error)
  const image_url = images && images.length && images[0] && images[0].url

  return (
    <ListItem
      title={boulder.name}
      description={"description"}
      other_content={"other content"}
      image_url={image_url}
      edit_button={<BoulderEdit boulder={boulder} />}
      delete_button={<DeleteButton onDelete={() => utils.delete_document_with_image_subcollection(boulder)} />}
    />
  )
}

const BoulderList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to boulders collection in firestore
  const [boulders, loading, error] = useCollectionData(db.collection(utils.collections.boulders), {
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
        itemLayout="horizontal"
        renderItem={boulder => <BoulderListItem boulder={boulder} /> }
      />
    </div>
  )
}

export default BoulderList
