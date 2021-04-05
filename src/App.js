import React from 'react'
import MainTabs from 'MainTabs'
import { FirestoreProvider } from 'FirestoreProvider'
import 'antd/dist/antd.css'

import { Row, Col } from 'antd'

// https://github.com/esetnik/customize-cra-react-refresh

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        <FirestoreProvider>
          <Col sm={{span: 18, offset: 3}}>
            <MainTabs />
          </Col>
        </FirestoreProvider>
      </section>
    </div>
  )
}


export default App
