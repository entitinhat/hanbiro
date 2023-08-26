export const useConvertToHTML: { [key in string]: (SelectedComponent: any, curCTA: any, data?: any) => void } = {
  qrCode(SelectedComponent: any, curCTA: string, data: any) {
    SelectedComponent?.set('tagName', `div`);
    SelectedComponent?.set('attributes', { class: 'fit-content', style: `width: fit-content` });
    console.log('QRdata:', data);
    SelectedComponent?.set('content', `<img src="${data?.image}"  />`);
  },
  image(SelectedComponent: any, curCTA: any) {
    if (curCTA) {
      SelectedComponent?.set('tagName', `div`);
      SelectedComponent?.set('attributes', { class: 'fit-content', style: `width: fit-content` });
      console.log('image', curCTA);
      SelectedComponent?.set(
        'content',
        `<a target="${curCTA.openPageInNewWindow ? '_blank' : '_self'}" href="@cta:${curCTA.id}"><img src="${curCTA.imgUrl}" /><a>`
      );
    }
  },
  url(SelectedComponent: any, curCTA: any) {
    if (curCTA) {
      SelectedComponent?.set('tagName', `a`);
      SelectedComponent?.set('attributes', {
        target: curCTA.openPageInNewWindow ? '_blank' : '_self',
        href: `@cta:${curCTA.id}`
      });
      SelectedComponent?.set('content', curCTA.pageTitle || curCTA.linkUrl);
    }
  },
  text(SelectedComponent: any, curCTA: any) {
    if (curCTA) {
      SelectedComponent?.set('tagName', `div`);
      SelectedComponent?.set('attributes', {
        class: 'fit-content',
        style: `width: fit-content `
      });
      SelectedComponent?.set(
        'content',
        `<a target="${curCTA.openPageInNewWindow ? '_blank' : '_self'}" href="@cta:${
          curCTA.id
        }" style="text-decoration: none;"><div style="background: ${curCTA.txtBgColor};color: ${
          curCTA.txtColor
        } ; padding: 10px 20px ;  border-radius: ${curCTA.txtRounded}px;font-size: ${curCTA.txtFontSize}px ; font-weight: ${
          curCTA.txtFontWeight
        } ; font-family: Roboto,sans-serif" >${curCTA.txtValue}</div></a>`
      );
    }
  }
};
