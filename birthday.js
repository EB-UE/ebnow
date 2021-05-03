var loadBirthday = function () {
    const today = new Date();
    const url = "https://de.eyo.net/api/users";
    const id = we.authMgr.getSessionID();
    
    const currentDate = (today.getDate() <= 9 ? "0" : "" ) + today.getDate() + "." + ((today.getMonth() + 1) <= 9 ? "0" : "" ) + (today.getMonth() + 1) + ".";
    
    const USER_ENTITY = "user"
    const birthdayRequest = new XMLHttpRequest();
    
    birthdayRequest.open("GET",url + ";wesessid=" + id + "?query=" + currentDate + "&limit=10&extended=false");
    birthdayRequest.addEventListener('load', function(event) {
       if (birthdayRequest.status >= 200 && birthdayRequest.status < 300) {
             let response = JSON.parse(birthdayRequest.responseText);
             const data = response.data;
    
             let birthdayMessage = "";
            
             if(data) {
                data.forEach(user => {
                    // check if search hit is a user
                    if(user.entityType == USER_ENTITY){
                       // User has birthday today
                       if(user.profile.geburtsdatum.substring(0, 6) == currentDate) {
                        birthdayMessage += '<a href="/profile/' + user.id + '">' + user.firstName + ' ' + user.lastName + '</a> 🎉' + ' ';
                       }
                    }
                });
             } else {birthdayMessage = "Heute hat niemand Geburtstag. Wünsche deinen Kollegen doch trotzdem einen schönen Tag 🙂"}

            var birthdaySelector = document.querySelector('.external-script-widget[data-widget-id="birthday"]');                
    
                if (birthdaySelector) {
                    birthdaySelector.innerHTML = birthdayMessage;
                } else {
                    console.log("This didn't work. Try again");
                };
        }
    });
    
    birthdayRequest.send();
};

loadBirthday();

