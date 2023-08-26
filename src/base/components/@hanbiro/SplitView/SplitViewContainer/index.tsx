import React, { FunctionComponent, memo, useMemo } from 'react';
import { ListType } from '@base/types/app';
import { Params, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { deviceAtom, pageDataByMenuAtom } from '@base/store/atoms';
import { MENU_ACTIVITY } from '@base/config/menus';
import useDevice from '@base/hooks/useDevice';
import RetryErrorBoundary from '../../Errors/RetryErrorBoundary';

interface ChildrenProps {
  isSplitMode: boolean;
  category?: string;
}

interface SplitViewContainerProps {
  getPageDataKey?: (params: Params) => string;
  children?: FunctionComponent<ChildrenProps>;
}

const SplitViewContainer = (props: SplitViewContainerProps) => {
  const { getPageDataKey, children: ChildrenComponent } = props;

  const params = useParams();
  const category = params?.['category'];
  const { isMobile } = useDevice();
  const pageDataKey: string = !!getPageDataKey ? getPageDataKey(params) : category ?? MENU_ACTIVITY;
  const { listType } = useRecoilValue(pageDataByMenuAtom(pageDataKey));
  const isSplitMode = !isMobile && listType === ListType.SPLIT;

  const childrenRender = useMemo(() => {
    return () => {
      return ChildrenComponent && <ChildrenComponent isSplitMode={isSplitMode} category={category} />;
    };
  }, [listType, params['*'], isMobile]);

  return <RetryErrorBoundary>{!!ChildrenComponent && childrenRender()}</RetryErrorBoundary>;
};

export default memo(SplitViewContainer);
