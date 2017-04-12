var CLIENT_ID = '1093586273789-0bmoesgp8ca8rqdilmtj0a7ji44grks5.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}
function updateSigninStatus(isSignedIn) {
  var cbutton = $('#google-calendar-button');
  cbutton.off('click');
  if (isSignedIn) {
    cbutton.click(function(){
      // console.log('signed in!');
      var request = gapi.client.calendar.events.insert({calendarId: 'primary', 'resource': event});
      request.execute(function(event) {
        $('._calendar.modal .button.next').attr('href', event.htmlLink);
        $('._calendar.modal').modal('show');
      });
    });
  } else {
    cbutton.click(function(){
      gapi.auth2.getAuthInstance().signIn();
    });
  }
}
// /**
//  *  Sign in the user upon button click.
//  */
// function handleAuthClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }
// /**
//  *  Sign out the user upon button click.
//  */
// function handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }
// $(document).ready(function(){
//       var start = new Date(2017,12,12,3,24,0);
//       var end = new Date(2017,12,12,4,24,0);
//       var event = {
//         'summary': 'Google I/O 2015',
//         'start':{'dateTime': start},
//         'end':{'dateTime': end}
//       };
//       console.log(event);
//       var request = gapi.client.calendar.events.insert({calendarId: 'primary', 'resource': event});
//       request.execute(function(event) {
//         appendPre('Event created: ' + event.htmlLink);
//       });
//     });
// }