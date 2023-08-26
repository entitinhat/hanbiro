// API
import { useSettingTicketForm } from '@settings/preferences/hooks/desk/useSettingTicketForm';
import { useAssignmentUsersChannel } from '@settings/preferences/hooks/desk/useAssignmentUsersChannel';
import { useChannelMutation } from '@settings/preferences/hooks/desk/useChannelMutation';
import { generateUUID } from '@base/utils/helpers/generalUtils';
import { DeskChannel, DeskChannelType, ListType } from '@settings/preferences/types/desk/channel';
import WriteFields from '../WriteFields';
import { useForm } from 'react-hook-form';
import validators from '@base/utils/validation/fieldValidator';
import * as keyNames from '@settings/preferences/config/keyNames';
import * as commonComponents from '@base/config/write-field/components';
import { Drawer, FormControlLabel, OutlinedInput, Radio, RadioGroup, Switch, Typography, useTheme, TextareaAutosize } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import ChannelTypeBox from '@settings/preferences/containers/DeskChannel/ChannelTypeBox';
import { ChannelType } from '@settings/preferences/types/desk/common';
import LandingPageAutocomplete from '@settings/digital/landing-page/containers/LandingPageAutocomplete';

interface propsIner {
  channelData?: any;
  openModal: boolean;
  handleClose: () => void;
  handleSetOption?: (item: ChannelType) => void; // Function => get value selected option via getOption props of ChannelTypeBox
  option?: ChannelType | string; // Value selected option via getOption props of ChannelTypeBox
}

