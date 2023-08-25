import * as React from 'react'
import ReactDOM from 'react-dom/client'

import { worker } from './mocks/api'

import App from './App'

worker.start()

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <div style={{ padding: '16px' }}>
    <App />
  </div>,
)
