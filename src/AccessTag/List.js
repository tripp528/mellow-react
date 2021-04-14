import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateAccessTag from 'AccessTag/Create'
import AccessTagEdit from 'AccessTag/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const AccessTagListItem = ({ access_tag }) => {
  // const [images, loading, error] = useCollectionData(access_tag.doc_ref.collection('images'))
  // if (error) utils.error_msg(error)
  // const image_url = images && images.length && images[0] && images[0].url

  return (
    <ListItem
      title={access_tag.name}
      // description={"description"}
      // other_content={"other content"}
      // image_url={image_url}
      edit_button={<AccessTagEdit access_tag={access_tag} />}
      delete_button={<DeleteButton onDelete={() => utils.delete_document_with_image_subcollection(access_tag)} />}
    />
  )
}

const AccessTagList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to access_tags collection in firestore
  const [access_tags, loading, error] = useCollectionData(db.collection(utils.collections.access_tags), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateAccessTag />
      <List
        loading={loading}
        dataSource={access_tags}
        itemLayout="horizontal"
        renderItem={access_tag => <AccessTagListItem access_tag={access_tag} /> }
      />
    </div>
  )
}

export default AccessTagList
