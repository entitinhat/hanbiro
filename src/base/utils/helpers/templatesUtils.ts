import { Template } from '@base/types/setting';

export interface BaseTemplateData {
  html: string;
  id: string;
  name: string;
}
function parserKnowledgeBaseTemplate(template: Template): BaseTemplateData | null {
  let result: BaseTemplateData = {
    id: template.id,
    name: template.name,
    html: template.html ?? '',
  };
  return result;
}

export function parserTemplateProperties(template: Template, templateGroup: string): any {
  let result = null;
  switch (templateGroup) {
    case 'knowledgebase':
      result = parserKnowledgeBaseTemplate(template);
      break;
    default:
      result = template;
      break;
  }
  return result;
}
