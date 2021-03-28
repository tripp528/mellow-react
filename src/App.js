import React from 'react'
import BoulderList from './BoulderList'
import { FirestoreProvider } from './FirestoreProvider'

// https://github.com/esetnik/customize-cra-react-refresh

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        <FirestoreProvider>
          <BoulderList />
        </FirestoreProvider>
      </section>
    </div>
  )
}


export default App
