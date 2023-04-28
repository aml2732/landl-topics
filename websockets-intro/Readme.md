# Websockets
A javascript API, that makes use of the underlying WebSocket communications protocol, which allows two way real-time communication between client and server over an open and persistant connection, without the overhead incured by polling.

## When to use Websockets?
- as a replacement for HTTP polling
- good for small and big messages/payloads

## Example
For this example, let's imagine a simple ephemeral realtime chat application.
In this example we'll have a backend endpoint that receives messages and adds them to a list
We will also have a websocket setup to push new messages to the client

## Example backends:
### Nodejs
- https://github.com/aml2732/landl-topics/tree/main/websockets-intro/servers/node-example
- makes use of two npm modules [ws](https://www.npmjs.com/package/ws) and websocket
### Python

## Example client/frontends:
### Vanilla JS
- https://github.com/aml2732/landl-topics/tree/main/websockets-intro/frontends/vanilla-js-example
- makes use of https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
### React
...etc.

## Notes: 
- supported by all modern common browsers
- use of HTTP `Upgrade` Header is the signifier for browser to use WebSocket protocol instead of HTTP

## Resources used to create this presentation:
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- https://en.wikipedia.org/wiki/WebSocket
- https://dev.to/codesphere/getting-started-with-web-sockets-in-nodejs-49n0
- https://www.npmjs.com/package/ws#user-content-multiple-servers-sharing-a-single-https-server

### Writing notes: 
- wikipage under security considerations
- 