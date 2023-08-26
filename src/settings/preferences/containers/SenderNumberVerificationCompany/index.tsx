import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import Button from '@base/components/form/button';

import * as keyNames from '@desk/ticket/config/keyNames';
import {
  AllowExtensions,
  TICKET_COMMENT_DISPLAY_PRIVATE,
  TICKET_COMMENT_DISPLAY_PUBLIC,
  TICKET_COMMENT_KIND_NEW
} from '@desk/ticket/config/constants';
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Suspense, useMemo } from 'react';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useTicketCommentMutation } from '@desk/ticket/hooks/useTicketCommentMutation';
import S3UploadFiles from '@base/containers/S3UploadFiles';
import { S3UploadedFile } from '@base/types/s3';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
interface SenderNumberVerificationProps {
  ticketId: string;
  ticketName: string;
  menuSource: string;
  onReload?: () => void;
  onClose: () => void;
  isOpen?: boolean;
  fullScreen?: boolean;
  title: string;
}
interface SubmitProps {
  isPublic: boolean;
  formData: {
    message: string;
    files: never[];
  };
}
/**
 * write form - use react-hook-form
 * @param {*} props
 * @returns
 */
const SenderNumberVerificationCompany: React.FC<SenderNumberVerificationProps> = (props) => {
  const { ticketId, ticketName, onReload, onClose, isOpen, title, menuSource } = props;
  const { t } = useTranslation();
  //state
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [startUpload, setStartUPload] = useState(false);
  const [submitData, setSubmitData] = useState<any>();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    //trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      [keyNames.KEY_TICKET_REPLY_MESSAGE]: '',
      [keyNames.KEY_TICKET_REPLY_FILE]: []
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //Mutation
  const { mutationAdd, mUpload } = useTicketCommentMutation();
  //responsive
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  //check success
  useEffect(() => {
    if (mutationAdd.isSuccess) {
      // refecth data
      onReload && onReload();
      onClose && onClose();
    }
  }, [mutationAdd.isSuccess]);

  const onUploadCompleted = (files: S3UploadedFile[]) => {
    console.log('onUploadCompleted', files);
    const params = {
      comment: {
        ticket: { id: ticketId, name: ticketName },
        kind: TICKET_COMMENT_KIND_NEW,
        comment: {
          content: submitData[keyNames.KEY_TICKET_REPLY_MESSAGE],
          display: isPublic ? TICKET_COMMENT_DISPLAY_PUBLIC : TICKET_COMMENT_DISPLAY_PRIVATE,
          attachedFiles: files
        }
      }
    };
    console.log('params: ', params);
    mutationAdd.mutate(params);
  };
  //submit form
  const onSubmit = ({ formData, isPublic }: SubmitProps) => {
    //upload files
    setSubmitData(formData);
    setIsPublic(isPublic);
    setStartUPload(true);
  };

  /** =============================== END UPLOAD HANDLER =========================== */

  const header = useMemo(() => {
    return (
      <>
        <Typography
          id="modal-modal-title"
          variant="h4"
          fontWeight={500}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {t(title)}
          <IconButton
            size="small"
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent !important'
              }
            }}
            onClick={() => onClose()}
          >
            <Close fontSize="small" />
          </IconButton>
        </Typography>
      </>
    );
  }, []);

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };

  //form fields
  const renderFields = () => {
    return (
      <>
        <Box marginX={3} marginY={'20px'}>
          <Typography gutterBottom> {t('ncrm_generalsetting_preferences_business_registration_number')}</Typography>
          <Stack direction="row" justifyContent={'space-between'} spacing={1.5}>
            <TextField sx={{ flexGrow: 1 }} />
            <TextField sx={{ flexGrow: 1 }} />
            <TextField sx={{ flexGrow: 1 }} />
          </Stack>
        </Box>
        <Box marginX={3} marginY={'20px'}>
          <Typography gutterBottom>
            {t('ncrm_generalsetting_preferences_activity_mobile_number')}
            <Typography color="error" component={'span'} sx={{ ml: 0.5 }}>
              *
            </Typography>
          </Typography>
          <TextField fullWidth required />
          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 1 }}>
            <Button variant="contained" size="small">
              {t('ncrm_generalsetting_preferences_get_verification_code')}
            </Button>
          </Box>
        </Box>
        <Box marginX={3} marginY={'20px'}>
          <Typography gutterBottom>
            {t('ncrm_generalsetting_preferences_verification_code')}
            <Typography color="error" component={'span'} sx={{ ml: 0.5 }}>
              *
            </Typography>
          </Typography>
          <TextField fullWidth required />
          <Box sx={{ display: 'flex', justifyContent: 'right', mt: 1 }}>
            <Button variant="contained" size="small" color="success" sx={{ py: 0.5 }}>
              {t('ncrm_generalsetting_preferences_verify_number')}
            </Button>
          </Box>
        </Box>
      </>
    );
  };
  //footer

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const onClick = () => {
    console.log('selectedIndex:', selectedIndex);
    if (selectedIndex == 1) {
      console.log('selectedIndex:', selectedIndex);
      handleSubmit((data) => onSubmit({ formData: data, isPublic: false }), onError)();
    }
    if (selectedIndex == 0) {
      console.log('selectedIndex:', selectedIndex);
      handleSubmit((data) => onSubmit({ formData: data, isPublic: true }), onError)();
    }
  };
  const handleToggle = (e: any) => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };
  // const options = [t('ncrm_common_btn_save_public'), t('ncrm_common_btn_save_private')]; //'Save as public', 'Save as Private'
  const footer = () => {
    return (
      <FormGroup sx={{ display: 'flex', padding: '10px 15px' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={() => onClose()}>
              {t('ncrm_common_btn_cancel')}
            </Button>

            {/* <ButtonGroup variant="contained" ref={anchorRef}> */}
            <Button
              variant="contained"
              size="small"
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
              onClick={onClick}
              disabled={mutationAdd.isLoading || mUpload.isLoading || !isValid}
            >
              {/* {options[selectedIndex]} */}
              {t('ncrm_common_btn_ok')}
            </Button>
            {/* <Button
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="menu"
                onClick={(e) => handleToggle(e)}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup> */}
            {/* <Popper
              sx={{
                zIndex: 2000
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              onResize={undefined}
              onResizeCapture={undefined}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center top'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            disabled={index === 2}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper> */}
          </Stack>
        </Box>
      </FormGroup>
    );
  };

  //render
  return (
    <Suspense fallback={<></>}>
      <Drawer sx={{ zIndex: theme.zIndex.modal }} anchor="right" open={isOpen} onClose={onClose}>
        <Stack sx={{ width: matchDownMd ? '100vw' : '900px' }} direction="column" divider={<Divider />}>
          <>
            {header}
            {renderFields()}
            {footer()}
          </>
        </Stack>
      </Drawer>
    </Suspense>
  );
};

export default SenderNumberVerificationCompany;
