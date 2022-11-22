/*
Uppgiftsbeskrivning: Inloggningssida

Du har fått i uppgift att utveckla en inloggningssida till ett företag. 
Sidan skall fungera som en proof-of-concept och har inte krav på säkerhet, 
utan till uppgiften kan du arbeta med användarnamn och lösenord i klartext. 
Dvs du kan hantera inloggningsuppgifter som statiska variabler eller i en array.

VVVV Minst 1 användare skall ha användarnamn “janne” och lösenord “test”. 

--> En lyckad inloggning skall sparas i localStorage och sidan skall komma ihåg och 
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

    Ditt projekt skall kunna testas online via tex github pages. (10p)
    VVV Sidan visar dynamiskt rätt innehåll hela tiden. (10p)
    VVV Det går att logga in. (10p)
    Inloggning sparas i localStorage, dvs det skall gå att ladda om webbläsaren 
    och sidan kommer ihåg rätt inloggad användare och visar rätt vy. (10p)
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
    console.log("ls does not exist") 
    let accounts = [
        {id:1, user:'philip', password:"Supersafe1!",},
        {id:2, user:'guh', password: "C4nt.go.tits.up",},
        {id:3, user:'janne', password:"test",},
    ];

    localStorage.setItem("accounts", JSON.stringify(accounts));
    console.log("ls has been created");
  }  


if (localStorage.getItem("my_session")) {
    console.log('session exists');
    let user;
} else {
    let my_session = [];
    console.log(my_session);
    localStorage.setItem("my_session", JSON.stringify(my_session));
}

// Declaring DOM variables for log in/logged in sections
const account_section = document.getElementById('account_section');
const member_zone = document.getElementById('member_zone');
const display_account_creation = document.getElementById('display_create_account');

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

// new user input values

// Declaring variables for DOM manipulation
const greeting = document.getElementById('user_greeting');
const log_in_header = document.getElementById('login');
const logged_in_header = document.getElementById('logged_in');
const log_out = document.getElementById('log_out');
let day;
let time;
let userid;

const specialChars = ["!", "@", "#", "%" ,"^","&", "*", "(", ")", "-", "_", "+", "=", "?", "/", "<", ">", ".", ",", "|", "{", "}", "[", "]",];

// Logging input values
//console.log(username_input);
//console.log(password_input);
//console.log(new_username);
//console.log(new_password, new_password_rep);













































// Log in ( run verification and change DOM to display account page)
log_in_btn.addEventListener('click',  function() {
    log_in();
});

function log_in() {
    let verified = verification();
    //console.log(verification());
    //console.log(verified);
    if (verified == true) {
        //alert (' you have passed the check, welcome to donate to the NYSE');
        // get time and display customized greeting,
        let accounts = JSON.parse(localStorage.getItem("accounts"));

        console.log(localStorage.getItem("my_session"));
        console.log(accounts[userid]);
        let my_session = JSON.parse(localStorage.getItem("my_session"));
        my_session = accounts[userid];
        console.log(my_session);
        localStorage.setItem("my_session", JSON.stringify(my_session));

        greeting.innerHTML = `Hello ${accounts[userid].user}! Please enjoy your ChainCa$h experience this lovely ${day} ${time}!`
        // hide account section
        account_section.style.display = 'none';
        log_in_header.style.display = 'none';
        // display content
        member_zone.style.display = 'block';
        logged_in_header.style.display = 'block';
    } else {
        alert ('Login unsuccessful, passwords and usernames are case sensitive, alternatively create an account');
    }
}

verification = () => {
    // Get accounts from local storage
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(accounts);
    let uname = username_input.value;
    let pword = password_input.value;

    //console.log(accounts[1]);
    //console.log(uname, pword);
    for (i = 0; i < accounts.length; i++) {
        if (accounts[i].user == uname) {
            //alert('this user exists');
            if (accounts[i].password == pword) {
                //alert('password is correct');
                userid = i;
                return true;
            } else {
                alert('wrong password');
                return false;
            }
        } 
    }
}

// Create new account (Run password check and add to array)
create_account = () => {
    let new_user = new_username.value;
    let new_pass = new_password.value;
    let pass_rep = new_password_rep.value;

    if (new_pass == pass_rep) {

        if(validate_password() == true) {

            console.log('password, valid')
            let name_check = check_username();
            console.log(name_check);
            if (name_check == true) {

                console.log('this account can be created');  
                let accounts = JSON.parse(localStorage.getItem("accounts"));
                console.log(accounts);

                //create user object
                let new_account = {
                    id: accounts.length + 1,
                    user: new_user,
                    password: new_pass,
                };
                //push to array
                accounts.push(new_account);
                console.log(accounts);

                localStorage.setItem("accounts", JSON.stringify(accounts));

                //success message, ask to log in
                console.log('account created, please try logging in');
                
            } else {
                console.log('this username is already in use');
            }
        } else {
            console.log('password invalid');
        }
    } else {
        console.log('passwords dont match');
    }
}


// New Password Checker (checks for > 8 char and new_password = new_password_rep)
validate_password = () => {
    let numeric;
    let upper_case;
    let special;
    let new_pass = new_password.value;

    // check for 8+ chars, 1 upper case, 1 special, 1 number
    if (new_pass.length >= 8) {
        let i = 0; 
        while (i < new_pass.length) {
            const char = new_pass.charAt(i);
            console.log(char.indexOf(specialChars));
            if (char * 2) {
                //console.log(`${char} is numeric`);
                numeric = true;
            }  else if (specialChars.indexOf(char) > -1) {
                //console.log(`${char} is special`);
                special = true;
            } else if (char == char.toUpperCase()){
                //console.log(`${char} is upper case`);
                upper_case = true;
            }
            //console.log(numeric, upper_case, special);
            if (numeric == true && upper_case == true && special == true) {
                return true;
            } 
            i++;
        }
    }
}
new_account_btn.addEventListener('click', function() {
    create_account();
})


// new Username checker (Check if username already exists in local storage)
check_username = () => {
    // Get accounts from LS
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    // username var
    const username = new_username.value;
    console.log(accounts.length);
    for (i = 0; i < accounts.length; i++) {
        
        // check username against accounts
        if (username == accounts[i].user){
            // send error message, this user already exists.
            return false;
        } 
    }
    return true;
        
}

// Log out function 
end_session = () => {
    // log in status should become false at this point and end function, unsure how to do this. 
    //console.log(localStorage.getItem("my_session"));
    let my_session = JSON.parse(localStorage.getItem("my_session"));
    my_session = [];
    console.log(my_session);
    localStorage.setItem("my_session", JSON.stringify(my_session));
    //console.log(localStorage.getItem("my_session"));
}


// Session timeout (If account is online for over 20min, ask if they want to stay logged in);
session_timer = () => {
    // 20 minute timer starts when logged in, 
    // gets reset if action is taken
    // after 20 minutes, a message will pop up asking about staying logged in
    // message has 30 second timer until automatic logout.
    end_session();
}
//const minutes = new Date().getMinutes();

log_out.addEventListener('click', function() {
    greeting.innerHTML = `Please log in or create a new account to start donating to the NYSE.`
    end_session();
    // hide account section
    account_section.style.display = 'none';
    log_in_header.style.display = 'block';
    // display content
    member_zone.style.display = 'none';
    logged_in_header.style.display = 'none';
});
















































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
    //console.log(day);
}
get_day();

get_time_of_day = () => {
    let hour = new Date().getHours();
    //console.log(hour);
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
    //console.log(time);
}
get_time_of_day();

display_account_creation.addEventListener('click', function() {
    create_acc_div.style.display = 'flex';
    console.log('account creator is displayed')
});

