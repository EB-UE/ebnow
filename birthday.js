(async function () {
    let todaysbirthdaySelector = document.querySelector('.external-script-widget[data-widget-id="birthday"]');
    todaysbirthdaySelector.innerHTML = ""

    async function fetchAllUserForToday() {
        const responseToGetMaxUserCount = await we.api.getUsers({
            limit: 1
        });

        const allUsers = await we.api.getUsers({
            limit: responseToGetMaxUserCount.total
        })

        const relevantUsers =
            allUsers.data
                // .filter(user => user.enabled) // no property anymore
                .filter(user => user.status == 'activated')
                .filter(user => user.profile?.geburtsdatum)
                displayTodaysBirthdays(relevantUsers)
    }

    function displayTodaysBirthdays(users) {
        let birthdayMessage = users
            .filter(user => {
                let birtdayString = user.profile.geburtsdatum
                let dmy = birtdayString.split(".");
                let birthday = new Date(dmy[2], dmy[1] - 1, dmy[0]);
                let today = new Date()
                return today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth()
            })
            .map(user => '<a href="/profile/' + user.id + '">' + user.firstName + ' ' + user.lastName + '🎉</a>')
            .join(" ")
        todaysbirthdaySelector.innerHTML = birthdayMessage || "Heute hat niemand Geburtstag. Wünsche deinen Kollegen doch trotzdem einen schönen Tag 🙂"
    }
    fetchAllUserForToday()
})();
