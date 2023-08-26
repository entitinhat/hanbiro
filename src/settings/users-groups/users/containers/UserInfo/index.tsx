// import { useState } from 'react';
// import { default as viewFieldsConfig } from '@demo-page/users/config/view-fields';

// import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
// import * as keyNames from '@directory/users/config/keyNames';

// import MainCard from '@base/components/App/MainCard';
// import { Box } from '@mui/material';
// import { User } from '@directory/users/types/user';
// import UserEmails from '../UserEmails';
// interface UserInfoProps {
//   menuSource: string;
//   menuSourceId: string;
//   layoutData: User;
//   handleSave: (keyNames: string, isSuccess: boolean, value: any) => void;
// }
// const UserInfo = (props: UserInfoProps) => {
//   const { menuSource, menuSourceId, layoutData, handleSave } = props;
//   //state
//   const [showAdd, setShowAdd] = useState(false);
//   const [fullScreen, setFullScreen] = useState(false);

//   //build fields by config
//   const buildFieldConfig = (data: any, keyName: string, languageKey: string) => {
//     return {
//       // config: customerViewConfig[keyName],
//       config: viewFieldsConfig[keyName],
//       data,
//       keyName,
//       languageKey,
//       userPermission: { isEdit: true, isShow: true }
//     };
//   };
//   let groupsBasicFields: any[] = [];
//   if (layoutData) {
//     groupsBasicFields.push(buildFieldConfig(layoutData.displayName, keyNames.KEY_USER_DISPLAY_NAME, 'Display Name'));
//     groupsBasicFields.push(buildFieldConfig(layoutData.fullName, keyNames.KEY_USER_FULLNAME, 'Full Name'));
//     groupsBasicFields.push(buildFieldConfig(layoutData.urlName, keyNames.KEY_USER_URL_NAME, 'URL Name'));
//     groupsBasicFields.push(buildFieldConfig(layoutData?.createdAt, keyNames.KEY_USER_CREATEDDAT, 'Signed Up'));
//   }
//   return (
//     <>
//       <MainCard sx={{ width: '100%' }} border={true}>
//         <Box sx={{ marginBotton: 10}}>
//           <ViewFields
//             fields={groupsBasicFields}
//             ignoreFields={[]}
//             menuSource={menuSource} //data?.category === 'CATEGORY_ACCOUNT' ? 'customer_account' : 'customer_contact'
//             menuSourceId={menuSourceId}
//             onSave={handleSave}
//           />
//         </Box>
//       </MainCard>
//     </>
//   );
// };

// export default UserInfo;
