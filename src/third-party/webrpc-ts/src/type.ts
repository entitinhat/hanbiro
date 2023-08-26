import { Code } from './Code';
import { Transport, TransportFactory } from './transports/Transport';

export type Method = 'POST' | 'GET';
export interface RpcMetaData {
  [x: string]: any;
}
export interface RpcMessage {
  streamId: number;
  data: RpcMetaData;
}
// export type RequestType = "UNARY" | "INVOKE" | "CLIENT" | "BIDI";
export interface RpcHeader {
  headers: RpcMetaData;
  set(key: string, value: any): void;
  get(key: string): any;
  getHeaders(): RpcMetaData;
}
export interface RpcError {
  code: number;
  message: string;
}
export interface RpcRequest {
  method?: Method;
  data: RpcMetaData;
}
export interface RpcResponse {
  headers?: RpcMetaData;
  streamId?: number;
  data?: RpcMessage | RpcMessage[];
  error?: RpcError;
}
export interface WebRpcConfig {
  endPoint: string;
  secure: boolean;
}

export interface StreamOptions {
  [x: string]: any;
}

export interface RpcOptions {
  transport?: TransportFactory;
  debug?: boolean;
}

export interface ClientRpcOptions extends RpcOptions {
  host: string;
  secure: boolean;
  streamEndPoint?: string;
}

export interface StreamRpcOptions extends RpcOptions {
  host: string;
  metadata?: RpcMetaData;
}
export interface StreamClientConfig {
  host: string;
}

export interface StreamRequestOptions {
  transport: Transport;
  debug?: boolean;
}
export class Header implements RpcHeader {
  headers: RpcMetaData = {};
  constructor(metaData: RpcMetaData) {
    this.headers = metaData;
  }
  set(key: string, value: any): void {
    this.headers[key] = value;
  }
  get(key: string) {
    return this.headers[key] ?? '';
  }
  getHeaders(): RpcMetaData {
    return this.headers;
  }
}
export interface RpcResponseHeaders extends RpcMetaData {}
export interface RpcResponseTrailers {
  trailer: RpcMetaData;
  status: RpcStatus;
}
export interface RpcStatus {
  code: number;
}
export interface WSBase {
  id: number; // streamId
}
export interface WSData extends WSBase {
  d: RpcMetaData;
}
export interface WSHeader extends WSBase {
  h: RpcMetaData;
}

export interface WSTrailer extends WSBase {
  t: RpcMetaData;
  s: RpcStatus;
}

export interface WSEOSMessage extends WSBase {
  t: RpcMetaData;
}

export type WSQueueData = Uint8Array | WSData | WSHeader | WSEOSMessage | WSTrailer;

export interface WebRpcClient {
  unarry(url: string, request: RpcRequest, headers?: RpcMetaData): Promise<RpcResponse>;
  clientStream(url: string, headers?: RpcMetaData): StreamRequestInteface;
  serverStream(url: string, request: RpcRequest, headers?: RpcMetaData): StreamRequestInteface;
  stream(url: string, headers?: RpcMetaData): StreamRequestInteface;
}

export interface StreamRequestInteface {
  start(metadata?: RpcMetaData): void;
  send(request: RpcRequest): void;
  finishSend(): void;
}
export interface StreamManagerInterface {
  createStreamRequest(url: string, headers: RpcMetaData): StreamRequestInteface;
  openTransport(): void;
  closeTransport(): void;
}
