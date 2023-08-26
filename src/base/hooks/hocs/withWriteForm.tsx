//import React, { Suspense } from 'react';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { Box } from '@mui/material';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';

const withWriteForm = (WrappedComponent: any) => (props: any) => {
  const attrs = useWriteForm({ menu: props.menuApi });

  // console.log('withWriteForm attrs', attrs, props.menuApi);
  // console.log('withWriteForm props', props);
  // console.log('withWriteForm', attrs);

  return (
    <>
      {/* {attrs.loading && <Box sx={{ minHeight: '300px' }}><LoadingCircular loading={attrs.loading} /></Box>} */}
      {!attrs.loading && <WrappedComponent {...attrs} {...props} />}
    </>
  );
};

export default withWriteForm;
