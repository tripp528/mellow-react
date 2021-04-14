import React from 'react'
import { List, Skeleton, Avatar } from 'antd';

const ListItem = ({
  title,
  description,
  other_content,
  image_url,
  edit_button,
  delete_button,
}) => {
  return (
    <List.Item
      actions={[edit_button, delete_button]}
    >
      <Skeleton avatar title={false} loading={false} active>
        <List.Item.Meta
          avatar={
            image_url ? <Avatar src={image_url} /> : null
          }
          title={title}
          description={description}
        />
        <div>{other_content}</div>
      </Skeleton>
    </List.Item>
  )
}


export default ListItem
