import React, { useContext, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List, Row, Col } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateBoulder from 'Boulder/Create'
import BoulderEdit from 'Boulder/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'
import AreaSelect from 'Area/Select'

const BoulderListItem = ({ boulder }) => {
  const [images, loading, error] = useCollectionData(boulder.doc_ref.collection('images'))
  if (error) utils.error_msg(error)
  const image_url = images && images.length && images[0] && images[0].url

  const { db } = useContext(FirestoreContext)

  return (
    <ListItem
      title={boulder.name}
      // description={"description"}
      // other_content={"other content"}
      image_url={image_url}
      edit_button={<BoulderEdit boulder={boulder} />}
      delete_button={
        <DeleteButton
          onDelete={() => {
            utils.careful_delete_document(boulder, [
              db.collection(utils.collections.boulder_problems).where('boulder', "==", boulder.id),
            ])
          }}
        />
      }
    />
  )
}

const BoulderList = () => {

  const { db } = useContext(FirestoreContext)

  const [area_filter, set_area_filter] = useState()

  // reference to boulders collection in firestore
  let query = db.collection(utils.collections.boulders)

  // filter based on area
  if (area_filter) query = query.where('area', '==', area_filter)

  const [boulders, loading, error] = useCollectionData(query, {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateBoulder />
      <AreaSelect
        value={area_filter}
        set_value={set_area_filter}
        placeholder="Filter by Area"
      />
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
