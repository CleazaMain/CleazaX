'use strict';
Pusher.logToConsole = false;
let channelName, pusher, base = "https://cleazax.netlify.app/";

fetch(base + "/connect" + (localStorage.id ? `?id=${localStorage.id}` : ""), {
    "method": "GET",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function (response) {
    console.log(response.status);
    return response.json();
}).then(function (data) {
    if (!localStorage.id || localStorage.id != data.id){
        localStorage.id = data.id;
        updateTooltip();
    }
    channelName = data.channel;
    pusher = new Pusher('47258478449c5b426ba6', {
        cluster: 'eu'
    });
    subscribe();
})
.catch(function (error) {
    console.log(error.message);
});

function subscribe() {
    window.channel = pusher.subscribe(channelName);
    window.channel.bind('pusher:subscription_succeeded', () => { console.log("subscribed") });
    window.channel.bind('pusher:subscription_error', () => { setTimeout(subscribe, 1000); });
    window.channel.bind('message', (mes) => signallingOnMessage(mes));
}

// signallingOnMessage ve diğer fonksiyonlarınızı burada tanımlayabilirsiniz

function updateTooltip() {
    // Tooltip güncelleme işlemleri burada olabilir
}
