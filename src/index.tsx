import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from '@base/components/App';
import { baseUrl } from '@base/utils/vora';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <RecoilRoot>
      <BrowserRouter basename={baseUrl()}>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </HelmetProvider>
  // </React.StrictMode>
);
