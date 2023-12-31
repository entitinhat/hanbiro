export const getHashParams = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial: { [key: string]: any }, item) {
      if (item) {
        const parts = item.split('=');

        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
};

export const removeHashParamsFromUrl = () => {
  window.history.pushState('', document.title, window.location.pathname + window.location.search);
};

export const addParameterToURL = (url: string, paramStr: string) => {
  if (url.match(/data:image/)) {
    return url;
  }
  url += (url.split('?')[1] ? '&' : '?') + paramStr;
  return url;
};
