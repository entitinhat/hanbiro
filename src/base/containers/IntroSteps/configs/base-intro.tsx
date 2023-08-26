import MainCard from '@base/components/App/MainCard';
import { CardContent, CardMedia, Typography } from '@mui/material';
import IntroContent from '../IntroContent';
import { IntroSteps } from '../types';

import campaign from '@base/containers/IntroSteps/assets/images/main-menu/campaign.jpg';
import Customer from '@base/containers/IntroSteps/assets/images/main-menu/Customer.jpg';
import dashboard from '@base/containers/IntroSteps/assets/images/main-menu/dashboard.jpg';

import desks from '@base/containers/IntroSteps/assets/images/main-menu/desks.jpg';
import lead from '@base/containers/IntroSteps/assets/images/main-menu/lead.jpg';
import myworks from '@base/containers/IntroSteps/assets/images/main-menu/myworks.jpg';
import product from '@base/containers/IntroSteps/assets/images/main-menu/product.jpg';
import project from '@base/containers/IntroSteps/assets/images/main-menu/project.jpg';
import quote from '@base/containers/IntroSteps/assets/images/main-menu/quote.jpg';
import settings from '@base/containers/IntroSteps/assets/images/main-menu/settings.jpg';

export const BaseIntro: IntroSteps[] = [
  {
    element: '#Demo-page',
    title: 'Demo page',
    intro: (
      <IntroContent
        content={
          ' A demo is the shortened form of the word “demonstration.” It means a trial version or sample of a digital product (software, game, music, etc.).'
        }
        image={dashboard}
      />
    )
  },
  {
    element: '#dashboard',
    title: 'Working with Dashboards',
    intro: (
      <IntroContent
        content={
          ' Dashboards are an important tool in the best CRM software. They provide a quick snapshot of your sales activity and key performance indicators (KPIs). CRM dashboards typically focus on images, graphs and figures instead of lengthy sections of text. You and your sales team can use them to see an overview of your sales pipeline’s effectiveness and determine which tasks need to be completed next.'
        }
        image={dashboard}
      />
    )
  },
  {
    element: '#project',
    title: 'Working with Projects',
    intro: (
      <IntroContent
        content={
          'The CRM app provides the project section that is available by default in each Jira project. This section is intended to show the related Companies and Contacts from the full list of the global section.'
        }
        image={project}
      />
    )
  },
  {
    element: '#mywork',
    title: 'Working with Myworks',
    intro: (
      <IntroContent
        content={
          ' My Work collects all of your assigned tasks so you can take a look at all items in one place. Rather than having to jump between boards and dashboards to check whats happening, My Work centralizes this information for your convenience. You can also customize it according to your needs!'
        }
        image={myworks}
      />
    )
  },
  {
    element: '#desk',
    title: 'Working with Desk',
    intro: (
      <IntroContent
        content={
          ' Now that you know what a CRM is, let’s look at what a Help Desk system is and how it can help you. We’ve already covered what a help desk is, but, in short, it is a cloud or on-premise software system that allows your agents to serve your customers quickly and effectively. '
        }
        image={desks}
      />
    )
  },
  {
    element: '#campaign',
    title: 'Working with Campaigns',
    intro: (
      <IntroContent
        content={
          'CRM platforms have capabilities that help in all areas of a developing CRM campaign. Some of these include content development, audience selection and targeting, workflow automation, campaign deployment and execution, and performance reporting. All that said, here are the four most useful CRM campaign features to manage sales and marketing initiatives for brand awareness, lead generation, nurturing, and conversion.'
        }
        image={campaign}
      />
    )
  },
  // Customer relationship management (CRM) is the combination of practices, strategies and technologies that companies use to manage  and analyze customer interactions and data throughout the customer lifecycle.
  {
    element: '#customer',
    title: 'Working with Customers',
    intro: (
      <IntroContent
        content={
          'Contacts/Account are people with whom you communicate, either in pursuit of a business opportunity or for personal reasons. In Business-to-Consumer (B2C) scenarios, contact is the most important information for acquiring customers, whereas in Business-to-Business (B2B) it is a part of the organization details with which you are doing business.'
        }
        image={Customer}
      />
    )
  },
  {
    element: '#product',
    title: 'Workings with Products',
    intro: (
      <IntroContent
        content={
          ' Products can be either goods or services, which are sold or procured by your organization. In Vora CRM, you can manage your company- wide products that are sold to the customers as well as procured from vendors. Both sales and purchasing departments can use the Products module effectively according to their department process. If your organization procures products from vendors and then sells to customers with a markup, both the sales and purchasing departments can coordinate more effectively.'
        }
        image={product}
      />
    )
  },
  {
    element: '#quote',
    title: 'Working with Quotes',
    intro: (
      <IntroContent
        content={
          ' Sales Quotes are legally binding agreements between a customer and vendor to deliver the customer requested products in a specified time-frame at a predefined price. Your customers can place orders within the stipulated period (validity date) that has been specified in the quote otherwise you may cancel the quote or send a new quote extending the time-frame. In general, a Sales Quote contains the Quote number, date, line items (products) including the quantities and prices based on your Price Books, Terms & Conditions. In Vora CRM you can create a quote directly from the Potential or from the Account page.'
        }
        image={quote}
      />
    )
  },
  {
    element: '#lead',
    title: 'Working with Leads',
    intro: (
      <IntroContent
        content={
          'Leads are the details gathered about an individual or representatives of an organization. They play a very important role in an organizations Sales & Marketing department and are useful in identifying potential customers. Collecting leads and managing them are the initial stages in the sales process. Leads can be obtained through trade shows, seminars, advertisements, marketing campaigns etc. Once the leads are collected, it is essential to manage them and follow them up until the leads qualify to prospective customers. The sales departments approach in managing leads can significantly impact the success of an organization.'
        }
        image={lead}
      />
    )
  },
  {
    element: '#settings',
    title: 'Settings menu',
    intro: <IntroContent content={'This is a Settings menu'} image={settings} />
  }
];
