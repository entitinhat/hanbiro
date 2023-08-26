export const finalizeParams = (formData: any) => {
  console.log('formDatafinalizeParams', formData);
  
    let inputFormData = { ...formData };
    let newParams: any = {
      ...inputFormData,
      phones: inputFormData.phone == '' ? null :  inputFormData.phone
      ?.filter((_ele: any) => _ele.phoneNumber?.length > 0)
      ?.map((_ele: any) => ({
        label: _ele.label.label,
        country: _ele.country,
        extension: _ele.extension,
        labelValue: _ele.labelValue,
        phoneNumber: _ele.phoneNumber
      })) ,
      mobiles: inputFormData.mobile == '' ? null :  inputFormData.mobile
      ?.filter((_ele: any) => _ele.mobileNumber?.length > 0)
      ?.map((_ele: any) => ({
        ..._ele,
        label: _ele.label.label
      })) ,
      emails: inputFormData.email == '' ? null :  inputFormData.email
      ?.filter((_ele: any) => _ele.email?.length > 0)
      ?.map((_ele: any) => ({
        label: _ele.label.label,
        labelValue: _ele.labelValue,
        email: _ele.email
      })) ,
      jobPosition: { id: inputFormData?.jobPosition?.id, name: inputFormData?.jobPosition?.keyName }
    };
    newParams?.phone?.map((item: any) => delete item?.primary)
    delete newParams?.phone
    delete newParams?.email
    delete newParams?.mobile
    return newParams;
  };
  