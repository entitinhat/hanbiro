import MainCard from '@base/components/App/MainCard';
import { CardContent, CardMedia, Typography } from '@mui/material';
import IntroContent from '../IntroContent';
import { IntroSteps } from '../types';

import settings from '@base/containers/IntroSteps/assets/images/main-menu/settings.jpg';
import template from '@base/containers/IntroSteps/assets/images/settings/template.jpg';
import usergroup from '@base/containers/IntroSteps/assets/images/settings/usergroup.jpg';
import campaign from '@base/containers/IntroSteps/assets/images/main-menu/campaign.jpg';

import quote from '@base/containers/IntroSteps/assets/images/main-menu/quote.jpg';

export const SettingIntro: IntroSteps[] = [
  {
    element: '#admin-general',
    title: 'Workings with General',
    position: 'left',
    intro: <IntroContent content={'This is General Settings'} image={settings} />
  },
  {
    element: '#admin-preferences',
    title: 'Working with Preference',
    position: 'left',
    intro: <IntroContent content={'This is Preference Settings'} image={settings} />
  },
  {
    element: '#admin-templates',
    title: 'Working with Templates',
    position: 'left',
    intro: (
      <IntroContent
        content={'The template builder is made up of various components that can be dragged and dropped on to the template.'}
        image={template}
      />
    )
  },
  {
    element: '#admin-baselayout',
    title: 'Working with Baselayout',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'A website layout is visualized through a wireframe, which is a basic skeletal map showing how the content will fit together. It is important to distinguish wireframing from web design, which is the whole process of creating front end graphics and other visuals for the web page. Website layout design is a big part of web design, and it starts with wireframing. Ideally, the visual design should follow the wireframe layout so that graphic elements are positioned strategically, rather than on fleeting aesthetics preferences.'
        }
        image={settings}
      />
    )
  },
  {
    element: '#admin-site',
    title: 'Working with Site',
    position: 'left',
    intro: (
      <IntroContent
        content={'This is Admin Site'}
        image={
          'https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899174.jpg?w=1380&t=st=1678153463~exp=1678154063~hmac=76bf76c56d16ac1c2e89ca2dd2faaf238469daa0e0083a9d7e3f2d0fc89e58e7'
        }
      />
    )
  },
  {
    element: '#admin-online-digital',
    title: 'Working with Online Digital',
    position: 'left',
    intro: <IntroContent content={'This is Online Digital Settings'} image={campaign} />
  },
  // Customer relationship management (CRM) is the combination of practices, strategies and technologies that companies use to manage  and analyze customer interactions and data throughout the customer lifecycle.
  {
    element: '#admin-bill-license',
    title: 'Working with Bill License',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'The price varies based on the edition that you subscribe to and the number of user licenses you purchase. Vora CRM offers four editions: Standard, Professional, Enterprise, and Ultimate, Each have different features and limits You can see a detailed breakdown of our pricing here. '
        }
        image={quote}
      />
    )
  },
  {
    element: '#admin-users-groups',
    title: 'Working with Users & Groups',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'As you proceed with setting up the CRM account, your next step will involve adding users and determining their roles and permissions based on which they will perform specific tasks. A user is the one who manages records within the organization, whether their own or those shared by other users. You can add users based on the edition you have purchased and number of user licences that are allowed. Each user can sign-in to their account with an email address and password'
        }
        image={usergroup}
      />
    )
  },
  {
    element: '#admin-manage-access',
    title: 'Working with Manage Access',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'Every user is assigned a role in CRM based on their hierarchial position within the organization. By default the CEO and Manager roles are available, you can add more roles based on your companys structure for example, sales manager, sales rep, etc. and set up a role hierarchy. Creating roles will allow you to provide appropriate level of access to the users depending on their position. '
        }
        image={settings}
      />
    )
  },
  {
    element: '#admin-assignment-rule',
    title: 'Working with Assignment Rule',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'Vora can suggest a suitable record owner(s) based on specific criteria. If the organization has setup assignment criteria then Vora will draw a pattern from those rules to identify the most suitable record owner'
        }
        image={settings}
      />
    )
  },
  {
    element: '#admin-business-process',
    title: 'Working with business processes',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'Vora CRM aims to make the entire process of running a business easy for you, from sending a welcome email to each new customer to regular follow-ups with them, and even assigns scores to your leads to help you prioritize them better.'
        }
        image={settings}
      />
    )
  },
  {
    element: '#admin-auto-rule',
    title: 'Working with Auto Rule',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'With automation, you can easily tackle the inefficiencies of your team or business processes and still have enough time to focus on other priorities to enhance your companys productivity and growth'
        }
        image={settings}
      />
    )
  },
  {
    element: '#admin-step-trigger-attribute',
    title: 'Working with Trigger Attribute',
    position: 'left',
    intro: (
      <IntroContent
        content={
          'In Vora CRM, you can automate some of the routine processes by triggering a workflow using Rule Trigger To create a workflow go to Setup > Automation > Workflow Rules > Create Rule. Select the desired module and fill in the respective details.Choose the suitable option under WHEN to execute the rule trigger.The options under Rule Trigger are:'
        }
        image={settings}
      />
    )
  }
];
