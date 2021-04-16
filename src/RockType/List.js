import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateRockType from 'RockType/Create'
import RockTypeEdit from 'RockType/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const RockTypeListItem = ({ rock_type }) => {
  // const [images, loading, error] = useCollectionData(rock_type.doc_ref.collection('images'))
  // if (error) utils.error_msg(error)
  // const image_url = images && images.length && images[0] && images[0].url

  const { db } = useContext(FirestoreContext)

  return (
    <ListItem
      title={rock_type.name}
      // description={"description"}
      // other_content={"other content"}
      // image_url={image_url}
      edit_button={<RockTypeEdit rock_type={rock_type} />}
      // delete_button={<DeleteButton onDelete={() => utils.delete_document_with_image_subcollection(rock_type)} />}
      delete_button={
        <DeleteButton
          onDelete={() => {
            utils.careful_delete_document(rock_type, [
              db.collection(utils.collections.boulders).where('rock_type', "==", rock_type.id),
            ])
          }}
        />
      }
    />
  )
}

const RockTypeList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to rock_types collection in firestore
  const [rock_types, loading, error] = useCollectionData(db.collection(utils.collections.rock_types), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateRockType />
      <List
        loading={loading}
        dataSource={rock_types}
        itemLayout="horizontal"
        renderItem={rock_type => <RockTypeListItem rock_type={rock_type} /> }
      />
    </div>
  )
}

export default RockTypeList
