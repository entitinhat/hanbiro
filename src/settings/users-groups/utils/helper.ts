export const handleScroll = (event: any, orderCondition: boolean = true, callback: () => void) => {
  const elementScrollTop = event.target.scrollTop;
  const elementScrollHeight = event.target.scrollHeight;
  const elementclientHeight = event.target.clientHeight;
  if (elementScrollTop + elementclientHeight == elementScrollHeight && orderCondition) {
    callback();
  }
};
