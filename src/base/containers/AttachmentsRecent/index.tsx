import JSZip from 'jszip';
import React, { useEffect, useMemo, useState } from 'react';
import NoData from '@base/components/@hanbiro/NoData';
import { useDownloadObjectMutation, useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

import AttachmentCard from './AttachmentCard';
import { useAttachmentsByMenu } from '@base/hooks/attachment/useAttachmentsByMenu';
import { MENU_SOURCE } from '@base/config/menus';

interface TimeAttachmentsProps {
  listType?: string;
  menuSource: string;
  menuSourceId: string;
}

const zip = new JSZip();
const LIMIT = 100;

/**
 *
 * @param props
 * @returns
 */
const TimeAttachment = (props: TimeAttachmentsProps) => {
  let { listType = 'list', menuSource, menuSourceId } = props;
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  // state
  const [attachments, setAttachments] = useState<any>([]);
  // update menusource
  menuSource = MENU_SOURCE[menuSource] ?? menuSource;
  /** ================================= HOOK ====================================== */
  const { data, isLoading } = useAttachmentsByMenu(menuSource, menuSourceId, LIMIT);

  useEffect(() => {
    if (data?.results) {
      //// console.log('data hook', data?.results);
      setAttachments(data?.results);
    } else {
      setAttachments([]); //TEST_DATA
    }
  }, [data]);

  //download mutation

  //delete in state
  const handleRemoveItem = (id: string) => {
    const newAttachments = [...attachments];
    const fIndex = newAttachments.findIndex((_ele: any) => _ele.id === id);
    if (fIndex > -1) {
      newAttachments.splice(fIndex, 1);
    }
    setAttachments(newAttachments);
  };
  //render
  const AttachmentCardList = useMemo(() => {
    return (
      attachments.length > 0 &&
      attachments
        .slice(-3)
        .reverse()
        .map((_item: any, index: number) => {
          return (
            <AttachmentCard
              key={_item.id}
              listType={listType}
              menuSource={menuSource}
              menuSourceId={menuSourceId}
              item={_item}
              onRemoveItem={handleRemoveItem}
            />
          );
        })
    );
  }, [attachments]);
  return (
    <div className="pos-relative">
      {(attachments.length === 0 || isLoading) && <NoData icon={'FileText'} iconType={'feather'} />}

      {listType === 'list' && <>{AttachmentCardList}</>}
    </div>
  );
};

export default React.memo(TimeAttachment);
