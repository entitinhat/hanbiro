import { atom } from 'recoil';

import { categoryOptions } from '@process/components/Diagram/Site';
import { CtaProperty } from '@process/types/diagram';
import { BusinessProcess, ProcessOpen, StepSiteForm, TriggerForm } from '@process/types/process';

export const businessProcessAtom = atom<BusinessProcess | null>({
  key: 'businessProcessAtom',
  default: null
});

export const stepSiteAtom = atom<StepSiteForm>({
  key: 'stepSiteAtom',
  default: {
    category: categoryOptions[0],
    type: { keyName: '', languageKey: '' },
    template: { keyName: '', languageKey: '' },
    html: ''
  }
});

export const siteCtaAtom = atom<CtaProperty[]>({
  key: 'siteCtaAtom',
  default: []
});

export const triggerFormAtom = atom<TriggerForm>({
  key: 'triggerFormAtom',
  default: {
    trigger: { keyName: '', languageKey: '' },
    module: { keyName: '', languageKey: '' },
    field: { keyName: '', languageKey: '' },
    process: { keyName: '', languageKey: '' },
    ptype: { keyName: '', languageKey: '' },
    step: { keyName: '', languageKey: '' },
    property: { keyName: '', languageKey: '' }
  }
});

export const processOpenAtom = atom<ProcessOpen>({
  key: 'processOpenAtom',
  default: {
    open: false
  }
});
