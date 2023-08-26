import { useEffect, useState } from 'react';
import CTAModal from '../../plugins/shorten-url-block/containers/CTAModal';
import SurveyModal from '../../plugins/shorten-url-block/containers/SurveyModal';
import PersonalizeDataGetter from '../../plugins/basic-block/components/personalize/DataGetter';
import FormDataGetter from '../../plugins/basic-block/components/form/DataGetter';
import SurveyDataGetter from '../../plugins/shorten-url-block/components/survey-url/DataGetter';
import CTADataGetter from '../../plugins/shorten-url-block/components/click-action/DataGetter';
import { useForms } from '../../plugins/basic-block/components/form/hooks/useForms';
import { useGetMergeField } from '@settings/general/hooks/merge-field/useGetMergeField';
import { usGetSurveyList } from '@settings/digital/survey/hooks/useGetSurveyList';
import { useCtaAll } from '@settings/digital/cta/hooks/useCtas';

interface CustomGrapeModalProps {
  editor: any;
  curComponent: string;
  isOpen?: boolean;
  type?: string;
  updateIds?: string[];
  setUpdateIds: (params: string[]) => void;
  ctaGroupBy?: string;
}
const CustomGrapeModal = (props: CustomGrapeModalProps) => {
  const { editor, curComponent, isOpen, type, updateIds, setUpdateIds, ctaGroupBy = 'all' } = props;

  // get Blocks data from server
  const { data: formData } = useForms();
  // get Blocks data from server
  const { data: personalizeData } = useGetMergeField();
  //
  const { data: surveyData } = usGetSurveyList();
  // get click-action data
  const { results: ctaData, status: ctaStatus } = useCtaAll({
    filter: {
      query: 'groupBy=' + ctaGroupBy
    }
  });
  useEffect(() => {
    if (curComponent) {
    }
  }, [curComponent]);
  useEffect(() => {
    console.log('formData', formData);
    console.log('ctaGroupBy ', ctaGroupBy, 'ctaData', ctaData);
    if ((updateIds ?? []).length > 0)
      updateIds?.map((id: string) => {
        console.log('');
        const selector = `#${id}`;
        const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
        const type = SelectedComponent?.attributes?.type;
        console.log('SelectedComponent?.attributes?.type', SelectedComponent?.attributes?.type);
        switch (type) {
          case 'form': {
            if (formData) {
              const nIds = updateIds.filter((nid: string) => nid !== id);
              setUpdateIds(nIds ? [...nIds] : []);
              return FormDataGetter(editor, id, formData ?? []);
            } else return;
          }
          case 'personalize': {
            if (personalizeData) {
              const nIds = updateIds.filter((nid: string) => nid !== id);
              setUpdateIds(nIds ? [...nIds] : []);
              return PersonalizeDataGetter(editor, id, personalizeData ?? []);
            } else return;
          }
          case 'survey-url': {
            if (surveyData) {
              const nIds = updateIds.filter((nid: string) => nid !== id);
              setUpdateIds(nIds ? [...nIds] : []);
              return SurveyDataGetter(editor, id, surveyData ?? []);
            } else return;
          }
          case 'click-action': {
            if (ctaStatus !== 'loading') {
              console.log('ctaData>>>', ctaData);
              const nIds = updateIds.filter((nid: string) => nid !== id);
              setUpdateIds(nIds ? [...nIds] : []);
              return CTADataGetter(editor, id, ctaData ?? []);
            } else return;
          }
          // return personalizeData ?? PersonalizeDataGetter(editor, id, formData ?? []);
          default:
            return;
        }
      });
  }, [updateIds, formData, personalizeData, surveyData, ctaData, ctaGroupBy]);
  return (
    <>
      {/* {curType == 'click-action' && <CTAModal editor={editor} component={curComponent} isOpen={isOpen} onClose={onClose} />}
      {curType == 'survey-url' && isOpen && <SurveyDataGetter editor={editor} component={curComponent} onClose={onClose} />} */}
    </>
  );
};

export default CustomGrapeModal;
