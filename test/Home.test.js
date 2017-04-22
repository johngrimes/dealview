import webdriver, { until, By, Key } from 'selenium-webdriver'

import { hostName } from './config.js'

describe('Create real estate asset flow', () => {
  let driver

  const testRealEstate = {
    name: '5 Sunrise St',
    address: {
      line1: '5 Sunrise St',
      locality: 'Ashgrove'
    },
    notes: 'Principal place of residence',
    valuations: [
      { date: '2014-08-23', amount: '520000', note: 'Purchase price' }
    ]
  }

  beforeAll(() => {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()
    return driver.navigate().to(`${hostName}/`)
  })

  it('navigates to Portfolio', () => {
    driver.findElement(By.linkText('Portfolio')).click()
    return driver.wait(until.urlIs(`${hostName}/portfolio`))
  })

  it('navigates to Assets', () => {
    driver.findElement(By.linkText('Assets')).click()
    return driver.wait(until.urlIs(`${hostName}/portfolio/assets`))
  })

  it('navigates to New Asset', () => {
    driver.findElement(By.linkText('New Asset')).click()
    return driver.wait(until.urlIs(`${hostName}/portfolio/assets/new`))
  })

  it('navigates to New Real Estate', () => {
    driver.findElement(By.linkText('New Real Estate')).click()
    return driver.wait(until.urlIs(`${hostName}/portfolio/assets/real-estate/new`))
  })

  it('fills out the form', () => {
    driver.findElement(By.name('name')).sendKeys(testRealEstate.name)
    driver.findElement(By.name('address-line1')).sendKeys(testRealEstate.address.line1)
    driver.findElement(By.name('address-locality')).sendKeys(testRealEstate.address.locality)
    driver.findElement(By.name('notes')).sendKeys(testRealEstate.notes)
    driver.findElement(By.css('.add-valuation-button')).click()

    driver.findElement(By.css('input[name^="valuations-date-"]')).sendKeys(Key.chord(Key.COMMAND, 'a'), testRealEstate.valuations[0].date)
    debugger
    driver.findElement(By.css('input[name^="valuations-amount-"]')).sendKeys(testRealEstate.valuations[0].amount)
    driver.findElement(By.css('input[name^="valuations-note-"]')).sendKeys(testRealEstate.valuations[0].note)
    return driver.findElement(By.css('button[type="submit"]')).click()
  })

  it('shows the new asset in the Assets view', () => {
    driver.findElement(By.linkText('Assets')).click()
    driver.wait(until.urlIs(`${hostName}/portfolio/assets`))
    driver.findElement(By.linkText(testRealEstate.name)).click()
    driver.wait(until.urlMatches(new RegExp(`\/portfolio\/assets\/real-estate\/\\d+`)))
    driver.findElement(By.name('name'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.name)))
    driver.findElement(By.name('address-line1'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.address.line1)))
    driver.findElement(By.name('address-locality'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.address.locality)))
    driver.findElement(By.name('notes'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.notes)))
    driver.findElement(By.css('input[name^="valuations-date-"]'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.valuations[0].date)))
    driver.findElement(By.css('input[name^="valuations-amount-"]'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.valuations[0].amount)))
    return driver.findElement(By.css('input[name^="valuations-note-"]'))
      .then(field => field.getAttribute('value')
      .then(value => expect(value).toBe(testRealEstate.valuations[0].note)))
  })

  afterAll(() => driver.quit())
})
