import { lazy } from 'react';

export const KBCategoryAutocomplete = lazy(() => import('@desk/knowledge-base/containers/KBCategoryAutoComplete'));
export const Tags = lazy(() => import('@desk/knowledge-base/containers/ViewFields/Tags/Tags'));
export const EditorTemplate = lazy(() => import('@base/containers/ViewField/EditorTemplateGrape/Edit'));
export const EditorTemplateResponsive = lazy(() => import('@base/containers/ViewField/EditorWriteResponsive'));
export const CategoryFolderSelect = lazy(() => import('@desk/knowledge-base/containers/CategoryFolderSelect'));
