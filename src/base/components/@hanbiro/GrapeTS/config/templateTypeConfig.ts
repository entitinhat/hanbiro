import { customCodeType } from '../plugins/basic-block/constants';
import {
  typeForm,
  typeInput,
  typeTextarea,
  typeSelect,
  typeCheckbox,
  typeRadio,
  typeButton,
  typeLabel,
  typeRow,
  typeFile,
  typeDate,
  typeMutipleCheckbox,
  typeField,
  typeTermOfUse,
  typeFormContainer,
  typeResetButton,
  typeSubmitButton,
  typeNumber,
  typePrivacyPolicy
} from '../plugins/form-block/constants';
import {
  GRAPEJS_TEMPLATE_TYPE_FORM,
  GRAPEJS_TEMPLATE_TYPE_LANDING_PAGE,
  GRAPEJS_TEMPLATE_TYPE_FULL,
  GRAPEJS_TEMPLATE_TYPE_DESK_KB,
  GRAPEJS_TEMPLATE_TYPE_SMS,
  GRAPEJS_TEMPLATE_TYPE_MMS
} from './constants';

export const FULL_CONFIG = {
  plugins: {
    layout: {
      blocks: ['column1', 'column2', 'column3', 'column3-7', 'column7-3', 'section', 'container', 'header', 'footer'],
      category: 'Layout'
    },
    //declare a block group
    basic: {
      // blocks in group
      blocks: [
        'cta-button',
        'text-line',
        'heading',
        'divider',
        'line',
        'space',
        'link-button',
        //'image',
        'n-image',
        'icon',
        customCodeType,
        'personalize',
        'form',
        'table',
        'list-items',
        typeInput,
        typeNumber,
        typeTextarea,
        typeSelect,
        typeCheckbox,
        typeMutipleCheckbox,
        typeRadio,
        typeButton,
        typeLabel,
        typeRow,
        typeFile,
        typeDate,
        typeField,
        typeTermOfUse,
        typeFormContainer,
        typeResetButton,
        typeSubmitButton,
        typePrivacyPolicy
        //html
      ],
      // name of block groups
      category: 'Element'
    },
    shortenUrl: {
      blocks: ['click-action', 'survey-url'],
      category: 'Simple URL Shortener'
    },
    image: {
      blocks: ['image-only', 'image-on-top', 'image-on-bottom', 'image-on-left', 'image-on-right'],
      category: 'Image Type'
    }
  },
  //set defaultOpen of group (using category name)
  defaultOpen: ['Element']
};

export const FORM_TYPE_CONFIG = {
  plugins: {
    basic: {
      blocks: [
        typeFormContainer,
        typeRow,
        typeField,
        // typeLabel,
        typeInput,
        typeTextarea,
        typeNumber,
        typeCheckbox,
        typeMutipleCheckbox,
        typeRadio,
        typeDate,
        typeFile,
        typeSelect,
        typeButton,
        typeTermOfUse,
        typePrivacyPolicy,
        'text-line',
        'n-image',
        'icon',
        'table',
        'list-items',
        customCodeType,
        'space',
        'divider',
        'line'
      ],
      category: 'Element'
    }
  },
  defaultOpen: ['Element']
};

export const LANDINGPAGE_TYPE_CONFIG = {
  plugins: {
    layout: {
      blocks: ['column1', 'column2', 'column3', 'column3-7', 'column7-3', 'section', 'container', 'header', 'footer'],
      category: 'Layout'
    },
    basic: {
      blocks: [
        'heading',
        'text-line',
        'divider',
        'line',
        'space',
        'link-button',
        //'image',
        'n-image',
        'icon',
        customCodeType,
        'personalize',
        'form',
        'table',
        'list-items'

        //html
      ],
      category: 'Element'
    },
    image: {
      blocks: ['image-only', 'image-on-top', 'image-on-bottom', 'image-on-left', 'image-on-right'],
      category: 'Image Type'
    }
  },
  defaultOpen: ['Element']
};

export const DESK_KB_TYPE_CONFIG = {
  plugins: {
    layout: {
      blocks: ['column1', 'column2', 'column3', 'column3-7', 'column7-3', 'section', 'container', 'header', 'footer'],
      category: 'Layout'
    },
    //declare a block group
    basic: {
      // blocks in group
      blocks: [
        'text-line',
        'heading',
        'divider',
        'line',
        'space',
        //'image',
        'n-image',
        'icon',
        customCodeType,
        'personalize',
        'table',
        'link-button',
        'list-items'
      ],
      // name of block groups
      category: 'Element'
    },
    shortenUrl: {
      blocks: ['click-action', 'survey-url'],
      category: 'Simple URL Shortener'
    },
    image: {
      blocks: ['image-only', 'image-on-top', 'image-on-bottom', 'image-on-left', 'image-on-right'],
      category: 'Image Type'
    }
  },
  //set defaultOpen of group (using category name)
  defaultOpen: ['Element']
};

export const SMS_TYPE_CONFIG = {
  plugins: {
    //declare a block group
    basic: {
      // blocks in group
      blocks: ['text-line', 'personalize'],
      // name of block groups
      category: 'Element'
    },
    shortenUrl: {
      blocks: ['click-action', 'survey-url'],
      category: 'Simple URL Shortener'
    }
  },
  //set defaultOpen of group (using category name)
  defaultOpen: ['Element']
};
export const MMS_TYPE_CONFIG = {
  plugins: {
    //declare a block group
    basic: {
      // blocks in group
      blocks: [
        'text-line',
        //'image',
        'n-image',
        'personalize'
      ],
      // name of block groups
      category: 'Element'
    },
    shortenUrl: {
      blocks: ['click-action', 'survey-url'],
      category: 'Simple URL Shortener'
    }
  },
  //set defaultOpen of group (using category name)
  defaultOpen: ['Element']
};
export const getTemplateConfig = (keyName: string) => {
  switch (keyName) {
    case GRAPEJS_TEMPLATE_TYPE_FORM:
      return FORM_TYPE_CONFIG;
    case GRAPEJS_TEMPLATE_TYPE_LANDING_PAGE:
      return LANDINGPAGE_TYPE_CONFIG;
    case GRAPEJS_TEMPLATE_TYPE_DESK_KB:
      return DESK_KB_TYPE_CONFIG;
    case GRAPEJS_TEMPLATE_TYPE_SMS:
      return SMS_TYPE_CONFIG;
    case GRAPEJS_TEMPLATE_TYPE_MMS:
      return MMS_TYPE_CONFIG;
    case GRAPEJS_TEMPLATE_TYPE_FULL:
    default:
      return FULL_CONFIG;
  }
};
