import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateGrade from 'Grade/Create'
import GradeEdit from 'Grade/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const GradeListItem = ({ grade }) => {
  // const [images, loading, error] = useCollectionData(grade.doc_ref.collection('images'))
  // if (error) utils.error_msg(error)
  // const image_url = images && images.length && images[0] && images[0].url

  const { db } = useContext(FirestoreContext)

  return (
    <ListItem
      title={grade.name}
      description={grade.type}
      // other_content={"other content"}
      // image_url={image_url}
      edit_button={<GradeEdit grade={grade} />}
      // delete_button={<DeleteButton onDelete={() => utils.delete_document_with_image_subcollection(grade)} />}
      delete_button={
        <DeleteButton
          onDelete={() => {
            utils.careful_delete_document(grade, [
              db.collection(utils.collections.boulder_problems).where('grade', "==", grade.id),
            ])
          }}
        />
      }
    />
  )
}

const GradeList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to grades collection in firestore
  const [grades, loading, error] = useCollectionData(db.collection(utils.collections.grades), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateGrade />
      <List
        loading={loading}
        dataSource={grades}
        itemLayout="horizontal"
        renderItem={grade => <GradeListItem grade={grade} /> }
      />
    </div>
  )
}

export default GradeList
