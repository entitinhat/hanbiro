export function removeTags(str: string) {
  return str.replace(/(<([^>]+)>)/gi, '');
}

export function toAny(str: any) {
  return str;
}
