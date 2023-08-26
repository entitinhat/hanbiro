import $ from 'jquery';

declare global {
  interface JQuery {
    serializeData: () => any;
  }
}

$.fn.extend({
  serializeData: serializeData,
});

function serializeData(this: JQuery): any {
  let o: { [key: string]: any } = {};
  let a = $(this).serializeArray();

  $.each<JQuery.NameValuePair>(a, (i, ele) => {
    if (o[ele?.name]) {
      if (!o[ele.name].push) {
        o[ele.name] = [o[ele.name]];
      }
      o[ele.name].push(ele.value || '');
    } else {
      o[ele.name] = ele.value || '';
    }
  });

  return o;
}

/*function getFormData(this: JQuery, options: any): JQuery.NameValuePair[] {
  const formData = $(this).serializeArray();

  const serialized =
    options && options.includeCheckbox
      ? $(this)
          .find('input:checkbox:not(:checked)')
          .filter((a: any) => {
            return a?.name?.trim() !== '' && !(options && options.excludeUncheck && !a?.checked);
          })
          .map((i: number, ele: any) => {
            return {
              name: ele.name,
              value: ele.checked ? ele.value : ele.value === 'y' ? 'n' : '0',
            };
          })
      : false;

  return formData.concat(serialized ? serialized.toArray() : []);
}*/
