import { gql } from 'graphql-request';

export const COMMON_QR_CODE_CREATE = gql`
  mutation m($content: String!, $width: Number!, $margin: Number!, $scale: Number!, $darkColor: String!, $lightColor: String!) {
    common_generateQRCode(
      content: $content
      width: $width
      margin: $margin
      scale: $scale
      darkColor: $darkColor
      lightColor: $lightColor
    ) {
      image
    }
  }
`;
