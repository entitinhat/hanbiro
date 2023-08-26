import { SETTING_CTA_CONTENT_TYPE_LANDING_PAGE } from '@settings/digital/cta/config/constants';
import { useOrg } from '@base/hooks/iam/useOrg';
import { authAtom } from '@base/store/atoms/auth';
import { Base64 } from 'js-base64';
import { useRecoilValue } from 'recoil';
import PublicLandingPage from '@public-page/landingpage/pages/ViewPage';
import { GRAPHQL_HOST } from '@base/config/graphql';

export const useConvertCtaToHTML: { [key in string]: (node: Element, ctaData: any, extra?: any) => string } = {
  // qrCode(SelectedComponent: any, curCTA: string, data: any) {
  //   SelectedComponent?.set('tagName', `div`);
  //   SelectedComponent?.set('attributes', { class: 'fit-content', style: `width: fit-content` });
  //   console.log('QRdata:', data);
  //   SelectedComponent?.set('content', `<img src="${data?.image}"  />`);
  // },
  image(node: Element, ctaData: any, extra: any) {
    if (ctaData) {
      let Href = '';
      if (ctaData?.contentType === SETTING_CTA_CONTENT_TYPE_LANDING_PAGE) {
        const sToken = `D=${ctaData?.landingPage?.id}&P=${''}&S=${''}&C=${''}&U=${extra?.auth?.user?.id as string}&T=${extra?.tenantId}&O=${
          extra?.orgId
        }`;
        const publicUrl = `?${[`tk=${Base64.encode(sToken)}`, `readOnly=readOnly`].join('&')}`;
        //========================================================DEBUG========================================
        console.log(`%c Url:${GRAPHQL_HOST}/public/landingpage/view${publicUrl}`, 'font-size:24px;color: blue');
        //=================================================================================================
        Href = `https://${GRAPHQL_HOST}/public/landingpage/view${publicUrl}`;
      }
      return `<a target="${ctaData.openPageInNewWindow ? '_blank' : '_self'}" href="${Href}"><img src="${ctaData.imgUrl}" /><a>`;
    } else return '(Invalid CTA)';
  }
  // url(SelectedComponent: any, curCTA: any) {
  //   if (curCTA) {
  //     SelectedComponent?.set('tagName', `a`);
  //     SelectedComponent?.set('attributes', {
  //       target: curCTA.openPageInNewWindow ? '_blank' : '_self',
  //       href: `@cta:${curCTA.id}`
  //     });
  //     SelectedComponent?.set('content', curCTA.pageTitle || curCTA.linkUrl);
  //   }
  // },
  // text(SelectedComponent: any, curCTA: any) {
  //   if (curCTA) {
  //     SelectedComponent?.set('tagName', `div`);
  //     SelectedComponent?.set('attributes', {
  //       class: 'fit-content',
  //       style: `width: fit-content `
  //     });
  //     SelectedComponent?.set(
  //       'content',
  //       `<a target="${curCTA.openPageInNewWindow ? '_blank' : '_self'}" href="@cta:${
  //         curCTA.id
  //       }" style="text-decoration: none;"><div style="background: ${curCTA.txtBgColor};color: ${
  //         curCTA.txtColor
  //       } ; padding: 10px 20px ;  border-radius: ${curCTA.txtRounded}px;font-size: ${curCTA.txtFontSize}px ; font-weight: ${
  //         curCTA.txtFontWeight
  //       } ; font-family: Roboto,sans-serif" >${curCTA.txtValue}</div></a>`
  //     );
  //   }
  // }
};
