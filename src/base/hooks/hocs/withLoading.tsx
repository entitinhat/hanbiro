import { useState } from 'react';

export function withLoading(WrappedComponent: any) {
  return function render(props: any) {
    // console.log('withLoading props', props);
    const [loading, setLoading] = useState(false);
    return (
      <div style={{ position: 'relative' }}>
        <WrappedComponent {...props} loading={loading} setLoading={setLoading} />
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              backgroundColor: '#0000000d',
              width: '100%',
              height: 'calc(100% - 0.75rem)',
              borderRadius: '0.25rem',
            }}
          >
            {/* <Loading /> */}
          </div>
        )}
      </div>
    );
  };
}

export default withLoading;
