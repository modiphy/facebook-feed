import defaults from './defaults'
import { mergeOptions, getRelativeTimeString } from './utils'
import axios from 'axios'

export default class FacebookFeed {
  /**
   * Construct copyright.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  constructor(selector, options = {}) {
    this.selector = selector
    this.settings = mergeOptions(defaults, options)
    this.container = document.querySelector(this.selector)
    this.items = document.querySelectorAll('[data-fb-feed="fb-feed-item"]')

    // hide items while loading data using Facebook Open Graph API
    // this.hideItems()
    this.loadItems()
  }

  get requestString() {
    return `https://graph.facebook.com/${this.settings.pageId}/posts?fields=permalink_url,attachments,created_time,message&limit=${this.numberOfItems}&access_token=${this.settings.token}`
  }

  get numberOfItems() {
    return this.items.length
  }

  hideItems() {
    this.items.forEach((item) => (item.style.display = 'none'))
  }

  loadItems() {
    axios
      .get(this.requestString)
      .then((response) => {
        this.initFacebookFeed(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
      })
  }

  initFacebookFeed(data) {
    data.forEach((itemData, index) => this.addItem(itemData, index))
  }

  addItem(itemData, index) {
    const item = this.items[index]
    const image = item.querySelector('[data-fb-feed="fb-feed-img"]')
    const date = item.querySelector('[data-fb-feed="fb-feed-date"]')
    const body = item.querySelector('[data-fb-feed="fb-feed-body"]')

    item.href = itemData.permalink_url

    image.src = this.getImageSrc(itemData)
    image.srcset = ''
    date.innerHTML = this.getFormattedDate(itemData.created_time)
    body.innerHTML = this.getMessage(itemData)

    item.style.display = this.settings.itemDisplayStyle
  }

  getMessage(itemData) {
    if (itemData.message) {
      return itemData.message
    } else if (itemData.description) {
      return itemData.description
    } else if (itemData.attachments) {
      if (itemData.attachments.description) {
        return itemData.attachments.description
      } else if (itemData.attachments.title) {
        return itemData.attachments.title
      }
    }

    return ''
  }

  getImageSrc(itemData) {
    if (itemData.attachments) {
      const attachments = itemData.attachments.data[0]
      if (attachments.media) {
        return attachments.media.image.src
      }
      if (attachements.subattachments) {
        return attachments.subattachments.data[0].media.image.src
      }
    }

    return ''
  }

  getFormattedDate(date) {
    // need to convert fb date format to readable js date format
    return getRelativeTimeString(new Date(date))
  }
}
