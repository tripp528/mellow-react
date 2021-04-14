import React from 'react'
import { Image, Card } from 'antd'

import DeleteButton from 'UI/DeleteButton'

import * as utils from 'utils'

const UploadedImage = ({
  image_document // a document from firestore with 'id', 'doc_ref', and 'url'
}) => {

  return (
    <div>
      <Card
        style={{ width: 200 }}
        bodyStyle={{ padding: 0 }}
        headStyle={{ padding: 0 }}
        cover={
          <Image
            width={"100%"}
            src={image_document.url}
          />
        }
        actions={[
          <DeleteButton
            onDelete={() => {
              utils.delete_document_with_storage_url(image_document, () => {
                // after document is deleted successfully
                console.log('image deleted from storage and firestore')
              })
            }}
          />
        ]}
      >

      </Card>
    </div>
  )
}


export default UploadedImage
