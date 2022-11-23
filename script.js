/*
Uppgiftsbeskrivning: Inloggningssida
Du har fått i uppgift att utveckla en inloggningssida till ett företag. 
Sidan skall fungera som en proof-of-concept och har inte krav på säkerhet, 
utan till uppgiften kan du arbeta med användarnamn och lösenord i klartext. 
Dvs du kan hantera inloggningsuppgifter som statiska variabler eller i en array.
VVVV Minst 1 användare skall ha användarnamn “janne” och lösenord “test”. 
VVVVV En lyckad inloggning skall sparas i localStorage och sidan skall komma ihåg och 
visa rätt vyer under tiden besökaren är inloggad.
VVVVV Sidan skall innehålla en meny, en del för innehåll samt en footer.
Menyn skall alltid visas och ändras dynamiskt för att visa rätt innehåll:
    VVVVVVV En valfri logotyp eller en h1'a.
    VVVVVV Om besökaren ej är inloggad så skall ett inloggningsformulär visas.
    vvvvvvv Är besökaren inloggad så skall istället en logga-ut knapp visas.
Innehålls -vyn skall dynamiskt växla mellan tre olika lägen:
    VVVVV Välkomstsida för ej inloggade.
    VVVVVVV Felmeddelande vid felaktig inlogging.
    VVVVVVVV Välkomstsida för inloggad besökare.
Ditt projekt får enbart innehålla 1 st html sida, index.html alla vyer skall hanteras i denna.
Funktionskrav (100p – Minst 60p för G och 100p för VG)
G KRAV (60p)
    --> Ditt projekt skall kunna testas online via tex github pages. (10p)
    VVV Sidan visar dynamiskt rätt innehåll hela tiden. (10p)
    VVV Det går att logga in. (10p)
    VVVV Inloggning sparas i localStorage, dvs det skall gå att ladda om webbläsaren 
    VVVV och sidan kommer ihåg rätt inloggad användare och visar rätt vy. (10p)
    VVV Välkomstsidan skall dynamiskt visa rätt användarnamn beroende på vem som är inloggad. (10p)
    vvv Det går att logga ut. (10p)
VG KRAV (40p)
    VVVVVVVV Det skall finnas fler användare (i tex en object array), dokumentera de andra användarna 
    vvvvvvinför test i readme.md (20p)
    vvvvvDet skall gå att skapa och logga in med en ny användare 
    vvvvv(Då skall ett nytt formulär för detta visas på innehålls-sidan) 
    vvvvvDu skall då använda localStorage som databas för användare. (20p)
*/


if (localStorage.getItem("accounts")) {
    console.log('ls exists');
} else { 
    let accounts = [
    {id:1, user:'janne', password:"test",},
    {id:2, user:'clever_parrot', password: "C4nt.go.tits.up",},
    {id:3, user:'thetaboss', password:"putsnocalls",},
    {id:4, user:'Sam Bankman Fried', password:'12345678',},
    {id:5, user:'Colonel Sanders', password:'KFC',},
    {id:6, user:'Guh', password:'guh',},
    {id:7, user:'Degenerategambler69', password:'gme4ever',},
    ];

    localStorage.setItem("accounts", JSON.stringify(accounts));
    console.log("ls has been created");
}  

// Declaring input variables for login
const username_input = document.getElementById('username_input');
const password_input = document.getElementById('password_input');
const log_in_btn = document.getElementById('log_in_btn');

// Declaring input variables for account creation
const new_username = document.getElementById('new_username');
const new_password = document.getElementById('new_password');
const new_password_rep = document.getElementById('new_password_rep');
const new_account_btn = document.getElementById('new_account_btn');
const create_acc_div = document.getElementById('account_section');

// Timeout warning and logout
var warning_timer_clock = 840000;     
var logout_now_clock = 60000;
const warning = document.getElementById('warning');   
const timer_reset = document.getElementById('timer_reset');

// Declaring variables for DOM manipulation
const account_section = document.getElementById('account_section');
const member_zone = document.getElementById('member_zone');
const display_account_creation = document.getElementById('display_create_account');

const greeting = document.getElementById('user_greeting');
const log_in_header = document.getElementById('login');
const logged_in_header = document.getElementById('logged_in');
const log_out = document.getElementById('log_out');
const header_greeting = document.getElementById('header_greeting');

// Global variables
var special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
let day;
let time;
let userid;

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                    /* MAIN FUNCTIONS */
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////


// Log in ( run verification and change DOM to display account page)
log_in_btn.addEventListener('click',  function() {
    log_in();
});


function log_in() {
    if (verification()) {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        const my_session = accounts[userid];
        localStorage.setItem("my_session", JSON.stringify(my_session));

        greeting.innerHTML = `Hello ${accounts[userid].user}! Please enjoy your ChainCa$h experience this lovely ${day} ${time}!`
        trade_of_the_day();
        session_load();
        session_timer();

    } else {
        alert ('Password incorrect');
    }
}

