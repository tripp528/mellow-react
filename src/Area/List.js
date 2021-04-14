import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateArea from 'Area/Create'
import AreaEdit from 'Area/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const AreaListItem = ({ area }) => {
  const [images, loading, error] = useCollectionData(area.doc_ref.collection('images'))
  if (error) utils.error_msg(error)
  const image_url = images && images.length && images[0] && images[0].url

  const { db } = useContext(FirestoreContext)

  return (
    <ListItem
      title={area.name}
      // description={"description"}
      // other_content={"other content"}
      image_url={image_url}
      edit_button={<AreaEdit area={area} />}
      delete_button={<DeleteButton onDelete={async () => {
        try {
          // make sure there are no references to this area
          const querySnapshot = await db.collection(utils.collections.boulders).where("area", "==", area.id).get()
          const boulder_names_using_area = querySnapshot.docs.map(x => x.data().name)

          if (boulder_names_using_area.length > 0) {
            // references - can't delete
            utils.error_msg("This area still has boulders. Please delete them or switch the area they belong to: ", boulder_names_using_area)

          } else {
            // no references - can delete
            utils.delete_document_with_image_subcollection(area)
          }
        } catch(err) {
          // error getting boulders
          utils.error_msg(err)
        }

      }} />}
    />
  )
}

const AreaList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to areas collection in firestore
  const [areas, loading, error] = useCollectionData(db.collection(utils.collections.areas), {
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
