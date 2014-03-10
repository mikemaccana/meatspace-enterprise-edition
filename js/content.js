
var log = console.log.bind(console);

var watchText = 'bro';

log('Loading page', Date());

var contains = function(array, item){
  return ( array.indexOf(item) !== -1 )
}

window.addEventListener('load', function () {
  log('Adding button')
  var button = document.createElement('button');
  button.classList.add('notification')
  button.textContent = 'Turn on notifications'
  document.querySelector('.header').appendChild(button)

  // Query selector
  document.querySelector('button.notification').addEventListener('click', function () {

    var showNotification = function() {
      log('Looking for "'+watchText+'"');
      var observer = new MutationSummary({
        callback: function(summaries){
          // Only 1 query, so only one summary.
          log('summary', summaries[0])
          summaries[0].added.forEach(function(addedElement){
            //if ( contains(addedElement.innerText, watchText) ) {
              new Notification("Meatspace update",  {
                icon: addedElement.querySelector('img').src,
                tag: 'note',
                body: addedElement.querySelector('p').innerText
              });
            //}
          })
        },
        queries: [{ element: 'li' }]
      });



    }

    // If notifications are already granted show the notification
    if ( window.Notification && window.Notification.permission === "granted" ) {
      showNotification();
    }

    // If they are not denied (i.e. default)
    else if ( window.Notification && window.Notification.permission !== "denied") {

      // Request permission
      Notification.requestPermission(function (status) {

        // Update permission based on user's decision
        if ( window.Notification.permission !== status) {
          window.Notification.permission = status;
        }

        // If it's granted show the notification
        if (status === "granted") {
          showNotification();
        }

        else {
          log('Fallback note')
        }

      });

    }

    else {
      fallbackNote();
    }

  });

})



