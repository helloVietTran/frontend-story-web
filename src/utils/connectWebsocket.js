import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const connectWebSocket = (channels, onMessageReceived) => {
  const client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    connectHeaders: {},
    debug: (str) => console.log(str),
    reconnectDelay: 15000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    onConnect: () => {
      channels.forEach((channel) => {
        client.subscribe(channel, (message) => {
          onMessageReceived(channel, JSON.parse(message.body));
        });
      });
    },
    onDisconnect: () => {
      console.log('Disconnected');
    },
    onStompError: (frame) => {
      console.error("Lỗi WebSocket: ", frame);
    },
  });

  client.activate();

  return client;
};

export default connectWebSocket;
