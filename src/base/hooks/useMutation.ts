import { useState } from 'react';

import { DataPayload } from '@base/types/response';
import { graphQLApi } from '@base/utils/axios/graphql';

function useMutation<T>(query: string, key: string, variables?: object): T | undefined {
  const [mutate, setMutate] = useState<T>();

  graphQLApi<DataPayload<T>>(key, query, variables).then((payload) => {
    const data = payload.data[key];
    if (data) {
      setMutate(data);
    }
  });

  return mutate;
}

export default useMutation;
