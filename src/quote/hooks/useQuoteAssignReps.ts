import usePosts from "@base/hooks/usePosts";
import {User} from "@base/types/user";
import {queryKeys} from "@quote/config/queryKeys";
import {QUOTE_ASSIGNTO} from "@quote/services/graphql";

export default (id: string) => {
  return usePosts<User[]>([queryKeys.listAssignRep], QUOTE_ASSIGNTO, {id}, {enabled: id.length > 0});
};