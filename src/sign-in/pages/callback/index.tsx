import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginWrapper } from '@sign-in/assets/styles';
import { useOAuthService } from '@sign-in/services/service';
import QueryString from 'query-string';

interface ICallbackProps {}
const Callback: React.FC<ICallbackProps> = (props: ICallbackProps) => {
  // const params = useParams();
  const params = QueryString.parse(window.location.search);
  // console.log('params', params);
  const authCode = params.code && typeof params.code == 'string' ? params.code : '';
  const authService = useOAuthService();
  const navigate = useNavigate();
  const fetchOAuthToken = useRef('');
  useEffect(() => {
    // console.log('auth code', authCode);
    if (fetchOAuthToken.current == '' || fetchOAuthToken.current != authCode) {
      if (authCode != '') {
        // getToken
        // setToken to LocalStorage
        authService.oauthToken(authCode);
        fetchOAuthToken.current = authCode;
      } else {
        // console.log('Auth code empty return sign in page');
        navigate('/sign-in');
      }
    }
  }, [authCode]);
  // authService.testAPI();
  // return <>AAAA</>;
  return (
    <>
      <LoginWrapper>
        <div id="spinner" className="container">
          <div className="loading"></div>
        </div>
      </LoginWrapper>
    </>
  );
};

export default Callback;
