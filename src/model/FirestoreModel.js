import firebase from 'firebase/app'
import 'firebase/firestore'
import firebase_config from './firebase_config'

let firebase_app

// initialize firebase app if not yet
if (!firebase.apps.length) {
  firebase_app = firebase.initializeApp(firebase_config)
} else {
  firebase_app = firebase.app()
}

export const TopLevelCollections = {
  BOULDERS: 'boulders',
}

export class FireObject {
  constructor({id, doc_ref}) {
    this.id = id
    this.doc_ref = doc_ref
  }
}

export default class FirestoreModel {
  constructor() {
    this.store = firebase.firestore()
  }
}
