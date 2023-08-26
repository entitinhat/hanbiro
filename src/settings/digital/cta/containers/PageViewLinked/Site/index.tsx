import _ from 'lodash';

import PublicSite from '@public-page/site/pages/ViewPage';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { useOrg } from '@base/hooks/iam/useOrg';
import { Base64 } from 'js-base64';
import { GRAPHQL_HOST } from '@base/config/graphql';
interface SiteProps {
  id: string;
}
const docId = ''; //desk ticket id
const utmSource = 'desk';
const Site = (props: SiteProps) => {
  const { id } = props;

  const auth = useRecoilValue(authAtom);
  const { id: orgId, tenantId } = useOrg();
  const sToken = `D=${docId}&P=${''}&S=${''}&C=${''}&U=${auth?.user?.id as string}&T=${tenantId}&O=${orgId}`;
  const publicUrl = `?${[`tk=${Base64.encode(sToken)}&utm_id=${id}&utmSource=${utmSource}`, `readOnly=readOnly`].join('&')}`;

  //==============================================================Debug==============================================
  console.log(`%c Url:${GRAPHQL_HOST}/public/site/view${publicUrl}`, 'font-size:24px;color: blue');
  //==============================================================Debug================================
  return <PublicSite param={publicUrl} />;
};

export default Site;
