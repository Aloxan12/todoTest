import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'mobx-react'
import Stores from './store/TodoStore/TodoStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider {...Stores}>
            <App />
      </Provider>
  </React.StrictMode>,
)
