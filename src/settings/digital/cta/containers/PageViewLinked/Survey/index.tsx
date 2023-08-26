import { useOrg } from '@base/hooks/iam/useOrg';
import { authAtom } from '@base/store/atoms/auth';
import { Base64 } from 'js-base64';
import { useRecoilValue } from 'recoil';
import PublicSurvey from '@public-page/survey/pages/ViewPage';
import { GRAPHQL_HOST } from '@base/config/graphql';
interface SurveyProps {
  id: string;
}

const Survey = (props: SurveyProps) => {
  const { id } = props;
  const auth = useRecoilValue(authAtom);
  const { id: orgId, tenantId } = useOrg();
  const sToken = `D=${id}&P=${''}&S=${''}&C=${''}&U=${auth?.user?.id as string}&T=${tenantId}&O=${orgId}`;
  const publicUrl = `?${[`tk=${Base64.encode(sToken)}`, `readOnly=readOnly`].join('&')}`;

  //==============================================================Debug==============================================
  console.log(`%c URL:${GRAPHQL_HOST}/public/survey/view${publicUrl}`, 'font-size:24px;color: blue');
  //==============================================================Debug================================

  return <PublicSurvey param={publicUrl} />;
};

export default Survey;
