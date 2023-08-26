export const finalizeParams = (formData: any) => {
  let inputFormData = { ...formData };
  let newParams: any = {
    ...inputFormData,
    collectionMethod: inputFormData.collectionMethod === '' ? null : inputFormData.collectionMethod,

    companyIndustry: { id: inputFormData?.companyIndustry?.id, name: inputFormData?.companyIndustry?.languageKey },
    contactMobiles: inputFormData.contactMobiles
      .filter((_ele: any) => _ele.mobileNumber?.length > 0)
      .map((_ele: any) => ({
        ..._ele,
        label: _ele.label.label
      })),
    contactPhones: inputFormData.contactPhones
      .filter((_ele: any) => _ele.phoneNumber?.length > 0)
      .map((_ele: any) => ({
        label: _ele.label.label,
        labelValue: _ele.labelValue,
        country: _ele.country,
        extension: _ele.extension,
        phoneNumber: _ele.phoneNumber
      })),
    contactEmails: inputFormData.contactEmails
      .filter((_ele: any) => _ele.email?.length > 0)
      .map((_ele: any) => ({
        ..._ele,
        label: _ele.label.label
      })),
    companyShipTo:
      inputFormData.companyShipTo === ''
        ? null
        : {
          country: inputFormData?.companyShipTo?.country?.isoCode2,
          addrState: inputFormData?.companyShipTo?.state,
          city: inputFormData?.companyShipTo?.city,
          street: inputFormData?.companyShipTo?.street,
          zipcode: inputFormData?.companyShipTo?.zipcode
        },
    companyBillTo:
      inputFormData.companyBillTo === ''
        ? null
        : { 
          country: inputFormData?.companyBillTo?.country?.isoCode2,
          addrState: inputFormData?.companyBillTo?.state,
          city: inputFormData?.companyBillTo?.city,
          street: inputFormData?.companyBillTo?.street,
          zipcode: inputFormData?.companyBillTo?.zipcode
        },
    companyWebsite : inputFormData.companyWebsite === ''
    ? null
    : { 
      website: inputFormData?.companyWebsite?.website,
      protocol: inputFormData?.companyWebsite?.protocol
    },

  };

  console.log('formData', inputFormData);
  //waiting for API
  return newParams;
};
