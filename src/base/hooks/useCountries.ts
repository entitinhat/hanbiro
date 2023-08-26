// import { useEffect } from 'react';
// import { useSetRecoilState } from 'recoil';

// import { usePost } from '@base/hooks/usePost';
// import { GET_AVAILABLE_COUNTRIES } from '@base/services/graphql/setting';
// import { Country, SettingSelectionPayload } from '@base/types/setting';
// import {  defaultPhoneAtom, phonesAtom } from '@base/store/atoms';

// export const useCountries = () => {
//   const { data, isLoading } = usePost<SettingSelectionPayload>(['usedCountries'], GET_AVAILABLE_COUNTRIES, {});

//   const setCountries = useSetRecoilState(countriesAtom);
//   const setPhones = useSetRecoilState(phonesAtom);
//   const setDefaultPhone = useSetRecoilState(defaultPhoneAtom);

//   useEffect(() => {
//     if (!isLoading && data) {
//       let countries: any = [];
//       let phones: any = [];
//       data.results?.map((country: Country) => {
//         countries.push({
//           ...country,
//           value: country?.isoCode2,
//           label: country?.country
//         });
//         phones.push({
//           value: country?.phoneCode,
//           label: country?.phoneCode,
//           isDefault: country?.isDefault
//         });
//       });
//       const defaultPhone = phones?.find((item: any) => item?.isDefault);
//       setCountries(countries);
//       setPhones(phones);
//       setDefaultPhone(defaultPhone);
//     }
//   }, [data, isLoading]);
// };
