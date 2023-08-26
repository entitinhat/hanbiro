import { authAtom } from '@sign-in/recoil/atoms/auth';
// import { Button, FormIcon } from '@base/components/form';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useOAuthService } from '@sign-in/services/service';
import { OrgName } from '@sign-in/assets/styles';
import { OAUTH_SIGNUP_ENDPOINT } from '@sign-in/config/constant';

export default function SignIn() {
  // console.log('SignIn');
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const oauthService = useOAuthService();
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);
  return (
    <div className="content content-fixed content-auth">
      <div className="container">
        <div className="card w-40 border-0 log-in-form">
          <div className="card-header border-0 justify-content-center">
            <h1 className="title">
              Join <OrgName>VORA</OrgName> today
            </h1>
          </div>
          <div className="card-body border-0">
            <div>
              {/* <Button
                color="primary"
                outline={true}
                className="btn-sign-in btn-google"
                onClick={() => {
                  oauthService.forceLoginDevMode();
                }}
              >
                <span className="log-in-label">
                  Login Develop Mode
                </span>
              </Button> */}
            </div>
            <div>
              {/* <Button color="primary" outline={true} className="btn-sign-in btn-google mg-t-10">
                <span className="log-in-label">
                  Sign up with Google
                </span>
              </Button> */}
            </div>
            <div>
              {/* <Button className="btn-sign-in btn-apple mg-t-10">
                <span className="log-in-label">
                  
                  Sign up with Apple
                </span>
              </Button> */}
            </div>
            <div className="row pd-t-10">
              <span className="col-md-5">
                <hr />
              </span>
              <span className="col-md-2 text-center pd-t-5">OR</span>
              <span className="col-md-5">
                <hr />
              </span>
            </div>
            <div>
              {/* <Button
                color="primary"
                className="btn-sign-in"
                onClick={() => {
                  const oauthServer = oauthService.getOAuthServer();
                  window.open(`${oauthServer}${OAUTH_SIGNUP_ENDPOINT}`);
                  // const linkToService = oauthService.getOAuthSignupEndPoint();
                  // window.location.href = linkToService;
                  // confirmAlert({
                  //   title: 'Information',
                  //   message: `
                  //    Page desk.ncrm.io/sign-up has not implement yet.
                  //    Plz Sign-up in id.habin.io/sign-up. And Then You will do "Sign In with Vora".
                  //   `,
                  //   buttons: [
                  //     {
                  //       label: 'OK',
                  //       className: 'btn-secondary',
                  //     },
                  //     {
                  //       label: 'Go Sign-up',
                  //       className: 'btn-primary',
                  //       onClick: () => {
                  //         const oauthServer = oauthService.getOAuthServer();
                  //         window.open(`${oauthServer}${OAUTH_SIGNUP_ENDPOINT}`);
                  //       },
                  //     },
                  //   ],
                  // });
                }}
              >
                Sign up with Phone or Email
              </Button> */}
            </div>
            <div className="pd-t-10">
              By sign up, you agree the <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a>.
            </div>
          </div>
          <div className="card-footer border-0">
            <div>
              <h5>Already have a Vora ID?</h5>
            </div>
            {/* <Button
              color="primary"
              outline={true}
              className="btn-sign-in mg-t-10"
              onClick={() => {
                const linkToService = oauthService.getOAuthEndPoint();
                window.location.href = linkToService;
              }}
            >
              Sign in
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
