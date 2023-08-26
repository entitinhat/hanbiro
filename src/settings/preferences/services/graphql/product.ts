import { gql } from 'graphql-request';

export const COMMON_BARCODE_GENERATE = gql`
  mutation q(
    $content: String
    $width: Integer
    $height: Integer
    $margin: Integer
    $format: String
    $lineColor: String
    $background: String
    $textAlign: String
    $textPosition: String
  ) {
    common_generateBarCode(
      content: $content
      width: $width
      height: $height
      margin: $margin
      format: $format
      lineColor: $lineColor
      background: $background
      textAlign: $textAlign
      textPosition: $textPosition
    ) {
      image
    }
  }
`;
