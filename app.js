var firebaseConfig = {
    apiKey: "AIzaSyDmEGM8B0BqyGlPEQcBG39-dVjBk07SE1c",
    authDomain: "messaging-app-14526.firebaseapp.com",
    databaseURL: "https://messaging-app-14526-default-rtdb.firebaseio.com",
    projectId: "messaging-app-14526",
    storageBucket: "messaging-app-14526.appspot.com",
    messagingSenderId: "429588905576",
    appId: "1:429588905576:web:f8be4f6098c7c005d085dd"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const MessagesRef = database.ref('Messages');




const Input = document.querySelector('#inputBox');
const Button = document.querySelector('#sendBtn');



const NameAsk = prompt('Please put you name here');
localStorage.setItem('name', NameAsk);








Button.addEventListener('click', (e) => {
    e.preventDefault();
    if (Input.value != '') {
        const Message = {
            message: Input.value,
            name: localStorage.getItem('name')
        };
        MessagesRef.push(Message);
        Input.value = '';
    } else {
        alert('put something in')
    }
});

MessagesRef.on('value', gotData, errData);

function gotData(data) {

    let MessageListing = document.querySelectorAll('.message');
    for (let i = 0; i < MessageListing.length; i++) {
        MessageListing[i].remove();
    }

    let Messages = data.val();
    var keys = Object.keys(Messages);

    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let Sender = Messages[k].name;
        let Text = Messages[k].message;

        const NewDiv = document.createElement('div');
        const NamePlace = document.createElement('h3');
        const TextPlace = document.createElement('h2');

        let NameTXT = document.createTextNode(Sender);
        let TextTXT = document.createTextNode(Text);

        NamePlace.appendChild(NameTXT);
        TextPlace.appendChild(TextTXT);

        NewDiv.appendChild(NamePlace);
        NewDiv.appendChild(TextPlace);

        NewDiv.className = `message ${Sender === localStorage.getItem('name') ? 'user' : 'guest'}`;

        document.querySelector('#Messages').appendChild(NewDiv);



        window.scrollTo(0, document.body.scrollHeight);


        function ShowNotification() {
            const notification = new Notification('Not from the code all wroking fine', {
                body: Text,
                icon: 'data:image/png;base64,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'
            });
            notification.onclick = (e) => {
                window.location.href = 'https://www.youtube.com/watch?v=Jncoj-Gvh9o&ab_channel=dcode';
            }
        }


        if (Notification.permission === 'granted') {
            ShowNotification();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                console.log(permission);
                if (permission === 'granted') {
                    ShowNotification();
                }
            })
        }

    }
}
function errData(error) {
    console.log(error);
    console.log('error');
}

// localStorage.removeItem('name');

console.log(localStorage.getItem('name'));
