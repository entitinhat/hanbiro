import { lazy } from 'react';

export const CategoryFolderSelectView = lazy(() => import('@desk/knowledge-base/containers/ViewFields/CategoryFolderSelect'));
export const Tags = lazy(() => import('@desk/knowledge-base/containers/ViewFields/Tags'));
// export const EditorTemplateView = lazy(() => import('@base/containers/ViewField/EditorTemplate'));
export const EditorTemplateView = lazy(() => import('@base/containers/ViewField/EditorTemplateGrape'));
export const EditorTemplateResponsive = lazy(() => import('@base/containers/ViewField/EditorTemplateResponsive'));
export const FolderViewField = lazy(() => import('@desk/knowledge-base/containers/ViewFields/FolderViewField'));
export const CategoryViewField = lazy(() => import('@desk/knowledge-base/containers/ViewFields/CategoryViewField'));
export const PublishedView = lazy(() => import('@desk/knowledge-base/containers/ViewFields/PublishViewField'));
