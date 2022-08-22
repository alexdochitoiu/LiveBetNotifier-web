self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('* New notification', data)
  const options = {
    body: data.body,
    icon: 'favicon.ico',
    actions: [{
      title: "Go To Flashscore",
      action: data.url
    }]
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})

self.addEventListener('notificationclick', event => {
  clients.openWindow(event.notification.actions[0].action);
}, false)