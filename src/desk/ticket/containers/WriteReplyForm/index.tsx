import SpanLang from '@base/components/@hanbiro/SpanLang';
import {
  Box,
  Button,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Drawer } from '@mui/material';
import * as keyNames from '@desk/ticket/config/keyNames';
import { Controller, useForm } from 'react-hook-form';
import { REPLY_TYPE_OPTIONS } from '@desk/ticket/config/constants';
import { finalizeParams } from './payload';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import TuiEditor from '@base/components/@hanbiro/TuiEditor';
import WriteField from '@base/containers/WriteField';
import validators from '@base/utils/validation/fieldValidator';
import { TemplateGroup } from '@base/types/app';
import SelectTemplate from '@base/containers/ViewField/SelectTemplate';
import CheckboxGroup from '@base/components/@hanbiro/CheckboxGroup';
import EmailPhoneAutoComplete from '@base/containers/EmailPhoneAutoComplete';
import { DatabaseOutlined } from '@ant-design/icons';
import KnowledgeBaseModal from '../KBModal';
import CloseIcon from '@mui/icons-material/Close';
import { useTicketCommentMutation } from '@desk/ticket/hooks/useTicketCommentMutation';
import { CommentKind, TicketComment } from '@desk/ticket/types/comment';
import { Template } from '@base/types/setting';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { NavLink, NavTabs } from './Styled';
import { useRecoilValue } from 'recoil';
import { authWithUserProfile } from '@base/store/selectors/user';
import S3UploadFiles from '@base/containers/S3UploadFiles';
import { S3UploadedFile } from '@base/types/s3';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';

