import { gql } from 'graphql-request';

export const GENERATE_SHORTEN_URL = gql`
  mutation q($longUrl: [String]) {
    common_shortenUrl(longUrl: $longUrl) {
      url {
        shortUrl
      }
    }
  }
`;
