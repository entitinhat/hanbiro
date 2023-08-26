import { Code } from './Code';
import { RpcMetaData, RpcRequest, RpcStatus, WSData, WSEOSMessage, WSHeader, WSQueueData, WSTrailer } from './type';

export function frameRpcRequest(request: RpcRequest): Uint8Array {
  const arrBytes = convertRpcMetaDatatoUint8Array(request.data);
  const frame = new ArrayBuffer(arrBytes.byteLength + 5);
  new DataView(frame, 1, 4).setUint32(0, arrBytes.length, false /* big endian */);
  new Uint8Array(frame, 5).set(arrBytes);
  return new Uint8Array(frame);
}

export function convertRpcMetaDatatoUint8Array(data: RpcMetaData): Uint8Array {
  const strJSON = JSON.stringify(data);
  const encoder = new TextEncoder();
  const arrRes = encoder.encode(strJSON);
  return arrRes;
}
let streamId = 1;

export function nextStreamId(): number {
  const cur = streamId;
  streamId += 2;
  return cur;
}

export function instanceOfWSData(object: any): object is WSData {
  return 'd' in object;
}

export function instanceOfWSHeader(object: any): object is WSHeader {
  return 'h' in object;
}
export function instanceOfWSTrailer(object: any): object is WSTrailer {
  return 't' in object && 's' in object;
}
export function instanceOfWSEOSMessage(object: any): object is WSEOSMessage {
  return 't' in object && !('s' in object);
}

export function genWebSocketEOSMessage(streamId: number): WSEOSMessage {
  return {
    id: streamId ?? 1,
    t: {}
  };
}

export function genWebSocketHeadersMessage(streamId: number, headers: RpcMetaData): WSHeader {
  const baseHeaders = {
    'content-type': 'application/gRpc-web+json', // application/webrpc+" ("proto" / "json")
    'x-gRpc-web': '1' // Required for CORS handling
  };

  return {
    id: streamId ?? 1,
    h: { ...headers }
  };
}
export function genWebSocketDataMessage(streamId: number, req: RpcRequest): WSData {
  const { data } = req;
  return {
    id: streamId,
    d: data
  };
}
export function genWebSocketTrailerMessage(streamId: number, req: RpcRequest): WSTrailer {
  const { data } = req;
  const status: RpcStatus = {
    code: Code.OK
  };
  return {
    id: streamId,
    s: status, //JSON Status
    t: {} //Trailers
  };
}