interface WriteReplyFormProps {
  type?: string;
  ticketId?: string;
  ticketName?: string;
  menuSource?: string;
  parentComment?: TicketComment | null;
  onReload?: () => void;
  onClose: () => void;
  onOpen: () => void;
  isOpen?: boolean;
  fullScreen?: boolean;
  title: string;
}
const WriteReplyForm: React.FC<WriteReplyFormProps> = (props) => {
  const {
    isOpen,
    fullScreen = false,
    onClose,
    onReload,
    onOpen,
    //Migrate from WriteReplyForm ncrmv2
    type, //reply, forward
    ticketId,
    ticketName,
    menuSource,
    parentComment,
    title
  } = props;

  //state
  const [isOpenKB, setIsOpenKB] = useState<boolean>(false);
  const [activeReply, setActiveReply] = useState({
    email: true,
    sms: false,
    call: false,
    fax: false
  });

  const [originMsg, setOriginMsg] = useState<string>('');
  const [insertedArticles, setInsertedArticles] = useState<KnowledgeBase[]>([]);
  const userProfile = useRecoilValue(authWithUserProfile);
  const [submitData, setSubmitData] = useState<any>();
  const [startUpload, setStartUPload] = useState(false);
  const { t } = useTranslation();

  // const setInsertedArtile = useSetRecoilState(insertedArticleAtom);

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    //trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      [keyNames.KEY_TICKET_REPLY_TYPE]: [REPLY_TYPE_OPTIONS[0]],
      [keyNames.KEY_TICKET_REPLY_SUBJECT]: '',
      [keyNames.KEY_TICKET_REPLY_FROM]: {
        label: userProfile?.displayName ?? '',
        value: userProfile?.id ?? '',
        name: userProfile?.displayName ?? '',
        id: userProfile?.id ?? '',
        emails: [
          {
            email: userProfile?.primaryEmail ?? '', //TODO: email
            label: { languageKey: 'ncrm_common_label_primary', label: 'LABEL_PRIMARY' }
          }
        ],
        phones: [
          {
            phoneNumber: userProfile?.primaryPhone ?? '', //TODO: phone
            label: { languageKey: 'ncrm_common_label_primary', label: 'LABEL_PRIMARY' }
          }
        ]
      }, //TODO: set user login
      [keyNames.KEY_TICKET_REPLY_TO]: null,
      [keyNames.KEY_TICKET_REPLY_CC]: null,
      [keyNames.KEY_TICKET_REPLY_KB]: [],
      [keyNames.KEY_TICKET_REPLY_TEMPALTE]: null,
      [keyNames.KEY_TICKET_REPLY_MESSAGE]: '',
      [keyNames.KEY_TICKET_REPLY_MESSAGE_SMS]: '',
      [keyNames.KEY_TICKET_REPLY_FILE]: []
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  console.log('parentComment', parentComment);
  //init default value
  useEffect(() => {
    if (parentComment) {
      //init subject
      let replySubject = type === CommentKind.REPLY ? 'Re: ' : 'Fwd: ';
      if (parentComment?.kind === 'KIND_REPLY' || parentComment?.kind === 'KIND_FORWARD') {
        if (parentComment?.email) {
          replySubject += parentComment.email.subject;
        } else if (parentComment?.sms) {
          replySubject += parentComment.sms.subject;
        }
      }
      setValue(keyNames.KEY_TICKET_REPLY_SUBJECT, replySubject);

      //init To
      let replyTo: any = [];
      if (type !== CommentKind.FORWARD) {
        replyTo = [
          {
            label: parentComment?.createdBy.name,
            value: parentComment?.createdBy.id,
            name: parentComment?.createdBy.name,
            id: parentComment?.createdBy.id,
            emails: [
              {
                email: 'hanbirotest@desk.io', //TODO: email
                label: { languageKey: 'ncrm_common_label_primary', label: 'LABEL_PRIMARY' }
              }
            ],
            phones: [
              {
                phoneNumber: '0123456789', //TODO: phone
                label: { languageKey: 'ncrm_common_label_primary', label: 'LABEL_PRIMARY' }
              }
            ]
          }
        ];
      }
      setValue(keyNames.KEY_TICKET_REPLY_TO, replyTo);

      //init cc
      let replyCc: any = [];
      if (parentComment?.email?.cc) {
        //TODO
        setValue(keyNames.KEY_TICKET_REPLY_CC, replyCc);
      }

      //init reply message
      let blockquote = '<p></p>';
      //On Web, 10 Aug at 10:10AM, Sarah Jones \&#60;sarah@vn.vn\&#62; wrote:
      let content = '<p>On ';
      content += convertDateTimeServerToClient({
        date: parentComment.createdAt,
        formatOutput: 'ddd, DD MMM YYYY'
      });
      content += ' at ';
      content += convertDateTimeServerToClient({
        date: parentComment.createdAt,
        isTime: true,
        formatOutput: 'HH:mm:ss'
      });
      content += ', ';
      content += parentComment.createdBy.name;
      if (parentComment.email) {
        content += ` \&#60;${parentComment.email.from}\&#62; wrote: </p>`;
        content += parentComment.email.content;
        blockquote += `<blockquote>${content}</blockquote>`;
      } else if (parentComment.sms) {
        content += ` \&#60;${parentComment.sms.from}\&#62; wrote: </p>`;
        content += parentComment.sms.content;
        blockquote += `<blockquote>${content}</blockquote>`;
      } else if (parentComment.comment) {
        content += ` wrote: </p>`; //TODO: createdBy email here
        content += parentComment.comment.content;
        blockquote += `<blockquote>${content}</blockquote>`;
      }
      blockquote += '<p></p>';
      // console.log('blockquote', blockquote);
      setValue(keyNames.KEY_TICKET_REPLY_MESSAGE, blockquote);
      setOriginMsg(blockquote);

      //init attached files
      if (type === CommentKind.FORWARD) {
        let attachedFiles: any = [];
        if (parentComment?.email) {
          attachedFiles = parentComment.email.attachedFiles;
        } else if (parentComment?.sms) {
          attachedFiles = parentComment.sms.attachedFiles;
        }
        setValue(keyNames.KEY_TICKET_REPLY_FILE, attachedFiles);
      }
    }
  }, [parentComment]);

  //create mutation
  const { mutationAdd, mUpload } = useTicketCommentMutation();

  //check success
  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess) {
      // refecth data
      onReload && onReload();
      onClose && onClose();
    }
  }, [mutationAdd.isSuccess]);

  //field value watching
  const typeValue = watch(keyNames.KEY_TICKET_REPLY_TYPE);
  const kbValue = watch(keyNames.KEY_TICKET_REPLY_KB);

  //confirm
  const handleConfirmChangeTemplate = (templateValue: Template) => {
    //const templateValue: any = getValues(keyNames.KEY_TICKET_REPLY_TEMPALTE);
    //add content to editor
    let curMessage: string = '';
    if (templateValue) {
      try {
        let tplHtml = JSON.parse(templateValue.html ?? '{}');
        curMessage = tplHtml.html;
      } catch (e) {
        //error
      }
    } else {
      curMessage = originMsg;
    }
    //if kb if any
    if (kbValue?.length > 0) {
      kbValue.map((_ele: any) => {
        curMessage += `${_ele.content}`;
      });
    }

    activeReply.email && setValue(keyNames.KEY_TICKET_REPLY_MESSAGE, curMessage);
    activeReply.sms && setValue(keyNames.KEY_TICKET_REPLY_MESSAGE_SMS, curMessage);
  };

  //submit form
  const onSubmit = (formData: any) => {
    // //upload files
    // // console.log('formData==================>', formData);
    // const uploadFiles = formData[keyNames.KEY_TICKET_REPLY_FILE];
    // if (uploadFiles?.length > 0) {
    //   if (curFileIndex === -1) {
    //     setCurFileIndex(lastUploadedFileIndex === -1 ? 0 : lastUploadedFileIndex + 1);
    //   }
    // } else {
    //   const params = finalizeParams(formData, type, ticketId, ticketName, parentComment);
    //   mutationAdd.mutate({ comment: params });
    // }

    //upload files
    setSubmitData(formData);
    setStartUPload(true);
  };

  const onUploadCompleted = (files: S3UploadedFile[]) => {
    //upload files
    // console.log('formData==================>', formData);
    const uploadFiles = submitData[keyNames.KEY_TICKET_REPLY_FILE];
    console.log('S3UploadedFile', files);

    const params = finalizeParams(submitData, type, ticketId, ticketName, parentComment, files);
    console.log('generated params:', params);
    mutationAdd.mutate({ comment: params });
  };
  //when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };

  //set KB value
  const handleKBChange = (articles: KnowledgeBase[]) => {
    const templateValue: any = getValues(keyNames.KEY_TICKET_REPLY_TEMPALTE);
    //check exist and push
    const curArticles: any = [...getValues(keyNames.KEY_TICKET_REPLY_KB)];
    articles.map((_item) => {
      const fIdx = curArticles.findIndex((_ele: KnowledgeBase) => _ele.id === _item.id);
      if (fIdx === -1) {
        curArticles.push(_item);
      }
    });
    setValue(keyNames.KEY_TICKET_REPLY_KB, curArticles);
    setInsertedArticles(curArticles);
    //add content to editor
    let curMessage: string = originMsg;
    if (templateValue) {
      try {
        let tplHtml = JSON.parse(templateValue.html);
        //console.log('tplHtml', tplHtml);
        curMessage = tplHtml.html;
      } catch (e) {
        //error
      }
    }
    curArticles.map((_ele: any) => {
      curMessage += `${_ele.content}`;
    });
    setValue(keyNames.KEY_TICKET_REPLY_MESSAGE, curMessage);
  };

  //remove kb
  const handleRemoveKb = (index: number) => {
    const templateValue: any = getValues(keyNames.KEY_TICKET_REPLY_TEMPALTE);
    const newItems = [...kbValue];
    newItems.splice(index, 1);
    setValue(keyNames.KEY_TICKET_REPLY_KB, newItems);
    setInsertedArticles(newItems);
    //add content to editor
    let curMessage: string = originMsg;
    if (templateValue) {
      try {
        let tplHtml = JSON.parse(templateValue.html);
        //console.log('tplHtml', tplHtml);
        curMessage = tplHtml.html;
      } catch (e) {
        //error
      }
    }
    newItems.map((_ele: any) => {
      curMessage += `${_ele.content}`;
    });
    setValue(keyNames.KEY_TICKET_REPLY_MESSAGE, curMessage);
  };

  const renderTypeTabs = () => {
    return (
      <NavTabs>
        {typeValue.findIndex((_ele: any) => _ele.value === 'email') > -1 && (
          <NavLink
            type="button"
            className={activeReply.email ? 'active' : 'false'}
            onClick={() => setActiveReply({ email: true, sms: false, call: false, fax: false })}
          >
            {t('ncrm_desk_ticket_email')}
          </NavLink>
        )}
        {typeValue.findIndex((_ele: any) => _ele.value === 'sms') > -1 && (
          <NavLink
            type="button"
            className={activeReply.sms ? 'active' : 'false'}
            onClick={() => {
              setActiveReply({ email: false, sms: true, call: false, fax: false });
            }}
          >
            {t('ncrm_desk_ticket_sms')}
          </NavLink>
        )}
      </NavTabs>
    );
  };

  //form fields

  const theme = useTheme();
  //responsive
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const Title = useMemo(() => {
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
  const renderFields = () => {
    return (
      <Box
        className="scroll-box"
        sx={{
          height: 'calc(100vh - 100px)',
          padding: '15px'
        }}
      >
        <WriteField
          item={{
            keyName: keyNames.KEY_TICKET_REPLY_TYPE,
            Component: CheckboxGroup,
            columns: 1,
            componentProps: {
              options: REPLY_TYPE_OPTIONS,
              isVertical: false
            },
            languageKey: 'ncrm_desk_ticket_type_of_reply',
            section: 0,
            tooltipShow: false
          }}
          control={control}
          errors={errors}
        />
        {renderTypeTabs()}
        <Grid
          sx={{ padding: '15px', border: `1px solid ${theme.palette.divider}`, borderRadius: '0.25rem', borderTop: 0 }}
          container
          rowSpacing={1}
          alignItems="center"
        >
          {/* Subject */}
          <WriteField
            item={{
              keyName: keyNames.KEY_TICKET_REPLY_SUBJECT,
              Component: TextField,
              columns: 1,
              componentProps: {},

              languageKey: 'ncrm_desk_ticket_subject', //Subject
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
          {/* From */}
          <WriteField
            item={{
              keyName: keyNames.KEY_TICKET_REPLY_FROM,
              Component: EmailPhoneAutoComplete,
              columns: 1,
              componentProps: {
                single: true,
                showAvatar: true,
                showEmail: `${activeReply.email ? true : false}`,
                showPhone: `${!activeReply.email ? true : false}`,
                isDisabled: true
              },

              languageKey: 'ncrm_desk_ticket_from', //From
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
          {/* To */}
          <WriteField
            item={{
              keyName: keyNames.KEY_TICKET_REPLY_TO,
              Component: EmailPhoneAutoComplete,
              columns: 1,
              componentProps: {
                showAvatar: true,
                showEmail: `${activeReply.email ? true : false}`,
                showPhone: `${!activeReply.email ? true : false}`
              },

              languageKey: 'ncrm_desk_ticket_to',
              section: 0,
              tooltipShow: false,
              validate: {
                required: validators.required
              }
            }}
            control={control}
            errors={errors}
          />
          {/* CC */}
          {activeReply.email && (
            <WriteField
              item={{
                keyName: keyNames.KEY_TICKET_REPLY_CC,
                Component: EmailPhoneAutoComplete,
                columns: 1,
                componentProps: {
                  showAvatar: true,
                  showEmail: `${activeReply.email ? true : false}`,
                  showPhone: `${!activeReply.email ? true : false}`
                },

                languageKey: 'ncrm_desk_ticket_cc',
                section: 0,
                tooltipShow: false
              }}
              control={control}
              errors={errors}
            />
          )}
          {/* Select Template */}
          {!activeReply.fax && (
            <>
              {!activeReply.call && (
                <Grid item xs={12}>
                  <Stack spacing={0.5}>
                    <Tooltip title="" placement="top">
                      <InputLabel sx={{ display: 'flex' }}>
                        <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'ncrm_desk_ticket_message'} />
                        <Box component="span" sx={{ ml: '5px', color: theme.palette.error.dark }}>
                          *
                        </Box>
                      </InputLabel>
                    </Tooltip>
                    <Stack direction="row" spacing={0.5}>
                      <Button
                        size="small"
                        sx={{
                          color: theme.palette.secondary.main,
                          borderColor: theme.palette.secondary.main,
                          '&:hover': {
                            color: theme.palette.common.white,
                            backgroundColor: theme.palette.secondary.main,
                            borderColor: theme.palette.secondary.main
                          }
                        }}
                        onClick={() => setIsOpenKB(true)}
                        variant="outlined"
                        startIcon={<DatabaseOutlined />}
                      >
                        {t('ncrm_desk_ticket_knowledgebase')}
                      </Button>
                      <Grid item xs={6}>
                        <Controller
                          name={keyNames.KEY_TICKET_REPLY_TEMPALTE}
                          control={control}
                          render={({ field: { value, onChange } }: any) => (
                            <SelectTemplate
                              useSelectBox={true}
                              useItemTable={false}
                              value={value}
                              onChange={(newValue: any) => {
                                onChange(newValue);
                                handleConfirmChangeTemplate(newValue);
                              }}
                              templateGroup={activeReply.email ? TemplateGroup.EMAIL : TemplateGroup.SMS}
                            />
                          )}
                        />
                      </Grid>
                    </Stack>
                    {/* KB items */}
                    {kbValue.length > 0 && (
                      <List sx={{ width: '100%' }}>
                        {kbValue.map((_item: KnowledgeBase, index: number) => (
                          <ListItem
                            sx={{ marginBottom: '3px', bgcolor: theme.palette.primary.lighter, borderRadius: '0.25rem' }}
                            secondaryAction={
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    backgroundColor: 'transparent'
                                  }
                                }}
                                data-han-tooltip="Delete"
                                onClick={() => handleRemoveKb(index)}
                              >
                                <CloseIcon />
                              </IconButton>
                            }
                            key={index}
                          >
                            <ListItemText primary={_item.subject} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Stack>
                </Grid>
              )}
              {activeReply?.email && (
                <WriteField
                  item={{
                    keyName: keyNames.KEY_TICKET_REPLY_MESSAGE,
                    Component: TuiEditor,
                    columns: 1,
                    componentProps: {},
                    section: 0,
                    tooltipShow: false
                  }}
                  control={control}
                  errors={errors}
                />
              )}
              {activeReply?.sms && (
                <WriteField
                  item={{
                    keyName: keyNames.KEY_TICKET_REPLY_MESSAGE_SMS,
                    Component: TuiEditor,
                    columns: 1,
                    componentProps: {},
                    section: 0,
                    tooltipShow: false
                  }}
                  control={control}
                  errors={errors}
                />
              )}
            </>
          )}
          {/* Upload File */}
          {(activeReply.email || activeReply.fax) && (
            <WriteField
              item={{
                keyName: keyNames.KEY_TICKET_REPLY_FILE,
                Component: S3UploadFiles,
                columns: 1,
                componentProps: {
                  onUploadCompleted: onUploadCompleted,
                  startUpload: startUpload
                },
                section: 0,
                languageKey: `${activeReply.fax ? 'ncrm_desk_ticket_image' : 'ncrm_desk_ticket_attached'}_file`,
                tooltipShow: false
              }}
              control={control}
              errors={errors}
            />
          )}
        </Grid>
      </Box>
    );
  };
  const Footer = useMemo(() => {
    return (
      <FormGroup sx={{ display: 'flex', padding: '10px 15px' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={() => onClose()}>
              {t('ncrm_common_btn_cancle')}
            </Button>
            <Button
              size="small"
              disabled={mutationAdd.isLoading || mUpload.isLoading || !isValid}
              color="primary"
              variant="contained"
              onClick={() => {
                handleSubmit((data) => onSubmit(data), onError)();
              }}
            >
              {t('ncrm_common_btn_send')}
            </Button>
          </Stack>
        </Box>
      </FormGroup>
    );
  }, [mutationAdd.isLoading || mUpload.isLoading || isValid]);

  //==========================================Debug=========================================
  console.log('Inserted KB', kbValue);
  //============================================================================================
  return (
    <Suspense fallback={<></>}>
      <Drawer sx={{ zIndex: theme.zIndex.modal }} open={isOpen} anchor="right" onClose={onClose}>
        <Stack
          component="form"
          sx={{ width: matchDownMd ? '100vw' : '900px', height: '100vh' }}
          className="scroll-box"
          direction="column"
          divider={<Divider />}
        >
          {Title}
          {renderFields()}
          {Footer}
        </Stack>
        {isOpenKB && (
          <KnowledgeBaseModal
            handleRemoveKb={handleRemoveKb}
            articles={kbValue}
            isOpen={isOpenKB}
            onClose={() => setIsOpenKB(false)}
            onChange={handleKBChange}
          />
        )}
      </Drawer>
    </Suspense>
  );
};

export default WriteReplyForm;
