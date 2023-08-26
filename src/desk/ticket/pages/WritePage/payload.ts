import { generateUUID } from '@base/utils/helpers';
import { isEmpty } from 'lodash';

export const finalizeParams = (formData: any) => {
  let newParams: any = {};
  //TODO
  // // console.log(formData);
  let { duration, dueDate, contact, category, channel, tags, assignedUser, assignedGroup, process, classifications, ...nTicketData } =
    formData;
  if (duration && typeof duration == 'object' && duration.duration) {
    nTicketData = {
      ...nTicketData,
      ...duration
    };
  }
  if (contact !== '' && !isEmpty(contact)) {
    nTicketData.contact = contact;
  }
  if (channel !== '' && !isEmpty(channel)) {
    nTicketData.channel = channel;
  }
  if (category !== '' && !isEmpty(category)) {
    nTicketData.category = category;
  }
  if (assignedUser !== '' && !isEmpty(assignedUser)) {
    nTicketData.assignedUser = assignedUser;
  }
  if (assignedGroup !== '' && !isEmpty(assignedGroup)) {
    nTicketData.assignedGroup = assignedGroup;
  }
  if (assignedGroup !== '' && !isEmpty(assignedGroup)) {
    nTicketData.assignedGroup = assignedGroup;
  }
  if (tags.length > 0) {
    nTicketData.tags = tags;
  }
  if (process !== '' && !isEmpty(process)) {
    nTicketData.process = process;
  }
  if (classifications.length > 0) {
    const nclassifications = classifications.map((_item: any) => {
      return {
        classification: _item.classification,
        value: _item.value
      };
    });
    nTicketData.classifications = nclassifications;
  }

  newParams = {
    ticket: {
      ...nTicketData,
      //fixed CTYPE_DIRECT_INPUT when create in web
      channelType: 'CTYPE_DIRECT_INPUT',
      id: generateUUID()
    }
  };
  return newParams;
};
