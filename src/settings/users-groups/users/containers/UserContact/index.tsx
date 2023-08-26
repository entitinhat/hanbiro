// import MainCard from '@base/components/App/MainCard';
// import { Email, Phone, User } from '@directory/users/types/user';
// import { Grid } from '@mui/material';
// import { useEffect, useState } from 'react';
// import UserEmails from '../UserEmails';
// import UserPhones from '../UserPhones';

// interface UserContactProps {
//   menuSource: string;
//   menuSourceId: string;
//   layoutData: User;
//   mode?: 'view' | 'write';
//   onChange?: (value: any) => void;
//   refetch?: () => void;
// }
// const UserContact = (props: UserContactProps) => {
//   const { menuSource, menuSourceId, layoutData, mode = 'write', onChange, refetch } = props;

//   const [contact, setContact] = useState<{ emails: Email[]; phones: Phone[] }>({ emails: [], phones: [] });

//   console.log('layoutData', layoutData);
//   // const handleChange = (keyname: string, value: any) => {
//   //   const nValue = {
//   //     ...contact,
//   //     [keyname]: value
//   //   };
//   //   setContact(nValue);
//   //   onChange && onChange(nValue);
//   // };
//   useEffect(() => {
//     if (layoutData) {
//       setContact({
//         emails: layoutData?.emails ?? [],
//         phones: layoutData?.phones ?? []
//       });
//     }
//   }, [layoutData]);
//   return (
//     <MainCard sx={{ width: '100%' }} border={true}>
//       <Grid container sx={{ p: '20px' }}>
//         <Grid item xs={6}>
//           <UserEmails value={contact?.emails} menuSource={menuSource} menuSourceId={menuSourceId} refetch={refetch} />
//         </Grid>
//         <Grid item xs={6}>
//           <UserPhones value={contact?.phones} menuSource={menuSource} menuSourceId={menuSourceId} refetch={refetch} />
//         </Grid>
//       </Grid>
//     </MainCard>
//   );
// };

// export default UserContact;
