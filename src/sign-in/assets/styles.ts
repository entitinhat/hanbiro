import styled from '@emotion/styled';

export const Pre = styled.pre`
  background: #f2f2f2;
  padding: 2rem;
  word-break: break-all;
  white-space: break-spaces;
`;

export const LoginWrapper = styled.div`
  & .button {
    appearance: none;
    background: none;
    font-size: 32px;
    padding-left: 12px;
    padding-right: 12px;
    outline: none;
    border: 2px solid transparent;
    color: rgb(112, 76, 182);
    padding-bottom: 4px;
    cursor: pointer;
    background-color: rgba(112, 76, 182, 0.1);
    border-radius: 2px;
    transition: all 0.15s;
  }

  & .button:hover,
  .button:focus {
    border: 2px solid rgba(112, 76, 182, 0.4);
  }

  & .button:active {
    background-color: rgba(112, 76, 182, 0.2);
  }
`;

export const OrgName = styled.span`
  font-size: 48px;
  font-weight: 700;
  color: #0168fa;
`;
