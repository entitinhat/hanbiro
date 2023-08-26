import { LanguageData } from '@base/types/common';

export interface Selection {
  id: string;
  keyName: string;
  languageKey: string;
  keyGroup?: string;
  keyRoot?: string;
  orderInList?: number;
  isBase?: boolean;
  isDefault?: boolean;
  isSystem?: boolean;
  parentId?: string;
  parentName?: string;
  language?: LanguageData;
  children?: Selection[];
  expand?: boolean;
  isLoading?: boolean;
  isLoaded?: boolean;
}
