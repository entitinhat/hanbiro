import { Code, grpcStatusToCode, grpcStatusToMessage } from './Code';
import { debug } from './debug';
import { makeDefaultTransport, Transport } from './transports/Transport';
import {
  Header,
  RpcMessage,
  RpcMetaData,
  RpcRequest,
  RpcResponse,
  RpcResponseTrailers,
  StreamManagerInterface,
  StreamRequestInteface,
  StreamRequestOptions,
  StreamRpcOptions,
  WSData,
  WSHeader,
  WSTrailer
} from './type';
import {
  genWebSocketDataMessage,
  genWebSocketEOSMessage,
  genWebSocketHeadersMessage,
  instanceOfWSData,
  instanceOfWSHeader,
  instanceOfWSTrailer,
  nextStreamId
} from './util';
/**
 * Stream-ID → {4-byte big-endian integer}
 * Client-initiated streams use odd numbers starting with 1.
 * Server-initiated streams use even numbers starting with 2.
 */

export class StreamRequest implements StreamRequestInteface {
  props: StreamRequestOptions;
  started: boolean = false;
  finishedSending: boolean = false;
  completed: boolean = false;
  transport: Transport;
  streamId: number = 0;
  responseHeaders: Header | null = null;
  responseTrailers: RpcResponseTrailers | null = null;
  receiveDatas: RpcMessage[] = [];

  constructor(props: StreamRequestOptions) {
    console.log('Stream', props);
    this.props = props;
    // create new Stream Id
    this.streamId = nextStreamId();
    //
    this.transport = props.transport;
  }
  start(headers: RpcMetaData): void {
    if (this.started) {
      throw new Error('Client already started - cannot .start()');
    }
    this.started = true;
    const wsMsg = genWebSocketHeadersMessage(this.streamId, headers);
    this.transport.sendMessage(wsMsg);
  }
  send(req: RpcRequest): void {
    if (!this.started) {
      throw new Error('Client not started - .start() must be called before .send()');
    }
    if (this.finishedSending) {
      throw new Error('Client already finished sending - cannot .send()');
    }
    // build stream message
    const wsMsg = genWebSocketDataMessage(this.streamId, req);
    this.transport.sendMessage(wsMsg);
  }
  finishSend(): void {
    if (!this.started) {
      throw new Error('Client not started - .finishSend() must be called before .close()');
    }
    if (this.finishedSending) {
      throw new Error('Client already finished sending - cannot .finishSend()');
    }
    this.finishedSending = true;
    const wsMsg = genWebSocketEOSMessage(this.streamId);
    this.transport.finishSend(wsMsg);
  }
  // how to wait response
  onReceive(recvData: WSHeader | WSData | WSTrailer): void {
    if (instanceOfWSHeader(recvData)) {
      if (!this.responseHeaders) {
        this.responseHeaders = new Header(recvData);
      }
    } else if (instanceOfWSData(recvData)) {
      const data: RpcMessage = {
        streamId: recvData.id,
        data: recvData.d
      };
      this.receiveDatas.push(data);
    } else if (instanceOfWSTrailer(recvData)) {
      if (!this.responseTrailers) {
        const respTrailers: RpcResponseTrailers = {
          trailer: recvData.t,
          status: recvData.s
        };
        this.responseTrailers = respTrailers;
        this.completed = true;
      }
    }
  }
  async receive(): Promise<RpcResponse> {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        if (this.completed && this.responseTrailers) {
          const { status } = this.responseTrailers;
          const grpcStatus = grpcStatusToCode(status.code);
          const grpcMessage = grpcStatusToMessage(status.code);
          const headerStatus = {
            'grpc-status': grpcStatus,
            'grpc-message': grpcMessage
          };
          const resp: RpcResponse = {};
          // set header
          resp.headers = {
            ...headerStatus
          };
          resp.data = this.receiveDatas;
          if (grpcStatus !== Code.OK) {
            // add error
            resp.error = {
              code: grpcStatus,
              message: grpcMessage
            };
          }
          resolve(resp);
          clearInterval(interval);
        }
      });
    });
  }
}

export class StreamManager implements StreamManagerInterface {
  streamRequests: StreamRequest[] = [];
  props: StreamRpcOptions;
  transport: Transport;
  opened: boolean = false;
  closed: boolean = false;
  constructor(props: StreamRpcOptions) {
    this.props = props;
    const wsAddress = props.host;
    const transportOptions = {
      debug: this.props.debug || false,
      url: wsAddress,
      onHeaders: this.onTransportHeaders.bind(this),
      onReceive: this.onTransportReceive.bind(this),
      onEnd: this.onTransportEnd.bind(this)
    };

    if (this.props.transport) {
      this.transport = this.props.transport(transportOptions);
    } else {
      this.transport = makeDefaultTransport(transportOptions);
    }
  }
  onTransportHeaders(headers: RpcMetaData, status: number) {
    this.props.debug && debug('onHeaders', headers, status);

    if (this.closed) {
      this.props.debug && debug('grpc.onHeaders received after request was closed - ignoring');
      return;
    }
  }
  onTransportReceive(recvData: WSHeader | WSData | WSTrailer) {
    if (this.closed) {
      this.props.debug && debug('gRpc.onReceive received after request was closed - ignoring');
      return;
    }
    this.props.debug && debug('gRpc.onReceive received', recvData);
    // broadcast data to stream request
    this.broadcastOnRecevie(recvData);
    // clean stream request
    this.cleanStreamRequest();
  }
  onTransportEnd() {
    this.props.debug && debug('gRpc.onEnd');

    if (this.closed) {
      this.props.debug && debug('gRpc.onEnd received after request was closed - ignoring');
      return;
    }
    this.closed = true;
  }
  createStreamRequest(url: string, headers: RpcMetaData): StreamRequest {
    const props = {
      transport: this.transport,
      debug: this.props.debug
    };
    const sReq = new StreamRequest(props);
    const nHeaders: RpcMetaData = {
      ...headers,
      ':path': [url]
    };
    sReq.start(nHeaders);
    this.streamRequests.push(sReq);
    return sReq;
  }
  openTransport(): void {
    if (this.opened) {
      throw new Error('Client already started - cannot .openTransport()');
    }
    this.opened = true;
    const metadata = {};
    // start transport
    this.transport.start(metadata);
  }
  closeTransport(): void {
    if (this.closed) {
      throw new Error('Client already started - cannot .closeTransport()');
    }
    this.closed = true;
    // close transport
    this.transport.cancel();
  }
  broadcastOnRecevie(recvData: WSHeader | WSData | WSTrailer) {
    if (this.streamRequests.length > 0) {
      this.streamRequests.map((streamReq) => {
        const { id } = recvData;
        if (streamReq.streamId === id) {
          // fire To request
          streamReq.onReceive(recvData);
        }
      });
    }
  }
  cleanStreamRequest(): void {
    // remove completed stream request
    if (this.streamRequests.length > 0) {
      const nStreamRequests = this.streamRequests.filter((streamReq) => {
        return !streamReq.completed;
      });
      this.props.debug && debug('new stream request', nStreamRequests);
      this.streamRequests = nStreamRequests;
    }
  }
  reset(): void {
    this.closed = false;
    this.opened = false;
    this.streamRequests = [];
  }
}
