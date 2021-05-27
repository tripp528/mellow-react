import React, { useContext, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { List } from 'antd';

import { FirestoreContext } from 'FirestoreProvider'
import * as utils from 'utils'
import CreateBoulderProblem from 'BoulderProblem/Create'
import BoulderProblemEdit from 'BoulderProblem/Edit'
import ListItem from 'UI/ListItem'
import DeleteButton from 'UI/DeleteButton'
import AreaSelect from 'Area/Select'

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

  const [area_filter, set_area_filter] = useState()

  // get boulder_problems collection
  const [boulder_problems, problems_loading, problems_error] = useCollectionData(db.collection(utils.collections.boulder_problems), {
    idField: 'id',
    refField: 'doc_ref'
  })

  // get boulders filtered by area
  let query = db.collection(utils.collections.boulders)
  if (area_filter) query = query.where('area', '==', area_filter)
  const [boulders, boulders_loading, boulders_error] = useCollectionData(query, {
    idField: 'id',
    refField: 'doc_ref'
  })
  const boulder_ids = boulders && boulders.map(b => b.id) || []

  // filter problems by the boulders that matched area filter
  let filtered_boulder_problems = boulder_problems && [...boulder_problems] || []
  if (area_filter) filtered_boulder_problems = filtered_boulder_problems.filter(prob => boulder_ids.includes(prob.boulder))

  // error handle
  if (problems_error) utils.error_msg(problems_error)
  if (boulders_error) utils.error_msg(boulders_error)

  return (
    <div>
      <CreateBoulderProblem />
      <AreaSelect
        value={area_filter}
        set_value={set_area_filter}
        placeholder="Filter by Area"
      />
      <List
        loading={boulders_loading || problems_loading}
        dataSource={filtered_boulder_problems}
        itemLayout="horizontal"
        renderItem={boulder_problem => <BoulderProblemListItem boulder_problem={boulder_problem} /> }
      />
    </div>
  )
}

export default BoulderProblemList
