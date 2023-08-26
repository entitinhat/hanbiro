import { useRecoilValue } from 'recoil';
import { pageDataByMenuAtom } from '@base/store/atoms';
import useDevice from './useDevice';
import { ListType } from '@base/types/app';

const useIsSplitMode = (layoutKey: string) => {
  const { isMobile } = useDevice();
  const { listType } = useRecoilValue(pageDataByMenuAtom(layoutKey));
  const isSplitMode = !isMobile && listType === ListType.SPLIT;
  return isSplitMode;
};

export default useIsSplitMode;
