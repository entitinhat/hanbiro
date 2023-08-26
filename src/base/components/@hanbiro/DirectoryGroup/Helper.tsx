import {Group} from "@base/types/user";

export const findAllChildrenGroupIds = (group: Group): string[] => {
  let childrenIds: string[] = [group.id];
  if(group?.children){
    group?.children?.forEach((v) => {
      childrenIds = [...childrenIds, ...findAllChildrenGroupIds(v)]
    });
    return childrenIds;
  }
  return childrenIds;
}

export const findAllGroupsByIds = (groups: Group[], findingIds: string[]): Group[] => {
  let results: Group[] = [];

  groups.forEach((g) => {
    if(g?.children){
      results = [...results, ...findAllGroupsByIds(g.children, findingIds)];
    }
    if(findingIds.includes(g.id)){
      results = [...results, {id: g.id, name: g.name}];
    }
  });

  return results;
}