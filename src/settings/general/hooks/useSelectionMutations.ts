import useMutationPost from '@base/hooks/useMutationPost';
import { queryKeys } from '../config/queryKeys';
import {
  SETTING_SELECTION_CREATE,
  SETTING_SELECTION_DELETE,
  SETTING_SELECTION_FIELD_UPDATE,
  SETTING_SELECTION_MOVE
} from '../services/graphql';

//mutation
export const useSelectionUpdate = (opt?: any) => {
  const mPost = useMutationPost(SETTING_SELECTION_FIELD_UPDATE, queryKeys.settingSelectionFieldUpdate, opt);
  return mPost;
};

export const useSelectionCreate = (opt?: any) => {
  const mPost = useMutationPost(SETTING_SELECTION_CREATE, queryKeys.settingSelectionFieldCreate, opt);
  return mPost;
};

export const useSelectionDelete = (opt?: any) => {
  const mPost = useMutationPost(SETTING_SELECTION_DELETE, queryKeys.settingSelectionFieldDelete, opt);
  return mPost;
};
export const useSelectionMove = (opt?: any) => {
  const mPost = useMutationPost(SETTING_SELECTION_MOVE, queryKeys.settingSelectionFieldMove, opt);
  return mPost;
};
