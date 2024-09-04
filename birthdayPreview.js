await (async function () {
    const birthdaySelector = document.querySelector('.external-script-widget[data-widget-id="birthdays"]');
    birthdaySelector.innerHTML = ""

    const dateformat = new Intl.DateTimeFormat('de-DE', {
        month: '2-digit',
        day: '2-digit'
    })

    async function fetchBirthdayAllUser() {
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
        for (let offset = -7; offset <= 30; offset++) {
            const d = new Date();
            d.setDate(d.getDate() + offset);
            displayBirthdays(relevantUsers, d)
        }
    }

    function displayBirthdays(users, dateToCheck) {
        const birthdayMessage =
            users
                .filter(user => {
                    const birthdayString = user.profile.geburtsdatum
                    const dmy = birthdayString.split(".");
                    const birthday = new Date(dmy[2], dmy[1] - 1, dmy[0]);
                    return dateToCheck.getDate() === birthday.getDate() && dateToCheck.getMonth() === birthday.getMonth();
                })
                .map(user => '<a href="/profile/' + user.id + '">' + user.firstName + ' ' + user.lastName + '</a>')
                .join(", ")

        let startBold = ""
        let endBold = ""
        const today = new Date()
        if (today.getDate() === dateToCheck.getDate() && today.getMonth() === dateToCheck.getMonth()) {
            startBold = "<strong>"
            endBold = "</strong>"
        }
        birthdaySelector.innerHTML += startBold + dateformat.format(dateToCheck) + ": " + (birthdayMessage || "Keine Geburtstage 😔") + endBold + "<br>";
    }

    await fetchBirthdayAllUser()
})();
