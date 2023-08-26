export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('link');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const imgStyle = {
    display: 'inline-block',
    'text-decoration': 'none',
    cursor: 'pointer',
    'font-weight': '400',
    // width: '160px',
    color: 'white',
    'text-align': 'center',
    'vertical-align': 'middle',
    'user-select': 'none',
    // 'background-color': '#ffa200', //'transparent'
    border: '1px solid transparent',
    padding: '0.2rem 0.6rem',
    'font-size': '1rem',
    'line-height': '1.5',
    'border-radius': '0.25rem',
    transition: `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out`
  };

  domc.addType('image-only', {
    extend: 'link',
    model: {
      defaults: {
        // 'custom-name': 'n-image',
        content: `<img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />`,
        //attributes: { target: '_blank' },
        //style: imgStyle,
        traits: []
      }
    }
  });
};
