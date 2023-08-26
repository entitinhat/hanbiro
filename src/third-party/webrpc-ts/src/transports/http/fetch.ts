import { BrowserHeaders } from "browser-headers";
import { debug } from "../../debug";
import { Transport, TransportFactory, TransportOptions } from "../Transport";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FetchTransportInit = Omit<
  RequestInit,
  "headers" | "method" | "body" | "signal"
>;
export function FecthReadableStreamTransport(
  init: FetchTransportInit
): TransportFactory {
  return (opts: TransportOptions) => {
    return fetchRequest(opts, init);
  };
}
function fetchRequest(
  options: TransportOptions,
  init: FetchTransportInit
): Transport {
  return new Fetch(options, init);
}

class Fetch implements Transport {
  constructor(options: TransportOptions, init: FetchTransportInit) {
    debug(options, init);
  }
  sendMessage(msgBytes: Uint8Array): void {
    debug(msgBytes);
    throw new Error("Method not implemented.");
  }
  finishSend(): void {
    throw new Error("Method not implemented.");
  }
  cancel(): void {
    throw new Error("Method not implemented.");
  }
  start(metadata: BrowserHeaders): void {
    debug(metadata);
    throw new Error("Method not implemented.");
  }
}
