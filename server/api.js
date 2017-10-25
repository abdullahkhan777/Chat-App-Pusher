var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '411519',
  key: 'e2e9213efa7b26524a54',
  secret: 'ffcbb2838ee0fa645ed1',
  cluster: 'ap2',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
