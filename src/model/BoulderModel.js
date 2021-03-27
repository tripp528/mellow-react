import FirestoreModel, { TopLevelCollections, FireObject } from './FirestoreModel'


export class BoulderObject extends FireObject {
  constructor({name, location, ...rest_props}) {
    super(rest_props)
    this.name = name
    this.location = location
  }
}
// const boulder = new BoulderObject('asdf', 'asdfdsafd', "32", 44)
// console.log(boulder)

export class BoulderModel extends FirestoreModel {
  get collection() {
    return TopLevelCollections.BOULDERS;
  }

  async subscribe_all_boulders() {
    // const boulders = []
    return new Promise((resolve, reject) => {
      this.store.collection(this.collection).onSnapshot(snapshot => {
        const boulders = snapshot.docs.map(doc => {
          return new BoulderObject({
            ...doc.data(),
            id: doc.id,
            doc_ref: doc.ref
          })
        })
        resolve(boulders)
      }, reject)
    })
  }
}
