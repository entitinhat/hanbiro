

export const getParams = (formData: any, orgId:string) => {
  let newParams: any = {};
  newParams = {
    input: {
      ...formData,
      orgId: orgId
    }
  };
  return newParams;
};


