import { isArray } from 'lodash';
import React, { useState } from 'react';

import TextView from '@base/containers/ViewField/Text/View';
import withLoading from '@base/hooks/hocs/withLoading';
import { Box, Link, Stack, useTheme } from '@mui/material';
import IconButton from '@base/components/@extended/IconButton';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';

export interface QuickViewComponentProps {
  id: string;
  setLoading?: (is: boolean) => void;
  [x: string]: any;
  onClose?: () => void;
}

interface QuickViewValue {
  id: string;
  name?: string;
  icon?: any;
}

interface TextAndPreviewModalProps {
  value: QuickViewValue[] | QuickViewValue;
  [x: string]: any;
}

export function withTextAndPreviewModal(QuickViewComponent: any, modalProps: any = {}) {
  return (props: TextAndPreviewModalProps) => {
    const { value, ...restProps } = props;
    const theme = useTheme();
    const [previewedData, setPreviewedData] = useState<any | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOnClick = (data: any, e: React.MouseEvent<HTMLElement>) => {
      if (!!e) {
        e.stopPropagation();
        e.preventDefault();
      }
      setPreviewedData(data);
      setOpen(true);
    };

    const handleOnClickModalWrapper = (e: any) => {
      if (e.target === e.currentTarget) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
    };

    const TextLink = ({ name, onClick }: any) => {
      return (
        <Link underline="none" onClick={onClick} href="#">
          <TextView value={name} />
        </Link>
      );
    };

    const QuickViewComponentWithLoading = withLoading(QuickViewComponent);
    const handleOnClose = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setOpen(false);
    };

    return (
      <Box>
        {!!value &&
          (isArray(value) ? (
            value.map((v: any, i: number) => {
              return (
                <Stack direction={'row'} spacing={1} alignItems="center">
                  {v?.icon && (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        handleOnClick(v, e);
                      }}
                    >
                      {v.icon}
                    </IconButton>
                  )}
                  {v?.name && (
                    <TextLink
                      name={v.name}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        handleOnClick(v, e);
                      }}
                    />
                  )}
                </Stack>
              );
            })
          ) : (
            <Stack direction={'row'} spacing={1} alignItems="center">
              {value?.icon && (
                <IconButton
                  size="small"
                  color="primary"
                  onClick={(e: any) => {
                    handleOnClick(value, e);
                  }}
                >
                  {value.icon}
                </IconButton>
              )}
              {value?.name && (
                <TextLink
                  name={value.name}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    handleOnClick(value, e);
                  }}
                />
              )}
            </Stack>
          ))}
        <div onClick={handleOnClickModalWrapper}>
          {previewedData && open && (
            <MiModal
              anchor={'right'}
              title={<SpanLang keyLang={modalProps?.title ?? previewedData?.name ?? ''} />}
              isOpen={open}
              size="md"
              fullScreen={false}
              onClose={handleOnClose}
              isCloseByBackdrop
            >
              <QuickViewComponentWithLoading id={previewedData?.id} {...restProps} onClose={handleOnClose} />
            </MiModal>
          )}
        </div>
      </Box>
    );
  };
}

export default withTextAndPreviewModal;
