export enum Code {
  OK = 0,
  Canceled = 1,
  Unknown = 2,
  InvalidArgument = 3,
  DeadlineExceeded = 4,
  NotFound = 5,
  AlreadyExists = 6,
  PermissionDenied = 7,
  ResourceExhausted = 8,
  FailedPrecondition = 9,
  Aborted = 10,
  OutOfRange = 11,
  Unimplemented = 12,
  Internal = 13,
  Unavailable = 14,
  DataLoss = 15,
  Unauthenticated = 16
}

export function httpStatusToCode(httpStatus: number): Code {
  switch (httpStatus) {
    case 0: // Connectivity issues
      return Code.Internal;
    case 200:
      return Code.OK;
    case 400:
      return Code.InvalidArgument;
    case 401:
      return Code.Unauthenticated;
    case 403:
      return Code.PermissionDenied;
    case 404:
      return Code.NotFound;
    case 409:
      return Code.Aborted;
    case 412:
      return Code.FailedPrecondition;
    case 429:
      return Code.ResourceExhausted;
    case 499:
      return Code.Canceled;
    case 500:
      return Code.Unknown;
    case 501:
      return Code.Unimplemented;
    case 503:
      return Code.Unavailable;
    case 504:
      return Code.DeadlineExceeded;
    default:
      return Code.Unknown;
  }
}
export function grpcStatusToCode(wsStatus: number): Code {
  switch (wsStatus) {
    case 0: // Connectivity issues
      return Code.OK;
    case 1:
      return Code.Canceled;
    case 2:
      return Code.Unknown;
    case 3:
      return Code.InvalidArgument;
    case 4:
      return Code.DeadlineExceeded;
    case 5:
      return Code.NotFound;
    case 6:
      return Code.AlreadyExists;
    case 7:
      return Code.PermissionDenied;
    case 8:
      return Code.ResourceExhausted;
    case 9:
      return Code.FailedPrecondition;
    case 10:
      return Code.Aborted;
    case 11:
      return Code.OutOfRange;
    case 12:
      return Code.Unimplemented;
    case 13:
      return Code.Internal;
    case 14:
      return Code.Unavailable;
    case 15:
      return Code.DataLoss;
    case 16:
      return Code.Unauthenticated;
    default:
      return Code.Unknown;
  }
}
export function grpcStatusToMessage(wsStatus: number): string {
  switch (wsStatus) {
    case 0:
      return 'OK';
    case 1:
      return 'Canceled';
    case 2:
      return 'Unknown';
    case 3:
      return 'InvalidArgument';
    case 4:
      return 'DeadlineExceeded';
    case 5:
      return 'NotFound';
    case 6:
      return 'AlreadyExists';
    case 7:
      return 'PermissionDenied';
    case 8:
      return 'ResourceExhausted';
    case 9:
      return 'FailedPrecondition';
    case 10:
      return 'Aborted';
    case 11:
      return 'OutOfRange';
    case 12:
      return 'Unimplemented';
    case 13:
      return 'Internal';
    case 14:
      return 'Unavailable';
    case 15:
      return 'DataLoss';
    case 16:
      return 'Unauthenticated';
    default:
      return 'Unknown';
  }
}
