import firebase from 'firebase/app'
import 'firebase/storage'


export const error_msg = (...args) => {
  console.error(...args)
  alert(args)
}


export const collections = {
  boulders: 'boulders',
  areas: 'areas',
  boulder_problems: 'boulder_problems',
  climbing_style_tags: 'climbing_style_tags',
  grades: 'grades',
  rock_types: 'rock_types',
  access_tags: 'access_tags',
}


export const is_valid_image = file => {
  // check if a file is jpg or png and less than 2mb
  const less_2mb = file.size / 1024 / 1024 < 2
  const jpg_or_png = file.type === 'image/jpeg' || file.type === 'image/png'

  return less_2mb && jpg_or_png
}


export const uuid = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}


export const get_unique_file_name = local_file_name => {
  // Get a unique file name with the proper extension
  const extension = local_file_name.split('.').pop()
  return uuid() + '.' + extension
}


export const delete_storage_file_from_url = (download_url, on_success) => {
  // Delete a file in storage using it's download url
  const file_ref = firebase.storage().refFromURL(download_url)
  file_ref.delete()
  .then(() => {
    on_success && on_success()
  })
  .catch(err => error_msg(err))
}


// TODO: refactor these functions to return promises, and do promises.all
export const delete_document_with_storage_url = (doc_obj, on_success) => {
  // Delete a document containing a download url. First delete the
    // storage file that it has linked, then delete the document.
  const download_url = doc_obj.url
  delete_storage_file_from_url(download_url, () => {
    doc_obj.doc_ref.delete()
    .then(() => {
      on_success && on_success()
    })
    .catch(err => error_msg(err))
  })
}


export const delete_collection_of_documents_with_storage_urls = (collection_ref, on_success) => {
  // delete a collection containing documents that represent files in firebase storage.
    // first delete the files from storage, then delete the documents
  collection_ref.get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const doc_obj = {
        ...doc.data(),
        doc_ref: doc.ref,
        id: doc.id
      }
      delete_document_with_storage_url(doc_obj, on_success)
    })
  })
  .catch(err => error_msg(err))
}


export const maybe_delete_image_subcollection = (doc_ref, on_success) => {
  // Given a document with an 'images' subcollection, delete all of the images
    // in storage, then delete all of the documents, and in turn the subcollection
  doc_ref.get()
  .then(doc_ref => {
    if (!doc_ref.exists) {
      delete_collection_of_documents_with_storage_urls(doc_ref.ref.collection('images'), on_success)
    }
  })
  .catch(err => error_msg(err))
}


export const delete_document_with_image_subcollection = (doc, on_success) => {

  // TODO: prevent delete if reference exists....
    // get all documents in all collections with id == doc.id ?

  // delete images subcollection
  maybe_delete_image_subcollection(doc.doc_ref)

  // delete the doc
  doc.doc_ref.delete()
  .then(() => {
    on_success && on_success()
  })
  .catch(err => error_msg(err))
}
