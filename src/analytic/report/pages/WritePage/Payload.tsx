export const finalizeParams = (formData: any) => {
  let newParams: any = {
    name: formData.name,
    subject: formData.subject,
    content: formData.content,
    active: true
  };
  if (formData?.reportingContent) {
    newParams = {...newParams, ...formData.reportingContent};
  }
  if (formData?.recipients) {
    newParams = {...newParams, recipients: formData.recipients};
  }
  if (formData?.assignmentGroup) {
    newParams = {...newParams, ...formData.assignmentGroup};
  }
  if (formData?.dateRange) {
    newParams = {...newParams, dateRange: formData.dateRange};
  }
  if (formData?.reportingCycle) {
    newParams = {...newParams, reportingCycle: formData.reportingCycle};
  }
  return newParams;
};
