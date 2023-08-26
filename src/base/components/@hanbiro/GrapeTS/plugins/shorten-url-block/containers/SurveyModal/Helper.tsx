const btnStyle = {
  display: 'inline-block',
  'text-decoration': 'none',
  cursor: 'pointer',
  'font-weight': '400',
  width: '160px',
  color: 'white',
  'text-align': 'center',
  'vertical-align': 'middle',
  'user-select': 'none',
  'background-color': '#ffa200', //'transparent'
  border: '1px solid transparent',
  padding: '0.2rem 0.6rem',
  'font-size': '1rem',
  'line-height': '1.5',
  'border-radius': '0.25rem',
  transition: `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out`
};

export const useConvertToHTML: { [key in string]: (SelectedComponent: any, curSurvey: any, data?: any) => void } = {
  url(SelectedComponent: any, curSurvey: any) {
    if (curSurvey) {
      SelectedComponent?.set('tagName', `a`);
      SelectedComponent?.set('attributes', {
        target: curSurvey.openPageInNewWindow ? '_blank' : '_self',
        href: `${curSurvey.name}`,
        style: 'padding: 5px; margin: 5px'
      });
      SelectedComponent?.set('content', curSurvey.name);
    }
  },
  text(SelectedComponent: any, curSurvey: any) {
    if (curSurvey) {
      SelectedComponent?.set('tagName', `div`);
      SelectedComponent?.set('attributes', {
        class: 'fit-content',
        style: btnStyle
      });
      //Todo: change href to public survey's public url
      SelectedComponent?.set(
        'content',
        `<a target="_blank" href="${curSurvey.name}" style="text-decoration: none;"  >${curSurvey.title}</a>`
      );
    }
  }
};
