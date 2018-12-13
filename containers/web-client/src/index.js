import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './app'

import 'normalize.css'
import 'element-theme-default'
import './style.css'

const rootElement = document.getElementById('root')
render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), rootElement)
