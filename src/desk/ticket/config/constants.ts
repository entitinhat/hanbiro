import Icon from '@base/assets/icons/svg-icons';
import { LabelValue, LabelValueIcon } from '@base/types/app';
import { MIMEType } from '@base/types/dropzone';

export const REPLY_TYPE_OPTIONS = [
  { value: 'email', label: 'ncrm_desk_ticket_email' },
  { value: 'sms', label: 'ncrm_desk_ticket_sms' }
];

export const TICKET_COMMENT_KIND_NEW = 'KIND_COMMENT';
export const TICKET_COMMENT_KIND_REPLY = 'KIND_REPLY';
export const TICKET_COMMENT_KIND_FORWARD = 'KIND_FORWARD';
export const TICKET_COMMENT_DISPLAY_PUBLIC = 'DISPLAY_PUBLIC';
export const TICKET_COMMENT_DISPLAY_PRIVATE = 'DISPLAY_PRIVATE';

// MIME types https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// "type/subtype" : [extensions]
export const AllowExtensions: MIMEType[] = [
  {
    type: 'image',
    subtype: 'png',
    extensions: ['.jpg', '.png', '.jpeg']
  },
  {
    type: 'application',
    subtype: 'json',
    extensions: ['.json']
  },
  {
    type: 'application',
    subtype: 'pdf',
    extensions: ['.pdf']
  },
  {
    type: 'application',
    subtype: 'zip',
    extensions: ['.zip']
  },
  {
    type: 'application',
    subtype: 'msword',
    extensions: ['.doc']
  }
];

export const TICKET_ADD_OPTIONS: any = {
  ticket: {
    name: 'Ticket'
    // icon: Icon('account')
  },
  article: {
    name: 'Article'
    // icon: Icon('contacts')
  },
  category: {
    name: 'Category'
  },
  folder: {
    name: 'Folder'
  }
};

export const ASSIGNED_REP_OPTIONS: LabelValue[] = [];
