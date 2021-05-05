(function() {
  let birthdaySelector = document.querySelector('.external-script-widget[data-widget-id="birthdays"]');
  birthdaySelector.innerHTML = ""

  let dateformat = new Intl.DateTimeFormat('de-DE', {
      month: '2-digit',
      day: '2-digit'
  })

  function fetchBirthdayAllUser() {
      we.api.getUsers({
              limit: 1
          })
          .then(response => we.api.getUsers({
                  limit: response.total
              })
              .then(response => {
                  users =
                      response.data
                      .filter(user => user.enabled)
                      .filter(user => user.status == 'activated')
                      .filter(user => user.profile)
                      .filter(user => user.profile.geburtsdatum)
                  for (let offset = -7; offset <= 30; offset++) {
                      let d = new Date();
                      d.setDate(d.getDate() + offset);
                      displayBirthdays(users, d)
                  }
              })
          );
  }

  function displayBirthdays(users, dateToCheck) {
      let birthdayMessage =
          users
          .filter(user => {
              let birthdayString = user.profile.geburtsdatum
              let dmy = birthdayString.split(".");
              let birthday = new Date(dmy[2], dmy[1] - 1, dmy[0]);
              return dateToCheck.getDate() === birthday.getDate() && dateToCheck.getMonth() === birthday.getMonth();
          })
          .map(user => '<a href="/profile/' + user.id + '">' + user.firstName + ' ' + user.lastName + '</a>')
          .join(", ")

      let startBold = ""
      let endBold = ""
      today = new Date()
      if (today.getDate() === dateToCheck.getDate() && today.getMonth() === dateToCheck.getMonth()) {
          startBold = "<strong>"
          endBold = "</strong>"
      }
      birthdaySelector.innerHTML += startBold + dateformat.format(dateToCheck) + ": " + (birthdayMessage || "Keine Geburtstage 😔") + endBold + "<br>";
  }

  fetchBirthdayAllUser()
})();
