import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pageLayoutsAtom } from '@base/store/atoms/pagelayout';
import {
  getPagelayoutFromStorage,
  getPageLayoutForMenu,
  storePageLayoutToStorage,
} from '@base/services/pagelayoutService';
import { isUndefined } from 'lodash';

//get pagelayout from recoil or Indexed DB
export const usePageLayoutByMenu = (menu: string, mode: string) => {
  const [loading, setLoading] = useState(false);

  //get data from recoil
  const [pageLayouts, setPageLayouts] = useRecoilState(pageLayoutsAtom);
  let recoilMenu: any = pageLayouts.find((_ele: any) => _ele.menu === menu);
  let recoilData: any = recoilMenu?.data[mode];
  //// console.log('res recoilData', menu, mode, '===>', recoilData, new Date());

  //get data async
  useEffect(() => {
    async function get(menu: string, mode: string) {
      return await getPagelayoutFromStorage(menu, mode);
    }

    //recoilData is undefined, get from IndexedDB
    if (!recoilData) {
      //get from IndexedDB
      setLoading(true);
      get(menu, mode).then(async (res) => {
        if (res && res.data && res.data.length > 0) {
          let nPagelayouts = [...pageLayouts]; //pageLayouts ? pageLayouts : [];
          if (isUndefined(recoilMenu)) {
            let nData: any = {};
            nData[mode] = res;
            nPagelayouts.push({
              menu: menu,
              data: nData,
            });
          } else {
            let nData: any = {};
            nData[mode] = res;
            let nRecoilMenu = {
              ...recoilMenu,
              data: {
                ...recoilMenu.data,
                ...nData,
              },
            };

            nPagelayouts = nPagelayouts?.map((item: any) => {
              if (item.menu === menu) {
                return nRecoilMenu;
              }
              return item;
            });
          }
          // // console.log('res recoilData', menu, mode, '===>LS', res, new Date());
          setPageLayouts(nPagelayouts);
          setLoading(false);
        } else {
          //fetch data
          const layoutRes = await getPageLayoutForMenu(menu, 'desktop'); //call api
          if (layoutRes && layoutRes.list?.data?.length > 0) {
            //store to recoil
            let curPageLayouts = [...pageLayouts];
            const fIndex: number = curPageLayouts.findIndex((_ele: any) => _ele.menu === menu);
            //// console.log('curPageLayouts', curPageLayouts, fIndex);
            if (fIndex === -1) {
              curPageLayouts.push({
                menu: menu,
                data: layoutRes,
              });
              // // console.log('res recoilData', menu, mode, '===>API', layoutRes, new Date());
              setPageLayouts(curPageLayouts);
              //store to IndexedDB
              storePageLayoutToStorage(layoutRes);
            }
          }
          setLoading(false);
        }
      });
    }
  }, [menu, mode, recoilMenu]);

  return { data: recoilData, isLoading: loading };
};
