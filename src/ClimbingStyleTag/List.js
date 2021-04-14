import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateClimbingStyleTag from 'ClimbingStyleTag/Create'
import ClimbingStyleTagEdit from 'ClimbingStyleTag/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const ClimbingStyleTagListItem = ({ climbing_style_tag }) => {
  const [images, loading, error] = useCollectionData(climbing_style_tag.doc_ref.collection('images'))
  if (error) utils.error_msg(error)
  const image_url = images && images.length && images[0] && images[0].url

  return (
    <ListItem
      title={climbing_style_tag.name}
      description={"description"}
      other_content={"other content"}
      image_url={image_url}
      edit_button={<ClimbingStyleTagEdit climbing_style_tag={climbing_style_tag} />}
      delete_button={<DeleteButton onDelete={() => utils.delete_document_with_image_subcollection(climbing_style_tag)} />}
    />
  )
}

const ClimbingStyleTagList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to climbing_style_tags collection in firestore
  const [climbing_style_tags, loading, error] = useCollectionData(db.collection(utils.collections.climbing_style_tags), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateClimbingStyleTag />
      <List
        loading={loading}
        dataSource={climbing_style_tags}
        itemLayout="horizontal"
        renderItem={climbing_style_tag => <ClimbingStyleTagListItem climbing_style_tag={climbing_style_tag} /> }
      />
    </div>
  )
}

export default ClimbingStyleTagList
