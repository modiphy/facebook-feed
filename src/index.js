import FacebookFeed from './core/facebook-feed.js'

window.addFacebookFeed = function (selector, options) {
  const facebookFeed = new FacebookFeed(selector, options)
}
