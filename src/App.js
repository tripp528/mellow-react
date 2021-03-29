import React from 'react'
import MainTabs from 'MainTabs'
import { FirestoreProvider } from 'FirestoreProvider'

// https://github.com/esetnik/customize-cra-react-refresh

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        <FirestoreProvider>
          <MainTabs />
        </FirestoreProvider>
      </section>
    </div>
  )
}


export default App
