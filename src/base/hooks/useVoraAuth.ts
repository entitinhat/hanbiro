import { requestCode } from '@base/services/voraService';
import { InitAuthCodeOption, UseVoraSignInOption } from '@base/types/vora';
import { arrayBufferToBase64, base64URLEncode, randomStrings } from '@base/utils/vora';
import { sha256 } from 'js-sha256';

export default function useVoraSignIn(options: UseVoraSignInOption) {
  const { clientId, redirectUrl, scope, uxMode, responseType, responseMode, codeChallengeMethod, callback } = options;

  // init authorize data
  const nonce = base64URLEncode(randomStrings(8));

  const state = base64URLEncode(
    new URLSearchParams({
      nonce,
      continue: window.location.href
    }).toString()
  );
  const codeVerifier = randomStrings(16);
  const shaBuffer = sha256.arrayBuffer(codeVerifier);
  const codeChallenge = arrayBufferToBase64(shaBuffer);
  // requestAuthorize
  const option: InitAuthCodeOption = {
    uxMode: uxMode,
    clientId: clientId,
    responseType: responseType,
    responseMode: responseMode,
    scope: scope,
    state: state,
    codeChallenge: codeChallenge,
    codeChallengeMethod: codeChallengeMethod,
    resource: 'openid email offline_access',
    prompt: '',
    loginHint: '',
    includeGrantedScopes: 'false',
    optional: 'false',
    action: 'false',
    redirectUrl: redirectUrl
  };
  callback &&
    callback({
      state: nonce,
      codeVerifier: codeVerifier
    });
  requestCode(option);
}