function WriteChangeModal(props: propsIner) {
  const { channelData, openModal, handleClose, option, handleSetOption } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  console.log(channelData);

  // data: formNamOption, AssignRepUser, AssignRepGroup

  // handleSubmit: Add, Update
  const { mAdd, mUpdate } = useChannelMutation();

  const handleAddSubmit = (data: any) => {
    const { active, assignType, id, name, type, landingpage, realUrl, shortUrl, useAssign, assignedUsers, assignedGroups, description } =
      data;
    const channel: DeskChannel = {
      active,
      assignType,
      id,
      name,
      type,
      landingpage: {
        // Request data Landing Page Name to create channel by id + name
        id: landingpage.id,
        name: landingpage.name
      },
      realUrl,
      shortUrl,
      useAssign,
      assignedUsers:
        assignType === 'ATYPE_USER'
          ? assignedUsers.map((item: any) => {
              return { id: item.id, name: item.name };
            })
          : [],
      assignedGroups: assignType === 'ATYPE_GROUP' ? assignedGroups : [],
      description
    };
    if (!channelData) {
      mAdd.mutate({ channel });
    } else {
      mUpdate.mutate({ channel });
    }
    handleClose();
  };

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    handleAddSubmit(data);
    reset();
  };

  const defaultValues = {
    [keyNames.KEY_NAME_CHANNEL_ID]: channelData ? channelData.id : generateUUID(), // Channel id data
    [keyNames.KEY_NAME_CHANNEL_NAME]: channelData ? channelData.name : '', // Channel name data
    [keyNames.KEY_NAME_CHANNEL_TYPE]: channelData ? channelData.type : {}, // Channel type data
    [keyNames.KEY_NAME_CHANNEL_LANDINGPAGE]: channelData && channelData.landingpage ? channelData.landingpage : {}, // Channel landingpage data
    [keyNames.KEY_NAME_CHANNEL_REAL_URL]: channelData ? channelData.realUrl : 'https://desk.nncrm.io/landingpage', // Channel realUrl data
    [keyNames.KEY_NAME_CHANNEL_SHORT_URL]: channelData ? channelData.shortUrl : '', // Channel shortUrl data
    [keyNames.KEY_NAME_CHANNEL_INCOMING_URL]: channelData ? channelData.shortUrl : '', // Channel incomingUrl data
    [keyNames.KEY_NAME_CHANNEL_ACTIVE]: channelData ? channelData.active : true, // Channel active data
    [keyNames.KEY_NAME_CHANNEL_EMAIL]: channelData ? channelData.email : '', // Channel email data
    [keyNames.KEY_NAME_CHANNEL_CREATED_AT]: channelData ? channelData.createdAt : '', // Channel createdAt data
    [keyNames.KEY_NAME_CHANNEL_DESCRIPTION]: channelData ? channelData.description : '', // Channel description data
    [keyNames.KEY_NAME_CHANNEL_USEASSIGN]: channelData ? channelData.useAssign : true, // Channel useAssign data
    [keyNames.KEY_NAME_CHANNEL_ASSIGNTYPE]: channelData ? channelData.assignType : 'ATYPE_USER', // Channel assignType data
    [keyNames.KEY_NAME_CHANNEL_ASSIGNEDUSERS]: channelData?.assignedUsers
      ? channelData.assignedUsers.map((item: any) => {
          return { name: item.name, id: item.id };
        })
      : [], // Channel assignedUsers data
    [keyNames.KEY_NAME_CHANNEL_ASSIGNEDGROUPS]: channelData?.assignedGroups ? channelData.assignedGroups : [] // Channel assignedGroups data
  };

  // useForm
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset
  } = useForm({
    defaultValues,
    criteriaMode: 'all',
    mode: 'onChange'
  });

  const fields = [
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_name',
      keyName: keyNames.KEY_NAME_CHANNEL_NAME,
      validate: {
        required: validators.required
      },
      Component: OutlinedInput
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_type',
      keyName: keyNames.KEY_NAME_CHANNEL_TYPE,
      validate: {
        required: validators.required
      },
      Component: ChannelTypeBox, // Component select value from list channel types
      componentProps: {
        placeholder: channelData ? channelData.type : t('ncrm_generalsetting_preferences_desk_channel_type_box_placeholder'), // If channelData exist => Update => Display channelData.type
        getOption: handleSetOption // Passing handleSetOption via getOption prop
      }
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_landingpage_name',
      keyName: keyNames.KEY_NAME_CHANNEL_LANDINGPAGE,
      validate: {
        required: validators.required
      },
      Component: LandingPageAutocomplete,
      componentProps: {
        placeholder: t('ncrm_generalsetting_langdingpage_placeholder')
      }
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_real_url',
      keyName: keyNames.KEY_NAME_CHANNEL_REAL_URL,
      Component: OutlinedInput,
      componentProps: {
        disabled: true,
        sx: {
          pl: '10px',
          bgcolor: (t: any) => t.palette.grey[100],
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: `${theme.palette.grey[500]}` // Set color when disabled
          }
        }
      }
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_short_url',
      keyName: keyNames.KEY_NAME_CHANNEL_SHORT_URL,
      Component: OutlinedInput,
      validate: {
        required: validators.required
      },
      componentProps: {
        disabled: channelData ? true : false, // If channelData exist => Update => disable = true
        sx: {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: `${theme.palette.grey[500]}` // Set color when disabled
          }
        }
      }
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_incoming_url',
      keyName: keyNames.KEY_NAME_CHANNEL_INCOMING_URL,
      validate: {
        required: validators.required
      },
      Component: OutlinedInput,
      componentProps: {}
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_desk_channel_email',
      keyName: keyNames.KEY_NAME_CHANNEL_EMAIL,
      validate: {
        required: validators.required
      },
      Component: OutlinedInput,
      componentProps: {
        disabled: channelData ? true : false // If channelData exist => Update => disable = true
      }
    },
    {
      languageKey: 'ncrm_generalsetting_preferences_description',
      keyName: keyNames.KEY_NAME_CHANNEL_DESCRIPTION,
      Component: TextField,
      componentProps: {
        InputProps: {
          inputComponent: TextareaAutosize,
          inputProps: {
            style: {
              resize: 'vertical'
            }
          }
        }
      }
    }
    // {
    //   languageKey: 'ncrm_generalsetting_preferences_assigned_rep',
    //   keyName: keyNames.KEY_NAME_CHANNEL_USEASSIGN,
    //   Component: Switch,
    //   componentProps: {
    //     size: 'small'
    //   }
    // },
    // {
    //   languageKey: 'ncrm_generalsetting_preferences_assign',
    //   keyName: keyNames.KEY_NAME_CHANNEL_ASSIGNTYPE,
    //   Component: RadioGroup,
    //   componentProps: {
    //     sx: { flexDirection: 'row' },
    //     children: [
    //       <FormControlLabel
    //         sx={{ display: 'inline-block' }}
    //         key="ATYPE_USER"
    //         value="ATYPE_USER"
    //         control={<Radio />}
    //         label={t('ncrm_generalsetting_preferences_user')}
    //       />,
    //       <FormControlLabel
    //         sx={{ display: 'inline-block' }}
    //         key="ATYPE_GROUP"
    //         value="ATYPE_GROUP"
    //         control={<Radio />}
    //         label={t('ncrm_generalsetting_preferences_group')}
    //       />
    //     ]
    //   }
    // },
    // {
    //   keyName: keyNames.KEY_NAME_CHANNEL_ASSIGNEDUSERS,
    //   Component: AssignUserAutoComplete,
    //   componentProps: {
    //     single: false,
    //     placeholder: t('ncrm_generalsetting_preferences_assign_user_placeholder')
    //   }
    // },
    // {
    //   keyName: keyNames.KEY_NAME_CHANNEL_ASSIGNEDGROUPS,
    // Component: AssignGroupAutoComplete,
    //   componentProps: {
    //     single: false,
    //     placeholder: t('ncrm_generalsetting_preferences_assign_group_placeholder')
    //   }
    // },
  ];

  return (
    <Drawer
      anchor="right"
      open={openModal}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '500px',
          height: '100vh'
        }
      }}
      className="scroll-box"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
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
              {channelData
                ? t('ncrm_generalsetting_preferences_desk_update_channel')
                : t('ncrm_generalsetting_preferences_desk_create_channel')}
              <IconButton
                size="small"
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent !important'
                  }
                }}
                onClick={handleClose}
              >
                <Close fontSize="small" />
              </IconButton>
            </Typography>
          </>

          {/* WriteFields */}
          <WriteFields
            type={option || ChannelType.LANDING_PAGE} // Check => selected type to correctly display the create channel screen => Default type is Landing Page
            data={channelData}
            getValues={getValues}
            fields={fields}
            watch={watch}
            setValue={setValue}
            control={control}
            errors={errors}
            handleClose={handleClose}
          />
        </>
      </form>
    </Drawer>
  );
}

export default WriteChangeModal;
