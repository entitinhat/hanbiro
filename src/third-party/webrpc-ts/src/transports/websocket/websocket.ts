import { Transport, TransportFactory, TransportOptions } from '../Transport';
import { debug } from '../../debug';
import { RpcMetaData, WSData, WSEOSMessage, WSHeader, WSQueueData, WSTrailer } from '../../type';

/**
 * Stream-ID → {4-byte big-endian integer}
 * Client-initiated streams use odd numbers starting with 1.
 * Server-initiated streams use even numbers starting with 2.
 */

export function WebsocketTransport(): TransportFactory {
  return (opts: TransportOptions) => {
    return websocketRequest(opts);
  };
}
function websocketRequest(options: TransportOptions): Transport {
  options.debug && debug('websocketRequest', options);

  let webSocketAddress = options.url;

  const sendQueue: Array<WSQueueData> = [];
  let ws: WebSocket;

  function sendToWebsocket(toSend: WSQueueData) {
    console.log('sendToWebsocket', toSend);
    const wsMsg = JSON.stringify(toSend);
    ws.send(wsMsg);
  }

  return {
    sendMessage: (msgBytes: WSQueueData) => {
      console.log('sendMessage', msgBytes);
      if (!ws || ws.readyState === ws.CONNECTING) {
        sendQueue.push(msgBytes);
      } else {
        sendToWebsocket(msgBytes);
      }
    },
    finishSend: (wsMsg: WSEOSMessage) => {
      console.log('finishSend');
      if (!ws || ws.readyState === ws.CONNECTING) {
        sendQueue.push(wsMsg);
      } else {
        sendToWebsocket(wsMsg);
      }
    },
    start: (metaData: RpcMetaData) => {
      console.log('start', webSocketAddress, ws);
      if (!ws || ws.CLOSED) {
        ws = new WebSocket(webSocketAddress);
        ws.onopen = function () {
          options.debug && debug('websocketRequest.onopen');

          // send any messages that were passed to sendMessage before the connection was ready
          sendQueue.forEach((toSend) => {
            sendToWebsocket(toSend);
          });
        };

        ws.onclose = function (closeEvent) {
          options.debug && debug('websocketRequest.onclose', closeEvent);
          options.onEnd();
        };

        ws.onerror = function (error) {
          options.debug && debug('websocketRequest.onerror', error);
        };
        // received data from server
        ws.onmessage = function (e) {
          options.debug && debug('websocketRequest.onmessage', e);
          //new Uint8Array(e.data)
          const dataObj = JSON.parse(e.data);
          options.onReceive(dataObj as WSData | WSHeader | WSTrailer);
        };
      }
    },
    cancel: () => {
      options.debug && debug('websocket.abort');
      ws.close();
    }
  };
}
