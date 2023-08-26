import { gql } from 'graphql-request';

export const GENERATE_SHORTEN_URLS = gql`
  mutation q($longUrls: [String]) {
    common_shortenUrls(longUrls: $longUrls) {
      results {
        shortUrl
        status
      }
    }
  }
`;
