import { ReactNode, useEffect } from 'react';

import useConfig from '@base/hooks/useConfig';
import { useLanguageByMenu } from '@base/services/i18n';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import { useFormatSettings } from '@settings/general/hooks/useFormatSetting';
import { useAppSetting } from '@base/hooks/user-setting/useAppSetting';
import { DefaultConfigProps } from '@base/types/config';
import useDevice from '@base/hooks/useDevice';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  children: ReactNode;
}

const Locales = ({ children }: Props) => {
  const { initAppSetting } = useConfig();
  const { appSetting, isLoading } = useAppSetting();
  useLanguageByMenu(['common', 'pagelayout', 'generalsetting']);

  dayjs.tz.setDefault('Asia/Seoul');

  // get countries, phones, defaultPhone
  useFormatSettings();

  // set isMobile, isDesktop, innerHeight, innerWidth to recoil
  useDevice();

  useEffect(() => {
    if (!isLoading && appSetting?.value) {
      try {
        const data = JSON.parse(appSetting.value as string) as DefaultConfigProps;
        initAppSetting(data);
      } catch (err) {}
    }
  }, [appSetting]);
  return <>{children}</>;
};

export default Locales;
