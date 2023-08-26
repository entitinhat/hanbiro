import { RpcHeader, RpcMetaData, RpcRequest, WSData, WSEOSMessage, WSHeader, WSQueueData, WSTrailer } from '../type';
import { WebsocketTransport } from './websocket/websocket';

export interface Transport {
  sendMessage(msgBytes: WSQueueData): void;
  finishSend(mgs: WSEOSMessage): void;
  cancel(): void;
  start(metaData: RpcMetaData): void;
}

export interface TransportOptions {
  debug: boolean;
  url: string;
  onHeaders: (headers: RpcHeader, status: number) => void;
  onReceive: (data: WSHeader | WSTrailer | WSData, flush?: boolean) => void;
  onEnd: (err?: Error) => void;
}

export interface TransportFactory {
  (options: TransportOptions): Transport;
}

export function makeDefaultTransport(options: TransportOptions): Transport {
  return WebsocketTransport()(options);
}
