/**
 * a2a-stub.js
 *
 * Include this file in your html page and enjoy a stubbed version
 * of http://dev.webinos.org/specifications/new/app2app.html
 *
 * Author Victor Klos
 */

var webinos = {

    /**
    * webinos App2App API stub implementation, javascript client side
    * @namespace webinos.app2app
    * @example
    * From the docs:
    *     // create channel and ask user to accept connections
    *     var channel = webinos.app2app.createChannel(
    *         "urn:webinos:org:example", { channelOwner: "exampleApp", mode: "send-receive" },
    *         requestHandler(request) {
    *             return confirm("Accept connect request from " + request.source)
    *         }
    *     );
    */
    app2app: Object.create({
        searchCB: null,
        messageCB: null,
        ws: null,

        createChannel: function(ns, properties, authCB, msgCB)
        {
            //createCB = callback;
            log('createChannel invoked, ns=' + ns);
            ws.send(JSON.stringify({type:'command', action:'create', namespace: ns}));
            messageCB = msgCB;
            return { send: function(message) {
                log('sending message ' + message);
                ws.send(JSON.stringify({type:'message', payload: message}));
            }};
        },

        init: function(wsURI, initCB)
        {
            if (window.websocket !== 'undefined')
            {
                ws = new WebSocket(wsURI);
                ws.onopen = function()
                {
                    log('websocket open, connected to a2a stub server');
                    if (typeof initCB === 'function') {
                        (initCB)();
                    }
                };
                ws.onmessage = function (evt) 
                { 
                    log('received [' + evt.data + ']');
                    var msg = JSON.parse(evt.data);

                    switch (msg.type) {
                    case 'message':
                        if (typeof messageCB === 'function') {
                            (messageCB)(JSON.parse(msg.payload));
                            break;
                        }
                        // NO break!
                    default:
                        log('Don\'t know what to do with [' + evt.data + ']');
                        break;
                    }
                };
                ws.onclose = function()
                { 
                    log('Connection closed...'); 
                };
                log('webinos.app2app stub initialised');
            } else {
                log('Your browser does not support websockets!');
            }
        },
    }),
};


$(document).ready(function(){
    $('body').append('<div style="position:absolute;background:black;color:white;top:0;right:0;text-align:right">' +
        'app2app Stub Contol &nbsp;&nbsp;' +
        //'<input type=button value=Init onclick=javascript:alert("haha");>' +
        '<input type=button value=Reset onclick=javascript:alert("TODO: implement reset (send reset cmd to stub server");>' +
        '</div>');
});
