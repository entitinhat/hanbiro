export default class UrlParams {
  qs: string;
  params: { [index: string]: any };
  constructor(search: string) {
    this.qs = search || location.search;
    this.params = {};
    this.parseQuerstring();
  }
  parseQuerstring() {
    this.qs.split('&').reduce((a, b) => {
      const [key, val] = b.split('=');
      a[key] = val;
      return a;
    }, this.params);
  }
  get(key: string) {
    return (this.params[key] || '').replace('%3D%3D', '==');
  }
}
