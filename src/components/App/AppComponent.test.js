import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import webdriver, { By } from 'selenium-webdriver'

import AppComponent from './AppComponent'
import configureStore from '../../store/configureStore.js'

describe('AppComponent', () => {
  let driver

  // eslint-disable-next-line no-return-assign
  beforeAll(() =>
    driver = new webdriver.Builder()
      .forBrowser('firefox')
      .build()
  )

  beforeEach(() =>
    driver.get('http://localhost:3000')
  )

  it('renders without crashing', () => {
    const nameField = driver.findElement(By.css('input[name="name"]'))
    nameField.sendKeys('hello')
    nameField.getAttribute('value').then(value =>
      assert.equal(value, 'hello'))
  })

  afterAll(() => driver.quit())
})
