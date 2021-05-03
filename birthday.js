(function() {
    let todaysbirthdaySelector = document.querySelector('.external-script-widget[data-widget-id="birthday"]');
    todaysbirthdaySelector.innerHTML = ""

    function fetchAllUserForToday() {
        we.api.getUsers('limit=1')
            .then(response => we.api.getUsers(`limit=${response.total}`)
                .then(response => {
                    users = response.data
                        .filter(user => user.enabled)
                        .filter(user => user.status == 'activated')
                        .filter(user => user.profile)
                        .filter(user => user.profile.geburtsdatum)

                    displayTodaysBirthdays(users)
                })
            );
    }

    function displayTodaysBirthdays(users) {
        var birthdayMessage = ''
        users
            .map(user => {
                var birtdayString = user.profile.geburtsdatum
                var dmy = birtdayString.split(".");
                var birthday = new Date(dmy[2], dmy[1] - 1, dmy[0]);
                var today = new Date()
                if (today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth()) {
                    birthdayMessage += '<a href="/profile/' + user.id + '">' + user.firstName + ' ' + user.lastName + '</a> 🎉' + ' ';
                }
            })
        todaysbirthdaySelector.innerHTML = birthdayMessage || "Heute hat niemand Geburtstag. Wünsche deinen Kollegen doch trotzdem einen schönen Tag 🙂"
    }

    fetchAllUserForToday()
})();
