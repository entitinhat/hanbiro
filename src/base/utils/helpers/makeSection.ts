//project
import { Activity } from '@activity/types/activity';
import { Note } from '@base/types/note';
import { DatasPromise } from '@base/types/response';
import { Timeline } from '@base/types/timeLine';
import { getDateTimeFormat } from './generalUtils';
//third-party
import dayjs from 'dayjs';
import { InfiniteData } from '@tanstack/react-query'; //v4

export function makeSection<T extends Note | Timeline | Activity>(data: InfiniteData<DatasPromise<T[]>> | undefined) {
  const sections: { [key: string]: T[] } = {};

  data?.pages.forEach((page) => {
    page.data?.forEach((item) => {
      let monthDate: string = dayjs(item.createdAt).format(getDateTimeFormat({ isTime: false }));
      if (Array.isArray(sections[monthDate])) {
        sections[monthDate].push(item);
      } else {
        sections[monthDate] = [item];
      }
    });
  });
  return sections;
}
