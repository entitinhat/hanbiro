import { S3UploadedFile } from '@base/types/s3';
import * as keyNames from '@desk/ticket/config/keyNames';

export const finalizeParams = (
  formData: any,
  type: any,
  ticketId: any,
  ticketName: any,
  parentComment: any,
  files?: S3UploadedFile[]
) => {
  let newParams: any = {
    kind: type,
    ticket: { id: ticketId, name: ticketName },
    parent: { id: parentComment.id, name: parentComment.name }
  };
  //email
  if (formData[keyNames.KEY_TICKET_REPLY_TYPE].findIndex((_ele: any) => _ele.value === 'email') > -1) {
    let primaryEmailFrom: any = {};
    const foundEmail = formData[keyNames.KEY_TICKET_REPLY_FROM].emails?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
    if (foundEmail) {
      primaryEmailFrom = {
        id: formData[keyNames.KEY_TICKET_REPLY_FROM].id,
        name: formData[keyNames.KEY_TICKET_REPLY_FROM].name,
        email: foundEmail.email
      };
    }

    const primaryEmailTo: any[] = [];
    formData[keyNames.KEY_TICKET_REPLY_TO]?.map((_to: any) => {
      const foundEmail = _to.emails?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
      if (foundEmail) {
        primaryEmailTo.push({
          id: _to.id,
          name: _to.name,
          email: foundEmail.email
        });
      }
    });

    const primaryEmailCc: any[] = [];
    formData[keyNames.KEY_TICKET_REPLY_CC]?.map((_cc: any) => {
      const foundEmail = _cc.emails?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
      if (foundEmail) {
        primaryEmailCc.push({
          id: _cc.id,
          name: _cc.name,
          email: foundEmail.email
        });
      }
    });

    newParams.email = {
      subject: formData[keyNames.KEY_TICKET_REPLY_SUBJECT],
      from: [primaryEmailFrom],
      to: primaryEmailTo,
      cc: primaryEmailCc,
      content: formData[keyNames.KEY_TICKET_REPLY_MESSAGE],
      tpl: formData[keyNames.KEY_TICKET_REPLY_TEMPALTE]
        ? {
            id: formData[keyNames.KEY_TICKET_REPLY_TEMPALTE].id,
            name: formData[keyNames.KEY_TICKET_REPLY_TEMPALTE].name
          }
        : null,
      attachedFiles: files
    };
  }
  //sms
  if (formData[keyNames.KEY_TICKET_REPLY_TYPE].findIndex((_ele: any) => _ele.value === 'sms') > -1) {
    const primaryPhoneTo: any[] = [];
    let primaryPhoneFrom: any = {};
    const foundPhone = formData[keyNames.KEY_TICKET_REPLY_FROM].phones?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
    if (foundPhone) {
      primaryPhoneFrom = {
        id: formData[keyNames.KEY_TICKET_REPLY_FROM].id,
        name: formData[keyNames.KEY_TICKET_REPLY_FROM].name,
        phone: foundPhone.phone
      };
    }
    formData[keyNames.KEY_TICKET_REPLY_TO]?.map((_to: any) => {
      const foundPhone = _to.phones?.find((_ele: any) => _ele.label.label === 'LABEL_PRIMARY');
      if (foundPhone) {
        primaryPhoneTo.push({
          id: _to.id,
          name: _to.name,
          phone: foundPhone.phoneNumber
        });
      }
    });
    newParams.sms = {
      subject: formData[keyNames.KEY_TICKET_REPLY_SUBJECT],
      from: [primaryPhoneFrom],
      to: primaryPhoneTo,
      content: formData[keyNames.KEY_TICKET_REPLY_MESSAGE_SMS],
      tpl: formData[keyNames.KEY_TICKET_REPLY_TEMPALTE]
        ? {
            id: formData[keyNames.KEY_TICKET_REPLY_TEMPALTE].id,
            name: formData[keyNames.KEY_TICKET_REPLY_TEMPALTE].name
          }
        : null
    };
  }

  return newParams;
};