verification = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const user_object = accounts.find(user => {return user.user === username_input.value});
    if (user_object == undefined) {alert('Username is not in use')}
    if (user_object.password === password_input.value) {
        userid = user_object.id - 1;
        console.log(userid);
        return true;
    }
}

// Create new account (Run password check and add to array)
create_account = () => {
    if (new_password.value == new_password_rep.value) {

        if(validate_password()) {
            let accounts = JSON.parse(localStorage.getItem("accounts"));
            const user_exists = accounts.some(user => user.user === new_username.value);
            if (user_exists == false) {

                //create user object
                let new_account = {
                    id: accounts.length + 1,
                    user: new_username.value,
                    password: new_password.value,
                };

                //push to array
                accounts.push(new_account);
                localStorage.setItem("accounts", JSON.stringify(accounts));

                //success message, ask to log in
                account_section.style.display = 'none';
                alert('account created, please try logging in');

            } else {alert('this username is already in use!');}
        } else {alert('invalid password, please include 1 number, 1 upper case character and 1 special character!');}
    } else {alert('passwords do not match!');}
}

new_account_btn.addEventListener('click', function() {
    create_account();
})

// over 8 chars, at least 1 upper case, 1 num, 1 special char... all in 4 lines + 1 global variable u_u-
validate_password = () => {
    const pass = new_password.value;
    if (pass.length >= 8 && pass.toLowerCase() != pass && /\d/.test(pass) && special.test(pass)) {return true;}
} 

session_load = () => {
    account_section.style.display = 'none';
    log_in_header.style.display = 'none';
        // display content
    member_zone.style.display = 'block';
    logged_in_header.style.display = 'block';
}

// Log out function 
end_session = () => {
    // log in status should become false at this point and end function, unsure how to do this. 
    //  ---> Easier than expected!
    localStorage.removeItem("my_session"); 

    // displayed content
    greeting.innerHTML = `Please log in or create a new account to start donating to the NYSE.`;
    header_greeting.innerHTML = "Only members can see trade of the day.";
    log_in_header.style.display = 'block';

    //hidden content
    account_section.style.display = 'none';
    member_zone.style.display = 'none';
    logged_in_header.style.display = 'none';
    warning.style.display = "none";
}


log_out.addEventListener('click', function() {
    end_session();
});


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                    /* UTILITY FUNCTIONS */
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

trade_of_the_day = () => {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    header_greeting.innerHTML = `Trade Of The Day: ${accounts[Math.floor(Math.random()*accounts.length)].user} sold BTC calls for a -${Math.floor(Math.random()*10000)}% profit!`;
}

// Get time and day of week (use switch statement to decide day of week and time of day (morn, day, afternoon, night))
get_day = () => { 
    switch (new Date().getDay()) {
    case 0:
        day = "sunday";
        break;
    case 1:
        day = "monday";
        break;
    case 2:
        day = "tuesday";
        break;
    case 3:
        day = "wednesday";
        break;
    case 4:
        day = "thursday";
        break; 
    case 5:
        day = "friday";
        break;
    case 6:
        day = "saturday";
    } 
}
get_day();

get_time_of_day = () => {
    let hour = new Date().getHours();
    switch (true) {
        case (hour >= 1 && hour <= 12): 
            time = "morning";
            break;
        case (hour >= 12 && hour <= 17):
            time = "afternoon";
            break;
        case (hour >= 17 && hour <= 24):
            time = "evening";      
            break; 
    }
}
get_time_of_day();


// Session timeout /* Variables on row 31,32 */ (If account is inactive for over 15min, ask if they want to stay signed in); 
session_timer = () => {
    warning_timer = setTimeout("idle_warning()", warning_timer_clock);
}
idle_warning = () => {
    warning.style.display = "flex";
    log_out_timer = setTimeout("end_session()", logout_now_clock);
}
timer_reset.addEventListener('click', function() {
    clearTimeout(logout_now_clock);
    clearTimeout(warning_timer_clock);
    warning.style.display = "none";
    session_timer();
});
log_out.addEventListener('click', function() {
    end_session();
});

username_input.addEventListener('click', () => {
    username_input.value = "";
});
password_input.addEventListener('click', () => {
    password_input.value = "";
});
display_account_creation.addEventListener('click', function() {
    create_acc_div.style.display = 'flex';
});


// check for active session in LS
if (localStorage.getItem("my_session")) {
    let user = JSON.parse(localStorage.getItem("my_session"));
    greeting.innerHTML = `Hello ${user.user}! Please enjoy your ChainCa$h experience this lovely ${day} ${time}!`
    trade_of_the_day();
    session_load();
    session_timer();
} 
