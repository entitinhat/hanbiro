import { StreamManager, StreamRequest } from './Stream';
import { ClientRpcOptions, RpcMetaData, RpcRequest, RpcResponse, StreamRpcOptions, WebRpcClient } from './type';
const WindowFetch = fetch;
const BaseHeaders = {
  'content-type': 'application/json' // application/webrpc+" ("proto" / "json")
};
export class Client implements WebRpcClient {
  props: ClientRpcOptions;
  streamManager: StreamManager;
  constructor(props: ClientRpcOptions) {
    console.log('New Client', props);
    this.props = props;
    const streamOpts: StreamRpcOptions = {
      host: this.getWSEndPoint()
    };
    this.streamManager = new StreamManager(streamOpts);
    this.streamManager.openTransport();
  }
  clientStream(url: string, headers?: RpcMetaData): StreamRequest {
    const sReq = this.streamManager.createStreamRequest(url, headers ?? {});
    return sReq;
  }
  serverStream(url: string, request: RpcRequest, headers?: RpcMetaData): StreamRequest {
    const sReq = this.streamManager.createStreamRequest(url, headers ?? {});
    sReq.send(request);
    return sReq;
  }
  stream(url: string, headers?: RpcMetaData): StreamRequest {
    const sReq = this.streamManager.createStreamRequest(url, headers ?? {});
    return sReq;
  }

  getWSEndPoint(): string {
    const baseUrl = `${this.props.secure ? 'wss' : 'ws'}://${this.props.host}`;
    return this.props.streamEndPoint != '' ? `${baseUrl}${this.props.streamEndPoint}` : baseUrl;
  }
  getHttpEndPoint(): string {
    return `${this.props.secure ? 'https' : 'http'}://${this.props.host}`;
  }
  async unarry(url: string, request: RpcRequest, headers?: RpcMetaData): Promise<RpcResponse> {
    try {
      const method = request.method ?? 'POST';
      const bodyData = request.data ? JSON.stringify(request.data) : '';
      const extraHeaders = headers ?? {};
      const fetchUrl = `${this.getHttpEndPoint()}${url}`;
      const resp = await WindowFetch(fetchUrl, {
        method: method,
        headers: {
          ...BaseHeaders,
          ...extraHeaders
        },
        body: bodyData
      });
      const res = await resp.json();
      const rpcResp: RpcResponse = {
        data: res
      };
      return rpcResp;
    } catch (error: any) {
      //throw new Error(`Error in 'fetcher(${url})': ${error.message}`);
      const rpcResp: RpcResponse = {
        error: error
      };
      return rpcResp;
    }
  }
}
