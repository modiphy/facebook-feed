# Modiphy Facebook Feed
### simple example
```html
<div id="modiphy-facebook-feed">
  <a
    data-fb-feed="fb-feed-item"
  >
    <div>
      <img
        alt=""
        loading="lazy"
        data-fb-feed="fb-feed-img"
        src="https://via.placeholder.com/1600x900"
      >
    </div>
      <div>
        <div>
          <div>
            <p data-fb-feed="fb-feed-date">2 days ago</p>
          </div>
          <p data-fb-feed="fb-feed-body">The ladies have been working hard this week! Everyone seems
            to be getting ready for the holidays 🎃 🎃 🎃 if you'd like a free quote feel free to
            give us a call at 225-287-4761</p>
        </div>
      </div>
  </a>

  ... more items
</div>

<script src="https://cdn.jsdelivr.net/npm/@modiphy/facebook-feed@latest/dist/index.js"></script>
<script>
  addFacebookFeed({
    pageId: 'tomaracleans',
    token: 'EAAS8LGISx9wBAGZAni1Di5rVosXLaleBDH3YELURLS7giL9YfZCKaXlRElw5ufJlT9LaELZBwbTRHuf0cKj8wyAPIrs9g98ZCa7HrmZB2r6Ghq9XgyfiJWOdpHnb56hPctTq3t51VDpBv84I3oN3HxxkLXTohpbSHK73BCQItmBCH2WZAgUbpO'
  })
</script>
