import atmosphere from 'atmosphere.js'

let socket = atmosphere;
let subSocket;
let transport = 'websocket';
let fallbackTransport = 'long-polling'

function connect(id, onMessage) {
    this.request = {
        url: 'ws://localhost:8080/bang-gia/' + id,
        contentType: "application/json",
        logLevel: 'debug',
        transport: transport,
        trackMessageLength: true,
        reconnectInterval: 5000,
        fallbackTransport: fallbackTransport
    };

    // this.request.onOpen = function (response) {
    //     console.log('onOpen');

    // };

    // this.request.onReopen = function (response) {
    //     console.log('onReopen');

    // };

    // this.request.onClose = function (response) {
    //     console.log('onClose');
    // };

    // this.request.onError = function (response) {
    //     console.log('onError');
    // };

    // this.request.onReconnect = function (request, response) {
    //     console.log('onReconnect');

    // };

    this.request.onMessage = function(response) {
        console.log('onMessage');
        let message = response.responseBody;
        try {
            let json = JSON.parse(message);
            onMessage(json)
        } catch (e) {
            console.log(e);
        }
    }
}
connect.prototype.close = function() {
    subSocket.close();
}

connect.prototype.open = function() {
    subSocket = socket.subscribe(this.request);
}

export default connect