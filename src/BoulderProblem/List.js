import React, { useContext } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateBoulderProblem from 'BoulderProblem/Create'
import BoulderProblemEdit from 'BoulderProblem/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'

const BoulderProblemListItem = ({ boulder_problem }) => {
  const [images, loading, error] = useCollectionData(boulder_problem.doc_ref.collection('images'))
  if (error) utils.error_msg(error)
  const image_url = images && images.length && images[0] && images[0].url

  const { db } = useContext(FirestoreContext)

  return (
    <ListItem
      title={boulder_problem.name}
      // description={"description"}
      // other_content={"other content"}
      image_url={image_url}
      edit_button={<BoulderProblemEdit boulder_problem={boulder_problem} />}
      delete_button={
        <DeleteButton
          onDelete={() => {
            utils.careful_delete_document(boulder_problem, [
              // collection queries where boulder_problems might be referenced
            ])
          }}
        />
      }
    />
  )
}

const BoulderProblemList = () => {

  const { db } = useContext(FirestoreContext)

  // reference to boulder_problems collection in firestore
  const [boulder_problems, loading, error] = useCollectionData(db.collection(utils.collections.boulder_problems), {
    idField: 'id',
    refField: 'doc_ref'
  })

  if (error) utils.error_msg(error)

  return (
    <div>
      <CreateBoulderProblem />
      <List
        loading={loading}
        dataSource={boulder_problems}
        itemLayout="horizontal"
        renderItem={boulder_problem => <BoulderProblemListItem boulder_problem={boulder_problem} /> }
      />
    </div>
  )
}

export default BoulderProblemList
