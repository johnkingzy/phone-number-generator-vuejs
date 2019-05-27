// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('div.title')
      .assert.containsText('div.title div:nth-child(2) > strong:first-child', 'Phone')
      .assert.containsText('div.title div:nth-child(2) > strong:nth-child(2)', 'Number')
      .assert.containsText('div.title div:nth-child(2) > strong:nth-child(3)', 'Generator')
      .end()
  }
}
