import { useOrg } from '@base/hooks/iam/useOrg';
import { authAtom } from '@base/store/atoms/auth';
import { Base64 } from 'js-base64';
import { useRecoilValue } from 'recoil';
import PublicLandingPage from '@public-page/landingpage/pages/ViewPage';
import { GRAPHQL_HOST } from '@base/config/graphql';
interface LandingPageProps {
  id: string;
}

const LandingPage = (props: LandingPageProps) => {
  const { id } = props;

  const auth = useRecoilValue(authAtom);
  const { id: orgId, tenantId } = useOrg();
  const sToken = `D=${id}&P=${''}&S=${''}&C=${''}&U=${auth?.user?.id as string}&T=${tenantId}&O=${orgId}`;
  const publicUrl = `?${[`tk=${Base64.encode(sToken)}`, `readOnly=readOnly`].join('&')}`;
  //========================================================DEBUG========================================
  console.log(`%c Url:${GRAPHQL_HOST}/public/landingpage/view${publicUrl}`, 'font-size:24px;color: blue');
  //======================================================================================================
  return <PublicLandingPage  param={publicUrl} />;
};

export default LandingPage;
