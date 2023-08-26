import { AccountTreeOutlined } from '@mui/icons-material';
import React from 'react';
import SvgIcons from './media-icons';

const icons: any = {
  king: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.7867 4.26474L12.8773 6.67344L9.12863 1.67322C9.11355 1.65309 9.09398 1.63676 9.07149 1.62551C9.049 1.61426 9.0242 1.6084 8.99905 1.6084C8.9739 1.6084 8.9491 1.61426 8.92661 1.62551C8.90412 1.63676 8.88455 1.65309 8.86947 1.67322L5.12282 6.67344L1.21144 4.26474C1.09693 4.19443 0.948267 4.28885 0.966348 4.42344L2.50117 16.0873C2.52327 16.246 2.65987 16.3685 2.8226 16.3685H15.1795C15.3402 16.3685 15.4788 16.248 15.4989 16.0873L17.0338 4.42344C17.0498 4.28885 16.9032 4.19443 16.7867 4.26474ZM14.2554 14.9944H3.74269L2.66188 6.76987L5.47037 8.49956L9.00005 3.79063L12.5297 8.49956L15.3382 6.76987L14.2554 14.9944ZM9.00005 8.9355C7.75251 8.9355 6.738 9.95001 6.738 11.1976C6.738 12.4451 7.75251 13.4596 9.00005 13.4596C10.2476 13.4596 11.2621 12.4451 11.2621 11.1976C11.2621 9.95001 10.2476 8.9355 9.00005 8.9355ZM9.00005 12.1679C8.46568 12.1679 8.03175 11.7339 8.03175 11.1976C8.03175 10.6632 8.46568 10.2272 9.00005 10.2272C9.53443 10.2272 9.96836 10.6612 9.96836 11.1976C9.96836 11.7319 9.53443 12.1679 9.00005 12.1679Z"
        fill="#FAAD14"
      />
    </svg>
  ),
  key: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12.06,23.4a.85.85,0,0,1-.86-.86V21H8.42a.86.86,0,0,1-.86-.86V15.87A.85.85,0,0,1,8.42,15H11.2V11.69A5.59,5.59,0,0,1,6.45,6.21,5.58,5.58,0,0,1,12,.6a5.57,5.57,0,0,1,.92,11.07V22.54A.85.85,0,0,1,12.06,23.4ZM9.28,19.26H11.2V16.73H9.28ZM12,2.31A3.88,3.88,0,0,0,9.28,3.46,3.81,3.81,0,0,0,8.17,6.2,3.85,3.85,0,0,0,12,10h0a3.86,3.86,0,0,0,0-7.72Z" />
    </svg>
  ),
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  m_customer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20,21v-2c0-2.209-1.791-5-4-5l-4,4.016L8,14c-2.209,0-4,2.791-4,5v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  m_customer_account: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.163,2h7.673C14.029,2,15,2.969,15,4.163v15.675C15,21.03,14.029,22,12.836,22H5.163C3.969,22,3,21.03,3,19.838V4.163C3,2.969,3.969,2,5.163,2z M16,11h3c1.104,0,2,0.896,2,2v7c0,1.104-0.896,2-2,2h-8 M7,7H6 M12,7l-1,0 M18,14v1 M18,18v1 M7,12H6 M11,12l1,0 M7,17H6 M11,17h1" />
    </svg>
  ),
  m_lead: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,14.992v-0.709c0-0.782,0.634-1.275,1.417-1.275h6.166c0.782,0,1.417,0.493,1.417,1.275v0.709 M8.004,7.501C8.004,8.882,9.122,10,10.503,10c1.379,0,2.499-1.118,2.499-2.499c0-1.379-1.12-2.499-2.499-2.499C9.122,5.002,8.004,6.122,8.004,7.501z M19,4c0-1.104-0.896-2-2-2H4C2.896,2,2,2.896,2,4v13c0,1.104,0.896,2,2,2h13c1.104,0,2-0.896,2-2V4z M7,22h13c1.104,0,2-0.896,2-2V7" />
    </svg>
  ),
  m_potential: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21,12c0,4.971-4.029,9-9,9c-4.971,0-9-4.029-9-9c0-4.971,4.029-9,9-9C16.971,3,21,7.029,21,12z M12,2v3.021 M12,19v3 M2,11.986L5,12 M19,12l3-0.014 M8,17v-0.709c0-0.782,0.634-1.275,1.417-1.275h5.166c0.782,0,1.417,0.493,1.417,1.275V17 M10,10c0,1.105,0.895,2,2,2c1.104,0,2-0.895,2-2c0-1.104-0.896-2-2-2C10.895,8,10,8.896,10,10z" />
    </svg>
  ),
  m_customer_rating: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.03,2.026l2.44,4.943l5.457,0.797l-3.948,3.847l0.932,5.431l-4.88-2.566l-4.88,2.566l0.932-5.431L4.133,7.767L9.59,6.97L12.03,2.026z M19.994,21.994c0-1.104-0.895-2-2-2H6.026c-1.104,0-2,0.896-2,2" />
    </svg>
  ),
  bell: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  help: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12" y2="17"></line>
    </svg>
  ),
  download: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  trash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  trash2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  check: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  check_circle: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  x: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  calendar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  m_activity_history: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.181,5.773C6.014,3.474,8.838,2,12.006,2c5.522,0,10,4.478,10,10s-4.478,10-10,10c-5.522,0-10-4.478-10-10 M3.114,2.025v4.444h4.446 M12.006,6.969V13 M17.031,13h-5.025" />
    </svg>
  ),
  m_activity_todo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16,4h2c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H6c-1.104,0-2-0.896-2-2V6c0-1.104,0.896-2,2-2h2 M9,2h6c0.553,0,1,0.448,1,1v2c0,0.552-0.447,1-1,1H9C8.448,6,8,5.552,8,5V3C8,2.448,8.448,2,9,2z M16.996,10l-6.919,6.994l-3.054-3.055" />
    </svg>
  ),
  m_activity_calendar: 'calendar',
  m_activity_reservation: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.993,19.91c-0.343,0.045-0.693,0.068-1.048,0.068c-4.407,0-7.979-3.571-7.979-7.979c0-4.407,3.572-7.979,7.979-7.979c1.945,0,3.727,0.695,5.112,1.851 M22.027,7.904l-7.755,7.754 M22.027,7.904l-4.935,14.098l-2.82-6.344l-6.343-2.82L22.027,7.904z M18.042,4.021l-3.041-2.025 M5.007,1.996L1.966,4.021" />
    </svg>
  ),
  timeline: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,6.999h-8 M2,7L5,7 M14,4H5v6h9V4z M10,16.999H2 M22,17h-3 M10,20h9v-6h-9V20z" />
    </svg>
  ),
  new_timeline: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  ),
  m_activity_board: 'calendar',
  justify: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" y1="10" x2="3" y2="10"></line>
      <line x1="21" y1="6" x2="3" y2="6"></line>
      <line x1="21" y1="14" x2="3" y2="14"></line>
      <line x1="21" y1="18" x2="3" y2="18"></line>
    </svg>
  ),
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  user_check: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  edit_2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  ),
  more_vertical: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  ),
  more_horizontal: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  ),
  comment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  ),
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  arrow_left: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  arrow_right: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  arrow_down: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  ),
  arrow_up: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  ),
  mouse_pointer: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
      <path d="M13 13l6 6"></path>
    </svg>
  ),
  file_text: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  file_excel: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14,2H6 C4.896,2,4,2.896,4,4v16c0,1.104,0.896,2,2,2h12c1.104,0,2-0.896,2-2V8L14,2z M14,2v6h6 M14.828,11.797l-5.657,5.656 M14.828,17.453 l-5.656-5.656" />
    </svg>
  ),
  file_zip: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9,21H4 c-1.104,0-2-0.896-2-2V5c0-1.104,0.896-2,2-2h5l2,3h9c1.104,0,2,0.896,2,2v11c0,1.104-0.896,2-2,2 M15,9v1 M15,13v1 M15,17l2,3 c0,1.104-0.896,2-2,2s-2-0.896-2-2L15,17z" />
    </svg>
  ),
  folder: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  contacts: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="st0"
        d="M4,19V5c0-1.104,0.896-2,2-2h14c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H6C4.896,21,4,20.104,4,19z M2,8h4M2,16h4 M18,17v-1c0-1.104-0.896-2-2-2h-4c-1.104,0-2,0.896-2,2v1 M14,7c1.104,0,2,0.896,2,2s-0.896,2-2,2s-2-0.896-2-2S12.896,7,14,7z"
      />
    </svg>
  ),
  sort: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.063,10.063V3 M6.063,21v-6.937 M10,16l-3.937,5L2,16 M2,8l4.063-5L10,8 M14,5h8 M14,12h8 M14,19h8" />
    </svg>
  ),
  sort_desc: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.063,21V3 M2,9l4.063-6L10,9 M13,5h9 M13,12h7 M13,19h5" />
    </svg>
  ),
  sort_asc: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.063,21V3 M10,15l-3.937,6L2,15 M22,19h-9 M20,12h-7 M18,5h-5" />
    </svg>
  ),
  filter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7,4h15 M2,4h2 M19,12h3 M16,12H2 M9,20h13 M6,20H2 M7,2v4 M16,10v4 M9,18v4" />
    </svg>
  ),
  chevrons_left: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="11 17 6 12 11 7"></polyline>
      <polyline points="18 17 13 12 18 7"></polyline>
    </svg>
  ),
  chevrons_right: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="13 17 18 12 13 7"></polyline>
      <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
  ),
  reply: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 14 4 9 9 4"></polyline>
      <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
    </svg>
  ),
  printer: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  ),
  star: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  company: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.163,3h11.673C19.029,3,20,3.969,20,5.163v13.675C20,20.029,19.029,21,17.836,21H6.163 C4.969,21,4,20.029,4,18.838V5.163C4,3.969,4.969,3,6.163,3z M15,20.344V17H9.031v3.344 M8,7h2 M8,11h2 M14,7h2 M14,11h2" />
    </svg>
  ),
  alert_triangle: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  manage_process: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20,10h3.001V5 M23.001,9.799l-5.104-4.795c-1.045-1.044-2.311-1.84-3.704-2.331 C9.036,0.855,3.381,3.563,1.565,8.72s0.891,10.81,6.048,12.627c5.157,1.816,10.81-0.892,12.627-6.048 M11.084,10.272 c0.954,0,1.728,0.773,1.728,1.728s-0.774,1.728-1.728,1.728S9.357,12.954,9.357,12S10.13,10.272,11.084,10.272z M15.346,13.728 c-0.158,0.355-0.082,0.771,0.189,1.048l0.035,0.034c0.449,0.449,0.451,1.179,0,1.629c0,0,0,0,0,0.001 c-0.449,0.45-1.18,0.45-1.629,0.001c0,0,0,0,0-0.001l-0.035-0.034c-0.277-0.272-0.693-0.347-1.049-0.19 c-0.348,0.149-0.574,0.49-0.576,0.87v0.098c0,0.636-0.516,1.151-1.151,1.151s-1.151-0.516-1.151-1.151v-0.052 c-0.009-0.391-0.256-0.735-0.622-0.869c-0.355-0.158-0.771-0.083-1.048,0.189l-0.035,0.034c-0.449,0.45-1.179,0.451-1.628,0.001 c0,0-0.001,0-0.001-0.001c-0.45-0.449-0.451-1.179-0.001-1.629c0,0,0,0,0.001,0l0.035-0.035c0.271-0.277,0.347-0.692,0.19-1.048 C6.72,13.426,6.379,13.199,6,13.197H5.902c-0.636,0-1.152-0.516-1.152-1.151s0.516-1.151,1.152-1.151h0.051 c0.391-0.009,0.735-0.256,0.87-0.622c0.157-0.355,0.081-0.771-0.19-1.048L6.599,9.19c-0.45-0.449-0.45-1.179,0-1.628 c0,0,0-0.001,0-0.001C7.048,7.11,7.777,7.11,8.228,7.56c0,0,0,0,0.001,0.001l0.035,0.035c0.277,0.271,0.692,0.347,1.048,0.19h0.046 c0.349-0.149,0.575-0.491,0.576-0.87V6.818c0-0.636,0.516-1.152,1.151-1.152s1.151,0.516,1.151,1.152v0.051 c0.001,0.379,0.228,0.721,0.577,0.87c0.355,0.157,0.77,0.082,1.047-0.19l0.035-0.035c0.449-0.45,1.178-0.45,1.629,0v0 c0.451,0.45,0.451,1.179,0.002,1.629c0,0,0,0-0.002,0.001L15.49,9.179c-0.273,0.277-0.348,0.692-0.191,1.048v0.046 c0.15,0.348,0.49,0.575,0.871,0.576h0.098c0.635,0,1.15,0.516,1.15,1.152s-0.516,1.151-1.15,1.151h-0.053 C15.836,13.152,15.494,13.379,15.346,13.728z" />
    </svg>
  ),
  set_default: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16,2l6,6 M5,11l12-8l4,4 l-8,12L5,11z M8.958,15.042L2,22 M15,21L3,9" />
    </svg>
  ),
  checklist: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,14c-1.657,0-3,1.342-3,3s1.343,3,3,3s3-1.342,3-3S6.657,14,5,14z M12,7h10 M12,17h10 M2,4l3,5l3-5" />
    </svg>
  ),
  recent: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="st0"
        d="M1,4v6h6 M3.51,15c1.652,4.688,6.792,7.149,11.479,5.498c4.688-1.652,7.149-6.791,5.498-11.479 c-1.651-4.688-6.792-7.149-11.479-5.498C7.741,3.967,6.59,4.691,5.64,5.64L1,10 M15,15l-3-2V8"
      />
    </svg>
  ),
  move_first: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15,18l-6-6l6-6 M4,18V6" />
    </svg>
  ),
  move_last: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9,6l6,6l-6,6 M20,6v12" />
    </svg>
  ),
  // category: (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="18"
  //     height="18"
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     stroke="currentColor"
  //     strokeWidth="2"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //   >
  //     <path d="M3,8h4 M21,6H11v5h10V6z M7,18.063H3V3.028 M21,16H11v5h10V16z"></path>
  //   </svg>
  // ),

  //new category
  category: (
    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.9996 0.50293H0.999643C0.723081 0.50293 0.499643 0.726367 0.499643 1.00293V14.0029C0.499643 14.2795 0.723081 14.5029 0.999643 14.5029H10.9996C11.2762 14.5029 11.4996 14.2795 11.4996 14.0029V1.00293C11.4996 0.726367 11.2762 0.50293 10.9996 0.50293ZM10.3746 13.3779H1.62464V10.2373H3.15433C3.33558 10.7498 3.65433 11.2107 4.07777 11.5607C4.61683 12.0061 5.29964 12.2529 5.99964 12.2529C6.69964 12.2529 7.38246 12.0076 7.92152 11.5607C8.34496 11.2107 8.66371 10.7498 8.84496 10.2373H10.3746V9.25293H8.05589L7.97464 9.63887C7.78714 10.5732 6.95589 11.2529 5.99964 11.2529C5.04339 11.2529 4.21214 10.5732 4.02308 9.63887L3.94183 9.25293H1.62464V1.62793H10.3746V13.3779ZM2.99964 4.83105H8.99964C9.06839 4.83105 9.12464 4.7748 9.12464 4.70605V3.95605C9.12464 3.8873 9.06839 3.83105 8.99964 3.83105H2.99964C2.93089 3.83105 2.87464 3.8873 2.87464 3.95605V4.70605C2.87464 4.7748 2.93089 4.83105 2.99964 4.83105ZM2.99964 7.33105H8.99964C9.06839 7.33105 9.12464 7.2748 9.12464 7.20605V6.45605C9.12464 6.3873 9.06839 6.33105 8.99964 6.33105H2.99964C2.93089 6.33105 2.87464 6.3873 2.87464 6.45605V7.20605C2.87464 7.2748 2.93089 7.33105 2.99964 7.33105Z"
        fill="#262626"
        strokeWidth="0.1px"
      />
    </svg>
  ),
  article: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0536 1.35498H8.86161C8.17662 1.35498 7.50698 1.55169 6.9308 1.92278L6.25 2.35945L5.5692 1.92278C4.9936 1.55176 4.32321 1.35461 3.63839 1.35498H0.446429C0.199498 1.35498 0 1.55448 0 1.80141V9.72552C0 9.97245 0.199498 10.1719 0.446429 10.1719H3.63839C4.32338 10.1719 4.99303 10.3687 5.5692 10.7397L6.18862 11.1387C6.20675 11.1499 6.22768 11.1569 6.24861 11.1569C6.26953 11.1569 6.29046 11.1513 6.30859 11.1387L6.92801 10.7397C7.50558 10.3687 8.17662 10.1719 8.86161 10.1719H12.0536C12.3005 10.1719 12.5 9.97245 12.5 9.72552V1.80141C12.5 1.55448 12.3005 1.35498 12.0536 1.35498ZM3.63839 9.16748H1.00446V2.35945H3.63839C4.13225 2.35945 4.61217 2.50035 5.02651 2.76681L5.70731 3.20347L5.80357 3.26625V9.71157C5.13951 9.35442 4.39732 9.16748 3.63839 9.16748ZM11.4955 9.16748H8.86161C8.10268 9.16748 7.36049 9.35442 6.69643 9.71157V3.26625L6.79269 3.20347L7.47349 2.76681C7.88784 2.50035 8.36775 2.35945 8.86161 2.35945H11.4955V9.16748ZM4.64425 4.14516H2.05218C1.99777 4.14516 1.95313 4.19259 1.95313 4.24979V4.87758C1.95313 4.93478 1.99777 4.98221 2.05218 4.98221H4.64286C4.69727 4.98221 4.74191 4.93478 4.74191 4.87758V4.24979C4.7433 4.19259 4.69866 4.14516 4.64425 4.14516ZM7.7567 4.24979V4.87758C7.7567 4.93478 7.80134 4.98221 7.85575 4.98221H10.4464C10.5008 4.98221 10.5455 4.93478 10.5455 4.87758V4.24979C10.5455 4.19259 10.5008 4.14516 10.4464 4.14516H7.85575C7.80134 4.14516 7.7567 4.19259 7.7567 4.24979ZM4.64425 6.09829H2.05218C1.99777 6.09829 1.95313 6.14572 1.95313 6.20292V6.83071C1.95313 6.88791 1.99777 6.93534 2.05218 6.93534H4.64286C4.69727 6.93534 4.74191 6.88791 4.74191 6.83071V6.20292C4.7433 6.14572 4.69866 6.09829 4.64425 6.09829ZM10.4478 6.09829H7.85575C7.80134 6.09829 7.7567 6.14572 7.7567 6.20292V6.83071C7.7567 6.88791 7.80134 6.93534 7.85575 6.93534H10.4464C10.5008 6.93534 10.5455 6.88791 10.5455 6.83071V6.20292C10.5469 6.14572 10.5022 6.09829 10.4478 6.09829Z"
        fill="#262626"
        strokeWidth="0.1px"
      />
    </svg>
  ),
  draft_article: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.7143 5.5821H9.76568V2.4571C9.76568 1.47077 8.9663 0.671387 7.97997 0.671387H4.52014C3.53382 0.671387 2.73443 1.47077 2.73443 2.4571V5.5821H1.78577C1.53884 5.5821 1.33934 5.7816 1.33934 6.02853V11.3857C1.33934 11.6326 1.53884 11.8321 1.78577 11.8321H10.7143C10.9613 11.8321 11.1608 11.6326 11.1608 11.3857V6.02853C11.1608 5.7816 10.9613 5.5821 10.7143 5.5821ZM3.73889 2.4571C3.73889 2.02602 4.08906 1.67585 4.52014 1.67585H7.97997C8.41105 1.67585 8.76122 2.02602 8.76122 2.4571V5.5821H3.73889V2.4571ZM10.1563 10.8276H2.3438V6.58657H10.1563V10.8276ZM5.85943 8.88846V9.62786C5.85943 9.68925 5.90965 9.73947 5.97104 9.73947H6.52907C6.59046 9.73947 6.64068 9.68925 6.64068 9.62786V8.88846C6.75584 8.80578 6.8418 8.6887 6.88618 8.55405C6.93055 8.41941 6.93107 8.27416 6.88764 8.13921C6.84421 8.00426 6.75908 7.88657 6.64451 7.80308C6.52993 7.71959 6.39182 7.6746 6.25006 7.6746C6.10829 7.6746 5.97018 7.71959 5.8556 7.80308C5.74103 7.88657 5.6559 8.00426 5.61247 8.13921C5.56905 8.27416 5.56956 8.41941 5.61394 8.55405C5.65831 8.6887 5.74427 8.80578 5.85943 8.88846Z"
        fill="#FF4D4F"
        strokeWidth="0.1px"
      />
    </svg>
  ),
  kb_folder: (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0536 4.2996H10.5469V2.71477C10.5469 2.46784 10.3474 2.26835 10.1004 2.26835H5.70592L4.06948 0.703055C4.04865 0.683563 4.02127 0.672608 3.99275 0.672363H0.446429C0.199498 0.672363 0 0.871861 0 1.11879V9.37772C0 9.62465 0.199498 9.82415 0.446429 9.82415H10.1842C10.3655 9.82415 10.5301 9.71394 10.5985 9.54513L12.4679 4.91344C12.4888 4.86042 12.5 4.80322 12.5 4.74602C12.5 4.49909 12.3005 4.2996 12.0536 4.2996ZM1.00446 1.67683H3.63421L5.30274 3.27281H9.54241V4.2996H2.42746C2.24609 4.2996 2.08147 4.40981 2.01311 4.57861L1.00446 7.07861V1.67683ZM9.86747 8.81969H1.32534L2.76646 5.24826H11.31L9.86747 8.81969Z"
        fill="#262626"
        strokeWidth="0.1px"
      />
    </svg>
  ),
  main_menu: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4,2h16 c1.104,0,2,0.896,2,2v16c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V4C2,2.896,2.896,2,4,2z M7.042,8H6 M7.042,12.021H6 M7.042,16 H6 M11.031,2v20" />
    </svg>
  ),
  view_detail: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,20c-1.104,0-2-0.896-2-2 V4c0-1.104,0.896-2,2-2h12c1.104,0,2,0.896,2,2v2 M14.334,10c2.945,0,5.334,2.388,5.334,5.334c0,2.945-2.389,5.334-5.334,5.334 C11.388,20.668,9,18.279,9,15.334C9,12.388,11.388,10,14.334,10z M21,22l-2.9-2.9 M7,6h8 M7,10h1" />
    </svg>
  ),
  campaign: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M11,15H4 c-1.104,0-2-0.895-2-2v-3c0-1.104,0.896-2,2-2h7V15z M6,15c0,0-1,1-1,3s1,3,1,3h4c0,0-1-1-1-3s1-3,1-3 M11,15l9,5V3l-9,5 M20,14 c1.104,0,2-0.896,2-2s-0.896-2-2-2" />
    </svg>
  ),
  unsubscribe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12,18H4c-1.1,0-2-0.9-2-2 V4c0-1.1,0.9-2,2-2h15c1.1,0,2,0.9,2,2v10 M21,4l-10,7L2,4 M15,17h4 M17,12c-2.762,0-5,2.238-5,5s2.238,5,5,5s5-2.238,5-5 S19.762,12,17,12z" />
    </svg>
  ),
  bounced: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16,5h5v5 M7,19L21,5 M3,15 l4,4" />
    </svg>
  ),
  move: (
    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.41659 9.0026C2.41659 9.64427 1.89159 10.1693 1.24992 10.1693C0.608252 10.1693 0.083252 9.64427 0.083252 9.0026C0.083252 8.36094 0.608252 7.83594 1.24992 7.83594C1.89159 7.83594 2.41659 8.36094 2.41659 9.0026ZM1.24992 4.33594C0.608252 4.33594 0.083252 4.86094 0.083252 5.5026C0.083252 6.14427 0.608252 6.66927 1.24992 6.66927C1.89159 6.66927 2.41659 6.14427 2.41659 5.5026C2.41659 4.86094 1.89159 4.33594 1.24992 4.33594ZM1.24992 0.835938C0.608252 0.835938 0.083252 1.36094 0.083252 2.0026C0.083252 2.64427 0.608252 3.16927 1.24992 3.16927C1.89159 3.16927 2.41659 2.64427 2.41659 2.0026C2.41659 1.36094 1.89159 0.835938 1.24992 0.835938ZM4.74992 3.16927C5.39159 3.16927 5.91659 2.64427 5.91659 2.0026C5.91659 1.36094 5.39159 0.835938 4.74992 0.835938C4.10825 0.835938 3.58325 1.36094 3.58325 2.0026C3.58325 2.64427 4.10825 3.16927 4.74992 3.16927ZM4.74992 4.33594C4.10825 4.33594 3.58325 4.86094 3.58325 5.5026C3.58325 6.14427 4.10825 6.66927 4.74992 6.66927C5.39159 6.66927 5.91659 6.14427 5.91659 5.5026C5.91659 4.86094 5.39159 4.33594 4.74992 4.33594ZM4.74992 7.83594C4.10825 7.83594 3.58325 8.36094 3.58325 9.0026C3.58325 9.64427 4.10825 10.1693 4.74992 10.1693C5.39159 10.1693 5.91659 9.64427 5.91659 9.0026C5.91659 8.36094 5.39159 7.83594 4.74992 7.83594Z"
        fill="#262626"
        strokeWidth="0.2px"
      />
    </svg>
  ),

  // activities
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-mail"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  sms: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.007,14.991l-0.011,5.005c0,1.104-0.896,2-2,2L4,22.009c-1.104,0-2-0.896-2-2V3.991c0-1.104,0.896-2,2-2h11c1.104,0,2,0.896,2,2 M3,5.991h3 M16,15.991H3 M8,18.991h3 M22,6.991H10v4h3v2l3-2h6V6.991z" />
    </svg>
  ),
  dm: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14,16H2v-5.158V6.458C2,3.996,3.996,2,6.459,2l0,0 M6.459,2h10.604 M21.994,16v-5.423V6.5c0-2.014-1.324-3.719-3.146-4.292C18.42,2.073,17.967,2,17.495,2l0,0c-2.483,0-4.499,2.014-4.499,4.499v4.077V16H21.994z M14,16h-3v5h3V16z M8,21h9 M19.042,8H16" />
    </svg>
  ),
  appointment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,4h14c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V6C3,4.896,3.896,4,5,4z M16,2v4 M8,2v4 M3,10h18 M7.01,14h0.008 M7.01,17h0.008 M9.992,14H10 M9.992,17H10 M17,14h-4v4h4V14z" />
    </svg>
  ),
  task: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16,4h2c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H6c-1.104,0-2-0.896-2-2V6c0-1.104,0.896-2,2-2h2 M9,2h6c0.553,0,1,0.448,1,1v2c0,0.552-0.447,1-1,1H9C8.448,6,8,5.552,8,5V3C8,2.448,8.448,2,9,2z M7,10.5L8.5,12l2.25-3 M10,15H7v3h3V15z M14,11h3 M14,16h3" />
    </svg>
  ),
  fax: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.563,6.455H19.8c1.225,0,2.218,0.993,2.218,2.218v11.106c0,1.225-0.993,2.217-2.218,2.217H4.172c-1.225,0-2.218-0.992-2.218-2.217V8.673c0-1.225,0.993-2.218,2.218-2.218h4.66 M19.026,4.268c0-1.24-1.012-2.247-2.259-2.247h-4.529c-1.248,0-2.258,1.007-2.258,2.247v4.506c0,1.24,1.011,2.247,2.258,2.247h4.529c1.247,0,2.259-1.006,2.259-2.247V4.268z M7,7.377v13.781 M9.941,15h1.036 M14,15h1.037 M18,15h1.037 M10,18h1.036 M14.059,18h1.037 M18.059,18h1.037 M13,5h3 M13,8h2" />
    </svg>
  ),
  meeting: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-users"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  call: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-phone"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  report: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-bar-chart-2"
    >
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  missed_call: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11,3H5v6 M19,3l-7,7L5,3 M4.029,20.53l-1.605-1.604c-0.593-0.59-0.597-1.547-0.008-2.141c0.033-0.033,0.068-0.065,0.104-0.096C4.345,15.222,6.488,14.488,8.779,14c2.114-0.471,4.306-0.471,6.42,0c2.299,0.492,4.45,1.232,6.28,2.711c0.642,0.535,0.728,1.489,0.192,2.131c-0.029,0.035-0.06,0.068-0.091,0.1l-1.604,1.604c-0.532,0.543-1.384,0.607-1.99,0.15c-0.582-0.446-1.211-0.824-1.878-1.129c-0.538-0.244-0.885-0.778-0.888-1.37v-1.358c-2.102-0.577-4.319-0.577-6.42,0v1.358c-0.003,0.592-0.35,1.126-0.888,1.371c-0.666,0.304-1.296,0.682-1.877,1.127C5.421,21.158,4.558,21.087,4.029,20.53z" />
    </svg>
  ),
  pie: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-pie-chart"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    </svg>
  ),
  menu: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-menu"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  list: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-list"
    >
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3" y2="6"></line>
      <line x1="3" y1="12" x2="3" y2="12"></line>
      <line x1="3" y1="18" x2="3" y2="18"></line>
    </svg>
  ),
  grid: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-grid"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  refresh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-refresh-cw"
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  columns: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-columns"
    >
      <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
    </svg>
  ),
  left: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-left"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  right: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-right"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  down: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-down"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  feather: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-feather"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  ),
  user: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-user"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  maximize: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-maximize-2"
    >
      <polyline points="15 3 21 3 21 9"></polyline>
      <polyline points="9 21 3 21 3 15"></polyline>
      <line x1="21" y1="3" x2="14" y2="10"></line>
      <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
  ),
  minus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-minus"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  square: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-square"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  ),
  minimize: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-minimize-2"
    >
      <polyline points="4 14 10 14 10 20"></polyline>
      <polyline points="20 10 14 10 14 4"></polyline>
      <line x1="14" y1="10" x2="21" y2="3"></line>
      <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-info"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12" y2="8"></line>
    </svg>
  ),
  doc_file: (
    <svg id="file-type-doc" xmlns="http://www.w3.org/2000/svg" width="42px" height="51px" viewBox="0 0 42 51">
      {' '}
      <path fill="#5FB0F2" d="M42,49c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h32l8,8V49z"></path>{' '}
      <path fill="#4C9DE0" d="M42,14.83l-7.38-7.39L42,8V14.83z"></path>{' '}
      <path fill="#9FD3FF" d="M42,8h-6c-1.104,0-2-0.896-2-2V0L42,8z"></path>{' '}
      <path
        fill="#5FB0F2"
        d="M42,44c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1V44z M42,31c0,0.553-0.447,1-1,1H17c-0.552,0-1-0.447-1-1v-1c0-0.553,0.448-1,1-1h24c0.553,0,1,0.447,1,1V31z M42,37 c0-0.553-0.447-1-1-1H17c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V37z"
      ></path>{' '}
      <path
        fill="#5EAFF1"
        d="M41.742,43.742c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V43.742z M41.742,30.742c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.553,0.448-1,1-1h24c0.553,0,1,0.447,1,1V30.742z M41.742,36.742c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V36.742z"
      ></path>{' '}
      <path
        fill="#5EAEF0"
        d="M41.482,43.482c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V43.482z M41.482,30.482c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V30.482z M41.482,36.482c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V36.482z"
      ></path>{' '}
      <path
        fill="#5DADEF"
        d="M41.227,43.227c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V43.227z M41.227,30.227c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.553,0.448-1,1-1h24c0.552,0,1,0.447,1,1V30.227z M41.227,36.227c0-0.553-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V36.227z"
      ></path>{' '}
      <path
        fill="#5CACEE"
        d="M40.968,42.968c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V42.968z M40.968,29.968c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V29.968z M40.968,35.968c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V35.968z"
      ></path>{' '}
      <path
        fill="#5BABED"
        d="M40.71,42.71c0-0.552-0.448-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1 V42.71z M40.71,29.71c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V29.71z M40.71,35.71c0-0.552-0.448-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V35.71z"
      ></path>{' '}
      <path
        fill="#5BABEC"
        d="M40.451,42.451c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V42.451z M40.451,29.451c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.553,0.448-1,1-1h24c0.553,0,1,0.447,1,1V29.451z M40.451,35.451c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V35.451z"
      ></path>{' '}
      <path
        fill="#5AAAEB"
        d="M40.193,42.193c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V42.193z M40.193,29.193c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.553,0.448-1,1-1h24c0.552,0,1,0.447,1,1V29.193z M40.193,35.193c0-0.553-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V35.193z"
      ></path>{' '}
      <path
        fill="#59A9EA"
        d="M39.936,41.936c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V41.936z M39.936,28.936c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V28.936z M39.936,34.936c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V34.936z"
      ></path>{' '}
      <path
        fill="#58A8E9"
        d="M39.678,41.678c0-0.552-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V41.678z M39.678,28.678c0,0.553-0.447,1-1,1h-24c-0.553,0-1-0.447-1-1v-1c0-0.552,0.447-1,1-1h24c0.553,0,1,0.448,1,1V28.678z M39.678,34.678c0-0.552-0.447-1-1-1h-24c-0.553,0-1,0.448-1,1v1c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1V34.678z"
      ></path>{' '}
      <path
        fill="#58A7E8"
        d="M39.419,41.419c0-0.552-0.448-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1 V41.419z M39.419,28.419c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V28.419z M39.419,34.419c0-0.552-0.448-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V34.419z"
      ></path>{' '}
      <path
        fill="#57A6E7"
        d="M39.161,41.161c0-0.552-0.448-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1 V41.161z M39.161,28.161c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V28.161z M39.161,34.161c0-0.552-0.448-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V34.161z"
      ></path>{' '}
      <path
        fill="#56A5E6"
        d="M38.902,40.902c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V40.902z M38.902,27.902c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V27.902z M38.902,33.902c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V33.902z"
      ></path>{' '}
      <path
        fill="#55A4E5"
        d="M38.646,40.646c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V40.646z M38.646,27.646c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.553,0.448-1,1-1h24c0.552,0,1,0.448,1,1V27.646z M38.646,33.646c0-0.553-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V33.646z"
      ></path>{' '}
      <path
        fill="#55A3E4"
        d="M38.387,40.387c0-0.552-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V40.387z M38.387,27.387c0,0.553-0.447,1-1,1h-24c-0.553,0-1-0.447-1-1v-1c0-0.552,0.447-1,1-1h24c0.553,0,1,0.448,1,1V27.387z M38.387,33.387c0-0.552-0.447-1-1-1h-24c-0.553,0-1,0.448-1,1v1c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1V33.387z"
      ></path>{' '}
      <path
        fill="#54A2E3"
        d="M38.129,40.129c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V40.129z M38.129,27.129c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V27.129z M38.129,33.129c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V33.129z"
      ></path>{' '}
      <path
        fill="#53A2E3"
        d="M37.871,39.871c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V39.871z M37.871,26.871c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V26.871z M37.871,32.871c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V32.871z"
      ></path>{' '}
      <path
        fill="#52A1E2"
        d="M37.613,39.613c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.553,0,1-0.448,1-1 V39.613z M37.613,26.613c0,0.552-0.447,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V26.613z M37.613,32.613c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.553,0,1-0.448,1-1V32.613z"
      ></path>{' '}
      <path
        fill="#52A0E1"
        d="M37.354,39.354c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V39.354z M37.354,26.354c0,0.553-0.447,1-1,1h-24c-0.552,0-1-0.447-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V26.354z M37.354,32.354c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V32.354z"
      ></path>{' '}
      <path
        fill="#519FE0"
        d="M37.098,39.098c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V39.098z M37.098,26.098c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V26.098z M37.098,32.098c0-0.553-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V32.098z"
      ></path>{' '}
      <path
        fill="#509EDF"
        d="M36.839,38.839c0-0.552-0.448-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1 V38.839z M36.839,25.839c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V25.839z M36.839,31.839c0-0.552-0.448-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V31.839z"
      ></path>{' '}
      <path
        fill="#4F9DDE"
        d="M36.581,38.581c0-0.552-0.448-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1 V38.581z M36.581,25.581c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V25.581z M36.581,31.581c0-0.552-0.448-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V31.581z"
      ></path>{' '}
      <path
        fill="#4F9CDD"
        d="M36.322,38.322c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.553,0,1-0.448,1-1 V38.322z M36.322,25.323c0,0.552-0.447,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.553,0.448-1,1-1h24c0.553,0,1,0.447,1,1V25.323z M36.322,31.322c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.553,0,1-0.448,1-1V31.322z"
      ></path>{' '}
      <path
        fill="#4E9BDC"
        d="M36.064,38.064c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V38.064z M36.064,25.064c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V25.064z M36.064,31.064c0-0.553-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V31.064z"
      ></path>{' '}
      <path
        fill="#4D9ADB"
        d="M35.807,37.807c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V37.807z M35.807,24.807c0,0.552-0.447,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V24.807z M35.807,30.807c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V30.807z"
      ></path>{' '}
      <path
        fill="#4C99DA"
        d="M35.549,37.549c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V37.549z M35.549,24.548c0,0.552-0.447,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V24.548z M35.549,30.549c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V30.549z"
      ></path>{' '}
      <path
        fill="#4C99D9"
        d="M35.29,37.29c0-0.552-0.448-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h8c0.552,0,1-0.448,1-1 V37.29z M35.29,24.291c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V24.291z M35.29,30.29c0-0.552-0.448-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V30.29z"
      ></path>{' '}
      <path
        fill="#4B98D8"
        d="M35.032,37.032c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V37.032z M35.032,24.032c0,0.552-0.448,1-1,1h-24c-0.553,0-1-0.448-1-1v-1c0-0.553,0.447-1,1-1h24c0.552,0,1,0.447,1,1V24.032z M35.032,30.032c0-0.553-0.448-1-1-1h-24c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h24c0.552,0,1-0.448,1-1V30.032z"
      ></path>{' '}
      <path
        fill="#4A97D7"
        d="M34.773,36.773c0-0.552-0.447-1-1-1h-8c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h8c0.553,0,1-0.447,1-1 V36.773z M34.773,23.774c0,0.552-0.447,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V23.774z M34.773,29.773c0-0.552-0.447-1-1-1h-24c-0.552,0-1,0.448-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V29.773z"
      ></path>{' '}
      <path
        fill="#4996D6"
        d="M34.518,36.518c0-0.553-0.448-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.552,0.447,1,1,1h8c0.552,0,1-0.448,1-1 V36.518z M34.518,23.516c0,0.552-0.448,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.552,0,1,0.448,1,1V23.516z M34.518,29.518c0-0.553-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.552,0.448,1,1,1h24c0.552,0,1-0.448,1-1V29.518z"
      ></path>{' '}
      <path
        fill="#4995D5"
        d="M34.258,36.258c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1 V36.258z M34.258,23.258c0,0.552-0.447,1-1,1h-24c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V23.258z M34.258,29.258c0-0.553-0.447-1-1-1h-24c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V29.258z"
      ></path>{' '}
      <path
        fill="#4894D4"
        d="M34,36c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1V36z M34,23c0,0.552-0.447,1-1,1H9c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V23z M34,29c0-0.553-0.447-1-1-1 H9c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V29z"
      ></path>{' '}
      <path fill="#4691CF" d="M35,24c0,0.552-0.447,1-1,1H10c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V24z"></path>{' '}
      <path fill="#FFFFFF" d="M34,23c0,0.552-0.447,1-1,1H9c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h24c0.553,0,1,0.448,1,1V23z"></path>{' '}
      <path fill="#4691CF" d="M35,30c0-0.553-0.447-1-1-1H10c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V30z"></path>{' '}
      <path fill="#FFFFFF" d="M34,29c0-0.553-0.447-1-1-1H9c-0.552,0-1,0.447-1,1v1c0,0.553,0.448,1,1,1h24c0.553,0,1-0.447,1-1V29z"></path>{' '}
      <path fill="#4691CF" d="M35,37c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1V37z"></path>{' '}
      <path
        fill="#FFFFFF"
        d="M34,36c0-0.553-0.447-1-1-1h-8c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1h8c0.553,0,1-0.447,1-1V36z M12.059,5.818h-1.912v4.903h1.912c1.541,0,2.605-1.072,2.605-2.451V8.255C14.664,6.875,13.599,5.818,12.059,5.818z M13.536,8.283 c0,0.869-0.595,1.464-1.478,1.464h-0.833V6.792h0.833c0.882,0,1.478,0.609,1.478,1.478V8.283z M18.702,10.805 c-1.513,0-2.599-1.127-2.599-2.521V8.27c0-1.394,1.1-2.536,2.612-2.536c1.513,0,2.599,1.128,2.599,2.521V8.27 C21.314,9.663,20.215,10.805,18.702,10.805z M20.187,8.27c0-0.841-0.617-1.541-1.485-1.541c-0.869,0-1.471,0.687-1.471,1.527V8.27 c0,0.84,0.616,1.541,1.484,1.541c0.869,0,1.471-0.686,1.471-1.527L20.187,8.27L20.187,8.27z M25.268,10.805 c-1.442,0-2.515-1.114-2.515-2.521V8.27c0-1.394,1.052-2.536,2.558-2.536c0.924,0,1.478,0.308,1.933,0.756l-0.687,0.792 c-0.379-0.343-0.764-0.553-1.254-0.553c-0.826,0-1.422,0.687-1.422,1.527V8.27c0,0.84,0.581,1.541,1.422,1.541 c0.561,0,0.903-0.224,1.289-0.574l0.686,0.693C26.773,10.469,26.213,10.805,25.268,10.805z"
      ></path>{' '}
    </svg>
  ),
  group_plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {' '}
      <path
        className="st0"
        d="M20,9v6 M23,12h-6 M11.359,20.004v-1.6c0-1.891-1.469-3.422-3.359-3.422H4.423C2.533,14.982,1,16.514,1,18.404 v1.6 M6.179,3.996c1.754,0,3.175,1.421,3.175,3.174c0,1.754-1.421,3.174-3.175,3.174c-1.753,0-3.175-1.421-3.175-3.174 S4.426,3.996,6.179,3.996z M16.566,20.021v-1.711C16.564,16.752,15.51,15.389,14,15 M12,3.996c1.753,0.45,2.811,2.234,2.36,3.987 c-0.297,1.159-1.203,2.066-2.36,2.362"
      />{' '}
    </svg>
  ),
  date_plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="st0"
        d="M5,4h14c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V6C3,4.896,3.896,4,5,4z M16,2v4 M8,2v4 M3,10h18 M12,13v6 M9,16h6"
      />
    </svg>
  ),
  google: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className="st0" d="M16.475,4.189C15.156,3.433,13.629,3,12,3c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9h-9" />{' '}
    </svg>
  ),
  company_folder: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="st0"
        d="M9.031,21H4c-1.104,0-2-0.896-2-2V5c0-1.104,0.896-2,2-2h5l2,3h9c1.104,0,2,0.896,2,2 M14.224,11h6.56 C21.454,11,22,11.551,22,12.23v7.54C22,20.447,21.454,21,20.783,21h-6.56c-0.669,0-1.215-0.553-1.215-1.229v-7.54 C13.009,11.551,13.555,11,14.224,11z M16,14h3 M16,17h3"
      />
    </svg>
  ),
  personal_folder: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="st0"
        d="M9.031,21H4c-1.104,0-2-0.896-2-2V5c0-1.104,0.896-2,2-2h5l2,3h9c1.104,0,2,0.896,2,2v1 M22.331,21v-1.203 c0-1.329-1.077-2.406-2.406-2.406h-4.813c-1.329,0-2.406,1.077-2.406,2.406V21 M17.519,10.172c1.329,0,2.406,1.078,2.406,2.406 c0,1.329-1.077,2.406-2.406,2.406s-2.406-1.077-2.406-2.406C15.112,11.25,16.189,10.172,17.519,10.172z"
      />
    </svg>
  ),
  user_plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-user-plus"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  ),
  user_minus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-user-minus"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  ),
  upload: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-upload-cloud"
    >
      <polyline points="16 16 12 12 8 16"></polyline>
      <line x1="12" y1="12" x2="12" y2="21"></line>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
      <polyline points="16 16 12 12 8 16"></polyline>
    </svg>
  ),
  upload_cloud: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16"></polyline>
      <line x1="12" y1="12" x2="12" y2="21"></line>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
      <polyline points="16 16 12 12 8 16"></polyline>
    </svg>
  ),
  call_duration: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
  ),
  clock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-clock"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  rep_change_history: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7,13H5.186C3.426,13,2,14.427,2,16.186V20 M8.486,2.04c1.92,0,3.478,1.557,3.478,3.478 c0,1.92-1.557,3.478-3.478,3.478c-1.92,0-3.477-1.558-3.477-3.478C5.009,3.597,6.566,2.04,8.486,2.04z M10,13v3h3 M18,17h-2v-3 M11.29,14.734C12.025,12.563,14.08,11,16.5,11c3.037,0,5.5,2.463,5.5,5.5S19.537,22,16.5,22c-1.884,0-3.546-0.947-4.537-2.391" />
    </svg>
  ),
  issue: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {' '}
      <path
        className="st0"
        d="M22.021,11.444c0.004,1.468-0.34,2.917-1.003,4.229c-1.602,3.206-4.878,5.232-8.46,5.235 c-1.471,0.006-2.921-0.34-4.232-1.004l-6.346,2.116l2.115-6.348c-0.662-1.313-1.004-2.761-1.001-4.229 c0.002-3.585,2.027-6.86,5.233-8.461c1.311-0.664,2.761-1.007,4.232-1.003h0.555c4.808,0.265,8.644,4.102,8.908,8.907V11.444z M12,7 v5 M12,16h0.011"
      />{' '}
    </svg>
  ),
  copy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-copy"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
  user_x: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-user-x"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="18" y1="8" x2="23" y2="13"></line> <line x1="23" y1="8" x2="18" y2="13"></line>
    </svg>
  ),
  pause_circle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-pause-circle"
    >
      <circle cx="12" cy="12" r="10"></circle> <line x1="10" y1="15" x2="10" y2="9"></line> <line x1="14" y1="15" x2="14" y2="9"></line>
    </svg>
  ),
  income: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>수신</title>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  ),
  outgoing: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>발신</title>
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  ),
  survey: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M16 3h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m1-1h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-1.998 9 .923 1L11 9m3 8h3m-3-6h3m-9.667 4h2.335c.184 0 .332.149.332.334v2.332a.332.332 0 0 1-.333.334H7.333A.332.332 0 0 1 7 17.666v-2.332c0-.185.148-.334.333-.334z" />
    </svg>
  ),
  mobile_sync: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-refresh-ccw"
    >
      <polyline points="1 4 1 10 7 10"></polyline>
      <polyline points="23 20 23 14 17 14"></polyline>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    </svg>
  ),
  agenda: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11,7h4 M11,12h1 M7,7L7,7 M7,12L7,12 M7,17L7,17 M19,9.341c0.455-0.455,1.193-0.455,1.648,0s0.455,1.193,0,1.648l-6.382,6.424L12,18.033l0.618-2.268 L19,9.341z M19,18v2c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h12c1.104,0,2,0.896,2,2v1" />
    </svg>
  ),
  memo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,16V4 c0-1.104-0.896-2-2-2H4C2.896,2,2,2.896,2,4v16c0,1.104,0.896,2,2,2h12L22,16z M22,16h-6v6" />
    </svg>
  ),

  //selling
  refund: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0.97,3.978v6.017h6.016 M5.776,18.74c2.602,2.856,6.755,4.04,10.627,2.677 c5.166-1.821,7.876-7.481,6.058-12.646c-1.818-5.164-7.481-7.875-12.645-6.056C8.42,3.207,7.153,4.004,6.106,5.05L1.944,8.902 M14,6.338v11.324 M10,16.011h5.821c1.201,0,2.179-0.896,2.179-2.005s-0.978-2.005-2.179-2.005l-3.645-0.007 c-1.201,0-2.177-0.898-2.177-2.005c0-1.108,0.976-2.007,2.177-2.007L18,8" />
    </svg>
  ),
  return: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0.992,3.978v6.017h6.016 M5.776,18.74c2.602,2.855,6.755,4.039,10.626,2.677 c5.166-1.821,7.877-7.481,6.059-12.646c-1.818-5.164-7.48-7.875-12.645-6.056C8.42,3.207,7.153,4.004,6.106,5.05L1.944,8.902 M18,16.001h-8V8h8V16.001z M15.063,11h-2V8h2V11z" />
    </svg>
  ),
  exchange: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5,8.4l-9-5.19 M19,9V7c0-0.714-0.382-1.373-1-1.73l-7-4c-0.619-0.357-1.381-0.357-2,0l-7,4 C1.382,5.627,1,6.286,1,7v8c0,0.714,0.382,1.373,1,1.73l5.061,2.892 M1.27,5.96L10,11.01l8.73-5.05 M10,13v-2 M4.031,14v-1.99 M7,16 v-1.99 M14.5,8.4v1.605 M23,13.271v3.435h-3.435 M10.406,22.43v-3.435h3.435 M11.843,16.133c0.949-2.683,3.894-4.088,6.575-3.138 c0.725,0.256,1.383,0.671,1.926,1.215L23,16.705 M10.406,18.995l2.656,2.495c2.012,2.013,5.273,2.014,7.285,0.002 c0.544-0.543,0.96-1.2,1.216-1.925" />
    </svg>
  ),
  termination_subscription: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.938,21H3c-1.104,0-2-0.896-2-2V5c0-1.104,0.896-2,2-2h14c1.104,0,2,0.896,2,2v7 M14,1v4 M6,1v4 M1,9h18 M23,13L13,23 M13,13l10,10" />
    </svg>
  ),
  coupon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1,20c0,1.104,0.896,2,2,2h18c1.104,0,2-0.896,2-2v-4.979V15c-1.657,0-3-1.344-3-3.001C20,10.343,21.343,9,23,9 v0.021V4c0-1.104-0.896-2-2-2H3C1.896,2,1,2.896,1,4v5c1.657,0,3,1.343,3,2.999C4,13.656,2.657,15,1,15V20z M15,15.465 C14.412,15.805,13.729,16,13,16c-2.209,0-4-1.791-4-4s1.791-4,4-4c0.729,0,1.413,0.195,2.002,0.536" />
    </svg>
  ),
  point: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9,8v8 M9,13.021h3.52c1.387,0,2.512-1.124,2.512-2.511l0,0C15.031,9.124,13.906,8,12.52,8H9 M1.016,20 c0,1.104,0.896,2,2,2h18c1.104,0,2-0.896,2-2v-4.979V15c-1.657,0-3-1.344-3-3.001c0-1.656,1.343-2.999,3-2.999v0.021V4 c0-1.104-0.896-2-2-2h-18c-1.104,0-2,0.896-2,2v5c1.657,0,3,1.343,3,2.999c0,1.657-1.343,3.001-3,3.001V20z" />
    </svg>
  ),
  prepaid: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.016,20c0,1.104,0.896,2,2,2h18c1.104,0,2-0.896,2-2v-4.979V15c-1.657,0-3-1.344-3-3.001 c0-1.656,1.343-2.999,3-2.999v0.021V4c0-1.104-0.896-2-2-2h-18c-1.104,0-2,0.896-2,2v5c1.657,0,3,1.343,3,2.999 c0,1.657-1.343,3.001-3,3.001V20z M12.017,6v12 M8.017,16.011h5.82c1.201,0,2.18-0.896,2.18-2.005s-0.979-2.005-2.18-2.005 l-3.645-0.007c-1.201,0-2.177-0.898-2.177-2.005c0-1.108,0.976-2.007,2.177-2.007L16.017,8" />
    </svg>
  ),
  stamp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.186,6.342c2.054-0.682,3.978-0.506,5.154,0.67c0.36,0.362,1.717,1.719,2.079,2.08 c2.064,2.066,1.813,7.219-1.519,10.55c-3.334,3.331-7.711,4.358-9.778,2.292c-0.359-0.364-2.492-2.498-2.854-2.856 c-1.152-1.155-1.343-3.023-0.707-5.033 M7.268,19.077c1.311,1.312,3.555,1.379,5.869,0.398c0.544-0.229,1.088-0.515,1.627-0.854 M17.045,16.785c3.334-3.328,4.36-7.707,2.295-9.773 M2.335,8.655c1.146,1.148,3.551,0.607,5.371-1.209 c1.819-1.818,2.362-4.224,1.212-5.372C8.703,1.857,8.667,1.82,8.449,1.603c-1.15-1.149-3.555-0.607-5.373,1.21 c-1.817,1.816-2.36,4.221-1.213,5.371C2.08,8.4,2.116,8.438,2.335,8.655z M5.376,8.94c0.149,0.147,5.286,5.287,5.434,5.434 c0.779,0.779,2.269,0.559,3.323-0.498c1.058-1.055,1.28-2.543,0.501-3.323c-0.148-0.148-5.286-5.288-5.433-5.435" />
    </svg>
  ),
  complete: (
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="310" viewBox="0 0 300 310" fill="none">
      <circle className="path" cx="145" cy="145" r="124.67" stroke="#cfd8dc" strokeMiterlimit="10" strokeWidth="20px" />
      <polyline
        className="path"
        points="88.75 148.26 124.09 183.6 201.37 106.32"
        stroke="#21b587"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="25px"
      />
    </svg>
  ),
  keypad: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,4c0,1.104-0.896,2-2,2S2,5.104,2,4s0.896-2,2-2S6,2.896,6,4z M20.006,2c-1.104,0-2,0.896-2,2s0.896,2,2,2 s2-0.896,2-2S21.11,2,20.006,2z M12,2c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S13.104,2,12,2z M3.997,18c-1.104,0-2,0.896-2,2 s0.896,2,2,2s2-0.896,2-2S5.102,18,3.997,18z M20.003,18c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S21.107,18,20.003,18z M11.997,18c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S13.102,18,11.997,18z M3.997,10c-1.104,0-2,0.896-2,2s0.896,2,2,2 s2-0.896,2-2S5.102,10,3.997,10z M20.003,10c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S21.107,10,20.003,10z M11.997,10 c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S13.102,10,11.997,10z" />
    </svg>
  ),
  cash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.564,17.011c0-0.793,0.643-1.436,1.436-1.436l0,0V8.424c-0.793,0-1.436-0.479-1.436-1.435H5.436l0,0 c0,0.956-0.642,1.435-1.436,1.435l0,0v7.151l0,0c0.794,0,1.436,0.643,1.436,1.436l0,0H18.564L18.564,17.011z M6.739,12h0.956 M16.304,12h0.957 M12,10.083c-1.057,0-1.913,0.857-1.913,1.913s0.856,1.913,1.913,1.913s1.913-0.856,1.913-1.913 S13.057,10.083,12,10.083z M3,4h18c1.104,0,2,0.896,2,2v12c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2V6C1,4.896,1.896,4,3,4z" />
    </svg>
  ),
  card_plus_big: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      width="18"
      height="18"
      viewBox="0 0 576 512"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      data-icon="cart-plus"
      className="svg-inline--fa fa-cart-plus fa-w-18"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"
      ></path>
    </svg>
  ),
  cart_plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M19,6h3l-3,9H9L6,3H2 M10,18c-0.828,0-1.5,0.671-1.5,1.5S9.172,21,10,21c0.829,0,1.5-0.671,1.5-1.5 S10.829,18,10,18z M18,18c-0.828,0-1.5,0.671-1.5,1.5S17.172,21,18,21c0.829,0,1.5-0.671,1.5-1.5S18.829,18,18,18z M11.5,8.5h5 M14,11V6" />
    </svg>
  ),
  //loyalty
  default_coupon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="330px" height="165px" viewBox="0 0 330 165" enableBackground="new 0 0 330 165">
      <path
        fill="#233DC5"
        d="M329.667,159.459c0.112,0,0.222,0.01,0.332,0.016v-5.236c-0.014,0-0.027,0.002-0.041,0.002 c-3.079,0-5.575-2.496-5.575-5.576c0-3.078,2.496-5.574,5.575-5.574c0.014,0,0.027,0.002,0.041,0.002v-5.375 c-0.11,0.006-0.22,0.018-0.332,0.018c-3.079,0-5.575-2.496-5.575-5.576c0-3.078,2.496-5.574,5.575-5.574 c0.112,0,0.222,0.01,0.332,0.016v-5.758c-0.11,0.006-0.22,0.018-0.332,0.018c-3.079,0-5.575-2.496-5.575-5.576 c0-3.078,2.496-5.574,5.575-5.574c0.112,0,0.222,0.01,0.332,0.016v-5.236c-0.014,0-0.027,0.002-0.041,0.002 c-3.079,0-5.575-2.496-5.575-5.576c0-3.078,2.496-5.574,5.575-5.574c0.014,0,0.027,0.002,0.041,0.002v-5.375 c-0.11,0.006-0.22,0.018-0.332,0.018c-3.079,0-5.575-2.496-5.575-5.576c0-3.079,2.496-5.575,5.575-5.575 c0.112,0,0.222,0.01,0.332,0.017v-5.237c-0.014,0-0.027,0.002-0.041,0.002c-3.079,0-5.575-2.496-5.575-5.575 s2.496-5.575,5.575-5.575c0.014,0,0.027,0.002,0.041,0.002v-5.499c-0.11,0.006-0.22,0.017-0.332,0.017 c-3.079,0-5.575-2.496-5.575-5.575s2.496-5.575,5.575-5.575c0.112,0,0.222,0.01,0.332,0.017v-5.237 c-0.014,0-0.027,0.002-0.041,0.002c-3.079,0-5.575-2.496-5.575-5.575s2.496-5.575,5.575-5.575c0.014,0,0.027,0.002,0.041,0.002 v-5.374c-0.11,0.006-0.22,0.017-0.332,0.017c-3.079,0-5.575-2.496-5.575-5.575s2.496-5.575,5.575-5.575 c0.112,0,0.222,0.01,0.332,0.017V5.737c-0.014,0-0.027,0.002-0.041,0.002c-3.079,0-5.575-2.496-5.575-5.575 c0-0.056,0.007-0.109,0.009-0.164h-324.4v164.988h324.103C324.12,161.93,326.604,159.459,329.667,159.459z"
      />
      <g>
        <path
          fill="#FFFFFF"
          d="M0.527,164.618V0.499h294.35v61.386c-0.993-0.128-2-0.193-3-0.193c-12.78,0-23.178,10.397-23.178,23.178 s10.397,23.178,23.178,23.178c1,0,2.007-0.065,3-0.193v56.765H0.527z"
        />
        <path
          fill="#BDBEC6"
          d="M294.376,0.999v60.324c-0.831-0.087-1.668-0.131-2.5-0.131c-13.056,0-23.678,10.622-23.678,23.678 c0,13.056,10.622,23.678,23.678,23.678c0.832,0,1.67-0.044,2.5-0.132v55.703H1.027V0.999H294.376 M295.376-0.001H0.027v165.12 h295.35v-57.841c-1.141,0.177-2.31,0.27-3.5,0.27c-12.524,0-22.678-10.153-22.678-22.678s10.153-22.678,22.678-22.678 c1.19,0,2.359,0.093,3.5,0.27V-0.001L295.376-0.001z"
        />
      </g>
      <g>
        <g>
          <path
            fill="#233DC5"
            d="M120.612,29.907l-1.339,1.276c-0.911-0.962-1.935-1.444-3.073-1.444c-0.961,0-1.77,0.329-2.428,0.985 c-0.658,0.657-0.987,1.467-0.987,2.429c0,0.67,0.146,1.266,0.437,1.786s0.704,0.928,1.236,1.225s1.125,0.445,1.776,0.445 c0.555,0,1.063-0.104,1.523-0.312c0.46-0.208,0.965-0.585,1.516-1.132l1.298,1.354c-0.743,0.725-1.445,1.228-2.105,1.508 c-0.661,0.28-1.415,0.42-2.263,0.42c-1.563,0-2.843-0.496-3.838-1.487s-1.494-2.262-1.494-3.811c0-1.002,0.227-1.894,0.68-2.673 s1.103-1.406,1.948-1.88s1.756-0.711,2.731-0.711c0.83,0,1.628,0.175,2.396,0.525C119.394,28.763,120.056,29.261,120.612,29.907z"
          />
          <path
            fill="#233DC5"
            d="M128.714,27.887c1.423,0,2.646,0.515,3.67,1.545s1.536,2.286,1.536,3.767c0,1.467-0.505,2.709-1.515,3.726 s-2.236,1.524-3.677,1.524c-1.509,0-2.764-0.522-3.762-1.565s-1.498-2.283-1.498-3.719c0-0.961,0.232-1.846,0.698-2.652 s1.104-1.446,1.919-1.917C126.898,28.123,127.775,27.887,128.714,27.887z M128.694,29.76c-0.931,0-1.713,0.324-2.347,0.971 c-0.634,0.647-0.951,1.47-0.951,2.468c0,1.112,0.399,1.992,1.198,2.639c0.62,0.506,1.332,0.759,2.135,0.759 c0.908,0,1.681-0.328,2.32-0.984s0.958-1.465,0.958-2.427c0-0.957-0.322-1.767-0.965-2.43S129.615,29.76,128.694,29.76z"
          />
          <path
            fill="#233DC5"
            d="M137.336,28.14h1.921v6.502c0,0.56,0.049,0.957,0.147,1.188c0.098,0.232,0.26,0.418,0.485,0.557 c0.226,0.139,0.498,0.208,0.817,0.208c0.337,0,0.628-0.077,0.872-0.232c0.244-0.155,0.413-0.352,0.506-0.59 c0.093-0.239,0.14-0.696,0.14-1.37V28.14h1.921v5.995c0,1.012-0.057,1.713-0.171,2.105s-0.332,0.77-0.653,1.135 s-0.691,0.635-1.111,0.81s-0.907,0.263-1.463,0.263c-0.729,0-1.364-0.167-1.904-0.502c-0.54-0.335-0.926-0.754-1.159-1.258 s-0.349-1.354-0.349-2.553V28.14z"
          />
          <path
            fill="#233DC5"
            d="M148.04,28.14h2.03c1.098,0,1.89,0.102,2.375,0.304s0.868,0.531,1.148,0.984s0.42,0.997,0.42,1.63 c0,0.702-0.184,1.285-0.55,1.75s-0.865,0.789-1.494,0.971c-0.369,0.105-1.042,0.157-2.017,0.157v4.259h-1.914V28.14z M149.954,32.071h0.608c0.479,0,0.811-0.034,0.998-0.103c0.187-0.068,0.334-0.182,0.441-0.339s0.161-0.349,0.161-0.573 c0-0.389-0.15-0.672-0.451-0.851c-0.219-0.132-0.625-0.199-1.217-0.199h-0.54V32.071z"
          />
          <path
            fill="#233DC5"
            d="M162.315,27.887c1.423,0,2.646,0.515,3.67,1.545s1.536,2.286,1.536,3.767c0,1.467-0.506,2.709-1.516,3.726 s-2.236,1.524-3.677,1.524c-1.509,0-2.764-0.522-3.762-1.565s-1.498-2.283-1.498-3.719c0-0.961,0.232-1.846,0.698-2.652 s1.104-1.446,1.919-1.917C160.499,28.123,161.375,27.887,162.315,27.887z M162.294,29.76c-0.931,0-1.713,0.324-2.347,0.971 c-0.634,0.647-0.951,1.47-0.951,2.468c0,1.112,0.399,1.992,1.198,2.639c0.62,0.506,1.332,0.759,2.135,0.759 c0.908,0,1.681-0.328,2.319-0.984c0.639-0.656,0.959-1.465,0.959-2.427c0-0.957-0.322-1.767-0.966-2.43 C163.999,30.092,163.216,29.76,162.294,29.76z"
          />
          <path fill="#233DC5" d="M171.012,28.14h1.836l4.303,6.617V28.14h1.914v10.056h-1.842l-4.297-6.597v6.597h-1.914V28.14z" />
        </g>
      </g>
    </svg>
  ),

  //Quotes
  flow: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,3h14c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M9,3v18 M15.063,3v18" />
    </svg>
  ),
  convert: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.318,15.963L19.281,14l-1.963-1.963 M13,18.01V15.57c0-0.867,0.703-1.57,1.57-1.57h4.711 M16.822,19.074 L15,21.037L16.822,23 M21,17.975v1.492c0,0.867-0.648,1.508-1.516,1.508H15 M19,8.969V8l-7-7H5C3.896,1,3,1.896,3,3v16 c0,1.104,0.896,2,2,2h5 M12,1v7h7" />
    </svg>
  ),
  invoice: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M17.031,20L12,23l-4.958-3L2,23V1h20v22L17.031,20z M12,17.041v-12 M8.729,14.857h4.638
	c1.055,0,1.908-0.854,1.908-1.908c0-1.055-0.854-1.908-1.908-1.908h-2.729c-1.056,0-1.91-0.854-1.91-1.908
	c0-1.054,0.854-1.909,1.91-1.909h4.088"
      />
    </svg>
  ),
  export_pdf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.766,16.531V23 M22,19.766L18.766,23l-3.234-3.234 M20,12V8l-7-7H6C4.896,1,4,1.896,4,3v16 c0,1.104,0.896,2,2,2h5 M13,1v7h7 M15.625,16.375c-2.938-1.688-4.248-5.875-4.248-5.875c-0.127,2.5-4.44,6.813-4.44,6.813 C10.688,15.563,15.625,16.375,15.625,16.375z" />
    </svg>
  ),
  preview: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18,10.167V8l-6-6H4C2.896,2,2,2.896,2,4v16c0,1.104,0.896,2,2,2h7 M12,2v6h6 M9,13H6 M7,17H6 M8,9H7H6 M17,13 c2.209,0,4.001,1.79,4.001,4c0,2.209-1.792,4.001-4.001,4.001c-2.21,0-4-1.792-4-4.001C13,14.79,14.79,13,17,13z M22,22 l-2.175-2.175" />
    </svg>
  ),
  customer_preview: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="st0"
        d="M17,13c2.209,0,4.001,1.79,4.001,4c0,2.209-1.792,4.001-4.001,4.001c-2.21,0-4-1.792-4-4.001 C13,14.79,14.79,13,17,13z M22,22l-2.175-2.175 M10,17.016L6,13c-2.209,0-4,2.791-4,5v2 M10,2c2.209,0,4,1.791,4,4s-1.791,4-4,4 S6,8.209,6,6S7.791,2,10,2z"
      />
    </svg>
  ),
  attachment_file: (
    <svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" viewBox="0 0 128 128">
      <polygon fill="#6D6E71" points="128,46 128,28 44,28 44,12 0,12 0,46 " />
      <rect y="42" fill="#BCBEC0" width="128" height="74" />
      <polygon opacity="0.1" points="0,42 74,116 128,116 128,42 " />
      <rect y="42" fill="#D1D3D4" width="128" height="4" />
    </svg>
  ),
  attachment_image: (
    <svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" viewBox="0 0 128 128">
      <rect y="16" fill="#D1D3D4" width="128" height="96" />
      <rect x="6" y="22" fill="#A7A9AC" width="116" height="84" />
      <polygon fill="#6D6E71" points="122,66.875 100.434,50 40,106 122,106 " />
      <polygon fill="#58595B" points="12.5,106 50.5,72 95.5,106 " />
      <polygon opacity="0.1" points="21.022,56.817 70.205,106 109.795,106 40.814,37.02 " />
      <circle fill="#FFFFFF" cx="31" cy="47" r="14" />
    </svg>
  ),
  attachment_camera: (
    <svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" viewBox="0 0 128 128">
      <path fill="#D1D3D4" d="M96.334,36L88,16H40l-8.334,20H0v76h128V36H96.334z" />
      <rect y="52" fill="#808285" width="128" height="60" />
      <rect y="48" fill="#333333" width="128" height="4" />
      <path fill="#58595B" d="M64,40c-17.673,0-32,14.329-32,32c0,17.675,14.327,32,32,32s32-14.325,32-32C96,54.329,81.673,40,64,40z" />
      <path fill="#D1D3D4" d="M64,98c-14.336,0-26-11.663-26-26s11.664-26,26-26c14.336,0,26,11.663,26,26S78.336,98,64,98z" />
      <path fill="#414042" d="M64,94c-12.131,0-22-9.869-22-22s9.869-22,22-22s22,9.869,22,22S76.131,94,64,94z" />
      <polygon opacity="0.1" points="88,16 40,16 31.666,36 107.666,112 128,112 128,36 96.334,36 " />
    </svg>
  ),
  subscription: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M17.77,14.27c0-.39,0-.77,0-1.16a1.7,1.7,0,0,0-1.84-1.71.79.79,0,0,1-.3-.11l-.29-.17a1.51,1.51,0,0,0-.65-.31,1.64,1.64,0,0,1-.91-.45A2.5,2.5,0,0,0,13,10l-.31-.12V8.49c0-.94,0-1.87,0-2.81a1.6,1.6,0,0,0-.54-1.19,1.68,1.68,0,0,0-1.28-.42A1.63,1.63,0,0,0,9.4,5.79c0,1.24,0,2.49,0,3.74v1.76l0,0c-.13-.14-.23-.27-.35-.38a1.71,1.71,0,0,0-2-.28,1.46,1.46,0,0,0-.81,1.66,5.79,5.79,0,0,0,.45,1.35c.17.4.36.8.54,1.19s.43.92.63,1.39A15.06,15.06,0,0,0,9.31,19a3.38,3.38,0,0,1,.72,2.1.74.74,0,0,0,.2.53.79.79,0,0,0,.56.22h4.86a.74.74,0,0,0,.75-.64,6.58,6.58,0,0,1,.31-.95c.09-.21.19-.42.3-.62s.09-.17.13-.26a5.58,5.58,0,0,0,.64-2.72C17.76,15.88,17.77,15.06,17.77,14.27Zm-1,2.53a4.23,4.23,0,0,1-.36,1.76c-.32.75-.65,1.52-1,2.27a.32.32,0,0,1-.13.05H11.15c-.12,0-.13,0-.13-.11a4.08,4.08,0,0,0-.85-2.27,15.51,15.51,0,0,1-1.48-3c-.18-.44-.39-.87-.58-1.29-.13-.26-.26-.53-.38-.8l0,0a10.9,10.9,0,0,1-.45-1.12.58.58,0,0,1,.27-.77.72.72,0,0,1,.34-.09.66.66,0,0,1,.53.27c.33.42.64.87,1,1.36l0,0c.13.18.28.42.61.34s.4-.47.4-.7V5.85c0-.5.23-.77.64-.78a.61.61,0,0,1,.47.18.83.83,0,0,1,.21.62V7.8c0,.86,0,1.71,0,2.57,0,.3,0,.47.17.57s.3.11.58.05a.72.72,0,0,1,.9.47c.14.37.32.46.72.35a.71.71,0,0,1,.94.38.55.55,0,0,0,.71.3.82.82,0,0,1,.75,0,.85.85,0,0,1,.27.72v1.18C16.77,15.23,16.77,16,16.78,16.8Z" />
      <path d="M8.67,8.89,8.85,9l0-.21a2.81,2.81,0,0,1,0-.41,1.68,1.68,0,0,0-.21-1,2.77,2.77,0,0,1,.56-3.59,2.82,2.82,0,0,1,3.6-.06,2.76,2.76,0,0,1,.7,3.54,1.87,1.87,0,0,0-.18,1c0,.14,0,.29,0,.43l0,.23.19-.13A3.79,3.79,0,0,0,11,2.11h-.15A3.8,3.8,0,0,0,7.31,5,3.69,3.69,0,0,0,8.67,8.89Z" />
    </svg>
  ),

  m_scheduled_to_send: 'm_activity_reservation',
  m_missed_call: 'missed_call',
  m_survey: 'survey',
  m_mobile_sync: 'mobile_sync',

  //Purchase
  purchase_view_detail: (
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24">
      {' '}
      <path fill="none" d="M0 0h24v24H0V0z" />{' '}
      <path d="M20 4v13.17L18.83 16H4V4h16m0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 10H6v2h12v-2zm0-3H6v2h12V9zm0-3H6v2h12V6z" />
    </svg>
  ),
  purchase_delete_product_item: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon icon-sm icon-cancel-circled">
      <path d="M256 32c30.3 0 59.6 5.9 87.2 17.6 26.7 11.3 50.6 27.4 71.2 48s36.7 44.5 48 71.2c11.7 27.6 17.6 56.9 17.6 87.2s-5.9 59.6-17.6 87.2c-11.3 26.7-27.4 50.6-48 71.2s-44.5 36.7-71.2 48C315.6 474.1 286.3 480 256 480s-59.6-5.9-87.2-17.6c-26.7-11.3-50.6-27.4-71.2-48s-36.7-44.5-48-71.2C37.9 315.6 32 286.3 32 256s5.9-59.6 17.6-87.2c11.3-26.7 27.4-50.6 48-71.2s44.5-36.7 71.2-48C196.4 37.9 225.7 32 256 32m0-32C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z"></path>
      <path d="M284.3 250.3l62.3-62.3c6.2-6.2 6.2-16.2 0-22.4l-.2-.2c-6.2-6.2-16.2-6.2-22.4 0l-62.3 62.3c-3.1 3.1-8.2 3.1-11.3 0L188 165.4c-6.2-6.2-16.2-6.2-22.4 0l-.2.2c-6.2 6.2-6.2 16.2 0 22.4l62.3 62.3c3.1 3.1 3.1 8.2 0 11.3L165.4 324c-6.2 6.2-6.2 16.2 0 22.4l.2.2c6.2 6.2 16.2 6.2 22.4 0l62.3-62.3c3.1-3.1 8.2-3.1 11.3 0l62.3 62.3c6.2 6.2 16.2 6.2 22.4 0l.2-.2c6.2-6.2 6.2-16.2 0-22.4l-62.3-62.3c-3-3.2-3-8.2.1-11.4z"></path>
    </svg>
  ),
  //product
  product_subscription: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48.726" height="22.263" viewBox="0 0 48.726 22.263">
      <g id="Group_363" data-name="Group 363" transform="translate(341.473 -42.036)">
        <g id="Group_361" data-name="Group 361" transform="translate(-341.473 42.036)">
          <rect
            id="Rectangle_2301"
            data-name="Rectangle 2301"
            width="35.25"
            height="14.519"
            transform="translate(6.738 3.641)"
            fill="#ea43ad"
          />
          <path
            id="Path_456"
            data-name="Path 456"
            d="M-290.077,46.345v-1.2h-3.593v-3.11h-41.54v3.11H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h3.593V64.3h41.54V60.726h3.593v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2Zm-5.522,14.91H-333.28V44.616H-295.6Z"
            transform="translate(338.803 -42.036)"
            fill="#ea43ad"
          />
        </g>
        <text
          id="SUBSCRIPTION"
          transform="translate(-333.973 55.036)"
          fill="#fff"
          fontSize="4.5"
          fontFamily="HelveticaNeue-Bold, Helvetica Neue"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            SUBSCRIPTION
          </tspan>
        </text>
      </g>
    </svg>
  ),
  product_prepaid: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48.726" height="22.263" viewBox="0 0 48.726 22.263">
      <g id="Group_363" data-name="Group 363" transform="translate(341.473 -42.036)">
        <g id="Group_361" data-name="Group 361" transform="translate(-341.473 42.036)">
          <rect
            id="Rectangle_2301"
            data-name="Rectangle 2301"
            width="35.25"
            height="14.519"
            transform="translate(6.738 3.641)"
            fill="#8000d5"
          />
          <path
            id="Path_456"
            data-name="Path 456"
            d="M-290.077,46.345v-1.2h-3.593v-3.11h-41.54v3.11H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h1.441v1.2H-338.8v1.2h3.593V64.3h41.54V60.726h3.593v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2h1.442v-1.2h-1.442v-1.2Zm-5.522,14.91H-333.28V44.616H-295.6Z"
            transform="translate(338.803 -42.036)"
            fill="#8000d5"
          />
        </g>
        <text
          id="PRE"
          transform="translate(-328.473 57.036)"
          fill="#fff"
          fontSize="11"
          fontFamily="HelveticaNeue-Bold, Helvetica Neue"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            PRE
          </tspan>
        </text>
      </g>
    </svg>
  ),
  product_sku: (
    <svg id="qr-code-scan" xmlns="http://www.w3.org/2000/svg" width="16.431" height="16.431" viewBox="0 0 16.431 16.431">
      <path
        id="Path_1559"
        data-name="Path 1559"
        d="M0,276.958a1.778,1.778,0,0,0,1.776,1.776H14.655a1.778,1.778,0,0,0,1.776-1.776V271H0Zm10.964-1.818h1.527a.379.379,0,0,0,.378-.378v-1.527a.481.481,0,0,1,.963,0v1.527a1.342,1.342,0,0,1-1.341,1.341H10.964A.481.481,0,0,1,10.964,275.14Zm-8.364-1.9a.481.481,0,0,1,.963,0v1.527a.379.379,0,0,0,.378.378H5.467a.481.481,0,0,1,0,.963H3.94A1.342,1.342,0,0,1,2.6,274.762Z"
        transform="translate(0 -262.303)"
        fill="#8392a5"
      />
      <path
        id="Path_1560"
        data-name="Path 1560"
        d="M14.655,0H1.776A1.778,1.778,0,0,0,0,1.776V7.734H16.431V1.776A1.778,1.778,0,0,0,14.655,0ZM5.467,3.53H3.94a.379.379,0,0,0-.378.378V5.435a.481.481,0,0,1-.963,0V3.908A1.342,1.342,0,0,1,3.94,2.567H5.467A.481.481,0,0,1,5.467,3.53Zm8.364,1.9a.481.481,0,0,1-.963,0V3.908a.379.379,0,0,0-.378-.378H10.964a.481.481,0,0,1,0-.963h1.527a1.342,1.342,0,0,1,1.341,1.341Z"
        transform="translate(0 0)"
        fill="#8392a5"
      />
    </svg>
  ),
  product_barcode_inactive: (
    <svg
      id="iconfinder_ic_settings_input_hdmi_48px_3669241"
      xmlns="http://www.w3.org/2000/svg"
      width="16.033"
      height="16.033"
      viewBox="0 0 16.033 16.033"
    >
      <path id="Path_2490" data-name="Path 2490" d="M0,0H16.033V16.033H0Z" fill="none" />
      <path
        id="Path_2491"
        data-name="Path 2491"
        d="M18.685,7.34v-2A1.336,1.336,0,0,0,17.348,4H12a1.336,1.336,0,0,0-1.336,1.336v2H10v4.008l2,4.008v2h5.344v-2l2-4.008V7.34Zm-6.68-2h5.344v2H16.012V6h-.668V7.34H14.008V6H13.34V7.34H12Z"
        transform="translate(-6.66 -2.664)"
        fill="#8392a5"
      />
    </svg>
  ),
  product_barcode_active: (
    <svg
      id="iconfinder_ic_settings_input_hdmi_48px_3669241"
      xmlns="http://www.w3.org/2000/svg"
      width="16.033"
      height="16.033"
      viewBox="0 0 16.033 16.033"
    >
      <path id="Path_2490" data-name="Path 2490" d="M0,0H16.033V16.033H0Z" fill="none" />
      <path
        id="Path_2491"
        data-name="Path 2491"
        d="M18.685,7.34v-2A1.336,1.336,0,0,0,17.348,4H12a1.336,1.336,0,0,0-1.336,1.336v2H10v4.008l2,4.008v2h5.344v-2l2-4.008V7.34Zm-6.68-2h5.344v2H16.012V6h-.668V7.34H14.008V6H13.34V7.34H12Z"
        transform="translate(-6.66 -2.664)"
        fill="#28a745"
      />
    </svg>
  ),
  vendor: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,14H6 c-2.209,0-4,1.791-4,4v2 M9,2c2.209,0,4,1.791,4,4s-1.791,4-4,4S5,8.209,5,6S6.791,2,9,2z M22,22H12V12h10V22z M16.021,16h1.959" />
    </svg>
  ),
  manufacturer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,21H2v-4h20V21z M20,17V3l-5,4 M15,7V3L9,7 M9,7V3L4,7v10 M8,13v-2 M12,13v-2 M16,13v-2" />
    </svg>
  ),
  subscription_temp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,7v10 c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V7 M2,22h20 M5,14V4c0-1.105,0.896-2,2-2h14.003c-1.104,0-2,0.895-2,2v10 M12,5v11.001 M15,7h-4.25C9.784,7,9,7.784,9,8.75c0,0.967,0.784,1.75,1.75,1.75h2.5c0.968,0,1.75,0.784,1.75,1.751C15,13.219,14.218,14,13.25,14 H9" />
    </svg>
  ),
  adjust_stock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,2v8 M2,6h8 M14,18h8 M5,20L21,4" />
    </svg>
  ),
  unit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5,9.4l-9-5.19 M20,9V8 c0-0.714-0.382-1.373-1-1.73l-7-4c-0.619-0.357-1.381-0.357-2,0l-7,4C2.382,6.627,2,7.286,2,8v8c0,0.714,0.382,1.373,1,1.73L8,21 M2.27,6.96L11,12.01l8.73-5.05 M5.031,15v-1.99 M8,17v-1.99 M21.4,22.115C21.781,21.408,22,20.6,22,19.74c0-2.762-2.238-5-5-5 s-5,2.239-5,4.999c0,0.86,0.217,1.669,0.6,2.376H21.4z M18.726,17.711l-0.974,1.66 M18.726,20.924c0-0.955-0.772-1.729-1.726-1.727 c-0.953-0.002-1.729,0.773-1.726,1.727c0,0.462,0.183,0.881,0.479,1.191h2.492C18.541,21.805,18.725,21.386,18.726,20.924z" />
    </svg>
  ),

  //production
  version_control: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.989,3.5 c0,1.381-1.118,2.5-2.499,2.5c-1.379,0-2.501-1.119-2.501-2.5S17.111,1,18.49,1C19.871,1,20.989,2.119,20.989,3.5z M18.49,18 c-1.379,0-2.501,1.121-2.501,2.5c0,1.382,1.122,2.5,2.501,2.5c1.381,0,2.499-1.118,2.499-2.5C20.989,19.121,19.871,18,18.49,18z M5.487,1C4.108,1,2.986,2.119,2.986,3.5S4.108,6,5.487,6c1.381,0,2.499-1.119,2.499-2.5S6.868,1,5.487,1z M18.489,18V6 M18.254,18 c-2.334-6-4.803-4.5-7.302-5.083C5.747,11.703,5.487,6,5.487,6" />
    </svg>
  ),
  rectangle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,6h18c1.104,0,2,0.896,2,2v8c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2V8C1,6.896,1.896,6,3,6z" />
    </svg>
  ),
  cell_layout1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21,23.031h-6.295c-6.42,0-11.623-4.928-11.623-11.007c0-6.08,5.203-11.008,11.623-11.008H21" />
    </svg>
  ),
  cell_layout2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.082,1.016h6.295c6.42,0,11.622,4.928,11.622,11.008c0,6.08-5.202,11.007-11.622,11.007H3.082" />
    </svg>
  ),
  rounting_layout1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,5h-5v14h5V5z M8.031,12h7 M11.031,8l4,4l-4,4 M7.031,5h-5v14h5V5z" />
    </svg>
  ),
  rounting_layout2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,2h-5v8h5V2z M18,16H6v6h12V16z M8.031,6h7 M11.031,2l4,4l-4,4 M7.031,2h-5v8h5V2z M4.031,10l5.052,5.709 M19.525,10l-5.052,5.709" />
    </svg>
  ),

  //invoice
  dispute: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,16l-4,4V4c0-1.104,0.896-2,2-2h14c1.104,0,2,0.896,2,2 M6.021,13.122c0.212-3.831,3.27-6.889,7.101-7.101 h0.444c1.171-0.003,2.328,0.27,3.373,0.798c2.556,1.277,4.172,3.89,4.173,6.747c0.003,1.172-0.271,2.328-0.799,3.373L22,22 l-5.061-1.687c-1.045,0.528-2.202,0.803-3.373,0.799c-2.857-0.001-5.47-1.616-6.747-4.173c-0.529-1.045-0.803-2.201-0.799-3.373 V13.122z" />
    </svg>
  ),
  merge: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,16H3.556C2.697,16,2,15.304,2,14.444V3.556C2,2.697,2.697,2,3.556,2h10.889C15.304,2,16,2.697,16,3.556V8 M16,8h4.444C21.304,8,22,8.697,22,9.556v10.889C22,21.304,21.304,22,20.444,22H9.556C8.697,22,8,21.304,8,20.444v-4.402 M11,13l2-2" />
    </svg>
  ),
  update_owner: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1,3v6h3 M23,21v-6h-3 M20.49,8c-1.658-4.686-6.801-7.14-11.487-5.482C7.738,2.966,6.589,3.691,5.64,4.64L1,9 M23,15l-4.641,4.359c-3.514,3.516-9.212,3.518-12.727,0.004C4.683,18.414,3.958,17.266,3.51,16 M17,16.375v-1.126 C17,14.008,16.029,13,14.787,13H9.266c-1.242,0-2.25,1.008-2.25,2.249v1.126 M12,6c1.104,0,2,0.895,2,2s-0.896,2-2,2 c-1.104,0-2-0.895-2-2S10.896,6,12,6z" />
    </svg>
  ),

  //desk
  timer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.981,15.002c0,4.415-3.579,7.998-7.999,7.998c-4.418,0-8.001-3.583-8.001-7.998 C2.981,10.583,6.564,7,10.982,7C15.402,7,18.981,10.583,18.981,15.002z M8.45,1.543v1.914C8.45,3.757,8.691,4,8.99,4h3.963 c0.301,0,0.544-0.243,0.544-0.543V1.543C13.497,1.244,13.254,1,12.953,1H8.99C8.691,1,8.45,1.244,8.45,1.543z M11.059,5.14v1.627 M18.714,5.47l2.305,2.303 M19.354,7.135l-1.922,1.919 M11.06,10.993v4.889 M11.058,15.522c-0.415,0-0.751,0.336-0.751,0.752 c0,0.412,0.336,0.748,0.751,0.748c0.414,0,0.749-0.336,0.749-0.748C11.807,15.858,11.472,15.522,11.058,15.522z" />
    </svg>
  ),
  hourglass: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.007,3.992c0,5.999-5.007,6.112-5.007,8.014c0,1.901,5.007,2.019,5.007,8.017L5.993,20.017 C5.993,14.019,11,13.901,11,12c0-1.902-5.007-2.016-5.007-8.014L18.007,3.992z M10.14,6.672c0.11,0.625,0.829,1.343,1.356,1.484 M6.01,0.989l12.014,0.006L6.01,0.989z M6.01,23l12.014,0.006L6.01,23z" />
    </svg>
  ),
  public: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20,10v3.577c0,4.662-3.547,8.439-8.207,8.439l0,0C7.132,22.017,4,18.239,4,13.577V10H20z M16.042,6.042 c0-2.221-1.8-4.021-4.021-4.021l0,0C9.8,2.021,8,3.821,8,6.042v3.583 M19.771,15.595c-1.771-1.044-4.593-1.72-7.771-1.72 c-3.192,0-6.024,0.682-7.793,1.732 M11.988,15.334c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5c0.828,0,1.5-0.672,1.5-1.5 S12.816,15.334,11.988,15.334z" />
    </svg>
  ),
  moveto: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,20H4c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h5l2,3h9c1.104,0,2,0.896,2,2 M15.5,9 c3.589,0,6.5,2.912,6.5,6.5c0,3.59-2.911,6.5-6.5,6.5C11.91,22,9,19.09,9,15.5C9,11.912,11.91,9,15.5,9z M15.5,18.1l2.599-2.6 L15.5,12.9 M18.099,15.5H12.9" />
    </svg>
  ),
  preview_template: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,20H4 c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h14c1.104,0,2,0.896,2,2v2 M7.5,6C8.329,6,9,6.671,9,7.5S8.329,9,7.5,9S6,8.329,6,7.5 S6.671,6,7.5,6z M6,18l-2,2 M14.778,9c3.19,0,5.778,2.587,5.778,5.778c0,3.19-2.588,5.778-5.778,5.778 C11.587,20.557,9,17.969,9,14.778C9,11.587,11.587,9,14.778,9z M22,22l-3.143-3.143" />
    </svg>
  ),
  ticket: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeMiterlimit="10"
        d="M10,10v4 M10,3v3 M10,18v3 M20,12c0-1.477,0.81-2.752,2-3.445V4c0-0.552-0.447-1-1-1H3C2.448,3,2,3.448,2,4v4.555 C3.19,9.248,4,10.523,4,12s-0.81,2.752-2,3.445V20c0,0.553,0.448,1,1,1h18c0.553,0,1-0.447,1-1v-4.555C20.81,14.752,20,13.477,20,12 z"
      />
    </svg>
  ),
  first_grade: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
      <path d="M18.666 4V2A.668.668 0 0 0 18 1.333H6c-.367 0-.667.3-.667.667v2H.667C.3 4 0 4.3 0 4.667V7.2c0 2.512 2.846 5.216 6.65 5.941C7.792 15.555 9.487 16.816 11 17.2v3.466H8.333c-.921 0-1.667.746-1.667 1.668 0 .183.15.332.333.332h10a.334.334 0 0 0 .334-.332c0-.922-.746-1.668-1.668-1.668H13V17.2c1.513-.388 3.209-1.646 4.35-4.059C21.146 12.421 24 9.717 24 7.2V4.667C24 4.3 23.7 4 23.334 4h-4.668zM2 7.2V6h3.333c0 1.633.087 3.175.512 4.867C3.55 10.079 2 8.413 2 7.2zm10 8.134c-2.208 0-4.667-3.267-4.667-9v-3h9.333v3c0 5.854-2.533 9-4.666 9zM22 7.2c0 1.212-1.55 2.879-3.846 3.667.425-1.692.512-3.238.512-4.867H22v1.2z" />
      <path d="M13.237 12.9h-1.81V6.33h-1.44V4.75h3.25v8.15z" />
    </svg>
  ),
  second_grade: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
      <path d="M18.666 4V2A.668.668 0 0 0 18 1.333H6c-.367 0-.667.3-.667.667v2H.667C.3 4 0 4.3 0 4.667V7.2c0 2.512 2.846 5.216 6.65 5.94 1.142 2.414 2.837 3.676 4.35 4.06v3.466H8.333c-.921 0-1.667.746-1.667 1.668 0 .184.15.332.333.332h10a.332.332 0 0 0 .334-.332c0-.922-.746-1.668-1.668-1.668H13V17.2c1.514-.388 3.209-1.646 4.35-4.06C21.146 12.421 24 9.717 24 7.2V4.667C24 4.3 23.7 4 23.334 4h-4.668zM2 7.2V6h3.333c0 1.633.087 3.175.512 4.867C3.55 10.079 2 8.413 2 7.2zm10 8.134c-2.208 0-4.667-3.267-4.667-9v-3h9.333v3c0 5.854-2.533 9-4.666 9zM22 7.2c0 1.212-1.55 2.879-3.846 3.667.425-1.692.512-3.238.512-4.867H22v1.2z" />
      <path d="M13.151 5.199c.394.198.694.471.905.818.209.349.314.744.314 1.188 0 .264-.05.521-.148.77-.1.249-.268.531-.504.846-.237.315-.572.694-1.004 1.139l-1.053 1.089h2.854v1.386H9.268v-.936l2.403-2.475c.414-.427.699-.775.854-1.049.156-.273.234-.523.234-.752 0-.281-.082-.502-.247-.661-.166-.159-.418-.238-.761-.238-.318 0-.568.107-.751.324a1.157 1.157 0 0 0-.274.773H9.115a2.5 2.5 0 0 1 .337-1.287c.225-.384.537-.686.936-.904a2.787 2.787 0 0 1 1.363-.328c.541 0 1.007.099 1.4.297z" />
    </svg>
  ),
  third_grade: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
      <path d="M18.666 4V2A.668.668 0 0 0 18 1.333H6c-.367 0-.667.3-.667.667v2H.667C.3 4 0 4.3 0 4.667V7.2c0 2.512 2.846 5.216 6.65 5.94 1.142 2.414 2.837 3.676 4.35 4.06v3.466H8.333c-.921 0-1.667.746-1.667 1.668 0 .184.15.332.333.332h10a.332.332 0 0 0 .334-.332c0-.922-.746-1.668-1.668-1.668H13V17.2c1.514-.388 3.209-1.646 4.35-4.06C21.146 12.421 24 9.717 24 7.2V4.667C24 4.3 23.7 4 23.334 4h-4.668zM2 7.2V6h3.333c0 1.633.087 3.175.512 4.867C3.55 10.079 2 8.413 2 7.2zm10 8.134c-2.208 0-4.667-3.267-4.667-9v-3h9.333v3c0 5.854-2.533 9-4.666 9zM22 7.2c0 1.212-1.55 2.879-3.846 3.667.425-1.692.512-3.238.512-4.867H22v1.2z" />
      <path d="M13.297 5.181c.39.186.692.445.908.778.217.333.324.715.324 1.147 0 .27-.059.519-.176.747-.116.228-.27.414-.459.558a1.354 1.354 0 0 1-.598.27c.233.036.46.126.679.27.22.144.399.333.54.567.142.234.212.501.212.801 0 .462-.12.866-.36 1.21-.24.345-.565.612-.977.801a3.282 3.282 0 0 1-1.381.284c-.798 0-1.438-.208-1.917-.622-.48-.414-.75-.978-.81-1.692h1.611c.03.3.14.531.328.693.189.162.452.243.788.243s.607-.084.814-.252.311-.387.311-.657c0-.3-.116-.531-.347-.693-.231-.162-.542-.243-.932-.243h-.729v-1.33h.729c.33 0 .59-.083.778-.248.189-.165.284-.388.284-.67 0-.27-.086-.483-.257-.639-.171-.156-.409-.234-.716-.234-.3 0-.531.102-.692.306a1.137 1.137 0 0 0-.243.729h-1.61c0-.462.108-.875.324-1.238.216-.363.519-.648.909-.855.39-.207.831-.311 1.322-.311.506 0 .952.094 1.343.28z" />
    </svg>
  ),

  //settings
  table: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,3h14 c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M3,9h18 M9,21V9 M15,9v12 M21,15H3" />
    </svg>
  ),
  bar_chart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,6h18 M21,18H7 M3,3v6 M21,3v6 M21,15v6 M7,15v6" />
    </svg>
  ),
  radio: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle fill="currentColor" cx="12" cy="12" r="5" />
    </svg>
  ),
  textarea: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,3h14 c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M14,17l3-3 M10,16l6-6" />
    </svg>
  ),
  selectbox: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,3h14 c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M8,10l4,4l4-4" />
    </svg>
  ),
  number: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,3h14 c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M9,16h6 M12,16V8l-3,2" />
    </svg>
  ),
  ip: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4,3h16 c1.104,0,2,0.896,2,2v10c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V5C2,3.896,2.896,3,4,3z M8,21h8 M12,17v4 M8,7v6 M12,7v6 M11.984,10h2.531c0.828,0,1.5-0.671,1.5-1.5l0,0c0-0.829-0.672-1.5-1.5-1.5h-2.531" />
    </svg>
  ),
  invert: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21,7H3 M7,11L3,7l4-4 M21,17H3 M17,13l4,4l-4,4" />
    </svg>
  ),
  asterisk: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19,5L5,19 M5,5l14,14 M12,3v18 M3,12h18" />
    </svg>
  ),

  // diagram
  arrow_alt_right: (
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 90 40">
      <path d="M0,26.75v-13.5c0-1.039,0.836-1.875,1.875-1.875h64.621V1.88c0-1.672,2.016-2.508,3.203-1.328l19.75,18.12 c0.734,0.734,0.734,1.922,0,2.656l-19.75,18.12c-1.18,1.18-3.203,0.344-3.203-1.328v-9.495H1.875C0.836,28.625,0,27.789,0,26.75z" />
    </svg>
  ),
  arrow_alt_up: (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="90" viewBox="0 0 40 90">
      <path d="M26.75,90h-13.5c-1.039,0-1.875-0.836-1.875-1.875V23.504H1.88c-1.672,0-2.508-2.016-1.327-3.203l18.119-19.75 c0.734-0.734,1.922-0.734,2.656,0l18.119,19.75c1.181,1.18,0.345,3.203-1.327,3.203h-9.495v64.621C28.625,89.164,27.789,90,26.75,90 z" />
    </svg>
  ),
  arrow_alt_down: (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="90" viewBox="0 0 40 90">
      <path d="M28.625,1.875v64.621h9.495c1.672,0,2.508,2.023,1.327,3.203l-18.119,19.75c-0.734,0.734-1.922,0.734-2.656,0L0.553,69.699 c-1.181-1.188-0.345-3.203,1.327-3.203h9.495V1.875C11.375,0.836,12.211,0,13.25,0h13.5C27.789,0,28.625,0.836,28.625,1.875z" />
    </svg>
  ),
  arrow_alt_left: (
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 90 40">
      <path d="M88.125,28.625H23.504v9.495c0,1.672-2.023,2.508-3.203,1.328l-19.75-18.12c-0.734-0.734-0.734-1.922,0-2.656l19.75-18.12 c1.188-1.18,3.203-0.344,3.203,1.328v9.495h64.621c1.039,0,1.875,0.836,1.875,1.875v13.5C90,27.789,89.164,28.625,88.125,28.625z" />
    </svg>
  ),
  long_arrow_right: (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="60 0 60 40">
      <path d="M104.887,12.064l5.123,5.123H61.875C60.839,17.188,60,18.027,60,19.063v1.875c0,1.035,0.839,1.875,1.875,1.875h48.135 l-5.123,5.123c-0.732,0.732-0.732,1.92,0,2.651l1.325,1.326c0.731,0.731,1.919,0.731,2.651,0l10.588-10.587 c0.732-0.732,0.732-1.92,0-2.652L108.863,8.087c-0.732-0.732-1.92-0.732-2.651,0l-1.325,1.326 C104.154,10.145,104.154,11.333,104.887,12.064z" />
    </svg>
  ),
  diagram_status: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1.031" y="6" width="22" height="12" />
    </svg>
  ),
  diagram_action: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="2" width="22" height="20" />
    </svg>
  ),
  diagram_criteria: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1,12l11,11l11-11L12,1 L1,12L1,12z" />
    </svg>
  ),
  diagram_wait: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="11" />
    </svg>
  ),
  diagram_site: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="2" width="22" height="20" />
    </svg>
  ),
  diagram_checklist: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points="4,2 23,2 20,22 
	1,22 "
      />
    </svg>
  ),
  diagram_simple: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23.031,12 c0,3.313-2.687,6-6,6h-10c-3.313,0-6-2.687-6-6l0,0c0-3.313,2.687-6,6-6h10C20.345,6,23.031,8.687,23.031,12L23.031,12z" />
    </svg>
  ),

  // inventory
  scan_barcode: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,3H5C3.896,3,3,3.896,3,5 v2 M21,7V5c0-1.104-0.896-2-2-2h-3 M16,21h3c1.104,0,2-0.896,2-2v-2 M3,17v2c0,1.104,0.896,2,2,2h3" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),

  // avatar
  avatar01: (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <path
        fill="#418BAB"
        d="M107.768 107.76c-1.084.902-2.145 3.104-2.521 5.097-2.998 10.303-4.938 18.942-6.162 26.391h18.769c-1.949-7.844-3.644-14.176-4.086-16.2-1.823-8.312-4.377-14.193-6-15.288zM33.709 106.279c-1.996 1.709-4.875 16.766-7.406 32.967h22.431c-6.654-27.678-1.798-28.33-15.025-32.967z"
      />
      <path
        fill="#75473D"
        d="M87.578 8.985c-2.109-2.29-2.701-1.718-4.725-2.575-3.248-1.377-2.711-4.283-4.935-5.663-1.933-1.207-5.067-.253-6.112 1.248-.902 1.315-.852 2.825-3.123 3.133-1.047.146-5.733-.728-6.443 2.63-.414 2.007 2.053 3.173.264 4.579-2.283 1.801-3.363 1.754-3.311 4.893.016 1.092.275 2.759.873 3.576l26.821-.062c-3.985-4.738 5.801-6.169.691-11.759z"
      />
      <path
        fill="#8F5548"
        d="M69.416 18.007a.665.665 0 01-.125-.01c-1.602-.269-2.586-.799-3.01-1.621-.543-1.055.014-2.2.421-3.036.153-.316.327-.673.348-.85a1.56 1.56 0 00-.388-1.14c-.233-.256-.56-.354-.891-.373-.155.003-.541.103-.882.19-.492.127-1.104.285-1.709.354a.75.75 0 01-.17-1.491c.501-.057 1.033-.195 1.504-.316.501-.13.897-.232 1.227-.239.826.009 1.507.29 2.029.862.566.623.861 1.512.77 2.323-.05.43-.264.869-.489 1.333-.283.582-.635 1.305-.436 1.692.106.207.498.589 1.924.83a.747.747 0 01.615.863.75.75 0 01-.738.629zM75.096 19.577a.757.757 0 01-.388-.107c-.972-.586-1.478-1.296-1.503-2.108-.051-1.569 1.753-2.824 2.945-3.654.265-.185.593-.413.67-.497.551-.584.595-1.713.104-2.521-.524-.869-1.509-1.156-2.771-.809-1.481.42-2.479.352-3.133-.213-.896-.777-.717-2.133-.56-3.329.085-.644.19-1.444.034-1.746a.851.851 0 00-.174-.236.747.747 0 01-.038-1.059.748.748 0 011.06-.038c.194.18.348.382.482.638.375.728.246 1.698.123 2.637-.098.739-.231 1.751.054 1.998.168.146.713.199 1.745-.096 1.915-.531 3.579.021 4.459 1.477.841 1.39.718 3.246-.287 4.317-.18.197-.488.412-.914.708-.756.526-2.328 1.62-2.304 2.375.012.338.43.662.778.872.354.215.47.676.256 1.03a.735.735 0 01-.638.361zM81.656 19.898a.748.748 0 01-.739-.883c.295-1.635 1.312-2.541 2.054-3.202.344-.308.734-.657.734-.846-.008-.232-.824-.528-1.313-.704-.879-.317-1.875-.677-2.07-1.607-.191-.908.563-1.755 1.146-2.312.382-.363.714-.614 1.007-.835.532-.401.885-.667 1.293-1.42.194-.364.287-.707.277-1.043a.75.75 0 01.73-.769h.02a.75.75 0 01.75.731c.016.596-.141 1.2-.458 1.793-.563 1.042-1.121 1.462-1.71 1.907-.273.206-.557.418-.875.721-.691.663-.711.931-.711.933.092.122.729.352 1.109.49.959.346 2.271.819 2.305 2.095 0 .882-.629 1.442-1.236 1.984-.675.602-1.371 1.224-1.574 2.349a.753.753 0 01-.739.618z"
      />
      <g>
        <path
          fill="#8F5548"
          d="M101.24 35.033c-.868-.731-2.215-.922-2.707-1.656-.659-.941.301-2.188.307-3.404.01-1.654-1.16-1.501-3.164-2.502-3.656-1.845-1.305-5.772-4.873-6.725-1.009-.275-2.113-.07-2.885-.443-1.131-.548-1.246-2.14-2.715-2.909-2.371-1.24-5.49.083-6.834 2.099-.027 2.767-.9 2.452-.32 4.62.463 1.729 1.463 2.95 1.24 5.185-.221 2.415-3.26 3.467-.434 6.613 1.875 3.183-.521 6.52-3.349 9.243-1.856 1.788-1.553 5.348-.304 8.015l12.539-.51c1.389 1.24 5.969.344 7.347-3.371.927-2.499 4.813-.621 6.252-3.685 1.125-2.417-.735-3.209-1.133-4.561-.654-2.197 3.484-3.922 1.033-6.009z"
        />
        <path
          fill="#A15F51"
          d="M97.057 48.547a.746.746 0 01-.695-.469c-.215-.529-.521-.96-1.022-1.438-.664-.633-1.519-.826-2.42-1.03-1.063-.241-2.165-.49-2.81-1.525-.684-1.09-.24-2.177.115-3.051.459-1.128.489-1.383-.199-1.773-.444-.276-1.215-.217-2.031-.155-1.023.078-2.188.167-3.209-.335-1.409-.677-1.383-2.085-1.361-3.218.026-1.407.044-2.335-1.779-2.688-.154-.028-.789-.082-2.356.55-.351.139-1.108.525-1.562.757l-.334.17A.75.75 0 0176.722 33l.323-.164c.538-.274 1.272-.65 1.687-.814 1.391-.559 2.47-.771 3.199-.629 3.063.591 3.021 2.757 2.994 4.189-.021 1.121.02 1.602.518 1.841.656.322 1.563.254 2.439.188 1.021-.078 2.076-.159 2.912.362 1.867 1.059 1.213 2.667.82 3.627-.314.775-.494 1.272-.231 1.69.3.48.905.639 1.868.857 1.012.229 2.159.489 3.123 1.408.658.626 1.083 1.232 1.379 1.961a.75.75 0 01-.696 1.031z"
        />
        <path
          fill="#A15F51"
          d="M100.605 47.367a.744.744 0 01-.537-.227c-2.153-2.21-2.187-3.694-2.211-4.886-.014-.602-.023-1.078-.281-1.63-.271-.583-.833-.75-1.725-.974-1.063-.268-2.521-.634-2.854-2.49-.209-1.134.212-2.099.551-2.874.466-1.065.582-1.429-.05-1.969-.954-.813-2.204-.697-3.529-.582-1.726.154-4.084.363-4.632-2.759-.063-.406-.065-.922-.067-1.468-.002-.784-.006-1.858-.235-2.289-.249-.488-.726-.71-1.082-.813-.688-.198-1.484-.113-2.03.214-.277.167-.576.492-.895.835-.674.732-1.514 1.645-2.891 1.875a.75.75 0 01-.246-1.48c.868-.145 1.436-.759 2.033-1.41.374-.406.76-.826 1.223-1.106.903-.54 2.135-.681 3.22-.37.907.259 1.616.814 1.997 1.56.398.747.402 1.932.406 2.978.002.487.004.947.047 1.226.297 1.685 1.095 1.685 3.021 1.511 1.427-.128 3.202-.284 4.636.935 1.508 1.291.896 2.689.451 3.711-.297.677-.576 1.318-.449 2.005.155.867.676 1.035 1.744 1.304.948.238 2.129.535 2.719 1.792.392.84.406 1.58.422 2.233.021 1.072.045 2.085 1.785 3.872a.75.75 0 01-.015 1.061.748.748 0 01-.526.215z"
        />
      </g>
      <g>
        <path
          fill="#A15F51"
          d="M79.289 29.299c.223-2.235-.777-3.456-1.24-5.185-.58-2.167.293-1.853.32-4.62-1.036-.783-2.111-2.936-6.016-4.379-2.834-1.027-6.157.065-7.461 1.964-3.912 5.493-5.432-.882-9.206 1.452-1.735 1.081-1.255 3.035-2.295 4.318-1.98 2.441-4.488-.237-6.256 3.131-2.122 3.992.411 6.649.358 8.258-.095 3.013-6.719 6.693-3.525 10.835 1.643 2.133 4.575 1.118 5.734 2.231 1.34 1.258-.331 3.764.899 5.703 1.383 2.187 3.538.462 5.129 3.542l19.473-3.379c-1.249-2.667-1.553-6.227.304-8.015 2.828-2.723 5.224-6.06 3.349-9.243-2.827-3.146.212-4.198.433-6.613z"
        />
        <path
          fill="#B0695A"
          d="M52.24 34.361c-.641 0-1.257-.282-1.775-.519-.593-.271-1.205-.551-1.91-.59-.446-.024-.55.03-.739.261a.748.748 0 01-1.055.105.748.748 0 01-.106-1.054c.633-.774 1.324-.852 1.984-.81.987.055 1.799.426 2.45.725 1.121.512 1.332.55 1.793-.075.444-.602.289-1.403.125-2.25-.239-1.23-.599-3.091 1.908-3.713.873-.226 1.602-.069 2.188.055.259.055.481.103.653.103.691 0 .826-.232 1.102-1.228.117-.422.249-.9.513-1.32.913-1.438 2.904-1.74 4.397-1.302.993.288 1.771 1.074 2.458 1.769 1.043 1.053 1.44 1.334 1.919 1.042.221-.133.468-.85.65-1.373.383-1.098.813-2.342 1.946-2.814.706-.294 1.549-.21 2.508.249.478.23.864.657 1.313 1.151 1.121 1.233 1.967 2 3.483 1.441a.752.752 0 01.519 1.408c-2.576.946-4.102-.731-5.11-1.84-.315-.347-.644-.707-.854-.81-.556-.265-.988-.338-1.279-.217-.514.215-.829 1.122-1.107 1.923-.313.902-.607 1.752-1.29 2.162-1.564.954-2.782-.279-3.763-1.269-.585-.591-1.19-1.204-1.813-1.383-.947-.282-2.219-.11-2.708.662-.145.231-.237.566-.336.921-.257.925-.645 2.326-2.547 2.326-.329 0-.652-.068-.965-.134-.5-.107-.972-.206-1.509-.069-1.09.271-1.068.604-.803 1.974.197 1.021.444 2.294-.391 3.425-.596.808-1.234 1.068-1.849 1.068z"
        />
        <path
          fill="#B0695A"
          d="M48.056 47.436a.752.752 0 01-.545-.234c-.688-.728-.995-1.66-.865-2.625.132-.974.715-1.882 1.521-2.371.915-.554 1.95-.5 2.865-.456.864.047 1.607.082 2.107-.344.284-.238.221-.624-.114-1.662-.366-1.134-.867-2.688.342-4.037 1.239-1.356 2.779-.946 3.904-.647.874.235 1.315.316 1.554.078.397-.398.371-.87.291-1.669-.102-.999-.239-2.366 1.26-3.415 2.787-1.967 4.77-.631 6.216.345 1.302.876 2.027 1.302 3.088.643.387-.238.588-.64.82-1.107.266-.533.566-1.136 1.197-1.532 1.564-.944 3.453-.426 5.193 1.419.088.087.188.228.299.392.393.579.649.963 1.916.123a.75.75 0 11.83 1.25c-2.502 1.662-3.582.07-3.988-.532-.051-.077-.094-.147-.139-.195-.722-.764-2.104-1.923-3.324-1.178-.264.165-.439.517-.644.923-.278.559-.625 1.253-1.374 1.713-1.927 1.203-3.473.164-4.715-.673-1.435-.968-2.567-1.734-4.516-.362-.745.521-.728 1.057-.629 2.037.088.873.198 1.96-.723 2.88-.878.878-2.055.563-3.001.312-1.104-.296-1.813-.444-2.405.204-.587.654-.401 1.408-.026 2.57.336 1.044.756 2.343-.346 3.269-.952.808-2.12.749-3.15.695-.767-.035-1.49-.075-2.013.241-.422.256-.741.761-.813 1.288-.048.359-.006.892.469 1.394a.752.752 0 01-.029 1.061.754.754 0 01-.513.202z"
        />
      </g>
      <g>
        <path
          fill="#66353D"
          d="M80.49 68.674l-16.58.279c1.16 19.426-2.951 29.551-16.431 32.436 18.051 5.185 36.849 3.244 45.819-.407-.565-.224-1.137-.529-1.789-.777-11.204-4.273-10.675-15.701-11.019-31.531z"
        />
        <path
          fill="#418BAB"
          d="M47.479 101.389c-3.187 1.106-6.789 2.213-10.767 3.664 15.619 7.438 44.076 9.028 68.063.41-3.616-1.431-7.481-2.916-11.479-4.482-8.968 3.652-27.766 5.591-45.817.408z"
        />
        <path
          fill="#418BAB"
          d="M107.67 126.422c1.59-7.889-.859-15.119.35-18.789-2.283-1.231-.978-.789-3.242-2.17-23.987 8.619-52.444 7.029-68.063-.41-2.439.892-.02-.09-2.733 1.142-.06.021-.25.108-.479.209 2.35 3.961.25 12.43 1.66 29.291.106 1.271.266 2.435.462 3.553h71.583c-.464-3.547-.819-6.451.462-12.826z"
        />
        <path
          fill="#377996"
          d="M39.82 107.143a.752.752 0 01-.365-1.408c1.515-.843 3.529-1.8 5.478-2.728a178.068 178.068 0 003.808-1.846.75.75 0 11.678 1.338c-1.181.598-2.51 1.23-3.842 1.863-1.927.916-3.919 1.863-5.393 2.682a.726.726 0 01-.364.099zM47.05 109.412a.75.75 0 01-.482-1.325l.38-.318c1.823-1.535 4.874-4.104 6.479-5.408a.752.752 0 01.948 1.164c-1.595 1.297-4.641 3.859-6.46 5.391l-.381.32a.749.749 0 01-.484.176zM50.8 110.262a.739.739 0 01-.495-.188.746.746 0 01-.067-1.057l1.181-1.334c1.382-1.555 3.101-3.49 4.144-4.808a.752.752 0 011.054-.122.752.752 0 01.122 1.055c-1.069 1.35-2.731 3.221-4.198 4.871l-1.177 1.328a.75.75 0 01-.564.255zM54.488 110.912a.747.747 0 01-.64-1.137c.476-.785 1.038-1.652 1.607-2.533.879-1.358 1.789-2.767 2.394-3.885a.754.754 0 011.017-.304c.364.197.5.652.304 1.017-.634 1.172-1.56 2.604-2.455 3.985a112.35 112.35 0 00-1.585 2.498.748.748 0 01-.642.359zM57.84 111.373a.752.752 0 01-.688-1.051c.65-1.492 1.427-3.199 2.112-4.707l.871-1.92a.75.75 0 111.367.615l-.873 1.926c-.683 1.5-1.456 3.199-2.103 4.686a.746.746 0 01-.686.451zM60.96 111.682a.749.749 0 01-.707-1c.654-1.844 1.576-4.496 2.251-6.662a.743.743 0 01.938-.492.749.749 0 01.493.938c-.682 2.189-1.61 4.861-2.269 6.719a.749.749 0 01-.706.497zM64.229 111.902a.751.751 0 01-.721-.959l.117-.4c.581-2.002 1.304-4.494 1.54-6.223a.75.75 0 011.487.203c-.251 1.838-.991 4.389-1.586 6.438l-.116.4a.751.751 0 01-.721.541zM67.03 112.012a.748.748 0 01-.745-.84c.282-2.313.702-5.139.974-6.781a.749.749 0 111.479.244 180.817 180.817 0 00-.965 6.719.75.75 0 01-.743.658zM69.921 112.053a.751.751 0 01-.748-.817c.214-2.373.589-5.269.794-6.783a.755.755 0 01.844-.644c.41.058.698.435.644.845-.203 1.502-.575 4.373-.786 6.717a.753.753 0 01-.748.682zM73.26 111.992h-.009a.749.749 0 01-.741-.758c.022-1.893-.104-3.803-.203-5.336-.033-.479-.063-.93-.086-1.344a.752.752 0 01.707-.791.745.745 0 01.791.707c.022.41.053.854.084 1.328.102 1.561.229 3.502.207 5.452a.75.75 0 01-.75.742zM101.759 107.232a.748.748 0 01-.394-.111c-3.963-2.447-6.993-4.209-9.008-5.236a.75.75 0 11.682-1.336c2.05 1.045 5.117 2.826 9.115 5.297a.748.748 0 01-.395 1.386zM95.229 109.063a.75.75 0 01-.496-.188 646.035 646.035 0 00-6.648-5.801.751.751 0 01.971-1.144c1.18 1.002 3.549 3.068 6.672 5.818.311.273.34.746.065 1.059a.744.744 0 01-.564.256zM92.471 109.682a.744.744 0 01-.521-.209l-6.142-5.91a.75.75 0 111.041-1.083l6.141 5.91a.75.75 0 01-.519 1.292zM88.659 110.432a.747.747 0 01-.583-.277c-.916-1.133-3.215-4.006-4.756-6.246a.753.753 0 01.193-1.043.752.752 0 011.043.193c1.512 2.195 3.779 5.033 4.686 6.151a.751.751 0 01-.583 1.222zM85.48 110.932a.75.75 0 01-.638-.353c-.438-.7-.907-1.391-1.378-2.084-.925-1.358-1.882-2.767-2.648-4.321a.75.75 0 011.346-.664c.721 1.463 1.646 2.825 2.544 4.143.481.709.961 1.414 1.409 2.133a.749.749 0 01-.635 1.146zM82.49 111.322a.746.746 0 01-.655-.383c-1.037-1.852-2.459-4.482-3.343-6.508a.75.75 0 011.375-.599c.857 1.969 2.256 4.553 3.275 6.375a.75.75 0 01-.652 1.115zM79.609 111.613a.748.748 0 01-.697-.475c-.873-2.203-2.221-5.289-2.76-6.515a.75.75 0 011.373-.602c.543 1.229 1.898 4.338 2.781 6.564a.753.753 0 01-.697 1.028zM76.398 111.863a.754.754 0 01-.719-.535c-.5-1.674-1.193-4.203-1.648-6.742a.749.749 0 01.605-.871.755.755 0 01.87.605c.443 2.471 1.12 4.939 1.61 6.578a.753.753 0 01-.718.965zM43.37 108.383a.75.75 0 01-.428-1.367c1.322-.916 2.716-1.746 4.063-2.547 1.394-.83 2.834-1.688 4.173-2.629a.75.75 0 01.863 1.228c-1.386.975-2.852 1.848-4.269 2.69-1.325.789-2.696 1.604-3.977 2.49a.727.727 0 01-.425.135zM98.499 108.213a.745.745 0 01-.487-.182c-1.1-.941-2.9-2.168-4.488-3.252-1.433-.977-2.668-1.818-3.246-2.348a.75.75 0 011.012-1.109c.499.457 1.753 1.313 3.079 2.217 1.62 1.104 3.459 2.357 4.62 3.353a.75.75 0 01-.49 1.321z"
        />
        <g>
          <path
            fill="#E0D1C1"
            d="M70.654 121.822c-.055 0-.11-.002-.17-.006-.731-.047-1.297-.449-1.59-1.135-.518-1.207-.141-3.283.739-5.543-.976-2.054-2.401-4.433-4.113-6.629-1.288-1.652-2.683-2.974-3.912-4.138-2.622-2.481-4.887-4.625-4.847-8.627a.75.75 0 01.75-.741h.008a.75.75 0 01.742.758c-.033 3.348 1.816 5.098 4.378 7.521 1.269 1.201 2.706 2.563 4.064 4.306a40.06 40.06 0 013.705 5.778c.957-1.979 2.212-3.967 3.521-5.524 2.219-2.64 4.559-4.576 6.625-6.287 2.524-2.092 4.521-3.744 4.682-5.494a.744.744 0 01.814-.678.75.75 0 01.68.813c-.219 2.371-2.426 4.198-5.219 6.512-2.018 1.671-4.304 3.563-6.434 6.099-1.596 1.897-2.938 4.233-3.814 6.317 1.077 2.421 1.618 4.619 1.008 5.775-.186.355-.639.923-1.617.923zm-.142-4.603c-.369 1.283-.474 2.322-.238 2.873.078.185.162.219.309.229.284.004.335-.063.363-.121.249-.473.075-1.559-.434-2.981z"
          />
          <path
            fill="#E0D1C1"
            d="M70.697 125.566c-.982 0-1.994-.549-2.286-1.752-.244-1.004-.002-1.939.664-2.564a2.564 2.564 0 012.483-.576c.791.246 1.352.865 1.533 1.701.389 1.77-.664 2.859-1.808 3.125a2.638 2.638 0 01-.586.066zm.133-3.502c-.266 0-.539.1-.729.279-.27.252-.351.639-.233 1.116.151.619.772.65 1.079.576.218-.049.91-.295.681-1.34-.067-.308-.239-.506-.515-.59a.983.983 0 00-.283-.041z"
          />
          <path
            fill="#E0D1C1"
            d="M71.111 124.686c-.144-.209-.475-.226-.629-.021-.861 1.131-1.903 3.596-1.166 4.889.982 1.722 4.422.849 3.004-2.653a12.06 12.06 0 00-1.209-2.215z"
          />
        </g>
        <g>
          <path
            fill="#377996"
            d="M107.197 140a.75.75 0 01-.743-.656c-.445-3.514-.83-6.549.479-13.071.853-4.229.521-8.203.229-11.71-.24-2.881-.448-5.366.146-7.168a.75.75 0 011.424.468c-.498 1.512-.303 3.857-.075 6.574.286 3.428.642 7.693-.253 12.131-1.26 6.281-.907 9.063-.461 12.586a.75.75 0 01-.746.846z"
          />
        </g>
        <g>
          <path
            fill="#377996"
            d="M35.617 140a.75.75 0 01-.738-.625 44.181 44.181 0 01-.468-3.621c-.641-7.664-.563-13.484-.499-18.162.072-5.313.12-8.822-1.059-10.811a.75.75 0 111.289-.765c1.396 2.353 1.345 6.029 1.27 11.597-.063 4.646-.142 10.426.493 18.017a43.08 43.08 0 00.452 3.495.749.749 0 01-.74.875z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#744149"
          d="M90.249 52.32c-.595.444-1.669 1.732-1.81 2.402l-1.631 6.158c1.065-.974 4.606-2.776 6.166-5.099 1.805-2.668.066-5.564-2.725-3.461zM54.92 51.776c-2.297-.769-3.176 1.055-2.623 3.347.775 3.174 4.275 4.388 6.769 5.653l-1.394-6.519c-.44-.391-1.172-1.951-2.752-2.481z"
        />
        <path
          fill="#4D2631"
          d="M58.345 57.531a.75.75 0 01-.743-.659c-.158-1.295-1.579-2.137-3.62-2.145a.749.749 0 01.003-1.5h.003c2.845.011 4.849 1.37 5.103 3.463a.748.748 0 01-.746.841zM87.197 58.158a.752.752 0 01-.731-.928c.457-1.867 2.786-3.568 4.676-3.986a.753.753 0 01.896.57.752.752 0 01-.57.895c-1.388.307-3.237 1.631-3.543 2.877a.75.75 0 01-.728.572z"
        />
        <path
          fill="#744149"
          d="M87.057 48.878c-1.652-2.926 2.381-5.658-2.307-7.494-1.16-.465-3.701-.657-4.02-2.289-.273-1.092-.443-3.183-1.875-3.183-3.16 0-.611 5.65-4.961 5.422-4.135-.203-3.547-5.379-6.609-5.492-2.306-.127-2.496 3.337-2.643 3.837-.705 2.359-2.936 1.1-4.502.938-3.477-.36-.967 3.593-2.262 5.215-.815 1.03-2.187.333-3.375 1.046-1.587.964.907 2.602 1.537 3.366.686.821-.069 1.564.051 2.431 5.408 38.756 30.937 32.375 34.226-2.128-.741-.044-2.344-.044-3.26-1.669z"
        />
        <path
          fill="#52322B"
          d="M80.947 53.126a.82.82 0 01-.121-.008c-.547-.071-.936-.529-.867-1.074l1.003.042-.987-.16.022-1.291a1.002 1.002 0 011-.978h.022c.551.013.988.47.978 1.022l-.021 1.109c-.006.321-.01.321-.024.434-.069.505-.509.904-1.005.904zM64.156 53.27a.998.998 0 01-.983-.83c-.047-.272-.164-1.709-.145-1.963a1 1 0 011.997.103c.005.219.084 1.319.118 1.522a1 1 0 01-.987 1.168z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#4D2631"
            d="M77.764 47.63a.75.75 0 01-.614-1.181c.744-1.06 2.14-1.829 3.643-2.005 1.689-.201 3.387.363 4.76 1.583a.75.75 0 01.063 1.059.752.752 0 01-1.06.063c-1.347-1.194-2.697-1.321-3.59-1.213-1.074.125-2.09.666-2.588 1.375a.75.75 0 01-.614.319zM60.309 48.021a.749.749 0 01-.605-1.191c.962-1.323 2.456-2.217 3.996-2.393 1.428-.158 2.767.266 3.884 1.235a.75.75 0 11-.983 1.133c-.793-.688-1.745-.981-2.731-.878-1.13.129-2.233.796-2.953 1.786a.755.755 0 01-.608.308z"
          />
        </g>
        <g>
          <path
            fill="#613240"
            d="M72.896 62.985c-.402 0-.836-.092-1.301-.311-.029-.014-2.766-1.618-2.256-2.954.303-.794 1.251-.772 2.29-.536.079-2.961-.049-6.742-1.354-9.11a.755.755 0 01.295-1.02.753.753 0 011.021.295c1.609 2.922 1.649 7.325 1.505 10.834a.749.749 0 01-.962.687 13.938 13.938 0 00-.753-.203c.328.294.691.57.854.648.761.357 1.443.252 2.683-1.347a.747.747 0 011.052-.134.75.75 0 01.135 1.052c-.533.686-1.626 2.099-3.209 2.099z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M70.322 66.182c-1.506-.923-2.101-.353-2.287.109-.354.877 1.533 3.1 4.756 3.102 3.223 0 5.348-2.812 4.328-3.68-1.56-1.328-2.508 3.09-6.797.469z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#ED7278"
            d="M80.422 63.605c.625 2.069 3.381 1.811 3.744-.089.523-2.721-4.701-3.075-3.744.089zM62.377 64.03c.326.668 1.185 1.047 1.867 1.027 1.599-.063 1.893-1.623 1.446-2.611-.884-1.961-4.682-1.223-3.313 1.584z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar02: (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <path
        fill="#66353D"
        d="M59.996 5.002C44.933 16.437 44.347 42.305 44.428 60.888c.028 6.574.067 12.137.465 16.219 7.888 1.386 17.63 2.441 26.96 2.747l6.743-48.668 4.147-13.075c0-.008 2.092-4.981 3.741-9.444-1.255-.582-2.387-1.069-3.265-1.711C81.143 5.434 72.7-4.639 59.996 5.002z"
      />
      <path
        fill="#744149"
        d="M52.903 30.87a.854.854 0 01-.135-1.699c11.957-1.942 20.844-7.937 25.171-12.9 2.271-2.594 3.788-5.239 5.235-9.132a.855.855 0 011.605.598c-1.117 2.999-2.562 6.244-5.551 9.66-5.771 6.616-15.808 11.775-26.187 13.461a.822.822 0 01-.138.012z"
      />
      <path
        fill="#744149"
        d="M52.848 30.23a.855.855 0 01-.482-1.563 286.38 286.38 0 015.7-3.741c8.631-5.568 16.785-10.827 21.963-20.469a.853.853 0 011.159-.35.86.86 0 01.35 1.158c-5.39 10.032-13.723 15.408-22.544 21.098a279.105 279.105 0 00-5.664 3.72.87.87 0 01-.482.147z"
      />
      <path
        fill="#744149"
        d="M51.662 29.98a.855.855 0 01-.632-1.433c3.284-3.6 6.014-6.197 8.654-8.709 5.003-4.762 9.327-8.873 15.847-18.282a.855.855 0 011.406.973c-6.62 9.555-11.211 13.922-16.073 18.547-2.62 2.492-5.327 5.067-8.57 8.624a.85.85 0 01-.632.28z"
      />
      <path
        fill="#744149"
        d="M48.662 78.576a.855.855 0 01-.852-.777c-.879-9.707-1.943-40.611 4.462-54.805C56.335 13.99 62.288 5.727 68.607.324a.86.86 0 011.206.094.857.857 0 01-.095 1.207c-6.132 5.245-11.922 13.29-15.886 22.071-6.255 13.861-5.185 44.357-4.317 53.949a.856.856 0 01-.774.93l-.079.001z"
      />
      <path
        fill="#744149"
        d="M52.948 79.169a.851.851 0 01-.849-.764c-.9-8.506-.231-27.795.445-34.207a.856.856 0 011.703.181c-.759 7.172-1.281 25.96-.445 33.843a.856.856 0 01-.854.947zM57.054 79.66a.855.855 0 01-.85-.771c-.635-6.362.041-14.145.489-19.296.063-.733.122-1.403.168-1.998.24-3 .356-5.639.434-7.385.051-1.156.076-1.676.107-1.919a.854.854 0 111.695.228c-.023.177-.058.913-.094 1.767a207.036 207.036 0 01-.437 7.445c-.05.599-.106 1.273-.171 2.009-.441 5.087-1.111 12.775-.491 18.98a.855.855 0 01-.85.94z"
      />
      <g>
        <path
          fill="#592A2A"
          d="M86.485 8.666c-1.649 4.463-3.741 9.436-3.741 9.444l-4.147 13.075-6.743 48.668c10.41.34 20.305-.252 26.527-2.36.223-2.983-.07-5.612.907-31.389 1.137-30.182-7.111-34.798-12.803-37.438z"
        />
        <path
          fill="#6B3232"
          d="M93.964 39.809a.856.856 0 01-.769-.48c-4.181-8.548-8.586-18.494-9.551-27.422a.857.857 0 01.761-.942.86.86 0 01.94.758c.941 8.715 5.511 18.93 9.385 26.854a.855.855 0 01-.766 1.232z"
        />
        <path
          fill="#6B3232"
          d="M94.41 79.398c-.016 0-.031 0-.048-.002a.858.858 0 01-.809-.901c.202-3.777.264-7.632.181-11.451-.088-4.169-.074-8.217-.063-12.133.045-13.642.087-26.527-4.491-39.212-.535-1.479-1.282-3.028-1.943-4.394a61.145 61.145 0 01-.95-2.016.853.853 0 01.437-1.127.852.852 0 011.127.435c.264.596.585 1.259.925 1.965.68 1.402 1.448 2.993 2.014 4.557 4.682 12.971 4.639 26.002 4.594 39.8-.013 3.905-.025 7.942.064 12.091.08 3.86.02 7.756-.186 11.579a.853.853 0 01-.852.809z"
        />
        <path
          fill="#6B3232"
          d="M90.454 80.058l-.033-.001a.85.85 0 01-.821-.883c.667-18.49-1.07-34.512-1.269-36.278l1.696-.225c.204 1.812 1.953 17.951 1.281 36.564a.855.855 0 01-.854.823zM86.939 80.424a.855.855 0 01-.854-.824l-.455-12.997c-.445-12.658-.506-14.358-.506-14.409a.855.855 0 011.711-.017c.007.233.244 7.009.502 14.368l.458 12.996a.858.858 0 01-.826.886c-.009-.003-.019-.003-.03-.003zm-.102-28.231h.013-.013z"
        />
      </g>
      <g>
        <path
          fill="#E6A57A"
          d="M82.449 53.256l-19.125.627c0 26.694-4.594 34.706-11.734 38.055 6.555 19.2 35.478 17.561 40.753.458-7.009-4.632-9.894-14.145-9.894-39.14z"
        />
        <path
          fill="#EDDED0"
          d="M109.952 98.942c-7.578-1.581-13.353-3.735-17.608-6.547-14.342 1.746-26.516 1.618-40.753-.458-3.812 1.79-8.346 2.254-13.3 3.517-1.553.396-2.901 1.364-3.862 2.646-7.201 9.6-14.146 26.305-18.79 41.044H126.13c-3.747-19.215-8.191-30.182-10.653-35.812-1-2.288-3.081-3.879-5.525-4.39z"
        />
        <path
          fill="#D4C0AC"
          d="M50.343 96.313a.968.968 0 01-.075-.004 69.239 69.239 0 01-3.537-.421.855.855 0 01.261-1.692 68.88 68.88 0 003.423.408.854.854 0 01.778.927.855.855 0 01-.85.782zM57.516 97.07c-.022 0-.043 0-.065-.002l-.167-.012c-.682-.048-2.751-.188-4.112-.405a.855.855 0 01.272-1.69c1.282.206 3.294.346 3.955.392l.18.011a.854.854 0 01-.063 1.706zM64.061 97.582c-.022 0-.045 0-.067-.002-1.236-.097-3.306-.306-3.723-.372a.856.856 0 01-.712-.979.866.866 0 01.977-.712c.313.049 2.297.256 3.591.356a.858.858 0 01.788.919.86.86 0 01-.854.79zM69.968 97.962c-1.105 0-2.364-.165-2.857-.229l-.143-.021a.851.851 0 01-.796-.803.853.853 0 01.803-.902c.02 0 .148.002.356.028.492.064 1.797.221 2.82.213.516-.042.864.363.874.836a.854.854 0 01-.836.874 8 8 0 01-.221.004zM72.867 98.208c-.321 0-.394-.015-.436-.022a.855.855 0 01-.688-.993c.083-.453.51-.768.953-.693.281.016 1.878-.047 3.286-.114a.854.854 0 11.083 1.708c-1.878.09-2.765.114-3.198.114zM79.127 98.197l-.611-.002a.856.856 0 01.003-1.712h.004c1.714.01 2.123.002 3.402-.23a.865.865 0 01.994.689.855.855 0 01-.689.994c-1.241.224-1.796.261-3.103.261zM84.865 97.706a.852.852 0 01-.115-1.699c.124-.019 3.256-.476 3.385-.493a.856.856 0 01.275 1.688c-.06.01-3.375.492-3.437.5a2.023 2.023 0 01-.108.004zM90.838 96.739a.852.852 0 01-.85-.757.853.853 0 01.751-.948c.172-.021.54-.081 1.029-.161.428-.07.94-.154 1.494-.241a.858.858 0 01.976.715.854.854 0 01-.712.976c-.549.085-1.059.169-1.479.238-.529.089-.928.154-1.113.173a1.047 1.047 0 01-.096.005z"
        />
        <g>
          <path
            fill="#8DB2C2"
            d="M89.114 107.246c-1.897 0-3.054-.111-5.057-.305-1.825-.176-4.322-.417-8.756-.703-5.495-.289-12.009-.26-18.907-.226-5.972.027-12.146.059-17.861-.133-2.69-.078-5.331-.192-8.071-.349a.852.852 0 01-.805-.902c.027-.473.429-.852.902-.807 2.725.156 5.351.27 8.027.348 5.687.189 11.848.158 17.801.131 6.921-.034 13.459-.063 19.016.229 4.47.288 6.984.532 8.819.71 4.623.441 4.621.443 20.926-.416l1.933-.101c3.416-.18 6.364-.274 8.997-.249a.856.856 0 01-.003 1.711h-.002c-2.623-.017-5.52.07-8.902.246l-1.933.102c-9.509.504-13.516.714-16.124.714zM85.547 116.665c-2.163 0-4.274-.073-6.3-.261-.443-.046-1.138-.201-2.1-.415-2.318-.516-6.203-1.351-9.479-1.268-3.295.104-5.618.071-8.561.036-4.585-.06-10.865-.14-25.143.2-2.808.063-5.581.053-8.483-.033a.857.857 0 01-.83-.882c.016-.468.371-.828.88-.828 2.869.086 5.613.099 8.393.034 14.306-.343 20.605-.263 25.206-.202 2.922.039 5.229.067 8.481-.035 3.51-.105 7.508.777 9.907 1.31.835.187 1.559.348 1.895.381 5.776.536 12.387.118 18.78-.285 4.128-.26 8.005-.51 11.514-.482 3.278.013 6.813.239 10.231.463a.853.853 0 01.797.909.857.857 0 01-.907.796c-3.393-.219-6.901-.447-10.13-.457-3.421-.025-7.298.221-11.396.479-4.249.266-8.595.54-12.755.54zM104.798 126.491c-9.391 0-18.824-.808-29.355-2.479-1.419-.227-3.218.008-4.958.232-1.159.149-2.357.306-3.466.33-13.155.29-19.172-.244-24.48-.72-.782-.069-1.554-.139-2.334-.203-4.95-.408-9.761-.586-18.443-.201a.869.869 0 01-.892-.816.855.855 0 01.816-.893c8.771-.388 13.643-.21 18.66.203.786.066 1.562.136 2.346.206 5.264.473 11.228 1.004 24.291.712 1.015-.021 2.117-.164 3.284-.314 1.859-.24 3.782-.49 5.445-.226 14.941 2.37 27.647 2.989 41.182 2.014 2.093-.146 4.035-.282 5.839-.383.451-.05.875.332.901.807a.855.855 0 01-.805.903c-1.799.101-3.73.234-5.814.38-4.121.298-8.166.448-12.217.448zM86.862 135.68a23.8 23.8 0 01-.987-.017c-1.415-.064-3.197-.583-5.083-1.136-2.104-.613-4.491-1.311-6.675-1.451-2.173-.143-4.346-.046-7.095.077-4.496.201-10.091.453-19.178-.146a361.305 361.305 0 00-18.998-.727 377.435 377.435 0 00-10.535 0h-.012a.856.856 0 01-.011-1.709c3.401-.046 6.96-.046 10.58 0 6.537.082 12.959.328 19.086.73 8.993.592 14.537.342 18.99.142 2.802-.125 5.016-.227 7.281-.073 2.372.15 4.855.877 7.046 1.517 1.783.521 3.467 1.014 4.68 1.066 1.735.084 5.45-.122 10.595-.399 4.764-.262 10.688-.582 17.469-.813 3.572-.129 7.228-.217 10.863-.26h.012a.855.855 0 01.009 1.711c-3.625.042-7.265.128-10.823.257-6.766.231-12.684.554-17.438.813-4.383.236-7.742.418-9.776.418zM89.95 102.374c-4.092 0-8.782-.087-14.557-.313-4.056-.048-8.354-.054-12.583-.06-7.441-.011-14.466-.019-19.962-.254-2.56-.107-5.495-.395-8.895-.726l-.57-.055a.855.855 0 01-.768-.933c.045-.472.466-.833.933-.77l.57.056c3.375.328 6.29.611 8.802.717 5.458.233 12.468.243 19.891.254 4.238.005 8.54.011 12.625.06 13.801.543 21.386.269 29.416-.023 2.583-.093 5.197-.187 8.068-.256.524-.012.864.36.874.834s-.364.864-.835.874c-2.859.068-5.469.163-8.045.256-4.699.173-9.247.339-14.964.339zM87.143 112.186a76.28 76.28 0 01-7.663-.365c-.495-.05-1.574-.235-3.07-.491-3.282-.563-8.241-1.412-10.77-1.458-6.657-.122-12.432.095-17.528.284-7.163.266-13.35.494-20.201-.165a.854.854 0 01-.77-.933c.044-.471.463-.828.932-.771 6.739.647 12.871.421 19.975.157 5.119-.188 10.918-.4 17.621-.283 2.658.048 7.694.911 11.027 1.482 1.409.239 2.52.431 2.956.478 6.951.701 13.161.254 20.351-.26 5.494-.394 11.182-.806 17.971-.759a.857.857 0 01-.004 1.712h-.007c-6.704-.048-12.372.359-17.837.751-4.406.318-8.658.621-12.983.621zM121.675 121.778l-.048-.001-.9-.054c-1.894-.108-4.249-.245-9.379-.282-6.251-.046-10.91.064-15.018.157-4.961.111-8.878.2-13.322-.036-1.647-.086-2.984-.474-4.4-.885-1.774-.517-3.616-1.052-6.238-.979-11.992.275-16.954-.231-20.938-.638-4.235-.433-7.578-.776-17.379-.061-4.691.336-8.103.56-10.682.718-.457-.012-.879-.33-.906-.8a.854.854 0 01.801-.906c2.575-.157 5.982-.381 10.662-.72 9.952-.724 13.359-.374 17.677.066 4.14.422 8.832.902 20.722.628 2.92-.077 4.947.524 6.758 1.047 1.317.382 2.564.744 4.014.819 4.381.233 8.268.145 13.193.032 4.119-.094 8.783-.195 15.068-.157 5.176.04 7.555.18 9.467.288l.895.05a.86.86 0 01.809.902.86.86 0 01-.856.812zM97.729 131.172c-4.717 0-7.661-.663-10.723-1.354-3.171-.713-6.449-1.452-12.069-1.593-2.504.03-5.186.134-7.779.234-3.234.127-6.263.239-9.134.236-4.389 0-8.854-.262-13.575-.54-4.663-.272-9.949-.585-15.948-.684-3.145-.044-5.808-.04-8.373.011l-.027-1.709h.011c2.57-.05 5.247-.053 8.414-.012 6.038.099 11.342.411 16.022.687 4.791.282 9.316.545 13.747.537 2.738 0 5.682-.114 8.797-.234 2.604-.101 5.296-.204 7.855-.236 5.818.144 9.18.903 12.434 1.635 4.379.985 8.165 1.839 17.11.932 6.753-.687 13.051-1.121 19.249-1.33h.028a.855.855 0 01.029 1.709c-6.16.208-12.419.64-19.13 1.321-2.708.277-4.978.39-6.938.39zM92.464 139.091c-3.835 0-7.008-.285-10.613-.609-2.522-.227-5.13-.462-8.352-.641-3.322-.173-6.438.044-9.736.272-2.398.168-4.876.34-7.563.369-7.381.075-11.268-.476-15.005-1.006-3.25-.46-6.318-.896-11.596-.972-3.554-.047-7.757.075-12.844.381-.483-.021-.877-.331-.905-.802a.855.855 0 01.802-.905c5.131-.306 9.375-.429 12.969-.384 5.386.078 8.654.541 11.812.99 3.676.521 7.488 1.058 14.747.985 2.634-.025 5.09-.198 7.462-.362 3.351-.234 6.517-.456 9.945-.276 3.255.181 5.996.429 8.414.645 6.276.565 11.231 1.012 20.748-.003 4.979-.526 10.245-.253 14.889-.012 3.047.16 5.924.312 8.161.19.459-.034.874.336.901.811a.858.858 0 01-.809.898c-2.326.123-5.251-.027-8.342-.19-4.582-.238-9.773-.51-14.62.004-4.201.448-7.526.617-10.465.617z"
            opacity=".4"
          />
        </g>
        <g>
          <path
            fill="#D4C0AC"
            d="M107.007 140a.855.855 0 01-.851-.781c-1.246-14.295 1.479-24.595 3.673-32.87.628-2.377 1.223-4.622 1.643-6.69a.857.857 0 011.677.34c-.432 2.118-1.029 4.385-1.665 6.788-2.158 8.146-4.842 18.285-3.623 32.284a.857.857 0 01-.777.926l-.077.003zM35.345 140a.855.855 0 01-.843-1.003c.191-1.09.421-2.229.682-3.502.364-1.794.779-3.829 1.21-6.38.888-5.278 2.432-23.56-.727-32.606a.856.856 0 011.614-.565c3.309 9.473 1.744 27.836.8 33.454-.437 2.58-.853 4.631-1.221 6.438-.255 1.257-.484 2.379-.672 3.457a.858.858 0 01-.843.707z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#E6A57A"
          d="M90.297 39.505l-1.168 9.367c1.972-1.538 2.98-2.009 4.662-4.196 4.59-5.929.493-9.689-3.494-5.171zM50.248 41.851c0 3.931 3.864 6.438 6.723 9.331l-.711-9.091c-1.696-3.866-6.012-4.46-6.012-.24z"
        />
        <path
          fill="#D99467"
          d="M56.655 46.531a.856.856 0 01-.85-.761c-.071-.65-.957-2.12-1.87-2.637-.436-.245-.654-.148-.725-.115a.853.853 0 01-1.134-.421.852.852 0 01.42-1.133c.495-.228 1.292-.378 2.281.182 1.398.793 2.595 2.73 2.728 3.936a.856.856 0 01-.85.949zM89.314 44.908a.855.855 0 01-.806-1.143c.544-1.524 1.831-3.475 3.374-4.157.667-.296 1.335-.323 1.925-.076a.854.854 0 11-.655 1.578c-.057-.025-.223-.096-.576.063-.883.39-1.96 1.783-2.456 3.168a.861.861 0 01-.806.567z"
        />
        <path
          fill="#EBB686"
          d="M67.772 29.923c-3.648 1.311-8.734 1.437-13.661.376-.558 45.325 22.841 45.302 31.404 31.984 4.126-6.409 5.781-15.838 6.623-23.82-4.616-5.428-8.276-12.622-9.395-20.353-2.769 5.142-6.795 8.894-14.971 11.813z"
        />
        <path
          fill="#52322B"
          d="M63.584 42.173a1.14 1.14 0 01-1.126-.974c-.105-.703-.113-1.036-.089-1.986a1.14 1.14 0 011.139-1.112h.028a1.142 1.142 0 011.112 1.167c-.021.864-.013 1.073.066 1.596a1.143 1.143 0 01-1.13 1.309zM82.146 42.371a.52.52 0 01-.055-.003c-.626-.031-1.114-.52-1.084-1.149.019-.319.032-.621.033-1.855a1.14 1.14 0 012.281.001c0 1.319-.019 1.642-.03 1.88-.033.61-.543 1.126-1.145 1.126z"
        />
        <path
          id="eyebrow"
          fill="#6B3232"
          d="M87.068 35.821a.855.855 0 01-.542-.193c-1.411-1.158-2.753-2.117-4.86-2.117h-.079c-1.262.014-2.999.874-3.594 1.439a.861.861 0 01-1.212-.033.859.859 0 01.035-1.209c.959-.907 3.096-1.889 4.753-1.907h.102c2.665 0 4.332 1.184 5.939 2.505a.853.853 0 01-.542 1.515zM57.527 36.134a.854.854 0 01-.589-1.475c2.033-1.934 6.399-3.682 10.082-.583a.854.854 0 11-1.101 1.308c-3.163-2.661-6.704-.531-7.804.515a.847.847 0 01-.588.235z"
        />
        <g>
          <path
            fill="#D99467"
            d="M72.382 53.736l-.074-.002c-1.09-.028-2.824-1.223-3.475-2.18-.437-.646-.392-1.155-.276-1.469.258-.695 1.013-.921 2.162-.958-.071-3.034-.392-7.474-.412-7.661a.859.859 0 01.755-.94.841.841 0 01.943.742c.031.256.421 5.719.435 8.712a.853.853 0 01-.258.616.926.926 0 01-.622.243 9.645 9.645 0 00-1.105.016c.493.506 1.495 1.158 1.908 1.171.473.055 1.254-.918 1.669-1.421l.114-.139a.855.855 0 111.316 1.092l-.112.135c-.713.864-1.686 2.043-2.968 2.043z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#F26D57"
            d="M72.461 58.934c-1.876 0-3.327-.466-4.22-.754-.277-.089-.5-.165-.665-.194a.855.855 0 01.299-1.683c.222.039.521.131.891.252 1.449.466 4.145 1.334 7.74-.185a.856.856 0 01.667 1.575c-1.761.743-3.35.989-4.712.989z"
          />
        </g>
        <g>
          <path
            fill="#E6A57A"
            d="M72.276 61.434c-.245 0-.513-.009-.817-.021a.854.854 0 01.033-1.709l.036.001c.977.036 1.313.029 1.807-.113a.857.857 0 011.057.592.854.854 0 01-.591 1.054 5.234 5.234 0 01-1.525.196z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M80.112 52.719c.604 3.156 4.753 1.648 4.303-1.115-.368-2.257-5.003-2.551-4.303 1.115zM60.91 52.271c-.108 2.896 3.911 3.048 4.029.355.099-2.181-3.903-3.787-4.029-.355z"
          />
        </g>
        <g>
          <circle fill="#E6A57A" cx="66.318" cy="44.896" r=".776" />
          <circle fill="#E6A57A" cx="66.025" cy="47.645" r=".777" />
          <circle fill="#E6A57A" cx="63.432" cy="46.368" r=".777" />
          <g>
            <circle fill="#E6A57A" cx="81.135" cy="46.87" r=".777" />
            <circle fill="#E6A57A" cx="78.181" cy="45.104" r=".776" />
            <circle fill="#E6A57A" cx="78.084" cy="47.987" r=".777" />
          </g>
        </g>
      </g>
      <g>
        <path
          fill="#B0695A"
          d="M68.439 40.095a.855.855 0 01-.626-1.438c1.492-1.605 5.349-2.156 7.899-.431a.853.853 0 01.229 1.187.854.854 0 01-1.187.23c-1.839-1.241-4.803-.772-5.688.179a.851.851 0 01-.627.273z"
        />
        <path
          fill="#B0695A"
          d="M61.883 44.685c-.761 0-1.507-.072-2.148-.265-2.5-.75-4.178-3.149-3.904-5.582a.841.841 0 01.226-.487c2.402-2.571 6.457-2.58 8.658-2.353 3.693.362 4.338 2.543 4.445 3.464.218 1.887-1.029 3.966-2.721 4.542-.583.205-2.615.681-4.556.681zm-4.371-5.374c-.03 1.524 1.094 2.984 2.714 3.471 1.616.483 4.697-.056 5.652-.395.85-.29 1.721-1.543 1.583-2.729-.163-1.401-1.676-1.839-2.916-1.961h-.003c-1.819-.187-5.097-.209-7.03 1.614z"
        />
        <path
          fill="#B0695A"
          d="M53.705 40.713a.855.855 0 01-.441-1.59c.698-.419 2.083-.855 3.291-1.036a.854.854 0 11.254 1.689c-1.08.162-2.224.548-2.664.813a.83.83 0 01-.44.124zM82.288 44.603a12.32 12.32 0 01-4.043-.691c-1.274-.442-3.014-1.908-3.6-3.505-.334-.907-.278-1.779.158-2.523 1.663-2.831 9.055-3.399 13.405-1.035.225.123.384.34.431.591.286 1.511-.163 3.344-1.176 4.783-.868 1.236-2.06 2.031-3.353 2.237a11.63 11.63 0 01-1.822.143zm-.518-7.516c-2.602 0-4.915.684-5.49 1.662v.002c-.064.107-.26.438-.027 1.065.414 1.131 1.77 2.208 2.556 2.48 1.649.574 3.388.736 5.032.474.835-.133 1.624-.679 2.227-1.533.641-.914.995-2.103.942-3.084-1.576-.751-3.475-1.066-5.24-1.066zm-6.227 1.229h.011-.011z"
        />
        <path
          fill="#B0695A"
          d="M91.838 39.379a.828.828 0 01-.355-.078c-.813-.371-2.419-.475-3.568-.415-.445.013-.872-.337-.899-.81a.855.855 0 01.811-.898c.285-.018 2.846-.126 4.367.567a.855.855 0 01-.356 1.634z"
        />
      </g>
    </svg>
  ),
  avatar03: (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <path
        fill="#5C2F3F"
        d="M100.643 62.133c-.222-2.673 2.387-5.303 2.564-8.504.316-5.491-5.248-4.149-3.784-12.456 1.581-8.89-4.764-6.053-4.192-12.577.139-1.512.854-4.204.498-6.134-.645-3.448-3.756-3.984-4.728-7.707-.875-3.371.313-5.506-2.917-7.172-1.466-.747-3.76-.882-4.923-1.377-3.622-1.564-2.041-8.419-12.519-4.034-.314.132-1.215.031-3.208-.259-5.529-.824-4.833 3.799-8.421 6.19-2.332 1.554-6.589.063-8.051 2.709-1.662 3.027.662 7.294-1.426 10.171-1.695 2.308-5.561 2.111-5.64 6.582-.041 2.833 1.446 6.093-.807 8.583-.644.69-2.619 1.859-3.38 3.209-1.66 2.917 1.682 6.547 1.472 10.088-.331 5.561-6.857 6.187-7.947 12.758-.651 3.936.847 6.367 3.71 7.553 2.626 1.084 6.09-.585 7.978 1.045 1.84 1.59 1.516 4.379 5.155 4.491 2.864.097 3.691-2.099 7.125-2.126 3.581-.029 6.585 4.438 10.262 5.314 5.392 1.275 8.063-4.002 11.56-4.881 2.586-.645 3.894.344 6.31.573 2.125.218 2.89-.737 4.667-1.88 3.454-2.209 5.104.62 8.271 1.867 5.445 2.184 7.967-2.135 7.117-5.084-.756-2.598-4.493-3.73-4.746-6.942z"
      />
      <path
        fill="#663548"
        d="M91.346 72.511a.862.862 0 01-.771-.474c-1.811-3.588-.492-5.043.566-6.213.738-.815 1.322-1.459 1.066-2.941-.239-1.375-1.125-1.898-2.35-2.621-1.248-.737-2.801-1.654-3.828-3.741-1.366-2.777-.385-4.796.479-6.576.979-2.014 1.901-3.916.232-7.32a.863.863 0 011.549-.759c2.04 4.159.781 6.75-.229 8.832-.826 1.699-1.479 3.042-.484 5.062.8 1.625 1.998 2.333 3.158 3.018 1.373.811 2.795 1.65 3.172 3.811.398 2.311-.647 3.466-1.488 4.396-.953 1.051-1.582 1.746-.305 4.276a.863.863 0 01-.767 1.25zM51.751 75.917a.862.862 0 01-.843-.688c-.183-.896-.867-1.804-1.591-2.764-1.398-1.855-3.14-4.167-.799-6.831.483-.553 1.113-.969 1.721-1.37 1.045-.689 1.948-1.284 2.095-2.448.154-1.276-.572-2.362-1.415-3.619-1.186-1.774-2.662-3.98-1.239-7.095.455-.997.836-1.61 1.143-2.103.586-.944.974-1.567 1.483-4.396a.863.863 0 011.697.305c-.568 3.154-1.05 3.929-1.715 5-.295.475-.63 1.013-1.039 1.91-1.024 2.24-.038 3.713 1.104 5.42.945 1.412 1.923 2.874 1.693 4.789-.248 1.956-1.695 2.91-2.857 3.677-.537.354-1.043.687-1.373 1.065-1.351 1.537-.587 2.711.879 4.655.807 1.071 1.642 2.181 1.902 3.456a.862.862 0 01-.846 1.037z"
      />
      <path
        fill="#CF8A5F"
        d="M89.613 84.371c-5.133-6.702-5.184-19.013-4.481-26.102l-26.799.016c-.227 3.444 2.254 13.686-.876 20.648-1.938 4.308-4.801 7.248-8.138 9.485 4.671 6.31 15.714 8.177 22.139 8.103 9.349-.108 19.453-3.172 22.138-7.805a33.188 33.188 0 01-3.983-4.345z"
      />
      <path
        fill="#7997C7"
        d="M93.598 88.717c-3.994 1.713-12.664 4.297-22.013 4.405-6.424.073-13.871-1.017-22.265-4.703-7.768 5.209-18.111 6.579-25.43 12.298-5.044 5.621-7.363 24.649-8.973 38.871h111.978c-1.322-15.234-3.916-33.419-8.756-38.081-6.444-4.482-16.164-5.152-24.541-12.79z"
      />
      <path
        fill="#86C0CF"
        d="M53.385 95.146a.86.86 0 01-.266-.043c-1.054-.34-1.792-.58-2.3-.771a.983.983 0 01-.303-.092l-.046-.015.003-.011a.607.607 0 01-.085-.058c-.734-.324-.675-.521-.524-1.016a.876.876 0 011.076-.576c.103.029.195.063.277.099.313.104 1.009.335 2.435.799a.86.86 0 01.554 1.085.86.86 0 01-.821.599zM58.334 96.456a.953.953 0 01-.21-.024c-.356-.09-.729-.173-1.155-.269a106.43 106.43 0 01-1.24-.283.862.862 0 01-.642-1.037c.11-.464.582-.737 1.037-.642.46.107.86.197 1.223.279.441.099.826.186 1.195.276a.862.862 0 01-.208 1.7zM64.003 97.371a.806.806 0 01-.12-.008l-2.782-.389a.864.864 0 01-.735-.974.86.86 0 01.974-.735l2.782.389a.863.863 0 01-.119 1.717zM69.658 97.491a.679.679 0 01-.09-.005 89.047 89.047 0 00-1.293-.121c-.521-.047-.988-.09-1.243-.121a.86.86 0 01-.749-.962.858.858 0 01.962-.749c.242.029.688.07 1.185.113.434.041.905.082 1.315.125a.861.861 0 01-.087 1.72zM72.885 97.643a.862.862 0 01-.054-1.722c.178-.014 1.947-.198 2.807-.296.463-.039.898.287.952.761s-.286.9-.76.953c-.781.089-2.729.293-2.894.304h-.051zM78.501 97.383a.86.86 0 01-.856-.77.864.864 0 01.766-.951c.775-.083.941-.114 1.102-.146.18-.035.35-.07 1.178-.156a.864.864 0 01.949.768.864.864 0 01-.77.948c-.723.075-.868.103-1.023.133-.181.035-.369.074-1.25.17-.034.002-.065.004-.096.004zM83.333 96.678a.86.86 0 01-.841-.676.858.858 0 01.654-1.027l1.797-.399a.861.861 0 11.377 1.681l-1.801.4a.842.842 0 01-.186.021zM87.922 95.59a.86.86 0 01-.842-.683.859.859 0 01.663-1.022c.001 0 1.94-.412 2.153-.468.449-.168.908.069 1.076.515s-.093.954-.537 1.123c-.076.027-.129.049-2.334.516a.845.845 0 01-.179.019zM92.559 94.434a.86.86 0 01-.179-1.705l2.099-.445a.856.856 0 011.022.662.86.86 0 01-.664 1.023l-2.099.445a.774.774 0 01-.179.02zM48.618 93.42a.878.878 0 01-.297-.053l-1.741-.643a.861.861 0 11.595-1.619l1.741.643a.862.862 0 01-.298 1.672z"
      />
      <g>
        <path
          fill="#86C0CF"
          d="M108.225 140.445a.86.86 0 01-.858-.817c-.25-4.762-.448-9.438-.497-11.207-.096-4.547.908-8.762 1.972-13.226 1.245-5.229 2.533-10.637 2.021-16.857a.863.863 0 011.719-.143c.535 6.496-.785 12.039-2.063 17.398-1.035 4.354-2.016 8.465-1.925 12.784.048 1.753.246 6.409.494 11.159a.862.862 0 01-.815.906c-.018.003-.033.003-.048.003zM33.515 140.445h-.011a.863.863 0 01-.851-.873c.118-8.883-.007-14.733-.372-17.393-.288-2.092-.815-4.354-1.482-7.223-.986-4.234-2.213-9.504-3.299-16.957a.864.864 0 01.729-.979.868.868 0 01.978.729c1.076 7.381 2.294 12.612 3.272 16.815.677 2.91 1.213 5.207 1.511 7.377.376 2.744.506 8.683.387 17.649a.863.863 0 01-.862.855z"
        />
      </g>
      <g>
        <path
          fill="#CF8A5F"
          d="M48.512 40.01c.321.767 2.221 4.854 3.022 5.811 1.943 2.316 3.729.836 4.688.247l-1.769-8.232c-3.253-4.383-8.02-2.815-5.941 2.174zM89.385 40.098l-1.269 6.433c3.88 4.889 6.338-4.048 6.75-5.01 3.711-8.73-3.421-7.964-5.481-1.423z"
        />
        <path
          fill="#C77F54"
          d="M55.339 43.329a.863.863 0 01-.829-.625c-.494-1.729-2.428-3.303-4.057-3.303a.862.862 0 010-1.724c2.393 0 5.009 2.084 5.714 4.553a.86.86 0 01-.828 1.099zM88.918 43.33h-.023a.861.861 0 01-.838-.887c.03-1.084.7-2.34 1.793-3.359.996-.931 2.094-1.464 3.078-1.405a.86.86 0 01.825.896c-.019.476-.433.862-.896.826-.441.021-1.198.352-1.832.943-.729.679-1.229 1.542-1.246 2.147a.861.861 0 01-.861.839z"
        />
        <path
          fill="#D99467"
          d="M81.4 4.563c-9.555-4.8-21.449-.989-26.36 7.995-7.54 13.708-.086 36.773 3.948 44.611 4.69 9.531 15.762 7.005 26.962 4.233 2.564-11.856 15.232-46.853-4.55-56.839z"
        />
        <path
          fill="#744154"
          d="M89.977 45.593a.932.932 0 00-.891.641C87.92 49.8 86.25 54.52 82.645 59.017c-.781.016-.629.018-.889.013-.961-.02-1.047-.605-1.393-1.589-.309-.886-.584-2.1-1.09-3.953a2.289 2.289 0 00-2.123-1.681c-2.133-.078-7.699-.052-9.926.113-1.026.077-1.737.879-2.045 1.86-.5 1.583-.577 2.454-.904 3.312-.307.802-.714 1.494-1.57 1.556-.878.064-.854-.019-.881-.017-2.95-3.255-4.917-8.371-6.357-12.342a1.057 1.057 0 00-1-.697 1.07 1.07 0 00-1.03 1.34c5.927 22.8 4.883 23.347 14.413 23.791 19.808.924 18.971-2.017 21.422-14.662.679-3.502.861-4.311 1.611-9.294.09-.602-.297-1.174-.906-1.174z"
        />
        <path
          id="smile"
          fill="#FFF"
          d="M67.379 53.482c-.46-.24-.966.241-.649.618 6.801 8.057 11.314-.062 10.678-.569-.648-.914-3.87 3.16-10.029-.049z"
        />
        <g>
          <path
            fill="#C77F54"
            d="M71.68 49.709l-.035-.001c-1.273-.053-2.763-1.096-3.349-1.829-.329-.412-.459-.816-.389-1.2.1-.544.417-.947.894-1.136.348-.137.717-.135 1.053-.07.101-5.161-.254-8.414-.451-10.223-.051-.478-.092-.854-.11-1.138a.861.861 0 111.72-.116c.018.266.059.62.105 1.068.218 1.993.621 5.703.429 11.718a.867.867 0 01-.86.834c.303.171.621.308.889.354.596-.235 1.191-.755 1.721-1.219l.329-.284a.862.862 0 011.116 1.314l-.311.27c-.67.583-1.5 1.311-2.494 1.62a.935.935 0 01-.257.038z"
          />
        </g>
        <g>
          <path
            fill="#4D2323"
            d="M82.484 36.942a1.147 1.147 0 01-1.146-1.111 59.53 59.53 0 01-.035-1.419 1.15 1.15 0 011.135-1.165h.015c.629 0 1.142.505 1.149 1.135.004.342.017.799.033 1.372a1.148 1.148 0 01-1.109 1.187l-.042.001zM61.875 36.125c0-.004-.116-1.191-.174-1.528a1.15 1.15 0 012.264-.4c.067.377.199 1.703.199 1.703l-2.289.225z"
          />
        </g>
        <g>
          <path
            id="eyebrow"
            fill="#663548"
            d="M87.654 30.702a.862.862 0 01-.493-.156c-2.847-1.994-5.601-1.999-8.929-.008a.862.862 0 11-.885-1.479c3.885-2.322 7.416-2.297 10.803.075a.862.862 0 01-.496 1.568zM57.364 31.389a.862.862 0 01-.632-1.448c2.278-2.458 6.751-3.705 10.887-1.34a.86.86 0 01.32 1.176.866.866 0 01-1.176.321c-3.755-2.151-7.299-.57-8.768 1.015a.86.86 0 01-.631.276z"
          />
        </g>
        <g opacity=".4">
          <path
            fill="#F26D57"
            d="M81.395 49.033c1.094 3.152 4.662.354 3.073-1.905-.6-.856-4.046-.901-3.073 1.905zM60.053 49.281c1.087 2.528 3.907.516 3.52-1.161-.57-2.465-4.834-1.89-3.52 1.161z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#663548"
          d="M101.447 61.973c-.219-2.691 2.449-5.347 2.633-8.584.334-5.541-5.38-4.184-3.873-12.573 1.621-8.972-4.896-6.099-4.311-12.683.147-1.528.873-4.256.517-6.195-.667-3.48-3.853-4.026-4.851-7.785-.896-3.395.32-5.554-2.99-7.239-1.506-.751-3.862-.884-5.056-1.394-3.715-1.576-2.094-8.487-12.843-4.062-2.149 1.99-1.905 4.437-.678 7.07 2.321 8.063 8.978 3.454 11.149 7.006 1.275 2.085.393 4.122 1.621 6.111 1.793 2.86 8.276.339 9.024 8.317.298 3.14-1.976 5.839.873 8.983 4.06 4.48-.081 6.584 2.024 9.009.504.57 2.539 2.195 2.86 3.771.472 2.571-2.448 4.607-2.022 7.372.139.86.426 1.127 1.932 2.91 4.219 4.959.251 8.067-.014 11.778.459.266.94.4 1.48.607 5.588 2.194 8.26-2.432 7.396-5.414-.777-2.617-4.606-3.755-4.871-7.005z"
        />
        <path
          fill="#744154"
          d="M95.896 29.073a.86.86 0 01-.801-.535c-.209-.387-.406-.79-.603-1.19-.47-.958-.913-1.863-1.438-2.389-.72-.715-1.381-1.05-2.08-1.403-.52-.263-1.056-.533-1.567-.952-1.56-1.251-1.912-3.428-2.253-5.533-.531-3.28-.971-5.113-3.889-4.885-3.479.29-4.423-1.537-5.185-3.006-.44-.851-.856-1.656-1.742-2.141-1.128-.599-4.263.501-5.336 1.147a.862.862 0 01-.89-1.477c.677-.408 4.852-2.354 7.045-1.187 1.354.744 1.938 1.871 2.453 2.865.711 1.372 1.187 2.278 3.51 2.081 4.643-.405 5.249 3.335 5.734 6.326.303 1.866.588 3.628 1.637 4.469.371.305.783.513 1.259.753.753.38 1.604.812 2.521 1.721.73.73 1.26 1.809 1.771 2.853.196.404.397.813.608 1.202.07.126.105.268.105.413a.863.863 0 01-.859.868z"
        />
        <path
          fill="#744154"
          d="M70.548 1.494c-.403.073-1.334-.048-3.162-.303-5.679-.836-4.955 3.832-8.645 6.246-2.392 1.576-6.749.072-8.254 2.74-1.702 3.055.678 7.359-1.459 10.269-1.748 2.328-5.703 2.122-5.795 6.645-.034 2.849 1.484 6.147-.827 8.656-.655.703-2.679 1.879-3.46 3.238-1.701 2.946 1.724 6.608 1.505 10.185-.333 5.614-7.034 6.244-8.15 12.876-.667 3.978.874 6.427 3.806 7.626 1.264.51 3.045.525 4.424.441 1.425-1.25 2.577-2.781 1.633-6.721-.621-2.583-1.367-4.486.299-6.426 1.92-2.219 4.92-3.007 4.598-5.372-1.207-8.875 2.457-5.449 1.181-12.579-.595-3.354 2.189-2.96 4.111-4.617 1.563-1.35 2.137-4.807 3.247-6.667 1.854-3.106 1.164-6.375 5.359-8.412 3.886-1.867 8.934-.898 10.979-5.602 2.046-4.729-1.643-8.512-1.39-12.223z"
        />
        <g>
          <path
            fill="#915169"
            d="M48.045 38.176a.864.864 0 01-.799-.538l-.232-.571c-.205-.504-.275-.675-.306-.777-2.346-6.382 1.091-8.449 3.368-9.818.981-.591 1.829-1.1 2.055-1.744.376-.992.417-2.026.458-3.026.076-1.867.162-3.984 2.758-4.863.676-.227 1.327-.395 1.945-.555 2.425-.624 3.888-1.001 4.446-4.378.475-2.864 1.014-4.216 1.924-4.825.821-.551 1.71-.346 2.574-.146.988.229 2.108.485 3.63-.126.583-.234.804-.313.983-.378.157-.056.281-.101.639-.249a.86.86 0 11.664 1.589c-.403.169-.543.219-.722.284-.168.06-.375.134-.922.354-2.023.817-3.547.464-4.662.205-.634-.146-1.035-.229-1.226-.1-.294.196-.738.993-1.181 3.673-.741 4.485-3.159 5.108-5.719 5.767a25.08 25.08 0 00-1.823.519c-1.414.479-1.508 1.356-1.586 3.3-.044 1.083-.094 2.313-.562 3.546-.423 1.21-1.57 1.899-2.786 2.63-2.315 1.394-4.502 2.709-2.626 7.778a.813.813 0 01.038.134c.008 0 .101.227.235.556l.234.573a.864.864 0 01-.799 1.186z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar04: (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <path
        fill="#E0D1C1"
        d="M69.898.508c-6.922 1.645-23.609 9.587-24.613 20.261-.572 6.232.278 14.444 5.449 17.937l27.571 1.644 4.627-20.911c1.327-1.363 3.812-5.772 5.366-8.882C86.059 9.221 82.825-2.56 69.898.508z"
      />
      <path
        fill="#D4C0AC"
        d="M97.471 18.264c-3.066-7.54-6.035-5.839-9.173-7.708-1.556 3.11-4.039 7.519-5.366 8.882l-4.627 20.911 18.381 1.095c-.484-6.066 3.089-17.51.785-23.18z"
      />
      <path
        fill="#E0D1C1"
        d="M96.997 36.359a.876.876 0 01-.868-.755c-.583-4.099-1.596-9.67-3.111-12.929-2.008-4.343-4.334-5.779-7.211-6.6a.878.878 0 11.483-1.689c3.953 1.129 6.362 3.317 8.319 7.551 1.606 3.451 2.66 9.204 3.258 13.42a.879.879 0 01-.87 1.002z"
      />
      <path
        fill="#D4C0AC"
        d="M46.183 32.786a.878.878 0 01-.523-1.586c.493-.364.993-.728 1.448-1.058.496-.359.936-.679 1.251-.916 1.542-1.167 2.994-2.309 4.377-3.394 10.599-8.32 17.599-13.818 29.17-2.987a.881.881 0 01.041 1.242.88.88 0 01-1.242.041c-10.465-9.798-16.297-5.226-26.884 3.086a328.493 328.493 0 01-4.403 3.414c-.325.244-.773.569-1.276.935-.452.329-.948.689-1.438 1.051a.877.877 0 01-.521.172z"
      />
      <path
        fill="#D4C0AC"
        d="M45.292 21.719a.88.88 0 01-.558-1.556c2.673-2.198 5.721-4.126 8.41-5.827l1.197-.759c2.778-1.771 4.886-3.348 6.746-4.741 3.123-2.34 5.381-4.031 8.505-4.897 9.852-2.721 14.967 4.343 18.021 8.564l-.637.618.711-.517c.006.009.08.112.084.122a.878.878 0 11-1.457.979l-.145-.204C82.264 8.106 78.081 3.42 70.061 5.63c-2.805.779-4.951 2.386-7.921 4.612-1.883 1.41-4.019 3.01-6.853 4.816l-1.203.762c-2.646 1.674-5.644 3.571-8.232 5.699a.88.88 0 01-.56.2z"
      />
      <path
        fill="#D4C0AC"
        d="M45.232 27.446a.877.877 0 01-.554-1.56c2.872-2.33 5.88-4.283 9.364-6.544 2.356-1.53 5.028-3.264 8.044-5.37 10.531-7.336 14.698-5.9 22.676 2.468l.555.589a.88.88 0 01-.035 1.242.88.88 0 01-1.242-.037l-.553-.587c-7.524-7.893-10.711-8.982-20.396-2.235-3.04 2.123-5.725 3.865-8.093 5.402-3.441 2.235-6.414 4.165-9.212 6.435a.87.87 0 01-.554.197z"
      />
      <g>
        <path
          fill="#D4C0AC"
          d="M82.932 20.731a.88.88 0 01-.637-.272.881.881 0 01.029-1.242c1.709-1.631 3.287-5.008 4.438-7.476.272-.584.523-1.12.746-1.572a.88.88 0 111.576.778c-.221.442-.463.966-.73 1.538-1.211 2.593-2.869 6.144-4.816 8.004a.882.882 0 01-.606.242z"
        />
      </g>
      <g>
        <path
          fill="#CF8A5F"
          d="M85.256 58.879l-24.113.664c-.23 3.51.264 13.28-2.924 20.373-.213.473-.437.927-.67 1.368 5.875 13.423 23.758 14.64 31.023.063-3.183-6.996-3.904-16.524-3.316-22.468z"
        />
        <path
          fill="#86C0CF"
          d="M90.979 85.455c-.926-1.209-1.72-2.603-2.406-4.108-10.917 8.063-19.473 7.617-31.024-.063-6.994 13.191-23.215 12.764-33.528 20.822-4.87 5.426-7.247 23.116-8.878 37.282H128.75c-1.404-14.995-4.023-31.961-8.71-36.477-7.638-5.308-19.798-5.356-29.061-17.456z"
        />
        <path
          fill="#E0D1C1"
          d="M86.689 117.459a.877.877 0 01-.758-.433c0 .002.002.002 0 .002a466.103 466.103 0 01-3.67-4.828.878.878 0 111.414-1.042c.604.818 2.261 2.986 3.142 4.142.379.496.625.827.629.835a.879.879 0 01-.757 1.324zM82.577 117.431a.876.876 0 01-.802-.521c-.143-.313-1.269-2.015-1.939-3.029a67.134 67.134 0 01-1.127-1.731.878.878 0 011.515-.887c.139.236.574.893 1.074 1.648 1.139 1.72 1.898 2.877 2.079 3.283a.876.876 0 01-.442 1.158.865.865 0 01-.358.079zM78.943 117.41a.865.865 0 01-.694-.345c-.062-.08-.231-.34-.472-.707-.607-.934-2.225-3.41-2.869-3.972a.879.879 0 011.15-1.327c.768.666 2.049 2.59 3.189 4.34.201.308.344.528.398.604a.88.88 0 01-.702 1.407zM75.08 117.444a.872.872 0 01-.816-.561c-.086-.216-.285-.492-.769-1.158-.492-.68-1.257-1.736-2.481-3.539-.273-.4-.168-.947.231-1.221s.946-.168 1.221.232c1.212 1.781 1.968 2.826 2.452 3.496.575.795.814 1.125.979 1.551a.877.877 0 01-.817 1.2zM71.45 117.446a.885.885 0 01-.714-.363c-.318-.443-.698-.901-1.491-1.844-1.071-1.273-1.698-2.264-2-2.738-.075-.117-.126-.202-.163-.251-.281-.376-.23-.925.133-1.224a.863.863 0 011.197.076c.057.064.165.219.316.457.303.479.865 1.366 1.861 2.551.82.976 1.217 1.453 1.57 1.942a.879.879 0 01-.709 1.394zM67.298 117.45a.881.881 0 01-.807-.527c-.078-.143-.306-.484-.602-.936-.734-1.121-1.844-2.813-2.383-3.916a.877.877 0 01.404-1.174.875.875 0 011.174.402c.491 1.003 1.563 2.641 2.273 3.723.64.977.725 1.107.781 1.297a.878.878 0 01-.84 1.131zM63.75 117.468a.867.867 0 01-.677-.322c-.024-.031-.301-.42-.693-.976-.768-1.088-2.563-3.634-2.796-3.906-.354-.331-.35-.866-.017-1.22.33-.354.908-.352 1.26-.018.151.142.494.595 2.988 4.129.344.488.593.841.64.902a.884.884 0 01-.705 1.411zM59.955 117.45a.877.877 0 01-.76-.438c-.266-.4-3.162-4.422-3.429-4.736-.366-.317-.368-.838-.05-1.203.319-.366.912-.368 1.275-.049.028.023 3.663 4.881 3.793 5.265a.876.876 0 01-.829 1.161zM55.973 117.46a.88.88 0 01-.814-.548c-.089-.14-1.689-2.582-2.458-3.757-.382-.582-.654-1-.67-1.026a.877.877 0 01.3-1.205.881.881 0 011.2.289c.039.062.292.449.64.979 2.551 3.896 2.565 3.936 2.617 4.059a.88.88 0 01-.815 1.209zM52.284 117.364a.88.88 0 01-.85-.651c-.187-.274-.74-.96-1.155-1.476-1.617-2.002-2.174-2.758-2.285-3.284a.877.877 0 011.709-.406c.167.388 1.32 1.815 1.943 2.587 1.425 1.768 1.608 1.992 1.507 2.51a.91.91 0 01-.445.611.872.872 0 01-.424.109zM48.468 117.433a.864.864 0 01-.612-.254c-.303-.303-1.098-1.441-2.654-3.722a67.432 67.432 0 00-.844-1.222.878.878 0 111.393-1.07c.096.125.451.642.901 1.302.706 1.033 2.175 3.185 2.449 3.472a.886.886 0 01-.016 1.241.886.886 0 01-.617.253zM44.586 117.397a.875.875 0 01-.82-.563c-.141-.354-1.241-1.867-1.898-2.772-1.029-1.416-1.279-1.772-1.369-2.043a.879.879 0 011.646-.613c.115.209.685.992 1.145 1.625 1.149 1.582 1.918 2.656 2.117 3.176a.88.88 0 01-.505 1.135.943.943 0 01-.316.055zM40.839 117.325a.863.863 0 01-.665-.309c-.024-.027-.25-.344-.579-.806-.672-.949-2.458-3.468-2.74-3.771-.383-.295-.421-.817-.125-1.201.296-.385.882-.428 1.265-.129.194.148.43.412 3.033 4.084.272.385.465.658.51.717a.885.885 0 01-.15 1.221.867.867 0 01-.549.194zM36.924 117.448a.875.875 0 01-.797-.512c.017.053-.075-.084-.204-.266-.714-1.001-2.386-3.344-2.958-4.627a.88.88 0 011.606-.714c.499 1.12 2.157 3.446 2.782 4.319.226.317.355.524.368.553a.876.876 0 01-.43 1.164.84.84 0 01-.367.083zM33.172 117.372a.877.877 0 01-.782-.477c-.399-.776-1.212-1.869-1.931-2.834-.544-.732-1.016-1.367-1.303-1.848a.878.878 0 111.507-.9c.242.404.71 1.033 1.206 1.699.757 1.02 1.616 2.174 2.083 3.077a.88.88 0 01-.78 1.283zM29.315 117.549a.878.878 0 01-.826-.582c-.28-.575-2.626-4.378-2.989-4.79a.882.882 0 01.07-1.238.87.87 0 011.23.059c.301.328 3.279 4.945 3.38 5.523a.878.878 0 01-.865 1.028zM25.597 117.431a.875.875 0 01-.752-.424l-.15-.197c-.561-.748-2.266-3.027-3.199-4.67a.878.878 0 011.529-.867c.877 1.545 2.533 3.758 3.076 4.484.146.195.233.318.247.34a.879.879 0 01-.751 1.334zM21.683 117.45a.879.879 0 01-.868-.752c-.12-.432-1.408-2.243-2.026-3.114l-.104-.146a.879.879 0 111.432-1.019l.103.146c1.539 2.164 2.241 3.236 2.334 3.879a.879.879 0 01-.871 1.006z"
        />
        <g>
          <path
            fill="#E0D1C1"
            d="M16.975 126.292a.865.865 0 01-.532-.182.875.875 0 01-.165-1.229c.34-.444.669-.821.979-1.119a.88.88 0 011.217 1.266 8.19 8.19 0 00-.801.918.875.875 0 01-.698.346zM18.428 130.119a.876.876 0 01-.811-1.214c.426-1.027 1.089-2 1.928-3.23.359-.523.754-1.104 1.181-1.76a.88.88 0 011.216-.258.88.88 0 01.257 1.216c-.436.67-.837 1.259-1.202 1.793-.784 1.146-1.401 2.053-1.758 2.911a.877.877 0 01-.811.542zM22.177 130.039a.88.88 0 01-.739-1.353l.652-1.019c2.099-3.278 2.271-3.546 2.683-3.879a.875.875 0 011.234.132.876.876 0 01-.132 1.234c-.19.154-.638.854-2.306 3.459l-.652 1.019a.872.872 0 01-.74.407zM26.123 130.086a.879.879 0 01-.843-.632c-.147-.506.062-.827.841-2.022.5-.769 1.257-1.929 2.107-3.438a.879.879 0 011.531.864 62.48 62.48 0 01-2.167 3.531c-.25.387-.509.781-.602.956a.882.882 0 01-.867.741zm.841-.685zm.003-.436zm-.001-.005l.001.003-.001-.003zM29.8 130.146a.872.872 0 01-.578-.218.874.874 0 01-.083-1.237c.389-.445 2.595-3.941 3.01-4.73.227-.432.756-.598 1.186-.37s.595.758.37 1.187c-.41.776-2.694 4.439-3.244 5.068a.879.879 0 01-.661.3zM33.576 130.087a.866.866 0 01-.47-.139.877.877 0 01-.27-1.211c.112-.178.453-.681.878-1.309.792-1.165 1.875-2.762 2.3-3.461a.875.875 0 011.207-.294.88.88 0 01.294 1.207c-.447.735-1.545 2.354-2.347 3.535a84.702 84.702 0 00-.85 1.263.878.878 0 01-.742.409zM37.237 130.065a.876.876 0 01-.698-1.41l.164-.238c1.88-2.744 2.934-4.167 3.415-4.613a.88.88 0 011.194 1.288c-.206.19-.891 1.007-3.16 4.317l-.215.311a.88.88 0 01-.7.345zM40.499 129.556c-.5-.951 3.098-5.613 3.136-5.656a.88.88 0 011.359 1.113c-.255.364-2.707 4.08-2.916 4.488l-.751-.386-.049.033-.779.408zM45.002 130.094a.879.879 0 01-.878-.879c0-.36 0-.408 2.473-4.024.402-.586.72-1.051.805-1.188a.878.878 0 011.047-.418.877.877 0 01.563 1.106c-.05.153-.05.153-.964 1.489-.653.956-1.993 2.916-2.216 3.325a.88.88 0 01-.83.589zM48.986 130.017a.88.88 0 01-.878-.879c0-.521 2.963-5.126 2.993-5.166a.878.878 0 011.418 1.034c-.209.313-2.574 4.229-2.761 4.548a.877.877 0 01-.772.463zM52.789 129.94a.875.875 0 01-.784-1.269c.083-.165 2.421-3.926 2.888-4.598a.878.878 0 111.444.998c-.49.709-2.586 4.105-2.795 4.449a.887.887 0 01-.753.42zM56.53 130.108a.938.938 0 01-.369-.076c-.446-.19-.636-.741-.445-1.188.111-.259 3.06-4.909 3.081-4.938a.88.88 0 011.409 1.05c-.214.317-2.771 4.405-2.91 4.649a.816.816 0 01-.766.503zM60.441 130.044a.88.88 0 01-.794-1.25c.229-.492 1.316-2.32 2.454-4.221.174-.291.293-.489.318-.533a.885.885 0 011.188-.338c.42.229.58.752.355 1.176-.012.023-.147.252-.354.598-.586.979-2.146 3.584-2.37 4.063a.879.879 0 01-.797.505zM64.27 130.037a.879.879 0 01-.875-.968c.022-.213.038-.369 2.823-5.047a.88.88 0 011.511.899c-.651 1.092-2.413 4.084-2.632 4.533a.88.88 0 01-.827.583zM68.014 129.993a.877.877 0 01-.554-1.56c.086-.123.72-1.219 1.183-2.018 1.071-1.852 1.373-2.346 1.619-2.559a.875.875 0 011.238.084.874.874 0 01-.04 1.197c-.187.234-.854 1.389-1.298 2.156-1.133 1.958-1.355 2.309-1.594 2.501a.863.863 0 01-.554.199zM71.619 130.106c-.032 0-.064-.002-.096-.004-.483-.05-.83-.513-.78-.994.083-.822 1.295-2.219 1.433-2.375.744-.828 1.342-1.816 1.663-2.351.204-.336.28-.462.399-.577a.88.88 0 011.281 1.198c-.039.06-.1.159-.178.288-.352.581-1.006 1.664-1.854 2.609-.375.424-.934 1.205-1.008 1.444-.043.452-.418.762-.86.762zM75.629 130.123c-.068 0-.141-.007-.21-.022-.476-.104-.76-.623-.657-1.097.051-.229.09-.411 2.668-4.563l.271-.438a.878.878 0 011.528.867c-.012.021-.127.208-.307.497-1.521 2.451-2.355 3.837-2.475 4.115-.09.402-.426.641-.818.641zM79.425 130.098a.877.877 0 01-.815-.552c-.351-.877 3.016-5.732 3.055-5.77a.874.874 0 011.24.033c.308.322.32.816.049 1.152-.303.438-2.419 3.971-2.688 4.52a.886.886 0 01-.841.617zM83.131 130.054a.86.86 0 01-.556-.199.872.872 0 01-.124-1.234c1.128-1.379 1.683-2.364 2.271-3.407.223-.396.445-.791.7-1.211a.878.878 0 111.5.913c-.243.4-.457.781-.671 1.158-.6 1.063-1.217 2.164-2.441 3.658a.88.88 0 01-.679.322z"
          />
        </g>
        <g>
          <path
            fill="#E0D1C1"
            d="M124.594 117.433a.862.862 0 01-.611-.254c-.303-.303-1.099-1.441-2.654-3.722-.424-.619-.756-1.104-.844-1.222a.879.879 0 011.392-1.07c.096.125.45.642.9 1.302.705 1.033 2.176 3.185 2.449 3.472a.885.885 0 01-.017 1.241.88.88 0 01-.615.253zM120.712 117.397a.872.872 0 01-.819-.563c-.141-.354-1.24-1.867-1.898-2.772-1.029-1.416-1.278-1.772-1.368-2.043a.88.88 0 011.646-.613c.115.209.686.992 1.146 1.625 1.149 1.582 1.918 2.656 2.117 3.176a.88.88 0 01-.507 1.135.957.957 0 01-.317.055zM116.966 117.325a.862.862 0 01-.665-.309c-.023-.027-.25-.344-.578-.806-.673-.949-2.457-3.468-2.74-3.771-.383-.295-.422-.817-.125-1.201.297-.385.884-.428 1.266-.129.193.148.43.412 3.033 4.084.271.385.466.658.51.717a.886.886 0 01-.148 1.221.89.89 0 01-.553.194zM113.051 117.448a.877.877 0 01-.798-.512c.019.053-.073-.084-.203-.266-.714-1.001-2.386-3.344-2.958-4.627a.882.882 0 01.446-1.16.882.882 0 011.16.446c.497 1.12 2.155 3.446 2.78 4.319.228.317.355.524.369.553a.876.876 0 01-.431 1.164.831.831 0 01-.365.083zM109.298 117.372a.877.877 0 01-.782-.477c-.398-.776-1.211-1.869-1.931-2.834-.544-.732-1.017-1.367-1.303-1.848a.878.878 0 111.508-.9c.241.404.71 1.033 1.205 1.699.757 1.02 1.616 2.174 2.083 3.077a.88.88 0 01-.78 1.283zM105.441 117.549a.88.88 0 01-.826-.582c-.28-.575-2.627-4.378-2.988-4.79a.885.885 0 01.068-1.238.872.872 0 011.232.059c.301.328 3.277 4.945 3.379 5.523a.877.877 0 01-.865 1.028zM101.723 117.431a.876.876 0 01-.752-.424l-.15-.197c-.561-.748-2.266-3.027-3.197-4.67a.878.878 0 011.527-.867c.877 1.545 2.533 3.758 3.076 4.484.146.195.233.318.248.34a.882.882 0 01-.752 1.334zM97.811 117.452a.876.876 0 01-.869-.754c-.123-.441-1.446-2.295-2.082-3.188-.868-1.217-.981-1.387-1.035-1.654a.877.877 0 011.676-.5c.1.168.465.68.788 1.133 1.578 2.211 2.298 3.309 2.392 3.959a.879.879 0 01-.87 1.004zM94.17 117.379a.874.874 0 01-.701-.349c-.033-.045-3.445-4.662-3.557-4.912a.876.876 0 011.552-.812c.252.373 3.225 4.426 3.405 4.666a.877.877 0 01-.175 1.229.866.866 0 01-.524.178zM90.256 117.371a.876.876 0 01-.759-.437c-.136-.209-2.917-4.299-3.159-4.611-.35-.338-.324-.856.014-1.205.336-.348.926-.322 1.274.016.218.212 3.365 4.878 3.388 4.916a.878.878 0 01-.758 1.321z"
          />
        </g>
        <g>
          <path
            fill="#E0D1C1"
            d="M86.975 130.166c-.017 0-.031 0-.047-.002a.878.878 0 01-.832-.923c.021-.396.232-.687.586-1.17.465-.635 1.328-1.813 2.478-4.117a.879.879 0 111.572.783c-1.215 2.437-2.135 3.694-2.631 4.373-.121.168-.217.289-.271.381a.886.886 0 01-.855.675zm.875-.833zM90.535 130.108a.877.877 0 01-.772-1.295c.019-.033 2.111-3.615 3.625-5.049a.873.873 0 011.24.033.876.876 0 01-.033 1.24c-1.199 1.139-3.054 4.197-3.291 4.619a.882.882 0 01-.769.452zM94.555 130.119a.876.876 0 01-.812-1.214c.426-1.027 1.089-2 1.929-3.23.357-.523.754-1.104 1.18-1.76a.882.882 0 011.217-.258.881.881 0 01.258 1.216c-.436.67-.838 1.259-1.202 1.793-.783 1.146-1.401 2.053-1.758 2.911a.88.88 0 01-.812.542zM98.305 130.039a.881.881 0 01-.741-1.353l.651-1.019c2.099-3.278 2.271-3.546 2.683-3.879a.875.875 0 011.234.132.875.875 0 01-.132 1.234c-.188.154-.638.854-2.306 3.459l-.651 1.019a.872.872 0 01-.738.407zM102.249 130.086a.88.88 0 01-.843-.632c-.147-.506.062-.827.841-2.022.5-.769 1.257-1.929 2.106-3.438a.88.88 0 011.197-.333.877.877 0 01.333 1.197 61.315 61.315 0 01-2.167 3.531c-.251.387-.509.781-.602.956a.882.882 0 01-.865.741zm.841-.685zm.003-.436zm-.001-.005l.001.003-.001-.003zM105.926 130.146a.869.869 0 01-.576-.218.875.875 0 01-.084-1.237c.389-.445 2.596-3.941 3.01-4.73a.878.878 0 111.557.817c-.409.776-2.693 4.439-3.244 5.068a.888.888 0 01-.663.3zM109.701 130.087a.88.88 0 01-.741-1.35c.111-.178.452-.681.878-1.309.792-1.165 1.875-2.762 2.3-3.461a.88.88 0 011.502.913c-.447.735-1.545 2.354-2.348 3.535-.412.606-.74 1.092-.85 1.263a.872.872 0 01-.741.409zM113.361 130.065a.876.876 0 01-.696-1.41l.163-.238c1.881-2.744 2.934-4.167 3.416-4.613a.878.878 0 011.193 1.288c-.207.19-.892 1.007-3.16 4.317-.125.181-.201.293-.215.311a.876.876 0 01-.701.345zM116.625 129.556c-.5-.951 3.098-5.613 3.137-5.656a.879.879 0 011.357 1.113c-.256.364-2.707 4.08-2.916 4.488l-.752-.386-.049.033-.777.408zM121.129 130.094a.88.88 0 01-.879-.879c0-.36 0-.408 2.473-4.024.401-.586.721-1.051.807-1.188a.876.876 0 011.046-.418.877.877 0 01.563 1.106c-.052.153-.052.153-.966 1.489-.651.956-1.991 2.916-2.215 3.325a.879.879 0 01-.829.589zM125.109 130.017a.88.88 0 01-.879-.878c0-.298 0-.298 2.158-3.8a.88.88 0 011.495.922 337.375 337.375 0 00-1.997 3.287.875.875 0 01-.777.469z"
          />
        </g>
        <g>
          <path
            fill="#64AAC7"
            d="M56.472 90.442a.88.88 0 01-.787-1.268c1.344-2.719 2.386-4.966 3.186-6.872a.877.877 0 111.619.678c-.814 1.94-1.871 4.221-3.23 6.971a.874.874 0 01-.788.491zM60.396 93.3a.88.88 0 01-.847-1.113c.88-3.162 1.665-5.809 2.4-8.091a.877.877 0 111.671.537c-.728 2.263-1.506 4.886-2.379 8.024a.876.876 0 01-.845.643zM64.719 95.584a.88.88 0 01-.865-1.037c.58-3.147 1.33-6.506 1.857-8.767a.876.876 0 011.055-.655.876.876 0 01.656 1.055c-.523 2.242-1.267 5.569-1.841 8.685a.877.877 0 01-.862.719zM69.918 97.166a.88.88 0 01-.877-.945c.21-2.769.561-5.894 1.037-9.284a.889.889 0 01.992-.748c.48.067.816.512.748.991-.473 3.356-.817 6.443-1.024 9.175a.88.88 0 01-.876.811zM75.093 97.506a.878.878 0 01-.876-.827c-.191-3.24-.271-6.961-.316-9.476a.88.88 0 01.861-.896h.018c.478 0 .869.383.878.862.044 2.5.125 6.194.313 9.405a.881.881 0 01-.824.929c-.019.003-.036.003-.054.003zM79.543 96.802a.876.876 0 01-.855-.684c-.881-3.898-1.313-7.538-1.492-9.36a.877.877 0 01.787-.959.87.87 0 01.961.788c.175 1.781.597 5.337 1.457 9.143a.877.877 0 01-.858 1.072zM84.709 94.8a.88.88 0 01-.843-.629 121.046 121.046 0 01-2.253-8.909.876.876 0 01.676-1.042.875.875 0 011.042.678c.44 2.066 1.185 5.268 2.222 8.774a.88.88 0 01-.844 1.128zM89.453 91.755a.878.878 0 01-.79-.493 407.05 407.05 0 01-3.627-7.665.877.877 0 111.595-.736 423.297 423.297 0 003.61 7.631.88.88 0 01-.403 1.176.882.882 0 01-.385.087z"
          />
        </g>
        <g>
          <path
            fill="#64AAC7"
            d="M112.79 140.265a.88.88 0 01-.879-.869c-.095-9.387-.015-19.882 2.128-25.625.521-1.389 1.167-2.757 1.791-4.08 1.178-2.498 2.29-4.856 2.66-7.35a.888.888 0 01.998-.738c.479.07.812.518.74.998-.408 2.747-1.629 5.336-2.81 7.84-.608 1.291-1.239 2.627-1.735 3.946-1.938 5.199-2.115 15.084-2.017 24.99a.879.879 0 01-.869.888h-.007zM30.397 140.265h-.019a.88.88 0 01-.86-.896c.037-1.731.097-3.644.16-5.601.191-5.983.406-12.767-.077-15.572-.538-3.135-1.951-6.174-3.318-9.114-1.043-2.244-2.122-4.563-2.821-6.937a.879.879 0 111.686-.496c.661 2.246 1.665 4.405 2.728 6.691 1.416 3.045 2.879 6.191 3.457 9.559.514 2.98.303 9.563.101 15.926-.062 1.951-.123 3.854-.159 5.58a.878.878 0 01-.878.86z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#CF8A5F"
          d="M49.329 35.777c-2.889.723-.544 12.263 3.082 12.272 1.247.003 1.723-.854 2.407-1.524l-1.488-7.794c-.107-.118-1.909-3.461-4.001-2.954zM93.033 40.814l-.977 7.401c4.438 6.042 8.92-8.653 6.309-11.77-1.049-1.253-3.476-1.463-5.332 4.369z"
        />
        <path
          fill="#C77F54"
          d="M54.085 43.569a.878.878 0 01-.861-.714c-.328-1.715-1.122-2.504-3.144-3.128a.878.878 0 01-.581-1.098.885.885 0 011.098-.581c1.929.595 3.792 1.548 4.352 4.478a.876.876 0 01-.864 1.043zM94.014 44.639a.88.88 0 01-.877-.827c-.117-2.019 1.682-5.564 3.959-5.799.5-.051.916.301.965.784a.88.88 0 01-.783.964c-1.098.113-2.465 2.616-2.385 3.948a.881.881 0 01-.826.929l-.053.001z"
        />
        <path
          fill="#D99467"
          d="M83.051 18.405c-.223.257-.423.48-.599.655-4.456 4.648-8.101 5.658-11.007 6.926a.485.485 0 01-.633-.653c.226-.483.393-.936.516-1.318.137-.43-.35-.792-.734-.557-3.65 2.238-4.82 4.181-10.948 6.528a.492.492 0 01-.625-.665c.449-.969.719-1.63.898-2.114.171-.464-.371-.86-.76-.553-1.256.993-3.236 2.502-5.302 3.837-1.05.679-1.72 1.816-1.749 3.067-.089 3.946.1 8.679 1.172 13 6.64 26.738 29.255 30.333 38.917 6.172 1.71-4.333 2.412-8.69 2.705-12.777-.17-2.85-.901-5.669-1.604-8.784-1.675-7.424-3.877-11.944-10.247-12.764z"
        />
        <path
          fill="#C77F54"
          d="M73.969 48.774c-.367 0-.758-.095-1.166-.285-1.451-.675-3.005-2.572-3.306-3.473a.875.875 0 01.663-1.138c.477-.096 1.025-.004 1.525.113.487-4.709-.488-7.191-.824-8.042a4.321 4.321 0 01-.125-.349.878.878 0 111.693-.471c.012.036.037.096.069.177.397 1.012 1.608 4.092.812 9.883a.881.881 0 01-1.033.744c.389.393.834.762 1.269.963.263.123.435.133.509.106.432-.17.688-.531 1.277-1.401.141-.206.292-.43.463-.672a.88.88 0 011.438 1.009c-.164.234-.312.451-.445.648-.657.971-1.133 1.673-2.084 2.05a1.999 1.999 0 01-.735.138z"
        />
        <path
          fill="#451C2B"
          d="M83.253 37.471a1.17 1.17 0 01-1.164-1.304l.021-.186c.078-.674.115-.989.141-1.553.027-.647.637-1.138 1.223-1.119a1.17 1.17 0 011.117 1.222c-.027.624-.066.973-.152 1.718l-.021.184a1.175 1.175 0 01-1.165 1.038zM63.753 37.521a1.17 1.17 0 01-1.142-.916 43.29 43.29 0 01-.353-2.042 1.17 1.17 0 011.028-1.298 1.16 1.16 0 011.297 1.021c.022.155.23 1.434.313 1.808a1.168 1.168 0 01-.888 1.397c-.085.021-.171.03-.255.03z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#75374D"
            d="M85.999 30.463a.901.901 0 01-.347-.071c-1.318-.565-2.396-.798-4.316-.431a.874.874 0 01-1.027-.697.877.877 0 01.696-1.028c2.341-.451 3.777-.127 5.341.541a.879.879 0 01-.347 1.686z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#B85C83"
            d="M82.938 47.425c-.139 1.626 1.938 2.76 3.403 1.724 3.632-2.567-2.978-6.78-3.403-1.724zM62.939 45.611c-1.478-.948-4.142-.325-3.397 2.259 1.083 3.753 6.445-.299 3.397-2.259z"
          />
        </g>
        <g>
          <path
            fill="#FFF"
            d="M80.316 52.545c-.735-.151-1.569-.792-3.133.32-5.732 4.067-7.229-2.558-10.862-.192-.46.297-.335.846.032 1 .335.216 2.666 2.238 2.805 2.337 4.396 3.199 6.174 2.243 9.383-.675 2.079-1.889 2.351-1.837 2.226-2.353a.585.585 0 00-.451-.437z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#D4C0AC"
          d="M94.822 41.525c-1.596-.32-.545 5.619-7.055 14.807a1.417 1.417 0 01-1.029.598c-.586.047-1.271.016-1.489.026-.429.021-.873-.173-1.063-.555-2.879-5.707-2.209-6.292-11.968-6.171-6.859.086-7.671.143-11.037 6.176a1.844 1.844 0 01-1.693.952c-.071-.003-.146-.007-.226-.009a1.72 1.72 0 01-1.348-.734c-2.393-3.437-4.431-10.156-5.126-14.027-.122-.675-1.11-.621-1.16.062-.105 1.47.266 10.474 2.715 16.572.944 2.328 1.883 3.17 4.149 5.04 5.005 4.128 5.858 4.931 10.668 4.847 12.436-.211 11.922.387 14.917-2.199 8.272-7.152 8.747-4.48 10.133-16.272 1.065-9.05 1.405-8.961.612-9.113z"
        />
        <path
          id="smile"
          fill="#FFF"
          d="M79.002 52.652c-2.046-.532-3.784.985-5.927.956-2.462-.046-3.724-1.845-6.149-.174a.586.586 0 00-.05.925c4.875 4.215 8.704 4.538 13.067-.224.373-.407.317-1.154-.941-1.483z"
        />
      </g>
    </svg>
  ),
  avatar05: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#DE9E3E"
        d="M111.088 70.847c-.237-1.979-4.208-3.157-3.739-5.666.237-1.256 2.741-3.482 1.257-5.644-2.543-3.743-6.705-3.451-5.455-8.051.602-2.216 1.889-3.393 1.425-5.355-.593-2.458-4.095-2.744-4.477-5.206-.217-1.484.453-2.745 1.033-4.346 1.69-4.636-3.159-5.154-5.152-7.252-.687-.723-1.156-1.659-1.631-2.325L48.99 28.697c-1.269 1.346-4.001 1.583-5.021 3.963-.993 2.321.351 3.669-.662 5.633-1.058 2.04-2.677 2.357-3.526 3.842-.907 1.574-.034 2.883.585 4.935 1.318 4.406-3.681 4.717-5.164 7.2-1.504 2.551 1.462 6.089-.415 8.153-.769.85-6.578 2.374-4.583 6.048.904 1.667 2.408 1.83 2.838 3.557.596 2.512-1.633 3.609-2.441 5.235-1.274 2.563 1.368 7.085 6.252 7.84 3.356.531 4.645-1.945 7.53-.77 2.267.934 2.716 2.831 4.784 3.569 4.372 1.553 5.355-3.944 10.569-1.749 1.209.51 3.096 2.75 4.414 3.573 3.966 2.431 7.768-1.22 10.578-2.888 2.901-1.772 7.718-1.606 9.726-.139 7.374 5.339 9.526-1.021 13.662-1.501 3.529-.398 4.822 1.973 7.469 1.808 6.944-.438 6.673-4.023 6.8-5.492.149-1.718-3.132-2.941-3.65-4.125-1.175-2.738 2.654-4.031 2.353-6.542z"
      />
      <path
        fill="#E0AF43"
        d="M101.657 86.69a.869.869 0 01-.732-1.33c.298-.47.364-.896.225-1.471-.278-1.144-1.352-1.43-3.083-1.767-1.21-.234-2.461-.479-3.221-1.358-1.721-1.987-.063-3.669 1.034-4.782 1.495-1.516 2.055-2.321 1.153-3.677-.51-.769-1.519-1.135-2.494-1.488-.983-.356-2.001-.726-2.539-1.562-1.448-2.243.188-3.925 1.502-5.277 1.505-1.547 2.805-2.882 1.536-5.247-.703-1.333-1.946-1.898-3.15-2.444-.641-.292-1.243-.565-1.749-.948-2.588-1.98-2.851-6.646-1.767-8.826a.866.866 0 111.552.772c-.774 1.558-.504 5.323 1.265 6.677.347.263.867.498 1.416.748 1.331.604 2.986 1.357 3.964 3.21 1.864 3.477-.268 5.669-1.824 7.268-1.444 1.484-1.929 2.139-1.287 3.13.223.347.96.614 1.673.872 1.125.407 2.522.916 3.346 2.158 1.778 2.669-.111 4.586-1.362 5.853-1.387 1.407-1.53 1.77-.957 2.434.367.426 1.32.611 2.24.789 1.636.316 3.875.752 4.438 3.06.247 1.026.102 1.943-.445 2.806a.868.868 0 01-.734.4z"
      />
      <path
        fill="#E0AF43"
        d="M91.469 89.429a.87.87 0 01-.78-1.243 1.75 1.75 0 00.163-.578c.139-1.143-.583-1.743-1.871-2.711-.829-.623-1.769-1.33-2.352-2.35-1.305-2.291.154-3.896 1.325-5.188.872-.96 1.695-1.866 1.68-3.039-.02-1.222-.834-1.75-2.175-2.476-.972-.525-2.071-1.122-2.299-2.313-.192-1.012.288-2.138 1.558-3.647 2.373-2.815 1.844-3.351.092-5.119-.833-.841-1.869-1.889-2.754-3.42a.868.868 0 011.501-.867c.772 1.339 1.682 2.258 2.483 3.067 2.112 2.132 3.166 3.699.003 7.454-1.135 1.35-1.227 1.963-1.181 2.209.073.382.728.736 1.422 1.112 1.285.694 3.046 1.648 3.082 3.973.025 1.857-1.119 3.118-2.128 4.23-1.296 1.426-1.728 2.068-1.104 3.163.405.709 1.126 1.252 1.889 1.823 1.319.992 2.814 2.115 2.55 4.288a3.44 3.44 0 01-.319 1.136.874.874 0 01-.785.496zM41.907 84.992a.855.855 0 01-.448-.126c-.251-.153-.515-.297-.771-.437-.746-.406-1.45-.791-1.888-1.353-.438-.569-.609-1.166-.516-1.783.203-1.337 1.595-2.32 3.068-3.361 2.008-1.42 3.28-2.438 2.69-3.619-.484-.967-1.669-1.503-2.925-2.069-1.876-.847-4.21-1.9-4.178-4.876.036-2.461 1.931-3.838 3.604-5.053 1.618-1.174 2.603-1.956 2.455-3.148-.063-.479-.41-1.23-.745-1.957-.533-1.152-1.083-2.342-1.075-3.458.016-2.289 2.591-5.021 4.431-5.973 3.429-1.8 3.447-5.367 3.458-7.726.003-.61.006-1.092.071-1.477a.853.853 0 01.998-.71c.472.08.79.526.71.998-.041.247-.043.688-.046 1.199-.011 2.434-.035 6.967-4.39 9.253-1.538.794-3.49 3.047-3.499 4.448-.004.728.484 1.785.915 2.719.409.881.793 1.717.892 2.464.282 2.273-1.544 3.6-3.156 4.77-1.473 1.07-2.866 2.081-2.889 3.671-.02 1.752 1.188 2.386 3.159 3.276 1.407.635 3.002 1.355 3.762 2.874 1.299 2.599-1.325 4.453-3.24 5.809-1.008.713-2.263 1.601-2.355 2.207-.008.054-.03.198.17.462.214.272.792.589 1.351.893.279.153.565.311.838.476a.866.866 0 01-.451 1.607z"
      />
      <path
        fill="#E0AF43"
        d="M55.525 86.898a.873.873 0 01-.49-.152c-.498-.343-1.137-.617-1.754-.881-.876-.376-1.703-.729-2.284-1.312-.65-.66-.981-1.601-.908-2.587.094-1.263.807-2.453 2.007-3.352.286-.216.653-.423 1.043-.643 1.545-.873 2.719-1.652 2.608-3.054-.105-1.31-1.086-1.907-2.691-2.733-1.411-.726-3.01-1.549-3.164-3.419-.201-2.449 1.471-3.703 2.578-4.531.392-.293.836-.626.926-.828.337-.739-.28-1.881-.855-2.423-.316-.291-.718-.569-1.142-.864-1.504-1.042-3.562-2.472-3.145-6.024.405-3.578 2.177-4.954 3.602-6.058 1.043-.809 1.868-1.447 2.165-2.814.302-1.375-.089-2.029-.236-2.275a1.632 1.632 0 01-.161-.38.866.866 0 01.686-1.015.863.863 0 01.955.494c.253.425.888 1.542.448 3.546-.431 1.981-1.633 2.912-2.796 3.813-1.347 1.045-2.619 2.032-2.942 4.887-.297 2.523.959 3.394 2.412 4.403.454.314.924.641 1.334 1.019.922.868 2.006 2.75 1.253 4.403-.271.609-.853 1.042-1.466 1.502-1.214.911-2.003 1.61-1.89 3.001.072.869.894 1.334 2.231 2.023 1.531.787 3.436 1.768 3.626 4.135.205 2.616-2.104 3.92-3.484 4.7-.335.19-.637.355-.855.52-.795.596-1.262 1.339-1.318 2.094-.036.486.113.938.408 1.237.342.342 1.02.633 1.738.941.694.296 1.413.606 2.053 1.044a.866.866 0 01.223 1.205.861.861 0 01-.715.378zM106.095 87.775a.87.87 0 01-.782-.489c-.244-.509-.357-1.026-.325-1.497.06-1.094.656-1.949 1.185-2.704.397-.571.773-1.11.788-1.596.03-1.2-.681-1.557-2.043-2.133-1.079-.456-2.302-.973-2.751-2.299-.676-1.999.744-3.663 1.886-4.999.764-.894 1.553-1.819 1.396-2.462-.089-.366-.596-1.123-2.98-2.086-3.683-1.496-2.755-4.185-2.078-6.149.804-2.326 1.172-3.828-1.248-5.302-.381-.23-.916-.463-1.433-.687-.913-.399-1.775-.774-2.317-1.308-1.565-1.521-.457-3.591.353-5.102.339-.632.658-1.228.764-1.684.287-1.218-.446-1.965-1.668-3.082-1.132-1.034-2.414-2.207-2.06-4.057a.857.857 0 011.015-.688c.47.091.777.543.687 1.014-.163.855.475 1.489 1.528 2.452 1.211 1.107 2.719 2.487 2.186 4.755-.159.677-.529 1.371-.924 2.105-.786 1.469-1.258 2.474-.669 3.047.316.313 1.104.653 1.799.956.567.249 1.155.503 1.638.794 3.74 2.278 2.728 5.209 1.989 7.35-.761 2.206-.986 3.135 1.089 3.978 2.431.981 3.706 2.023 4.015 3.28.368 1.505-.715 2.772-1.762 4.001-1.161 1.358-1.896 2.324-1.563 3.317.187.549.8.841 1.785 1.257 1.334.564 3.162 1.336 3.102 3.777-.031 1.005-.601 1.82-1.102 2.54-.434.62-.842 1.207-.876 1.818-.012.179.045.402.158.637a.87.87 0 01-.782 1.246z"
      />
      <g>
        <path
          fill="#E0AF43"
          d="M93.759 22.28c-2.655-3.513 2.333-5.818-.63-9.146-2.099-2.354-3.029-1.336-5.194-2.354-3.817-1.776-.277-5.013-2.454-7.034-1.802-1.724-3.77-.612-5.386-.066-3.518 1.195-6.187-1.955-7.958-2.669-2.277-.918-5.501-.1-7.482 1.667-1.43 1.285-1.653 3.513-3.3 4.349-2.107 1.077-4.804-1.101-7.557.935-3.628 2.67-1.381 6.605-1.397 7.855-.046 3.86-6.048.536-6.443 4.811-.25 2.703 2.434 3.293 2.644 4.773.243 1.743-2.832 2.877-2.406 5.684.473 3.176 3.221 3.202 3.928 3.604l44.574.799c-.094-4.388 4.327-5.216 2.627-9.403-.854-2.111-2.386-2.228-3.566-3.805z"
        />
        <path
          fill="#EDBE5F"
          d="M95.083 34.14c-.024 0-.049 0-.074-.003a.865.865 0 01-.79-.935c.206-2.495-.678-3.287-2.142-4.602a35.472 35.472 0 01-.8-.735 1.408 1.408 0 01-.232-.254c-1.896-1.966-1.192-4.484-.627-6.505.632-2.258.773-3.248-.396-3.946-.718-.429-1.85-.466-2.76-.496a15.059 15.059 0 01-.867-.042c-2.896-.25-3.896-1.483-4.781-2.574-.823-1.017-1.535-1.896-3.979-2.224-1.89-.25-2.453.479-3.392 1.686-.558.72-1.191 1.535-2.201 2.191-3.063 1.965-5.713 1.257-7.841.687-1.674-.449-2.66-.668-3.466.003-.702.594-1.104 1.265-1.529 1.975-.702 1.171-1.496 2.497-3.67 2.997-.331.077-.741.127-1.185.177-1.12.126-2.389.27-2.99 1.086-.121.164-.29.532-.47.919-.358.774-.849 1.836-1.612 2.767a.867.867 0 01-1.34-1.098c.624-.76 1.043-1.667 1.379-2.395.237-.512.424-.917.65-1.222 1.048-1.423 2.862-1.629 4.188-1.779.37-.042.711-.077.989-.144 1.458-.334 1.926-1.117 2.574-2.198.458-.764.976-1.629 1.903-2.413 1.544-1.282 3.315-.808 5.027-.35 1.985.532 4.04 1.08 6.454-.469.761-.493 1.275-1.155 1.772-1.797.991-1.273 2.116-2.719 4.986-2.341 3.13.419 4.222 1.768 5.101 2.852.793.979 1.419 1.752 3.582 1.938.23.019.494.028.775.037 1.108.037 2.489.082 3.593.74 2.42 1.449 1.73 3.917 1.175 5.899-.515 1.844-1.001 3.586.275 4.917.008.008.075.09.082.099.289.272.546.501.792.724 1.536 1.38 2.987 2.682 2.708 6.035a.866.866 0 01-.861.793z"
        />
        <path
          fill="#EDBE5F"
          d="M52.384 16.809a.865.865 0 01-.401-1.634c1.275-.664 1.656-1.648 2.059-2.69.929-2.402 2.047-3.966 7.937-2.188 2.116.629 2.709-.318 3.658-2.19.488-.965.992-1.961 1.892-2.546 1.816-1.191 3.602-.449 5.329.27 1.086.453 2.208.919 3.441.994.591.031 1.084-.143 1.642-.349 1.073-.398 2.407-.894 4.54.375.977.582 1.585 1.489 2.121 2.291 1.074 1.604 1.851 2.768 5.288 1.441a.867.867 0 01.623 1.617c-4.729 1.819-6.183-.351-7.352-2.095-.478-.711-.927-1.384-1.567-1.765-1.421-.843-2.103-.59-3.052-.24-.646.239-1.393.504-2.349.455-1.523-.093-2.84-.64-4.002-1.125-1.702-.707-2.713-1.074-3.715-.419-.511.333-.891 1.084-1.293 1.879-.835 1.647-2.098 4.145-5.701 3.067-4.816-1.453-5.174-.525-5.823 1.153-.454 1.174-1.019 2.636-2.874 3.601a.87.87 0 01-.401.098z"
        />
        <g>
          <path
            fill="#DE9E3E"
            d="M79.585 36.087a.87.87 0 01-.81-.557c-1.969-5.141-1.818-10.897.446-17.113a1.1 1.1 0 01.07-.147c.712-1.195.48-2.663-.673-4.243-2.582-3.547-1.351-5.243-.359-6.604.304-.419.59-.813.762-1.248.227-.573.225-1.394-.004-2.193a.868.868 0 01.595-1.072.865.865 0 011.072.596c.335 1.172.316 2.376-.051 3.306-.253.64-.636 1.165-.973 1.63-.891 1.228-1.48 2.038.36 4.565 2.07 2.839 1.418 5 .803 6.077-2.093 5.783-2.238 11.108-.43 15.827a.866.866 0 01-.808 1.176z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#F6E6D8"
          d="M34.663 102.09c-9.178 15.195-14.842 26.351-18.913 37.757h24.32a109.657 109.657 0 012-4.102l-7.407-33.655z"
        />
        <path
          fill="#F0C390"
          d="M82.369 58.146l-20.118 1.261c-.172 15.739-1.664 23.963-6.068 29.591l15.085 26.747 16.274-26.746c-3.69-6.311-5.33-15.667-5.173-30.853z"
        />
        <path
          fill="#F6E6D8"
          d="M100.397 136.907c.177.962.397 1.93.648 2.939h23.614c-5.375-25.103-10.529-33.059-11.479-35.466l-12.783 32.527z"
        />
        <path
          fill="#F6E6D8"
          d="M113.176 104.385c-10.928-3.58-18.713-6.363-23.715-12.602a22.418 22.418 0 01-1.917-2.782 11.385 11.385 0 01-1.178 1.94c0 .011-.012.011-.012.011-2.344 3.072-6.041 4.296-11.146 3.604-.242 2.057-.058 4.99-.773 6.861-.682 1.79-3.523 1.721-3.454 4.389-.185.785-.358 1.571-.542 2.357l-.521 2.206c-.162.704-.323 1.397-.496 2.102-1.028 4.344-2.067 8.687-3.072 13.018-1.121 4.829-2.195 9.633-3.13 14.358h44.642v-.44c-.127-11.354 1.432-25.134 5.314-35.022z"
        />
        <path
          fill="#E0D1C1"
          d="M70.875 114.318a.866.866 0 01-.842-1.071c.523-2.15 2.242-3.816 3.905-5.428 1.581-1.532 3.075-2.979 3.455-4.684.079-.357.099-.747.119-1.162.015-.282.029-.564.062-.844.118-1.072.464-2.066.799-3.028.3-.861.585-1.675.697-2.507a.86.86 0 01.976-.741.866.866 0 01.741.976c-.136 1.005-.462 1.939-.777 2.843-.317.91-.616 1.77-.715 2.648-.027.245-.038.493-.052.741-.023.467-.047.949-.157 1.448-.494 2.214-2.246 3.91-3.941 5.554-1.555 1.508-3.023 2.929-3.429 4.594a.864.864 0 01-.841.661z"
        />
        <path
          fill="#F6E6D8"
          d="M71.593 137.097a43.074 43.074 0 01.081-4.517c.034-.53.069-1.062.115-1.57.081-1.166.161-2.276.254-3.327.011-.241.035-.485.058-.727.081-.947.149-1.837.231-2.702.046-.532.093-1.052.139-1.549.22-2.519.428-4.621.578-6.399.021-.312.046-.624.068-.924.023-.196.035-.393.046-.589.024-.302.046-.577.07-.855.022-.542.047-1.051.068-1.523v-.012c.023-1.04.012-1.905-.081-2.646a7.045 7.045 0 00-.08-.555c-.012-.092-.035-.173-.046-.241a5.003 5.003 0 00-.128-.485 4.258 4.258 0 00-.335-.843c-.047-.093-.093-.186-.15-.278a4.485 4.485 0 00-.646-.82 3.72 3.72 0 00-.382-.356 4.862 4.862 0 00-.474-.371c-5.648-4.007-3.234-1.628-4.32-11.203-3.8.254-6.803-.451-8.709-2.472-.774-.82-1.375-1.848-1.768-3.13a19.644 19.644 0 01-2.229 2.39c-4.205 3.916-10.373 6.677-19.29 10.696 1.329 14.381-2.229 25.619.358 37.76h36.744a28.9 28.9 0 01-.105-1.433 25.295 25.295 0 01-.067-1.319z"
        />
        <path
          fill="#E0D1C1"
          d="M71.764 140.713a.866.866 0 01-.859-.782 28.456 28.456 0 01-.107-1.476 22.97 22.97 0 01-.07-1.337 44.12 44.12 0 01.083-4.599c.035-.535.07-1.073.116-1.589.08-1.152.162-2.268.254-3.323.01-.201.031-.438.053-.672l.085-1.015c.05-.6.099-1.179.151-1.75l.139-1.547c.108-1.244.215-2.392.313-3.448.099-1.07.189-2.047.265-2.943l.068-.916c.025-.217.034-.396.044-.574l.139-2.371c.025-1.112.001-1.89-.075-2.507a6.594 6.594 0 00-.071-.497l.822-.318-.846.186c-.003-.017-.025-.121-.027-.137a4.092 4.092 0 00-.101-.369 3.524 3.524 0 00-.267-.683c-.049-.097-.083-.165-.126-.233a3.404 3.404 0 00-.523-.666 3.092 3.092 0 00-.324-.307c-.13-.11-.256-.217-.399-.312a.867.867 0 11.962-1.442c.199.133.376.278.548.425.171.142.325.283.468.439.268.267.519.587.743.949.07.114.129.229.187.346.143.258.271.579.391.981a5.969 5.969 0 01.203.872 6.9 6.9 0 01.081.56c.089.706.115 1.535.088 2.764l-.142 2.438a9.63 9.63 0 01-.051.626l-.063.883c-.077.91-.168 1.892-.269 2.968a723.93 723.93 0 00-.311 3.444l-.139 1.548c-.054.569-.101 1.143-.15 1.736l-.081.967c-.025.273-.046.483-.056.692a179.565 179.565 0 00-.255 3.345c-.047.521-.081 1.045-.116 1.567a42.333 42.333 0 00-.077 4.434c.01.438.031.853.065 1.275.024.497.058.958.102 1.417a.863.863 0 01-.865.951zM65.458 140.713a.868.868 0 01-.856-.739c-.329-2.214-.442-3.966-.354-5.514.075-1.305.294-2.698.573-4.466.209-1.323.448-2.836.669-4.612.394-3.216.613-6.571.674-10.258.103-6.016-1.021-6.697-2.21-7.42-.517-.313-1.104-.668-1.611-1.343-1.228-1.629-.907-2.875-.598-4.08.116-.452.237-.921.301-1.465.114-.982.026-1.97-.277-3.116a17.22 17.22 0 00-.568-1.671.866.866 0 011.611-.637c.25.632.461 1.255.63 1.851.358 1.359.464 2.585.327 3.766-.08.673-.22 1.22-.344 1.703-.29 1.128-.422 1.645.303 2.606.307.409.686.639 1.126.905 1.852 1.124 3.155 2.422 3.044 8.931-.062 3.746-.286 7.161-.688 10.439-.224 1.804-.465 3.327-.677 4.671-.271 1.719-.485 3.076-.554 4.294-.082 1.426.026 3.065.338 5.16a.867.867 0 01-.859.995z"
        />
        <path
          fill="#F6E6D8"
          d="M59.354 89.886c-.846-1.259-.992-2.679-.665-4.377.577-2.995 1.238-2.635 2.325-8.689.161-.917.306-1.872.432-2.884-3.574 6.301-8.821 10.996-8.251 14.516.902 5.572 3.597 6.957 5.905 11.886a.935.935 0 001.741-.095c.913-2.57 2.922-3.912 5.818-5.644-3.537-2.118-5.477-2.017-7.305-4.713z"
        />
        <path
          fill="#E0D1C1"
          d="M59.948 101.753c-.696 0-1.33-.405-1.632-1.051-.838-1.788-1.725-3.09-2.583-4.346-1.439-2.109-2.799-4.101-3.393-7.766a.867.867 0 111.711-.278c.532 3.286 1.728 5.037 3.112 7.067.855 1.251 1.825 2.672 2.722 4.588l.957.274-.816-.29c1.003-2.824 3.198-4.308 6.188-6.097a.866.866 0 11.889 1.488c-2.845 1.701-4.631 2.899-5.444 5.188a1.816 1.816 0 01-1.711 1.223z"
        />
        <path
          fill="#F6E6D8"
          d="M83.509 76.876c.64 2.687 1.292 5.953 1.314 7.731.091 7.415-5.385 8.518-9.614 9.954 4.847 1.435 5.533 3.291 6.301 6.326.178.695 1.13.804 1.444.157.977-2.015 2.195-2.706 3.652-4.532 6.831-8.563 2.5-12.639-3.456-22.085.11.843.226 1.664.359 2.449z"
        />
        <path
          fill="#E0D1C1"
          d="M82.271 102.341a1.631 1.631 0 01-1.601-1.24c-.743-2.933-1.295-4.402-5.707-5.709a.865.865 0 01-.585-1.076.862.862 0 011.076-.584c5.055 1.495 6.016 3.544 6.834 6.708.658-1.274 1.414-2.057 2.212-2.88.456-.472.929-.961 1.429-1.587 2.428-3.044 3.438-5.5 3.276-7.965a.863.863 0 01.809-.919.87.87 0 01.921.806c.188 2.888-.971 5.799-3.652 9.159a23.463 23.463 0 01-1.538 1.711c-.809.835-1.448 1.496-2.012 2.659a1.614 1.614 0 01-1.462.917z"
        />
        <g>
          <path
            fill="#E0D1C1"
            d="M35.022 140.713a.868.868 0 01-.846-.687c-1.446-6.783-1.01-13.245-.548-20.088.377-5.582.767-11.356.174-17.771a.866.866 0 111.726-.162c.606 6.556.211 12.4-.17 18.051-.454 6.717-.882 13.063.513 19.608a.865.865 0 01-.849 1.049z"
          />
        </g>
        <g>
          <path
            fill="#E0D1C1"
            d="M107.861 140.713a.866.866 0 01-.866-.866v-.44c-.146-13.178 1.862-26.393 5.373-35.338a.867.867 0 111.613.635c-3.435 8.747-5.398 21.719-5.254 34.693v.45a.866.866 0 01-.866.866z"
          />
        </g>
        <g>
          <circle fill="#E0D1C1" cx="68.809" cy="136.259" r="1.155" />
          <circle fill="#E0D1C1" cx="69.964" cy="109.215" r="1.155" />
        </g>
      </g>
      <g>
        <path
          fill="#F0C390"
          d="M89.819 36.213l-.702 10.148c14.535-8.458 5.481-20.777.702-10.148zM50.677 32.399c-5.661-1.3-3.239 11.675 4.195 13.006l-.912-11.118c-.26-.19-1.32-1.433-3.283-1.888z"
        />
        <path
          fill="#EDB680"
          d="M53.831 41.367a.869.869 0 01-.84-.655c-.523-2.08-1.659-3.646-3.04-4.196a.866.866 0 11.64-1.611c1.925.765 3.413 2.727 4.082 5.384a.866.866 0 01-.842 1.078zM90.36 41.367a.866.866 0 01-.836-1.091c.619-2.302 1.595-4.548 4.517-5.397.454-.127.939.132 1.073.591s-.131.94-.591 1.074c-1.987.576-2.746 2.028-3.326 4.182a.867.867 0 01-.837.641z"
        />
        <path
          fill="#FFD399"
          d="M88.641 27.69c-3.627-2.253-1.016-3.154-1.524-6.064-.52-3.119-3.072.011-5.359-.936-.958-.416-1.363-1.167-1.721-1.975-.854 1.467-2.656 2.345-4.285 2.426-3.234.15-3.847-2.056-6.734-1.999-4.77.092-1.074 5.995-7.796 3.477-1.836-.681-4.124-.658-4.505 1.421-.242 1.34.405 2.067-.058 3.176-.659 1.605-3.073 1.698-4.596 2.668.15 9.944 1.003 20.086 5.277 29.165 7.277 15.41 25.747 17.581 32.192-5.763 1.536-5.486 2.078-14.681 2.195-21.876-.119-2.622-.903-2.368-3.086-3.72z"
        />
        <path
          fill="#4D5F91"
          d="M62.683 39.093a1.154 1.154 0 01-1.152-1.092 284.7 284.7 0 01-.091-1.995 1.155 1.155 0 011.111-1.198c.625-.051 1.173.474 1.197 1.111.012.331.084 1.864.089 1.955a1.155 1.155 0 01-1.154 1.219zM82.414 39.058a1.156 1.156 0 01-1.152-1.084c-.071-1.171-.063-1.367-.059-1.591.004-.085.006-.175.002-.36a1.155 1.155 0 011.129-1.181h.026c.626 0 1.14.5 1.154 1.129.005.244.001.365-.003.479-.004.193-.007.364.056 1.38a1.154 1.154 0 01-1.082 1.224c-.022.004-.047.004-.071.004z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#B07C5A"
            d="M86.208 33.431a.861.861 0 01-.576-.219c-2.3-2.042-4.469-1.491-5.731-.293a.867.867 0 01-1.194-1.257c1.875-1.78 5.099-2.391 8.075.255a.865.865 0 01-.574 1.514zM57.104 34.462a.867.867 0 01-.716-1.353c1.552-2.29 4.635-3.292 6.594-2.91.842.161 1.346.464 2.4 1.136a.868.868 0 01-.932 1.462c-1.021-.651-1.288-.8-1.796-.896-1.219-.242-3.629.403-4.833 2.181a.859.859 0 01-.717.38z"
          />
        </g>
        <g>
          <path
            fill="#EDB680"
            d="M71.909 52.137c-1.381 0-2.79-.861-3.393-1.79-.535-.821-.251-1.425-.104-1.645.326-.489.889-.631 1.403-.647.143-7.548.167-9.188.169-9.542l-.001-.022a.58.58 0 010-.059c.016-.663.527-.919.887-.894.465.01.679.087.771.524a.786.786 0 01.078.376 2.1 2.1 0 01-.021.21c.012.375.003.876-.008 1.545-.025 1.476-.073 4.125-.161 8.826a.87.87 0 01-.318.654.854.854 0 01-.705.18 2.51 2.51 0 01-.098-.016c.453.333 1.14.652 1.769.542.119-.03.496-.204 1.615-1.185l1.171 1.279c-1.049.917-1.862 1.53-2.522 1.618a3.05 3.05 0 01-.532.046z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M79.483 51.719c.455 4.465 6.938 1.306 4.313-1.976-1.268-1.571-4.593-.76-4.313 1.976zM59.635 51.619c.096 2.301 3.524 3.357 4.77.864 1.574-3.33-4.964-5.504-4.77-.864z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M70.411 55.984c-3.299-1.633-3.189.46-1.498 1.663.93.661 1.948 1.529 4.257 1.337 2.569-.214 4.591-2.444 3.748-3.295-.934-.944-3.537 1.765-6.507.295z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar06: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#D99467"
        d="M83.844 54.917H59.19c.33 7.599 1.777 14.164-1.465 21.368a21.647 21.647 0 01-4.251 6.262c4.535 16.447 30.814 16.846 36.311 2.24a32.208 32.208 0 01-2.49-2.875c-5.301-6.914-4.211-19.772-3.451-26.995z"
      />
      <path
        fill="#42527D"
        d="M88.831 108.018l5.445-19.432a31.53 31.53 0 01-4.491-3.799c-13.056 8.295-25.115 7.574-36.311-2.24-1.726 1.773-3.706 3.209-5.832 4.44l-2.431 13 3.929 7.818c-2.637 3.996-3.272 16.703 1.184 31.158H90.55c1.868-14.614.01-27.55-1.719-30.945z"
      />
      <path
        fill="#EBDBCC"
        d="M56.377 114.383a1.636 1.636 0 00-.959-1.888c-3.302-1.393-4.318-2.988-6.278-4.689l-3.929-7.818 2.431-13c-12.402 7.177-29.967 7.235-33.45 24.657-.037.189-.689 13.991-1.596 27.319h44.917c-2.27-5.921-4.229-11.76-1.136-24.581zM94.276 88.586l-5.445 19.432c-.919.688-3.782 3.733-5.824 5.671a3.4 3.4 0 00-.868 3.578c3.103 8.955 3.466 15.512 3.171 21.697h42.974c-.876-12.503-1.195-23.928-2.059-28.855-2.621-14.955-18.875-12.35-31.949-21.523z"
      />
      <g opacity=".3">
        <path
          fill="#64AAC7"
          d="M13.605 139.855a.892.892 0 01-.892-.892c0-2.038-.172-3.044-.485-4.873l-.133-.785a.89.89 0 01.731-1.027.886.886 0 011.028.732l.133.78c.318 1.861.51 2.983.51 5.173a.89.89 0 01-.892.892zM21.255 139.855c-.014 0-.028 0-.042-.002a.89.89 0 01-.851-.933c.26-5.62-.083-8.573-.332-10.729-.187-1.623-.336-2.903-.112-4.496.609-4.467.135-6.379-.324-8.228-.157-.635-.319-1.29-.436-2.028-.424-2.81.04-4.415.53-6.116.536-1.855 1.09-3.775.689-7.804a.893.893 0 01.799-.977c.5-.056.928.312.976.8.434 4.371-.195 6.553-.75 8.476-.473 1.639-.846 2.93-.481 5.349.104.658.25 1.248.404 1.871.475 1.919 1.014 4.094.359 8.901-.193 1.37-.07 2.435.117 4.045.257 2.216.609 5.253.342 11.018a.889.889 0 01-.888.853zM29.726 139.855l-.07-.002a.894.894 0 01-.822-.96c.069-.887.208-1.538.342-2.167.295-1.385.574-2.693-.071-6.711-1.007-6.568-.689-8.866-.351-11.297.302-2.182.614-4.436.011-10.212-.371-3.509-.159-5.654.065-7.93.173-1.755.351-3.571.252-6.154a.892.892 0 011.781-.071c.105 2.707-.08 4.584-.259 6.398-.215 2.182-.417 4.243-.065 7.568.625 5.995.282 8.464-.02 10.644-.333 2.4-.62 4.473.346 10.776.697 4.338.371 5.874.053 7.358-.128.6-.248 1.164-.307 1.934a.887.887 0 01-.885.826zM37.683 139.855a.893.893 0 01-.868-.69c-.877-3.752-.682-4.928-.103-8.42.105-.629.223-1.341.351-2.161.244-1.594.091-2.244-.086-2.999-.202-.857-.431-1.831-.08-3.98a17.3 17.3 0 01.405-1.747c.414-1.526.806-2.97.258-6.884a90.636 90.636 0 00-.496-3.07c-.596-3.429-1.213-6.976-.456-10.458.517-2.36 1.025-5.183.873-8.236a.894.894 0 01.847-.937c.496-.056.911.356.935.848.163 3.263-.37 6.232-.912 8.704-.682 3.142-.096 6.513.47 9.774.182 1.046.364 2.092.507 3.131.596 4.272.138 5.961-.305 7.595-.14.517-.272 1.004-.367 1.57-.293 1.797-.123 2.52.057 3.283.192.816.409 1.741.112 3.679-.129.829-.249 1.547-.354 2.182-.565 3.401-.717 4.314.08 7.721a.894.894 0 01-.868 1.095zM46.63 139.855a.892.892 0 01-.888-.992c.047-.434.159-.868.276-1.329.357-1.398.845-3.313.125-7.312-.851-6.792-.273-8.604.234-10.203.233-.731.435-1.361.491-2.479.121-2.119-.171-3.41-.48-4.779-.454-2.006-.966-4.28-.25-9.291a.891.891 0 111.765.252c-.668 4.687-.214 6.699.225 8.646.323 1.429.656 2.904.521 5.268-.068 1.343-.324 2.146-.571 2.924-.476 1.495-.967 3.037-.172 9.395.782 4.331.215 6.55-.159 8.021-.106.416-.198.773-.233 1.085a.89.89 0 01-.884.794zM55.207 139.855a.89.89 0 01-.882-1.034c.049-.309.115-.667.186-1.055.209-1.137.47-2.548.47-3.669a.892.892 0 011.785 0c0 1.283-.276 2.784-.499 3.992-.068.372-.132.715-.18 1.013a.892.892 0 01-.88.753z"
        />
        <g>
          <path
            fill="#64AAC7"
            d="M44.804 97.09c-2.084 0-3.547-.266-4.968-.521-2.652-.479-5.393-.973-12.628.021a.884.884 0 01-1.006-.762.895.895 0 01.762-1.007c7.518-1.031 10.53-.487 13.188-.009 1.647.298 3.212.576 5.738.468.5-.045.909.359.931.853a.89.89 0 01-.852.929c-.41.018-.797.028-1.165.028zM16.273 106.475a.893.893 0 110-1.786c2.53 0 4.325-.311 6.227-.641 2.004-.349 4.065-.716 7.005-.655h.002c1.074 0 2.037.085 3.055.177 1.356.123 2.756.248 4.626.181 1.435-.053 2.605-.292 3.736-.522 1.911-.393 3.715-.765 6.417-.224a.891.891 0 11-.349 1.75c-2.349-.47-3.905-.148-5.71.221-1.202.247-2.447.501-4.03.558-1.973.069-3.503-.064-4.849-.186-.979-.089-1.903-.17-2.915-.17-2.779-.054-4.672.279-6.685.627-1.89.331-3.846.67-6.53.67zM53.545 114.267c-2.517 0-4.074-.445-5.701-.913l-.889-.25c-2.669-.7-4.586-.235-6.44.213-.645.155-1.277.308-1.924.414-2.53.432-4.438.204-6.122.005-.916-.109-1.704-.203-2.469-.172-.702.023-1.429.108-2.271.207-2.424.283-6.089.713-13.673.172a.894.894 0 01-.826-.956.903.903 0 01.954-.824c7.419.529 10.839.13 13.337-.165.882-.103 1.644-.192 2.416-.219.89-.032 1.792.072 2.743.184 1.563.186 3.339.397 5.619.007a24.03 24.03 0 001.799-.388c1.97-.476 4.204-1.018 7.319-.202l.921.261c2.138.613 3.827 1.095 7.807.703.482-.118 1.059.18 1.167.662.11.479-.092.949-.571 1.061a2.27 2.27 0 01-.508.058 27.97 27.97 0 01-2.688.142zM21.781 123.264c-1.383 0-2.29-.186-3.17-.367-1.163-.236-2.363-.485-4.908-.318-.498.017-.917-.339-.948-.832a.89.89 0 01.832-.947c2.776-.182 4.164.1 5.384.351.949.195 1.755.354 3.192.325 1.172-.035 2.618-.265 4.147-.506 1.702-.271 3.631-.577 5.508-.658 1.265-.049 2.431.103 3.788.281 2.5.33 5.609.739 11.187.174 2.501-.251 4.667-.332 8.345.01.49.046.852.48.806.971a.9.9 0 01-.971.807c-3.545-.328-5.547-.258-8.002-.012-5.782.588-9.145.142-11.598-.179-1.328-.177-2.375-.318-3.479-.27-1.774.076-3.569.362-5.305.637-1.588.253-3.088.49-4.376.529-.15.002-.294.004-.432.004zM39.335 132.783a11.09 11.09 0 01-1.832-.14c-.842-.104-1.545-.298-2.226-.483-1.398-.384-2.608-.716-5.117-.221-1.708.367-3.535.044-5.471-.302-1.215-.217-2.472-.439-3.679-.468-1.809-.076-3.666.405-6.026 1.005-.522.132-1.068.269-1.642.408a.894.894 0 01-1.078-.655.89.89 0 01.655-1.077c.57-.138 1.11-.275 1.625-.408 2.501-.631 4.496-1.145 6.519-1.057 1.333.032 2.657.267 3.938.495 1.757.313 3.417.611 4.797.31 2.937-.572 4.467-.156 5.95.248.648.179 1.26.347 2.012.441 2.033.338 4.753-.121 7.634-.606 3.253-.549 6.616-1.117 9.658-.713a.889.889 0 01.766 1.001.9.9 0 01-1.001.768c-2.773-.367-6.005.176-9.125.703-2.268.384-4.443.751-6.357.751z"
          />
        </g>
        <g>
          <path
            fill="#64AAC7"
            d="M85.47 139.855a.894.894 0 01-.885-.78 24.796 24.796 0 00-.127-.865.892.892 0 011.761-.281c.051.307.1.627.136.923a.892.892 0 01-.885 1.003z"
          />
          <path
            fill="#64AAC7"
            d="M85.342 138.961a.891.891 0 01-.855-.64c-.439-1.479-.246-3.356-.003-5.733.272-2.658.61-5.965.105-9.71a.904.904 0 01.004-.27c.397-2.298.196-4.693 0-7.011-.123-1.465-.239-2.853-.202-4.165a.893.893 0 011.784.049c-.035 1.215.078 2.551.197 3.969.2 2.383.406 4.847.003 7.323.507 3.899.162 7.277-.116 9.995-.224 2.183-.4 3.906-.062 5.047a.89.89 0 01-.855 1.146zM94.022 139.855a.897.897 0 01-.885-.778c-.431-3.349-.25-5.339-.058-7.449.039-.425.078-.859.112-1.311.241-3.823-.105-5.379-.442-6.882-.443-1.988-.828-3.708.204-9.471.578-3.174.519-4.045.451-5.056-.063-.923-.134-1.968.172-4.585.899-5.85.74-6.891.146-10.762-.117-.759-.248-1.621-.392-2.644a.89.89 0 01.758-1.007c.479-.081.939.27 1.008.758.143 1.013.273 1.87.39 2.621.61 3.982.795 5.184-.141 11.273-.283 2.421-.218 3.379-.161 4.225.077 1.128.143 2.104-.474 5.494-.97 5.407-.622 6.961-.22 8.762.347 1.55.739 3.309.481 7.396-.037.475-.076.916-.115 1.351-.19 2.094-.355 3.903.051 7.059a.893.893 0 01-.885 1.006zM102.624 139.855a.893.893 0 01-.887-.8c-.536-5.093-.545-5.286-.343-6.818.046-.345.102-.77.164-1.372.333-3.419-.091-5.132-.501-6.789-.303-1.217-.613-2.477-.587-4.279.024-1.698.36-2.79.685-3.847.228-.739.462-1.505.61-2.536.486-2.958.129-5.336-.25-7.853-.498-3.309-1.062-7.059.129-12.772a.893.893 0 011.747.366c-1.126 5.399-.61 8.826-.111 12.142.399 2.661.778 5.172.249 8.391-.166 1.15-.433 2.02-.668 2.788-.314 1.022-.587 1.904-.605 3.349-.023 1.572.234 2.615.534 3.824.425 1.719.908 3.666.544 7.397a42.357 42.357 0 01-.17 1.427c-.178 1.343-.182 1.368.349 6.398a.894.894 0 01-.889.984zM111.521 139.855a.892.892 0 01-.881-.757c-1.086-7.064-.76-9.376-.415-11.827.301-2.13.612-4.338.005-10.151-.395-3.75-.047-7.054.184-9.242.062-.588.114-1.078.135-1.455.163-3.005-.179-5.555-.479-7.804a65.382 65.382 0 01-.316-2.641.894.894 0 01.81-.969.908.908 0 01.969.81c.072.814.186 1.665.307 2.563.311 2.328.664 4.968.493 8.141-.023.4-.077.921-.143 1.544-.224 2.111-.559 5.304-.183 8.865.631 6.035.289 8.456-.013 10.592-.327 2.313-.636 4.502.411 11.303a.894.894 0 01-.884 1.028zM119.149 139.855a.891.891 0 01-.88-1.043c.546-3.199.36-3.915.164-4.673-.108-.416-.23-.885-.259-1.649.025-1.992.339-3.113.613-4.106.207-.742.402-1.447.47-2.481.152-2.305-.274-4.765-.726-7.369-.295-1.703-.601-3.467-.736-5.207-.215-2.781.172-4.786.547-6.727.36-1.858.732-3.783.617-6.536a.89.89 0 01.854-.927c.477-.065.909.36.929.853.124 2.96-.269 4.989-.647 6.949-.368 1.908-.717 3.709-.52 6.248.13 1.659.427 3.378.715 5.042.45 2.593.914 5.274.748 7.79-.079 1.218-.308 2.046-.531 2.844-.269.974-.524 1.892-.549 3.607.021.522.104.848.202 1.222.235.906.479 1.845-.132 5.42a.891.891 0 01-.879.743z"
          />
          <g>
            <path
              fill="#64AAC7"
              d="M98.738 96.748c-1.533 0-2.546-.127-3.639-.27a37.1 37.1 0 00-2.768-.272.894.894 0 01-.839-.942.885.885 0 01.942-.839c1.193.067 2.056.179 2.89.285 1.952.249 3.638.463 8.963-.128.713-.074 2.938-.072 5.186.008a.893.893 0 01-.031 1.784c-.01 0-.021 0-.03-.002-2.36-.079-4.396-.072-4.935-.015-2.603.289-4.377.391-5.739.391zM89.67 105.892a.892.892 0 01-.045-1.785c1.309-.067 2.192-.202 3.128-.344.516-.079 1.03-.156 1.612-.224 2.893-.305 4.548-.027 6.013.215 1.452.241 2.708.45 5.019.135.53-.07 1.165-.166 1.852-.271 1.947-.292 4.369-.657 6.057-.69 5.075-.174 7.052.217 8.793.565.74.149 1.438.288 2.331.367a.89.89 0 01.809.967c-.042.49-.483.838-.968.811-.986-.089-1.732-.236-2.521-.396-1.647-.327-3.522-.701-8.396-.531-1.583.033-3.942.388-5.838.674-.701.104-1.346.2-1.88.271-2.579.354-4.087.101-5.55-.142-1.416-.234-2.88-.476-5.525-.2-.551.063-1.045.138-1.539.212-.937.144-1.906.29-3.303.362-.017.004-.032.004-.049.004zM96.944 115.16c-3.266 0-5.951-.471-8.27-.874-1.784-.312-3.323-.578-4.762-.578a.894.894 0 010-1.786c1.592 0 3.203.28 5.068.606 3.431.597 7.704 1.341 13.475.381l.642-.111c2.949-.504 6.299-1.078 10.314-.669 5.29.534 7.195.109 8.875-.266 1.184-.265 2.293-.52 4.273-.441a.89.89 0 01.856.925c-.018.493-.468.895-.924.857-1.742-.063-2.702.151-3.816.399-1.813.405-3.863.862-9.444.3-3.777-.38-6.996.168-9.834.653l-.647.111a35.035 35.035 0 01-5.806.493zM83.842 123.889a.892.892 0 01-.068-1.782c1.405-.106 2.309-.408 3.266-.728 1.496-.502 3.048-1.021 6.324-.782-.011.012.229.017.587.046 1.271.106 4.244.36 7.562.379 3.602.039 5.755-.212 7.482-.413 1.606-.188 2.871-.338 4.451-.111 4.388.619 6.533.095 8.433-.372 1.581-.389 3.072-.756 5.427-.451a.893.893 0 01.778.885c0 .567-.587 1-1.106.872-1.968-.239-3.223.072-4.674.427-2.054.505-4.383 1.076-9.107.404-1.354-.188-2.403-.067-3.994.118-1.684.195-3.996.464-7.703.426-3.386-.019-6.408-.276-7.7-.385-.268-.024-.445-.041-.513-.043-2.971-.211-4.289.229-5.682.692-1.017.339-2.067.69-3.693.816-.023.002-.047.002-.07.002zM86.932 133.132c-.57 0-1.168-.02-1.806-.061a.892.892 0 01-.829-.95c.033-.493.472-.844.95-.83 2.55.173 4.411-.069 6.373-.325a66.872 66.872 0 012.381-.281c3.626-.342 5.1-.021 6.4.263.88.188 1.712.384 3.225.33 1.193-.037 2.622-.265 4.135-.507 1.689-.27 3.604-.574 5.522-.657 1.284-.058 2.453.103 3.809.283 2.373.316 5.321.711 10.579.229a.886.886 0 01.97.807.895.895 0 01-.808.972c-5.455.497-8.516.089-10.976-.239-1.325-.174-2.37-.316-3.5-.271-1.813.08-3.594.363-5.315.64-1.57.251-3.054.486-4.366.527-1.722.035-2.709-.167-3.652-.372-1.229-.267-2.504-.541-5.855-.228-.809.077-1.565.175-2.316.272-1.508.198-3.052.398-4.921.398z"
            />
          </g>
        </g>
      </g>
      <path
        fill="#64AAC7"
        d="M115.937 139.855h-.008a.893.893 0 01-.885-.899c.025-3.457.062-7.258.154-11.621.197-10.038.853-17.063 3.61-23.256a31.068 31.068 0 011.738-3.391.893.893 0 011.534.911 29.281 29.281 0 00-1.639 3.197c-2.638 5.927-3.267 12.765-3.458 22.572a799.076 799.076 0 00-.155 11.602.89.89 0 01-.891.885zM24.455 139.855a.891.891 0 01-.855-.639l-.191-.637c-.388-1.295-.789-2.633-1.114-4.248-.83-4.059-.594-8.241-.366-12.283.232-4.127.473-8.396-.461-12.396-.319-1.372-.774-2.737-1.213-4.021l-.113-.327c-.473-1.373-.962-2.793-1.313-4.222a.89.89 0 01.654-1.078.897.897 0 011.079.652c.331 1.349.806 2.73 1.266 4.064l.114.331c.455 1.328.925 2.742 1.263 4.192.992 4.252.745 8.649.505 12.902-.222 3.929-.451 7.995.332 11.829.309 1.538.682 2.778 1.076 4.091l.19.642a.889.889 0 01-.602 1.108.745.745 0 01-.251.04z"
      />
      <g>
        <path
          fill="#5B73A3"
          d="M72.679 95.719c-7.795 0-15.296-3.169-23.216-9.547a.894.894 0 011.12-1.39C64.62 96.086 77.287 96.809 92.94 87.203a.893.893 0 01.935 1.52c-7.582 4.654-14.499 6.996-21.196 6.996z"
        />
      </g>
      <g>
        <path
          fill="#86C0CF"
          d="M55.126 77.345C43.73 86.093 38.15 96.746 36.887 108.308c-.081.74.678 1.285 1.363.994 2.367-1.008 5.836-1.791 9.873-1.573a.989.989 0 001.05-.947c.449-11.602 3.271-19.157 7.437-28.232.427-.929-.674-1.828-1.484-1.205zM85.482 75.461c-.768-.51-1.192.408-.908 1.285 3.671 11.314 5.732 17.751 3.257 30.767-.14.739.59 1.346 1.296 1.085 4.071-1.491 7.443-2.047 12.216-.207.717.277 1.469-.334 1.318-1.09-4.376-21.822-12.692-28.866-17.179-31.84z"
        />
        <path
          fill="#64AAC7"
          d="M86.423 119.065a.891.891 0 01-.283-1.738c.203-.069.849-.251 1.555-.448.655-.184 1.364-.381 1.798-.514a.889.889 0 011.112.598.89.89 0 01-.596 1.11c-.442.134-1.166.337-1.834.525-.667.186-1.276.354-1.469.42a.903.903 0 01-.283.047z"
        />
        <circle fill="#64AAC7" cx="51.688" cy="117.044" r="1.784" />
      </g>
      <g>
        <path
          fill="#4D2323"
          d="M99.856 19.54c-.801-2.207-3.469-.531-4.316-.986-2.209-1.173 3.802-5.083.384-7.364-1.429-.969-3.247-.35-4.742-.573-3.608-.552-.035-3.723-2.08-5.4-2.42-2.008-10.327 3.37-10.736.973-.256-1.477 2.498-2.27 1.83-3.819-.433-1.037-1.775-1.21-2.721-1.295-9.481 0-15.389 8.079-17.974 6.489-1.331-.812 1.673-3.227-.446-3.917C50.268.83 43.603 31.803 48.857 40.36l46.622-.346c-1.194-17.837 5.571-16.893 4.377-20.474z"
        />
        <path
          fill="#6B3232"
          d="M53.489 26.377l-.071-.002a.893.893 0 01-.819-.961c.469-5.901 2.943-12.52 6.791-18.158a.892.892 0 011.474 1.007c-3.677 5.388-6.042 11.692-6.485 17.293a.894.894 0 01-.89.821zM60.684 23.819a.892.892 0 01-.888-.809c-.655-7.006 2.947-14.99 9.402-20.837a.891.891 0 111.198 1.322c-6.046 5.478-9.428 12.891-8.824 19.348a.894.894 0 01-.888.976z"
        />
        <path
          fill="#6B3232"
          d="M65.55 22.153a.891.891 0 01-.889-.835c-.382-5.94 4.393-15.386 13.043-20.913a.89.89 0 011.232.272.89.89 0 01-.272 1.231c-7.985 5.104-12.563 13.988-12.223 19.295a.891.891 0 01-.833.947c-.019.003-.038.003-.058.003z"
        />
        <path
          fill="#6B3232"
          d="M70.25 22.916a.892.892 0 01-.893-.878c-.084-5.568 2.853-10.784 8.978-15.948a.892.892 0 111.15 1.364c-5.689 4.797-8.419 9.559-8.343 14.555a.892.892 0 01-.878.906l-.014.001zM74.938 22.927c-.02 0-.039 0-.058-.002a.891.891 0 01-.834-.947c.552-8.619 8.488-14.093 15.049-17.167a.892.892 0 01.757 1.616c-5.014 2.35-13.503 7.509-14.025 15.666a.891.891 0 01-.889.834z"
        />
        <path
          fill="#6B3232"
          d="M80.232 22.403a.892.892 0 01-.868-1.102c1.348-5.562 4.455-9.27 10.073-12.023a.893.893 0 01.785 1.603c-5.166 2.531-7.896 5.774-9.125 10.84a.89.89 0 01-.865.682zM84.288 23.248a.893.893 0 01-.844-1.182c1.964-5.701 6.923-9.702 13.266-10.703a.892.892 0 11.279 1.763c-5.68.896-10.112 4.454-11.858 9.521a.892.892 0 01-.843.601zM88.012 27.865a.891.891 0 01-.853-1.155c1.333-4.337 3.913-7.663 7.464-9.62a.893.893 0 01.861 1.564c-3.137 1.729-5.426 4.696-6.62 8.582a.892.892 0 01-.852.629zM89.51 36.097a.89.89 0 01-.847-1.169c1.343-4.125 4.543-11.548 10.874-14.918a.892.892 0 01.839 1.575c-5.779 3.077-8.757 10.026-10.017 13.896a.894.894 0 01-.849.616z"
        />
      </g>
      <g>
        <path
          fill="#D99467"
          d="M91.696 40.109l-1.987 5.968c4.146-1.487 11.039-5.708 8.304-8.934-1.616-1.931-4.65.852-6.317 2.966zM45.878 40.002c1.523 2.413 4.581 3.275 7.342 4.223l-.011-4.26c-7.669-6.547-8.751-2.24-7.331.037z"
        />
        <path
          fill="#E6A57A"
          d="M85.257 19.001c-2.59-1.188-7.025-.985-9.893-.833-8.432.511-15.478-1.862-20.435 2.133-14.858 25.571 10.579 67.918 31.169 41.11 8.321-10.86 10.2-37.311-.841-42.41z"
        />
        <path
          id="eyebrow"
          fill="#6B3232"
          d="M57.274 30.943a.891.891 0 01-.543-1.601c3.341-2.558 5.679-2.673 7.741-2.775l.519-.026c.467-.037.913.348.942.84a.893.893 0 01-.84.942l-.533.027c-1.978.098-3.846.19-6.744 2.41a.897.897 0 01-.542.183zM86.462 32.192a.895.895 0 01-.791-.477c-1.574-3.002-4.771-3.49-7.161-3.376-.479.032-.909-.355-.935-.848a.891.891 0 01.849-.934c4.13-.207 7.259 1.338 8.827 4.329a.893.893 0 01-.789 1.306z"
        />
        <path
          fill="#451C2B"
          d="M61.645 37.883a1.19 1.19 0 01-1.183-1.077l-.1-1.044c-.059-.616-.059-.616-.078-.861l-.018-.215a1.19 1.19 0 011.092-1.28c.66-.038 1.229.438 1.28 1.092l.018.22c.017.231.017.231.073.818l.1 1.045a1.187 1.187 0 01-1.184 1.302zM82.025 37.869a1.19 1.19 0 01-1.178-1.37c.183-1.197.227-1.517.248-1.674.018-.132.021-.163.066-.42a1.196 1.196 0 011.375-.969c.647.113 1.081.729.969 1.376-.035.203-.038.228-.054.331-.021.161-.064.49-.253 1.717a1.187 1.187 0 01-1.173 1.009z"
        />
        <path
          fill="#CF8A5F"
          d="M69.958 49.057c-.751 0-1.24-.396-1.484-.662-2.192-2.394-.174-10.839 3.426-14.344a.892.892 0 111.245 1.278c-3.422 3.332-4.531 10.577-3.355 11.861.235.255.941-.183 1.474-.642a.931.931 0 01.648-.214.887.887 0 01.609.308c.354.413 1.122.343 1.659.041a.894.894 0 011.216.339.894.894 0 01-.339 1.215c-.944.531-2.229.677-3.217.121-.748.519-1.375.699-1.882.699z"
        />
        <g>
          <path
            id="smile"
            fill="#E05D43"
            d="M71.783 56.832c-1.597 0-3.256-.654-4.908-1.964a.892.892 0 111.109-1.399c2.682 2.129 5.147 2.085 7.331-.122a.892.892 0 011.269 1.254c-1.469 1.485-3.099 2.231-4.801 2.231z"
          />
        </g>
        <g>
          <path
            fill="#EDAA7E"
            d="M72.557 59.63a.891.891 0 01-.313-1.728c.285-.106.517-.121.704-.132.262-.015.619-.037 1.636-.516a.892.892 0 11.76 1.615c-1.225.577-1.802.654-2.289.683a.705.705 0 00-.186.021.86.86 0 01-.312.057z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#B85C83"
            d="M82.771 45.47c-1.993-.178-3.989 1.934-2.301 4.102 3.397 4.362 7.792-3.588 2.301-4.102zM58.133 48.496c1.312 5.305 6.705.836 4.745-1.865-1.559-2.078-5.626-1.698-4.745 1.865z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#915169"
          d="M67.587 35.719a.893.893 0 01-.833-1.213c.65-1.69 2.302-2.824 4.418-3.031 2.304-.219 4.467.698 5.511 2.352a.893.893 0 01-1.51.951c-.674-1.071-2.214-1.695-3.825-1.528-1.43.139-2.524.848-2.927 1.896a.895.895 0 01-.834.573z"
        />
        <path
          fill="#915169"
          d="M82.104 41.076c-1.77 0-3.526-.38-4.639-1.082-1.555-.945-2.402-3.575-2.43-5.68-.007-.473.199-1.351 1.646-1.924 2.756-1.091 8.811-.75 11.076 1.728 1.065 1.166 1.207 2.69.399 4.291-.535 1.071-1.639 1.868-3.186 2.301-.885.248-1.877.366-2.866.366zm-5.285-6.732c.037 1.746.756 3.629 1.584 4.134 1.161.73 3.936 1.116 6.087.513.731-.205 1.686-.611 2.071-1.383.651-1.292.348-2.198-.982-2.939-2.936-1.637-8.173-1.104-8.76-.325zm-.017.026zM60.946 41.171c-3.161 0-5.069-1.759-5.801-3.542-.741-1.808-.331-3.62.996-4.408.763-.453 2.34-.801 4.691-1.037.416-.044.826-.098 1.223-.15 2.566-.337 5.22-.688 6.37 2.49a.84.84 0 01.052.268c.13 3.283-1.435 5.151-5.074 6.06-.89.22-1.709.319-2.457.319zm3.51-7.563c-.575 0-1.284.078-2.168.194-.413.055-.838.11-1.272.157-2.327.233-3.572.564-3.965.796-.529.314-.639 1.258-.255 2.196.636 1.549 2.634 3.042 6.177 2.168 3.148-.786 3.776-2.107 3.727-4.116-.417-1.051-1.036-1.395-2.244-1.395z"
        />
        <path
          fill="#915169"
          d="M49.763 38.35a.892.892 0 01-.278-1.741c.534-.174 1.447-.638 2.416-1.128 1.266-.641 2.576-1.304 3.559-1.601a.888.888 0 011.112.596.892.892 0 01-.596 1.112c-.833.251-2.127.907-3.271 1.486-1.029.522-2.003 1.014-2.665 1.231a.887.887 0 01-.277.045zM93.727 38.114a.87.87 0 01-.438-.117c-1.077-.611-4.953-2.049-6.189-2.295a.892.892 0 01-.701-1.049.9.9 0 011.049-.701c1.411.281 5.494 1.796 6.722 2.493a.894.894 0 01-.443 1.669z"
        />
      </g>
    </svg>
  ),
  avatar07: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#8DB2C2"
        d="M63.464 10.71a.917.917 0 01-.127-.01c-1.077-.166-2.1-.544-3.09-.91l-.325-.12c-1.155-.423-3.166-1.373-3.65-2.971-.168-.553-.22-1.416.489-2.388 1.06-1.453 2.608-1.82 4.143-.98 2.115 1.153 4.153 4.748 3.342 6.843a.84.84 0 01-.782.536zm-4.176-6.148c-.433 0-.811.242-1.171.736-.327.45-.294.737-.24.914.194.64 1.199 1.362 2.623 1.885l.329.121c.631.233 1.277.472 1.917.644-.131-1.288-1.278-3.313-2.645-4.059-.294-.16-.563-.241-.813-.241z"
      />
      <path
        fill="#8DB2C2"
        d="M57.982 16.729c-1.228 0-2.335-.657-3.054-1.825-.878-1.423-.957-3.215-.201-4.564.437-.78 1.557-2.085 4.156-2.085h.021c4.253.014 5.358 1.441 5.536 2.637.109.734-.188 1.535-.886 2.381-1.389 1.686-4.275 3.401-5.417 3.453-.052.003-.104.003-.155.003zm.901-6.796c-1.313 0-2.244.424-2.693 1.228-.456.813-.39 1.965.165 2.864.248.401.765 1.072 1.708 1.027.507-.042 3.06-1.407 4.253-2.915.479-.604.477-.917.464-.998-.107-.726-1.63-1.199-3.88-1.206h-.017z"
      />
      <path
        fill="#8DB2C2"
        d="M47.256 20.033c-1.652 0-3.071-.774-3.735-1.835-.691-1.104-.486-2.386.521-3.265a.835.835 0 011.183.08.837.837 0 01-.08 1.182c-.396.348-.46.701-.203 1.113.47.75 2.018 1.503 3.854.725.931-.395 2.087-1.537 3.311-2.748 2.797-2.766 6.288-6.206 11.233-5.697.46.046.796.459.749.918-.047.461-.458.809-.919.749-4.163-.421-7.336 2.706-9.883 5.223-1.399 1.383-2.609 2.579-3.835 3.098a5.607 5.607 0 01-2.196.457z"
      />
      <path
        fill="#52322B"
        d="M64.361 11.69c-.234-.263-.86-1.47-1.066-1.924C58.218-1.33 79.229-3.08 77.688 8.281c-.171 1.26-.742 2.12-1.392 3.05l-11.935.359z"
      />
      <path
        fill="#613B33"
        d="M66.067 12.976a.838.838 0 01-.813-.64c-.803-3.291-.39-6.375 1.165-8.684C67.753 1.671 69.865.376 72.367.006a.85.85 0 01.953.708.84.84 0 01-.709.952c-2.059.303-3.719 1.314-4.801 2.924-1.288 1.912-1.617 4.522-.927 7.349a.838.838 0 01-.816 1.037z"
      />
      <path
        fill="#613B33"
        d="M70.135 11.116a.84.84 0 01-.825-.696c-.39-2.267.163-4.221 1.558-5.501 1.541-1.414 3.904-1.798 6.652-1.083a.84.84 0 01.601 1.023.842.842 0 01-1.023.6c-2.175-.565-3.989-.321-5.096.696-.96.881-1.329 2.295-1.039 3.982a.838.838 0 01-.828.979z"
      />
      <path
        fill="#52322B"
        d="M90.674 25.635c-1.169-3.508-2.075-8.038-6.376-11.843-3.9-3.488-9.086-5.002-14.257-4.713.009 3.499.118 2.64 1.21 14.344l.026 73.528c8.64-.11 21.033-.639 24.055-1.388.974-2.76-.466-57.214-4.658-69.928z"
      />
      <g>
        <path
          fill="#613B33"
          d="M70.041 9.079c-7.92.443-15.802 5.131-18.974 13.527-3.47 9.182-3.41 12.222-4.326 38.951-.52 15.025.201 34.012.219 34.146 3.923.13-1.453.753 18.247 1.239 1.542.04 3.66.04 6.071.009l-.026-73.528c-1.093-11.704-1.202-10.846-1.211-14.344z"
        />
      </g>
      <g>
        <path
          fill="#613B33"
          d="M91.755 44.771a.837.837 0 01-.832-.754c-.813-8.021-2.319-14.046-3.078-15.96-3.481-8.673-10.102-13.849-17.715-13.849h-.036a.84.84 0 01-.839-.836.84.84 0 01.877-.84c8.321 0 15.524 5.568 19.271 14.905.792 2 2.358 8.221 3.188 16.412a.838.838 0 01-.836.922z"
        />
        <path
          fill="#613B33"
          d="M91.292 44.646a.838.838 0 01-.836-.792c-.302-5.507-4.086-14.201-8.703-17.592-.712-.523-1.869-.98-3.21-1.511-2.216-.875-4.974-1.962-6.989-3.958-.245-.245-.886-.983-1.414-1.608-.005-.001-.054-.057-.104-.113-.329-.324-.367-.894-.042-1.224.325-.33.821-.372 1.15-.047.056.055.108.114.159.173.017.017.103.11.117.128.659.781 1.17 1.357 1.316 1.502 1.768 1.75 4.24 2.726 6.421 3.587 1.45.572 2.702 1.067 3.588 1.719 5.13 3.768 9.063 12.959 9.384 18.851a.837.837 0 01-.791.883c-.015.002-.03.002-.046.002z"
        />
        <path
          fill="#613B33"
          d="M91.583 96.907a.836.836 0 01-.835-.786c-.028-.428-.058-.799-.087-1.164-.092-1.144-.178-2.228-.162-4.718.127-19.157-.554-29.803-.96-36.164-.326-5.087-.489-7.642.058-9.813a.84.84 0 011.627.41c-.483 1.917-.326 4.383-.012 9.297.408 6.383 1.09 17.064.965 36.281-.017 2.419.067 3.465.156 4.574.028.373.06.753.087 1.191a.838.838 0 01-.784.89c-.017.002-.036.002-.053.002zM88.019 97.175a.838.838 0 01-.839-.827c-.104-9.188-.877-33.953-2.164-40.725a.835.835 0 01.666-.979c.45-.098.892.211.979.667 1.384 7.276 2.104 32.979 2.195 41.018a.836.836 0 01-.829.847l-.008-.001zM84.82 97.366a.84.84 0 01-.838-.811c-1.047-30.721-1.428-35.304-1.494-35.911a1.092 1.092 0 01.014-.271.838.838 0 111.662.211c.096.875.483 6.271 1.495 35.915a.84.84 0 01-.81.867h-.029z"
        />
      </g>
      <g>
        <path
          fill="#75473D"
          d="M49.573 45.373a.838.838 0 01-.801-.592 5.321 5.321 0 01-.142-.523c-.347-1.363-.292-3.177.17-5.208 1.068-4.737 3.858-9.237 7.108-11.462 1.32-.887 3.057-1.599 4.896-2.349 2.372-.972 4.825-1.974 6.081-3.294.889-.949 1.886-2.295 2.963-3.996l.089-.135c.033-.055.066-.108.103-.159a.84.84 0 011.369.969c-.082.131-.126.202-.179.273-1.097 1.738-2.16 3.168-3.124 4.197-1.509 1.586-4.131 2.658-6.667 3.694-1.758.718-3.417 1.397-4.588 2.185-3.315 2.27-5.611 6.881-6.415 10.445-.403 1.776-.463 3.318-.172 4.46.036.166.074.286.111.407a.837.837 0 01-.555 1.048.769.769 0 01-.247.04z"
        />
        <path
          fill="#75473D"
          d="M49.449 45.061a.838.838 0 01-.836-.798c-.401-8.369 2.9-18.188 6.21-23.178 3.585-5.422 9.15-8.541 15.267-8.553h.003a.839.839 0 01.002 1.676c-5.546.011-10.603 2.856-13.874 7.803-3.164 4.769-6.317 14.159-5.935 22.171a.838.838 0 01-.796.877c-.013.002-.026.002-.041.002zM50.825 97.121a.838.838 0 01-.838-.819c-.115-4.919-.679-45.463.018-48.04a.833.833 0 011.028-.59c.447.12.711.58.59 1.027-.552 2.067-.167 38.683.04 47.565a.837.837 0 01-.818.857h-.02zM54.56 97.4c-.012 0-.024 0-.036-.002a.835.835 0 01-.802-.871l.012-.28c.036-.84.095-2.219.144-4.467.384-14.146.221-32.636.168-38.71-.017-1.843-.017-1.843.003-1.945a.842.842 0 01.984-.662.84.84 0 01.676.866c-.001.13.004.734.013 1.727.054 6.082.216 24.594-.168 38.767-.05 2.261-.11 3.65-.146 4.498l-.012.276a.838.838 0 01-.836.803zM58.594 97.579a.838.838 0 01-.838-.808c-.387-10.799-.204-15.443-.027-19.933.108-2.755.21-5.355.172-9.257-.039-3.818-.174-5.708-.249-6.724a13.251 13.251 0 01-.052-1.044.84.84 0 01.838-.826h.013a.84.84 0 01.826.852c-.003.208.018.479.048.897.076 1.034.214 2.957.253 6.828.038 3.941-.064 6.564-.173 9.34-.176 4.458-.357 9.069.028 19.805a.84.84 0 01-.808.869l-.031.001z"
        />
      </g>
      <g>
        <path
          fill="#75473D"
          d="M71.277 43.097a.839.839 0 01-.839-.837l-.027-18.842c-.251-2.546-.453-4.574-.612-6.179-.516-5.176-.595-5.972-.595-8.166a.838.838 0 011.677 0c0 2.111.078 2.896.586 8 .161 1.605.362 3.634.616 6.262l.032 18.922a.84.84 0 01-.838.84z"
        />
      </g>
      <g>
        <path
          fill="#8DB2C2"
          d="M63.607 11.237a.84.84 0 01-.287-1.627 23.33 23.33 0 016.673-1.369c2.574-.144 5.07.137 7.438.835a.839.839 0 11-.474 1.609 20.17 20.17 0 00-6.871-.77c-2.116.118-4.2.546-6.195 1.271a.827.827 0 01-.284.051z"
        />
      </g>
      <g>
        <path
          fill="#EBB686"
          d="M80.981 50.817l-20.006-.224c1.878 17.891-.414 28.032-4.758 34.009 1.116 11.948 10.23 20.146 14.338 20.799 4.476.714 14.265-9.858 14.83-20.496-5.83-8.235-4.138-21.36-4.404-34.088z"
        />
        <path
          fill="#8DB2C2"
          d="M106.767 96.48c-3.36-1.463-8.964-3.301-11.435-4.272-3.715-1.459-8.08-4.671-9.946-7.304-4.384 7.853-9.823 15.697-14.298 14.985-4.107-.654-10.292-6.435-14.87-15.288-4.509 6.205-13.452 8.995-20.578 11.506-3.551 1.249-3.969 2.053-5.031 5.664-1.947 6.613-4.99 25.708-6.716 38.215h94.189c-2.287-14.285-4.91-33.026-6.635-38.57-1.042-3.347-1.042-3.347-4.68-4.936z"
        />
        <path
          fill="#E0D1C1"
          d="M57.332 94.475a.835.835 0 01-.697-.373c-1.124-1.694-2.092-3.155-2.352-3.515a.84.84 0 011.359-.982c.28.387 1.21 1.788 2.387 3.563a.843.843 0 01-.697 1.307zM61.741 99.649a.833.833 0 01-.609-.263c-.213-.225-2.513-2.681-2.618-2.797a.836.836 0 01.064-1.181.837.837 0 011.184.061 707.62 707.62 0 002.588 2.765.84.84 0 01-.609 1.415zM67.489 104.114a.843.843 0 01-.483-.153 56.107 56.107 0 00-1.044-.716c-.531-.36-1.178-.796-2.354-1.627a.838.838 0 11.967-1.368c1.162.818 1.8 1.251 2.325 1.604.368.249.681.461 1.073.736a.841.841 0 01.202 1.17.835.835 0 01-.686.354zM72.464 105.348c-.939 0-1.815-.288-2.218-.581a.84.84 0 01.987-1.356c.263.171 1.484.463 2.188.042a.836.836 0 011.149.29.836.836 0 01-.289 1.148c-.554.333-1.2.457-1.817.457zM76.949 103.365a.84.84 0 01-.647-1.371c.508-.62.676-.818.885-1.064.22-.261.487-.575 1.266-1.518a.84.84 0 011.181-.114.841.841 0 01.112 1.182c-.786.951-1.057 1.272-1.279 1.534-.205.242-.369.436-.868 1.044a.838.838 0 01-.65.307zM81.232 98.27a.838.838 0 01-.634-1.389c.164-.188.348-.419.609-.752.313-.392.731-.923 1.349-1.672a.838.838 0 111.295 1.066c-.607.738-1.021 1.261-1.329 1.648-.283.358-.481.607-.657.811a.836.836 0 01-.633.288zM85.55 92.547a.83.83 0 01-.521-.184.837.837 0 01-.134-1.177c.315-.399.582-.764.877-1.17.281-.387.588-.806.98-1.317a.835.835 0 011.175-.15.835.835 0 01.152 1.175c-.383.495-.68.903-.951 1.279-.31.426-.59.811-.922 1.228a.834.834 0 01-.656.316z"
        />
        <g>
          <path
            fill="#9EC7D9"
            d="M34.211 99.778h-.019c-.633-.009-1.118-.47-1.47-.869l-.104-.113c-.155-.173-.278-.308-.377-.352a.838.838 0 11.66-1.541c.436.188.714.495.96.766l.107.118c.077.089.142.154.192.202.043-.05.079-.097.117-.146.208-.269.469-.601.855-.869 1.164-.802 2.012.282 2.332.692.052.065.118.148.177.218.16-.122.383-.347.532-.495.366-.366.743-.745 1.194-.949a.838.838 0 01.692 1.528c-.172.078-.465.37-.7.606-.593.594-1.488 1.493-2.502.845-.297-.188-.519-.471-.714-.721a5.263 5.263 0 00-.189-.235c-.126.117-.242.267-.355.41a4.407 4.407 0 01-.358.422c-.29.313-.643.483-1.03.483zM52.16 99.688c-.038 0-.077-.002-.116-.005-.534-.05-.816-.432-1.003-.683-.16-.216-.325-.439-.688-.64-.117.07-.282.189-.404.276-.596.429-1.5 1.075-2.432.545a4.435 4.435 0 01-.421-.288c-.125-.097-.479-.362-.559-.328-.052.011-.244.137-.502.587a.838.838 0 11-1.455-.834c.465-.81.995-1.269 1.618-1.395.841-.184 1.506.327 1.904.629.088.065.169.129.244.172.051-.039.425-.306.625-.449.53-.38 1.189-.851 1.905-.526a3.537 3.537 0 011.407 1.113c.378-.288.983-.847 1.216-1.061a.84.84 0 011.185.046.84.84 0 01-.047 1.185c-1.273 1.176-1.856 1.656-2.477 1.656zM30.526 114.623a.876.876 0 01-.378-.085c-.418-.201-.582-.725-.382-1.144.123-.259 1.027-1.457 2.219-1.983a.864.864 0 01.483-.057c.752.133 1.193.561 1.478.901l.019-.023.18-.24c.454-.611.755-1.014 1.3-1.092.765-.124 1.29.551 1.747 1.131.059.077.132.17.202.256.102-.086.217-.186.32-.275.383-.334.859-.749 1.482-1.144a.838.838 0 11.897 1.417c-.515.327-.921.678-1.278.991-.593.518-1.159 1-1.851.769-.44-.145-.757-.551-1.093-.979a11.007 11.007 0 00-.225-.282c-.052.067-.104.141-.156.21l-.185.247c-.364.484-.786.937-1.385.942-.598.031-.924-.421-1.142-.702-.142-.184-.249-.314-.382-.396-.562.343-1.043.921-1.143 1.081a.794.794 0 01-.727.457zM45.384 114.369a.835.835 0 01-.72-1.263c.742-1.26 1.328-1.81 2.024-1.896.723-.082 1.226.406 1.55.736.101.101.211.212.309.288.124-.107.295-.301.397-.419.318-.362.645-.736 1.118-.829.74-.147 1.312.449 1.815.975.103.107.25.263.371.374.173-.138.365-.336.528-.505.217-.225.419-.423.588-.543a.837.837 0 11.969 1.369c-.104.071-.219.201-.353.34-.343.356-.771.798-1.3 1.024-.824.356-1.483-.343-2.016-.899a9.56 9.56 0 00-.335-.341l-.125.141c-.444.506-1.188 1.355-2.182.937-.428-.177-.733-.485-.978-.732a3.55 3.55 0 00-.196-.191c-.122.111-.364.381-.743 1.023a.833.833 0 01-.721.411zM60.037 114.61a.808.808 0 01-.304-.061c-.414-.171-.629-.612-.479-1.031.129-.358 1.153-1.935 2.115-2.059.756-.077 1.257.403 1.554.7.079.079.193.192.258.236.012-.024.129-.09.322-.284 1.478-1.479 2.63-.366 3.061.055l.022.021c.088-.107.181-.225.255-.318.254-.323.542-.69.861-.97a.844.844 0 011.183.078c.305.35.27.878-.078 1.185-.202.177-.429.465-.649.743-.522.662-1.065 1.348-1.858 1.095-.392-.133-.665-.397-.905-.632-.115-.111-.305-.297-.388-.322.002.004-.11.042-.32.251-1.498 1.498-2.55.448-2.949.053a3.714 3.714 0 00-.167-.164c-.26.229-.662.733-.75.921a.876.876 0 01-.784.503zM30.052 107.029c-.306 0-.644-.129-1.027-.461a.836.836 0 01-.084-1.181.833.833 0 011.09-.155c.083-.085.181-.192.273-.291.287-.312.663-.72 1.195-1.21a.839.839 0 111.136 1.236c-.489.448-.833.825-1.097 1.111-.406.441-.878.951-1.486.951zm.173-1.648zM38.035 107.339a.837.837 0 01-.788-1.124c.25-.69 1.091-1.616 1.903-1.843.448-.127.875-.046 1.203.218.228.184.415.339.571.47l.092.076a7.09 7.09 0 01.987-.998c.351-.297.705-.34.938-.315.601.05.979.5 1.312.896.063.077.147.177.228.265.206-.208.462-.486.627-.669.351-.384.527-.571.673-.683a.838.838 0 111.012 1.337c-.075.065-.249.259-.45.479-.871.952-1.179 1.245-1.541 1.35-.099.028-.204.037-.303.028-.721-.06-1.191-.62-1.534-1.03-.04-.046-.086-.103-.132-.155a5.076 5.076 0 00-.677.76c-.195.261-.44.585-.903.64-.491.053-.82-.207-1.402-.692l-.372-.303c-.234.148-.579.523-.657.74a.835.835 0 01-.787.553zm5.049-1.921l-.001.002.001-.002zM52.286 107.105a.805.805 0 01-.33-.069.823.823 0 01-.441-1.07c.01-.024 1.298-2.411 2.606-2.159.413.076.745.399 1.253.919l.239.245c.083-.092.18-.212.25-.297.377-.465.952-1.168 1.832-.964.473.112.931.546 1.527 1.147.042.04.08.08.115.115.165-.113.402-.339.559-.487a6.18 6.18 0 01.733-.624.838.838 0 11.936 1.391c-.166.111-.338.281-.519.452-.563.53-1.611 1.518-2.633.698a5.803 5.803 0 01-.382-.364 11.023 11.023 0 00-.625-.596c-.08.087-.171.2-.241.286-.366.451-1.224 1.506-2.351.755-.182-.123-.362-.302-.64-.585a17.168 17.168 0 00-.304-.306c-.292.271-.704.799-.811 1.021a.858.858 0 01-.773.492z"
          />
          <g>
            <path
              fill="#9EC7D9"
              d="M30.029 121.323c-.031 0-.063-.002-.094-.004-.637-.045-1.053-.528-1.311-.889a2.75 2.75 0 00-.279-.355c-.066.074-.119.137-.172.2-.249.3-.558.671-1.041.809a.827.827 0 01-1.036-.575.838.838 0 01.575-1.036c.001-.013.129-.168.214-.269.076-.092.151-.184.229-.267.132-.15.604-.698 1.288-.629.744.042 1.267.681 1.595 1.16l.049.065c.063-.062.132-.133.189-.193.381-.398.904-.945 1.716-1.186a.832.832 0 011.042.566.837.837 0 01-.565 1.041c-.384.114-.688.431-.982.738-.352.369-.787.824-1.417.824zM38.17 121.786c-.442 0-.812-.375-.839-.82-.055-.912.984-2.221 1.918-2.412.678-.127 1.18.354 1.624.772.112.107.276.265.407.366.102-.11.223-.262.302-.357.17-.209.333-.404.469-.524.434-.373.842-.415 1.115-.398.673.057 1.101.571 1.442.985.021.027.044.055.07.084.31-.36.778-.904 1.499-1.275a.835.835 0 011.129.36.837.837 0 01-.36 1.129c-.432.223-.732.571-.999.882-.326.378-1.002 1.169-1.87.626-.313-.195-.55-.484-.76-.737-.07-.083-.169-.203-.254-.292-.058.065-.115.139-.177.215-.42.521-.941 1.158-1.712 1.061-.589-.082-1.05-.521-1.457-.909-.079-.074-.181-.17-.269-.246-.171.161-.411.479-.445.64.028.463-.322.825-.785.853-.016-.003-.033-.003-.048-.003zM52.498 121.797a.832.832 0 01-.785-1.124c.158-.428 1.067-1.895 1.926-2.336a.825.825 0 01.844.044c.417.273.731.663.984.979l.012.015.038-.039c.275-.274.654-.651 1.226-1.096a.782.782 0 01.56-.177c.521.027 1.071.406 1.956 1.352.071.071.127.128.175.172l.108-.126c.284-.337.674-.798 1.313-1.19a.843.843 0 011.154.277.84.84 0 01-.276 1.153c-.411.251-.677.564-.912.842-.321.381-.685.811-1.303.83-.602.002-1.068-.382-1.41-.735a9.201 9.201 0 00-.749-.734c-.273.236-.48.443-.659.621-.414.41-1.18 1.172-2.097.379a4.225 4.225 0 01-.443-.493c-.051-.063-.106-.131-.163-.199-.306.358-.638.854-.713 1.048a.847.847 0 01-.786.537zm7.101-2.08zM67.1 121.713a.84.84 0 01-.651-1.365c1.092-1.352 1.692-1.996 2.476-2.048.699-.04 1.166.392 1.712.905l.025.026c.178-.146.414-.332.74-.549.985-.656 1.879.025 2.36.392.078.062.182.14.269.198.221-.122.451-.325.66-.513.229-.203.446-.396.692-.52a.837.837 0 11.749 1.499 3.627 3.627 0 00-.325.273c-.382.339-.903.804-1.589.977a.846.846 0 01-.344.013c-.453-.078-.813-.354-1.131-.596-.146-.111-.391-.299-.487-.317-.273.221-.497.408-.657.542-.854.714-1.343.52-2.055-.148-.207-.194-.409-.385-.53-.476-.321.227-1.02 1.092-1.263 1.393a.83.83 0 01-.651.314z"
            />
          </g>
          <g>
            <path
              fill="#9EC7D9"
              d="M30.333 128.926a.839.839 0 01-.587-1.436c1.229-1.206 1.997-1.669 2.709-1.623.674.038 1.058.507 1.311.817.116.142.208.25.301.327.062-.067.13-.145.199-.221.528-.585.845-.924 1.192-1.052.832-.324 1.431.432 1.833.928.072.089.173.216.262.312.184-.131.46-.366.712-.583.249-.211.538-.458.88-.735a.839.839 0 011.057 1.302c-.33.266-.608.507-.85.709-.911.777-1.516 1.293-2.307.987-.436-.166-.752-.56-1.059-.937-.041-.053-.092-.113-.143-.177l-.332.368c-.594.659-.889.994-1.427.896-.876-.157-1.322-.703-1.617-1.063-.048-.059-.106-.131-.153-.181-.149.063-.547.29-1.394 1.122a.834.834 0 01-.587.24zM45.271 129.092a.84.84 0 01-.678-1.328c.396-.551.628-.804.919-1.123.773-.85 1.541-1.524 2.59-.668.224.179.475.379.671.526.178-.226.439-.521.841-.834.392-.311.769-.339 1.019-.307.642.081 1.048.609 1.375 1.035.059.076.138.179.214.271.287-.215.37-.346.457-.482.11-.175.261-.416.589-.686a.84.84 0 011.18.115.837.837 0 01-.115 1.179c-.12.099-.156.158-.237.284-.242.386-.52.751-1.45 1.318a.852.852 0 01-.619.103c-.625-.139-1.027-.661-1.35-1.08a7.612 7.612 0 00-.217-.275c-.239.217-.379.404-.496.559-.184.247-.435.585-.914.649-.56.069-.962-.241-1.905-.991a5.97 5.97 0 00-.321.329c-.36.396-.533.585-.874 1.057a.83.83 0 01-.679.349zM59.804 128.892a.745.745 0 01-.299-.059c-.414-.168-.633-.604-.485-1.026.178-.506 1.05-1.622 2.154-2.04a.839.839 0 01.555-.015c.448.146.625.321.917.611.087.085.198.194.346.334a4.2 4.2 0 00.099-.114c.286-.333.677-.789 1.331-.937.706-.154 1.254.354 1.74.798.099.09.24.221.354.31.099-.083.218-.194.313-.288.27-.255.604-.573 1.045-.857a.834.834 0 011.158.253.836.836 0 01-.252 1.157c-.307.196-.554.432-.792.661-.336.321-.654.625-1.089.771-.747.254-1.369-.312-1.868-.769-.103-.093-.255-.233-.371-.322-.093.078-.201.205-.295.313-.275.324-.653.763-1.271.798-.405.021-.822-.149-1.213-.516-.183-.17-.313-.299-.416-.401-.014-.014-.027-.026-.039-.04-.429.286-.767.729-.833.871a.885.885 0 01-.789.507z"
            />
          </g>
          <g>
            <path
              fill="#9EC7D9"
              d="M29.921 136.086a.838.838 0 01-.301-.057c-.535-.208-.938-.625-1.262-.958-.107-.111-.254-.265-.363-.354a.75.75 0 00-.048.036c-.294.231-.484.438-.635.601-1.047 1.138-1.753.52-2.819-.417a.853.853 0 01-.546-1.067.834.834 0 011.047-.548c.222.071.421.189.614.364.139.122.361.316.538.459.162-.173.387-.406.708-.665.071-.073.139-.124.184-.156 1.155-.835 2.082.12 2.526.583.114.118.236.242.353.348.222-.195.607-.579 1.216-1.311a.835.835 0 011.18-.107.837.837 0 01.108 1.18c-1.316 1.583-1.876 1.914-2.251 2.03a.82.82 0 01-.249.039zM37.556 136.27a.839.839 0 01-.714-1.277c.81-1.318 1.475-1.913 2.226-1.983.796-.069 1.288.481 1.586.811l.049.055c.72-.769 1.212-1.153 1.813-1.166h.029c.631 0 1.043.421 1.479.865.125.128.268.275.434.43.011.011.021.022.032.031a9.232 9.232 0 011.397-1.215.836.836 0 011.169.194.84.84 0 01-.195 1.17 7.63 7.63 0 00-1.224 1.077c-.807.855-1.395.845-2.33-.037-.185-.173-.341-.335-.481-.477-.101-.103-.216-.223-.305-.303-.111.087-.313.27-.663.659-.35.389-.737.585-1.148.585h-.002c-.623 0-1.012-.428-1.295-.742-.067-.074-.158-.175-.228-.236-.122.086-.419.352-.914 1.159a.834.834 0 01-.715.4zM52.122 136.346a.84.84 0 01-.415-.108.84.84 0 01-.312-1.145c.119-.21 1.359-1.507 1.541-1.638.653-.467 1.18-.419 1.71.144.282.293.467.512.619.692.176-.196.392-.454.558-.652.314-.375.802-.796 1.381-.792.642.013 1.084.479 1.397.884.149.188.26.314.342.4l.104-.122c.293-.345.697-.816 1.346-1.271a.837.837 0 11.965 1.37c-.477.337-.774.684-1.038.991-.342.402-.77.853-1.37.845-.622-.011-1.1-.46-1.67-1.179-.039-.053-.074-.093-.103-.129-.021.021-.043.049-.068.078-.814.975-1.223 1.463-1.875 1.463h-.001c-.573 0-.912-.402-1.239-.792a13.077 13.077 0 00-.292-.341c-.335.341-.807.853-.92.983a.847.847 0 01-.66.319zM66.56 136.275a.838.838 0 01-.744-1.223c.703-1.362 1.323-1.989 2.071-2.098.814-.129 1.382.465 1.754.854.093.097.234.244.331.318.398-.278.62-.526.799-.727.256-.282.935-1.039 1.896-.312.171.128.335.315.523.534.111.129.317.364.466.497.217-.147.491-.446.687-.658.222-.24.431-.468.656-.638a.837.837 0 111.007 1.34c-.131.099-.272.263-.43.433-.415.452-.933 1.014-1.597 1.216-.884.261-1.561-.521-2.056-1.091a1.198 1.198 0 00-.042-.048 5.777 5.777 0 01-1.002.866c-1.149.788-2.058-.166-2.448-.572-.094-.096-.236-.244-.333-.321-.112.095-.379.372-.793 1.175a.837.837 0 01-.745.455z"
            />
          </g>
          <g>
            <path
              fill="#9EC7D9"
              d="M64.475 118.248a.84.84 0 01-.763-.492c-.077-.173-.371-.463-.605-.698-.562-.559-1.501-1.495-.843-2.506.185-.293.467-.514.717-.711a3.63 3.63 0 00.231-.188c-.122-.131-.273-.246-.42-.362-.369-.286-.875-.679-.894-1.349-.018-.664.458-1.166.875-1.531.176-.152.293-.258.374-.343a7.36 7.36 0 00-1.02-1.098.852.852 0 01-.174-1.16.826.826 0 011.132-.216c.237.159 1.427 1.264 1.792 2.131a.837.837 0 01.034.56c-.188.655-.61 1.02-.982 1.345-.11.096-.189.173-.245.229.046.037.096.077.139.109.271.212.61.474.881.867.812 1.153-.318 2.037-.688 2.327a6.104 6.104 0 00-.22.177c.122.16.347.383.496.531.367.366.746.744.949 1.194a.838.838 0 01-.766 1.184zM64.264 132.604a.84.84 0 01-.617-.271c-1.247-1.354-1.711-1.926-1.649-2.595.05-.532.43-.814.682-1.002.216-.159.438-.324.639-.688-.068-.118-.189-.283-.275-.406-.428-.596-1.075-1.497-.544-2.43.073-.129.176-.271.29-.421.095-.127.347-.464.327-.56-.011-.053-.138-.242-.588-.502a.838.838 0 11.834-1.455c.811.465 1.268.993 1.396 1.617.172.837-.329 1.505-.629 1.904-.066.087-.13.168-.172.242l.45.627c.38.528.853 1.188.525 1.905a3.54 3.54 0 01-1.113 1.406c.288.378.847.982 1.063 1.217a.841.841 0 01-.619 1.412zm-.894-4.453h.011-.011zM63.627 140.826a.837.837 0 01-.726-1.255c.11-.193.104-.259.101-.273-.003-.011-.091-.275-.896-.686a.837.837 0 11.761-1.493c.993.504 1.545 1.045 1.741 1.701.224.753-.136 1.379-.253 1.585a.838.838 0 01-.728.421zM49.941 103.392a.836.836 0 01-.675-.34c-.33-.448-.7-.729-1.027-.975-.424-.32-.903-.684-.905-1.318-.002-.597.449-1.022.843-1.323.359-.273.557-.448.665-.558a7.154 7.154 0 00-.251-.211c-.489-.389-1.139-1.002-1.093-1.802.044-.787.702-1.199 1.137-1.471-.29-.273-.693-.597-.847-.674-.442-.139-.663-.6-.524-1.04.138-.441.632-.678 1.075-.54.462.145 1.983 1.306 2.165 2.024.229.896-.558 1.389-.98 1.652a5.068 5.068 0 00-.275.179c.068.082.187.201.39.362.42.339.99.798.979 1.52-.012.743-.651 1.305-1.376 1.854l.009.006c.376.284.892.676 1.365 1.317a.84.84 0 01-.675 1.338zm-1.006-7.675zM50.105 118.178a.838.838 0 01-.709-.389c-.327-.516-.679-.922-.991-1.279-.517-.592-1.006-1.153-.768-1.853.144-.438.549-.755.977-1.091.081-.063.185-.145.281-.225a11.069 11.069 0 00-.206-.155L48.44 113c-.486-.364-.938-.786-.943-1.385-.006-.592.42-.923.702-1.142.183-.145.314-.251.394-.382-.343-.559-.925-1.047-1.076-1.142-.42-.197-.575-.682-.38-1.101.196-.419.721-.592 1.141-.392.351.162 1.493 1.092 1.99 2.221a.841.841 0 01.058.485c-.133.75-.561 1.191-.903 1.478a.108.108 0 01.024.018l.244.181c.609.455 1.011.754 1.088 1.3.109.775-.55 1.29-1.131 1.746-.075.06-.169.132-.253.202.083.102.185.217.274.32.334.382.749.858 1.144 1.482a.839.839 0 01-.708 1.289zM49.71 132.384a.838.838 0 01-.685-.357c-.074-.102-.203-.218-.341-.352-.356-.342-.797-.771-1.024-1.299-.352-.823.343-1.484.9-2.017.097-.095.233-.221.341-.335a4.23 4.23 0 00-.142-.126c-.506-.443-1.352-1.186-.937-2.181.179-.429.487-.732.734-.977.058-.057.133-.131.19-.194-.111-.123-.383-.367-1.024-.744a.84.84 0 01-.296-1.149.833.833 0 011.147-.295c1.261.743 1.81 1.33 1.896 2.024.091.733-.406 1.226-.736 1.55a3.829 3.829 0 00-.289.309c.107.125.303.295.42.396.362.319.737.646.831 1.12.146.74-.451 1.311-.977 1.813-.108.103-.262.252-.374.372.138.175.334.364.503.528.207.198.403.389.545.589a.838.838 0 01-.201 1.168.815.815 0 01-.481.157zm-.891-7.743h.011-.011zM48.966 140.812a.814.814 0 01-.574-.228.827.827 0 01-.036-1.175l.135-.143c-.227-.259-.723-.656-.909-.746a.827.827 0 01-.497-1.065.854.854 0 011.084-.504c.399.142 1.931 1.191 2.049 2.115.096.72-.36 1.196-.632 1.482a.854.854 0 01-.62.264zm-.379-1.414h.011-.011z"
            />
            <g>
              <path
                fill="#9EC7D9"
                d="M71.702 124.964a.842.842 0 01-.7-.376c-.224-.339-.487-.606-.742-.867-.436-.44-.886-.898-.876-1.566.007-.434.205-.831.607-1.215.166-.159.32-.297.458-.416l.14-.125-.007-.007c-.904-.819-1.684-1.526-.85-2.685.099-.139.245-.305.399-.476.063-.069.149-.162.223-.25-.216-.224-.646-.583-.813-.68a.858.858 0 01-.338-1.129.825.825 0 011.088-.37c.151.073 1.622 1.037 1.822 1.978.128.622-.314 1.109-.739 1.579-.084.091-.166.179-.23.259.143.149.377.362.563.531.33.299.708.714.705 1.272-.004.609-.417.973-.854 1.358a10.25 10.25 0 00-.406.369l-.037.035c.086.104.228.248.34.361.281.286.632.645.944 1.116a.839.839 0 01-.236 1.161.818.818 0 01-.461.143zm-.661-2.688zm-.568-5.156h.011-.011zM71.188 139.104c-1.424-1.348-1.845-2.046-1.658-2.71.168-.594.583-.987.887-1.271l.106-.103a8.742 8.742 0 00-.65-.711c-.455-.455-.78-.979-.081-1.743.148-.164.375-.408.686-.897-.065-.106-.625-.524-.896-.633-.414-.168-.643-.64-.496-1.062.147-.422.577-.661 1.006-.535.311.092 1.583.758 1.946 1.734a1.54 1.54 0 01-.15 1.403 8.401 8.401 0 01-.578.802c.177.188.405.44.682.79.792 1.026-.093 1.858-.426 2.172-.119.114-.249.236-.333.35.12.175.403.528 1.063 1.153l-.522.659-.586.602zm-.516-3.898h.011-.011z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M57.336 110.602a.84.84 0 01-.618-.273 17.29 17.29 0 00-1.121-1.107c-.521-.478-.933-.854-.939-1.458-.006-.581.394-1.013.877-1.476.297-.284.328-.422.328-.422a12.052 12.052 0 00-.42-.332c-.374-.292-.841-.657-.898-1.266-.023-.252.021-.634.37-1.028.172-.192.456-.45.718-.685.046-.043.094-.084.138-.124-.26-.288-.738-.686-.958-.816a.852.852 0 01-.303-1.142.825.825 0 011.117-.323c.017.009 1.683 1.059 1.929 2.085a1.14 1.14 0 01-.158.922c-.109.163-.297.333-.648.648-.124.109-.253.225-.368.333l.093.073c.407.316 1.022.796 1.062 1.589.029.572-.246 1.127-.842 1.699-.103.099-.179.175-.236.233.082.078.18.17.273.255.313.288.726.667 1.223 1.208a.84.84 0 01-.619 1.407zm-1.403-7.946h.012-.012zM57.382 124.819a.838.838 0 01-.668-.329c-.065-.075-.259-.247-.477-.448-.956-.873-1.249-1.183-1.353-1.548a.836.836 0 01-.03-.299c.059-.721.62-1.19 1.03-1.533.046-.042.103-.087.157-.135-.32-.343-.569-.53-.761-.675-.261-.196-.585-.44-.639-.904-.059-.5.208-.82.691-1.401l.305-.372c-.148-.233-.525-.577-.742-.656a.84.84 0 01.572-1.577c.69.249 1.616 1.093 1.842 1.902.125.447.047.874-.218 1.202-.182.228-.339.415-.467.57-.027.033-.054.063-.079.095.259.207.602.512.999.987.297.349.336.702.317.937-.051.602-.502.979-.9 1.312a8 8 0 00-.264.229c.211.208.492.465.674.631.38.35.568.524.678.668a.839.839 0 01-.667 1.344zm-1.122-4.043l.001.002-.001-.002zm-.566-3.481h.011-.011zM57.125 139.63a.84.84 0 01-.696-.369c-.112-.166-.282-.341-.452-.521-.531-.561-1.52-1.606-.701-2.631.064-.08.198-.215.363-.381.143-.141.427-.422.599-.627a6.066 6.066 0 00-.286-.24c-.451-.364-1.508-1.221-.754-2.352.122-.181.302-.362.586-.64.087-.086.204-.199.306-.304-.272-.292-.801-.703-1.022-.808-.41-.197-.607-.688-.424-1.103a.822.822 0 011.068-.446c.025.009 2.409 1.275 2.163 2.607-.075.41-.398.743-.918 1.251-.087.088-.174.168-.245.24.091.083.21.182.295.249.465.378 1.168.945.964 1.832-.113.474-.547.933-1.149 1.53a4.07 4.07 0 00-.113.111c.115.164.339.402.487.56.222.233.451.476.625.733a.837.837 0 01-.228 1.163.818.818 0 01-.468.146zm-.883-7.862h.011-.011z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M42.61 96.312a.835.835 0 01-.659-.321c-.404-.512-.742-.841-.988-1.081-.094-.092-.176-.172-.244-.245a.837.837 0 111.211-1.157l.203.2c.264.258.664.646 1.134 1.244a.837.837 0 01-.14 1.177.816.816 0 01-.517.183zM42.718 110.719a.837.837 0 01-.804-.602c-.111-.383-.427-.684-.731-.977-.386-.369-.866-.829-.818-1.511.046-.636.53-1.051.889-1.308.178-.122.291-.217.359-.282-.062-.057-.137-.118-.196-.166-.36-.295-1.312-1.071-.669-2.139.162-.27.379-.49.569-.684.083-.086.167-.171.239-.255-.27-.305-.886-.756-1.121-.861a.838.838 0 01.687-1.528c.359.161 1.805 1.069 2.127 1.989.148.423.056.752-.048.954-.187.364-.453.638-.689.875-.07.072-.141.144-.201.213.055.047.116.097.166.137.37.304.929.76.899 1.505-.033.758-.678 1.286-1.161 1.615l-.064.048c.061.062.132.129.192.188.398.381.943.904 1.181 1.717a.839.839 0 01-.806 1.072zm-1.048-7.76h.011-.011zM42.732 125.095a.838.838 0 01-.746-.454c-.224-.432-.574-.733-.883-1-.378-.322-1.164-1-.629-1.869.198-.314.486-.552.741-.762.084-.07.204-.168.293-.253-.066-.057-.14-.114-.216-.175-.518-.419-1.166-.943-1.06-1.713.08-.589.519-1.05.906-1.455.076-.081.172-.183.249-.271-.163-.172-.481-.41-.641-.445-.479.033-.826-.325-.853-.788-.026-.461.36-.856.822-.884.929-.057 2.221.987 2.412 1.921.126.675-.353 1.18-.775 1.622a6.08 6.08 0 00-.365.406c.111.103.262.225.359.301.21.171.402.335.522.47.375.433.424.846.402 1.115-.058.673-.573 1.101-.988 1.441l-.083.07c.361.311.904.779 1.276 1.498a.839.839 0 01-.743 1.225zM42.697 139.828a.84.84 0 01-.716-.399c-.251-.413-.565-.677-.843-.913-.379-.32-.809-.685-.83-1.303-.02-.599.382-1.065.736-1.408a8.43 8.43 0 00.736-.75c-.238-.274-.445-.481-.623-.661-.41-.41-1.174-1.179-.38-2.094.109-.127.287-.277.495-.444.063-.051.132-.105.2-.162-.359-.306-.854-.638-1.049-.712-.429-.168-.649-.651-.486-1.081s.638-.655 1.069-.491c.427.157 1.896 1.065 2.339 1.924a.841.841 0 01-.044.845c-.272.417-.665.731-.979.984-.004.005-.01.007-.014.011.012.014.025.025.038.038.274.276.651.654 1.097 1.227a.84.84 0 01.176.561c-.029.522-.406 1.068-1.345 1.95a3.472 3.472 0 00-.178.182l.125.107c.336.282.797.674 1.19 1.313a.84.84 0 01-.714 1.276zm-.731-5.037z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M35.533 103.252a.84.84 0 01-.677-.341c-.084-.116-.419-.393-.641-.578-.541-.447-.88-.74-1.047-1.085a.845.845 0 01-.076-.48c.068-.494.399-.924.72-1.341l.157-.206c-.072-.061-.144-.117-.216-.174-.432-.34-1.156-.908-.902-1.758.115-.461.43-.832.768-1.2a.844.844 0 011.186-.049.84.84 0 01.048 1.186c-.074.079-.195.21-.282.328.071.059.153.124.218.175.152.12.304.24.437.364.154.142.388.379.499.714.219.603-.189 1.134-.584 1.644l-.218.288c.12.104.26.219.364.306.368.307.715.595.921.874a.839.839 0 01-.675 1.333zm-1.063-5.528l-.002.009.002-.009zM35.371 118.208a.84.84 0 01-.651-.31c-.267-.33-.505-.609-.71-.85-.778-.912-1.292-1.516-.988-2.306.168-.437.559-.753.938-1.059l.177-.146-.368-.329c-.662-.597-.993-.896-.895-1.433.156-.872.702-1.318 1.063-1.614.058-.045.13-.104.18-.15-.063-.151-.291-.548-1.123-1.396a.837.837 0 111.196-1.174c1.208 1.231 1.662 1.988 1.623 2.709-.037.675-.505 1.057-.815 1.311a2.388 2.388 0 00-.33.301l.222.201c.585.525.923.843 1.05 1.19.32.825-.431 1.432-.927 1.833-.089.072-.215.173-.312.26.132.187.368.461.583.715.213.249.459.537.737.88a.838.838 0 01-.65 1.367zm-.849-6.135v.002-.002zm-.382-1.989h.011-.011zM35.537 132.335a.833.833 0 01-.646-.306.992.992 0 00-.284-.236c-.386-.242-.751-.519-1.319-1.451a.837.837 0 01-.103-.62c.14-.623.662-1.023 1.081-1.348.083-.063.188-.144.275-.219-.215-.237-.403-.377-.559-.495-.247-.183-.585-.435-.647-.913-.072-.558.238-.96.99-1.903a5.486 5.486 0 00-.331-.321l-.083-.076c-.313-.286-.502-.459-.975-.799a.84.84 0 01-.188-1.171.834.834 0 011.17-.188c.549.396.802.627 1.122.92.848.771 1.525 1.539.669 2.587-.179.225-.38.476-.527.672.225.179.521.441.835.841.308.393.336.771.305 1.02-.081.642-.609 1.048-1.035 1.376-.078.059-.179.138-.271.213.214.289.346.37.482.457.176.109.415.261.684.587a.84.84 0 01-.645 1.373zm-1.07-7.314h.011-.011zM34.484 140.826a.837.837 0 01-.599-1.423l.248-.25c.011-.011.022-.021.031-.032-.286-.428-.728-.767-.869-.834-.405-.192-.613-.677-.442-1.09.171-.415.606-.631 1.032-.48.474.173 1.593 1.005 2.031 2.16.068.177.072.37.015.552-.142.443-.331.631-.617.915l-.23.231a.835.835 0 01-.6.251z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M28.178 124.907a.838.838 0 01-.684-.352 7.653 7.653 0 00-1.072-1.219c-.852-.806-.843-1.395.036-2.334.178-.188.336-.341.476-.476.104-.101.223-.217.304-.306a3.121 3.121 0 00-.127-.148 8.925 8.925 0 00-.538-.516c-.397-.369-.588-.756-.584-1.166.005-.624.439-1.009.756-1.29l.001.002c.013-.013.025-.026.04-.039a2.45 2.45 0 00.183-.18c-.009-.015-.021-.03-.037-.05a.84.84 0 01.126-1.18.842.842 0 011.179.128c.687.851.578 1.7-.323 2.521l-.007.006-.012.011-.096.085c.214.197.394.368.544.529 1.238 1.358.382 2.188-.242 2.794-.127.122-.271.263-.426.425l-.031.032c.281.267.712.692 1.213 1.393a.84.84 0 01-.679 1.33zM28.259 139.409a.84.84 0 01-.687-.355c-.335-.476-.683-.776-.991-1.037-.402-.344-.858-.734-.846-1.372.012-.622.461-1.1 1.18-1.67a2.48 2.48 0 00.129-.104l-.078-.068c-.974-.812-1.463-1.221-1.464-1.873 0-.574.404-.913.794-1.24.1-.083.214-.179.34-.29-.34-.337-.849-.806-.979-.917a.84.84 0 01-.23-1.049.835.835 0 011.13-.357c.248.126 1.561 1.408 1.667 1.555.473.661.43 1.173-.141 1.712-.293.281-.513.467-.693.617.195.177.454.394.651.56.376.313.805.755.792 1.38-.012.642-.479 1.085-.884 1.397-.188.148-.315.26-.4.34.04.037.083.073.121.105.344.294.816.698 1.273 1.347a.837.837 0 01-.684 1.319z"
              />
            </g>
          </g>
          <g>
            <path
              fill="#9EC7D9"
              d="M89.047 99.886a.84.84 0 01-.661-1.354c.872-1.121 1.538-1.605 2.223-1.623.75.011 1.131.472 1.383.765.021.025.048.057.073.084.136-.139.298-.331.402-.453.243-.288.437-.516.647-.655.924-.583 1.689.201 2.058.578.148.153.302.311.434.397a.572.572 0 00.06.038c.069-.062.17-.164.247-.243.284-.293.671-.689 1.265-.961a.837.837 0 11.698 1.524c-.309.141-.528.366-.761.604-.425.438-1.213 1.249-2.438.433-.28-.186-.506-.417-.704-.622l-.127-.129c-.031.037-.063.076-.098.115-.479.568-.976 1.155-1.627 1.164h-.019c-.707 0-1.129-.486-1.381-.779-.035-.041-.081-.096-.122-.14-.133.088-.415.321-.89.932a.835.835 0 01-.662.325zM103.268 99.881a.806.806 0 01-.48-.153.823.823 0 01-.22-1.128c.154-.236 1.252-1.425 2.125-1.797a.837.837 0 01.575-.031c.625.192.983.593 1.3.943.001.003.078.085.08.087.07.081.13.142.178.188l.117-.146c.208-.269.469-.601.854-.869 1.165-.802 2.014.282 2.332.692.063.078.146.186.214.26a.839.839 0 01.381 1.622 1.338 1.338 0 01-1.226-.145c-.272-.173-.494-.455-.689-.705a5.302 5.302 0 00-.19-.235c-.126.117-.241.267-.354.41a4.407 4.407 0 01-.358.422c-.295.318-.692.447-1.048.482-.634-.009-1.118-.47-1.47-.869a5.855 5.855 0 00-.354-.373 7.368 7.368 0 00-1.088 1.015.866.866 0 01-.679.33zm7.155-1.875l.001.002-.001-.002zM74.297 114.48a.823.823 0 01-.189-.021c-.452-.099-.732-.569-.633-1.021.099-.456 1.14-2.205 2.199-2.111.139.009.547.033 1.53.917a.493.493 0 00.145.105c-.008-.029.181-.217.291-.33.401-.4 1.233-1.238 2.339-.544.559.33.918.615 1.163.814l.249-.223c.271-.244.635-.572 1.144-.996a.845.845 0 011.182.109.84.84 0 01-.109 1.182c-.487.403-.835.718-1.095.951-.863.776-1.362 1.143-2.381.315a7.944 7.944 0 00-1-.707 3.103 3.103 0 00-.303.282c-.396.396-1.445 1.45-2.745.289a6.445 6.445 0 00-.458-.371c-.206.212-.464.563-.527.722a.807.807 0 01-.802.638zM88.912 114.457a.854.854 0 01-.266-.042c-.441-.139-.678-.635-.537-1.075.146-.463 1.31-1.983 2.025-2.164.899-.231 1.386.559 1.649.982.049.078.119.188.18.274.081-.067.2-.188.362-.39.338-.42.784-1.014 1.521-.979.742.011 1.303.65 1.853 1.375.003-.005.005-.007.009-.009.282-.377.674-.891 1.314-1.364a.839.839 0 11.996 1.35c-.447.33-.727.698-.976 1.026-.319.423-.682.901-1.316.903h-.004c-.596 0-1.02-.45-1.32-.843a5.996 5.996 0 00-.556-.664 5.567 5.567 0 00-.213.252c-.388.488-.968 1.17-1.803 1.093-.785-.046-1.197-.702-1.469-1.139-.273.292-.599.694-.674.849a.8.8 0 01-.775.565zM103.189 114.623a.87.87 0 01-.378-.085c-.418-.201-.582-.725-.383-1.144.125-.259 1.028-1.457 2.22-1.983a.866.866 0 01.484-.057c.753.133 1.193.561 1.477.901.007-.006.012-.015.019-.023l.18-.24c.455-.611.756-1.014 1.302-1.092.764-.124 1.289.551 1.745 1.131.061.077.133.17.203.256.102-.086.218-.186.319-.275.384-.334.859-.749 1.483-1.144a.838.838 0 11.896 1.417c-.516.327-.922.678-1.278.991-.593.518-1.161 1-1.85.769-.44-.145-.758-.551-1.095-.979a9.181 9.181 0 00-.225-.282c-.052.067-.105.141-.156.21l-.185.247c-.364.484-.786.937-1.385.942-.555.031-.924-.421-1.143-.702-.142-.184-.248-.314-.383-.396a4.301 4.301 0 00-1.142 1.081.788.788 0 01-.725.457zM81.183 107.215a.837.837 0 01-.56-1.463c.152-.138.298-.273.436-.404.777-.732 1.66-1.567 2.734-.986.498.269.814.562 1.033.779l.27-.247c.517-.484 1.163-1.078 2.117-.685.328.137.632.392.925.64.077.065.176.146.263.215.131-.119.292-.29.414-.416.362-.384.737-.779 1.161-.981a.839.839 0 11.72 1.515c-.143.065-.47.411-.665.618-.542.572-1.056 1.12-1.747 1.033-.449-.05-.825-.367-1.224-.7a5.936 5.936 0 00-.44-.348c-.097.069-.25.213-.381.333-.12.114-.251.236-.396.362-1.103.959-1.817.234-2.124-.078-.176-.177-.374-.379-.72-.565-.069.05-.502.458-.787.729-.148.14-.304.286-.467.432a.84.84 0 01-.562.217zM95.852 107.28a.81.81 0 01-.41-.109.825.825 0 01-.324-1.115c.01-.018 1.059-1.684 2.086-1.931.33-.08.657-.023.92.157.166.112.334.297.643.643.112.126.229.259.34.375l.074-.094c.316-.406.797-1.021 1.591-1.061.558-.033 1.125.246 1.696.843.098.103.175.179.233.235.079-.083.171-.182.255-.275.288-.314.668-.725 1.207-1.221a.843.843 0 011.185.048.841.841 0 01-.049 1.186c-.496.454-.843.835-1.106 1.123-.48.522-.858.933-1.459.938h-.014c-.576 0-1.003-.395-1.463-.875-.284-.297-.422-.328-.423-.328-.03.033-.22.275-.332.419-.292.374-.657.842-1.267.898-.242.021-.634-.022-1.027-.372a9.214 9.214 0 01-.692-.723 3.976 3.976 0 00-.116-.131c-.288.26-.684.738-.816.959a.858.858 0 01-.732.411zM110.7 107.344a.84.84 0 01-.787-1.127c.321-.873 1.599-2.235 2.744-1.831a.836.836 0 01.51 1.069.846.846 0 01-.94.546c-.218.096-.64.523-.739.793a.839.839 0 01-.788.55z"
            />
            <g>
              <path
                fill="#9EC7D9"
                d="M81.481 121.62a.814.814 0 01-.304-.059.825.825 0 01-.476-1.061c.119-.318.521-.97 1.089-1.36.628-.437 1.381-.692 2.634.397.228.2.332.211.333.211.088-.017.323-.257.449-.386.389-.394 1.417-1.435 2.676-.323.268.235.523.463.7.605l.087-.093c.256-.266.644-.67 1.253-1.146a.839.839 0 011.031 1.322 9.671 9.671 0 00-1.075.987c-1.21 1.257-1.844.698-3.103-.415l-.064-.052a3.728 3.728 0 00-.311.292c-.469.476-1.565 1.592-3.08.26-.374-.325-.523-.36-.53-.362.045.011.003.048-.045.081-.229.156-.436.48-.479.583a.86.86 0 01-.785.519zM96.14 121.741a.841.841 0 01-.765-1.183c.163-.36 1.072-1.806 1.99-2.127.42-.146.751-.057.954.051.364.186.636.452.875.688.071.07.144.142.212.201l.137-.164c.304-.371.769-.887 1.505-.899.758.032 1.285.677 1.615 1.159l.048.063c.063-.061.131-.132.188-.19.382-.398.904-.943 1.717-1.181a.837.837 0 11.47 1.609c-.383.111-.684.428-.977.73-.368.387-.851.878-1.51.817-.636-.043-1.052-.528-1.308-.887a2.866 2.866 0 00-.284-.36c-.056.063-.116.138-.166.196-.291.36-1.071 1.313-2.137.671-.271-.164-.491-.38-.685-.57-.084-.082-.171-.168-.253-.24-.306.271-.757.887-.863 1.122a.836.836 0 01-.763.494zM110.838 121.789c-.438 0-.809-.371-.84-.814-.063-.894.993-2.229 1.918-2.424.662-.12 1.172.35 1.613.771.115.109.284.271.416.374.034-.035.077-.081.129-.14l.21-.271a.834.834 0 011.176-.151.837.837 0 01.152 1.175l-.249.318c-.286.326-.817.904-1.529.816-.582-.069-1.048-.515-1.46-.907-.077-.072-.175-.166-.261-.242-.174.164-.411.478-.444.635.032.461-.313.825-.775.86h-.056z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M74.049 129.099a.838.838 0 01-.711-1.278c.22-.354.838-1.084 1.375-1.563 1.09-.962 1.748-.438 2.56.412.088.092.155.15.203.188.076-.08.174-.202.244-.292.217-.273.464-.583.812-.819 1.153-.772 2.088.318 2.539.841.058.068.113.134.169.194.066-.069.139-.153.2-.223.32-.364.719-.818 1.304-1.151a.836.836 0 011.142.317.836.836 0 01-.316 1.142c-.338.191-.607.5-.868.797-.383.437-.778.889-1.408.92-.366.025-.736-.127-1.062-.435-.139-.129-.282-.295-.432-.468-.112-.129-.299-.347-.432-.461a3.931 3.931 0 00-.334.39c-.316.397-.749.94-1.464.974-.54.02-1.005-.225-1.51-.756-.109-.113-.2-.205-.273-.277-.439.399-.908.967-1.022 1.153a.846.846 0 01-.716.395zM88.888 129.088a.835.835 0 01-.392-.096.842.842 0 01-.35-1.134c.663-1.253 1.288-1.864 2.03-1.986.859-.148 1.479.443 1.932.871.13.122.281.265.411.362.06-.072.125-.154.177-.22.276-.354.589-.756 1.056-.926.622-.224 1.147.181 1.653.574.086.065.197.152.305.229l.316-.38c.299-.36.581-.701.85-.904a.84.84 0 011.175.164.841.841 0 01-.163 1.175c-.114.085-.39.418-.57.635-.458.551-.756.898-1.104 1.063a.803.803 0 01-.468.075c-.507-.065-.944-.404-1.365-.732-.06-.046-.129-.101-.198-.149a6.628 6.628 0 00-.164.209c-.338.435-.908 1.163-1.748.917-.543-.146-.953-.532-1.313-.873-.161-.151-.427-.404-.539-.435.004.013-.284.161-.788 1.116a.844.844 0 01-.743.445zm3.825-1.871c.001.002.004.002.005.002l-.005-.002zM102.997 128.926a.837.837 0 01-.587-1.436c1.23-1.206 1.991-1.669 2.708-1.623.675.038 1.059.507 1.312.817.116.142.207.25.301.327.063-.067.13-.145.198-.221.53-.585.846-.924 1.193-1.052.833-.324 1.431.432 1.832.928.072.089.174.216.263.312.184-.131.46-.366.712-.583.249-.211.538-.458.88-.735a.839.839 0 011.057 1.302c-.33.266-.607.507-.85.709-.911.777-1.516 1.293-2.307.987-.435-.166-.752-.56-1.059-.937-.041-.053-.092-.113-.144-.177l-.331.368c-.594.659-.891.994-1.428.896-.877-.157-1.321-.703-1.616-1.063a4.37 4.37 0 00-.153-.181c-.148.063-.547.29-1.395 1.122a.831.831 0 01-.586.24z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M81.101 136.357a.823.823 0 01-.46-.141.833.833 0 01-.239-1.159c.933-1.417 1.716-2.06 2.542-2.083.877.016 1.409.67 1.75 1.129.018.023.038.053.058.078.045-.045.089-.089.126-.129.507-.523 1.199-1.244 2.067-.921.354.134.674.422 1.013.729.088.08.213.194.317.279.225-.194.557-.601.734-.818.143-.175.278-.339.398-.472a.84.84 0 011.243 1.126c-.104.114-.219.256-.342.406-.661.811-1.42 1.727-2.368 1.474-.398-.109-.743-.421-1.108-.753-.093-.083-.224-.203-.331-.293-.132.111-.302.288-.417.406-.438.454-.894.915-1.519.825-.586-.087-.936-.559-1.218-.938-.113-.152-.301-.406-.397-.457.001.019-.379.164-1.148 1.332a.835.835 0 01-.701.38zm3.865-1.918zM95.754 136.289a.84.84 0 01-.664-1.35l.208-.276c.46-.621.982-1.321 1.772-1.404.297-.031.739.018 1.193.421.143.127.362.321.539.466.203-.219.497-.521.955-.856 1.104-.804 2.024.157 2.468.618.113.118.235.244.353.35.221-.195.606-.577 1.216-1.313a.838.838 0 011.291 1.07c-1.318 1.592-1.884 1.924-2.265 2.037a.838.838 0 01-.546-.021c-.533-.208-.935-.625-1.257-.958-.108-.113-.256-.27-.364-.357-.325.25-.524.466-.686.641-1.035 1.12-1.731.54-2.765-.373-.161.146-.402.472-.557.679l-.227.302a.836.836 0 01-.664.324zM110.219 136.265a.836.836 0 01-.713-1.277c.807-1.318 1.472-1.91 2.224-1.98.815-.078 1.289.483 1.588.814l.048.053c.245-.264.428-.442.594-.587a.658.658 0 01.092-.07c1.25-1.05 2.075-.214 2.626.346.128.128.272.274.442.434.104.099.174.16.223.201a.838.838 0 01.252 1.62c-.709.269-1.235-.234-1.622-.599-.185-.172-.346-.336-.487-.479-.097-.097-.209-.21-.295-.289-.028.021-.064.053-.107.09-.027.026-.057.048-.087.07-.152.142-.3.295-.467.484-.357.397-.743.596-1.155.596h-.001c-.625 0-1.014-.43-1.299-.744-.063-.07-.156-.175-.227-.238-.123.086-.42.352-.911 1.155a.844.844 0 01-.718.4z"
              />
            </g>
          </g>
          <g>
            <path
              fill="#9EC7D9"
              d="M78.881 118.164a.838.838 0 01-.677-.343l-.486-.65c-.817-1.083-1.313-1.737-.357-2.878.279-.336.541-.648.665-.829a8.18 8.18 0 00-.2-.24c-.604-.69-1.082-1.235-.415-2.184.107-.15.229-.321.365-.624.026-.212-.527-.854-.886-1.021a.835.835 0 01-.409-1.111.84.84 0 011.112-.41c.771.355 2.356 1.791 1.713 3.228a4.949 4.949 0 01-.43.772c.081.098.171.201.214.249 1.152 1.334.689 1.889-.431 3.231-.044.05-.075.09-.1.122.099.157.3.424.497.686.144.189.31.411.498.669a.836.836 0 01-.673 1.333zm-.775-4.587h.013-.013zM78.906 132.765a.837.837 0 01-.694-.366 5.74 5.74 0 00-.814-.945c-1.051-1.037-.995-1.74.251-3.127.295-.327.32-.474.321-.476-.025.03-.255-.116-.389-.201-.405-.256-.96-.607-1.053-1.281-.062-.459.11-.907.527-1.365.122-.133.239-.251.346-.356a7.18 7.18 0 00.172-.177c-.098-.135-.329-.397-.874-.877a.839.839 0 111.11-1.258c.957.843 1.479 1.432 1.499 2.129.02.629-.374 1.022-.723 1.369-.087.087-.182.182-.279.287.058.04.12.08.17.109.418.265 1.051.665 1.155 1.425.079.566-.16 1.151-.733 1.792-.296.33-.438.52-.506.627.053.057.123.126.184.188a7.45 7.45 0 011.023 1.194.839.839 0 01-.693 1.309zm-1.263-8.181h.012-.012zM78.529 140.826a.839.839 0 01-.791-1.118c-.498-.799-1.018-1.465-1.102-1.555-.345-.308-.356-.821-.049-1.166.309-.345.854-.36 1.202-.05.232.205 1.05 1.316 1.62 2.293a.837.837 0 01.077.665 1.99 1.99 0 01-.271.572.825.825 0 01-.686.359zM115.396 125.097a.835.835 0 01-.746-.456c-.222-.43-.572-.731-.883-.998-.378-.324-1.169-1.002-.626-1.873.189-.31.481-.552.738-.765.084-.067.2-.166.287-.248l-.006-.007-.213-.175c-.491-.397-1.164-.941-1.047-1.719.079-.564.501-1.015.874-1.41l.21-.228a.838.838 0 011.256 1.112l-.246.267a6.516 6.516 0 00-.34.382c.106.099.253.217.347.293l.247.203c.088.074.168.152.235.221.154.175.241.306.315.454a.98.98 0 01.068.194c.043.14.063.272.063.404-.015.748-.573 1.211-.982 1.55l-.09.074c.362.311.911.779 1.282 1.502a.838.838 0 01-.743 1.223zm-.828-2.448z"
            />
            <path
              fill="#9EC7D9"
              d="M114.377 117.147a.838.838 0 01-.519-.182c-.225-.177-.405-.258-.457-.269-.458.024-.822-.334-.843-.799-.021-.463.37-.852.833-.873.598-.029 1.196.382 1.507.626a.838.838 0 01-.521 1.497zM115.361 139.828a.841.841 0 01-.717-.399c-.251-.413-.565-.677-.843-.913-.378-.32-.809-.685-.829-1.303-.021-.599.381-1.065.735-1.408a8.368 8.368 0 00.735-.75c-.237-.274-.445-.481-.623-.661-.409-.41-1.174-1.179-.38-2.094.109-.127.287-.277.494-.444.063-.051.133-.105.2-.162-.358-.306-.854-.638-1.049-.712a.845.845 0 01-.486-1.081.83.83 0 011.07-.491c.427.157 1.896 1.065 2.339 1.924a.841.841 0 01-.044.845c-.273.417-.665.731-.979.984-.005.005-.01.007-.015.011.012.014.025.025.039.038.273.276.65.654 1.097 1.227.125.161.188.36.176.561-.029.522-.405 1.068-1.346 1.95a4.532 4.532 0 00-.178.182l.127.107c.335.282.796.674 1.189 1.313a.84.84 0 01-.712 1.276zm-.732-5.037z"
            />
            <g>
              <path
                fill="#9EC7D9"
                d="M108.197 103.252a.838.838 0 01-.677-.341c-.084-.116-.42-.393-.641-.578-.541-.447-.88-.74-1.047-1.085a.837.837 0 01-.077-.48c.069-.494.399-.924.721-1.341.048-.061.104-.135.157-.206-.072-.061-.145-.117-.216-.174-.433-.34-1.156-.908-.903-1.758.131-.508.495-.899.815-1.244.315-.341.862-.379 1.201-.063.34.316.375.827.062 1.168-.126.135-.264.282-.356.406.071.059.151.122.216.173.152.12.306.24.438.364.154.142.388.379.498.714.22.603-.188 1.134-.584 1.644-.063.081-.143.188-.217.288.12.104.26.219.363.306.368.307.715.595.922.874a.84.84 0 01-.179 1.172.848.848 0 01-.496.161zm-1.064-5.522l-.003.009.003-.009zM108.034 118.208a.84.84 0 01-.65-.31c-.268-.33-.505-.609-.711-.85-.778-.912-1.291-1.516-.988-2.306.169-.437.56-.753.938-1.059.05-.042.113-.095.177-.146l-.368-.329c-.661-.597-.993-.896-.895-1.433.155-.872.702-1.318 1.063-1.614.058-.045.129-.104.18-.15-.063-.151-.291-.548-1.122-1.396a.837.837 0 01.011-1.185.841.841 0 011.186.011c1.207 1.231 1.662 1.988 1.622 2.709-.037.675-.506 1.057-.815 1.311a2.388 2.388 0 00-.33.301l.223.201c.585.525.923.843 1.051 1.19.32.825-.432 1.432-.928 1.833-.089.072-.214.173-.312.26.132.187.367.461.583.715.213.249.46.537.736.88a.838.838 0 01-.651 1.367zm-.847-6.135v.002-.002zm-.384-1.989h.011-.011zM108.2 132.335a.833.833 0 01-.646-.306.996.996 0 00-.285-.236c-.385-.242-.751-.519-1.318-1.451a.842.842 0 01-.103-.62c.14-.623.661-1.023 1.08-1.348.084-.063.188-.144.275-.219-.215-.237-.402-.377-.558-.495-.248-.183-.586-.435-.647-.913-.073-.558.237-.96.989-1.903a5.717 5.717 0 00-.33-.321l-.084-.076c-.313-.286-.502-.459-.974-.799a.838.838 0 11.982-1.359c.55.396.803.627 1.123.92.848.771 1.524 1.539.669 2.587-.18.225-.38.476-.527.672.225.179.521.441.835.841.309.393.336.771.305 1.02-.081.642-.609 1.048-1.035 1.376-.077.059-.179.138-.271.213.214.289.346.37.482.457.176.109.415.261.685.587a.84.84 0 01-.647 1.373zm-1.069-7.314h.011-.011zM107.147 140.826a.837.837 0 01-.599-1.423l.247-.25.032-.032c-.286-.428-.729-.767-.869-.834-.405-.192-.614-.677-.442-1.09.172-.415.607-.631 1.032-.48.474.173 1.594 1.005 2.032 2.16.067.177.071.37.014.552-.142.443-.331.631-.617.915l-.23.231a.833.833 0 01-.6.251z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M100.93 95.896a.825.825 0 01-.566-.22c-.116-.107-.262-.225-.417-.352-.412-.336-.879-.719-1.174-1.132a.84.84 0 01.195-1.17.835.835 0 011.169.197c.165.231.557.55.87.805.183.151.354.29.49.416a.84.84 0 01-.567 1.456zM100.864 110.309a.846.846 0 01-.536-.191c-1.591-1.324-1.921-1.888-2.033-2.265a.825.825 0 01.02-.544c.208-.534.625-.937.961-1.26.111-.107.266-.255.355-.364-.251-.326-.465-.522-.641-.686-1.121-1.033-.539-1.729.373-2.765-.146-.161-.471-.401-.68-.557l-.302-.228a.838.838 0 111.025-1.327l.278.207c.617.461 1.319.98 1.399 1.771.031.295-.017.739-.421 1.194-.125.142-.319.362-.463.539.218.203.52.498.855.957.804 1.095-.157 2.021-.618 2.465-.118.115-.245.237-.35.355.192.219.574.601 1.313 1.214a.84.84 0 01-.535 1.485zm-1.434-7.983h.011-.011zM100.844 124.909a.836.836 0 01-.683-.352 7.634 7.634 0 00-1.078-1.225c-.853-.806-.844-1.394.038-2.33.173-.183.335-.341.477-.479.103-.102.222-.217.303-.307-.087-.11-.271-.313-.658-.661-.39-.352-.585-.737-.587-1.149 0-.624.429-1.015.743-1.299.074-.065.175-.156.235-.227-.085-.123-.352-.42-1.158-.912a.84.84 0 01.878-1.43c1.318.81 1.912 1.475 1.981 2.225.074.786-.479 1.288-.811 1.588l-.054.047c.769.722 1.153 1.213 1.165 1.814.014.648-.413 1.066-.864 1.509-.129.125-.274.268-.43.434l-.031.032c.283.269.714.694 1.215 1.397a.838.838 0 01-.681 1.325zm-1.173-7.963h.011-.011zM100.924 139.409a.841.841 0 01-.688-.355c-.335-.476-.684-.776-.991-1.037-.401-.344-.858-.734-.846-1.372.012-.622.46-1.1 1.18-1.67.053-.039.094-.074.129-.104l-.077-.068c-.974-.812-1.463-1.221-1.464-1.873 0-.574.403-.913.794-1.24.1-.083.215-.179.34-.29-.34-.337-.85-.806-.979-.917a.84.84 0 01-.23-1.049.836.836 0 011.131-.357c.247.126 1.561 1.408 1.666 1.555.473.661.43 1.173-.14 1.712-.294.281-.514.467-.693.617.194.177.454.394.651.56.375.313.805.755.792 1.38-.013.642-.48 1.085-.886 1.397-.188.148-.313.26-.398.34.04.037.083.073.121.105.344.294.816.698 1.272 1.347a.837.837 0 01-.684 1.319z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M93.677 103.411a.836.836 0 01-.628-.284 17.216 17.216 0 00-.806-.833c-.608-.597-1.087-1.067-1.092-1.765-.003-.41.18-.804.539-1.166.334-.334.535-.555.656-.698a4.685 4.685 0 01-1.272-1.452.834.834 0 01-.049-.718c.224-.566.673-.957 1.032-1.27.082-.071.191-.166.275-.246-.147-.127-.466-.352-1.15-.684a.84.84 0 01.732-1.509c1.444.7 2.074 1.283 2.171 2.014.105.794-.493 1.313-.929 1.691-.116.1-.239.207-.344.314.213.262.425.428.621.579.296.229.699.543.735 1.104.038.613-.366 1.129-1.286 2.052.115.146.343.369.533.557.264.259.567.558.887.917a.838.838 0 01-.072 1.184.815.815 0 01-.553.213zm-1.23-8.307h.012-.012zM93.713 118.128a.837.837 0 01-.75-.465c-.174-.348-.506-.641-.827-.922-.513-.45-1.58-1.389-.609-2.565a5.01 5.01 0 01.761-.723l.007-.007c-.004-.004-.009-.006-.013-.012-.836-.615-1.438-1.059-1.47-1.739-.028-.592.378-.955.77-1.304.199-.18.453-.404.737-.719-.233-.275-1.035-.935-1.239-1.067a.85.85 0 01-.271-1.142.832.832 0 011.11-.311c.245.136 1.405 1.053 1.785 1.57.545.749.54 1.304-.007 1.922-.426.484-.756.779-.997.995-.001.002-.002.002-.003.002.203.166.462.356.576.441.406.294.88.717.897 1.334.018.642-.446 1.024-.821 1.332a4.285 4.285 0 00-.456.41c.097.099.242.228.35.32.401.354.899.793 1.22 1.433a.837.837 0 01-.375 1.125.805.805 0 01-.375.092zm-1.255-8.247h.012-.012zM93.56 132.043a.833.833 0 01-.594-.247c-.472-.475-.817-.749-1.07-.952-.35-.28-.68-.542-.72-1.021-.041-.488.233-.795.581-1.184.171-.19.402-.448.692-.818a15.035 15.035 0 00-.151-.109c-.39-.273-.921-.648-1.022-1.3-.043-.271-.021-.688.325-1.148.266-.354.506-.607.691-.79-.313-.28-.715-.575-.861-.63-.418-.158-.67-.626-.533-1.051.139-.427.558-.676.985-.563.67.181 1.656 1.084 1.862 1.312.894.98.186 1.675-.155 2.007-.156.154-.35.34-.567.617.077.062.174.129.242.177.391.278.879.621.975 1.231.04.25.022.634-.287 1.044a16.7 16.7 0 01-.856 1.042c.26.21.613.509 1.058.954a.84.84 0 01-.002 1.186.852.852 0 01-.593.243zm-.997-7.306h.012-.012zM92.536 140.826a.839.839 0 01-.539-1.481c.085-.072.201-.168.301-.26-.151-.164-.488-.479-1.181-.991-.271-.201-.385-.284-.485-.437a.838.838 0 011.299-1.048l.184.137c1.016.754 2.004 1.568 1.964 2.538a.826.826 0 01-.094.354c-.212.406-.583.718-.91.991a.818.818 0 01-.539.197zm.705-1.576h.011-.011z"
              />
            </g>
            <g>
              <path
                fill="#9EC7D9"
                d="M86.376 110.92a.84.84 0 01-.753-.468c-.073-.12-.353-.467-.633-.823-.43-.545-.699-.891-.821-1.103-.625-1.082.431-2.029.997-2.539l.074-.067a3.167 3.167 0 00-.099-.08c-.294-.237-.626-.505-.903-.846-.592-.727-.444-1.472.437-2.216.104-.089.279-.238.318-.308-.02 0-.149-.356-1.171-1.101a.839.839 0 01.989-1.354c1.253.913 1.823 1.665 1.851 2.438.029.813-.556 1.308-.905 1.603-.019.015-.037.033-.059.051.15.147.325.288.496.425.321.261.626.507.832.825a.755.755 0 01.078.149c.288.732-.324 1.286-.818 1.727-.167.15-.453.408-.58.578.143.197.411.537.603.782.52.659.725.929.819 1.118a.84.84 0 01-.752 1.209zM86.339 125.023a.843.843 0 01-.637-.295c-.235-.275-.542-.505-.838-.728-.509-.382-.989-.745-1.065-1.354-.03-.234-.002-.588.289-.95.168-.208.333-.345.507-.491.149-.122.335-.277.59-.542-.063-.05-.134-.103-.19-.146-.414-.309-1.672-1.245-.675-2.655l.2-.275c.091-.125.235-.32.332-.47-.185-.196-.653-.604-.859-.705a.844.844 0 01-.393-1.12.834.834 0 011.113-.392c.351.165 1.761 1.153 1.871 2.108.057.493-.234.919-.715 1.571l-.181.25c-.057.08-.067.12-.068.12.039-.033.246.126.375.223.384.286.909.679.964 1.352.036.438-.146.869-.541 1.277-.327.34-.563.537-.75.693l-.007.005.21.159c.334.252.75.563 1.104.979a.835.835 0 01-.092 1.181.822.822 0 01-.544.205zm-.943-2.275zm-.088-2.227zm-.389-3.319h.011-.011zM86.531 139.844a.838.838 0 01-.576-.229 51.713 51.713 0 00-.992-.917c-.791-.721-1.117-1.018-1.131-1.559-.011-.482.286-.779.524-1.018.175-.172.391-.389.643-.767.013-.118-.229-.327-.373-.454-.42-.367-1.296-1.131-.732-2.178.154-.285.404-.519.671-.764a7.63 7.63 0 00.258-.246 7.733 7.733 0 00-1.124-1.111c-.403-.229-.52-.725-.29-1.129.227-.402.76-.53 1.167-.299.02.011 2.058 1.49 2.047 2.659a.815.815 0 01-.071.327c-.179.411-.534.74-.849 1.028a8.87 8.87 0 00-.229.219c.077.073.177.163.255.229.461.404 1.54 1.348.664 2.653-.252.376-.482.64-.667.832l.365.336c.268.243.602.546 1.017.938a.841.841 0 01-.577 1.45zm-1.57-7.906h.012-.012z"
              />
            </g>
          </g>
        </g>
        <g>
          <path
            fill="#7BA0B0"
            d="M106.689 140.826a.839.839 0 01-.839-.825c-.042-2.892-.262-5.889-.495-9.063-.44-6.007-.896-12.218-.146-18.153.358-2.838 1.03-5.435 1.621-7.723.723-2.795 1.347-5.207 1.347-7.543a.839.839 0 111.676 0c0 2.55-.68 5.179-1.398 7.962-.607 2.353-1.236 4.78-1.582 7.514-.727 5.771-.277 11.895.155 17.821.235 3.198.457 6.22.501 9.161a.838.838 0 01-.826.85l-.014-.001zM36.675 140.826a.838.838 0 01-.838-.816c-.063-2.443-.036-4.875-.01-7.228.072-6.471.14-12.583-1.507-19.175a.822.822 0 01-.025-.202c-.003-.291-.374-1.549-.7-2.658-.946-3.214-2.375-8.074-2.464-12.373a.839.839 0 01.821-.855c.509.026.846.359.856.82.083 4.077 1.475 8.807 2.396 11.937.479 1.627.729 2.494.763 3.01 1.679 6.771 1.607 13.249 1.537 19.518-.026 2.336-.053 4.753.01 7.163a.837.837 0 01-.816.86l-.023-.001z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#EBB686"
          d="M88.741 46.059c.089-.112 1.169-2.269 3.158-3.708 4.087-2.921 9.281 3.587-4.172 9.489l1.014-5.781zM53.344 46.355c-.762-3.051-3.769-4.948-5.622-4.705-2.779.365-3.886 6.642 6.903 10.649l-1.281-5.944z"
        />
        <path
          fill="#D99467"
          d="M88.448 49.037a.829.829 0 01-.477-.15.826.826 0 01-.221-1.138c.284-.424 2.543-2.671 3.705-3.315.362-.204.462-.248 1.498-.64.434-.158.918.056 1.081.489s-.056.917-.488 1.081c-.98.369-1.016.389-1.209.498-.935.52-2.972 2.528-3.202 2.832a.86.86 0 01-.687.343zM53.008 48.658a.84.84 0 01-.71-.391l-.092-.146c-1.029-1.633-1.273-2.022-3.317-2.753a.838.838 0 11.566-1.578c2.588.927 3.051 1.663 4.17 3.439l.092.144a.84.84 0 01-.709 1.285z"
        />
        <path
          fill="#F2C296"
          d="M54.313 35.591c8.307-8.843 12.89-1.555 16.936-12.174 5.054 10.553 7.777 4.282 17.038 13.708 1.396 1.423 2.022 3.147 2.022 5.095 0-4.096.438 26.939-16.321 30.284-14.006 2.771-22.896-16.96-22.158-31.716a7.353 7.353 0 011.837-4.487c.193-.219.408-.456.646-.71z"
        />
        <path
          fill="#4D2323"
          d="M60.975 43.376a1.117 1.117 0 01-1.109-.985 28.879 28.879 0 00-.213-1.544 1.12 1.12 0 012.199-.408c.084.456.181 1.239.235 1.687a1.12 1.12 0 01-1.112 1.25zM79.026 43.255c-.617 0-1.117-.5-1.117-1.118v-1.495a1.117 1.117 0 112.235 0v1.495a1.116 1.116 0 01-1.118 1.118z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#8F5548"
            d="M76.521 37.904a.826.826 0 01-.575-.228c-.321-.312-.357-.807-.061-1.143.222-.251 1.027-.819 1.579-1.078 1.768-.82 3.019-.305 4.353.723a.838.838 0 11-1.023 1.329c-1.112-.854-1.672-.971-2.62-.532-.388.18-.948.59-1.054.69a.863.863 0 01-.599.239zM58.075 37.962a.84.84 0 01-.642-1.379c1.84-2.182 3.843-1.609 5.381-.865a.84.84 0 01-.729 1.511c-1.597-.773-2.447-.661-3.368.436a.84.84 0 01-.642.297z"
          />
        </g>
        <g>
          <path
            fill="#E6A57A"
            d="M70.765 55.078c-.045 0-.091 0-.137-.003-1.173-.067-2.637-.938-3.078-1.828-.221-.443-.205-.909.042-1.276.263-.391.697-.558 1.143-.616.003-.528.014-1.089.026-1.675.059-2.892.132-6.492-.834-8.921a.84.84 0 01.469-1.089.84.84 0 011.089.47c1.091 2.743 1.014 6.531.952 9.574a67.241 67.241 0 00-.021 2.45.84.84 0 01-.774.852c.323.195.724.366 1.073.386.524.05.86-.322 1.426-.885l.289-.286a.838.838 0 111.162 1.21l-.266.262c-.617.614-1.38 1.375-2.561 1.375z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#ED7278"
            d="M77.64 55.538c-.396 3.37 4.997 2.97 4.406-.48-.347-1.948-4.031-2.699-4.406.48zM58.695 55.883c.126 3.506 5.574 1.327 4.266-1.212-.823-1.587-4.375-1.803-4.266 1.212z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#F26D57"
            d="M70.895 62.284a5.03 5.03 0 01-.21-.004c-1.413-.057-2.759-.7-3.601-1.72a.84.84 0 011.294-1.067c.541.657 1.43 1.073 2.375 1.112 1.002.036 1.947-.351 2.674-1.101a.84.84 0 011.205 1.166c-1.013 1.046-2.333 1.614-3.737 1.614z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar08: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#66353D"
        d="M82.721 57.381l-24.813-.377c-.087 13.874 1.561 25.283-6.188 32.737 7.265 5.958 17.362 7.558 26.173 5.179 4.099-1.109 7.176-3.012 10.142-5.393-4.574-5.333-6.264-14.83-5.314-32.146z"
      />
      <path
        fill="#DE9E3E"
        d="M88.033 89.527c-2.966 2.381-6.043 4.283-10.142 5.393-8.811 2.379-18.908.779-26.173-5.179-2.283 2.196-5.277 4.051-9.23 5.521-8.604 3.209-14.535 3.125-18.888 4.923-2.675 1.103-4.753 9.362-6.493 20.044 65.893-7.132 80.045 9.458 108.569 1.451-1.306-9.972-2.997-18.553-5.196-21.494-7.926-5.677-23.554-.284-32.447-10.659z"
      />
      <path
        fill="#6683B3"
        d="M17.108 120.229c-.966 5.94-1.817 12.531-2.608 19.068h113.059c-.517-5.792-1.136-11.928-1.882-17.617-28.524 8.007-42.676-8.583-108.569-1.451z"
      />
      <path
        fill="#E0D1C1"
        d="M70.715 101.499c-8.192 0-16.882-2.765-23.66-7.972a.828.828 0 111.009-1.311c10.323 7.928 25.235 9.951 35.46 4.818 2.06-1.031 4.751-2.804 7.58-4.992a.828.828 0 111.014 1.308c-2.912 2.252-5.7 4.086-7.852 5.162-4.007 2.013-8.693 2.987-13.551 2.987z"
      />
      <path
        fill="#5B73A3"
        d="M111.778 140.125h-.002a.826.826 0 01-.826-.831c.021-10.754 2.891-21.332 5.668-31.563l.662-2.447c.491-1.781 1.035-3.848 1.305-5.874.059-.455.484-.786.928-.713a.828.828 0 01.712.928c-.281 2.133-.843 4.266-1.348 6.096l-.662 2.444c-2.746 10.126-5.59 20.599-5.61 31.134a.828.828 0 01-.827.826zM30.519 140.125a.827.827 0 01-.828-.815c-.074-5.033-.25-8.735-.523-11.006-.277-2.276-.711-4.746-1.368-7.771a128.468 128.468 0 00-5.899-19.442.828.828 0 111.542-.603 130.366 130.366 0 015.976 19.694c.668 3.078 1.11 5.596 1.392 7.924.281 2.329.46 6.091.536 11.181a.828.828 0 01-.816.84c-.005-.002-.008-.002-.012-.002z"
      />
      <g>
        <path
          fill="#3B1D25"
          d="M97.369 23.488c.264-.335.665-.718.642-.814-.371-1.225-1.456-.986-1.479-1.88-.012-.438.244-.896.32-1.271.163-.884-.987-1.06-1.553-1.523-1.379-1.086-.008-1.655.397-2.812 1.148-3.222-2.642-2.66-3.426-3.031-1.661-.797 1.598-3.992-.831-4.801-1.196-.412-2.076 1.492-3.015 1.626-.988.14-.24-1.803-1.598-2.167-.866-.232-1.478.436-2.038-.023-.612-.515-.1-2.388-.65-3.045C82.755 2.118 81.107 4.8 79.724 4.8c-1.756 0-1.427-3.232-2.828-2.515-.469.234-2.49 3.369-3.966-.304-.38-.941-.583-1.401-1.21-1.77-2.756-1.614-2.321 3.499-4.263 3.054-1.021-.232-1.592-1.73-2.46-1.895-.947-.169-1.255 1.225-1.987 1.344-.602.097-1.451-.553-1.942.154-.299.411-.839 2.979-3.046 2.523-1.302-.262-2.169-1.841-3.8-1.398-2.855.76-.058 4.393-2.934 4.481-3.813.185-1.413 3.24-2.452 4.928-.895 1.428-3.131.175-3.87 1.433-.552.947.522 2.267.28 3.121-.22.79-1.69.754-1.521 2.039.104.803.75 1.236 1.215 1.901 1.333 1.908-2.117 1.268-2.497 3.098-.458 2.189 2.965 3.623 2.042 4.568-.348.358-1.375.608-1.509 1.704-.214 1.806 2.309 1.845 2.583 2.983.25.989-1.288 1.233-1.321 2.178-.036 1.346 2.142 1.222 2.447 2.569.088.372.009 2 .927 2.776 13.808 10.607 28.87 13.063 46.143 1.157 1.084-.745 1.578-.933 1.013-2.111-1.402-2.931 3.271-1.703 3.438-3.207.088-.854-.839-1.448-1.111-1.992-.472-.925 1.207-1.708 1.371-2.349.211-.683-1.094-1.139-1.371-1.656-.807-1.486 2.257-1.942 2.369-3.317.245-2.327-4.288-2.031-2.095-4.809z"
        />
        <path
          fill="#4D2631"
          d="M93.592 37.794a.834.834 0 01-.566-.223c-.401-.376-.85-.892-.733-1.542.12-.681.748-.948 1.207-1.143.272-.115.645-.273.696-.427.016-.048.073-.326-.359-1.064a.828.828 0 011.428-.838c.561.955.726 1.748.503 2.421-.278.843-1.047 1.188-1.578 1.415a.827.827 0 01-.598 1.401zM92.165 31.768a.827.827 0 01-.82-.939c.125-.937.931-1.759 1.872-1.911.721-.119 1.404.261 1.909.536a.828.828 0 01-.791 1.454c-.205-.111-.669-.355-.854-.355-.254.041-.474.327-.497.499a.828.828 0 01-.819.716zM92.881 26.741c-.263 0-.524-.058-.764-.177a1.523 1.523 0 01-.859-1.427.828.828 0 01.828-.81h.019c.425.01.769.339.805.754a.187.187 0 00.09-.044c.145-.121.254-.504.094-1.187-.293-1.219.073-1.879.313-2.316.187-.335.242-.438-.134-1.079a.828.828 0 011.429-.837c.786 1.343.521 2.052.154 2.716-.184.334-.295.536-.153 1.132.419 1.773-.335 2.599-.678 2.872a1.836 1.836 0 01-1.144.403zm-.795-1.585l.827.02v-.001l-.827-.019zM90.453 22.185c-.583 0-1.066-.29-1.323-.445-.393-.234-.557-.762-.322-1.154.232-.391.702-.545 1.096-.311.489.293.551.275.645.212a.337.337 0 00.096-.082c.024-.213-.493-.908-.74-1.243-.592-.795-1.204-1.618-.823-2.476.444-1.01 1.584-.998 2.077-.983.065.002.121.003.17 0 .437-.018.856.292.904.734a.81.81 0 01-.685.907c-.101.015-.248.014-.419.015a3.501 3.501 0 00-.445.013c.12.227.379.575.548.802.563.756 1.2 1.612 1.04 2.53-.058.323-.243.788-.807 1.161-.354.236-.697.32-1.012.32zM85.709 19.709c-.222 0-.457-.027-.699-.082a.83.83 0 01.37-1.615c.356.083.535.02.564-.001-.001-.039-.038-.378-.479-.984a.828.828 0 111.342-.972c1.098 1.513.787 2.458.503 2.886-.329.501-.904.768-1.601.768z"
        />
        <path
          fill="#4D2631"
          d="M82.109 18.672a.826.826 0 01-.741-.456c-.443-.878-.512-1.647-.202-2.282.469-.972 1.59-1.202 2.191-1.326.082-.018.153-.029.201-.044.023-.052.201-.528.308-.813.343-.926.916-2.488 2.663-2.242.791.116 1.271.705 1.621 1.136.119.146.295.362.39.424.01-.024.146-.099.376-.344a.833.833 0 011.172-.033.829.829 0 01.032 1.171c-.567.6-1.116.892-1.669.861-.763-.028-1.219-.586-1.584-1.035-.18-.22-.425-.521-.569-.542-.324-.05-.48.105-.881 1.182-.255.684-.52 1.389-1.159 1.73-.165.087-.343.124-.567.17-.275.056-.921.188-1.035.425-.052.108-.029.378.191.817a.827.827 0 01-.738 1.201zM82.393 13.829a.828.828 0 01-.67-1.313c.731-1.01.809-2.091.647-2.285 0 .002-.009.001-.031.001a.815.815 0 00-.167.019c-.149.03-.279.106-.442.202-.293.173-.701.415-1.245.368-1.295-.09-1.491-1.458-1.622-2.362a7.242 7.242 0 00-.137-.761 1.903 1.903 0 00-.186.107.832.832 0 01-1.144-.256.83.83 0 01.257-1.143c.257-.16 1.038-.656 1.801-.304.793.364.928 1.298 1.046 2.121.041.276.103.707.185.918.059-.028.135-.073.205-.115.227-.133.534-.313.949-.396.817-.171 1.52.084 1.921.702.717 1.105.192 2.927-.696 4.155a.831.831 0 01-.671.342zM75.814 17.137c-.889 0-1.66-.444-2.042-1.188-.418-.814-.269-1.818.392-2.619a.828.828 0 111.278 1.052c-.237.288-.311.591-.196.812.102.198.336.305.639.285.146-.01.194-.036.194-.036.015-.024.068-.164.104-.255.152-.404.408-1.078 1.287-1.479.084-.04.191-.081.307-.124.148-.056.456-.173.52-.256-.011 0-.031-.125-.15-.342-.203-.37-.617-.521-1.273-.729-.744-.234-2.126-.668-1.896-2.292.134-.874.709-1.289.985-1.488.37-.268.918-.209 1.187.157.268.367.225.857-.14 1.128l-.078.057c-.21.151-.292.225-.317.387-.017.115 0 .16 0 .161.07.095.5.229.756.311.714.224 1.691.532 2.228 1.511.35.636.434 1.218.244 1.729-.28.76-1.031 1.044-1.478 1.213-.076.029-.146.055-.205.082-.249.113-.3.224-.428.558-.169.445-.483 1.273-1.735 1.356a1.648 1.648 0 01-.183.009zM71.631 16.974a.828.828 0 01-.667-.334c-1.717-2.317-1.352-3.294.055-4.493.21-.179.441-.374.671-.614.26-.276.195-.433.115-.56-.174-.271-.523-.394-.634-.367.004.009-.029.082-.034.252-.013.457-.387.802-.85.805a.828.828 0 01-.805-.85c.025-.933.5-1.609 1.269-1.808.876-.235 1.978.274 2.491 1.145.489.829.358 1.772-.352 2.522-.276.289-.548.523-.797.736-.795.677-.897.765.202 2.245a.83.83 0 01-.664 1.321zM73.853 8.513a.83.83 0 01-.813-.671c-.201-1.042-.201-1.042-1.477-1.321a.828.828 0 01-.413-.227c-.101-.102-.196-.207-.289-.309-.375-.417-.455-.472-.589-.452a.917.917 0 00-.617.401c-.183.271-.229.627-.133 1.028a.83.83 0 01-.611 1 .831.831 0 01-.999-.611c-.206-.855-.073-1.687.373-2.346a2.556 2.556 0 011.741-1.109c1.039-.158 1.653.525 2.063.978l.079.087c1.817.434 2.195.999 2.498 2.567a.826.826 0 01-.813.985zM65.233 12.63a.827.827 0 01-.785-1.087c.231-.701.663-1.149.978-1.476.122-.126.246-.255.313-.356-.215-.169-.734-.395-1.062-.537-.6-.26-1.167-.507-1.543-.887-.613-.628-.695-1.645-.198-2.421.477-.747 1.572-1.336 3.212-.756a.826.826 0 11-.553 1.56c-.608-.214-1.095-.181-1.265.087-.093.145-.071.313-.015.37.147.148.652.368 1.021.527.968.42 2.588 1.123 1.991 2.571-.144.403-.444.714-.708.989-.261.271-.486.505-.599.847a.83.83 0 01-.787.569zm.549-3.001zM66.209 16.48a.824.824 0 01-.644-.307c-.613-.758-.79-1.574-.482-2.24.251-.542.797-.89 1.426-.906.858-.005 1.71.557 2.231 1.55a.829.829 0 01-1.467.769c-.289-.55-.615-.673-.729-.665.047.008.095.186.307.449a.828.828 0 01-.642 1.35zM63.044 17.103a.828.828 0 01-.826-.788c-.059-1.222-.334-1.423-.336-1.425-.122-.077-.679.108-.948.201-.675.229-1.597.545-2.301-.123-.877-.828-.909-2.342-.072-3.442.717-.941 2.202-1.647 4.041-.534a.828.828 0 11-.858 1.416c-.784-.474-1.448-.434-1.866.121-.294.387-.356.917-.153 1.186.156-.014.476-.123.676-.191.679-.23 1.608-.551 2.413-.002.654.445.991 1.308 1.059 2.714a.825.825 0 01-.787.866l-.042.001zm-3.271-3.337z"
        />
        <path
          fill="#4D2631"
          d="M55.049 13.296a.83.83 0 01-.322-.065c-1.796-.755-2.144-2.078-1.895-2.981.339-1.23 1.702-1.962 3.229-1.753.306.044.507.085.663.129.358-.496.921-1.156 1.869-1.312.846-.135 1.752.16 2.772.914a.828.828 0 11-.983 1.333c-.625-.461-1.152-.673-1.519-.612-.363.06-.621.393-.921.822a4.041 4.041 0 01-.291.386.835.835 0 01-.819.252c-.192-.048-.302-.093-.41-.137-.103-.042-.191-.079-.591-.136-.833-.115-1.319.254-1.402.554-.092.337.276.736.941 1.016a.828.828 0 01-.321 1.59zM56.942 19.531a4.1 4.1 0 01-.359-.016c-.455-.04-.792-.442-.751-.898s.443-.796.898-.751c.441.035.644-.053.679-.086-.009-.064-.225-.501-1.007-.767-.784-.283-1.118-.823-1.337-1.182-.055-.088-.137-.22-.175-.254-.002.005-.108-.009-.378.063-.356.1-.414.233-.53.5a1.797 1.797 0 01-.296.504.829.829 0 01-1.266-1.066c.015-.031.029-.064.044-.101.159-.363.49-1.121 1.607-1.434 1.569-.426 2.113.447 2.402.918.174.281.26.41.477.487 1.418.484 2.292 1.623 2.063 2.706-.145.688-.768 1.377-2.071 1.377zm-4.49-3.992zM49.5 20.369c-.708 0-1.426-.286-1.885-.789a1.767 1.767 0 01-.317-1.955c.378-.887 1.176-.753 1.475-.703l.156.024a.83.83 0 01.058 1.633c.208.12.524.18.765.096.144-.048.314-.156.351-.561.006-.111-.066-.436-.12-.673-.251-1.133-.721-3.239 1.351-4.295a.827.827 0 11.752 1.474c-.795.406-.792 1.086-.487 2.46.101.447.187.833.151 1.186-.084.967-.62 1.69-1.468 1.977a2.4 2.4 0 01-.782.126zM49.768 23.323c-.465 0-.995-.098-1.589-.361a.827.827 0 11.668-1.514c1.048.461 1.642.078 1.997-.152.121-.077.234-.151.379-.198a.828.828 0 01.589 1.545c-.374.242-1.062.68-2.044.68zM47.474 30.067a.827.827 0 01-.313-1.594c.179-.074.305-.138.391-.19l-.009-.008c-.136-.124-.456-.417-.364-.894a.818.818 0 01.191-.386c.359-.412.514-.785.4-.975-.098-.167-.394-.273-.628-.222-.044.018-.136.136-.179.192a1.436 1.436 0 01-.245.263.828.828 0 01-1.093-1.241c.206-.264.55-.697 1.161-.83.925-.209 1.944.211 2.409.996.205.345.541 1.191-.14 2.313.19.272.338.626.262 1.058-.16.899-1.191 1.32-1.531 1.458a.832.832 0 01-.312.06zM47.421 36.178a.826.826 0 01-.768-1.135c.439-1.099.312-1.238-.111-1.7-.195-.213-.439-.479-.661-.845a1.603 1.603 0 01-.239-.8.824.824 0 01.452-.842.826.826 0 011.11.37c.053.106.088.275.091.395.139.244.299.419.469.604.709.775 1.19 1.52.426 3.432a.827.827 0 01-.769.521z"
        />
      </g>
      <g>
        <path
          fill="#66353D"
          d="M92.404 41.322c-2.065.723-4.387 3.844-4.465 5.208l-.929 8.131c3.205.23 2.97-2.505 5.087-4.321.674-.593 2.896-2.274 3.781-3.841 1.37-2.424-.167-6.324-3.474-5.177zM46.764 41.476c-1.111.492-1.572 1.551-1.437 2.739.21 1.844 1.915 3.582 3.603 5.491 1.52 1.719 2.729 4.861 5.437 2.499l-1.97-8.142c-.667-.665-2.378-4.042-5.633-2.587z"
        />
        <path
          fill="#592A2A"
          d="M88.456 49.6a.827.827 0 01-.756-1.163c.933-2.11 2.265-2.872 4.395-3.541a.825.825 0 011.037.542.826.826 0 01-.542 1.038c-1.776.558-2.685 1.07-3.377 2.63a.825.825 0 01-.757.494zM52.847 48.77a.823.823 0 01-.614-.272c-.819-.905-2.524-2.788-4.363-3.092a.828.828 0 11.27-1.634c2.41.399 4.376 2.572 5.32 3.616a.826.826 0 01-.613 1.382z"
        />
        <path
          fill="#744149"
          d="M89.326 36.589c-.86-1.402 2.264-1.601 1.534-3.069-.507-1.015-1.952-.806-1.776-2.129.154-1.293 1.776-1.778 1.402-2.639-.464-1.081-2.418-.672-2.781-1.093-.785-.86 1.412-2.075 1.345-3.09-.064-1.037-1.07-.761-1.997-.485-2.096.618-.838-1.744-1.533-2.539-1.215-1.424-3.455 2.042-3.975.111-.85-3.278-2.804-.188-4.039-.111-1.767.078-.663-4.072-4.339-1.523-2.471 1.723-1.907-1.92-4.05-1.468-1.501.321-2.284 2.771-4.172 2.352-2.008-.441-2.682-4.945-4.415-.729-1.589 3.851-5.795-1.887-6.556.993-.221.894.308 1.744-.188 2.639-.574 1.07-2.55.364-2.793 1.578-.21 1.126 1.491 2.241 1.27 3.377-.232 1.226-4.239 1.921-2.308 4.493.509.685 1.988 1.579.917 3.014-.232.32-.894.784-1.446 1.357 1.821 10.022 3.941 18.687 9.537 28.974 2.66 4.845 6.843 8.146 16.501 6.303 3.167-.607 4.923-1.712 6.567-4.15 3.94-5.795 6.479-19.602 7.704-27.042-.045-.033-.089-.078-.145-.122-1.721-1.468 1.314-1.888 1.558-2.936.276-1.25-1.468-1.537-1.822-2.066z"
        />
        <path
          fill="#66353D"
          d="M70.433 53.33c-.73 0-1.55-.344-2.919-1.12a25.233 25.233 0 00-2.159-1.108c-.37-.173-.643-.303-.845-.43a.826.826 0 01-.381-.786.831.831 0 01.536-.691c1.292-.48 2.379-.816 3.812-.673.284-3.979-.128-7.278-.333-8.92-.094-.751-.123-1-.1-1.209.05-.454.441-.805.913-.731.445.048.77.442.735.886.001.14.042.43.094.849.228 1.822.701 5.613.265 10.167a.83.83 0 01-1.006.729c-.687-.154-1.245-.185-1.798-.113.319.164.679.358 1.088.592 2.006 1.138 2.056 1.108 3.333.37a21.301 21.301 0 012.957-1.463.828.828 0 01.618 1.535c-1.305.527-2.137 1.009-2.746 1.36-.834.483-1.414.756-2.064.756z"
        />
        <path
          id="smile"
          fill="#FFF"
          d="M77.381 55.823c-1.54.1-1.829 2.479-7.074 2.468-3.861-.008-4.432-1.63-6.426-2.072-1.819-.385-1.162.901.096 2.248 1.071 1.146 3.147 3.287 7.823 2.819 3.613-.363 8.617-5.632 5.581-5.463z"
        />
        <g opacity=".2">
          <path
            fill="#ED7278"
            d="M81.986 49.475c-.953-.221-2.941.796-1.803 2.607 2.084 3.317 5.009-1.874 1.803-2.607zM57.649 51.976c.805 2.04 3.322 1.107 3.325-.566.003-2.655-4.594-2.652-3.325.566z"
          />
        </g>
        <g>
          <path
            fill="#3B1D25"
            d="M78.763 42.891h-.033a1.105 1.105 0 01-1.071-1.137l.017-.69a20.85 20.85 0 01.055-1.376 1.095 1.095 0 011.202-.997c.606.057 1.053.595.997 1.202-.029.302-.038.738-.047 1.217l-.017.709a1.107 1.107 0 01-1.103 1.072zM60.865 42.914c-.56 0-1.04-.424-1.097-.993-.165-1.637-.165-1.69-.167-1.869l-.01-.219a1.103 1.103 0 011.035-1.168 1.115 1.115 0 011.168 1.035c.012.192.013.265.013.325.001.086.009.207.157 1.675a1.105 1.105 0 01-1.099 1.214z"
          />
        </g>
        <g>
          <path
            id="eyebrow"
            fill="#4D2631"
            d="M55.66 35.841a.823.823 0 01-.608-.267.826.826 0 01.046-1.169c1.771-1.639 5.365-2.904 9.395-2.044a.827.827 0 11-.345 1.619c-3.436-.731-6.516.337-7.926 1.641a.821.821 0 01-.562.22zM83.449 35.246a.818.818 0 01-.521-.186c-2.709-2.202-4.078-1.972-7.646-.982a.828.828 0 11-.445-1.595c3.696-1.027 5.78-1.437 9.134 1.292a.827.827 0 01-.522 1.471z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar09: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#E6A57A"
        d="M83.606 76.398c-2.184-5.905-3.44-17.129-3.127-23.215l-20.075-2.027c.779 26.686-1.167 35.871-22.178 45.229 22.471 15.846 48.055 15.846 63.223-1.959-8.726-3.826-14.433-8.803-17.843-18.028z"
      />
      <path
        fill="#779662"
        d="M93.386 88.738c-15.458 13.668-28.857 12.521-45.278-1.404-3.104 2.211-6.987 4.424-10.348 6.25-9.902 16.105-13.433 31.836-14.981 46.426h99.614c-1.075-18.35-4.694-33.238-11.412-42.211-.529-.705-10.016-2.797-17.595-9.061z"
      />
      <path
        fill="#87A368"
        d="M35.331 140.887a.878.878 0 01-.71-1.391c1.354-1.877 2.35-3.156 3.123-3.736a.877.877 0 111.054 1.405c-.715.537-2.042 2.373-2.755 3.359a.868.868 0 01-.712.363zM33.084 135.752a.879.879 0 01-.538-1.572c.687-.537 4.225-5.75 4.638-6.516a.875.875 0 011.189-.355c.426.229.586.76.356 1.188-.314.586-4.044 6.248-5.109 7.072a.884.884 0 01-.536.183zM32.884 127.994a.877.877 0 01-.601-1.517c.416-.439 4.551-6.107 4.865-6.549a.877.877 0 111.431 1.016c-.042.061-4.584 6.332-5.094 6.813a.873.873 0 01-.601.237zM33.004 120.111a.877.877 0 01-.656-1.463c.455-.51.599-.732 1.078-1.469.21-.326.479-.74.859-1.311 1.829-2.744 2.483-3.471 2.763-3.779l.086-.1a.871.871 0 011.181-.354.89.89 0 01.357 1.199c-.096.18-.199.295-.319.428-.254.283-.849.941-2.606 3.58-.374.561-.639.969-.847 1.289-.492.76-.695 1.072-1.238 1.684a.88.88 0 01-.658.296zM32.836 112.746a.88.88 0 01-.725-1.371c.088-.129.279-.439.542-.863 1.059-1.713 3.03-4.902 4.416-6.48a.879.879 0 011.319 1.16c-1.291 1.467-3.284 4.693-4.242 6.242a31.93 31.93 0 01-.581.926.88.88 0 01-.729.386zM32.591 104.771a.88.88 0 01-.744-1.344c1.318-2.111 3.069-4.789 4.936-6.758a.876.876 0 011.241-.033.876.876 0 01.033 1.24c-1.758 1.855-3.446 4.438-4.719 6.48a.875.875 0 01-.747.415zM65.134 140.887a.888.888 0 01-.493-.15.88.88 0 01-.232-1.221c2.404-3.535 2.958-4.391 3.053-4.537l1.479.947c-.102.154-.659 1.018-3.081 4.578a.879.879 0 01-.726.383zM63.339 136.281a.878.878 0 01-.718-1.381 950.258 950.258 0 004.905-7.092.878.878 0 011.481.941c-.071.113-1.751 2.564-4.946 7.154a.88.88 0 01-.722.378zM63.415 128.939a.88.88 0 01-.673-1.441c.225-.303 4.641-6.857 4.903-7.281a.882.882 0 011.207-.289.876.876 0 01.293 1.203c-.032.053-4.805 7.195-5.056 7.496a.886.886 0 01-.674.312zM63.425 121.391a.878.878 0 01-.725-1.371l1.569-2.398c2.697-4.121 3.452-5.27 3.515-5.357a.878.878 0 011.425 1.026c-.139.205-2.042 3.111-3.471 5.295l-1.586 2.422a.88.88 0 01-.727.383zM63.452 113.717a.878.878 0 01-.727-1.369c2.066-3.07 4.598-7.014 4.837-7.533a.884.884 0 011.165-.432.88.88 0 01.431 1.166c-.369.801-3.435 5.49-4.976 7.781a.884.884 0 01-.73.387zM63.306 106.66a.872.872 0 01-.824-1.17c.238-.654 4.632-8.039 5.002-8.404a.88.88 0 011.242.006.88.88 0 01.07 1.156c-.434.629-4.392 7.135-4.664 7.844a.89.89 0 01-.826.568zM48.096 98.092a.876.876 0 01-.602-1.514c.337-.359 2.522-3.41 4.448-6.166a.875.875 0 011.222-.215.875.875 0 01.216 1.221c-1.256 1.799-4.23 6.025-4.695 6.447a.869.869 0 01-.589.227zM50.373 140.887a.878.878 0 01-.697-1.408l.474-.623c.649-.855 1.464-1.93 2.508-3.262a.877.877 0 111.38 1.084c-1.036 1.322-1.845 2.389-2.491 3.238l-.475.625a.867.867 0 01-.699.346zM47.786 136.287a.88.88 0 01-.667-.305.881.881 0 01.095-1.24c.431-.383 3.888-4.678 5.195-6.557a.877.877 0 011.44 1.004c-1.196 1.719-4.847 6.332-5.493 6.887a.872.872 0 01-.57.211zM47.789 129.02a.879.879 0 01-.648-1.469c.4-.477 5.033-6.391 5.37-6.998a.883.883 0 011.191-.348c.424.23.582.758.353 1.182-.47.871-5.579 7.305-5.619 7.348a.875.875 0 01-.647.285zM48.02 120.994a.878.878 0 01-.691-1.418c.402-.516 5.351-7.375 5.39-7.432a.878.878 0 011.435 1.012c-.038.055-5.005 6.941-5.442 7.5a.872.872 0 01-.692.338zM48.241 113.047a.881.881 0 01-.693-1.418 1846.9 1846.9 0 005.013-6.926.88.88 0 011.215-.234c.399.27.51.807.246 1.207-.149.229-5.057 6.99-5.086 7.031a.877.877 0 01-.695.34zM47.997 106.055a.877.877 0 01-.701-1.405c.402-.537 4.904-6.738 5.143-7.105a.887.887 0 011.193-.279.869.869 0 01.319 1.17c-.164.295-5.203 7.203-5.25 7.268a.879.879 0 01-.704.351zM44.978 101.584a.878.878 0 01-.629-.266c-.41-.422-1.269-1.82-2.634-4.068-.677-1.113-1.355-2.23-1.858-3.004a.874.874 0 01.256-1.213.875.875 0 011.214.256c.512.783 1.202 1.918 1.889 3.049.886 1.459 2.099 3.455 2.392 3.756a.877.877 0 01-.63 1.49zM45.506 109.527c-.25 0-.5-.107-.673-.316-1.061-1.268-2.185-2.928-3.177-4.391-.762-1.121-1.48-2.184-1.918-2.678a.878.878 0 011.315-1.164c.512.58 1.229 1.635 2.057 2.857.97 1.428 2.067 3.049 3.071 4.248a.88.88 0 01-.675 1.444zM45.376 117.418a.871.871 0 01-.649-.287c-.955-1.049-2.172-2.818-3.349-4.529-.604-.875-1.178-1.711-1.657-2.354a.88.88 0 01.182-1.229.876.876 0 011.229.182c.488.658 1.075 1.51 1.692 2.406 1.091 1.584 2.328 3.381 3.202 4.342a.878.878 0 01-.65 1.469zM45.718 124.941a.88.88 0 01-.528-.178c-.926-.697-2.197-2.459-3.427-4.16-.797-1.104-1.621-2.246-2.05-2.645a.88.88 0 011.198-1.285c.554.518 1.352 1.623 2.275 2.902 1.046 1.445 2.347 3.248 3.063 3.787a.88.88 0 01-.531 1.579zM45.41 133.324a.875.875 0 01-.774-.461c-.413-.768-3.952-5.98-4.637-6.514a.877.877 0 011.072-1.39c1.064.822 4.794 6.484 5.11 7.072a.877.877 0 01-.771 1.293zM45.26 140.887a.876.876 0 01-.713-.365c-.871-1.209-4.444-6.088-4.825-6.492a.889.889 0 01.014-1.236.868.868 0 011.218-.016c.499.482 4.975 6.658 5.019 6.721a.877.877 0 01-.713 1.388zM30.264 118.318a.875.875 0 01-.729-.389c-.147-.217-.325-.438-.55-.719-.388-.484-.92-1.146-1.668-2.232a.878.878 0 011.445-.998 32.953 32.953 0 001.594 2.133c.262.326.465.584.636.838a.875.875 0 01-.728 1.367zM30.159 126.15a.875.875 0 01-.772-.459c-.492-.906-2.381-3.936-3.714-5.91a.878.878 0 011.457-.983c1.255 1.861 3.244 5.029 3.801 6.055a.876.876 0 01-.772 1.297zM30.021 134.145a.88.88 0 01-.775-.465c-.267-.447-4.54-7.008-4.83-7.416a.883.883 0 01.196-1.225.87.87 0 011.217.184c.04.053 4.864 7.385 4.999 7.697a.879.879 0 01-.807 1.225zM29.843 140.887a.877.877 0 01-.697-.342c-1.242-1.613-2.614-3.758-3.523-5.178-.457-.715-.852-1.33-1.002-1.523a.878.878 0 111.383-1.08c.201.256.558.813 1.099 1.656.892 1.395 2.241 3.502 3.437 5.057a.876.876 0 01-.697 1.41zM60.599 103.313a.876.876 0 01-.702-.348c-.445-.59-1.237-1.791-2.076-3.061-1.05-1.592-2.242-3.398-2.761-4.008a.878.878 0 011.338-1.136c.587.691 1.757 2.463 2.889 4.178.823 1.246 1.599 2.424 2.012 2.969a.88.88 0 01-.7 1.406zM60.853 111.178a.878.878 0 01-.753-.426c-.391-.584-4.862-6.59-5.371-7.092-.393-.283-.451-.809-.168-1.199.285-.393.863-.457 1.256-.174.609.441 5.8 7.58 5.826 7.633a.875.875 0 01-.412 1.17.885.885 0 01-.378.088zM61.047 119.01a.881.881 0 01-.776-.465c-.246-.463-4.213-6.705-5.054-7.654a.879.879 0 011.315-1.164c.964 1.088 5.023 7.492 5.29 7.992a.878.878 0 01-.775 1.291zM60.909 126.035a.878.878 0 01-.694-.34 244.877 244.877 0 01-3.475-4.564c-.941-1.26-1.37-1.836-1.651-2.02a.878.878 0 11.965-1.467c.539.354.931.879 2.093 2.436.743.998 1.815 2.436 3.453 4.537a.878.878 0 01-.691 1.418zM60.694 133.477a.876.876 0 01-.722-.377c-1.308-1.877-4.763-6.174-5.197-6.557a.882.882 0 01-.083-1.238.874.874 0 011.228-.094c.646.555 4.297 5.168 5.493 6.885a.877.877 0 01-.719 1.381zM60.641 140.887a.877.877 0 01-.723-.377c-.957-1.381-4.976-6.49-5.237-6.801a.885.885 0 01.097-1.232.875.875 0 011.226.076c.153.172 4.338 5.486 5.357 6.957a.876.876 0 01-.72 1.377zM111.419 140.887a.877.877 0 01-.71-1.391c1.354-1.877 2.351-3.156 3.123-3.736a.878.878 0 011.054 1.405c-.715.537-2.042 2.373-2.756 3.359a.864.864 0 01-.711.363zM109.173 135.752a.879.879 0 01-.538-1.572c.687-.537 4.225-5.75 4.638-6.516a.874.874 0 011.188-.355c.427.229.587.76.356 1.188-.314.586-4.044 6.248-5.108 7.072a.884.884 0 01-.536.183zM108.973 127.994a.877.877 0 01-.602-1.517c.416-.439 4.551-6.107 4.865-6.549a.878.878 0 111.432 1.016c-.042.061-4.584 6.332-5.094 6.813a.875.875 0 01-.601.237zM109.093 120.111a.877.877 0 01-.656-1.463c.455-.51.599-.732 1.078-1.469.21-.326.479-.74.858-1.311 1.829-2.744 2.483-3.471 2.763-3.779l.086-.1a.87.87 0 011.181-.354c.429.229.585.77.357 1.199-.097.18-.199.295-.319.428-.254.283-.849.941-2.606 3.58-.374.561-.639.969-.847 1.289-.492.76-.695 1.072-1.238 1.684a.876.876 0 01-.657.296zM108.925 112.746a.88.88 0 01-.725-1.371c.088-.129.278-.439.541-.863 1.059-1.713 3.029-4.902 4.416-6.48a.879.879 0 011.319 1.16c-1.29 1.467-3.284 4.693-4.242 6.242-.281.457-.486.789-.58.926a.882.882 0 01-.729.386zM108.685 104.775a.878.878 0 01-.463-.131.88.88 0 01-.281-1.211c.9-1.447 1.981-3.131 3.152-4.65a.879.879 0 011.39 1.076c-1.125 1.455-2.175 3.092-3.053 4.504a.87.87 0 01-.745.412zM95.676 140.887a.877.877 0 01-.737-1.354c1.127-1.746 2.552-4.025 2.971-4.809a.877.877 0 111.547.83c-.447.832-1.869 3.111-3.044 4.93a.87.87 0 01-.737.403zM93.651 135.553a.878.878 0 01-.703-1.403c.291-.408 4.628-7.068 4.829-7.418.188-.447.684-.619 1.131-.428.447.188.637.742.449 1.188-.13.309-4.96 7.65-5.001 7.705a.866.866 0 01-.705.356zM93.832 127.99a.877.877 0 01-.689-1.42c.156-.199.565-.838 1.041-1.578 1.146-1.789 2.88-4.49 4.289-6.121a.878.878 0 011.328 1.148c-1.327 1.535-3.02 4.174-4.139 5.922-.612.951-.941 1.463-1.139 1.715a.88.88 0 01-.691.334zM93.689 121.324a.862.862 0 01-.459-.133.876.876 0 01-.286-1.207c.362-.588.52-.883.661-1.152l.164-.309c1.774-3.264 2.891-4.898 3.489-5.781.19-.279.317-.455.375-.572a.877.877 0 111.577.772c-.078.162-.239.408-.502.791-.581.854-1.665 2.443-3.398 5.635l-.153.283c-.154.293-.324.617-.72 1.256a.877.877 0 01-.748.417zM93.454 112.982a.877.877 0 01-.731-1.361c.039-.059 4.716-7.264 4.909-7.58.197-.443.693-.6 1.135-.4.443.197.619.76.423 1.205-.078.176-4.953 7.668-5.001 7.742a.881.881 0 01-.735.394zM93.359 105.82a.867.867 0 01-.472-.137.88.88 0 01-.267-1.213c.392-.613.846-1.387 1.416-2.363l.1-.17c.99-1.693 1.757-2.793 2.499-3.859.3-.432.594-.852.893-1.303a.88.88 0 011.218-.244.88.88 0 01.243 1.219c-.306.459-.605.891-.913 1.332-.722 1.037-1.469 2.109-2.424 3.744l-.101.17c-.585.998-1.051 1.793-1.451 2.42a.872.872 0 01-.741.404zM93.655 97.67a.878.878 0 01-.589-1.53c.165-.174.797-1.064 1.355-1.854.678-.959 1.503-2.123 2.313-3.197a.876.876 0 011.229-.172.88.88 0 01.172 1.23c-.8 1.059-1.613 2.207-2.282 3.152-1.095 1.547-1.397 1.961-1.627 2.16a.866.866 0 01-.571.211zM80.434 140.887a.877.877 0 01-.709-1.393 456.811 456.811 0 003.253-4.518.882.882 0 011.208-.252c.402.26.524.789.272 1.195-.092.146-1.989 2.789-3.313 4.605a.868.868 0 01-.711.363zM78.555 136.025a.877.877 0 01-.617-1.502c.514-.525 4.635-6.631 5.171-7.449a.878.878 0 011.471.963c-.045.066-4.696 7.031-5.407 7.734a.879.879 0 01-.618.254zM78.366 127.994a.878.878 0 01-.649-1.469c.22-.264 4.785-6.117 5.044-6.49.223-.43.73-.559 1.161-.336.43.225.575.793.351 1.223-.148.287-5.219 6.742-5.26 6.787a.87.87 0 01-.647.285zM78.484 120.004a.878.878 0 01-.659-1.457c.454-.518 4.757-6.322 4.962-6.629.206-.436.701-.574 1.141-.369.438.207.599.779.393 1.217-.196.416-5.135 6.893-5.176 6.939a.872.872 0 01-.661.299zM78.491 112.826a.877.877 0 01-.583-1.533c.707-.627 1.913-2.338 4.316-5.742l.78-1.105a.875.875 0 011.223-.209.877.877 0 01.211 1.223l-.778 1.104c-2.56 3.627-3.729 5.281-4.586 6.043a.882.882 0 01-.583.219zM78.656 104.992a.879.879 0 01-.768-1.304c1.258-2.271 3.304-5.523 4.936-7.217a.876.876 0 111.264 1.215c-1.416 1.473-3.362 4.502-4.663 6.852a.88.88 0 01-.769.454zM117.567 112.08a.884.884 0 01-.721-.373l-.088-.127c-.347-.494-.662-.945-.949-1.328a.878.878 0 111.407-1.051c.296.395.623.861.981 1.371l.088.125a.877.877 0 01-.718 1.383zM120.387 123.41a.877.877 0 01-.686-.33c-.604-.756-1.26-1.66-1.878-2.516-.788-1.09-1.603-2.215-2.026-2.609a.877.877 0 011.196-1.285c.55.512 1.339 1.602 2.253 2.865.602.832 1.238 1.713 1.827 2.451a.874.874 0 01-.139 1.232.865.865 0 01-.547.192zM121.498 133.324a.873.873 0 01-.773-.461c-.413-.768-3.952-5.98-4.637-6.514a.877.877 0 011.072-1.39c1.064.822 4.794 6.484 5.109 7.072a.877.877 0 01-.771 1.293zM121.405 140.969a.88.88 0 01-.717-.369c-.313-.441-4.447-6.109-4.879-6.563a.89.89 0 01.006-1.234.867.867 0 011.213-.031c.497.469 5.05 6.752 5.092 6.813a.876.876 0 01-.715 1.384zM106.053 102.877a.882.882 0 01-.712-.363c-.219-.303-.626-.994-1.328-2.191-1.02-1.738-2.727-4.648-3.297-5.172a.88.88 0 011.191-1.293c.705.65 2 2.814 3.62 5.578.543.924 1.057 1.801 1.235 2.049a.876.876 0 01-.709 1.392zM106.165 110.455a.876.876 0 01-.767-.449c-.476-.852-4.083-6.35-4.841-7a.878.878 0 01.689-1.61c1.204.41 5.643 7.68 5.683 7.752a.876.876 0 01-.337 1.193.86.86 0 01-.427.114zm-5.487-7.398l.003.002-.003-.002zm-.145-.071zM106.353 118.322a.873.873 0 01-.727-.387 14.493 14.493 0 00-.574-.756c-.454-.578-1.077-1.369-2.031-2.771a91.02 91.02 0 01-2.065-3.146c-.256-.404-.412-.656-.56-.848a.878.878 0 011.39-1.072c.171.223.357.514.654.986.386.609.977 1.549 2.03 3.092a43.242 43.242 0 001.961 2.672c.265.338.471.602.646.859a.877.877 0 01-.724 1.371zM106.252 126.154a.876.876 0 01-.773-.463c-.775-1.439-4.233-6.824-4.757-7.344a.894.894 0 01-.033-1.238.862.862 0 011.21-.064c.769.684 4.545 6.734 5.125 7.814a.878.878 0 01-.772 1.295zM106.11 134.145a.88.88 0 01-.775-.465c-.267-.447-4.539-7.008-4.83-7.416a.884.884 0 01.196-1.225.87.87 0 011.217.184c.04.053 4.864 7.385 4.999 7.697a.879.879 0 01-.807 1.225zM105.932 140.887a.871.871 0 01-.694-.338c-.661-.854-1.402-1.91-2.334-3.322-.02-.029-.036-.061-.052-.092-.462-.699-.887-1.363-1.242-1.918-.431-.672-.753-1.18-.907-1.383a.877.877 0 111.396-1.062c.168.221.521.77.989 1.498.365.572.805 1.256 1.281 1.979.02.029.037.061.053.092.87 1.316 1.591 2.342 2.203 3.133a.874.874 0 01-.693 1.413zM91.006 102.596a.875.875 0 01-.745-.414c-1.093-1.746-4.181-6.408-4.774-6.939a.875.875 0 01-.068-1.238.874.874 0 011.239-.068c1.011.902 5.053 7.254 5.092 7.316a.877.877 0 01-.744 1.343zM91.315 110.277a.878.878 0 01-.659-.299c-.524-.596-1.345-1.756-2.212-2.986-.981-1.389-2.463-3.486-2.899-3.783a.885.885 0 01-.243-1.217.87.87 0 011.202-.254c.654.426 1.71 1.885 3.373 4.24.804 1.139 1.635 2.314 2.098 2.842a.877.877 0 01-.66 1.457zM91.481 118.094a.879.879 0 01-.675-.314c-.912-1.096-1.989-2.613-2.938-3.955-.994-1.4-2.121-2.988-2.531-3.311a.878.878 0 111.079-1.384c.585.455 1.477 1.695 2.884 3.682.932 1.313 1.988 2.801 2.855 3.844a.878.878 0 01-.674 1.438zM91.273 125.836a.876.876 0 01-.741-.406c-.233-.344-4.898-6.799-5.212-7.188-.353-.33-.337-.85-.005-1.205.329-.352.921-.334 1.275-.004.237.223 5.405 7.424 5.437 7.477a.877.877 0 01-.754 1.326zM91.406 133.742a.881.881 0 01-.739-.402c-.338-.518-4.631-6.893-5.17-7.445a.883.883 0 01.004-1.24.87.87 0 011.23-.008c.725.715 5.368 7.674 5.41 7.742a.876.876 0 01-.735 1.353zM91.059 140.781a.879.879 0 01-.741-.404c-.322-.455-4.824-6.225-5.059-6.506a.882.882 0 01.095-1.227.872.872 0 011.222.066c.04.043 5.104 6.49 5.258 6.783a.876.876 0 01-.775 1.288zM76.26 102.621a.876.876 0 01-.651-.289 83.984 83.984 0 01-2.935-3.408.877.877 0 111.367-1.101c.754.936 1.72 2.059 2.871 3.334a.876.876 0 01-.652 1.464zM75.852 109.771a.868.868 0 01-.655-.299c-.036-.039-.581-.713-1.309-1.609-1.264-1.563-3.618-4.469-3.821-4.693-.375-.307-.39-.822-.082-1.197.306-.377.9-.391 1.275-.086.112.092.142.117 3.993 4.871.688.85 1.207 1.492 1.269 1.566a.88.88 0 01-.67 1.447zM75.634 118.318a.88.88 0 01-.795-.502c-.08-.168-.473-.729-.889-1.318-.901-1.281-2.263-3.217-3.917-5.947a.88.88 0 011.502-.91 95.151 95.151 0 003.851 5.848c.577.82.896 1.271 1.04 1.58a.875.875 0 01-.792 1.249zM75.774 125.867a.88.88 0 01-.756-.43c-.028-.045-.598-.947-5.084-7.525a.878.878 0 011.449-.99c4.801 7.037 5.137 7.607 5.149 7.629a.876.876 0 01-.758 1.316zM75.826 133.014a.881.881 0 01-.739-.402c-.104-.156-1.748-2.555-4.906-7.092a.879.879 0 011.44-1.004c3.181 4.568 4.876 7.041 4.944 7.15a.876.876 0 01-.739 1.348zM75.957 140.623a.876.876 0 01-.752-.422c-.269-.436-4.677-6.977-4.921-7.305a.883.883 0 01.151-1.219.869.869 0 011.212.113c.255.305 5.028 7.447 5.061 7.5a.877.877 0 01-.751 1.333z"
      />
      <g>
        <path
          fill="#9FBA7D"
          d="M72.519 103.5c-9.205 0-18.648-4.248-29.121-12.768a.877.877 0 111.109-1.363c19.446 15.826 35.188 16.34 52.636 1.717a.876.876 0 111.127 1.345C89.475 99.803 81.102 103.5 72.519 103.5z"
        />
      </g>
      <g>
        <path
          fill="#6A8758"
          d="M103.684 140.887a.876.876 0 01-.878-.857c-.102-4.658-.012-8.242.082-10.43.691-15.834 4.502-26.637 5.937-30.703.257-.73.501-1.422.528-1.6 0-.484.391-.848.875-.848.486 0 .877.422.877.904 0 .34-.14.752-.625 2.127-1.411 4-5.157 14.623-5.838 30.195-.093 2.162-.182 5.703-.08 10.314a.877.877 0 01-.858.896c-.008.002-.015.002-.02.002zM40.612 140.887a.877.877 0 01-.846-.645c-1.445-5.256-1.265-7.711-.829-13.637.175-2.373.392-5.324.563-9.262.447-9.463-.4-16.867-2.667-23.305a.878.878 0 111.655-.582c2.346 6.658 3.224 14.273 2.766 23.967-.171 3.961-.39 6.928-.566 9.311-.432 5.877-.594 8.078.77 13.043a.876.876 0 01-.846 1.11z"
        />
      </g>
      <g>
        <path fill="#592A2A" d="M85.107 48.582L82.844 60.21c10.058 4.103 16.265-2.579 14.289-11.097l-12.026-.531z" />
        <path
          fill="#6B3232"
          d="M86.966 58.271c-1.112 0-2.318-.138-3.618-.367a.875.875 0 01-.712-1.015.875.875 0 011.016-.713c5.131.896 8.02.338 9.569-5.231a.878.878 0 111.692.472c-1.458 5.231-4.145 6.854-7.947 6.854z"
        />
        <path
          fill="#6B3232"
          d="M86.828 35.328v17.031c5.213 2.27 16.107.077 16.709-10.754.202-3.659-1.453-7.283-1.727-8.183l-14.982 1.906z"
        />
        <path
          fill="#943A32"
          d="M89.322 51.051c-.942 0-1.913-.086-2.904-.261a.875.875 0 01-.712-1.016.876.876 0 011.017-.712c4.256.746 8.051-.326 10.425-2.941 2.09-2.303 2.763-5.523 1.843-8.837a.879.879 0 011.692-.469c1.084 3.905.269 7.727-2.235 10.485-2.219 2.446-5.451 3.751-9.126 3.751z"
        />
        <path fill="#943A32" d="M85.985 26.465l4.223 15.482c12.211-.594 20.561-11.142 13.029-22.125l-17.252 6.643z" />
        <path
          fill="#B54933"
          d="M88.606 39.029a.878.878 0 01-.011-1.756c4.99-.057 8.677-1.631 10.662-4.552 1.78-2.62 2.002-6.209.609-9.847a.877.877 0 111.64-.629c1.602 4.183 1.312 8.361-.797 11.463-1.62 2.384-5.032 5.242-12.094 5.321h-.009z"
        />
        <g>
          <path fill="#592A2A" d="M46.131 52.156c1.054 9.677 9.2 13.966 17.59 8.931l-7.715-10.809-9.875 1.878z" />
          <path
            fill="#6B3232"
            d="M55.91 59.624a6.639 6.639 0 01-2.861-.622c-2.146-1.018-3.719-3.195-4.551-6.296a.879.879 0 111.697-.456c.694 2.591 1.941 4.377 3.605 5.164 1.511.717 3.333.6 5.42-.343a.879.879 0 01.722 1.601c-1.406.633-2.766.952-4.032.952z"
          />
          <path
            fill="#6B3232"
            d="M39.382 43.067c-.067 1.496-.029 4.338.356 5.718 2.115 7.359 12.175 7.566 18.612 3.047l-5.403-11.901-13.565 3.136z"
          />
          <path
            fill="#943A32"
            d="M49.471 52.045c-1.592 0-3.067-.32-4.287-.979-2.087-1.123-3.292-3.112-3.484-5.751a.878.878 0 01.812-.94c.485-.017.905.328.94.812.148 2.04 1.012 3.496 2.565 4.333 2.462 1.324 6.459.9 9.95-1.057a.878.878 0 01.857 1.532c-2.414 1.354-5.011 2.05-7.353 2.05z"
          />
          <path fill="#943A32" d="M34.383 32.146c-4.979 14.093 11.279 21.37 21.624 9.906l-3.059-12.749-18.565 2.843z" />
          <path
            fill="#B54933"
            d="M44.245 44.421c-2.131 0-3.579-.675-4.487-1.336-2.773-2.022-3.411-5.801-2.608-8.49a.88.88 0 011.683.503c-.626 2.098-.154 5.027 1.959 6.568 1.678 1.22 5.737 2.417 14.06-3.294a.88.88 0 01.995 1.448c-5.142 3.528-8.914 4.601-11.602 4.601z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#E6A57A"
          d="M89.622 40.125L87.8 48.364c5.203-1.232 8.332-4.727 9.004-6.922 1.133-3.657-4.175-7.156-7.182-1.317zM51.143 37.679c-2.92-1.638-4.948-.026-5.01 2.187-.137 4.044 5.001 6.184 8.661 8.498l-1.28-9.045c-.53-.391-1.015-.883-2.371-1.64z"
        />
        <path
          fill="#D1926B"
          d="M88.798 45.211a.88.88 0 01-.804-1.231c.788-1.794 3.131-4.2 5.877-3.929a.878.878 0 01.789.958c-.047.483-.49.848-.958.789-1.797-.183-3.519 1.568-4.101 2.888a.874.874 0 01-.803.525zM52.948 43.727a.877.877 0 01-.652-.289c-1.191-1.316-2.675-1.67-3.171-1.649-.449.024-.901-.331-.935-.817a.877.877 0 01.816-.935c1.208-.087 3.175.654 4.593 2.224a.878.878 0 01-.651 1.466z"
        />
        <path
          fill="#EBB686"
          d="M68.206 14.84C51.006 15.876 50.6 31.655 50.6 31.655c.341 3.227.961 19.274 7.344 29.14 7.15 11.071 17.208 11.754 24.557 3.958 8.393-8.857 8.166-24.762 8.05-37.07 0-.001-5.146-13.878-22.345-12.843z"
        />
        <path
          fill="#52322B"
          d="M61.674 40.096a1.17 1.17 0 01-1.155-.99l-.035-.219c-.032-.205-.031-.205-.048-.351a101.57 101.57 0 00-.183-1.541 1.17 1.17 0 011.018-1.306 1.165 1.165 0 011.306 1.018c.134 1.079.171 1.42.188 1.574l.068.465a1.171 1.171 0 01-1.159 1.35zM80.046 40.077c-.023 0-.048 0-.073-.002a1.17 1.17 0 01-1.096-1.24c.03-.508.187-1.969.217-2.155a1.156 1.156 0 011.346-.963c.635.104 1.064.7.966 1.335a53.03 53.03 0 00-.191 1.928 1.172 1.172 0 01-1.169 1.097z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#96433F"
            d="M76.806 34.445a.885.885 0 01-.599-.234.88.88 0 01-.045-1.241c1.069-1.151 2.508-1.835 3.946-1.875 1.367-.04 2.681.5 3.775 1.554a.877.877 0 01.022 1.241.876.876 0 01-1.241.023c-.758-.732-1.615-1.098-2.508-1.062-.971.027-1.958.505-2.708 1.315a.876.876 0 01-.642.279zM57.516 35.123a.88.88 0 01-.536-.182.88.88 0 01-.158-1.233c2.244-2.9 4.969-3.4 8.101-1.487a.876.876 0 11-.914 1.498c-2.34-1.425-4.126-1.099-5.796 1.064a.886.886 0 01-.697.34z"
          />
        </g>
        <g>
          <path
            fill="#D99467"
            d="M70.855 51.671c-.354 0-.746-.065-1.186-.211-1.403-.466-2.689-1.743-2.368-2.898.151-.541.579-1.096 1.897-1.045.015-4.691-.118-6.765-.767-9a.876.876 0 111.685-.488c.755 2.598.871 4.902.833 10.504a.874.874 0 01-.332.681.866.866 0 01-.739.17 5.297 5.297 0 00-.54-.096c.208.183.509.379.886.505.938.313 1.198.075 2.26-1.118l.114-.128a.878.878 0 111.31 1.17l-.113.127c-.832.934-1.629 1.827-2.94 1.827z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M70.928 56.169c-1.627.033-3.836-2.17-4.766-1.012-.899 1.11 1.731 4.532 4.805 4.532 3.521 0 5.907-3.72 4.665-4.68-1.065-.824-1.66 1.117-4.704 1.16z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M78.029 50.649c.63 1.94 2.617 1.535 3.027.164.91-3.032-3.903-2.861-3.027-.164zM59.787 50.576c.794 2.607 4.264 1.06 3.495-.895-.617-1.573-4.239-1.546-3.495.895z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#B54933"
          d="M50.193 5.864c-7.807 6.988-8.345 22.955-19.601 16.397-2.983 18.456 22.969 27.694 28.57-4.152L69.649 4.28C63.559-.698 55.648.981 50.193 5.864z"
        />
        <path
          fill="#CC543D"
          d="M40.273 32.758c-1.982 0-3.952-.755-5.567-2.168-2.382-2.104-4.05-4.826-4.96-8.093a.878.878 0 111.692-.471c.829 2.976 2.277 5.347 4.427 7.247 1.62 1.416 3.583 1.995 5.526 1.625 2.325-.441 4.408-2.237 5.864-5.055 1.157-2.238 1.838-5.102 2.561-8.134 1.784-7.49 3.801-15.957 14.035-15.957.215 0 .431.003.653.01a.879.879 0 01.848.908c-.016.484-.368.851-.908.848-.198-.007-.393-.01-.585-.01-8.857 0-10.545 7.1-12.334 14.607-.748 3.14-1.454 6.105-2.709 8.535-1.709 3.307-4.229 5.429-7.097 5.973-.48.091-.963.135-1.446.135z"
        />
        <path
          fill="#CC543D"
          d="M38.456 28.595c-3.332 0-6.472-2.146-8.625-5.895a.88.88 0 01.324-1.199.877.877 0 011.199.324c1.831 3.189 4.418 5.014 7.103 5.014h.055c2.236-.021 4.246-1.353 5.511-3.654.888-1.614 1.314-3.762 1.809-6.247.767-3.858 1.636-8.233 4.555-12.345a.876.876 0 011.225-.208.88.88 0 01.207 1.225c-2.702 3.805-3.532 7.983-4.264 11.67-.501 2.519-.974 4.899-1.993 6.75-1.581 2.874-4.145 4.536-7.034 4.564l-.072.001z"
        />
        <path
          fill="#CC543D"
          d="M41.465 35.731c-.737 0-1.483-.081-2.227-.245-5.331-1.18-9.069-6.349-9.521-13.167a.878.878 0 01.817-.934.87.87 0 01.934.817c.401 6.021 3.599 10.563 8.148 11.569 4.29.945 8.627-1.51 11.318-6.415 1.811-3.327 2.516-6.3 3.139-8.922.926-3.898 1.725-7.264 5.735-9.828a.879.879 0 11.946 1.479c-3.412 2.181-4.067 4.939-4.973 8.754-.648 2.729-1.383 5.823-3.307 9.358-2.63 4.798-6.71 7.534-11.009 7.534z"
        />
        <path
          fill="#943A32"
          d="M66.424 2.501c-7.367-2.238-13.926 6.981-9.796 16.61 3.63 8.459 16.325 14.165 25.493 7.12L69.649 4.28c-1.59-.895-1.485-1.252-3.225-1.779z"
        />
        <path
          fill="#B54933"
          d="M75.813 27.865c-5.313 0-9.831-3.058-12.459-6.946-3.54-5.236-4.577-13.501 1.505-19.275a.878.878 0 011.21 1.273c-5.371 5.098-4.503 12.221-1.261 17.018 2.976 4.4 9.113 8.32 16.609 4.888l.134-.054c.426-.193.958-.032 1.172.384.215.417.093.914-.313 1.147a1.796 1.796 0 01-.28.128c-2.18.998-4.306 1.437-6.317 1.437z"
        />
        <path
          fill="#B54933"
          d="M77.593 25.538c-2.663 0-5.342-1.078-7.451-3.091-4.447-4.245-5.641-11.418-3.274-19.683a.878.878 0 011.688.483c-2.18 7.617-1.16 14.152 2.799 17.93 2.458 2.346 5.814 3.187 8.754 2.195a.88.88 0 01.561 1.665c-1 .337-2.038.501-3.077.501z"
        />
        <g>
          <path
            fill="#B54933"
            d="M81.939 1.629C75.818-1.49 71.562.128 69.649 4.28c-.565 31.047 31.96 34.188 37.582 11.931-11.963 9.004-14.328-8.958-25.292-14.582z"
          />
        </g>
        <g>
          <path
            fill="#CC543D"
            d="M94.96 27.345c-4.92 0-9.46-3.622-12.154-9.702-.489-1.098-.972-2.42-1.482-3.819-2.011-5.508-4.516-12.364-9.521-11.385a.892.892 0 01-1.03-.694.877.877 0 01.694-1.029c6.476-1.258 9.384 6.694 11.506 12.506.501 1.371.973 2.664 1.438 3.708 2.405 5.427 6.348 8.659 10.551 8.659l.054-.001c4.356-.028 8.292-3.41 10.802-9.278.088-.212.173-.442.256-.667l.058-.151a.878.878 0 011.644.616l-.055.148c-.092.244-.185.494-.285.736-2.8 6.548-7.32 10.318-12.407 10.352l-.069.001z"
          />
          <path
            fill="#CC543D"
            d="M92.443 29.513c-1.985 0-4.015-.454-6.047-1.37-6.931-3.116-8.452-8.298-9.924-13.31-1.231-4.194-2.395-8.156-6.728-10.822a.876.876 0 11.919-1.495c4.909 3.019 6.223 7.494 7.494 11.823 1.422 4.843 2.765 9.418 8.96 12.204 5.442 2.453 10.67 1.204 15.122-3.609 1.913-2.069 3.413-5.316 3.853-7.321a.886.886 0 011.046-.669.876.876 0 01.669 1.045c-.502 2.287-2.132 5.815-4.277 8.135-3.298 3.566-7.104 5.389-11.087 5.389z"
          />
          <path
            fill="#CC543D"
            d="M97.492 22.807c-2.89 0-5.604-1.302-7.676-3.693-2.196-2.534-3.052-5.646-3.878-8.653-.72-2.623-1.399-5.097-2.897-7.232a.88.88 0 011.439-1.008c1.671 2.383 2.425 5.124 3.152 7.774.81 2.95 1.575 5.735 3.511 7.969 1.803 2.081 4.161 3.181 6.646 3.083 2.81-.106 5.53-1.743 7.66-4.611.27-.36.515-.716.761-1.105a.877.877 0 111.483.938c-.271.43-.541.822-.837 1.217-2.451 3.3-5.648 5.189-9.001 5.315a8.847 8.847 0 01-.363.006z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar10: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#F2C296"
        d="M83.687 56.82l-24.403.672c-.248 3.865 1.586 15.114-1.647 22.301-.44.975-.934 1.861-1.455 2.705 4.712 12.619 24.658 12.619 29.308-.158-3.191-7.532-2.454-19.287-1.803-25.52z"
      />
      <path
        fill="#915169"
        d="M87.322 85.589c-.725-.945-1.323-2.048-1.832-3.249-9.593 4.016-20.532 4.709-29.308.159-10.04 16.243-34.417 9.556-41.75 30.838-.003.06-.815 13.954-1.95 26.334h115.194c-.674-11.028-1.033-22.375-1.629-27.864-4.247-17.418-25.426-8.871-38.725-26.218z"
      />
      <path
        fill="#7997C7"
        d="M71.163 94.21c-6.799 0-13.684-1.746-20.455-5.233a.888.888 0 11.815-1.581c12.736 6.562 25.882 6.704 38.01.404a.89.89 0 01.819 1.579C84.149 92.6 77.695 94.21 71.163 94.21z"
      />
      <path
        fill="#7997C7"
        d="M57.883 91.955a.887.887 0 01-.817-1.238c.32-.75.691-1.584 1.07-2.44l.193-.428a198.91 198.91 0 011.762-3.838.888.888 0 111.604.766 201.085 201.085 0 00-1.745 3.803l-.191.423c-.375.844-.741 1.671-1.059 2.414a.887.887 0 01-.817.538zM63.408 93.437a.892.892 0 01-.874-1.061l.05-.249a126.136 126.136 0 011.573-7.044.888.888 0 111.722.444c-.36 1.393-.748 3.059-1.094 4.691-.169.783-.318 1.543-.458 2.251l-.048.249a.89.89 0 01-.871.719zM68.562 94.112a.889.889 0 01-.889-.889c0-.861.023-1.695.072-2.507.119-2.126.361-4.009.542-5.212a.883.883 0 011.012-.745.888.888 0 01.746 1.011 54.792 54.792 0 00-.524 5.049c-.046.78-.069 1.58-.069 2.404a.891.891 0 01-.89.889zM73.93 94.1a.888.888 0 01-.882-.788 43.468 43.468 0 01-.206-2.335c-.127-1.702-.167-3.47-.12-5.548a.889.889 0 01.889-.87h.02a.89.89 0 01.869.909c-.045 2.02-.008 3.731.117 5.39.047.791.117 1.534.198 2.253a.889.889 0 01-.885.989zM79.25 93.354a.89.89 0 01-.882-.79 90.764 90.764 0 01-.153-1.512l-.606-6.353a.888.888 0 111.771-.162l.604 6.342c.058.584.107 1.098.151 1.485a.888.888 0 01-.885.99zM83.958 92.05a.888.888 0 01-.854-.643 92.302 92.302 0 01-.504-1.857 156.57 156.57 0 01-1.372-5.752.889.889 0 111.739-.373 157.41 157.41 0 001.355 5.679c.174.661.338 1.283.49 1.811a.891.891 0 01-.607 1.102 1.01 1.01 0 01-.247.033z"
      />
      <g>
        <path
          fill="#7997C7"
          d="M114.004 140.56a.888.888 0 01-.885-.98c.952-9.383 3.064-26.639 6.514-36.782a.886.886 0 011.127-.556.887.887 0 01.556 1.127c-3.393 9.978-5.483 27.083-6.428 36.392a.891.891 0 01-.884.799z"
        />
      </g>
      <g>
        <path
          fill="#7997C7"
          d="M28.679 140.56a.889.889 0 01-.886-.843c-.896-17.073-3.171-33.026-5.409-37.936a.895.895 0 01.809-1.264c.394 0 .727.251.844.604 2.731 6.108 4.781 24.211 5.531 38.502a.89.89 0 01-.842.935c-.014.002-.031.002-.047.002z"
        />
      </g>
      <g>
        <path
          fill="#7997C7"
          d="M75.105 2.173c-1.527-.11-.652 1.707-.703 2.415-.225 2.547-8.138-2.708-9.936-3.066-3.64-.729-.044 3.248.113 4.008.432 2.258-4.863.13-6.988-.28-1.382-.269-4.301-.299-3.658 1.129 3.674 7.987-2.041 2.97-7.398 15.868-2.53 6.099-2.229 13.937-1.614 15.202 16.729 9.835 34.082 10.471 52.126.901.34-2.095.347-4.22.341-6.85-.019-9.5-2.098-12.823-6.813-17.731-2.054-2.155-13.429-11.448-15.47-11.596z"
        />
        <path
          fill="#89A6D9"
          d="M59.448 16.475a.886.886 0 01-.729-.379c-1.529-2.187-2.884-3.848-4.263-5.226a.889.889 0 011.257-1.257c1.454 1.454 2.873 3.19 4.461 5.464a.888.888 0 01-.726 1.398zM65.918 16.806a.882.882 0 01-.678-.315c-5.124-6.047-8.308-9.431-10.019-10.646a.888.888 0 01-.209-1.239.886.886 0 011.24-.209c1.252.889 3.559 2.938 10.345 10.947a.888.888 0 01-.679 1.462zM75.269 17.945a.854.854 0 01-.311-.057c-2.417-.903-4.303-2.032-6.784-5.138-1.764-2.21-3.435-4.094-4.965-5.597a.89.89 0 011.245-1.269c1.582 1.553 3.301 3.491 5.109 5.757 2.236 2.798 3.84 3.769 6.017 4.583a.888.888 0 01-.311 1.721zM87.322 19.782a.889.889 0 01-.889-.889c0-2.839-2.193-5.972-5.216-7.45-4.175-2.046-4.905-2.938-6.115-4.415a27.81 27.81 0 00-1.394-1.605.889.889 0 111.294-1.22c.639.677 1.085 1.222 1.476 1.698C77.606 7.278 78.174 7.97 82 9.845c3.599 1.761 6.211 5.566 6.211 9.048a.889.889 0 01-.889.889z"
        />
        <path
          fill="#89A6D9"
          d="M82.783 17.708a.887.887 0 01-.373-.083c-5.64-2.601-9.999-7.001-12.883-9.912-.758-.766-1.413-1.427-1.923-1.881-.955-.837-3.233-2.426-4.896-3.585A.888.888 0 1163.724.789c1.698 1.184 4.023 2.806 5.057 3.712.557.495 1.23 1.175 2.01 1.962 2.794 2.819 7.017 7.082 12.365 9.55a.888.888 0 01-.373 1.695zM55.449 20.832a.802.802 0 01-.735-.456c-.715-1.456-1.623-3.307-3.854-5.342a.888.888 0 111.196-1.313c2.482 2.261 3.517 4.37 4.202 5.766.216.441.06 1.025-.381 1.242a.965.965 0 01-.428.103zM52.537 25.933a.892.892 0 01-.815-.533c-1.08-2.469-2.474-4.433-4.144-5.84a.888.888 0 111.146-1.358c1.88 1.583 3.437 3.767 4.627 6.486a.89.89 0 01-.814 1.245zM51.339 30.922a.883.883 0 01-.671-.307c-2.974-3.428-4.522-4.326-5.43-4.704a.888.888 0 11.683-1.641c1.163.483 2.906 1.509 6.089 5.18a.889.889 0 01-.671 1.472zM50.025 34.975a.89.89 0 01-.765-.434c-1.239-2.08-2.786-3.27-4.734-3.634a.889.889 0 11.329-1.747c2.443.458 4.44 1.963 5.933 4.472a.89.89 0 01-.763 1.343zM87.322 19.782a.888.888 0 01-.833-1.199c.284-.763.554-1.432.802-2.049.583-1.452 1.045-2.597 1.289-3.972a.888.888 0 111.75.312c-.276 1.554-.769 2.776-1.39 4.323-.243.604-.507 1.259-.785 2.006a.89.89 0 01-.833.579zM89.774 23.313a.887.887 0 01-.75-1.364c1.492-2.361 2.6-4.281 3.293-5.708a.89.89 0 011.6.776c-.731 1.508-1.84 3.433-3.39 5.882a.887.887 0 01-.753.414zM91.933 28.362a.886.886 0 01-.603-1.541c2.192-2.027 3.555-3.501 4.288-4.64a.888.888 0 011.229-.266.892.892 0 01.267 1.229c-.829 1.286-2.241 2.823-4.578 4.982a.887.887 0 01-.603.236zM91.909 33.778a.89.89 0 01-.302-1.724c1.753-.635 3.504-1.873 5.063-3.58a.889.889 0 111.313 1.199c-1.752 1.919-3.747 3.319-5.771 4.052a.896.896 0 01-.303.053z"
        />
      </g>
      <g>
        <path
          fill="#F2C296"
          d="M46.095 45.276c1.133.878 2.719 1.938 4.082 2.409l-.358-9.426c-6.163-7.885-12.401.297-3.724 7.017zM91.699 40.471l.393 7.543c16.241-6.385 5.539-20.849-.393-7.543z"
        />
        <path
          fill="#EDAA7E"
          d="M49.48 43.109a.891.891 0 01-.615-.246 14.837 14.837 0 01-.488-.495c-.632-.658-1.177-1.228-3.926-2.616a.89.89 0 01.8-1.588c3.021 1.525 3.694 2.229 4.409 2.974.134.141.272.285.434.439a.89.89 0 01-.614 1.532zM91.854 44.537a.889.889 0 01-.794-1.286c1.279-2.567 3.044-4.101 5.9-5.129a.889.889 0 11.603 1.674c-2.043.735-3.661 1.738-4.912 4.249a.89.89 0 01-.797.492z"
        />
        <path
          fill="#FFD1A6"
          d="M84.053 12.505c-10.351 6.389-19.431 3.082-25.012 0-12.347 6.104-12.319 21.412-10.057 35.066 4.938 29.846 38.182 23.791 42.819 7.389 1.664-5.836 2.731-20.695 2.05-26.642-1.185-9.845-4.294-12.578-9.8-15.813z"
        />
        <path
          id="eyebrow"
          fill="#B0695A"
          d="M54.887 31.317a.889.889 0 01-.565-1.575c5.101-4.204 9.55-1.833 10.791-1.007a.888.888 0 11-.983 1.48c-1.264-.838-4.632-2.436-8.677.9a.899.899 0 01-.566.202zM86.273 30.878a.885.885 0 01-.533-.178c-1.865-1.403-4.144-2.454-8.194-.681a.888.888 0 11-.713-1.627c3.844-1.688 6.922-1.412 9.977.886a.89.89 0 01-.537 1.6z"
        />
        <path
          fill="#E8B48B"
          d="M69.974 47.743h-.03c-2.041-.008-3.835-1.382-4.801-3.673a.89.89 0 01.363-1.108c.608-.362 1.325-.365 1.969-.236.169-5.439-.88-8.145-1.226-8.877a.888.888 0 111.609-.757c.53 1.125 1.72 4.44 1.34 10.888a.891.891 0 01-1.249.76 4.12 4.12 0 00-.509-.191c.528.714 1.342 1.412 2.512 1.417h.023c1.388 0 2.263-.595 2.924-1.987a.89.89 0 011.607.765c-.947 1.989-2.472 2.999-4.532 2.999z"
        />
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M83.888 44.229c-1.107.021-2.307.803-2.436 1.906-.373 3.16 3.828 3.431 4.72 1.345.783-1.834-.578-3.284-2.284-3.251zM57.577 43.961c-1.731-.067-2.744 1.162-2.511 2.916.449 3.377 3.711 2.752 4.793.941.954-1.596.094-3.764-2.282-3.857z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M71.454 51.886c-4.103.468-6.294-2.344-9.09-.605a.593.593 0 00.122 1.064c2.366.808 6.966 6.659 14.039 1.054 1.756-1.392 2.265-1.112 2.199-1.782-.175-1.739-6.84.219-7.27.269z"
          />
        </g>
        <g>
          <path
            fill="#4D2323"
            d="M81.65 38.143l-.061-.001a1.187 1.187 0 01-1.124-1.244l.02-.477c.015-.42.033-.802.076-1.066a1.175 1.175 0 011.36-.98c.646.105 1.084.713.98 1.36-.031.191-.037.468-.048.771l-.021.513a1.183 1.183 0 01-1.182 1.124zM59.963 38.159a1.186 1.186 0 01-1.167-.984c-.201-1.17-.208-1.242-.213-1.424-.069-.652.397-1.284 1.049-1.353.633-.073 1.23.354 1.3 1.004.019.171.02.236.021.288.008.083.045.299.18 1.083a1.185 1.185 0 01-1.17 1.386z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar11: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path fill="#DE9E3E" d="M66.125 17.263l-2.652-9.818C41.47 11.241 36.21 61.646 65.854 78.363c5.918-5.844-1.44-53.039.271-61.1z" />
      <path
        fill="#E0AF43"
        d="M64.697 73.881a.861.861 0 01-.56-.203c-10.109-8.444-15.868-20.713-15.802-33.661.057-11.079 4.454-21.004 12.066-27.231a.871.871 0 011.229.123.87.87 0 01-.123 1.229c-7.206 5.897-11.37 15.332-11.424 25.889-.063 12.423 5.468 24.2 15.174 32.309a.873.873 0 01-.56 1.545z"
      />
      <path
        fill="#E0AF43"
        d="M62.13 6.192c-2.034 3.756-1.674 7.577.166 11.101 3.567 6.826 2.4 44.705 17.242 63.013 5.646-1.988 9.565-4.598 13.66-11.987 7.989-14.363 11.328-32.467 5.941-49.268C91.839-3.714 67.355-3.442 62.13 6.192z"
      />
      <path
        fill="#EDBE5F"
        d="M93.835 39.358a.875.875 0 01-.845-.648c-2.139-8.031-5.812-9.361-11.898-11.563-4.199-1.519-9.426-3.41-15.595-8.204-1.642-1.273-3.24-2.782-5.184-4.887a.873.873 0 111.284-1.186c1.876 2.033 3.409 3.48 4.973 4.693 5.95 4.624 11.033 6.462 15.117 7.94 6.166 2.23 10.62 3.843 12.993 12.757a.875.875 0 01-.845 1.098z"
      />
      <path
        fill="#EDBE5F"
        d="M94.358 38.401a.874.874 0 01-.868-.782c-1.816-17.198-10.371-19.347-19.428-21.624-4.756-1.196-9.672-2.431-13.686-5.88a.874.874 0 111.141-1.326c3.7 3.179 8.414 4.364 12.971 5.51 9.241 2.323 18.797 4.724 20.741 23.136a.875.875 0 01-.871.966z"
      />
      <path
        fill="#EDBE5F"
        d="M78.316 78.545a.873.873 0 01-.308-1.693c13.634-5.137 16.676-26.818 17.274-39.285.729-14.517-4.82-21.887-9.603-25.514-6.366-4.832-15.387-5.967-24.129-3.041a.876.876 0 01-1.107-.552.872.872 0 01.551-1.106c9.289-3.109 18.914-1.874 25.744 3.306 5.118 3.882 11.057 11.718 10.291 26.993C95.658 66.189 86.264 75.61 78.625 78.49a.904.904 0 01-.309.055z"
      />
      <path
        fill="#EDBE5F"
        d="M76.772 75.92a.877.877 0 01-.422-1.643c3.407-1.87 6.823-4.265 8.735-9.094 3.796-9.586 2.112-17.004 1.211-19.75a.876.876 0 011.664-.544c.958 2.924 2.758 10.82-1.248 20.938-2.116 5.342-5.825 7.955-9.52 9.982a.831.831 0 01-.42.111z"
      />
      <g>
        <path
          fill="#E0AF43"
          d="M75.942 35.207a.867.867 0 01-.444-.122c-8.643-5.113-10.725-9.097-14.172-15.698l-.166-.317c-1.548-2.965-1.852-7.658-.72-11.157a.874.874 0 111.664.538c-.986 3.045-.725 7.262.606 9.809l.165.318c3.417 6.54 5.299 10.144 13.513 15.002a.873.873 0 01-.446 1.627z"
        />
      </g>
      <g>
        <path
          fill="#F0C390"
          d="M82.79 84.825c-1.806-9.639-1.401-23.641-1.393-23.758l-19.185-.007c-.058 25.035-1.042 39.713-21.151 42.438 19.692 23.819 57.571 9.731 62.511 1.772-11.441-1.442-18.4-7.738-20.782-20.445z"
        />
      </g>
      <g>
        <path
          fill="#86C0CF"
          d="M89.169 91.888c-2.907-2.961-4.397-6.217-5.214-10.386-8.07 4.678-16.608 4.566-25.568.113-2.884 10.3-12.458 12.621-23.892 20.531-4.683 4.418-7.944 21.506-10.36 37.486H119.9c-1.758-19.02-3.689-30.83-7.504-35.864-5.099-3.409-16.369-4.912-23.227-11.88z"
        />
        <path
          fill="#86C0CF"
          d="M84.989 76.367c-.069-1.337-1.53-2.151-2.764-1.545-7.003 3.432-12.155 4.714-22.451-.54-1.276-.65-2.801.262-2.78 1.66.034 2.281-.078 5.333-.799 7.674-.238.771.027 1.612.717 2.061 9.185 5.951 18.947 5.989 28.888 1.153a1.835 1.835 0 00.828-2.515c-1.2-2.322-1.515-5.536-1.639-7.948z"
        />
        <path
          fill="#7997C7"
          d="M71.872 91.19c-5.357 0-10.517-1.594-15.436-4.779a.876.876 0 01.952-1.469c8.621 5.587 18.052 5.956 28.029 1.102a.876.876 0 011.17.403.88.88 0 01-.404 1.171C81.284 90 76.504 91.19 71.872 91.19z"
        />
        <path
          fill="#7997C7"
          d="M59.977 88.126l-.076-.003a.876.876 0 01-.796-.947c.206-2.391.646-8.1.844-12.591a.878.878 0 01.912-.835c.481.022.856.43.834.912-.197 4.519-.641 10.26-.848 12.664a.875.875 0 01-.87.8zM63.823 89.805h-.021a.876.876 0 01-.854-.895c.064-2.754.169-6.826.255-10.174l.067-2.62a.876.876 0 01.875-.852h.023a.876.876 0 01.852.897l-.068 2.62c-.085 3.345-.191 7.415-.254 10.169a.876.876 0 01-.875.855zM67.709 90.831a.873.873 0 01-.871-.818c-.238-3.73-.282-8.741-.111-12.767.019-.484.447-.894.91-.837a.875.875 0 01.837.91c-.167 3.969-.124 8.908.109 12.581a.875.875 0 01-.816.929c-.02.002-.038.002-.058.002zM71.325 91.169a.875.875 0 01-.87-.798c-.377-4.311-.526-9.432-.507-12.594a.874.874 0 01.875-.867h.006a.872.872 0 01.868.879c-.019 3.121.128 8.175.5 12.43a.874.874 0 01-.872.95zM75.646 90.889a.872.872 0 01-.866-.77 98.359 98.359 0 01-.662-12.653.873.873 0 01.875-.859h.014a.875.875 0 01.86.889c-.063 3.899.179 8.54.648 12.416a.873.873 0 01-.869.977zM79.343 90.084a.874.874 0 01-.861-.729c-.757-4.461-1.008-10.474-1.08-12.852a.875.875 0 01.848-.901c.526 0 .886.367.901.849.056 1.826.297 8.136 1.055 12.612a.872.872 0 01-.863 1.021zM83.119 88.732a.872.872 0 01-.854-.694c-1.213-5.787-1.433-8.896-1.629-12.976a.875.875 0 01.831-.916c.472-.037.893.35.916.831.192 3.998.407 7.042 1.594 12.7a.877.877 0 01-.858 1.055z"
        />
        <g>
          <path
            fill="#7997C7"
            d="M105.701 140.511l-.053-.001a.876.876 0 01-.822-.925c.756-12.958 2.813-24.848 6.286-36.347a.871.871 0 011.09-.584c.463.14.725.628.584 1.09-3.434 11.367-5.466 23.123-6.213 35.943a.876.876 0 01-.872.824zM38.132 140.511a.876.876 0 01-.875-.846c-.501-15.319-1.796-27.801-3.85-37.093a.88.88 0 01.854-1.068.87.87 0 01.865.745c2.07 9.392 3.375 21.961 3.879 37.358a.875.875 0 01-.846.903l-.027.001z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#F0C390"
          d="M94.348 33.258c-2.347-.643-4.673 2.531-4.79 2.627l-1.54 11.984c.191-.162 5.312-3.642 7.492-7.436 2.154-3.795.856-6.62-1.162-7.175zM55.025 47.507l-.355-11.45c-5.723-7.523-11.509.863.355 11.45z"
        />
        <path
          fill="#EDB680"
          d="M53.948 40.873a.874.874 0 01-.823-.579c-.631-1.754-1.772-2.383-2.384-2.721a3.725 3.725 0 01-.396-.241.874.874 0 011.05-1.399c.044.031.111.063.189.108.698.386 2.332 1.286 3.187 3.661a.877.877 0 01-.823 1.171zM90.031 40.114a.873.873 0 01-.719-1.372c.7-1.012 2.185-2.102 3.309-2.839a.873.873 0 11.959 1.461c-1.363.894-2.42 1.782-2.828 2.372a.874.874 0 01-.721.378z"
        />
        <path
          fill="#FFD399"
          d="M83.051 31.791c-8.057-1.958-17.198-7.684-20.755-14.516-1.573 6.681-4.815 11.111-9.479 15.926 1.212 33.988 16.767 40.448 26.316 34.536 10.692-6.658 11.123-23.505 12.44-35.679-2.762.339-5.538.456-8.522-.267z"
        />
        <path
          fill="#75473D"
          d="M83.284 38.668l-.061-.001a1.167 1.167 0 01-1.105-1.224c.04-.765.079-1.465.117-2.103a1.166 1.166 0 012.328.141c-.039.631-.078 1.325-.115 2.08a1.167 1.167 0 01-1.164 1.107zM61.667 38.619c-.56 0-1.054-.404-1.149-.975-.163-.976-.189-1.582-.203-1.906l-.008-.147a1.177 1.177 0 011.038-1.278 1.158 1.158 0 011.279 1.011c.008.072.015.175.021.314.013.295.034.789.173 1.624a1.167 1.167 0 01-1.151 1.357z"
        />
        <g>
          <path
            fill="#EDB680"
            d="M71.511 51.831c-.415 0-.879-.097-1.405-.323-.905-.386-2.432-1.941-3.202-3.264a.869.869 0 01-.051-.774.87.87 0 01.586-.51c.782-.203 1.607-.116 2.284.034-.025-.763-.046-1.785-.07-2.944l-.025-1.171a54.394 54.394 0 00-.55-6.633 8.004 8.004 0 01-.089-.785.876.876 0 011.75-.01c.004.094.032.278.071.55.156 1.105.479 3.403.567 6.834l.024 1.179c.028 1.377.075 3.684.126 4.05a.873.873 0 01-1.151.945c-.22-.075-.556-.192-.934-.283.552.604 1.106 1.069 1.352 1.173.948.409 1.235.184 2.307-1.134.313-.383.665-.816 1.085-1.239a.873.873 0 111.241 1.231c-.367.372-.68.756-.969 1.112-.759.935-1.595 1.962-2.947 1.962zm-.773-16.371h.011-.011z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M71.854 56.68c-.998-.026-1.454-.16-2.745-.876-1.521-.845-2.245-.338-2.166.435.147 1.445 3.309 3.112 4.901 3.112 2.268 0 5.948-2.808 4.66-3.894-1.194-1.003-2.794 1.272-4.65 1.223z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M83.976 48.698c-1.229-.488-3.563-.168-3.176 2.165.461 2.77 2.82 2.756 3.962 1.458.963-1.096.938-2.943-.786-3.623zM58.979 51.552c.573 1.762 3.708 2.306 4.585.206 1.523-3.616-6.078-4.804-4.585-.206z"
          />
        </g>
        <g>
          <path
            id="eyebrow"
            fill="#DB8A5C"
            d="M57.09 33.533a.874.874 0 01-.729-1.356c1.084-1.646 4.236-3.522 7.307-2.775 1.152.28 2.075 1.09 2.816 1.741l.214.188a.874.874 0 11-1.145 1.321l-.224-.194c-.628-.553-1.341-1.179-2.074-1.358-2.346-.565-4.747 1.001-5.434 2.041a.87.87 0 01-.731.392zM78.316 32.968a.874.874 0 01-.557-1.548 12.848 12.848 0 011.839-1.288.874.874 0 01.863 1.521c-.507.287-1.041.663-1.589 1.115a.865.865 0 01-.556.2z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#E0AF43"
          d="M98.896 121.608c2.746-5.072 6.354-8.643 8.096-15.024 1.717-6.29.455-10.02-2.212-14.647-5.542-9.619-13.435-11.603-15.444-18.354-1.318 1.004-2.931 1.597-4.449 2.271.152 1.627.419 3.904.968 7.313 1.83 11.366-15.811 29.006-4.246 41.301 3.532 3.755 9.142 5.037 11.093 10.063.775 1.995.553 3.637-.103 5.101h8.853c4.837-6.64-6.939-10.037-2.556-18.024z"
        />
        <path
          fill="#EDBE5F"
          d="M96.464 140.511a.877.877 0 01-.702-1.396c2.296-3.092 2.466-5.463.589-8.182-6.45-9.325-6.492-12.305-4.967-18.441.556-2.244 1.735-4.438 2.982-6.761 1.369-2.549 2.784-5.181 3.352-7.931.509-2.489.263-4.788-.755-7.029-1.215-2.683-3.183-5.059-5.265-7.574-1.973-2.382-4.013-4.845-5.479-7.697a.873.873 0 01.378-1.177.872.872 0 011.178.378c1.38 2.683 3.357 5.071 5.271 7.383 2.064 2.491 4.199 5.069 5.511 7.965 1.176 2.588 1.462 5.239.875 8.104-.618 2.999-2.096 5.748-3.523 8.408-1.194 2.221-2.322 4.322-2.827 6.354-1.329 5.347-1.615 7.881 4.71 17.025 2.973 4.307 1.229 7.723-.623 10.22a.883.883 0 01-.705.351z"
        />
        <path
          fill="#EDBE5F"
          d="M92.929 139.722a.876.876 0 01-.735-1.349c.815-1.27 1.182-2.557 1.189-4.175.014-2.856-2.936-6.125-5.537-9.007-1.054-1.168-2.051-2.271-2.886-3.362-4.278-5.547-1.727-11.231.977-17.249 1.962-4.37 3.991-8.889 3.58-13.709-.299-3.557-2.057-8.689-4.729-11.198a.875.875 0 011.198-1.275c3.022 2.838 4.94 8.351 5.273 12.326.45 5.271-1.673 10-3.728 14.574-2.589 5.766-4.825 10.745-1.186 15.466.796 1.037 1.768 2.115 2.798 3.256 2.953 3.271 6.006 6.652 5.988 10.188-.009 1.944-.476 3.566-1.468 5.111a.869.869 0 01-.734.403z"
        />
      </g>
    </svg>
  ),
  avatar12: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#D1926B"
        d="M83.925 55.946l-24.188.667c-.23 3.52.265 13.321-2.933 20.436a22.168 22.168 0 01-3.542 5.539c12.35 4.129 24.502 4.289 36.433.056-.01-.014-.021-.024-.029-.038-5.245-6.849-6.458-19.414-5.741-26.66z"
      />
      <path
        fill="#3D809C"
        d="M89.695 82.644c-11.931 4.233-24.083 4.073-36.433-.056-7.931 9.079-21.647 9.597-30.764 16.722-5.37 5.983-7.718 26.837-9.372 41.517h114.79c-1.304-15.903-3.963-35.76-9.101-40.709-7.652-5.322-19.831-5.377-29.12-17.474z"
      />
      <path
        fill="#418BAB"
        d="M33.644 104.495c-.586 0-1.04-.124-1.326-.233-1.204-.459-2.024-1.528-2.09-2.724-.059-1.076.518-2.031 1.542-2.559.741-.378 1.619-.475 2.468-.566.934-.103 1.897-.208 2.654-.675.476-.295.749-.653.729-.958-.008-.12-.065-.22-.15-.258-.109-.051-.27-.001-.444.133a.879.879 0 01-1.234-.167.88.88 0 01.167-1.234c.695-.531 1.535-.659 2.242-.335a2.05 2.05 0 011.178 1.749c.062.979-.507 1.915-1.561 2.569-1.097.677-2.315.81-3.39.927-.723.079-1.405.153-1.856.384-.403.207-.606.517-.585.893.023.412.327.935.958 1.175 1.068.406 2.506-.181 3.937-1.616a.88.88 0 111.248 1.243c-1.804 1.81-3.381 2.252-4.487 2.252zM52.604 98.896c-.933 0-1.898-.335-2.605-.984-.547-.503-2.158-2.405.11-5.746a.877.877 0 011.223-.233.88.88 0 01.234 1.223c-1.024 1.511-1.159 2.739-.375 3.459.701.644 1.833.662 2.347.243.726-.587.034-1.954-.297-2.514a.88.88 0 111.517-.897c1.692 2.862.486 4.297-.111 4.781-.555.449-1.289.668-2.043.668z"
      />
      <path
        fill="#418BAB"
        d="M46.926 105.028a.879.879 0 01-.713-.362c-.802-1.103-1.543-2.362-.965-3.339.662-1.116 2.287-.908 4.742-.596 3.422.438 8.106 1.036 9.658-2.377.677-1.456-.485-2.745-2.335-4.545l-.224-.219a.88.88 0 111.232-1.26l.221.215c1.763 1.718 3.958 3.854 2.706 6.545-2.083 4.589-7.739 3.865-11.481 3.388-1.025-.13-2.382-.304-2.927-.208.067.2.257.614.798 1.358.287.394.2.945-.194 1.23a.877.877 0 01-.518.17zM62.275 102.032a.881.881 0 01-.727-1.376c.729-1.07 1.988-2.46 2.594-3.128l.001-.001a11.11 11.11 0 01-.087-.145c-.46-.776-1.23-2.077-.925-3.504a2.859 2.859 0 012.179-2.228c1.183-.278 2.438.11 3.127.967.624.778.694 1.822.19 2.866a.882.882 0 01-1.588-.767c.206-.425.213-.76.023-.996-.259-.323-.841-.475-1.347-.355-.324.077-.735.292-.862.883-.162.752.347 1.609.718 2.235.329.556.613 1.035.39 1.572-.082.178-.115.214-.516.656-.578.639-1.783 1.966-2.441 2.935a.878.878 0 01-.729.386zM68.893 89.307c-.887 0-1.744-.311-2.331-.881-.464-.45-1.167-1.464-.661-3.175a.88.88 0 111.689.5c-.185.627-.118 1.103.201 1.412.382.372 1.096.49 1.729.282.345-.112.944-.42 1.08-1.212.017-.119.017-.201.012-.26a.877.877 0 01.845-1.108c.424 0 .799.302.878.717.054.286.056.58.006.925-.212 1.248-1.062 2.217-2.274 2.612a3.782 3.782 0 01-1.174.188z"
      />
      <path
        fill="#418BAB"
        d="M40.966 114.043c-.879 0-1.72-.395-2.419-1.146-2.475-2.631.188-5.677 1.95-7.694.474-.541.921-1.053 1.183-1.449.637-.951.759-1.823.329-2.339-.206-.244-.444-.286-.502-.264-.012.014-.061.111-.061.328a.882.882 0 01-1.762 0c0-.983.471-1.73 1.259-1.996.84-.288 1.868.079 2.491.893.879 1.147.772 2.774-.286 4.353-.325.492-.809 1.048-1.323 1.635-1.912 2.187-3.272 3.969-1.992 5.33.446.479.916.669 1.406.558.748-.164 1.487-.996 1.838-2.068.054-.164.086-.315.116-.453.343-1.579 1.082-2.113 5.315-2.612a.884.884 0 01.979.772.884.884 0 01-.772.979c-3.624.427-3.69.73-3.799 1.235a6.253 6.253 0 01-.163.628c-.557 1.696-1.758 2.938-3.136 3.24-.219.047-.436.07-.651.07zM54.84 111.512c-1.458 0-2.7-.793-3.297-2.17-.74-1.705-.226-3.661 1.222-4.651a.88.88 0 01.994 1.455c-.851.582-.945 1.695-.599 2.494.184.422.771 1.369 2.242 1.045.408-.09.694-.437.863-.712.396-.65.561-1.59.39-2.235a.908.908 0 01.127-.731c.249-.365.6-.401 1.007-.444.894-.094 1.2-.218 1.296-.31-.021-.011-.057-.176-.282-.494a.882.882 0 011.441-1.015c.591.839.74 1.595.443 2.249-.4.881-1.421 1.148-2.207 1.262a5.153 5.153 0 01-.711 2.637c-.497.813-1.184 1.337-1.985 1.514-.323.07-.638.106-.944.106zM26.777 115.944a.881.881 0 01-.728-.383c-.391-.569-.47-1.199-.225-1.772.508-1.187 2.484-2.065 5.871-2.612 1.791-.381 2.911-1.135 3.036-2.021a1.238 1.238 0 00-.61-1.233c-.336-.182-.673-.124-1.002.165-.396.355-.501.774-.571 1.052a2.232 2.232 0 01-.108.338.882.882 0 01-1.624-.685c.117-.458.334-1.305 1.13-2.019.891-.789 2.013-.938 3.011-.403 1.067.575 1.692 1.822 1.52 3.033-.14.983-.893 2.744-4.37 3.491-.015.004-.115.02-.129.023-3.162.509-4.408 1.263-4.529 1.559.005.003.018.036.055.09a.88.88 0 01-.727 1.377zM32.081 121.167c-2.337 0-3.118-1.41-3.316-1.89-.499-1.213-.097-2.651.954-3.421.476-.348 2.221-1.323 4.724.774a.881.881 0 01-1.131 1.35c-1.024-.857-1.979-1.124-2.552-.703-.394.287-.554.871-.366 1.329.267.649 1.184.92 2.436.737a.876.876 0 011.001.74.879.879 0 01-.74 1.001 6.449 6.449 0 01-1.01.083zM39.174 124.271c-.454 0-.913-.095-1.357-.286-1.275-.551-2.011-1.788-1.834-3.078.212-1.537 1.132-2.461 1.805-3.134.208-.209.511-.513.589-.67-.293-.469-1.836-1.383-2.403-1.62a.893.893 0 01-.499-1.123.869.869 0 011.083-.538c.038.013 3.757 1.583 3.593 3.368-.038.745-.585 1.295-1.115 1.826-.578.579-1.176 1.18-1.307 2.131-.085.612.372 1.04.788 1.221.563.245 1.399.216 2.049-.588a.88.88 0 111.37 1.108c-.729.9-1.731 1.383-2.762 1.383zm-.766-7.108h.011-.011zM45.815 120.18a.85.85 0 01-.315-.059c-2.356-.904-2.929-2.09-2.995-2.924-.067-.874.41-1.695 1.277-2.196 1.117-.625 2.287-.234 3.418.144.584.195 1.186.396 1.765.453.413.043.937.02 1.086-.31.266-.587-.233-1.989-1.375-3.065a.88.88 0 111.207-1.282c1.655 1.558 2.4 3.692 1.771 5.076-.211.466-.905 1.534-2.862 1.334-.775-.075-1.506-.319-2.15-.534-.839-.281-1.563-.523-1.988-.283-.09.052-.413.259-.392.526.026.333.531.902 1.869 1.417a.88.88 0 01-.316 1.703zM16.899 115.294a.88.88 0 01-.261-1.722c1.091-.34 2.129-1.146 3.086-2.396a.881.881 0 011.4 1.068c-1.183 1.548-2.516 2.56-3.963 3.009a.862.862 0 01-.262.041z"
      />
      <path
        fill="#418BAB"
        d="M24.416 122.096c-.812 0-1.586-.396-2.138-1.13a.88.88 0 111.406-1.059c.289.382.626.51 1.007.378.373-.128.662-.476.656-.79-.007-.419-.574-.851-1.479-1.128a7.574 7.574 0 00-1.277-.275c-.512-.075-1.042-.153-1.34-.678-.342-.602-.121-1.14.537-2.738.309-.75.729-1.771 1.257-3.175a.881.881 0 111.649.619 104.034 104.034 0 01-1.277 3.227c-.156.378-.307.745-.413 1.024.344.053.816.136 1.384.313 2.424.742 2.71 2.192 2.72 2.779.019 1.085-.741 2.108-1.846 2.488a2.586 2.586 0 01-.846.145zM32.063 130.909c-.744 0-1.515-.241-2.232-.73-.832-.568-1.299-1.271-1.388-2.091-.149-1.377.842-2.627 1.625-3.485a56.6 56.6 0 01-1.793-.469.88.88 0 01.468-1.698c1.375.379 2.103.543 2.498.632.526.117.941.211 1.153.783.188.646-.171 1.028-.716 1.608-.547.582-1.566 1.667-1.482 2.438.011.106.047.429.63.827.341.233 1.525.905 2.464-.152.482-.531.545-1.082.613-1.664.068-.597.146-1.272.74-1.735.483-.375 1.148-.487 2.153-.353a.879.879 0 01.758.988.875.875 0 01-.988.758c-.672-.086-.844-.001-.851.003l-.062.54c-.078.676-.195 1.695-1.052 2.64-.685.767-1.588 1.16-2.538 1.16zm-.917-6.054h.012-.012zM32.27 139.987c-.6 0-1.175-.169-1.628-.5-.512-.376-.779-.92-.714-1.455.064-.531.439-.976 1.03-1.221a.88.88 0 011.151.477.878.878 0 01-.138.902c.232.062.571.068.964-.111.328-.149.56-.379.618-.613.047-.186-.014-.39-.179-.608-.314-.417-.757-.558-1.271-.719-.569-.18-1.277-.403-1.648-1.105-.298-.592-.214-1.048-.093-1.329.332-.766 1.218-1.028 2.245-1.332 2.065-.612 3.664-1.26 3.911-3.516a.88.88 0 111.75.191c-.393 3.601-3.377 4.485-5.162 5.014-.27.08-.599.178-.848.271.124.049.267.094.374.127.631.199 1.497.473 2.146 1.336.49.641.663 1.389.484 2.101-.19.761-.774 1.414-1.599 1.789-.45.202-.93.301-1.393.301zM61.27 112.437a.88.88 0 01-.739-1.359c1.312-2.032 2.506-2.011 3.718-1.804.655.114.984.173 1.545-.396.652-.684.37-1.858.267-2.202-.235-.785-.538-1.037-.804-1.261-1.292-1.081-.639-2.088.791-4.294a.88.88 0 111.478.959c-.643.992-1.03 1.653-1.154 1.97l.017.014c.364.305.974.815 1.362 2.108.462 1.555.21 2.987-.692 3.935-1.218 1.232-2.355 1.035-3.11.904-.767-.136-1.151-.2-1.938 1.021a.876.876 0 01-.741.405zM51.693 122.16c-.446 0-.91-.271-1.587-.803-.22-.173-.486-.383-.819-.628a.878.878 0 01-.187-1.23.878.878 0 011.231-.188c.351.258.632.479.863.66.164.129.343.27.469.358.123-.102.297-.265.467-.424l.333-.312c.462-.424 1.081-.994 1.249-1.234a6.385 6.385 0 00-.097-.249l-.109-.272c-1.048-2.672-.036-4.003.449-4.452.861-.796 2.174-.942 3.342-.376 1.151.559 2.316 1.971 2.133 4.257-.039.486-.477.86-.948.808a.88.88 0 01-.808-.948c.095-1.189-.333-2.136-1.147-2.532-.502-.241-1.056-.208-1.375.087-.456.421-.457 1.362-.002 2.519l.099.249c.584 1.441.08 1.905-1.59 3.442l-.323.301c-.697.648-1.16.967-1.643.967zM65.679 120.165c-.8 0-1.604-.226-2.289-.674a.879.879 0 01-.257-1.218.878.878 0 011.218-.257c.702.456 1.65.513 2.362.146.428-.223.946-.688.983-1.649.032-.852-.24-1.479-.789-1.813-.584-.355-1.445-.353-2.091.01-.372.209-.815.612-.815 1.354a.882.882 0 01-1.762 0c0-1.227.625-2.28 1.716-2.892 1.215-.68 2.735-.671 3.873.024 1.107.678 1.685 1.879 1.628 3.383-.053 1.392-.758 2.539-1.935 3.147a3.987 3.987 0 01-1.842.439zM41.981 130.806c-1.042 0-1.981-.616-2.422-1.625-.497-1.14-.173-2.373.824-3.143 1.065-.841 2.283-.638 3.144-.358.001-.093.003-.191.008-.297.057-1.426.827-2.624 2.059-3.205 1.15-.544 2.457-.431 3.41.291.656.497 1.692 1.718 1.258 4.303-.081.479-.541.813-1.014.723a.88.88 0 01-.723-1.015c.208-1.237 0-2.162-.585-2.605-.429-.327-1.04-.364-1.594-.104-.3.143-1.006.591-1.051 1.684-.017.439.005.751.019.965.025.367.056.825-.357 1.155-.185.146-.503.291-.976.152a5.636 5.636 0 01-.464-.171c-.772-.31-1.51-.553-2.05-.128-.506.391-.372.863-.292 1.048.134.309.459.641.96.555a.873.873 0 011.013.725.882.882 0 01-.724 1.015 3.038 3.038 0 01-.443.035z"
      />
      <path
        fill="#418BAB"
        d="M45.32 136.786c-.896 0-1.979-.26-3.243-1.008a49.33 49.33 0 01-1.45-.898 11.334 11.334 0 00-.663-.407c-.075.046-.177.116-.272.18-.361.246-.906.615-1.813 1.075a.901.901 0 01-1.081-.14c-.338-.35-.348-.89.002-1.229l.037-.036a.86.86 0 01.216-.152c.824-.416 1.302-.74 1.651-.977 1.189-.809 1.607-.607 2.873.201.343.219.792.506 1.4.866 1.604.952 3.014 1.011 3.971.171.831-.733 1.077-1.944.786-2.617-.18-.434-.521-.636-.77-.579-.262.06-.411.487-.381 1.09.024.486-.35.9-.835.925a.87.87 0 01-.925-.835c-.092-1.823.844-2.693 1.752-2.898 1.119-.247 2.287.425 2.781 1.608.629 1.452.097 3.447-1.244 4.628a4.204 4.204 0 01-2.792 1.032zM21.609 129.438a.88.88 0 01-.828-1.182c.599-1.647 1.587-2.422 2.235-2.888a5.992 5.992 0 00-.225-.153c-2.09-1.38-3.759-1.138-5.521-.881-.651.096-1.324.193-1.992.193a.881.881 0 010-1.763c.54 0 1.122-.085 1.737-.174 1.825-.267 4.099-.597 6.748 1.154.688.455 1.306.922 1.319 1.632.012.67-.49 1.029-.933 1.346-.534.383-1.266.905-1.712 2.134a.879.879 0 01-.828.582zM17.672 120.084c-.252 0-.542-.093-.895-.313-.193-.12-.455-.283-.893-.47a.88.88 0 01-.643-.848c0-.611.66-1.057 1.264-.798l.001-.003a7.23 7.23 0 011.059.535c.045-.047.095-.102.154-.16.145-.149.321-.332.542-.552a.88.88 0 111.242 1.251c-.211.21-.381.384-.52.527-.442.458-.804.831-1.311.831zM24.487 137.106c-.826 0-1.651-.171-2.366-.525-1.046-.518-2.754-1.874-2.453-5.143a.887.887 0 01.959-.797.882.882 0 01.796.959c-.155 1.67.357 2.846 1.479 3.402 1.343.663 3.13.298 3.957-.462.562-.517.464-.992.342-1.303-.273-.759-1.086-.905-2.123-1.021-.362-.04-.674-.075-.942-.17a.879.879 0 01-.587-.83c0-.374.307-1.846 1.243-3.024a.881.881 0 011.379 1.096c-.31.391-.52.835-.655 1.205 1.056.127 2.729.435 3.334 2.123.455 1.151.167 2.335-.798 3.222-.9.827-2.236 1.267-3.565 1.268z"
      />
      <path
        fill="#418BAB"
        d="M14.292 134.138c-.021 0-.043-.004-.064 0-.118 0-.25-.005-.361-.023a.882.882 0 01.273-1.741c1.702.017 2.319-1.579 3.042-4.025l.19-.637a.881.881 0 011.684.517l-.185.619c-.66 2.234-1.563 5.29-4.579 5.29zM30.954 97.555a4.937 4.937 0 01-1.58-.27 3.94 3.94 0 01-1.574-.94.881.881 0 011.246-1.246c.222.222.52.395.885.514.895.303 1.707.222 2.353-.229.674-.473 1.124-1.329 1.144-2.184a.882.882 0 011.762.041c-.033 1.417-.759 2.791-1.895 3.586a4.038 4.038 0 01-2.341.728zM21.256 107.814c-1.219 0-2.237-.653-2.798-1.289a.887.887 0 01.661-1.47c.295 0 .555.143.716.363.335.346.891.656 1.51.632.495-.026.932-.301 1.296-.817.507-.701.314-1.567-.064-2.911-.162-.577-.33-1.174-.398-1.777-.1-.919.081-1.751.519-2.409.431-.686 1.173-1.188 2.025-1.362.028-.006.057-.01.085-.014.827-.133 1.66.063 2.281.552.629.497 1.003 1.262 1.052 2.157a.882.882 0 01-.832.928c-.467.017-.901-.345-.928-.831-.022-.394-.15-.686-.383-.87-.238-.186-.573-.255-.928-.192a1.348 1.348 0 01-.036.006c-.231.055-.615.2-.857.585-.223.334-.301.75-.247 1.256.053.458.194.963.344 1.496.392 1.396.836 2.979-.199 4.412-.858 1.212-1.908 1.514-2.636 1.553l-.183.002z"
      />
      <path
        fill="#418BAB"
        d="M27.313 110.348c-.714 0-1.433-.291-1.916-.825-.408-.454-1.214-1.732.132-3.813.587-.908 1.249-1.403 1.777-1.702-.286-.22-.643-.488-1.023-.774a.88.88 0 111.057-1.408c1.923 1.441 2.323 1.742 2.244 2.468-.068.621-.601.863-.955 1.023-.447.203-1.06.481-1.621 1.35-.475.734-.588 1.361-.303 1.677.211.235.641.316.918.177.22-.111.288-.38.201-.798a.88.88 0 111.723-.362c.257 1.221-.163 2.241-1.125 2.73a2.45 2.45 0 01-1.109.257zm.616-5.813h.011-.011zM73.972 89.953a.88.88 0 01-.865-1.059c.279-1.35.773-2.85 2.324-3.745a5.56 5.56 0 00.484-.312.887.887 0 011.408.71c0 .331-.181.62-.449.771a8.934 8.934 0 01-.554.354c-.781.451-1.197 1.173-1.487 2.578a.882.882 0 01-.861.703zM55.719 132.504c-.691 0-1.439-.173-2.17-.524-1.613-.774-2.487-2.279-1.991-3.427.325-.748 1.262-1.323 2.913-.683a.882.882 0 01-.635 1.643c-.303-.117-.504-.15-.623-.155.085.237.382.689 1.099 1.034 1.015.485 1.921.417 2.292.096.313-.269.241-.774.126-1.151-.25-.814-.698-1.789-1.13-2.733-.718-1.563-1.158-2.56-1.133-3.295.057-1.481 1.682-2.915 3.41-3.014.735-.029 3.149.122 3.735 3.968a.881.881 0 01-.738 1.004.892.892 0 01-1.004-.737c-.146-.957-.569-2.531-1.894-2.476-.922.053-1.73.847-1.749 1.316-.01.354.582 1.646.973 2.499.458.996.93 2.024 1.214 2.952.375 1.225.134 2.319-.661 3.003-.527.451-1.243.68-2.034.68zM19.766 141.184a.882.882 0 01-.808-.529c-.57-1.311-.838-2.442-1.035-3.27a22.5 22.5 0 00-.15-.607c-1.004.455-1.954.632-2.603.483a.873.873 0 01-.647-1.047.89.89 0 011.05-.67c.114.031.773.006 1.797-.532.531-.271.941-.19 1.194-.074.661.303.833 1.031 1.073 2.04.181.763.429 1.808.936 2.975a.879.879 0 01-.807 1.231zM24.234 141.517a.881.881 0 01-.851-1.107c.333-1.254 1.54-2.393 3.92-1.828a.879.879 0 01.655 1.059.878.878 0 01-1.059.655c-.716-.169-1.608-.208-1.814.566a.88.88 0 01-.851.655zM60.988 135.366a.88.88 0 01-.846-1.127c.252-.869.276-2.708-.07-3.867-.22-.758-.366-1.423.049-1.937.412-.508 1.03-.462 1.623-.422.423.031.953.068 1.645 0 .933-.093 1.496-.543 1.628-1.298.147-.844-.322-2.038-1.48-2.591a.88.88 0 11.757-1.59c1.733.826 2.767 2.711 2.458 4.482-.27 1.549-1.461 2.577-3.189 2.749a10.27 10.27 0 01-1.828.013c.008.029.017.062.028.095.413 1.385.446 3.567.07 4.856a.879.879 0 01-.845.637zM44.911 140.805c-1.044 0-2.089-.287-2.924-1.042a.882.882 0 011.182-1.308c.963.87 2.584.637 3.678.174.551-.232 1.046-.43 1.492-.607 2.57-1.025 2.9-1.155 2.958-3.237a.882.882 0 01.881-.855h.025c.487.014.87.42.856.906-.093 3.237-1.421 3.768-4.069 4.823-.435.173-.919.366-1.457.593-.775.327-1.697.553-2.622.553zM37.706 141.317a.88.88 0 01-.607-1.52c.501-.476.877-1.05 1.241-1.604.269-.409.521-.794.821-1.147a.885.885 0 011.243-.1.88.88 0 01.1 1.242c-.229.27-.453.61-.69.972-.399.608-.851 1.299-1.5 1.916a.888.888 0 01-.608.241zM82.012 140.326a6.204 6.204 0 01-1.852-.282c-1.863-.588-2.899-2.011-2.774-3.807.117-1.674 1.272-3.163 2.63-3.391.626-.103 2.181-.071 3.258 2.462a.88.88 0 11-1.622.688c-.405-.957-.896-1.496-1.345-1.413-.496.084-1.1.86-1.163 1.775-.047.678.182 1.574 1.543 2.004 2.541.788 5.04-.967 6.688-2.131.46-.323.822-.579 1.142-.749.349-.188.638-.323.873-.429-.097-.164-.21-.362-.336-.597l-.088-.162c-.591-1.091-1.819-3.36-1.269-5.041a.881.881 0 111.674.549c-.315.96.782 2.987 1.143 3.652l.092.17c.165.309.306.543.414.724.271.453.504.844.345 1.343-.16.493-.574.673-1.014.863-.237.104-.567.247-1.005.481-.224.12-.563.358-.955.637-1.476 1.042-3.761 2.654-6.379 2.654zM57.412 140.857c-.224 0-.448-.026-.668-.082-1.403-.348-2.308-1.396-2.424-2.807-.143-1.771.961-3.577 2.628-4.294a.881.881 0 11.696 1.62c-1.073.46-1.638 1.647-1.567 2.531.054.656.421 1.073 1.092 1.24.457.112.84-.13.983-.239.226-.174.315-.354.334-.43-.019.015-.216-.076-.646-.086a.883.883 0 01-.862-.9.883.883 0 01.881-.862h.02c1.425.032 1.997.637 2.226 1.139.294.645.144 1.421-.401 2.078a3 3 0 01-2.292 1.092zM64.982 141.011a.88.88 0 01-.871-.756c-.105-.734-.676-1.259-1.608-1.476a.881.881 0 11.402-1.716c1.64.383 2.742 1.481 2.951 2.941a.88.88 0 01-.874 1.007zM71.949 103.555c-.142 0-.258-.012-.339-.026-1.438-.233-2.705-1.822-2.711-3.401-.002-.58.214-2.511 3.1-3.003.375-.064.841-.097 1.345-.129 1.614-.104 2.969-.257 3.203-1.085.07-.234.006-.463-.091-.548-.101-.087-.344-.061-.633.072a.885.885 0 01-1.167-.439.883.883 0 01.439-1.166c.957-.431 1.876-.358 2.521.208.631.552.881 1.503.622 2.365-.587 2.081-3.111 2.244-4.782 2.351-.434.028-.836.052-1.159.107-.748.128-1.639.45-1.636 1.26.003.757.697 1.582 1.231 1.669.349.057.596-.404.732-.805a.88.88 0 111.668.564c-.588 1.739-1.71 2.006-2.343 2.006zM77.075 108.836a.878.878 0 01-.543-.188c-.833-.652-1.642-1.474-2.071-1.916-.158.032-.314.067-.469.101-1.363.297-2.911.633-4.379-.545a.881.881 0 011.102-1.375c.777.623 1.57.489 2.902.198.322-.07.652-.142.99-.199a.893.893 0 01.621.126c.112.071.18.141.431.398.41.423 1.176 1.21 1.961 1.826a.88.88 0 01-.545 1.574zM81.672 118.821a.88.88 0 01-.774-.457c-1.53-2.797-2.514-2.578-4.308-2.18-.689.152-1.531.311-2.339.318-2.719-.026-4.751-2.165-4.944-4.145-.214-2.165 1.261-3.362 2.722-3.557 1.604-.213 3.502.67 3.85 2.729a.88.88 0 01-.722 1.015c-.495.098-.935-.242-1.015-.722-.186-1.094-1.225-1.361-1.881-1.275-.405.054-1.331.321-1.201 1.637.117 1.196 1.463 2.538 3.208 2.556.715.015 1.313-.139 1.939-.276 1.908-.426 4.069-.904 6.237 3.053a.883.883 0 01-.772 1.304z"
      />
      <path
        fill="#418BAB"
        d="M83.236 132.5a.88.88 0 01-.776-.462c-.534-.991-1.711-1.815-3.073-2.769-1.258-.88-2.684-1.878-4.001-3.27-2.106-2.229-2.143-3.92-1.802-4.947.387-1.168 1.446-2.01 2.833-2.252 1.494-.263 2.954.247 3.805 1.327a.882.882 0 01-1.385 1.091c-.44-.563-1.269-.83-2.115-.682-.569.1-1.253.434-1.466 1.071-.267.806.234 1.936 1.411 3.181 1.194 1.262 2.543 2.204 3.731 3.037 1.545 1.082 2.881 2.018 3.613 3.374a.883.883 0 01-.775 1.301zM68.02 123.151a.882.882 0 010-1.762c1.326 0 1.691-.41 2.352-1.154l.2-.223a.88.88 0 011.306 1.181l-.188.211c-.763.86-1.553 1.747-3.67 1.747zM65.692 136.345a.877.877 0 01-.695-.338c-.882-1.127-1.189-2.111-.937-3.01.406-1.453 2.059-2.076 3.807-2.736 1.434-.54 3.061-1.154 3.383-2.128.195-.59-.044-1.416-.71-2.456a.878.878 0 01.266-1.216.876.876 0 011.217.266c.981 1.53 1.276 2.826.9 3.96-.588 1.771-2.631 2.543-4.434 3.223-1.203.455-2.566.969-2.732 1.562-.086.309.137.823.628 1.45a.883.883 0 01-.151 1.237.883.883 0 01-.542.186zM70.903 140.982a3.19 3.19 0 01-.435-.03c-1.147-.164-2.113-.96-2.521-2.077-.46-1.264-.132-2.648.9-3.8 1.293-1.438 2.604-1.559 3.748-1.422.058-.239.139-.547.268-.94.545-1.609 2.173-3.6 4.091-3.013a.881.881 0 11-.519 1.684c-.624-.205-1.558.87-1.899 1.887a9.7 9.7 0 00-.283 1.043c-.22.976-.644 1.271-1.618 1.125-1.011-.156-1.684-.067-2.476.813-.592.661-.79 1.378-.557 2.02.185.506.612.864 1.114.936.649.097 1.315-.293 1.896-1.084a.877.877 0 011.23-.191.878.878 0 01.191 1.23c-.858 1.174-1.978 1.819-3.13 1.819zM82.326 96.129a.882.882 0 01-.278-1.718c.071-.022.128-.048.171-.07a1.874 1.874 0 00-.345-.256c-.358-.22-.668-.367-.948-.502-.796-.382-1.549-.743-2.205-1.981-.997-1.879-1.173-3.489-.499-4.534.366-.568 1.161-1.228 2.806-1.118.082.005.151.008.209.009a12.44 12.44 0 00-.186-.985.88.88 0 01.673-1.048.885.885 0 011.049.672c.233 1.065.436 1.987-.106 2.617-.493.573-1.313.519-1.75.493-.364-.02-1.002-.013-1.214.315-.242.375-.157 1.371.574 2.753.386.727.729.892 1.413 1.22.326.157.688.332 1.097.582 1.21.724 1.313 1.549 1.267 1.977-.076.691-.604 1.249-1.449 1.53a.939.939 0 01-.279.044zM82.049 106.547c-.825 0-1.649-.192-2.292-.591-1.225-.759-1.666-2.095-1.207-3.663.616-2.103 1.686-2.86 2.468-3.412l.145-.103c-.095-.031-.189-.06-.271-.085-.389-.122-.792-.248-1.153-.423a.881.881 0 11.77-1.585c.241.117.581.223.908.325.864.269 1.68.523 1.891 1.3.081.304.084.77-.373 1.271-.289.307-.599.525-.898.738-.695.49-1.352.954-1.794 2.468-.31 1.059.105 1.461.444 1.671.9.558 2.442.368 3.028-.172.185-.17.256-.337.077-.687-.034-.066-.073-.126-.109-.182-.16-.253-.459-.723-.243-1.297.236-.625.926-.937 2.036-1.26.514-.154 1.665-.393 2.674-.281a.882.882 0 01-.198 1.751c-.666-.075-1.564.096-1.974.219a9.696 9.696 0 00-.639.208l.021.038c.516 1.007.349 2.049-.45 2.785-.687.636-1.776.967-2.861.967zm-.305-7.537h.013-.013zM71.48 96.422c-.505 0-.962-.226-1.258-.637-.489-.681-.417-1.683.18-2.552.446-.649 1.199-.963 1.926-1.267 1.315-.548 1.761-.826 1.602-1.802a.882.882 0 011.74-.282c.396 2.437-1.519 3.234-2.662 3.711-.47.194-1.001.416-1.152.638a1.11 1.11 0 00-.181.396.878.878 0 01.902.637.873.873 0 01-.596 1.087 1.865 1.865 0 01-.501.071z"
      />
      <path
        fill="#418BAB"
        d="M80.071 125.343a.869.869 0 01-.528-.178l-.786-.595a.88.88 0 111.064-1.404l.781.593a.878.878 0 01.173 1.232.871.871 0 01-.704.352zM44.625 98.297c-1.526 0-2.678-.692-3.322-1.479-.774-.944-.942-2.144-.438-3.129.419-.815 1.667-2.137 5.162-1.971.324-1.052.35-2.397.07-3.866a.878.878 0 01.7-1.03c.476-.104.938.222 1.03.7.284 1.491.443 3.656-.419 5.505a.882.882 0 01-.267.332c-.34.255-.705.189-1 .136-2.282-.146-3.412.418-3.708.998-.182.356-.096.809.231 1.208.473.573 1.543 1.103 3.023.678a.882.882 0 11.482 1.695 5.684 5.684 0 01-1.544.223zm1.984-5.642h.011-.011zM54.069 90.753a.902.902 0 01-.286-.047c-1.969-.675-3.573-2.066-4.4-3.818a4.382 4.382 0 01-.329-1.03.881.881 0 01.71-1.024.892.892 0 011.024.71c.036.201.099.397.193.601.611 1.297 1.874 2.381 3.373 2.895a.88.88 0 01-.285 1.713zM60.705 92.672c-.479 0-.958-.095-1.42-.286-1.071-.446-1.862-1.344-2.062-2.341a.88.88 0 011.727-.347c.084.418.49.844 1.011 1.061a1.913 1.913 0 001.829-.188c1.034-.684 1.274-2.068.976-3.026-.167-.534-.644-1.422-1.969-1.422l-.102.002c-.961 0-1.938-.469-2.908-1.395a.871.871 0 01-.317-.673c0-.486.388-.882.875-.882h.013a.88.88 0 01.612.248c.636.615 1.23.938 1.721.938.036.003.072-.001.106-.001 1.742 0 3.138 1.012 3.651 2.659.585 1.877-.124 3.989-1.687 5.021a3.713 3.713 0 01-2.056.632z"
      />
      <g>
        <path
          fill="#418BAB"
          d="M102.61 95.793c-.291 0-.536-.066-.72-.143-1.087-.445-1.716-1.896-1.529-3.529a.88.88 0 111.751.201c-.108.951.233 1.611.446 1.699.131.055.556-.129 1.121-.851a.88.88 0 111.387 1.086c-.954 1.221-1.818 1.537-2.456 1.537zM104.934 104.006a.87.87 0 01-.459-.13c-1.886-1.152-2.756-2.847-2.328-4.531.373-1.468 1.682-2.507 3.255-2.587.97-.045 1.771.212 2.359.776 1.045 1.002 1.029 2.612 1.024 3.22l-.001.119a.88.88 0 01-1.728.324 1.72 1.72 0 01-.033-.46c.004-.398.014-1.457-.48-1.931-.229-.219-.571-.316-1.051-.289-.797.04-1.455.547-1.636 1.261-.229.896.348 1.865 1.539 2.595a.884.884 0 01.292 1.212.887.887 0 01-.753.421zM97.51 106.948c-.989 0-1.923-.483-2.577-1.337-2.051-2.681.667-5.341 2.126-6.771.31-.304.716-.701.893-.931a42.886 42.886 0 01-.509-.574c-.385-.438-.82-.937-1.054-1.493a.88.88 0 01.472-1.152.879.879 0 011.153.472c.122.292.457.674.754 1.012.497.567.968 1.104.992 1.753.001.735-.583 1.307-1.468 2.173-1.676 1.641-2.979 3.106-1.959 4.439.324.426.758.679 1.218.646.576-.019 1.173-.45 1.682-1.215a.882.882 0 111.467.978c-.833 1.25-1.931 1.96-3.09 1.998l-.1.002zM91.636 101.092a.88.88 0 01-.549-1.569c1.206-.964 1.633-2.129 1.521-2.859-.02-.126-.087-.428-.296-.509-.208-.079-.669.01-1.304.524-.224.18-.46.406-.712.645-1 .946-2.237 2.128-3.824 1.989-1.012-.087-1.769-.736-1.976-1.694-.235-1.083.292-2.263 1.252-2.803a.884.884 0 011.2.335.882.882 0 01-.335 1.2c-.325.183-.458.606-.396.895.031.146.103.286.405.313.804.046 1.715-.81 2.461-1.514.289-.274.563-.532.818-.737 1.434-1.161 2.521-.997 3.043-.795.753.29 1.264.977 1.403 1.885.184 1.195-.288 3.006-2.162 4.503a.882.882 0 01-.549.191zM84.999 92.631c-.052 0-.104-.002-.156-.008-.346-.032-1.197-.241-1.654-1.471a.881.881 0 111.653-.613c.102.275.199.338.199.339-.012-.019.132-.116.228-.352.069-.171.192-.632-.181-1.201-.516-.786-.617-1.523-.685-2.011a6.158 6.158 0 00-.033-.226c-.719-.313-1.293-.73-1.708-1.238a.88.88 0 111.362-1.115c.257.313.669.59 1.193.799.762.308.864 1.05.932 1.539.057.409.114.831.413 1.287.8 1.223.603 2.457.151 3.205-.402.667-1.049 1.066-1.714 1.066zm-.438-5.462h.012-.012zM116.381 115.939a.883.883 0 01-.729-.383c-.388-.566-.467-1.194-.223-1.766.507-1.186 2.48-2.065 5.865-2.618.816-.167 1.446-.395 1.922-.685a.882.882 0 11.917 1.505c-.649.395-1.466.696-2.43.897-.013.002-.113.02-.126.021-3.154.516-4.401 1.268-4.524 1.563.005.004.018.036.053.086a.88.88 0 01-.725 1.38zM121.243 109.996a.88.88 0 01-.824-1.193c.114-.458.328-1.312 1.127-2.033a2.77 2.77 0 01.536-.381.884.884 0 011.194.357c.23.428.07.962-.357 1.193a1 1 0 00-.192.137c-.401.365-.507.788-.576 1.068a2.1 2.1 0 01-.101.324.88.88 0 01-.807.528zM121.688 121.167c-2.339 0-3.12-1.41-3.317-1.89-.498-1.213-.096-2.651.955-3.42.476-.349 2.223-1.322 4.724.773a.88.88 0 11-1.131 1.35c-1.025-.857-1.977-1.124-2.553-.703-.393.288-.553.871-.364 1.329.267.649 1.183.921 2.436.737a.875.875 0 011.001.74.879.879 0 01-.739 1.001 6.492 6.492 0 01-1.012.083zM105.079 115.517c-.342 0-.646-.032-.903-.076-1.993-.336-3.673-1.75-4.279-3.604-.508-1.55-.146-3.111.992-4.281 1.656-1.716 3.987-1.546 5.449-.664 1.183.71 1.72 1.99 1.367 3.26-.31 1.121-1.208 1.875-2.233 1.875-.665 0-1.255-.267-1.662-.749a2.048 2.048 0 01-.467-1.644.888.888 0 011.018-.719.881.881 0 01.719 1.018.304.304 0 00.077.209c.07.082.173.122.315.122.214 0 .444-.25.536-.582.066-.241.145-.847-.577-1.28-.887-.533-2.289-.642-3.276.381-.914.939-.758 1.974-.583 2.508.399 1.22 1.563 2.189 2.897 2.415 1.682.29 3.409-.613 4.862-2.525a.88.88 0 111.402 1.066c-2.046 2.689-4.189 3.27-5.654 3.27zM114.022 122.096c-.813 0-1.587-.396-2.139-1.13a.88.88 0 111.406-1.059c.288.382.627.51 1.008.378.373-.128.662-.476.656-.79-.007-.419-.574-.851-1.479-1.128a.883.883 0 01-.584-1.101.878.878 0 011.101-.584c2.429.744 2.715 2.194 2.725 2.781.019 1.085-.741 2.108-1.846 2.488a2.598 2.598 0 01-.848.145zM121.669 130.909c-.744 0-1.516-.241-2.231-.73-.832-.568-1.299-1.271-1.389-2.091-.148-1.377.843-2.627 1.625-3.485a55.892 55.892 0 01-1.793-.469.88.88 0 11.468-1.698c1.374.379 2.103.543 2.497.632.525.117.941.211 1.153.783.188.646-.171 1.028-.716 1.608-.547.582-1.566 1.667-1.482 2.438.012.106.047.429.63.827.339.231 1.517.907 2.466-.153.48-.53.544-1.08.61-1.663.068-.597.146-1.272.741-1.735.481-.375 1.146-.487 2.153-.353a.88.88 0 01.758.988.873.873 0 01-.987.758c-.674-.086-.845-.001-.852.003-.006.04-.039.329-.063.541-.078.675-.195 1.694-1.052 2.639-.683.767-1.587 1.16-2.536 1.16zm-.916-6.054h.012-.012zM121.878 139.987c-.605 0-1.184-.171-1.638-.506-.509-.375-.774-.918-.709-1.45.038-.312.224-.885 1.035-1.22a.881.881 0 011.012 1.379c.231.058.568.064.959-.109.332-.15.564-.38.623-.614.046-.186-.016-.389-.183-.604-.316-.42-.758-.561-1.27-.724-.568-.182-1.273-.406-1.645-1.107-.3-.591-.218-1.05-.096-1.332.33-.768 1.22-1.029 2.248-1.333 1.514-.446 3.229-.952 3.767-2.766a.886.886 0 01.853-.661c.486 0 .881.389.881.875a.96.96 0 01-.035.257c-.801 2.756-3.308 3.495-4.966 3.984-.271.081-.604.179-.854.271.126.05.273.098.382.132.629.2 1.49.475 2.137 1.335.492.635.669 1.384.491 2.099-.19.766-.777 1.419-1.608 1.794a3.4 3.4 0 01-1.384.3zm-.706-1.512zM84.257 114.325c-1.246 0-1.96-.529-2.309-.905-.632-.683-.828-1.662-.524-2.62.453-1.432 1.875-2.528 3.804-2.937.698-.148 1.479-.209 2.306-.274 1.407-.111 3.005-.236 3.774-.845.301-.236.467-.61.446-1a1.165 1.165 0 00-.575-.939.691.691 0 00-.769.021c-.121.085-.187.192-.177.242a.879.879 0 01-.685 1.04.869.869 0 01-1.04-.685c-.159-.768.186-1.551.897-2.044a2.462 2.462 0 012.71-.067c.838.528 1.346 1.379 1.397 2.34a2.953 2.953 0 01-1.114 2.477c-1.19.938-2.989 1.081-4.729 1.218-.768.061-1.494.118-2.08.24-1.528.325-2.288 1.114-2.487 1.746-.065.207-.136.597.137.89.32.345 1.014.432 1.859.232a.88.88 0 11.407 1.714 5.48 5.48 0 01-1.248.156z"
        />
        <path
          fill="#418BAB"
          d="M87.134 118.626a.882.882 0 01-.736-1.364c.185-.282.392-.529.606-.782.607-.714 1.181-1.388 1.423-3.589.064-.582.125-1.13.465-1.572a.884.884 0 01.409-.294c.731-.255 1.774-.018 3.405.403.868.223 1.938.492 2.408.455.518-.051 1.151-.226 1.231-.771.069-.478-.262-1.048-.582-1.18-.061-.025-.217-.093-.5.293a.882.882 0 01-1.42-1.044c.688-.934 1.653-1.266 2.591-.878 1.095.45 1.838 1.825 1.655 3.065-.186 1.265-1.233 2.112-2.803 2.268-.784.079-1.865-.206-3.02-.503-.597-.153-1.505-.389-2.041-.445-.019.133-.035.283-.048.396-.3 2.737-1.148 3.736-1.831 4.537-.168.197-.33.385-.474.604a.879.879 0 01-.738.401z"
        />
        <path
          fill="#418BAB"
          d="M98.342 119.526a3.2 3.2 0 01-1.848-.614 7.906 7.906 0 01-1-.895c-.477-.48-.819-.827-1.437-.937-.413-.071-.544-.004-.546-.004-.031.068-.004.383.054.536a.864.864 0 01-.405 1.164c-.434.214-.971.021-1.189-.416-.136-.273-.511-1.478.149-2.357.318-.426.968-.881 2.245-.657 1.168.205 1.812.857 2.381 1.431.253.257.493.499.778.705.519.371 1.053.332 1.224.159.158-.16.146-.735-.533-1.669a.88.88 0 011.422-1.037c1.681 2.306.701 3.604.36 3.947-.425.43-1.021.644-1.655.644zM111.212 129.437a.88.88 0 01-.828-1.184c.602-1.648 1.592-2.423 2.24-2.889a7.298 7.298 0 00-.222-.151c-2.089-1.375-3.758-1.136-5.524-.88-1.248.183-2.536.368-3.846-.123-1.87-.699-2.33-1.978-2.438-2.678-.189-1.223.364-2.51 1.444-3.358 1.154-.906 2.681-1.101 4.079-.519.49.201.829.394 1.059.532l.146-.151c.146-.15.324-.334.547-.556a.88.88 0 111.241 1.251c-.213.212-.384.388-.522.531-.661.679-1.14 1.17-2.198.51a5.801 5.801 0 00-.945-.489c-.817-.339-1.66-.238-2.316.276-.571.448-.883 1.117-.792 1.703.109.706.775 1.096 1.314 1.298.888.33 1.854.191 2.977.028 1.825-.263 4.096-.593 6.747 1.154.688.454 1.305.922 1.316 1.631.012.67-.49 1.028-.934 1.346-.534.383-1.268.907-1.717 2.137a.883.883 0 01-.828.581zM114.094 137.106c-.826 0-1.651-.171-2.366-.525-1.046-.518-2.755-1.874-2.453-5.143a.887.887 0 01.96-.797.882.882 0 01.796.959c-.155 1.67.356 2.846 1.479 3.402 1.343.663 3.13.298 3.957-.462.563-.517.465-.992.342-1.303-.272-.759-1.086-.905-2.123-1.021-.363-.04-.675-.075-.942-.17a.878.878 0 01-.587-.83c0-.374.306-1.845 1.243-3.024a.881.881 0 011.379 1.096 4.338 4.338 0 00-.655 1.205c1.056.127 2.729.435 3.334 2.123.455 1.151.167 2.335-.798 3.222-.901.827-2.237 1.267-3.566 1.268z"
        />
        <path
          fill="#418BAB"
          d="M103.9 134.134h-.062c-1.795-.024-3.191-.905-3.83-2.415-.581-1.368-.378-2.971.494-3.896.693-.735 1.692-.944 2.746-.571 1.578.612 1.685 1.766 1.742 2.385l.022.208a.883.883 0 01-.751.994.883.883 0 01-.995-.751c-.013-.092-.021-.188-.03-.288-.048-.5-.064-.688-.601-.896-.49-.174-.721-.01-.852.128-.339.361-.49 1.209-.154 2.002.207.492.775 1.319 2.232 1.34 1.566-.012 2.201-1.582 2.923-4.03l.188-.628a.88.88 0 111.685.515l-.182.611c-.658 2.235-1.56 5.292-4.575 5.292zM95.169 133.579c-.746 0-1.485-.289-2.111-.869-1.534-1.42-1.995-4.282-.111-6.616 1.479-1.834 3.422-1.723 4.565-1.608-.233-.651-.525-1.537-.407-2.93a.892.892 0 01.952-.803.882.882 0 01.804.952c-.091 1.072.129 1.683.342 2.272.146.409.299.833.322 1.34a.88.88 0 01-.47.818c-.448.237-.966.184-1.563.119-1.042-.108-2.221-.234-3.174.945-1.362 1.688-.857 3.481-.063 4.216.356.332 1.092.762 2.004-.1.165-.158.252-.416.195-.596-.073-.231-.433-.319-.641-.352a.88.88 0 11.269-1.742c1.041.16 1.789.73 2.052 1.563.262.824.002 1.768-.66 2.404-.697.658-1.506.987-2.305.987zM85.772 128.003c-.947 0-1.946-.419-2.546-1.361-.843-1.32-.782-3.014.15-4.313.984-1.37 2.68-1.954 4.444-1.515.34.084.78.251 1.29.446 1.199.454 3.428 1.305 4.211.763.231-.159.35-.522.35-1.078a.882.882 0 011.763 0c0 1.169-.374 2.021-1.112 2.529-1.543 1.065-4.023.122-5.836-.567-.447-.17-.827-.318-1.09-.384-1.057-.26-2.024.051-2.589.833-.51.711-.548 1.628-.095 2.339.39.612 1.197.639 1.602.428.138-.071.458-.239.183-.898a.88.88 0 111.627-.676c.545 1.307.153 2.539-.995 3.138a2.965 2.965 0 01-1.357.316zM110.865 107.81c-.51 0-1.001-.114-1.429-.299-1.147-.492-2.241-1.649-2.01-2.824.081-.411.458-1.37 2.195-1.398h.015a.881.881 0 01.014 1.762c-.228.004-.371.03-.456.056.125.254.574.709 1.208.882.726.199 1.346-.055 1.839-.754.514-.702.319-1.565-.06-2.907-.164-.578-.332-1.177-.401-1.782-.237-2.085 1.008-3.367 2.347-3.713a.878.878 0 011.072.632.879.879 0 01-.632 1.073c-.583.151-1.162.705-1.036 1.809.053.464.195.969.347 1.503.375 1.326.842 2.979-.204 4.414-.805 1.132-1.841 1.546-2.809 1.546zM116.919 110.348c-.715 0-1.434-.291-1.916-.825-.408-.454-1.214-1.732.132-3.813.588-.908 1.248-1.403 1.777-1.702-.285-.22-.643-.488-1.023-.774a.88.88 0 111.057-1.408c1.923 1.441 2.323 1.742 2.244 2.468-.067.621-.601.863-.954 1.023-.447.203-1.061.481-1.621 1.35-.476.734-.589 1.361-.305 1.677.213.235.64.316.919.177.221-.111.288-.38.2-.798a.882.882 0 01.682-1.044.89.89 0 011.044.682c.256 1.221-.165 2.241-1.127 2.73a2.45 2.45 0 01-1.109.257zm.616-5.813h.012-.012zM97.128 140.982c-.324 0-.673-.038-1.062-.116-.606-.133-1.2-.344-1.774-.549-1.861-.664-2.959-.98-3.865.218a.88.88 0 11-1.404-1.065c1.729-2.283 4.117-1.434 5.861-.812.546.193 1.063.378 1.544.483.446.089.795.103 1.081.04a2.04 2.04 0 001.348-1.368c.106-.379.13-.946-.369-1.501-.382-.421-.82-.602-1.227-.503-.407.096-.736.466-.881.988a.874.874 0 01-1.084.614.88.88 0 01-.614-1.084c.319-1.151 1.13-1.985 2.171-2.233 1.046-.249 2.117.129 2.941 1.036.8.887 1.075 2.039.76 3.16-.341 1.209-1.309 2.212-2.465 2.556-.023.015-.11.037-.217.059-.235.052-.48.077-.744.077zM108.278 140.386a.881.881 0 01-.808-.528 13.872 13.872 0 01-.942-3.088c-.355.218-.675.445-.985.666-.458.324-.891.63-1.333.854a.88.88 0 11-.792-1.574c.323-.163.703-.433 1.104-.718.485-.344 1.035-.733 1.662-1.066.174-.092.7-.374 1.247-.111.568.272.68.853.809 1.522.12.624.303 1.568.846 2.809a.884.884 0 01-.808 1.234zM114.043 141.311a.88.88 0 01-.852-1.107c.333-1.254 1.539-2.397 3.92-1.83a.879.879 0 01.655 1.06.883.883 0 01-1.059.654c-.716-.17-1.608-.206-1.813.568a.881.881 0 01-.851.655zM96.021 92.186c-3.641 0-5.532-.807-5.625-2.397-.09-1.547 1.905-2.94 3.749-3.154.497-.042.922.292.977.774a.88.88 0 01-.774.977c-1.24.144-2.203 1.006-2.191 1.301.001 0 .444.738 3.863.738h.038a.882.882 0 01.001 1.762l-.038-.001z"
        />
      </g>
      <g>
        <path
          fill="#418BAB"
          d="M89.471 73.552c-.066-1.417-1.563-2.293-2.845-1.688-9.646 4.543-16.408 6.354-30.653-.697-1.335-.661-2.901.338-2.863 1.827.073 2.869-.023 6.989-1.051 10.074-.293.884.007 1.866.797 2.355 12.063 7.451 24.893 7.476 37.958 1.394 1.044-.486 1.509-1.763.932-2.76-1.759-3.038-2.128-7.43-2.275-10.505z"
        />
        <path
          fill="#3D809C"
          d="M56.521 88.336a.881.881 0 01-.879-.964c.275-2.902.865-9.869 1.132-15.457.023-.486.452-.876.922-.838.485.023.86.437.837.923-.268 5.62-.861 12.621-1.137 15.537a.88.88 0 01-.875.799zM61.679 90.396h-.022a.883.883 0 01-.859-.903c.081-3.214.212-7.887.325-11.868l.108-3.832c.014-.486.42-.894.905-.857a.882.882 0 01.857.905l-.108 3.834c-.112 3.979-.246 8.65-.325 11.862a.881.881 0 01-.881.859zM66.891 91.654a.88.88 0 01-.878-.82c-.319-4.568-.377-10.714-.15-15.655.021-.486.458-.888.92-.84a.88.88 0 01.84.92c-.224 4.881-.167 10.946.148 15.454a.88.88 0 01-.88.941zM71.739 92.07a.883.883 0 01-.877-.798c-.506-5.299-.706-11.574-.679-15.443a.88.88 0 01.881-.875h.006a.88.88 0 01.875.887c-.026 3.824.172 10.027.672 15.265a.883.883 0 01-.793.961c-.029.001-.056.003-.085.003zM77.531 91.727a.88.88 0 01-.872-.765c-.64-4.849-.972-10.648-.886-15.516a.883.883 0 01.882-.865h.016a.881.881 0 01.865.897c-.085 4.784.241 10.485.869 15.251a.88.88 0 01-.874.998zM82.488 90.739a.879.879 0 01-.864-.721c-1.017-5.48-1.351-12.845-1.447-15.758a.88.88 0 01.853-.909c.501.002.894.365.91.853.073 2.24.395 9.979 1.417 15.493a.882.882 0 01-.869 1.042zM87.553 89.079a.882.882 0 01-.858-.684c-1.623-7.09-1.918-10.9-2.182-15.906a.882.882 0 01.834-.926c.441-.049.899.347.926.834.259 4.913.547 8.653 2.141 15.604a.884.884 0 01-.861 1.078z"
        />
      </g>
      <g>
        <path
          fill="#4D5F91"
          d="M111.2 141.706h-.006a.881.881 0 01-.875-.887c.011-1.936.011-3.896.011-5.669l.012-3.386c.004-1.281.006-2.326.013-3.013l.005-.926c.008-1.371.017-2.789.079-4.191.154-3.318.549-5.963 1.243-8.327.664-2.277 1.655-4.522 2.615-6.694l.256-.579c.376-.85.86-1.964 1.274-3.068.275-.685.512-1.342.712-1.976.384-1.247.63-2.363.752-3.408.056-.482.509-.813.978-.773a.882.882 0 01.772.978c-.135 1.153-.402 2.373-.82 3.729a29.151 29.151 0 01-.752 2.091 59.534 59.534 0 01-1.305 3.141l-.255.58c-.936 2.118-1.904 4.31-2.536 6.476-.653 2.228-1.027 4.741-1.175 7.913-.06 1.366-.069 2.767-.077 4.122l-.005.924c-.007.691-.009 1.732-.013 3.009l-.011 3.385c0 1.772 0 3.736-.012 5.677a.88.88 0 01-.88.872zM29.093 141.706a.88.88 0 01-.877-.815c-.401-5.359-.676-10.668-.742-12.725-.076-2.335.092-4.718.253-7.022.194-2.76.394-5.613.161-8.309a19.367 19.367 0 00-.562-3.4 17.421 17.421 0 00-.513-1.63c-.204-.553-.448-1.085-.69-1.616l-.206-.445c-.618-1.315-1.257-2.673-1.583-4.167-.222-1.004-.303-2.049-.382-3.06l-.059-.719a.881.881 0 011.756-.151l.06.732c.078.994.151 1.934.346 2.819.285 1.302.854 2.513 1.457 3.796l.213.462c.261.571.522 1.146.74 1.734.205.551.391 1.14.564 1.795.306 1.168.513 2.413.615 3.705.245 2.825.039 5.749-.159 8.577-.159 2.26-.323 4.597-.249 6.841.065 2.042.338 7.317.738 12.651a.881.881 0 01-.881.947z"
        />
      </g>
      <g>
        <path
          fill="#CF8A5F"
          d="M47.534 38.923c.328.785 2.268 4.96 3.088 5.939 1.984 2.367 3.809.855 4.791.252l-1.808-8.413c-3.326-4.479-8.196-2.876-6.071 2.222zM89.304 39.014l-1.297 6.574c3.964 4.997 6.478-4.137 6.897-5.121 3.793-8.921-3.494-8.139-5.6-1.453z"
        />
        <path
          fill="#C77F54"
          d="M54.51 42.315a.881.881 0 01-.847-.639c-.504-1.767-2.481-3.375-4.146-3.375a.882.882 0 010-1.762c2.445 0 5.119 2.13 5.839 4.653a.88.88 0 01-.846 1.123zM88.826 42.317h-.025a.881.881 0 01-.855-.906c.032-1.108.717-2.391 1.831-3.433 1.019-.951 2.136-1.505 3.145-1.437a.88.88 0 01.846.915c-.019.488-.451.903-.915.845-.486-.004-1.225.359-1.872.965-.743.694-1.255 1.576-1.272 2.195a.886.886 0 01-.883.856z"
        />
        <path
          fill="#D99467"
          d="M81.145 2.698c-9.766-4.907-21.92-1.011-26.94 8.17-7.704 14.01-.087 37.581 4.036 45.591 4.793 9.739 16.106 7.159 27.554 4.325 2.618-12.116 15.562-47.881-4.65-58.086z"
        />
        <circle fill="#CF8A5F" cx="67.856" cy="8.622" r=".8" />
        <circle fill="#CF8A5F" cx="63.206" cy="6.3" r=".8" />
        <circle fill="#CF8A5F" cx="65.484" cy="3.041" r=".799" />
        <circle fill="#CF8A5F" cx="67.79" cy="4.972" r=".799" />
        <path fill="#CF8A5F" d="M70.204.667a.78.78 0 00-.048.236.8.8 0 001.6 0 .775.775 0 00-.075-.33c-.495.009-.986.05-1.477.094z" />
        <circle fill="#CF8A5F" cx="70.993" cy="5.771" r=".8" />
        <circle fill="#CF8A5F" cx="73.634" cy="7.595" r=".8" />
        <circle fill="#CF8A5F" cx="74.018" cy="3.245" r=".8" />
        <path
          fill="#CF8A5F"
          d="M76.653 1.363a.8.8 0 00.801.799.789.789 0 00.766-.628 19.942 19.942 0 00-1.516-.42.8.8 0 00-.051.249zM61.597 3.399a.787.787 0 00.762.616.792.792 0 00.588-1.333c-.461.222-.909.463-1.35.717zM59.488 4.792c-.383.292-.751.602-1.113.92.094.335.39.586.757.586a.8.8 0 00.798-.799.79.79 0 00-.442-.707z"
        />
        <circle fill="#CF8A5F" cx="62.697" cy="9.558" r=".8" />
        <circle fill="#CF8A5F" cx="58.956" cy="8.972" r=".8" />
        <circle fill="#CF8A5F" cx="58.956" cy="12.954" r=".8" />
        <circle fill="#CF8A5F" cx="55.925" cy="10.573" r=".8" />
        <path fill="#CF8A5F" d="M53.492 12.292c-.206.447-.398.901-.576 1.364a.8.8 0 001.365-.566.798.798 0 00-.789-.798z" />
        <circle fill="#CF8A5F" cx="65.484" cy="11.286" r=".8" />
        <circle fill="#CF8A5F" cx="71.366" cy="10.573" r=".8" />
        <circle fill="#CF8A5F" cx="76.663" cy="5.763" r=".8" />
        <circle fill="#CF8A5F" cx="77.493" cy="10.347" r=".8" />
        <circle fill="#CF8A5F" cx="80.086" cy="3.216" r=".8" />
        <circle fill="#CF8A5F" cx="80.64" cy="7.1" r=".799" />
        <path
          fill="#CF8A5F"
          d="M82.663 4.035a.8.8 0 00.801.799.791.791 0 00.604-.29 18.387 18.387 0 00-1.283-.908.786.786 0 00-.122.399z"
        />
        <circle fill="#CF8A5F" cx="83.731" cy="7.295" r=".8" />
        <circle fill="#CF8A5F" cx="83.271" cy="11.558" r=".8" />
        <path fill="#CF8A5F" d="M86.586 7.528a.8.8 0 00.799.8.78.78 0 00.321-.07c-.299-.411-.617-.81-.952-1.197a.78.78 0 00-.168.467z" />
        <circle fill="#CF8A5F" cx="86.857" cy="10.347" r=".8" />
        <path fill="#CF8A5F" d="M89.352 13.09a.8.8 0 00.801.8.783.783 0 00.395-.12c-.17-.491-.349-.978-.548-1.45a.791.791 0 00-.648.77z" />
        <circle fill="#CF8A5F" cx="88.184" cy="16.047" r=".8" />
        <circle fill="#CF8A5F" cx="74.818" cy="12.661" r=".8" />
        <circle fill="#CF8A5F" cx="79.841" cy="14.104" r=".8" />
        <circle fill="#CF8A5F" cx="90.151" cy="19.432" r=".8" />
        <circle fill="#CF8A5F" cx="84.689" cy="15.413" r=".8" />
        <circle fill="#CF8A5F" cx="62.15" cy="14.047" r=".8" />
        <circle fill="#CF8A5F" cx="56.579" cy="17.813" r=".8" />
        <circle fill="#CF8A5F" cx="53.482" cy="17.628" r=".8" />
        <circle fill="#CF8A5F" cx="52.211" cy="21.638" r=".8" />
        <circle fill="#CF8A5F" cx="55.925" cy="14.553" r=".799" />
        <g>
          <path
            fill="#66353D"
            d="M89.907 44.628a.951.951 0 00-.909.655c-1.193 3.645-2.897 8.469-6.583 13.065-2.132.042-1.781.445-3.445-5.651a2.336 2.336 0 00-2.169-1.716c-2.18-.079-7.869-.054-10.144.116-3.319.247-1.884 6.678-4.619 6.875-.898.064-.873-.02-.9-.017-3.015-3.327-5.026-8.555-6.497-12.614a1.08 1.08 0 00-1.021-.712c-.712 0-1.233.682-1.054 1.37 6.059 23.299 9.555 23.979 14.729 24.313 19.353 1.176 16.962-2.003 21.468-15.625 1.135-3.466 1.051-4.848 2.071-8.856a.965.965 0 00-.927-1.203z"
          />
          <path
            id="smile"
            fill="#FFF"
            d="M66.815 52.69c-.472-.246-.988.248-.663.632 6.95 8.233 11.561-.063 10.913-.583-.664-.933-3.957 3.232-10.25-.049z"
          />
        </g>
        <g>
          <path
            fill="#C77F54"
            d="M71.21 48.835l-.038-.001c-1.302-.055-2.823-1.124-3.421-1.873-.335-.42-.468-.832-.396-1.223.103-.557.427-.969.912-1.161.354-.139.729-.14 1.078-.07.102-5.265-.259-8.59-.46-10.438a32.24 32.24 0 01-.115-1.174.88.88 0 111.757-.119c.019.274.059.64.109 1.103.221 2.037.633 5.829.437 11.964a.884.884 0 01-.88.852c.312.176.636.315.91.363.607-.242 1.216-.773 1.758-1.246l.336-.291a.88.88 0 111.139 1.342l-.316.275c-.684.597-1.533 1.34-2.549 1.656a.828.828 0 01-.261.041z"
          />
        </g>
        <g>
          <path
            fill="#2E3B59"
            d="M82.252 35.788a1.174 1.174 0 01-1.172-1.136 70.632 70.632 0 01-.037-1.45 1.174 1.174 0 011.16-1.189h.015c.643 0 1.167.516 1.175 1.16.005.35.017.817.034 1.402a1.173 1.173 0 01-1.134 1.213h-.041z"
          />
        </g>
        <g>
          <path
            fill="#2E3B59"
            d="M61.916 35.788a1.174 1.174 0 01-1.172-1.136 70.632 70.632 0 01-.037-1.45 1.174 1.174 0 011.16-1.189h.015c.643 0 1.167.516 1.175 1.16.005.35.017.817.034 1.402a1.173 1.173 0 01-1.134 1.213h-.041z"
          />
        </g>
        <g>
          <path
            id="eyebrow"
            fill="#66353D"
            d="M87.535 28.236a.876.876 0 01-.503-.159c-2.912-2.038-5.727-2.041-9.127-.009a.88.88 0 01-.904-1.512c3.97-2.371 7.581-2.346 11.04.078a.88.88 0 01-.506 1.602zM56.579 28.938a.882.882 0 01-.646-1.48c2.33-2.513 6.901-3.786 11.127-1.37.422.242.569.78.328 1.203a.885.885 0 01-1.203.328c-3.839-2.195-7.46-.583-8.961 1.037a.879.879 0 01-.645.282z"
          />
        </g>
        <g opacity=".4">
          <path
            fill="#ED7278"
            d="M81.137 48.144c1.118 3.223 4.764.364 3.142-1.947-.614-.873-4.135-.92-3.142 1.947zM59.328 48.398c1.111 2.583 3.993.526 3.597-1.187-.582-2.518-4.94-1.931-3.597 1.187z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar13: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#E0AF43"
        d="M80.033 7.795C78.476 5.771 76.991 3.24 74.3 1.491c-.512-.333-1.179.196-.942.76.355.861.597 1.827.597 2.744C69.729 1.696 66.385-.633 60.76.152c-.993.139-2.026.384-2.894.629-.633.177-.719 1.023-.141 1.339 1.115.612 2.179 1.502 2.713 2.072-2.512.537-4.061 1.083-5.994 2.48a.545.545 0 00.312.989c.983.011 2.043.175 2.702.541-10.586 7.559-10.06 17.375-7.732 30.542l40.018 1.203c4.926-12.787 3.528-28.211-9.711-32.152z"
      />
      <path
        fill="#EDBE5F"
        d="M70.993 15.342c-5.94 0-11.974-1.149-17.305-3.44a.87.87 0 01.685-1.598c9.968 4.285 22.486 4.416 31.889.334a.868.868 0 01.694 1.593c-4.781 2.077-10.329 3.111-15.963 3.111zM58.089 18.194a.848.848 0 01-.336-.068c-2.418-1.013-4.497-2.099-6.542-3.415a.87.87 0 01.941-1.461c1.957 1.259 3.951 2.3 6.273 3.274a.87.87 0 01-.336 1.67zM82.083 17.974a.87.87 0 01-.342-1.667c3.256-1.394 4.7-2.135 6.437-3.305a.869.869 0 11.971 1.441c-1.82 1.226-3.391 2.035-6.724 3.461a.865.865 0 01-.342.07zM83.584 23.557a.868.868 0 01-.293-1.686c3.33-1.195 5.367-2.163 7.517-3.573a.869.869 0 11.951 1.453c-2.273 1.493-4.409 2.511-7.882 3.756a.856.856 0 01-.293.05zM85.33 29.792a.868.868 0 01-.321-1.674c2.63-1.049 4.647-2.221 6.747-3.916a.869.869 0 111.093 1.351c-2.243 1.812-4.396 3.062-7.198 4.178a.859.859 0 01-.321.061zM58.249 22.881a.856.856 0 01-.252-.038c-2.377-.72-5.074-1.537-8.843-4.084a.869.869 0 11.973-1.439c3.552 2.4 6.002 3.142 8.375 3.86a.869.869 0 01-.253 1.701zM56.024 25.869a.79.79 0 01-.145-.013c-2.377-.397-4.96-.993-7.74-2.644a.866.866 0 01-.303-1.189.865.865 0 011.189-.303c2.535 1.504 4.931 2.053 7.141 2.424a.868.868 0 01-.142 1.725zM53.257 30.469a.862.862 0 01-.207-.025c-2.243-.546-3.819-1.007-4.964-1.448a.87.87 0 01.624-1.622c1.074.414 2.583.853 4.752 1.382a.868.868 0 01-.205 1.713z"
      />
      <path
        fill="#EDBE5F"
        d="M68.586 11.1c-1.109 0-2.296-.046-3.586-.139-4.499-.302-6.586-.943-7.708-1.288a9.167 9.167 0 00-.635-.183A.866.866 0 0156 8.454a.873.873 0 011.037-.657c.214.047.46.123.766.216 1.128.347 3.016.928 7.317 1.216 3.99.286 6.93.121 9.547-.529 1.919-.465 3.549-1.182 4.891-1.823a.87.87 0 01.749 1.568c-1.424.68-3.157 1.442-5.226 1.941-1.934.48-4.018.714-6.495.714z"
      />
      <path
        fill="#EDBE5F"
        d="M74.875 10.411a.862.862 0 01-.419-.109c-8.02-4.445-11.874-4.9-15.135-4.983a.87.87 0 01-.846-.891c.011-.479.354-.871.891-.846 3.324.086 7.57.567 15.931 5.201a.87.87 0 01-.422 1.628z"
      />
      <g>
        <path
          fill="#E6A57A"
          d="M89.606 84.836c-8.631-9.68-5.933-23.728-5.43-47.391H56.96c.824 21.736 4.66 40.415-10.165 50.081 3.24 9.464 15.968 18.908 25.079 18.465 7.289-.349 17.61-7.267 21.602-17.708a21.907 21.907 0 01-3.87-3.447z"
        />
        <path
          fill="#418BAB"
          d="M93.477 88.283c-7.63 8.851-14.019 14.085-21.308 14.433-9.111.444-18.916-6.598-25.373-15.189-1.754 1.144-3.753 2.168-6.065 3.049-7.134 2.704-13.904 3.51-19.164 7.379-3.666 4.147-5.417 23.343-7.478 42.016h113.372c-2.196-18.594-5.203-39.875-7.438-42.638-9.838-4.655-18.98-3.77-26.546-9.05z"
        />
        <path
          fill="#559EBD"
          d="M14.472 140.838h-.011a.87.87 0 01-.857-.879 45.06 45.06 0 00-.068-3.058.868.868 0 01.819-.915.861.861 0 01.916.818c.058 1.041.083 2.168.07 3.176a.87.87 0 01-.869.858zM23.193 140.838h-.013a.868.868 0 01-.855-.882c.012-.715.012-1.637.012-2.824v-.255a.87.87 0 011.738 0v.255c0 1.198 0 2.13-.012 2.852a.87.87 0 01-.87.854zM23.398 98.218a.867.867 0 01-.865-.963l.021-.342-.003-.167a.869.869 0 011.738 0l-.014.476a2.93 2.93 0 01-.016.222.867.867 0 01-.861.774z"
        />
        <path
          fill="#559EBD"
          d="M23.082 103.266a.87.87 0 01-.864-.971c.061-.52.261-3.698.261-5.688a.869.869 0 011.738 0c0 2.089-.207 5.331-.272 5.893a.872.872 0 01-.863.766z"
        />
        <path
          fill="#559EBD"
          d="M24.019 108.139h-.011a.866.866 0 01-.857-.874c.001-.053.085-5.34.404-5.917a.868.868 0 011.585.693c-.107.631-.243 4.726-.251 5.241a.872.872 0 01-.87.857z"
        />
        <path
          fill="#559EBD"
          d="M23.521 113.303a.87.87 0 01-.857-1.017c.305-1.749.178-2.99.066-4.084-.055-.55-.108-1.068-.096-1.578a.862.862 0 01.89-.848.87.87 0 01.847.891c-.01.4.035.846.087 1.36.116 1.146.261 2.571-.083 4.556a.867.867 0 01-.854.72z"
        />
        <path
          fill="#559EBD"
          d="M23.18 118.147c-.474 0-.86-.326-.867-.802a.86.86 0 01.017-.188l-.01-.002c.005-.104.021-.841.021-5.373a.869.869 0 011.738 0c0 2.746 0 4.29-.071 5.162a.897.897 0 01.039.188l-.057.006-.009.081h.07a.964.964 0 01-.21.594.43.43 0 01-.333.262.728.728 0 01-.328.072z"
        />
        <path
          fill="#559EBD"
          d="M23.404 123.306l-.059-.002a.868.868 0 01-.809-.923c.074-1.108.03-4.262.016-5.297-.007-.465-.007-.465.021-.577a.868.868 0 011.711.23l.003.322c.026 1.829.05 4.382-.02 5.436a.865.865 0 01-.863.811z"
        />
        <path
          fill="#559EBD"
          d="M23.082 128.36a.87.87 0 01-.864-.971c.061-.519.261-3.696.261-5.688a.869.869 0 111.738 0c0 2.092-.207 5.332-.272 5.893a.872.872 0 01-.863.766z"
        />
        <path
          fill="#559EBD"
          d="M24.019 133.233h-.011a.866.866 0 01-.857-.875c.001-.052.085-5.339.404-5.916a.869.869 0 011.585.694c-.107.631-.243 4.724-.251 5.24a.872.872 0 01-.87.857z"
        />
        <path
          fill="#559EBD"
          d="M23.521 138.397a.869.869 0 01-.857-1.017c.305-1.751.178-2.99.066-4.084-.055-.55-.108-1.068-.096-1.578.012-.479.389-.807.89-.848a.871.871 0 01.847.891c-.01.401.035.845.087 1.359.116 1.146.261 2.572-.083 4.556a.866.866 0 01-.854.721zM32.629 113.042a.858.858 0 01-.852-.716c-.03-.182-.253-4.692-.028-5.742a.868.868 0 111.698.363c-.149.695.001 4.619.049 5.14a.877.877 0 01-.867.955z"
        />
        <path
          fill="#559EBD"
          d="M32.938 108.072a.863.863 0 01-.858-.747c-.021-.15-.131-5.558-.132-5.61a.868.868 0 01.854-.883l.015-.001a.87.87 0 01.869.854c.005.308.111 5.231.122 5.473a.872.872 0 01-.788.912l-.082.002z"
        />
        <path
          fill="#559EBD"
          d="M32.482 102.957l-.032-.001a.867.867 0 01-.836-.898c.044-1.234.029-2.42.018-3.373-.016-1.355-.019-1.92.09-2.264a.876.876 0 011.093-.563.871.871 0 01.563 1.093c-.028.158-.019.983-.009 1.713.011.973.026 2.182-.02 3.457a.866.866 0 01-.867.836z"
        />
        <path
          fill="#559EBD"
          d="M33.68 97.691h-.008a.868.868 0 01-.861-.877c.012-1.231-.012-1.959-.027-2.45-.018-.571-.028-.887.042-1.296a.873.873 0 011.002-.71c.473.08.791.529.71 1.001-.039.228-.035.409-.018.951.016.505.04 1.253.028 2.52a.869.869 0 01-.868.861zM33.235 140.838h-.018a.87.87 0 01-.851-.887c.033-1.532.068-2.481.108-2.902a1.03 1.03 0 01.058-.393.87.87 0 011.675.44 4.365 4.365 0 01-.004.119c-.035.372-.069 1.305-.1 2.772a.868.868 0 01-.868.851z"
        />
        <path
          fill="#559EBD"
          d="M32.629 138.138a.858.858 0 01-.852-.716c-.03-.184-.253-4.692-.028-5.744a.861.861 0 011.031-.668.87.87 0 01.667 1.032c-.149.695.001 4.62.049 5.14a.875.875 0 01-.867.956z"
        />
        <path
          fill="#559EBD"
          d="M32.938 133.167a.862.862 0 01-.858-.746c-.021-.151-.131-5.559-.132-5.611a.87.87 0 01.854-.883l.015-.001a.87.87 0 01.869.854c.005.309.111 5.232.122 5.474a.871.871 0 01-.788.911l-.082.002z"
        />
        <path
          fill="#559EBD"
          d="M32.653 128.101l-.032-.001a.867.867 0 01-.835-.9c.044-1.232.029-2.419.018-3.371-.016-1.354-.019-1.92.09-2.264a.877.877 0 011.093-.563.87.87 0 01.563 1.094c-.028.158-.018.983-.009 1.712.011.972.026 2.181-.021 3.457a.869.869 0 01-.867.836z"
        />
        <path
          fill="#559EBD"
          d="M33.68 122.786h-.008a.868.868 0 01-.861-.877c.008-.965.003-1.789 0-2.475-.007-1.255-.012-2.011.067-2.474a.867.867 0 111.712.29c-.053.314-.048 1.135-.043 2.174.005.692.009 1.524.001 2.501a.87.87 0 01-.868.861z"
        />
        <path
          fill="#559EBD"
          d="M33.234 118.055c-.416 0-.795-.331-.877-.752-.073-.373.078-5.284.139-5.611a.868.868 0 111.708.318c-.059.432-.146 4.645-.127 5.065.091.471-.222.874-.692.966a.884.884 0 01-.151.014z"
        />
        <g>
          <path
            fill="#559EBD"
            d="M42.2 140.838h-.018a.868.868 0 01-.851-.887c.022-1.1.07-2.246.117-2.853.018-.155.032-.235.044-.315a.868.868 0 111.715.28l-.03.206a58.97 58.97 0 00-.108 2.718.87.87 0 01-.869.851zM42.183 93.063a.869.869 0 01-.869-.868v-.232c-.012-.475 0-1.216.012-1.994a.868.868 0 01.869-.854h.014a.868.868 0 01.855.882c-.013.753-.024 1.47-.013 1.947v.252a.866.866 0 01-.868.867z"
          />
          <path
            fill="#559EBD"
            d="M42.21 98.007h-.015a.87.87 0 01-.854-.884c.067-3.79.059-3.945.021-4.691l-.027-.566a.868.868 0 01.83-.905c.513-.061.885.351.905.83l.026.553c.041.797.049.962-.019 4.81a.866.866 0 01-.867.853z"
          />
          <path
            fill="#559EBD"
            d="M42.073 102.936a.853.853 0 01-.848-.704c-.039-.216-.062-.877-.117-2.887-.025-.912-.055-2.041-.076-2.271a.867.867 0 01.601-.98.865.865 0 011.084.575c.051.166.062.197.127 2.63.028 1.025.066 2.429.094 2.649a.882.882 0 01-.732.979 1.172 1.172 0 01-.133.009z"
          />
          <path
            fill="#559EBD"
            d="M43.127 107.789h-.008a.854.854 0 01-.861-.851c.005-.238.021-1.171.021-4.836a.869.869 0 111.738 0c0 3.69-.019 4.629-.021 4.815a.883.883 0 01-.869.872z"
          />
          <path
            fill="#559EBD"
            d="M42.414 112.897a.868.868 0 01-.862-.771c-.057-.494-.14-4.84-.075-5.221a.858.858 0 011-.713.868.868 0 01.721.948c-.021.424.021 4.261.082 4.789a.87.87 0 01-.866.968z"
          />
          <path
            fill="#559EBD"
            d="M42.638 118.157a.87.87 0 01-.869-.852c-.021-1.147.037-4.672.185-5.612a.873.873 0 01.993-.724.87.87 0 01.724.994c-.117.749-.187 4.113-.164 5.308a.87.87 0 01-.852.886h-.017z"
          />
          <path
            fill="#559EBD"
            d="M42.21 123.103h-.015a.87.87 0 01-.854-.884c.067-3.79.059-3.945.021-4.692l-.027-.568a.868.868 0 01.831-.904c.469-.062.884.351.904.832l.026.553c.041.797.049.962-.019 4.809a.867.867 0 01-.867.854z"
          />
          <path
            fill="#559EBD"
            d="M42.073 128.031a.854.854 0 01-.848-.705c-.039-.216-.062-.876-.117-2.887-.025-.911-.055-2.04-.076-2.271a.868.868 0 011.685-.406c.051.167.062.198.127 2.63.028 1.025.066 2.429.094 2.65a.883.883 0 01-.865.989z"
          />
          <path
            fill="#559EBD"
            d="M41.727 132.762h-.009a.854.854 0 01-.86-.851c.005-.238.023-1.168.023-4.837a.87.87 0 011.738 0c0 3.696-.02 4.634-.024 4.818a.883.883 0 01-.868.87z"
          />
          <path
            fill="#559EBD"
            d="M42.414 137.992a.868.868 0 01-.862-.77c-.057-.495-.14-4.84-.075-5.222.079-.473.52-.809 1-.712a.868.868 0 01.721.947c-.021.424.021 4.262.082 4.789a.868.868 0 01-.866.968z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M51.871 140.838h-.009a.868.868 0 01-.86-.877l.008-.707c.009-.904.018-1.758.027-2.153v-.201a.869.869 0 011.738 0v.222a246.88 246.88 0 00-.027 2.15l-.008.707a.87.87 0 01-.869.859zM51.658 98.229a.87.87 0 01-.869-.868c0-.102.002-.193-.005-.27-.007-.553.007-.749.025-1.024.025-.387.063-.971.085-2.932.004-.481.376-.891.878-.859a.87.87 0 01.859.879c-.021 2.009-.063 2.622-.089 3.027-.016.241-.027.414-.027.808.01.029.012.193.012.371a.87.87 0 01-.869.868z"
          />
          <path
            fill="#559EBD"
            d="M51.629 103.255a.869.869 0 01-.863-.78c-.088-.868-.128-5.14-.055-5.938a.858.858 0 01.944-.786.87.87 0 01.786.944c-.062.676-.021 4.865.054 5.603a.868.868 0 01-.866.957z"
          />
          <path
            fill="#559EBD"
            d="M52.332 108.188a.9.9 0 01-.853-.657c-.171-.615-.164-5.763-.163-5.811a.87.87 0 01.869-.848h.021a.87.87 0 01.847.891c-.009.373.025 4.83.109 5.348a.85.85 0 01-.83 1.077z"
          />
          <path
            fill="#559EBD"
            d="M51.78 113.291a.855.855 0 01-.852-.725c-.068-.442-.051-5.777-.02-6.03a.864.864 0 01.97-.754c.46.057.791.465.759.921-.016.441-.034 5.17.01 5.619a.88.88 0 01-.867.969z"
          />
          <path
            fill="#559EBD"
            d="M51.849 118.182a.867.867 0 01-.869-.852c0-.04.049-5.396.065-5.598a.88.88 0 01.935-.797.868.868 0 01.798.914c-.011.314-.062 5.229-.061 5.456a.871.871 0 01-.858.876l-.01.001z"
          />
          <path
            fill="#559EBD"
            d="M52.131 123.26a.87.87 0 01-.869-.851c-.016-.767-.002-.974.021-1.337.029-.481.079-1.285.093-4.436a.868.868 0 01.869-.865h.003a.87.87 0 01.866.872c-.015 3.202-.066 4.036-.097 4.534-.02.326-.031.51-.017 1.195a.869.869 0 01-.85.887l-.019.001z"
          />
          <path
            fill="#559EBD"
            d="M51.629 128.351a.869.869 0 01-.863-.781c-.088-.867-.128-5.139-.055-5.937a.864.864 0 01.944-.787.87.87 0 01.786.945c-.062.676-.021 4.865.054 5.603a.868.868 0 01-.866.957z"
          />
          <path
            fill="#559EBD"
            d="M52.332 133.284a.9.9 0 01-.853-.658c-.171-.614-.164-5.763-.163-5.812a.87.87 0 01.869-.847h.021a.87.87 0 01.847.89c-.009.374.025 4.831.109 5.35.128.463-.148.918-.609 1.047a.8.8 0 01-.221.03z"
          />
          <path
            fill="#559EBD"
            d="M51.78 138.386a.855.855 0 01-.852-.725c-.068-.444-.051-5.778-.02-6.031a.864.864 0 01.971-.753.87.87 0 01.758.922c-.016.44-.034 5.17.01 5.619a.88.88 0 01-.867.968z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M61.09 140.838a.87.87 0 01-.869-.854c-.012-.722-.012-1.642-.012-2.841v-.231a.87.87 0 011.738 0v.231c0 1.188 0 2.099.012 2.813a.869.869 0 01-.855.882h-.014zM61.121 103.094a.87.87 0 01-.869-.868c0-.009 0-.062-.008-.144-.003-.351-.01-.883-.019-1.5l-.007-.481a.865.865 0 01.856-.98.88.88 0 01.88.858l.008.579c.007.628.016 1.169.016 1.447.011.097.011.206.011.221a.868.868 0 01-.868.868z"
          />
          <path
            fill="#559EBD"
            d="M61.498 108.108a.858.858 0 01-.856-.74c-.035-.25-.198-5.562-.198-5.598a.87.87 0 01.869-.846h.023a.869.869 0 01.846.876c.003.266.162 5.041.186 5.368a.877.877 0 01-.87.94z"
          />
          <path
            fill="#559EBD"
            d="M61.049 113.088a.864.864 0 01-.865-.803c-.003-.044-.176-5.289-.125-5.582a.88.88 0 011.007-.703.868.868 0 01.715.918c-.007.422.118 4.889.137 5.255a.87.87 0 01-.869.915z"
          />
          <path
            fill="#559EBD"
            d="M61.091 118.17l-.025-.001c-.296-.008-.488-.013-.615-.283a.86.86 0 01-.229-.586h.091l-.005-.046-.085-.006a.885.885 0 01.059-.269c-.068-.886-.068-2.438-.068-5.164a.87.87 0 011.738 0c0 4.384.004 5.262.006 5.427l.002.058a.866.866 0 01-.326.678.863.863 0 01-.543.192z"
          />
          <path
            fill="#559EBD"
            d="M61.545 123.085l-.019-.001a.866.866 0 01-.85-.882c.001-.051.168-5.316.254-5.623a.867.867 0 011.071-.602.87.87 0 01.623.968c-.041.465-.206 5.031-.211 5.289a.87.87 0 01-.868.851z"
          />
          <path
            fill="#559EBD"
            d="M61.115 128.186a.867.867 0 01-.867-.839c-.002-.051-.106-5.34-.057-5.621a.868.868 0 011.721.223c-.013.431.064 5.067.072 5.343a.87.87 0 01-.842.894h-.027z"
          />
          <path
            fill="#559EBD"
            d="M61.498 133.203a.858.858 0 01-.856-.739c-.035-.25-.198-5.564-.198-5.6a.87.87 0 01.869-.846h.023a.87.87 0 01.846.876c.003.266.162 5.042.186 5.37a.877.877 0 01-.87.939z"
          />
          <path
            fill="#559EBD"
            d="M61.049 138.184a.864.864 0 01-.865-.803c-.003-.045-.176-5.291-.125-5.582a.88.88 0 011.007-.704.87.87 0 01.715.919c-.007.421.118 4.888.137 5.254a.87.87 0 01-.815.914l-.054.002z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M70.772 140.838h-.004a.87.87 0 01-.864-.873c.012-1.982-.02-2.544-.039-2.703a1.32 1.32 0 01-.014-.398c.045-.479.476-.848.947-.781a.868.868 0 01.781.947c.036.25.073.804.062 2.945a.867.867 0 01-.869.863zM70.523 108.052c-.48 0-.866-.425-.866-.903 0-.04.009-.138.013-.178.076-.969.063-1.951.047-3.088l-.014-1.165a.868.868 0 01.863-.874c.491.029.871.383.874.862l.014 1.151c.016 1.181.03 2.2-.051 3.242a4.805 4.805 0 00-.013.119c.001.48-.387.834-.867.834z"
          />
          <path
            fill="#559EBD"
            d="M70.496 113.163a.867.867 0 01-.86-.993c.126-.866.24-4.534.139-5.267a.87.87 0 01.741-.979.875.875 0 01.98.743c.134.968-.002 4.792-.142 5.752a.867.867 0 01-.858.744z"
          />
          <path
            fill="#559EBD"
            d="M70.752 118.139h-.011a.869.869 0 01-.858-.88c.036-2.882.026-4.71-.027-5.146a1.198 1.198 0 010-.359.862.862 0 01.956-.77.87.87 0 01.77.957l-.863-.094.861.123c.026.143.1.721.042 5.312a.872.872 0 01-.87.857z"
          />
          <path
            fill="#559EBD"
            d="M70.825 123.132l-.047-.001a.869.869 0 01-.822-.913c.104-1.944.129-3.186.149-4.129.009-.466.017-.861.031-1.233a.878.878 0 01.903-.832c.479.02.852.423.832.903-.015.36-.021.744-.029 1.197-.021.957-.046 2.214-.151 4.187a.868.868 0 01-.866.821z"
          />
          <path
            fill="#559EBD"
            d="M70.533 128.179a.87.87 0 01-.866-.946l.038-.42c.085-.912.085-.912.093-2.718l.011-2.219a.87.87 0 01.868-.863h.006c.48.003.867.396.863.874l-.012 2.215c-.007 1.848-.007 1.884-.099 2.873l-.038.414a.868.868 0 01-.864.79z"
          />
          <path
            fill="#559EBD"
            d="M70.527 133.116a.869.869 0 01-.867-.944c.09-1.037.075-2.095.056-3.321-.01-.576-.02-1.193-.02-1.867a.869.869 0 011.737 0c0 .665.009 1.271.019 1.841.021 1.273.037 2.374-.062 3.499a.866.866 0 01-.863.792z"
          />
          <path
            fill="#559EBD"
            d="M70.496 138.257a.866.866 0 01-.86-.993c.126-.865.24-4.532.139-5.265a.869.869 0 01.741-.979.876.876 0 01.98.742c.135.97-.002 4.792-.142 5.751a.868.868 0 01-.858.744z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M19.139 140.838a.868.868 0 01-.863-.784l-.022-.335a9.074 9.074 0 01-.008-.156c-.004-.064-.009-.128-.009-.195a.869.869 0 111.738 0c.008.136.013.198.013.267l.018.252a.867.867 0 01-.867.951zM18.798 105.735a.868.868 0 01-.856-.731 5.895 5.895 0 01-.044-.436.869.869 0 01.806-.928c.49-.017.894.328.927.805.009.127.017.228.026.283a.867.867 0 01-.859 1.007z"
          />
          <path
            fill="#559EBD"
            d="M18.732 110.78a.853.853 0 01-.853-.73c-.054-.373.093-5.8.166-6.112a.86.86 0 011.042-.648.869.869 0 01.665.958c-.034.449-.185 5.115-.149 5.584a.882.882 0 01-.871.948z"
          />
          <path
            fill="#559EBD"
            d="M18.826 115.595a.913.913 0 01-.865-.693c-.072-.291-.243-3.354-.25-5.643a.868.868 0 01.867-.871h.002c.479 0 .868.387.869.867.008 2.393.181 5.057.212 5.301.116.465-.175.9-.641 1.016a.864.864 0 01-.194.023z"
          />
          <path
            fill="#559EBD"
            d="M19.098 120.734a.869.869 0 01-.867-.942c.063-.749.122-3.29.008-5.477a.867.867 0 01.822-.912c.428-.036.887.343.913.822.119 2.264.056 4.923-.012 5.714a.867.867 0 01-.864.795z"
          />
          <path
            fill="#559EBD"
            d="M19.403 125.806a.868.868 0 01-.862-.772c-.063-.567-.06-1.706-.053-3.595l.004-2.202a.869.869 0 011.738 0l-.004 2.208c-.006 1.701-.01 2.93.042 3.397a.868.868 0 01-.865.964z"
          />
          <path
            fill="#559EBD"
            d="M18.79 130.82a.857.857 0 01-.851-.716c-.083-.491-.059-5.698.027-6.056a.879.879 0 011.048-.643c.42.101.693.489.664.905-.022.571-.096 4.996-.024 5.511a.877.877 0 01-.864.999z"
          />
          <path
            fill="#559EBD"
            d="M18.732 135.874a.853.853 0 01-.853-.729c-.054-.371.093-5.797.166-6.11a.859.859 0 011.041-.651.868.868 0 01.667.959c-.034.448-.185 5.115-.149 5.583a.881.881 0 01-.771.943c-.034.002-.068.005-.101.005z"
          />
          <path
            fill="#559EBD"
            d="M18.938 140.765a.913.913 0 01-.865-.693c-.072-.291-.243-3.354-.25-5.643a.87.87 0 01.866-.872h.002a.87.87 0 01.869.867c.008 2.393.181 5.057.213 5.302.115.465-.176.899-.642 1.016a.855.855 0 01-.193.023z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M28.406 140.838a.865.865 0 01-.864-.962c.008-.073.006-.148.006-.231v-.312a.87.87 0 011.738 0v.312c0 .151-.002.284-.017.419a.868.868 0 01-.863.774zM28.844 100.756l-.052-.001a.869.869 0 01-.817-.918c.024-.498.101-4.297-.022-4.926a.867.867 0 111.703-.335c.192.976.057 5.324.055 5.362a.87.87 0 01-.867.818z"
          />
          <path
            fill="#559EBD"
            d="M28.402 105.761a.869.869 0 01-.869-.857l-.003-.17c-.002-.069-.003-.069.006-.276.015-.339.061-1.411.191-5.355a.877.877 0 01.897-.841.871.871 0 01.84.897 516.874 516.874 0 01-.193 5.375l-.004.129.004.22a.868.868 0 01-.858.879l-.011-.001z"
          />
          <path
            fill="#559EBD"
            d="M28.381 110.667a.868.868 0 01-.866-.82c-.045-.81.134-5.628.137-5.66a.885.885 0 01.939-.791.868.868 0 01.792.925c-.019.359-.168 4.795-.134 5.429a.87.87 0 01-.818.917h-.05z"
          />
          <path
            fill="#559EBD"
            d="M27.945 115.677a.863.863 0 01-.864-.802c-.002-.037-.056-5.392-.017-5.696.058-.477.501-.826.968-.756a.867.867 0 01.76.922c-.014.411.005 5.107.021 5.411a.871.871 0 01-.868.921z"
          />
          <path
            fill="#559EBD"
            d="M28.28 120.764l-.02-.001a.867.867 0 01-.849-.883l.01-.267c.032-.738.125-2.986.125-5.375a.869.869 0 011.738 0c0 2.425-.095 4.7-.126 5.449l-.009.227a.872.872 0 01-.869.85z"
          />
          <path
            fill="#559EBD"
            d="M28.844 125.852l-.052-.002a.868.868 0 01-.817-.918c.022-.511.096-4.945-.028-5.571a.868.868 0 111.704-.338c.19.96.062 5.968.06 6.011a.87.87 0 01-.867.818z"
          />
          <path
            fill="#559EBD"
            d="M28.402 130.855a.87.87 0 01-.869-.859l-.003-.169c-.002-.068-.003-.068.006-.274.015-.337.061-1.409.191-5.356.016-.479.431-.896.897-.839a.869.869 0 01.84.896c-.131 3.96-.178 5.036-.193 5.375l-.004.127.004.221a.869.869 0 01-.858.879l-.011-.001z"
          />
          <path
            fill="#559EBD"
            d="M28.381 135.763a.869.869 0 01-.866-.821c-.045-.811.135-5.628.137-5.659a.879.879 0 01.939-.791.869.869 0 01.792.925c-.019.356-.168 4.794-.134 5.429a.871.871 0 01-.818.917h-.05z"
          />
          <path
            fill="#559EBD"
            d="M27.945 140.772a.863.863 0 01-.864-.802c-.002-.037-.056-5.392-.017-5.697a.864.864 0 01.968-.755.867.867 0 01.76.921c-.014.412.005 5.108.021 5.411a.873.873 0 01-.868.922z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M37.532 140.797c-.479 0-.869-.348-.869-.827v-.579a.87.87 0 011.738 0v.498c-.001.478-.389.908-.869.908zM37.504 95.565c-.48 0-.869-.343-.869-.822v-.267l.005-.144c.014-.288.038-.776.027-2.33a.87.87 0 01.863-.874h.005c.478 0 .866.386.869.862.011 1.617-.014 2.124-.029 2.425l-.003.235c.001.48-.389.915-.868.915z"
          />
          <path
            fill="#559EBD"
            d="M37.799 100.721l-.059-.002a.868.868 0 01-.809-.924c.073-1.107.029-4.261.016-5.297-.007-.465-.007-.465.021-.576a.869.869 0 011.711.23l.004.322c.026 1.829.051 4.382-.019 5.436a.868.868 0 01-.865.811z"
          />
          <path
            fill="#559EBD"
            d="M37.404 105.774a.869.869 0 01-.864-.97c.061-.518.26-3.691.26-5.689a.869.869 0 011.738 0c0 2.097-.206 5.335-.271 5.893a.87.87 0 01-.863.766z"
          />
          <path
            fill="#559EBD"
            d="M37.929 110.648h-.012a.868.868 0 01-.857-.875c.001-.052.09-5.347.401-5.914a.87.87 0 011.18-.343.872.872 0 01.407 1.034c-.105.62-.243 4.743-.251 5.24a.869.869 0 01-.868.858z"
          />
          <path
            fill="#559EBD"
            d="M37.512 115.812a.87.87 0 01-.857-1.017c.304-1.75.178-2.989.067-4.083-.056-.55-.108-1.068-.097-1.579.013-.479.401-.813.89-.847.48.012.859.41.847.89-.01.401.036.846.088 1.36.116 1.146.261 2.572-.083 4.555a.87.87 0 01-.855.721z"
          />
          <path
            fill="#559EBD"
            d="M37.501 120.656c-.474 0-.86-.326-.866-.801a.854.854 0 01.017-.188l-.011-.002c.006-.105.021-.841.021-5.373a.87.87 0 011.738 0c0 2.745 0 4.29-.071 5.163.019.06.032.121.04.186l-.058.006c-.003.028-.005.055-.009.082h.07c0 .218-.08.428-.212.595a.429.429 0 01-.33.261.67.67 0 01-.329.071z"
          />
          <path
            fill="#559EBD"
            d="M37.799 125.816l-.059-.002a.868.868 0 01-.809-.924c.073-1.106.029-4.261.016-5.297-.007-.46-.007-.46.019-.567a.88.88 0 011.045-.646c.407.096.68.464.669.866l.004.323c.026 1.829.051 4.382-.019 5.437a.87.87 0 01-.866.81z"
          />
          <path
            fill="#559EBD"
            d="M37.404 130.87a.87.87 0 01-.864-.971c.061-.517.26-3.69.26-5.688a.869.869 0 111.738 0c0 2.096-.206 5.335-.271 5.893a.87.87 0 01-.863.766z"
          />
          <path
            fill="#559EBD"
            d="M37.929 135.743h-.012a.867.867 0 01-.857-.875c.001-.052.09-5.349.402-5.914a.866.866 0 011.18-.34.866.866 0 01.405 1.031c-.104.622-.242 4.743-.25 5.241a.87.87 0 01-.868.857z"
          />
          <path
            fill="#559EBD"
            d="M37.512 140.907a.87.87 0 01-.857-1.017c.304-1.75.178-2.99.067-4.084-.056-.55-.108-1.069-.097-1.58a.87.87 0 01.89-.847.87.87 0 01.847.89c-.01.402.036.847.088 1.36.116 1.146.261 2.573-.083 4.557a.87.87 0 01-.855.721z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M47.378 140.838l-.078-.003a.869.869 0 01-.789-.942c.012-.139.026-.252.039-.353a1.18 1.18 0 01.032-.271.88.88 0 011.02-.686c.471.093.777.55.686 1.02 0 .036-.009.111-.014.146l-.031.297a.87.87 0 01-.865.792zM47.012 90.308a.869.869 0 01-.863-.78c-.023-.229-.048-.948-.073-1.777a.87.87 0 01.842-.895h.026a.87.87 0 01.869.843c.022.771.043 1.44.064 1.652a.868.868 0 01-.865.957z"
          />
          <path
            fill="#559EBD"
            d="M47.106 95.572a.87.87 0 01-.869-.853c-.021-1.15.038-4.678.185-5.612a.875.875 0 01.994-.723.87.87 0 01.723.994c-.117.744-.187 4.108-.164 5.308a.87.87 0 01-.852.886h-.017z"
          />
          <path
            fill="#559EBD"
            d="M47.209 100.517h-.015a.87.87 0 01-.854-.884c.065-3.786.058-3.943.021-4.69l-.027-.57a.868.868 0 01.832-.903c.48-.063.883.351.904.832l.026.554c.041.796.049.962-.017 4.808a.87.87 0 01-.87.853z"
          />
          <path
            fill="#559EBD"
            d="M47 105.446a.855.855 0 01-.848-.705c-.039-.216-.063-.876-.117-2.886-.025-.912-.056-2.04-.076-2.272a.867.867 0 011.685-.405c.051.167.061.197.128 2.631.028 1.024.066 2.428.093 2.648a.88.88 0 01-.865.989z"
          />
          <path
            fill="#559EBD"
            d="M47.641 110.299h-.008a.853.853 0 01-.86-.851c.004-.238.021-1.171.021-4.836a.869.869 0 011.738 0c0 3.689-.018 4.629-.021 4.816a.887.887 0 01-.87.871z"
          />
          <path
            fill="#559EBD"
            d="M47.008 115.407a.868.868 0 01-.862-.771c-.057-.494-.141-4.84-.076-5.222a.855.855 0 011-.712.867.867 0 01.72.948c-.021.424.021 4.262.082 4.789a.869.869 0 01-.864.968z"
          />
          <path
            fill="#559EBD"
            d="M47.106 120.667a.87.87 0 01-.869-.853c-.021-1.149.038-4.677.185-5.612a.874.874 0 01.994-.723.871.871 0 01.723.994c-.117.744-.187 4.109-.164 5.308a.87.87 0 01-.852.886h-.017z"
          />
          <path
            fill="#559EBD"
            d="M46.792 125.612h-.015a.87.87 0 01-.854-.884c.066-3.789.059-3.945.021-4.692l-.027-.568a.868.868 0 01.832-.904c.464-.066.884.353.903.832l.026.553c.041.797.05.962-.018 4.81a.869.869 0 01-.868.853z"
          />
          <path
            fill="#559EBD"
            d="M47 130.541a.855.855 0 01-.848-.704c-.039-.216-.063-.877-.117-2.888-.025-.911-.056-2.04-.076-2.271a.867.867 0 01.601-.98.866.866 0 011.084.574c.051.167.061.198.128 2.631.028 1.026.066 2.43.093 2.65a.88.88 0 01-.865.988z"
          />
          <path
            fill="#559EBD"
            d="M47.641 135.394h-.008a.854.854 0 01-.86-.851c.004-.235.021-1.167.021-4.836a.869.869 0 111.738 0c0 3.694-.018 4.631-.021 4.816-.011.473-.398.871-.87.871z"
          />
          <path
            fill="#559EBD"
            d="M47.008 140.502a.867.867 0 01-.862-.771c-.057-.494-.141-4.842-.076-5.222a.87.87 0 011.72.237c-.021.423.021 4.261.082 4.788a.868.868 0 01-.864.968z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M56.863 140.838a.869.869 0 01-.869-.868v-.336c.011-.168.011-.224.011-.232a.869.869 0 011.738 0c0 .016 0 .121-.015.303l.003.266a.867.867 0 01-.868.867zM56.696 100.731a.87.87 0 01-.869-.868c0-.105.002-.2-.005-.278-.006-.534.006-.729.023-.997.016-.249.035-.568.052-1.26.013-.479.459-.861.89-.848a.871.871 0 01.847.891c-.018.729-.04 1.063-.056 1.325a9.861 9.861 0 00-.026.795c.009.037.011.197.011.372a.867.867 0 01-.867.868z"
          />
          <path
            fill="#559EBD"
            d="M56.594 105.765a.869.869 0 01-.862-.78c-.089-.868-.128-5.141-.056-5.937a.854.854 0 01.944-.787.87.87 0 01.786.944c-.062.676-.021 4.865.053 5.604a.866.866 0 01-.865.956z"
          />
          <path
            fill="#559EBD"
            d="M56.885 110.698a.9.9 0 01-.853-.657c-.171-.614-.165-5.763-.163-5.812a.868.868 0 01.869-.847h.021a.87.87 0 01.847.89c-.009.374.024 4.831.109 5.349a.85.85 0 01-.83 1.077z"
          />
          <path
            fill="#559EBD"
            d="M56.414 115.801a.856.856 0 01-.852-.726c-.067-.443-.051-5.777-.019-6.03a.868.868 0 011.728.169c-.016.44-.034 5.17.01 5.618a.88.88 0 01-.867.969z"
          />
          <path
            fill="#559EBD"
            d="M56.815 120.691a.865.865 0 01-.869-.852c0-.039.047-5.399.064-5.6.038-.477.47-.847.935-.794.47.036.824.444.797.913-.011.316-.061 5.23-.06 5.455a.871.871 0 01-.859.877l-.008.001z"
          />
          <path
            fill="#559EBD"
            d="M56.7 125.831a.87.87 0 01-.869-.851c-.016-.768-.002-.974.019-1.34.03-.479.08-1.284.093-4.433a.869.869 0 01.869-.866h.003a.868.868 0 01.865.873c-.015 3.199-.065 4.034-.096 4.533-.02.326-.03.51-.016 1.196a.87.87 0 01-.868.888z"
          />
          <path
            fill="#559EBD"
            d="M56.594 130.859a.869.869 0 01-.862-.781c-.089-.867-.128-5.139-.056-5.936.043-.477.439-.842.944-.786a.87.87 0 01.786.944c-.062.676-.021 4.862.053 5.601a.869.869 0 01-.865.958z"
          />
          <path
            fill="#559EBD"
            d="M56.885 135.793a.899.899 0 01-.853-.656c-.171-.616-.165-5.764-.163-5.813a.868.868 0 01.869-.847h.021a.869.869 0 01.847.89c-.009.374.024 4.833.109 5.35a.85.85 0 01-.83 1.076z"
          />
          <path
            fill="#559EBD"
            d="M56.414 140.896a.856.856 0 01-.852-.726c-.067-.444-.051-5.779-.019-6.031a.869.869 0 011.728.169c-.016.441-.034 5.17.01 5.619a.88.88 0 01-.867.969z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M66.104 140.838a.866.866 0 01-.862-.774l-.035-.335c-.102-.468.198-.963.667-1.063.466-.107.932.164 1.034.635.032.148.032.276.032.345l.028.231a.866.866 0 01-.864.961zM66.066 105.566h-.022a.855.855 0 01-.846-.852c0-.026.008-.16.01-.188.066-.895.085-1.713.06-2.508a.87.87 0 01.843-.895c.536.009.879.364.895.843.026.853.006 1.733-.06 2.614l-.877.098.868.045c-.027.465-.411.843-.871.843z"
          />
          <path
            fill="#559EBD"
            d="M66.125 110.746h-.017a.87.87 0 01-.852-.886c.023-1.141.01-2.676.001-3.861-.013-1.719-.01-1.839.022-1.99a.864.864 0 011.025-.676.87.87 0 01.687.959c-.011.188-.004.849.003 1.692.009 1.201.021 2.757-.001 3.91a.87.87 0 01-.868.852z"
          />
          <path
            fill="#559EBD"
            d="M65.619 115.541a.866.866 0 01-.867-.837c-.002-.063-.001-.494.044-4.88l.004-.41a.868.868 0 01.869-.86h.008a.87.87 0 01.861.877l-.004.412c-.013 1.195-.047 4.604-.045 4.814a.871.871 0 01-.848.882c-.008.002-.014.002-.022.002z"
          />
          <path
            fill="#559EBD"
            d="M66.274 120.591a.837.837 0 01-.828-.643c-.06-.25-.055-.533-.049-1.05.011-.822.03-2.199-.206-4.418a.871.871 0 01.772-.956.866.866 0 01.956.773c.246 2.322.227 3.764.215 4.625-.004.308-.014.515.005.64.07.461-.229.921-.687 1.011a.986.986 0 01-.178.018z"
          />
          <path
            fill="#559EBD"
            d="M66.304 125.816l-.044-.001a.87.87 0 01-.825-.911c.02-.388.036-.537.057-.745l.046-.479c.09-1.084.083-2.502-.022-4.213a5.513 5.513 0 01-.013-.241.87.87 0 011.738-.017l.009.151c.04.669.166 2.705.019 4.466l-.049.515c-.019.182-.033.312-.05.649a.868.868 0 01-.866.826zm.937-6.589h.011-.011z"
          />
          <path
            fill="#559EBD"
            d="M66.067 130.675l-.068-.002a.87.87 0 01-.8-.933 28.12 28.12 0 00-.082-5.18 1.525 1.525 0 01-.007-.234.855.855 0 01.944-.786.87.87 0 01.787.796c.096.854.288 3 .091 5.537a.87.87 0 01-.865.802z"
          />
          <path
            fill="#559EBD"
            d="M66.125 135.84h-.017a.868.868 0 01-.852-.886c.023-1.139.01-2.675.001-3.861-.013-1.718-.01-1.838.022-1.991a.868.868 0 011.712.284c-.011.188-.004.85.003 1.694.009 1.2.021 2.755-.001 3.908a.87.87 0 01-.868.852z"
          />
          <path
            fill="#559EBD"
            d="M65.619 140.636a.865.865 0 01-.867-.836c-.002-.064-.001-.495.044-4.883l.004-.408a.868.868 0 01.869-.86h.008a.869.869 0 01.861.876l-.004.411c-.013 1.196-.047 4.607-.045 4.817a.872.872 0 01-.87.883z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M75.603 140.838a.87.87 0 01-.866-.809l-.01-.168c-.003-.02-.008-.096-.01-.115a1.273 1.273 0 01-.001-.375.878.878 0 01.957-.778.863.863 0 01.771.948c.001.016.011.103.018.23l.008.138a.87.87 0 01-.807.927l-.06.002zM75.391 105.596a.869.869 0 01-.862-.984l.007-.076c.004-.068.012-.134.021-.191l.007-.096c.078-.821.086-.906.086-2.059a.87.87 0 011.737 0c0 1.234-.013 1.365-.094 2.222l-.042.431a.871.871 0 01-.86.753z"
          />
          <path
            fill="#559EBD"
            d="M74.974 110.531a.87.87 0 01-.867-.946c.092-1.037.076-2.098.057-3.325-.01-.576-.02-1.189-.02-1.861a.87.87 0 011.737 0c0 .662.009 1.268.019 1.834.021 1.276.037 2.378-.063 3.507a.869.869 0 01-.863.791z"
          />
          <path
            fill="#559EBD"
            d="M75.025 115.672a.867.867 0 01-.86-.993c.125-.863.24-4.528.139-5.267a.87.87 0 01.742-.979.875.875 0 01.979.744c.134.975-.003 4.794-.142 5.75a.87.87 0 01-.858.745z"
          />
          <path
            fill="#559EBD"
            d="M75.612 120.648H75.6a.868.868 0 01-.857-.88c.036-2.882.025-4.71-.028-5.146a1.205 1.205 0 010-.36.868.868 0 111.725.187l-.862-.094.86.123c.027.143.101.721.043 5.312a.869.869 0 01-.869.858z"
          />
          <path
            fill="#559EBD"
            d="M75.759 125.643l-.047-.001a.87.87 0 01-.821-.914c.104-1.944.129-3.186.147-4.13.009-.467.018-.862.033-1.233a.869.869 0 011.735.07c-.015.361-.022.746-.031 1.198-.02.957-.045 2.216-.149 4.187a.871.871 0 01-.867.823z"
          />
          <path
            fill="#559EBD"
            d="M75.395 130.689a.869.869 0 01-.867-.947l.039-.427c.084-.91.084-.91.092-2.739l.01-2.19a.87.87 0 01.869-.862h.006a.867.867 0 01.862.873l-.011 2.186c-.007 1.872-.007 1.907-.098 2.894l-.039.423a.868.868 0 01-.863.789z"
          />
          <path
            fill="#559EBD"
            d="M74.974 135.625a.867.867 0 01-.867-.945c.092-1.038.076-2.098.057-3.326-.01-.575-.02-1.189-.02-1.861a.869.869 0 011.737 0c0 .662.009 1.268.019 1.835.021 1.275.037 2.379-.063 3.507a.869.869 0 01-.863.79z"
          />
          <path
            fill="#559EBD"
            d="M75.025 140.768a.867.867 0 01-.86-.994c.124-.862.24-4.529.139-5.267a.87.87 0 01.742-.979.872.872 0 01.979.742c.134.976-.003 4.797-.142 5.752a.87.87 0 01-.858.746z"
          />
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M76.181 140.553a.905.905 0 01-.102-.007c-.2-.02-1.095-.035-1.697-.049l-.311-.005a.87.87 0 01-.851-.887c.011-.479.362-.854.887-.851l.31.007c1.115.022 1.678.037 1.866.059a.87.87 0 01-.102 1.733zM73.858 105.464a.869.869 0 01-.087-1.733 33.073 33.073 0 012.454-.151h.011a.868.868 0 01.011 1.737c-.619.006-1.676.08-2.3.143a.857.857 0 01-.089.004zM73.964 110.416a.87.87 0 01-.02-1.738c.149-.004 2.129-.003 2.278-.015a.868.868 0 01-.007 1.737h-.035c-.279 0-2.056.011-2.195.015l-.021.001zM76.181 115.457a.898.898 0 01-.102-.006c-.2-.021-1.095-.036-1.697-.049l-.311-.005a.872.872 0 01-.851-.887c.011-.48.362-.867.887-.851l.31.007c1.115.021 1.678.037 1.866.058a.87.87 0 01-.102 1.733zM76.158 120.469h-.026c-.702-.021-.873-.024-1.072-.028l-.739-.018a.87.87 0 01-.845-.893c.013-.478.386-.819.892-.845l.724.018c.203.005.378.007 1.093.028a.87.87 0 01-.027 1.738zM76.277 125.476l-.053-.002c-.134-.006-.895-.011-1.57-.015l-.765-.005a.87.87 0 01.006-1.737h.007l.762.006c.749.004 1.594.012 1.675.018a.868.868 0 01-.062 1.735zM73.858 130.559a.868.868 0 01-.085-1.733 33.8 33.8 0 012.45-.153h.013a.87.87 0 01.013 1.737 32.45 32.45 0 00-2.304.145.807.807 0 01-.087.004zM73.965 135.512a.87.87 0 01-.028-1.738c.15-.006 2.13-.017 2.278-.017a.869.869 0 010 1.737c-.144 0-2.066.011-2.226.017l-.024.001zM64.88 140.528a.87.87 0 01-.015-1.738c.143-.001 1.711-.013 1.851-.009a.87.87 0 01.818.918c-.029.477-.439.853-.911.817-.202-.007-1.6.008-1.729.011l-.014.001zM65.15 105.395l-.08-1.736c.312-.006 1.194-.02 1.507-.006a.87.87 0 01.828.908.854.854 0 01-.908.827 37.25 37.25 0 00-1.347.007zM66.487 110.424a.865.865 0 01-.088-.005 95.615 95.615 0 00-1.842-.026.87.87 0 010-1.738c.018 0 1.859.011 2.064.044a.868.868 0 01-.134 1.725zM64.88 115.434a.87.87 0 01-.015-1.737 163.54 163.54 0 011.851-.01.87.87 0 01.818.918c-.029.476-.439.878-.911.817-.202-.009-1.6.009-1.729.012h-.014zM65.008 120.452a.87.87 0 01-.02-1.738c.155-.004 1.747-.02 1.791-.012a.87.87 0 01.849.89c-.012.476-.385.838-.88.848-.112-.005-1.572.008-1.72.012h-.02zM64.644 125.474a.87.87 0 01-.029-1.738c.019 0 1.902-.024 2.074-.01.477.059.816.49.76.967-.054.459-.458.821-.916.763-.229-.001-1.768.016-1.869.018h-.02zM65.084 130.49a.87.87 0 01-.021-1.738 42.99 42.99 0 011.514-.005.87.87 0 01.828.907c-.022.479-.418.866-.908.828a40.504 40.504 0 00-1.394.007l-.019.001zM66.487 135.519a88.73 88.73 0 00-1.93-.031.87.87 0 010-1.737c.018 0 1.859.01 2.064.043a.867.867 0 01-.134 1.725z"
          />
          <g>
            <path
              fill="#559EBD"
              d="M55.352 140.543a.868.868 0 01-.05-1.736c.78-.045 1.257-.047 1.943-.04a.87.87 0 01-.011 1.738h-.01c-.645-.01-1.09-.008-1.821.037l-.051.001zM54.975 100.384a.869.869 0 01-.045-1.736c.182-.01 1.754-.049 2.408-.014a.869.869 0 11-.093 1.734c-.558-.034-2.072.006-2.225.015l-.045.001zM55.703 105.407a.87.87 0 01-.022-1.738c.193-.004 1.816-.025 1.878-.035a.869.869 0 01-.038 1.736h-.026a241.856 241.856 0 00-1.792.037zM55.195 110.434a.87.87 0 01-.012-1.737 49.381 49.381 0 001.735-.046c.122-.004.187-.007.211-.004a.867.867 0 01-.032 1.736h-.003c-.34.015-.875.037-1.889.051h-.01zM55.352 115.448a.87.87 0 01-.05-1.736c.78-.044 1.257-.047 1.943-.04a.869.869 0 01-.011 1.737h-.01a21.995 21.995 0 00-1.821.038l-.051.001zM57.248 120.493l-.062-.002-.419-.019a144.81 144.81 0 01-1.583-.076.866.866 0 01-.81-.923.86.86 0 01.922-.81c.231.014 1.037.051 1.548.073.322.015.553.032.558.032a.87.87 0 01-.154 1.725zM54.975 125.479a.869.869 0 01-.038-1.736c.169-.008 1.754-.046 2.401-.014a.87.87 0 01.821.914.879.879 0 01-.914.82c-.564-.03-2.085.008-2.231.015a.508.508 0 01-.039.001zM55.703 130.502a.87.87 0 01-.026-1.738c.017 0 1.759-.047 1.896-.033a.867.867 0 01-.052 1.734h-.039c-.223 0-1.581.031-1.753.036l-.026.001zM55.195 135.528a.87.87 0 01-.012-1.737 51.973 51.973 0 001.717-.045c.144-.005.218-.005.245-.004a.867.867 0 01.82.914c-.027.468-.421.839-.878.822l-.113.004c-.244.01-.777.033-1.768.046h-.011z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M45.727 140.529a.871.871 0 01-.87-.843.865.865 0 01.837-.894c.019-.001 2.14-.026 2.325-.008a.869.869 0 01.776.952.88.88 0 01-.919.778c-.236-.005-1.994.011-2.125.014l-.024.001zM45.725 90.339a.87.87 0 01-.021-1.738c.018 0 2.125-.021 2.306-.008a.869.869 0 01-.13 1.733c-.235-.008-2.029.009-2.138.012l-.017.001zM45.653 95.383a.87.87 0 01-.051-1.736c.019-.001 2.026-.076 2.195-.059a.865.865 0 01.781.946.851.851 0 01-.899.785h-.004c-.251 0-1.868.057-1.979.062l-.043.002zM47.722 100.388a.874.874 0 01-.114-.008 19.922 19.922 0 00-2.201.005c-.51.04-.892-.333-.92-.812a.866.866 0 01.812-.921c1.073-.067 2.312-.025 2.548.007a.869.869 0 01-.125 1.729zM48.323 105.408l-.035-.001c-.227-.009-1.55-.034-1.836-.037a.87.87 0 01.011-1.737h.01c.293.003 1.653.03 1.883.04a.867.867 0 01-.033 1.735zM45.748 110.434a.867.867 0 01-.052-1.734c.761-.049 1.595-.051 1.971-.052l.163-.001c.434.002.865.346.897.812a.863.863 0 01-.769.92 6.536 6.536 0 01-.287.007 32.591 32.591 0 00-1.923.048zM45.725 115.435a.87.87 0 01-.021-1.738c.019 0 2.132-.024 2.315-.008a.87.87 0 01.776.953.88.88 0 01-.919.778c-.237-.008-2.026.012-2.133.014l-.018.001zM45.653 120.479a.87.87 0 01-.868-.825.864.864 0 01.817-.911c.019-.003 2.006-.084 2.208-.059a.868.868 0 01.768.958.876.876 0 01-.903.772c-.22-.009-1.87.057-1.979.063l-.043.002zM45.352 125.483a.868.868 0 01-.053-1.735c1.058-.067 2.301-.027 2.542.004a.87.87 0 01.742.979.875.875 0 01-.969.744c-.175-.02-1.24-.052-2.206.005l-.056.003zM48.323 130.502l-.035-.001c-.227-.009-1.55-.032-1.836-.036a.869.869 0 01.011-1.737h.01c.293.004 1.653.029 1.883.038a.868.868 0 01-.033 1.736zM45.748 135.529a.867.867 0 01-.865-.815.866.866 0 01.813-.92 34.34 34.34 0 011.97-.052l.163-.001c.426-.033.866.346.898.811a.864.864 0 01-.769.921 6.536 6.536 0 01-.287.007c-.357.001-1.148.003-1.869.047l-.054.002z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M26.692 140.528l-.324-.001a.87.87 0 01-.857-.881c.006-.479.401-.832.88-.856.253.003 1.736-.002 2.015-.01.509-.034.882.357.898.837a.866.866 0 01-.837.897c-.227.009-1.227.014-1.775.014zM28.671 100.405c-.027 0-.054-.002-.081-.004-.354-.033-1.803-.056-2.166-.064h-.006a.87.87 0 01-.006-1.737c.335.004 1.873.029 2.336.071a.869.869 0 01-.077 1.734zM29.652 105.411l-.034-.001c-.143-.006-1.985-.041-2.179-.041h-.009a.871.871 0 01-.87-.863.867.867 0 01.861-.874c.148-.035 2.118.037 2.265.043a.868.868 0 01-.034 1.736zM26.859 110.417a.87.87 0 01-.019-1.738c.023 0 2.27-.031 2.46-.004a.869.869 0 01.717.998.86.86 0 01-.912.728c-.266-.011-2.15.013-2.231.016h-.015zM26.692 115.434l-.324-.001a.87.87 0 01-.857-.88.867.867 0 01.869-.858c.07.012.181.002.345.002.53 0 1.466-.006 1.682-.012.445-.06.881.356.898.837a.865.865 0 01-.837.897c-.228.009-1.228.015-1.776.015zM26.637 120.508a.868.868 0 01-.083-1.732c.169-.017 1.509-.123 2.154-.129h.008a.87.87 0 01.008 1.737c-.575.006-1.867.107-2.002.12a.819.819 0 01-.085.004zM28.671 125.498l-.081-.003a38.251 38.251 0 00-2.169-.064h-.003a.87.87 0 01-.002-1.737c.311-.018 1.885.031 2.333.071a.87.87 0 01-.078 1.733zM29.652 130.504l-.034-.001c-.146-.005-2.045-.04-2.19-.04a.87.87 0 010-1.737c.149 0 2.111.037 2.258.043a.867.867 0 01-.034 1.735zM26.859 135.513a.868.868 0 01-.019-1.738c.022 0 2.267-.034 2.46-.006a.87.87 0 01.717.998.85.85 0 01-.911.728c-.255-.012-2.151.017-2.232.018h-.015z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M37.947 140.553a.943.943 0 01-.189-.021c-.175-.028-.948-.048-1.559-.037-.519-.027-.875-.375-.883-.854a.87.87 0 01.854-.884c.157-.003 1.533-.021 1.972.08a.87.87 0 01-.195 1.716zM38.146 95.357c-.021 0-.043-.003-.064-.004-.198-.01-1.38-.006-1.477-.008a.87.87 0 010-1.737c1.477 0 1.574.009 1.624.016a.867.867 0 01-.083 1.733zM36.265 100.419a.868.868 0 01-.061-1.735 43.524 43.524 0 011.718-.1c.464.037.877.368.889.85a.871.871 0 01-.85.888c-.387.009-1.077.055-1.633.095l-.063.002zM38.841 105.425l-.081-.003c-.547-.051-.629-.051-1.873-.065l-.255-.003a.87.87 0 01.012-1.737h.011l.256.003c1.3.016 1.407.017 2.009.072a.87.87 0 01-.079 1.733zM36.013 110.44a.868.868 0 01-.03-1.735c2.305-.078 2.345-.068 2.453-.056a.872.872 0 01.723.995.88.88 0 01-.909.731c-.119.018-.895.021-2.208.063-.01.002-.02.002-.029.002zM37.947 115.458a.941.941 0 01-.189-.02c-.175-.03-.955-.054-1.559-.039a.845.845 0 01-.883-.854.87.87 0 01.854-.884c.061.001 1.52-.024 1.972.082a.866.866 0 01.649 1.042.866.866 0 01-.844.673zM38.146 120.45l-.064-.002c-.184-.007-1.236-.007-1.446-.007l-.031-1.737c.299-.016 1.519.004 1.624.014a.867.867 0 01-.083 1.732zM36.265 125.514a.87.87 0 01-.061-1.736 43.524 43.524 0 011.718-.1c.464.002.877.369.889.85a.87.87 0 01-.85.888 44.03 44.03 0 00-1.696.098zM38.841 130.52l-.081-.003c-.535-.051-.625-.051-1.79-.064l-.338-.004a.868.868 0 01.012-1.737h.011l.336.004c1.255.015 1.353.02 1.929.071a.868.868 0 01-.079 1.733zM36.013 135.534a.87.87 0 01-.029-1.737c2.302-.073 2.341-.067 2.451-.052a.871.871 0 01.723.994.883.883 0 01-.909.732h-.013c-.189 0-.921.021-2.195.063h-.028z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M17.626 140.549a.869.869 0 01-.053-1.734c.442-.029 1.335-.06 1.921-.055a.87.87 0 01-.016 1.738l-.231-.002c-.521 0-1.193.027-1.564.051l-.057.002zM18.963 105.374c-.479 0-.968-.388-.968-.866 0-.48.289-.869.769-.869h.104c.039-.002 1.049-.042 1.309 0a.867.867 0 11-.276 1.715c-.067-.003-.501.002-.938.02zM19.483 110.448l-.062-.002a26.306 26.306 0 00-.723-.034.785.785 0 01-.175-.024l-.313.002-.363-.012a.868.868 0 01-.831-.904c.019-.479.447-.862.905-.83l.332.01c.136.004.261.007.375.013.027.001.099 0 .193.014.329.011.563.022.722.034a.868.868 0 01-.06 1.733zM17.626 115.453a.868.868 0 01-.052-1.734 29.646 29.646 0 011.919-.054.87.87 0 01-.016 1.738l-.225-.002c-.523 0-1.199.027-1.572.051l-.054.001zM17.807 120.459a.868.868 0 01-.043-1.735c.02.001 2-.067 2.326.005a.867.867 0 01.658 1.037.874.874 0 01-.968.671c-.276-.017-1.735.012-1.927.021l-.046.001zM19.692 125.486a.882.882 0 01-.208-.025c-.166-.023-.823-.019-1.58-.009l-.728.007h-.008a.87.87 0 01-.009-1.737l.727-.007c1.298-.015 1.732-.018 2.035.064a.87.87 0 01-.229 1.707zM17.704 130.52a.871.871 0 01-.867-.81.866.866 0 01.804-.926c.02-.001 2.243-.12 2.58-.047.469.098.77.559.67 1.027a.874.874 0 01-.954.684 97.5 97.5 0 00-2.233.072zM19.482 135.544l-.063-.002c-.28-.02-.876-.047-1.785-.082a.868.868 0 01-.835-.9c.017-.48.424-.889.9-.835.938.035 1.553.064 1.843.085a.868.868 0 01-.06 1.734z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M69.506 107.905a.869.869 0 01-.02-1.738c.151-.004 1.17-.022 1.515-.005a.868.868 0 01.827.907c-.02.478-.445.887-.907.828-.31-.014-1.254.003-1.395.007l-.02.001zM70.991 112.934a.85.85 0 01-.088-.005 95.804 95.804 0 00-1.844-.026.869.869 0 110-1.737c.018 0 1.862.01 2.064.042a.868.868 0 01-.132 1.726zM69.714 117.943a.869.869 0 01-.014-1.738c.144-.001 1.712-.011 1.853-.009a.868.868 0 01.817.916c-.026.477-.446.872-.91.819-.201-.006-1.601.009-1.729.011l-.017.001zM69.916 122.961a.869.869 0 01-.019-1.738c.154-.003 1.753-.002 1.791-.011a.87.87 0 01.848.889c-.011.478-.435.864-.882.849-.146-.001-1.573.008-1.718.011h-.02zM69.476 127.982a.87.87 0 01-.012-1.737c1.907-.026 2.033-.011 2.073-.005.476.063.81.501.745.976-.061.455-.48.767-.919.75-.241.006-1.804.016-1.875.017l-.012-.001zM69.506 133a.869.869 0 01-.02-1.738 38.407 38.407 0 011.515-.006.868.868 0 01.827.907.876.876 0 01-.907.828 35.807 35.807 0 00-1.395.008l-.02.001zM70.991 138.028a96.503 96.503 0 00-1.932-.031.869.869 0 110-1.737c.018 0 1.862.011 2.064.041a.871.871 0 01.724.994.867.867 0 01-.856.733z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M59.834 102.893a.868.868 0 01-.037-1.736c.168-.007 1.754-.048 2.401-.014a.87.87 0 01-.093 1.735c-.568-.03-2.086.008-2.232.014l-.039.001zM60.151 107.917a.87.87 0 01-.027-1.738l1.896-.035a.87.87 0 01.815.92c-.029.472-.477.809-.895.816-.217-.037-1.59.03-1.762.036l-.027.001zM59.725 112.942a.87.87 0 01-.011-1.737 57.041 57.041 0 001.717-.044c.139-.005.216-.005.245-.004a.867.867 0 01-.047 1.736h-.012l-.113.004c-.244.01-.778.032-1.768.045h-.011zM60.212 117.958a.87.87 0 01-.05-1.736 25.67 25.67 0 011.943-.04.869.869 0 01.858.879.854.854 0 01-.879.858 21.982 21.982 0 00-1.821.037c-.015.002-.034.002-.051.002zM62.182 123.003l-.063-.002-.474-.021c-.523-.023-1.297-.059-1.526-.073a.867.867 0 11.106-1.733c.224.014.985.048 1.499.072.35.014.606.035.611.035a.868.868 0 01-.153 1.722zM59.834 127.988a.869.869 0 01-.037-1.736c.099-.005 1.723-.051 2.401-.015a.869.869 0 01.821.914.874.874 0 01-.914.821c-.563-.029-2.085.009-2.232.015l-.039.001zM60.151 133.013a.87.87 0 01-.027-1.738c.191-.007 1.801-.049 1.883-.036a.869.869 0 01-.039 1.736c-.01 0-.021-.003-.026 0-.191 0-1.592.03-1.764.037l-.027.001zM59.725 138.037a.87.87 0 01-.011-1.737c.953-.012 1.471-.034 1.712-.044.146-.005.221-.005.25-.004a.868.868 0 01-.047 1.736h-.013l-.119.004c-.247.01-.78.032-1.761.045h-.011z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M50.627 97.892a.87.87 0 01-.051-1.735c.018-.002 2.001-.088 2.207-.058.477.052.821.48.769.958-.05.459-.469.812-.903.772-.217-.045-1.87.057-1.979.062l-.043.001zM50.251 102.897a.867.867 0 01-.053-1.734c1.06-.068 2.302-.027 2.542.004a.869.869 0 01-.227 1.721 20.986 20.986 0 00-2.262.009zM52.811 107.917l-.035-.001a156.14 156.14 0 00-1.836-.036.869.869 0 01-.858-.879c.004-.48.391-.881.878-.858.293.003 1.652.029 1.883.038a.868.868 0 01-.032 1.736zM50.316 112.944a.87.87 0 01-.052-1.735 34.422 34.422 0 011.972-.052l.163-.001c.429-.039.866.346.898.811a.864.864 0 01-.77.92c-.02.001-.121.007-.286.008-.357.001-1.148.003-1.871.047l-.054.002zM50.627 117.944a.871.871 0 01-.87-.843.866.866 0 01.837-.894c.019-.001 2.141-.024 2.327-.008a.869.869 0 01.776.952.885.885 0 01-.919.777c-.242-.006-1.998.01-2.126.015l-.025.001zM50.623 122.986a.868.868 0 01-.034-1.736c.02-.001 1.998-.086 2.195-.056.477.052.821.48.769.957a.875.875 0 01-.903.772c-.227.025-1.913.06-1.989.062l-.038.001zM52.623 127.991a20.032 20.032 0 00-2.317-.002.85.85 0 01-.92-.812.87.87 0 01.812-.922c1.058-.064 2.301-.028 2.542.006a.87.87 0 01-.117 1.73zM52.811 133.013l-.035-.001a121.88 121.88 0 00-1.832-.036.87.87 0 01-.862-.876.867.867 0 01.869-.861h.006c.294.002 1.655.028 1.887.038a.868.868 0 01-.033 1.736zM50.316 138.037a.867.867 0 01-.866-.816.871.871 0 01.816-.92 36.6 36.6 0 011.967-.049l.166-.001c.429-.025.866.345.898.811a.865.865 0 01-.77.921c-.02.002-.122.006-.288.007-.36.001-1.148.003-1.87.047h-.053z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M40.732 92.866a.87.87 0 01-.021-1.738l.437-.011c1.093-.026 1.408-.033 1.789-.038h.009a.87.87 0 01.869.859.87.87 0 01-.86.878c-.375.004-.688.012-1.765.037l-.436.012-.022.001zM41.133 97.882a.869.869 0 01-.046-1.736c.797-.043 1.811-.054 2.006-.037a.868.868 0 01.795.936c-.037.477-.481.826-.924.796a30.544 30.544 0 00-1.784.041h-.047zM42.755 102.91a.963.963 0 01-.131-.01 59.312 59.312 0 00-1.908-.052.87.87 0 01.007-1.737h.007c.019 0 1.915.021 2.197.078a.87.87 0 01-.172 1.721zM41.365 107.915a.87.87 0 01-.869-.836.867.867 0 01.834-.9c.017-.001 2.124-.026 2.256-.032a.87.87 0 01.821.915c-.024.473-.389.847-.89.821-.203.05-1.971.026-2.12.031l-.032.001zM42.795 112.992a.908.908 0 01-.204-.024c-.21-.036-1.26-.109-1.555-.126a.869.869 0 01-.821-.914c.026-.479.433-.862.914-.821.016.001 1.572.087 1.902.182a.87.87 0 01.6 1.072.87.87 0 01-.836.631zM40.732 117.961a.87.87 0 01-.021-1.738l.437-.01c1.093-.027 1.408-.034 1.789-.039h.009a.87.87 0 01.009 1.737c-.375.004-.688.012-1.765.038l-.436.011-.022.001zM41.133 122.978a.87.87 0 01-.047-1.736c.787-.043 1.807-.058 2.007-.037a.867.867 0 01.795.936.865.865 0 01-.924.796 31.18 31.18 0 00-1.783.041h-.048zM42.755 128.005a.963.963 0 01-.131-.01 59.848 59.848 0 00-1.902-.051.869.869 0 110-1.737c.019 0 1.917.02 2.204.078a.87.87 0 01-.171 1.72zM41.364 133.01a.87.87 0 01-.028-1.738c.148-.005 2.181-.049 2.234-.031a.868.868 0 01-.03 1.736h-.02c-.189 0-1.993.026-2.129.032l-.027.001zM42.795 138.087a.967.967 0 01-.204-.023c-.21-.036-1.26-.111-1.555-.126a.87.87 0 01-.821-.915c.026-.478.433-.872.914-.82.016.001 1.572.087 1.902.181a.87.87 0 01.6 1.073.87.87 0 01-.836.63z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M31.622 97.923a.867.867 0 01-.083-1.732c.148-.015 1.508-.124 2.153-.129h.008a.868.868 0 01.009 1.737c-.545.004-1.82.104-2 .119a.644.644 0 01-.087.005zM33.583 102.913l-.081-.003c-.358-.034-1.799-.054-2.169-.065h-.003a.87.87 0 01-.002-1.737c.362.006 1.885.031 2.332.072a.869.869 0 01-.077 1.733zM34.151 107.919l-.034-.001a322.03 322.03 0 00-2.189-.041.87.87 0 010-1.737c.149 0 2.11.038 2.257.043a.869.869 0 01-.034 1.736zM31.44 112.927a.87.87 0 01-.02-1.738c.022 0 2.267-.033 2.46-.005a.87.87 0 01-.194 1.726c-.255-.005-2.151.015-2.233.017h-.013zM31.603 117.943l-.324-.001a.87.87 0 01-.857-.881c.007-.48.434-.895.88-.856.255.004 1.736-.001 2.014-.01.52-.041.884.356.899.835a.866.866 0 01-.836.898c-.227.01-1.228.015-1.776.015zM31.622 123.018a.87.87 0 01-.078-1.734c.128-.012 1.502-.12 2.148-.127h.008a.87.87 0 01.009 1.737c-.547.005-1.83.104-2.005.12a.788.788 0 01-.082.004zM33.583 128.008l-.081-.003c-.353-.032-1.779-.063-2.166-.064h-.006a.87.87 0 01-.869-.863.87.87 0 01.863-.874c.328-.015 1.874.029 2.335.072a.869.869 0 01-.076 1.732zM34.151 133.015l-.034-.001c-.143-.007-1.985-.041-2.178-.041h-.009a.87.87 0 01-.01-1.737c.128-.019 2.118.038 2.265.043a.868.868 0 01-.034 1.736zM31.44 138.021a.87.87 0 01-.02-1.738c.022 0 2.268-.032 2.46-.003a.868.868 0 01.717.997.867.867 0 01-.911.728c-.271-.014-2.151.015-2.233.016h-.013z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M24.475 97.865l-.065-.002c-.186-.009-1.237-.007-1.446-.007l-.031-1.738c1.478.021 1.567.009 1.625.015a.868.868 0 01-.083 1.732zM22.521 102.928a.869.869 0 01-.06-1.736 43.32 43.32 0 011.718-.099.847.847 0 01.889.849.871.871 0 01-.85.889c-.387.009-1.077.055-1.634.095l-.063.002zM24.685 107.934c-.028 0-.054-.001-.081-.003-.535-.05-.627-.05-1.791-.063l-.338-.004a.87.87 0 01.012-1.737h.011l.337.004c1.253.015 1.352.018 1.927.07a.87.87 0 01-.077 1.733zM21.938 112.949a.87.87 0 01-.029-1.737c2.302-.073 2.342-.068 2.451-.052a.87.87 0 01.723.994c-.071.446-.486.743-.908.731-.116-.007-.904.021-2.209.063l-.028.001zM24.203 117.967a.869.869 0 01-.189-.021c-.176-.029-.947-.048-1.559-.037h-.014a.869.869 0 01-.015-1.738c.157-.002 1.534-.023 1.973.08a.87.87 0 01-.196 1.716zM24.475 122.96l-.065-.002c-.195-.008-1.368-.007-1.467-.007h-.009a.87.87 0 01-.01-1.737c.014 0 1.453-.005 1.635.014a.867.867 0 01-.084 1.732zM22.521 128.023a.869.869 0 01-.06-1.736 45.54 45.54 0 011.718-.1h.021a.87.87 0 01.019 1.739c-.387.009-1.077.055-1.634.095l-.064.002zM24.685 133.029c-.028 0-.054-.001-.081-.003-.534-.05-.585-.05-1.876-.066l-.251-.002a.869.869 0 01.011-1.737h.01l.251.003c1.306.016 1.412.017 2.015.071a.87.87 0 01-.079 1.734zM21.938 138.044a.869.869 0 01-.029-1.737c2.323-.074 2.345-.069 2.472-.047a.868.868 0 01.697 1.011c-.08.439-.487.754-.909.71-.197 0-.908.021-2.203.063h-.028z"
            />
          </g>
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M80.18 140.838l-.033-.001a.867.867 0 01-.836-.899c.053-1.472-.019-2.021-.071-2.424a.651.651 0 01-.008-.073 2.02 2.02 0 01-.025-.298 2.456 2.456 0 01-.024-.382.869.869 0 011.737 0c0 .105.009.201.018.29l.018.16a.95.95 0 01.011.142c.057.397.141 1.031.081 2.649a.87.87 0 01-.868.836zM80.083 103.275c-.4 0-.771-.302-.869-.705-.037-.148-.037-.284-.037-.554 0-.328.01-.856.02-1.449l.003-.244a.87.87 0 01.869-.854h.015c.48.008.862.403.854.883l-.004.244c-.009.58-.019 1.097-.019 1.42 0 .105-.001.184.003.233.113.466-.18.891-.646 1.004a.723.723 0 01-.189.022z"
          />
          <path
            fill="#559EBD"
            d="M80.071 107.974a.866.866 0 01-.861-.771c-.065-.579.003-1.646.081-2.879.054-.861.11-1.754.11-2.387a.87.87 0 011.737 0c0 .688-.059 1.608-.114 2.497-.064 1.006-.137 2.147-.089 2.574a.867.867 0 01-.864.966z"
          />
          <path
            fill="#559EBD"
            d="M80.099 113.171a.849.849 0 01-.845-.689c-.115-.602-.054-5.77-.049-5.806a.857.857 0 01.949-.779.868.868 0 01.78.922c-.017.429-.032 4.87.029 5.36a.882.882 0 01-.864.992z"
          />
          <path
            fill="#559EBD"
            d="M80.062 118.323l-.06-.002a.87.87 0 01-.809-.925c.232-3.512.12-4.397.047-4.983a5.538 5.538 0 01-.058-.749.869.869 0 111.737 0c0 .2.021.35.043.53.083.652.208 1.639-.036 5.318a.866.866 0 01-.864.811z"
          />
          <path
            fill="#559EBD"
            d="M80.148 123.309a.906.906 0 01-.853-.646c-.09-.306-.095-.839-.061-2.792.021-1.024.047-2.573-.016-2.887-.177-.444.053-.912.498-1.09.447-.178.962.079 1.141.522.148.374.157 1.078.114 3.485-.016.877-.037 2.076.001 2.319.138.461-.132.916-.591 1.054a.74.74 0 01-.233.035z"
          />
          <path
            fill="#559EBD"
            d="M80.054 128.317a.855.855 0 01-.858-.758c-.039-.333.099-5.708.152-5.991.091-.471.547-.791 1.016-.689a.87.87 0 01.703.934c-.021.36-.172 5.124-.143 5.569a.881.881 0 01-.789.933l-.081.002z"
          />
          <path
            fill="#559EBD"
            d="M80.071 133.069a.868.868 0 01-.861-.771c-.065-.582.003-1.647.081-2.881.054-.86.11-1.739.11-2.386a.869.869 0 011.737 0c0 .688-.058 1.606-.114 2.495-.064 1.007-.137 2.147-.089 2.576a.868.868 0 01-.864.967z"
          />
          <path
            fill="#559EBD"
            d="M80.099 138.266a.85.85 0 01-.845-.69c-.115-.602-.054-5.769-.049-5.805a.868.868 0 011.729.144c-.017.429-.032 4.868.029 5.357a.881.881 0 01-.864.994zM89.757 140.838h-.014a.868.868 0 01-.855-.88c.011-.811-.01-1.789-.057-2.76-.001-.115 0-.18-.007-.25a.866.866 0 01.77-.958.873.873 0 01.956.77c.017.137.018.258.018.396.05.979.07 1.971.058 2.826a.87.87 0 01-.869.856zM89.684 93.133a.866.866 0 01-.86-.989l.018-.252c.045-.479.478-.84.947-.781a.868.868 0 01.781.948l-.008.111a1.9 1.9 0 01-.02.215.867.867 0 01-.858.748z"
          />
          <path
            fill="#559EBD"
            d="M89.912 98.207a.866.866 0 01-.86-.764 3.812 3.812 0 01-.03-.465c-.023-.529-.02-1.437-.016-2.696l.005-2.295a.87.87 0 011.737 0l-.005 2.301c-.004 1.222-.009 2.104.015 2.653.001.136.01.226.018.292a.868.868 0 01-.864.974z"
          />
          <path
            fill="#559EBD"
            d="M89.375 103.217a.86.86 0 01-.852-.719c-.091-.549-.038-5.722.021-6.021a.866.866 0 011.717.225c-.02.534-.096 5.005-.024 5.519a.877.877 0 01-.862.996z"
          />
          <path
            fill="#559EBD"
            d="M89.731 108.27a.854.854 0 01-.854-.729c-.054-.371.093-5.797.166-6.109a.86.86 0 011.04-.651.866.866 0 01.666.959c-.034.448-.184 5.114-.148 5.583a.882.882 0 01-.87.947z"
          />
          <path
            fill="#559EBD"
            d="M89.473 113.085a.912.912 0 01-.865-.693c-.073-.289-.243-3.351-.251-5.642a.87.87 0 01.864-.872h.004a.87.87 0 01.869.865c.009 2.397.182 5.059.214 5.303.114.465-.176.9-.642 1.016a.862.862 0 01-.193.023z"
          />
          <path
            fill="#559EBD"
            d="M89.684 118.225a.868.868 0 01-.866-.943c.064-.74.123-3.274.008-5.476a.87.87 0 01.822-.913c.423-.031.888.343.913.823.119 2.28.055 4.932-.013 5.715a.87.87 0 01-.864.794z"
          />
          <path
            fill="#559EBD"
            d="M89.916 123.296a.867.867 0 01-.861-.771c-.063-.566-.06-1.699-.053-3.576l.004-2.223a.87.87 0 011.737 0l-.004 2.229c-.007 1.688-.01 2.908.042 3.374a.869.869 0 01-.865.967z"
          />
          <path
            fill="#559EBD"
            d="M89.375 128.311a.859.859 0 01-.852-.718c-.104-.627-.018-5.82.021-6.016a.86.86 0 011.017-.689.87.87 0 01.702.908c-.02.531-.096 5.006-.024 5.518a.877.877 0 01-.864.997z"
          />
          <path
            fill="#559EBD"
            d="M89.731 133.365a.854.854 0 01-.854-.729c-.054-.374.093-5.8.166-6.112a.864.864 0 011.043-.649.867.867 0 01.663.96c-.034.447-.184 5.113-.148 5.583a.882.882 0 01-.87.947z"
          />
          <path
            fill="#559EBD"
            d="M89.855 138.255a.912.912 0 01-.864-.693c-.073-.291-.244-3.354-.251-5.643a.868.868 0 01.866-.871h.002c.479 0 .868.387.869.866.008 2.394.181 5.057.213 5.302.116.465-.175.899-.641 1.016a.864.864 0 01-.194.023z"
          />
          <g>
            <path
              fill="#559EBD"
              d="M98.479 140.838h-.015a.868.868 0 01-.854-.882c.011-.715.011-1.637.011-2.824v-.255c0-.479.39-.869.869-.869s.868.391.868.869v.255c0 1.198 0 2.13-.011 2.852a.869.869 0 01-.868.854zM98.461 93.062h-.011c-.475-.006-.856-.345-.856-.82 0-.065.003-.125.01-.182l.001-.107c.013-.213.011-.508.011-1.044a.87.87 0 011.737 0c0 .602-.001.934-.013 1.105 0 .07-.004.137-.011.197a.906.906 0 01-.073.297.806.806 0 01-.14.23.853.853 0 01-.655.324z"
            />
            <path
              fill="#559EBD"
              d="M98.688 98.213a.869.869 0 01-.869-.927c.074-1.106.03-4.26.016-5.297-.007-.459-.007-.459.019-.566a.88.88 0 011.046-.647.871.871 0 01.669.867l.003.322c.026 1.83.052 4.383-.019 5.437a.868.868 0 01-.865.811z"
            />
            <path
              fill="#559EBD"
              d="M98.366 103.266a.87.87 0 01-.865-.971c.061-.52.262-3.698.262-5.688a.868.868 0 011.737 0c0 2.089-.208 5.331-.273 5.893a.868.868 0 01-.861.766z"
            />
            <path
              fill="#559EBD"
              d="M99.304 108.139h-.012a.865.865 0 01-.856-.874c.001-.053.085-5.34.403-5.917a.868.868 0 011.585.693c-.108.631-.243 4.726-.251 5.241a.872.872 0 01-.869.857z"
            />
            <path
              fill="#559EBD"
              d="M98.806 113.303a.871.871 0 01-.857-1.017c.304-1.749.178-2.99.067-4.084-.057-.55-.109-1.068-.097-1.578.014-.48.441-.851.89-.848a.87.87 0 01.848.891c-.01.4.035.846.088 1.36.115 1.146.261 2.571-.083 4.556a.87.87 0 01-.856.72z"
            />
            <path
              fill="#559EBD"
              d="M98.464 118.147c-.474 0-.859-.326-.866-.802a.926.926 0 01.017-.188l-.01-.002c.006-.104.02-.841.02-5.373a.87.87 0 011.739 0c0 2.746 0 4.29-.072 5.162a.966.966 0 01.04.188l-.059.006-.009.081h.07a.964.964 0 01-.21.594.43.43 0 01-.333.262.662.662 0 01-.327.072z"
            />
            <path
              fill="#559EBD"
              d="M98.688 123.306l-.06-.002a.868.868 0 01-.809-.923c.074-1.108.03-4.262.016-5.297-.007-.465-.007-.465.022-.577a.867.867 0 011.053-.633.87.87 0 01.658.863l.003.322c.026 1.829.052 4.382-.019 5.436a.866.866 0 01-.864.811z"
            />
            <path
              fill="#559EBD"
              d="M98.366 128.36a.87.87 0 01-.865-.971c.061-.519.262-3.696.262-5.688a.869.869 0 111.737 0c0 2.092-.208 5.332-.273 5.893a.867.867 0 01-.861.766z"
            />
            <path
              fill="#559EBD"
              d="M99.304 133.233h-.012a.866.866 0 01-.856-.875c.001-.052.085-5.339.403-5.916a.87.87 0 011.585.694c-.108.631-.243 4.724-.251 5.24a.872.872 0 01-.869.857z"
            />
            <path
              fill="#559EBD"
              d="M98.806 138.397a.87.87 0 01-.857-1.017c.304-1.751.178-2.99.067-4.084-.057-.55-.109-1.068-.097-1.578a.87.87 0 01.869-.848h.021c.48.013.859.411.848.891-.01.401.035.845.088 1.359.115 1.146.261 2.572-.083 4.556a.87.87 0 01-.856.721z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M107.913 113.042a.859.859 0 01-.852-.716c-.03-.182-.254-4.692-.028-5.742a.868.868 0 111.699.363c-.149.695.001 4.619.049 5.14a.877.877 0 01-.868.955z"
            />
            <path
              fill="#559EBD"
              d="M108.224 108.072c-.43 0-.8-.313-.859-.747-.02-.15-.131-5.558-.132-5.61a.868.868 0 01.854-.883l.015-.001c.473 0 .859.379.868.854.005.308.11 5.231.122 5.473a.872.872 0 01-.788.912l-.08.002z"
            />
            <path
              fill="#559EBD"
              d="M107.767 102.957l-.032-.001a.867.867 0 01-.836-.898c.045-1.234.029-2.42.019-3.373-.016-1.355-.02-1.92.09-2.264a.876.876 0 011.093-.563c.458.147.71.636.563 1.093-.028.158-.018.983-.009 1.713.011.973.026 2.182-.021 3.457a.868.868 0 01-.867.836z"
            />
            <path
              fill="#559EBD"
              d="M108.966 97.697h-.008a.87.87 0 01-.86-.877c.012-1.265 0-2.291-.011-3.071a.868.868 0 01.855-.882h.013a.87.87 0 01.869.856c.011.793.022 1.829.011 3.112a.869.869 0 01-.869.862zM108.52 140.838h-.019a.87.87 0 01-.851-.887c.033-1.532.068-2.481.109-2.902a.99.99 0 01.058-.393.869.869 0 011.674.44 4.365 4.365 0 01-.004.119c-.035.372-.069 1.305-.101 2.772a.866.866 0 01-.866.851z"
            />
            <path
              fill="#559EBD"
              d="M107.913 138.138a.86.86 0 01-.852-.716c-.03-.184-.254-4.692-.028-5.744a.864.864 0 011.031-.668.87.87 0 01.668 1.032c-.149.695.001 4.62.049 5.14a.876.876 0 01-.868.956z"
            />
            <path
              fill="#559EBD"
              d="M108.224 133.167c-.43 0-.8-.312-.859-.746-.02-.151-.131-5.559-.132-5.611a.87.87 0 01.854-.883l.015-.001c.473 0 .859.379.868.854.005.309.11 5.232.122 5.474a.871.871 0 01-.788.911l-.08.002z"
            />
            <path
              fill="#559EBD"
              d="M107.938 128.101l-.032-.001a.867.867 0 01-.835-.9c.044-1.232.028-2.419.018-3.371-.016-1.354-.02-1.92.09-2.264a.877.877 0 011.093-.563.87.87 0 01.563 1.094c-.027.158-.018.983-.009 1.712.011.972.026 2.181-.021 3.457a.87.87 0 01-.867.836z"
            />
            <path
              fill="#559EBD"
              d="M108.964 122.786h-.008a.868.868 0 01-.86-.877c.008-.965.003-1.789 0-2.475-.008-1.255-.014-2.011.066-2.474a.868.868 0 011.713.29c-.054.314-.049 1.135-.043 2.174.004.692.009 1.524.001 2.501a.871.871 0 01-.869.861z"
            />
            <path
              fill="#559EBD"
              d="M108.519 118.055c-.416 0-.795-.331-.878-.752-.072-.373.078-5.284.139-5.611a.869.869 0 011.709.318c-.06.432-.146 4.645-.128 5.065.092.471-.223.874-.693.966a.852.852 0 01-.149.014z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M117.484 140.838h-.018a.87.87 0 01-.851-.887c.021-1.1.07-2.246.117-2.853.018-.155.031-.235.044-.315a.868.868 0 011.715.28l-.031.206a60.737 60.737 0 00-.107 2.718.87.87 0 01-.869.851zM117.491 98.009a.87.87 0 01-.869-.868v-.162c.012-.279.012-.509.012-.718a.87.87 0 011.737 0c0 .231 0 .487-.013.757l.001.123a.868.868 0 01-.868.868z"
            />
            <path
              fill="#559EBD"
              d="M117.357 102.936a.856.856 0 01-.849-.704c-.038-.216-.062-.877-.115-2.887a97.179 97.179 0 00-.076-2.271.868.868 0 011.686-.405c.051.166.061.197.127 2.63.027 1.025.065 2.429.094 2.649a.882.882 0 01-.732.979 1.275 1.275 0 01-.135.009z"
            />
            <path
              fill="#559EBD"
              d="M118.411 107.789h-.007a.853.853 0 01-.861-.851c.005-.238.021-1.171.021-4.836a.869.869 0 111.737 0c0 3.69-.018 4.629-.021 4.815a.883.883 0 01-.869.872z"
            />
            <path
              fill="#559EBD"
              d="M117.698 112.897a.868.868 0 01-.862-.771c-.056-.494-.14-4.84-.076-5.221a.858.858 0 011.001-.713.868.868 0 01.721.948c-.022.424.021 4.261.081 4.789a.869.869 0 01-.865.968z"
            />
            <path
              fill="#559EBD"
              d="M117.923 118.157a.869.869 0 01-.869-.852c-.021-1.147.037-4.672.185-5.612a.872.872 0 01.992-.724.87.87 0 01.725.994c-.118.749-.187 4.113-.164 5.308a.87.87 0 01-.852.886h-.017z"
            />
            <path
              fill="#559EBD"
              d="M117.495 123.103h-.016a.871.871 0 01-.854-.884c.067-3.79.06-3.945.021-4.692l-.027-.568a.87.87 0 01.832-.904c.458-.062.885.351.903.832l.026.553c.041.797.05.962-.019 4.809a.866.866 0 01-.866.854z"
            />
            <path
              fill="#559EBD"
              d="M117.357 128.031a.857.857 0 01-.849-.705c-.038-.216-.062-.876-.115-2.887a97.597 97.597 0 00-.076-2.271.868.868 0 011.686-.406c.051.167.061.198.127 2.63.027 1.025.065 2.429.094 2.65a.883.883 0 01-.867.989z"
            />
            <path
              fill="#559EBD"
              d="M117.012 132.762h-.009a.853.853 0 01-.859-.851c.004-.238.022-1.168.022-4.837a.87.87 0 011.737 0c0 3.696-.019 4.634-.022 4.818a.886.886 0 01-.869.87z"
            />
            <path
              fill="#559EBD"
              d="M117.698 137.992a.868.868 0 01-.862-.77c-.056-.495-.14-4.84-.076-5.222.08-.473.519-.809 1.001-.712a.868.868 0 01.721.947c-.022.424.021 4.262.081 4.789a.867.867 0 01-.865.968z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M127.155 140.838h-.009a.867.867 0 01-.86-.877l.008-.707c.01-.904.019-1.758.027-2.153v-.201a.869.869 0 011.737 0v.222a246.88 246.88 0 00-.027 2.15l-.008.707a.868.868 0 01-.868.859z"
            />
            <path
              fill="#559EBD"
              d="M127.067 138.385a.86.86 0 01-.842-.651 1.95 1.95 0 01-.037-.371l-.011-.9v-.026a.87.87 0 111.738-.004v.03l.008.835a.885.885 0 01-.642 1.063 1.047 1.047 0 01-.214.024z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M85.054 140.838a.868.868 0 01-.863-.774l-.032-.29a4.896 4.896 0 01-.03-.511.868.868 0 011.737 0c0 .122.01.227.019.329l.033.284a.866.866 0 01-.864.962zM85.144 100.696a.868.868 0 01-.762-.45 1.17 1.17 0 01-.112-.354 1.738 1.738 0 01-.017-.14c-.015-.099-.015-.186-.015-.261-.016-.353-.006-.997.009-1.712l.015-.995a.872.872 0 01.868-.865h.005a.863.863 0 01.864.862l-.016 1.028a33.6 33.6 0 00-.009 1.645.663.663 0 01.013.172.866.866 0 01-.843 1.07z"
            />
            <path
              fill="#559EBD"
              d="M85 105.731a.855.855 0 01-.858-.757c-.039-.333.098-5.708.152-5.991a.862.862 0 011.017-.689.868.868 0 01.701.935c-.02.36-.171 5.122-.142 5.567a.882.882 0 01-.79.933 2.083 2.083 0 01-.08.002z"
            />
            <path
              fill="#559EBD"
              d="M84.604 110.483a.867.867 0 01-.861-.772c-.064-.579.004-1.642.082-2.872.054-.865.11-1.759.11-2.394a.869.869 0 011.737 0c0 .69-.059 1.611-.115 2.502-.063 1.005-.137 2.143-.089 2.571a.868.868 0 01-.864.965z"
            />
            <path
              fill="#559EBD"
              d="M84.712 115.681a.85.85 0 01-.845-.693c-.112-.598-.052-5.773-.048-5.809a.867.867 0 011.729.152c-.017.419-.031 4.875.029 5.357a.883.883 0 01-.865.993z"
            />
            <path
              fill="#559EBD"
              d="M85.007 120.832a.869.869 0 01-.869-.927c.232-3.512.122-4.397.047-4.983a5.532 5.532 0 01-.057-.75.87.87 0 011.737 0c0 .203.021.351.043.532.083.653.207 1.639-.037 5.316a.867.867 0 01-.864.812z"
            />
            <path
              fill="#559EBD"
              d="M85.167 125.819a.906.906 0 01-.853-.647c-.091-.305-.094-.838-.059-2.797.018-1.023.045-2.57-.017-2.882-.176-.445.054-.912.499-1.089.446-.176.963.079 1.141.525.147.371.156 1.073.113 3.478-.017.878-.037 2.08.001 2.324.137.461-.132.917-.592 1.054a.783.783 0 01-.233.034z"
            />
            <path
              fill="#559EBD"
              d="M85 130.826a.855.855 0 01-.858-.758c-.039-.333.098-5.707.152-5.989a.863.863 0 011.017-.69.869.869 0 01.701.935c-.02.36-.171 5.121-.142 5.567a.88.88 0 01-.87.935z"
            />
            <path
              fill="#559EBD"
              d="M84.604 135.577a.867.867 0 01-.861-.772c-.064-.579.004-1.641.082-2.871.054-.864.11-1.758.11-2.394a.87.87 0 011.737 0c0 .689-.059 1.612-.115 2.503-.063 1.004-.137 2.142-.089 2.569a.868.868 0 01-.864.965z"
            />
            <path
              fill="#559EBD"
              d="M84.712 140.776a.851.851 0 01-.845-.693c-.112-.599-.052-5.774-.048-5.81a.867.867 0 011.729.153c-.017.419-.031 4.874.029 5.356a.884.884 0 01-.865.994z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M94.423 140.838a.867.867 0 01-.862-.784l-.023-.335a9.074 9.074 0 01-.008-.156c-.004-.064-.009-.128-.009-.195a.869.869 0 111.737 0c.008.136.013.198.013.267l.018.252a.867.867 0 01-.866.951zM94.199 90.539a.87.87 0 01-.867-.804l-.031-.343c-.012-.145-.024-.33-.034-.551a.865.865 0 01.852-1.001c.468 0 .862.371.878.838.01.234.024.432.035.581l.025.268a.868.868 0 01-.858 1.012z"
            />
            <path
              fill="#559EBD"
              d="M94.382 95.639a.868.868 0 01-.866-.941c.063-.75.122-3.291.009-5.477a.868.868 0 01.821-.913c.43-.025.887.343.913.822.118 2.265.056 4.924-.013 5.714a.868.868 0 01-.864.795z"
            />
            <path
              fill="#559EBD"
              d="M94.688 100.711a.867.867 0 01-.861-.772c-.064-.568-.061-1.707-.053-3.595l.004-2.202a.87.87 0 011.737 0l-.004 2.208c-.007 1.7-.012 2.929.041 3.396a.868.868 0 01-.864.965z"
            />
            <path
              fill="#559EBD"
              d="M94.075 105.725a.856.856 0 01-.851-.716c-.1-.582-.04-5.768.025-6.048a.865.865 0 011.042-.651.87.87 0 01.671.906c-.018.444-.1 4.975-.025 5.512a.876.876 0 01-.862.997z"
            />
            <path
              fill="#559EBD"
              d="M94.017 110.78c-.424 0-.79-.3-.853-.73-.055-.373.093-5.8.165-6.112a.863.863 0 011.043-.648.866.866 0 01.663.958c-.032.449-.184 5.115-.148 5.584a.882.882 0 01-.87.948z"
            />
            <path
              fill="#559EBD"
              d="M94.111 115.595a.914.914 0 01-.866-.693c-.072-.291-.243-3.354-.25-5.643a.868.868 0 01.867-.871h.002c.479 0 .867.387.868.867.008 2.393.181 5.057.213 5.301.115.465-.175.9-.642 1.016a.84.84 0 01-.192.023z"
            />
            <path
              fill="#559EBD"
              d="M94.382 120.734a.868.868 0 01-.866-.942c.063-.749.122-3.29.009-5.477a.867.867 0 01.821-.912c.43-.036.887.343.913.822.118 2.264.056 4.923-.013 5.714a.867.867 0 01-.864.795z"
            />
            <path
              fill="#559EBD"
              d="M94.688 125.806a.866.866 0 01-.861-.772c-.064-.567-.061-1.706-.053-3.595l.004-2.202a.868.868 0 011.737 0l-.004 2.208c-.007 1.701-.012 2.93.041 3.397a.866.866 0 01-.864.964z"
            />
            <path
              fill="#559EBD"
              d="M94.075 130.82a.856.856 0 01-.851-.716c-.083-.491-.06-5.698.026-6.056a.877.877 0 011.048-.643.87.87 0 01.664.905c-.023.571-.097 4.996-.025 5.511a.877.877 0 01-.862.999z"
            />
            <path
              fill="#559EBD"
              d="M94.017 135.874c-.424 0-.79-.3-.853-.729-.055-.371.093-5.797.165-6.11a.861.861 0 011.041-.651c.44.101.725.521.665.959-.032.448-.184 5.115-.148 5.583s-.305.893-.77.943c-.033.002-.067.005-.1.005z"
            />
            <path
              fill="#559EBD"
              d="M94.223 140.765a.914.914 0 01-.865-.693c-.072-.291-.243-3.354-.25-5.643a.87.87 0 01.866-.872h.002a.87.87 0 01.869.867c.008 2.393.181 5.057.213 5.302.115.465-.175.899-.642 1.016a.855.855 0 01-.193.023z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M103.691 140.838a.867.867 0 01-.866-.962c.008-.073.006-.148.006-.231v-.312a.87.87 0 011.737 0v.312c0 .151-.002.284-.017.419a.863.863 0 01-.86.774zM103.569 95.67a.87.87 0 01-.869-.869c0-.041 0-.187.015-.412l.021-.566c.015-.366.033-.824.046-1.338.015-.479.402-.843.893-.846a.87.87 0 01.845.893c-.015.522-.033.987-.047 1.36l-.021.576c-.013.196-.013.305-.013.333a.871.871 0 01-.87.869z"
            />
            <path
              fill="#559EBD"
              d="M104.129 100.756l-.052-.001a.868.868 0 01-.816-.918c.021-.512.096-4.943-.029-5.571a.869.869 0 011.704-.338c.191.96.063 5.968.061 6.011a.872.872 0 01-.868.817z"
            />
            <path
              fill="#559EBD"
              d="M103.687 105.761a.868.868 0 01-.869-.857l-.003-.17c-.002-.069-.004-.069.006-.276.014-.339.062-1.411.191-5.355a.884.884 0 01.896-.841.873.873 0 01.841.897c-.131 3.958-.18 5.035-.194 5.375l-.004.129.004.22a.868.868 0 01-.858.879l-.01-.001z"
            />
            <path
              fill="#559EBD"
              d="M103.666 110.667a.867.867 0 01-.866-.82c-.045-.81.134-5.628.137-5.66a.885.885 0 01.939-.791.868.868 0 01.792.925c-.02.359-.168 4.795-.133 5.429a.871.871 0 01-.819.917h-.05z"
            />
            <path
              fill="#559EBD"
              d="M103.229 115.677a.863.863 0 01-.864-.802c-.003-.037-.056-5.392-.017-5.696a.858.858 0 01.968-.756.868.868 0 01.761.922c-.014.411.005 5.107.021 5.411a.871.871 0 01-.869.921z"
            />
            <path
              fill="#559EBD"
              d="M103.564 120.764l-.02-.001a.867.867 0 01-.85-.883l.01-.267c.032-.738.126-2.986.126-5.375a.87.87 0 011.737 0 132 132 0 01-.127 5.449l-.009.227a.868.868 0 01-.867.85z"
            />
            <path
              fill="#559EBD"
              d="M104.129 125.852l-.052-.002a.867.867 0 01-.816-.918c.021-.511.096-4.945-.029-5.571a.869.869 0 011.704-.338c.191.96.063 5.968.061 6.011a.873.873 0 01-.868.818z"
            />
            <path
              fill="#559EBD"
              d="M103.687 130.855a.869.869 0 01-.869-.859l-.003-.169c-.002-.068-.004-.068.006-.274.014-.337.062-1.409.191-5.356.016-.479.442-.896.896-.839a.87.87 0 01.841.896c-.131 3.96-.18 5.036-.194 5.375l-.004.127.004.221a.869.869 0 01-.858.879l-.01-.001z"
            />
            <path
              fill="#559EBD"
              d="M103.666 135.763a.868.868 0 01-.866-.821c-.045-.811.135-5.628.137-5.659a.879.879 0 01.939-.791.869.869 0 01.792.925c-.02.356-.168 4.794-.133 5.429a.873.873 0 01-.819.917h-.05z"
            />
            <path
              fill="#559EBD"
              d="M103.229 140.772a.863.863 0 01-.864-.802c-.003-.037-.056-5.392-.017-5.697a.857.857 0 01.968-.755.868.868 0 01.761.921c-.014.412.005 5.108.021 5.411a.873.873 0 01-.869.922z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M112.816 140.797c-.479 0-.868-.348-.868-.827v-.579a.868.868 0 011.737 0v.498c.001.478-.388.908-.869.908zM113.078 100.72a.87.87 0 01-.865-.962l.021-.365c.039-1.015.018-2.872.005-4.101l-.007-.804a.87.87 0 011.737 0l.007.785c.013 1.245.034 3.127-.008 4.216l-.01.194c-.005.092-.009.178-.017.261a.867.867 0 01-.863.776z"
            />
            <path
              fill="#559EBD"
              d="M112.688 105.774a.868.868 0 01-.864-.97c.061-.518.26-3.691.26-5.689a.868.868 0 011.737 0c0 2.097-.206 5.335-.271 5.893a.868.868 0 01-.862.766z"
            />
            <path
              fill="#559EBD"
              d="M113.214 110.648h-.012a.867.867 0 01-.857-.875c.001-.052.091-5.347.402-5.914a.869.869 0 011.586.691c-.104.62-.243 4.743-.251 5.24a.87.87 0 01-.868.858z"
            />
            <path
              fill="#559EBD"
              d="M112.797 115.812a.87.87 0 01-.858-1.017c.305-1.75.178-2.989.067-4.083-.056-.55-.109-1.068-.097-1.579a.869.869 0 01.868-.847h.022a.87.87 0 01.847.89c-.01.401.035.846.088 1.36.116 1.146.261 2.572-.083 4.555a.87.87 0 01-.854.721z"
            />
            <path
              fill="#559EBD"
              d="M112.785 120.656c-.474 0-.859-.326-.865-.801a.798.798 0 01.017-.188l-.011-.002c.006-.105.021-.841.021-5.373a.87.87 0 011.737 0c0 2.745 0 4.29-.072 5.163a.88.88 0 01.04.186l-.058.006-.01.082h.07a.966.966 0 01-.211.595.429.429 0 01-.331.261.608.608 0 01-.327.071z"
            />
            <path
              fill="#559EBD"
              d="M113.083 125.816l-.059-.002a.868.868 0 01-.809-.924c.074-1.106.029-4.261.016-5.297-.007-.46-.007-.46.019-.567a.878.878 0 011.045-.646.867.867 0 01.669.866l.004.323c.026 1.829.052 4.382-.019 5.437a.869.869 0 01-.866.81z"
            />
            <path
              fill="#559EBD"
              d="M112.688 130.87a.87.87 0 01-.864-.971c.061-.517.26-3.69.26-5.688a.869.869 0 111.737 0c0 2.096-.206 5.335-.271 5.893a.868.868 0 01-.862.766z"
            />
            <path
              fill="#559EBD"
              d="M113.214 135.743h-.012a.866.866 0 01-.857-.875c.001-.052.091-5.349.403-5.914a.865.865 0 011.179-.34.866.866 0 01.405 1.031c-.104.622-.242 4.743-.25 5.241a.87.87 0 01-.868.857z"
            />
            <path
              fill="#559EBD"
              d="M112.797 140.907a.871.871 0 01-.858-1.017c.305-1.75.178-2.99.067-4.084-.056-.55-.109-1.069-.097-1.58.014-.479.451-.849.891-.847a.87.87 0 01.847.89c-.01.402.035.847.088 1.36.116 1.146.261 2.573-.083 4.557a.872.872 0 01-.855.721z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M122.663 140.838a.869.869 0 01-.867-.945c.013-.139.026-.252.038-.353a1.306 1.306 0 01.032-.271.881.881 0 011.021-.686c.47.093.776.55.685 1.02 0 .036-.009.111-.013.146l-.032.297a.87.87 0 01-.864.792zM122.923 110.305h-.011a.854.854 0 01-.858-.852l.001-.057c.002-.102.012-.44.012-1.38 0-.479.39-.885.868-.885.479 0 .869.37.869.851 0 1.005-.01 1.354-.013 1.459a.883.883 0 01-.868.864z"
            />
            <path
              fill="#559EBD"
              d="M122.293 115.407a.866.866 0 01-.861-.771c-.058-.494-.142-4.84-.076-5.222a.857.857 0 01.999-.712c.456.075.77.494.721.948-.021.424.021 4.262.081 4.789a.866.866 0 01-.864.968z"
            />
            <path
              fill="#559EBD"
              d="M122.391 120.667a.868.868 0 01-.868-.853c-.021-1.149.037-4.677.185-5.612a.874.874 0 01.994-.723.871.871 0 01.723.994c-.117.744-.187 4.109-.164 5.308a.87.87 0 01-.852.886h-.018z"
            />
            <path
              fill="#559EBD"
              d="M122.077 125.612h-.016a.871.871 0 01-.854-.884c.066-3.789.059-3.945.021-4.692l-.027-.568a.87.87 0 01.832-.904c.454-.066.884.353.903.832l.026.553c.04.797.049.962-.019 4.81a.866.866 0 01-.866.853z"
            />
            <path
              fill="#559EBD"
              d="M122.285 130.541a.856.856 0 01-.849-.704c-.038-.216-.063-.877-.118-2.888-.024-.911-.055-2.04-.075-2.271a.866.866 0 01.601-.98.867.867 0 011.085.574c.051.167.061.198.128 2.631.028 1.026.066 2.43.093 2.65a.879.879 0 01-.865.988z"
            />
            <path
              fill="#559EBD"
              d="M122.925 135.394h-.008a.854.854 0 01-.861-.851c.005-.235.022-1.167.022-4.836a.869.869 0 111.737 0c0 3.694-.019 4.631-.022 4.816-.009.473-.396.871-.868.871z"
            />
            <path
              fill="#559EBD"
              d="M122.293 140.502a.866.866 0 01-.861-.771c-.058-.494-.142-4.842-.076-5.222a.866.866 0 011-.712.87.87 0 01.72.949c-.021.423.021 4.261.081 4.788a.865.865 0 01-.864.968z"
            />
          </g>
        </g>
        <g>
          <path
            fill="#559EBD"
            d="M121.012 140.529a.87.87 0 01-.033-1.737c.018-.001 2.141-.026 2.325-.008a.87.87 0 01.776.952.88.88 0 01-.92.778c-.239-.005-1.995.011-2.126.014l-.022.001zM121.032 110.434a.866.866 0 01-.864-.815.864.864 0 01.813-.919c.762-.049 1.596-.051 1.971-.052l.163-.001c.46.002.866.346.898.812a.866.866 0 01-.771.92c-.019.001-.12.006-.285.007-.358 0-1.146.002-1.87.046l-.055.002zM121.009 115.435a.87.87 0 01-.02-1.738c.02 0 2.134-.024 2.315-.008a.87.87 0 01.776.953.88.88 0 01-.92.778c-.233-.008-2.025.012-2.133.014l-.018.001zM120.938 120.479a.87.87 0 01-.868-.825.866.866 0 01.818-.911c.018-.003 2-.084 2.207-.059a.87.87 0 01-.134 1.73c-.221-.009-1.869.057-1.979.063l-.044.002zM120.636 125.483a.87.87 0 01-.053-1.735c1.058-.067 2.299-.027 2.541.004a.87.87 0 01-.228 1.723c-.175-.02-1.24-.052-2.205.005l-.055.003zM123.607 130.502l-.036-.001c-.226-.009-1.549-.032-1.835-.036a.868.868 0 01.01-1.737h.01c.293.004 1.653.029 1.884.038a.868.868 0 01-.033 1.736zM121.032 135.529a.866.866 0 01-.864-.815.866.866 0 01.813-.92 34.381 34.381 0 011.97-.052l.163-.001c.468-.033.867.346.899.811a.867.867 0 01-.771.921c-.019.001-.12.006-.285.007-.358.001-1.148.003-1.87.047l-.055.002zM101.976 140.528l-.322-.001a.87.87 0 01-.858-.881c.006-.479.394-.832.88-.856.255.003 1.736-.002 2.017-.01.461-.034.882.357.897.837a.865.865 0 01-.837.897c-.229.009-1.229.014-1.777.014zM101.921 95.413a.867.867 0 01-.083-1.732c.146-.015 1.506-.121 2.154-.128.474-.023.871.381.877.86a.87.87 0 01-.861.877c-.549.004-1.822.102-2.002.119a.806.806 0 01-.085.004zM103.956 100.405c-.028 0-.054-.002-.081-.004-.354-.033-1.773-.056-2.166-.064h-.005a.869.869 0 01-.006-1.737c.324.004 1.872.029 2.336.071a.868.868 0 01-.078 1.734zM104.937 105.411l-.034-.001c-.143-.006-1.985-.041-2.179-.041h-.009a.867.867 0 01-.01-1.737c.126-.035 2.116.037 2.266.043a.866.866 0 01.833.901.87.87 0 01-.867.835zM102.144 110.417a.87.87 0 01-.018-1.738c.022 0 2.268-.031 2.46-.004a.869.869 0 01.717.998.86.86 0 01-.912.728c-.261-.011-2.15.013-2.23.016h-.017zM101.976 115.434l-.322-.001a.87.87 0 01.011-1.738c.067.012.181.002.345.002.531 0 1.467-.006 1.683-.012.444-.06.881.356.897.837a.865.865 0 01-.837.897 88.4 88.4 0 01-1.777.015zM101.921 120.508a.867.867 0 01-.083-1.732c.169-.017 1.51-.123 2.154-.129a.877.877 0 01.877.861.87.87 0 01-.861.876c-.574.006-1.867.107-2.002.12a.806.806 0 01-.085.004zM103.956 125.498a37.44 37.44 0 00-2.25-.067h-.002a.869.869 0 01-.003-1.737c.325-.018 1.887.031 2.333.071a.868.868 0 01-.078 1.733zM104.937 130.504l-.034-.001c-.146-.005-2.045-.04-2.189-.04a.87.87 0 010-1.737c.148 0 2.109.037 2.258.043a.867.867 0 01-.035 1.735zM102.144 135.513a.87.87 0 01-.018-1.738c.021 0 2.266-.034 2.46-.006a.869.869 0 01-.194 1.726c-.257-.012-2.151.017-2.231.018h-.017z"
          />
          <g>
            <path
              fill="#559EBD"
              d="M113.231 140.553a.934.934 0 01-.188-.021c-.176-.028-.946-.048-1.559-.037h-.016a.868.868 0 01-.014-1.738c.156-.003 1.534-.021 1.973.08a.868.868 0 01-.196 1.716zM111.55 100.419a.869.869 0 01-.061-1.735 43.854 43.854 0 011.718-.1c.516.037.878.368.89.85a.87.87 0 01-.85.888c-.387.009-1.076.055-1.633.095l-.064.002zM114.125 105.425a1.07 1.07 0 01-.08-.003c-.548-.051-.631-.051-1.873-.065l-.256-.003a.87.87 0 01.012-1.737h.011l.257.003c1.3.016 1.406.017 2.008.072a.87.87 0 01-.079 1.733zM111.297 110.44a.866.866 0 01-.867-.839.864.864 0 01.839-.896c2.305-.078 2.344-.068 2.452-.056a.872.872 0 01.723.995c-.071.444-.49.75-.909.731-.127.018-.895.021-2.207.063-.012.002-.021.002-.031.002zM113.231 115.458a.932.932 0 01-.188-.02c-.176-.03-.953-.054-1.559-.039h-.016a.868.868 0 01-.014-1.738c.061.001 1.521-.024 1.973.082a.865.865 0 01.648 1.042.866.866 0 01-.844.673zM113.431 120.45l-.064-.002c-.185-.007-1.236-.007-1.446-.007l-.031-1.737a31.25 31.25 0 011.625.014.867.867 0 01-.084 1.732zM111.55 125.514a.87.87 0 01-.061-1.736 43.854 43.854 0 011.718-.1c.516.002.878.369.89.85a.87.87 0 01-.85.888 44.155 44.155 0 00-1.697.098zM114.125 130.52a1.07 1.07 0 01-.08-.003c-.534-.051-.626-.051-1.79-.064l-.339-.004a.868.868 0 01.012-1.737h.011l.336.004c1.256.015 1.353.02 1.929.071a.869.869 0 01-.079 1.733zM111.297 135.534a.868.868 0 01-.027-1.737c2.302-.073 2.342-.067 2.451-.052a.871.871 0 01.723.994c-.071.446-.49.746-.909.732h-.013c-.189 0-.921.021-2.195.063h-.03z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M92.91 140.549a.866.866 0 01-.864-.813.866.866 0 01.811-.921c.443-.029 1.332-.06 1.921-.055a.87.87 0 01-.014 1.738l-.231-.002c-.521 0-1.193.027-1.563.051l-.06.002zM92.91 90.357a.866.866 0 01-.051-1.733c.459-.03 1.342-.061 1.919-.054a.87.87 0 01-.014 1.738c-.059-.006-.146-.003-.226-.003-.522 0-1.199.029-1.572.051l-.056.001zM93.091 95.366a.868.868 0 01-.043-1.736c.019-.001 1.993-.068 2.32.002a.868.868 0 01-.301 1.71c-.265-.017-1.724.012-1.93.023l-.046.001zM94.976 100.391a.927.927 0 01-.207-.024c-.167-.024-.832-.018-1.6-.009l-.708.008h-.009a.869.869 0 01-.008-1.737l.706-.007c1.315-.013 1.752-.019 2.055.063a.868.868 0 01-.229 1.706zM92.991 105.425a.87.87 0 01-.073-1.735c.021-.003 2.255-.125 2.595-.047a.87.87 0 01-.293 1.711c-.291-.019-1.979.056-2.167.068a.66.66 0 01-.062.003zM94.767 110.45l-.063-.003a68.54 68.54 0 00-1.786-.081.867.867 0 01-.834-.9c.017-.48.436-.878.9-.835.938.035 1.553.063 1.842.084a.869.869 0 01-.059 1.735zM92.91 115.453a.868.868 0 01-.051-1.734 29.688 29.688 0 011.919-.054.87.87 0 01-.014 1.738l-.226-.002c-.522 0-1.199.027-1.572.051l-.056.001zM93.091 120.459a.868.868 0 01-.043-1.735c.021.001 2.001-.067 2.326.005a.867.867 0 01.658 1.037.871.871 0 01-.968.671c-.276-.017-1.735.012-1.927.021l-.046.001zM94.976 125.486a.874.874 0 01-.207-.025c-.166-.023-.822-.019-1.579-.009l-.729.007h-.009a.87.87 0 01-.008-1.737l.727-.007c1.297-.015 1.732-.018 2.034.064a.87.87 0 01-.229 1.707zM92.988 130.52a.87.87 0 01-.062-1.736c.021-.001 2.244-.12 2.579-.047a.865.865 0 01.671 1.027.87.87 0 01-.953.684 97.596 97.596 0 00-2.235.072zM94.767 135.544l-.063-.002c-.281-.02-.877-.047-1.786-.082a.867.867 0 01-.834-.9c.017-.48.436-.889.9-.835.938.035 1.553.064 1.842.085a.868.868 0 01-.059 1.734z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M85.435 140.557a68.966 68.966 0 00-1.954-.069.869.869 0 01-.856-.882c.01-.479.445-.85.883-.855.148.002 1.67.045 1.997.073a.867.867 0 01-.07 1.733zM83.394 100.385a.869.869 0 01-.034-1.736c.016-.001 1.661-.049 1.914-.021a.867.867 0 01-.156 1.729c-.207.001-1.507.021-1.688.027l-.036.001zM83.505 105.445a.868.868 0 01-.056-1.736c1.347-.091 1.582-.098 1.863-.107l.189-.005c.508-.048.883.354.899.835a.865.865 0 01-.834.9l-.201.006c-.271.009-.5.017-1.803.104l-.057.003zM85.393 110.425l-.032-.001c-.402-.014-1.602-.027-2.006-.031a.87.87 0 01-.859-.879c.006-.48.353-.842.88-.859.411.005 1.638.019 2.049.034a.868.868 0 01-.032 1.736zM85.435 115.461a78.012 78.012 0 00-1.962-.068.871.871 0 01-.849-.889c.013-.48.462-.854.89-.849.147.004 1.664.046 1.99.072a.867.867 0 01-.069 1.734zM85.594 120.475a.916.916 0 01-.187-.021c-.293-.033-1.694-.045-1.932-.034-.435.054-.881-.353-.9-.833a.867.867 0 01.833-.902c.02-.003 2.045-.032 2.446.092a.87.87 0 01-.26 1.698zM83.394 125.48a.867.867 0 01-.866-.833.867.867 0 01.832-.903c.016-.002 1.661-.048 1.914-.022a.868.868 0 01-.157 1.729c-.199.005-1.505.021-1.687.028l-.036.001zM83.505 130.54a.867.867 0 01-.865-.812.867.867 0 01.809-.924c1.329-.09 1.575-.098 1.851-.106l.2-.006c.453-.048.884.353.901.831a.866.866 0 01-.831.903l-.212.008c-.267.009-.506.017-1.795.103l-.058.003zM85.393 135.519l-.029-.001c-.403-.013-1.604-.026-2.009-.03a.869.869 0 01-.859-.879c.006-.48.353-.898.88-.858.411.004 1.636.018 2.047.031a.87.87 0 01.839.898.872.872 0 01-.869.839z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M81.19 102.889l-.054-.001c-.133-.005-.895-.01-1.571-.014l-.764-.005a.868.868 0 01-.861-.876c.003-.479.432-.827.874-.861l.762.006c.748.004 1.593.011 1.676.017a.869.869 0 01-.062 1.734zM78.357 107.973a.868.868 0 01-.085-1.733 34.38 34.38 0 012.449-.152h.014a.87.87 0 01.012 1.737 32.94 32.94 0 00-2.303.144c-.029.002-.057.004-.087.004zM78.546 112.925a.869.869 0 01-.028-1.738c.148-.004 2.13-.015 2.277-.015a.87.87 0 010 1.737c-.143 0-2.066.011-2.223.015l-.026.001zM81.092 117.967c-.034 0-.067-.003-.102-.006-.2-.02-1.095-.036-1.697-.049l-.311-.005a.872.872 0 01-.851-.887c.01-.479.414-.894.887-.851l.309.006c1.117.023 1.681.038 1.867.06a.868.868 0 01.758.966.868.868 0 01-.86.766zM81.143 122.979h-.026c-.717-.022-.88-.026-1.085-.029l-.727-.017a.873.873 0 01-.845-.893c.014-.479.38-.874.893-.845l.712.017c.209.004.375.007 1.105.029a.872.872 0 01.842.896.872.872 0 01-.869.842zM81.19 127.984l-.054-.001c-.133-.005-.895-.01-1.571-.014l-.764-.006a.868.868 0 01.007-1.737h.006l.762.007c.748.004 1.593.011 1.676.017a.869.869 0 01-.062 1.734zM78.357 133.067a.868.868 0 01-.087-1.732 33.05 33.05 0 012.453-.153h.012a.87.87 0 01.01 1.737c-.619.008-1.676.081-2.298.145l-.09.003zM78.545 138.02a.87.87 0 01-.019-1.738c.147-.003 2.13-.022 2.275-.015a.87.87 0 01.863.875.887.887 0 01-.876.862 166.003 166.003 0 00-2.243.016z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M125.598 138.037a.867.867 0 01-.059-1.735 22.363 22.363 0 011.508-.049c.479 0 .938.389.938.869 0 .479-.319.868-.799.868h-.14a20.557 20.557 0 00-1.448.047z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M116.418 97.882a.866.866 0 01-.866-.821.87.87 0 01.82-.915c.797-.043 1.812-.054 2.007-.037a.866.866 0 01.794.936.884.884 0 01-.924.796 30.572 30.572 0 00-1.784.041h-.047zM118.04 102.91a.965.965 0 01-.132-.01 59.078 59.078 0 00-1.908-.052.869.869 0 01.008-1.737h.007c.019 0 1.914.021 2.196.078a.87.87 0 01-.171 1.721zM116.65 107.915a.87.87 0 01-.869-.836.866.866 0 01.834-.9c.016-.001 2.125-.026 2.256-.032a.87.87 0 01.821.915c-.025.473-.38.847-.89.821h-.012c-.239 0-1.963.026-2.109.031l-.031.001zM118.079 112.992a.892.892 0 01-.203-.024c-.21-.036-1.26-.109-1.556-.126a.868.868 0 01-.82-.914c.025-.479.434-.862.913-.821.016.001 1.572.087 1.902.182a.87.87 0 01.6 1.072.87.87 0 01-.836.631zM116.017 117.961a.87.87 0 01-.022-1.738l.438-.01c1.092-.027 1.408-.034 1.789-.039.52.001.872.38.878.859a.869.869 0 01-.86.878c-.375.004-.688.012-1.765.038l-.437.011-.021.001zM116.418 122.978a.869.869 0 01-.047-1.736c.789-.043 1.808-.058 2.008-.037a.866.866 0 01.794.936.863.863 0 01-.924.796 31.196 31.196 0 00-1.783.041h-.048zM118.04 128.005a.965.965 0 01-.132-.01 59.804 59.804 0 00-1.9-.051.87.87 0 010-1.737c.018 0 1.917.02 2.203.078a.87.87 0 01-.171 1.72zM116.648 133.01a.87.87 0 01-.869-.842.87.87 0 01.842-.896c.15-.005 2.174-.049 2.234-.031a.869.869 0 01-.031 1.736h-.019c-.189 0-1.992.026-2.13.032l-.027.001zM118.079 138.087a.95.95 0 01-.203-.023c-.21-.036-1.26-.111-1.556-.126a.869.869 0 01-.82-.915c.025-.478.434-.872.913-.82.016.001 1.572.087 1.902.181a.87.87 0 01.6 1.073.87.87 0 01-.836.63z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M106.907 97.923a.867.867 0 01-.084-1.732c.147-.015 1.508-.124 2.153-.129h.008a.87.87 0 01.008 1.737c-.545.004-1.819.104-1.999.119a.638.638 0 01-.086.005zM108.868 102.913l-.081-.003c-.358-.034-1.772-.054-2.169-.065h-.002a.868.868 0 01-.002-1.737c.31.006 1.885.031 2.332.072a.868.868 0 01-.078 1.733zM109.436 107.919l-.033-.001c-.146-.005-2.046-.041-2.19-.041a.87.87 0 010-1.737c.149 0 2.111.038 2.258.043a.87.87 0 01.834.901.872.872 0 01-.869.835zM106.725 112.927a.87.87 0 01-.019-1.738c.022 0 2.268-.033 2.46-.005a.87.87 0 01-.193 1.726c-.257-.005-2.15.015-2.232.017h-.016zM106.887 117.943l-.322-.001a.871.871 0 01-.858-.881c.007-.48.426-.895.88-.856.254.004 1.736-.001 2.016-.01.524-.041.883.356.898.835a.866.866 0 01-.836.898c-.227.01-1.229.015-1.778.015zM106.907 123.018a.87.87 0 01-.078-1.734c.128-.012 1.501-.12 2.147-.127h.008a.868.868 0 01.008 1.737c-.547.005-1.83.104-2.005.12a.726.726 0 01-.08.004zM108.868 128.008l-.081-.003c-.353-.032-1.783-.063-2.165-.064h-.006a.869.869 0 01-.006-1.737c.353-.015 1.872.029 2.336.072a.868.868 0 01-.078 1.732zM109.436 133.015l-.033-.001c-.144-.007-1.985-.041-2.179-.041h-.01a.868.868 0 01-.009-1.737c.105-.019 2.117.038 2.265.043a.868.868 0 01-.034 1.736zM106.725 138.021a.87.87 0 01-.019-1.738c.023 0 2.269-.032 2.46-.003a.869.869 0 01.718.997.867.867 0 01-.911.728c-.275-.014-2.15.015-2.232.016h-.016z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M99.486 92.873a.86.86 0 01-.188-.021c-.175-.028-.956-.049-1.559-.038h-.015a.869.869 0 01-.015-1.738c.061-.001 1.521-.024 1.974.081a.868.868 0 01-.197 1.716zM99.76 97.865l-.066-.002c-.186-.009-1.237-.007-1.445-.007l-.031-1.738c1.476.021 1.565.009 1.626.015a.866.866 0 01.779.948.87.87 0 01-.863.784zM97.807 102.928a.87.87 0 01-.062-1.736c.587-.042 1.313-.09 1.719-.099a.863.863 0 01.89.849.871.871 0 01-.85.889c-.387.009-1.077.055-1.634.095l-.063.002zM99.969 107.934a1.07 1.07 0 01-.08-.003c-.536-.05-.627-.05-1.791-.063l-.338-.004a.87.87 0 01.011-1.737h.012l.337.004c1.254.015 1.352.018 1.928.07a.868.868 0 01-.079 1.733zM97.223 112.949a.87.87 0 01-.029-1.737c2.303-.073 2.344-.068 2.451-.052a.87.87 0 01.723.994c-.069.446-.473.743-.907.731-.114-.007-.904.021-2.209.063l-.029.001zM99.486 117.967a.86.86 0 01-.188-.021c-.175-.029-.946-.048-1.559-.037h-.015a.87.87 0 01-.015-1.738c.157-.002 1.536-.023 1.974.08a.866.866 0 01.648 1.042.868.868 0 01-.845.674zM99.76 122.96l-.066-.002c-.194-.008-1.368-.007-1.467-.007h-.01a.869.869 0 01-.009-1.737c.015 0 1.453-.005 1.635.014a.869.869 0 01-.083 1.732zM97.807 128.023a.87.87 0 01-.062-1.736c.587-.042 1.313-.09 1.719-.1.497.038.878.368.89.85a.872.872 0 01-.85.889c-.387.009-1.077.055-1.634.095l-.063.002zM99.969 133.029a1.07 1.07 0 01-.08-.003c-.534-.05-.585-.05-1.877-.066l-.251-.002a.87.87 0 01-.859-.878.87.87 0 01.869-.859h.011l.251.003c1.306.016 1.411.017 2.015.071a.868.868 0 01-.079 1.734zM97.223 138.044a.868.868 0 01-.029-1.737c2.324-.074 2.346-.069 2.474-.047a.867.867 0 01.696 1.011c-.08.439-.479.754-.909.71-.225 0-.91.021-2.203.063h-.029z"
            />
          </g>
          <g>
            <path
              fill="#559EBD"
              d="M90.262 92.878c-.049 0-.115-.001-.192-.011a2.348 2.348 0 01-.284-.018c.013.011-.112.006-.264-.025a.87.87 0 01-.666-1.033c.1-.457.553-.74.998-.673.033.001.104.004.12.006.066.008.124.006.172.006.069 0 .138.008.206.024.479 0 .822.382.822.862s-.433.862-.912.862zM90.501 97.889a.912.912 0 01-.186-.02c-.295-.033-1.695-.046-1.933-.034l-.035.001a.867.867 0 01-.032-1.736c.019-.003 2.045-.034 2.445.092a.87.87 0 01.57 1.089.87.87 0 01-.829.608zM88.229 102.895a.87.87 0 01-.035-1.736c.016-.001 1.653-.052 1.915-.021a.866.866 0 01.776.95.878.878 0 01-.934.779c-.207-.008-1.506.02-1.686.027l-.036.001zM87.926 107.954a.868.868 0 01-.056-1.735c1.33-.09 1.575-.098 1.852-.107l.2-.006c.48-.048.882.354.902.832a.867.867 0 01-.833.902l-.212.008c-.267.01-.506.018-1.793.104l-.06.002zM89.896 112.934c-.009 0-.02 0-.03-.002-.402-.012-1.604-.025-2.008-.029a.868.868 0 01.01-1.737h.01c.412.004 1.636.018 2.048.03a.87.87 0 01-.03 1.738zM90.268 117.971a72.781 72.781 0 00-1.953-.068.87.87 0 01-.856-.882.86.86 0 01.883-.855c.148.002 1.671.045 1.996.073a.864.864 0 01.794.936.87.87 0 01-.864.796zM90.501 122.984a.842.842 0 01-.186-.021c-.291-.032-1.712-.046-1.929-.033-.423.025-.886-.35-.905-.83a.867.867 0 01.829-.905c.021-.001 2.048-.035 2.45.092a.869.869 0 01-.259 1.697zM88.229 127.989a.869.869 0 01-.035-1.736c.015-.001 1.663-.049 1.92-.02a.867.867 0 01-.166 1.727 61.058 61.058 0 00-1.682.027c-.012.002-.025.002-.037.002zM87.926 133.049a.869.869 0 01-.056-1.734c1.33-.091 1.575-.099 1.852-.107l.2-.007c.48-.05.882.354.902.832a.868.868 0 01-.833.903l-.212.008c-.267.009-.506.017-1.793.103l-.06.002zM89.896 138.028l-.032-.001a133.58 133.58 0 00-2.003-.03.869.869 0 01.007-1.737h.007c.414.003 1.64.018 2.053.032a.868.868 0 01-.032 1.736z"
            />
          </g>
        </g>
        <g>
          <path
            fill="#377996"
            d="M44.583 92.421a.866.866 0 01-.669-.313l-.33-.4c-.648-.782-.648-.782-.794-.965l-.228-.283a.87.87 0 011.353-1.091l.23.289c.144.179.144.179.776.941l.332.4a.87.87 0 01-.67 1.422zM49.175 96.987a.867.867 0 01-.588-.229 61.677 61.677 0 01-1.705-1.621.869.869 0 111.213-1.244c.8.779.952.925 1.669 1.585a.87.87 0 01-.589 1.509zM54.335 101.189a.864.864 0 01-.501-.16c-.36-.255-.715-.523-1.094-.81-.332-.251-.685-.518-1.081-.806a.867.867 0 111.017-1.406c.408.294.771.569 1.112.827.363.274.702.531 1.05.776a.87.87 0 01-.503 1.579zM59.946 104.758a.814.814 0 01-.405-.107 407.206 407.206 0 00-2.392-1.334.868.868 0 11.793-1.544c.182.092 2.051 1.14 2.396 1.334.418.234.594.778.358 1.197a.864.864 0 01-.75.454zM65.373 107.581a.842.842 0 01-.346-.072l-1.639-.719a.869.869 0 01.681-1.599l1.65.725a.87.87 0 01-.346 1.665zM72.17 109.109a.606.606 0 01-.085-.005c-1.532-.146-1.744-.185-1.948-.222-.079-.014-.155-.028-.379-.053-.477-.054-.82-.483-.767-.96s.489-.813.961-.766c.291.032.388.049.492.069.172.029.366.063 1.808.202a.867.867 0 01.781.948.868.868 0 01-.863.787zM76.496 108.115a.868.868 0 01-.379-1.651c1.243-.601 1.571-.764 1.79-.873l.396-.194a.867.867 0 011.16.405.87.87 0 01-.406 1.16l-.374.183c-.222.11-.553.275-1.813.885a.858.858 0 01-.374.085zM83.251 104.229a.868.868 0 01-.431-1.622c.848-.484.941-.539 1.168-.671l1.063-.617a.87.87 0 01.869 1.505l-1.054.611c-.229.135-.325.19-1.186.68a.857.857 0 01-.429.114zM89.484 99.672a.868.868 0 01-.558-1.535c.249-.208 1.194-1.032 1.688-1.462l.306-.267a.87.87 0 011.225.095.866.866 0 01-.094 1.224l-.295.258c-.5.437-1.462 1.273-1.714 1.485a.864.864 0 01-.558.202zM94.088 94.669a.866.866 0 01-.553-1.538c.13-.109.454-.54.766-.956.251-.336.544-.729.888-1.161a.871.871 0 011.221-.142.87.87 0 01.142 1.22c-.333.42-.616.799-.859 1.124-.458.61-.76 1.015-1.05 1.254a.872.872 0 01-.555.199z"
          />
        </g>
        <g>
          <path
            fill="#377996"
            d="M111.183 140.838a.868.868 0 01-.866-.813c-.463-7.298-.533-15.833 2.44-23.791.442-1.182 1.039-2.474 1.671-3.838 1.855-4.008 4.164-8.996 4.46-15.229.021-.48.49-.839.907-.826.479.022.85.43.826.908-.311 6.572-2.697 11.73-4.616 15.876-.617 1.336-1.201 2.595-1.622 3.718-2.857 7.651-2.784 15.957-2.333 23.072a.867.867 0 01-.812.921c-.019.002-.037.002-.055.002zM29.447 140.838a.867.867 0 01-.866-.835 25.777 25.777 0 00-.058-.907c-.342-4.415-1.501-8.676-2.841-13.609-1.992-7.328-4.249-15.634-4.815-27.612a.868.868 0 01.827-.907c.442-.02.886.346.908.826.558 11.786 2.789 19.995 4.756 27.237 1.364 5.019 2.542 9.353 2.898 13.934.025.326.047.637.06.973a.865.865 0 01-.834.9h-.035z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#E6A57A"
          d="M89.535 34.641c-1.927 1.928-3.086 5.103-3.112 5.27l-.049 6.685c3.137.31 3.435-1.915 4.676-4.828.657-1.53 1.05-2.34 1.231-2.833 1.426-3.872-.027-6.997-2.746-4.294zM49.914 33.88c-1.139-.421-2.162-.409-2.668.71-.778 1.702.869 4.836 1.887 7.263 1.387 3.319 2.627 5.422 5.531 4.386l-1.475-8.789c-.519-.63-1.195-2.809-3.275-3.57z"
        />
        <path
          fill="#D1926B"
          d="M53.97 43.189c-.555 0-1.046-.4-1.141-.966-.295-1.758-1.662-3.485-3.176-4.018a1.156 1.156 0 01-.709-1.476 1.153 1.153 0 011.476-.709c2.325.816 4.254 3.209 4.694 5.818a1.157 1.157 0 01-1.144 1.351zM86.412 43.729a1.16 1.16 0 01-1.123-1.451c.457-1.749 2.245-5.586 4.856-6.284a1.158 1.158 0 01.599 2.236c-1.295.346-2.791 3.018-3.213 4.633a1.158 1.158 0 01-1.119.866z"
        />
        <path
          fill="#EBB686"
          d="M81.043 16.378c-6.935 2.102-14.273 2.885-21.827.343-1.134-.381-2.383.071-3.041 1.071-5.37 8.148-6.084 18.403-3.014 27.778 5.731 17.526 7.36 27.814 22.821 24.22 5.605-1.299 6.849-6.891 8.489-12.851 2.315-8.412 3.831-14.005 3.889-23.656.048-7.843-1.277-11.515-4.431-15.897-.652-.908-1.816-1.331-2.886-1.008z"
        />
        <path
          fill="#395D80"
          d="M61.738 35.656c-.55 0-1.036-.39-1.136-.949-.064-.359-.212-2.104-.225-2.331a1.157 1.157 0 011.091-1.222c.594-.042 1.185.45 1.221 1.091.015.247.156 1.828.193 2.057a1.162 1.162 0 01-1.144 1.354zM78.315 35.711a1.157 1.157 0 01-1.148-1.319 34.21 34.21 0 00.134-2.16c.016-.63.531-1.13 1.157-1.13h.029a1.158 1.158 0 011.13 1.187 33.977 33.977 0 01-.156 2.425 1.158 1.158 0 01-1.146.997z"
        />
        <path
          id="eyebrow"
          fill="#B0695A"
          d="M84.4 28.257a.863.863 0 01-.509-.165l-.496-.366c-1.898-1.401-2.685-1.98-7.679-1.115a.874.874 0 01-1.004-.708.87.87 0 01.708-1.004c5.495-.95 6.733-.248 9.006 1.431l.484.355a.869.869 0 01-.51 1.572zM55.549 28.765a.867.867 0 01-.74-1.321c2.078-3.399 5.376-3.108 9.197-2.773l.271.024a.869.869 0 01.79.941.877.877 0 01-.941.79l-.272-.026c-3.973-.349-6.113-.422-7.563 1.95a.87.87 0 01-.742.415z"
        />
        <g>
          <path
            fill="#D99467"
            d="M69.758 50.244c-.738 0-1.578-.378-2.681-1.294-.452-.372-1.661-1.365-1.148-2.395.347-.695 1.184-.79 2.074-.678l.001-.238c.022-3.629.051-8.599-.708-10.475a.867.867 0 111.609-.651c.888 2.193.86 7.152.836 11.137l-.005 1.277a.872.872 0 01-1.072.843 11.189 11.189 0 00-.395-.088c1.48 1.225 1.57 1.135 3.163-.438l.562-.549a.869.869 0 111.207 1.25l-.547.536c-1.047 1.028-1.869 1.763-2.896 1.763z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M59.702 46.223c-.899.183-1.799.944-1.244 2.552.323.93 1.125 1.558 2.083 1.314 2.086-.529 1.62-4.375-.839-3.866zM78.296 47.775c-.378 1.059.398 2.245 1.706 2.183 1.469-.063 2.43-1.938 1.643-2.926-.708-.888-2.678-1.14-3.349.743z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M75.003 52.705c-3.155 2.582-6.578 2.285-9.722.08-.455-.325-1.08.092-.951.644.051.216.757 1.75 1.194 2.823.969 2.381 1.542 3.289 5.085 3.289 3.947 0 4.576-2.172 5.387-6.239a.616.616 0 00-.993-.597z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar14: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path fill="#D4C0AC" d="M82.73 3.416c-5.218 17.8-7.014 33.453 8.291 38.378 8.548-16.32 4.786-31.03-8.291-38.378z" />
      <path
        fill="#E0D1C1"
        d="M85.785 31.428l-.291-.001a.869.869 0 01.004-1.737c.104-.011.176.001.262.001 4.31 0 6.67-.605 9.259-1.643a.873.873 0 011.131.483.87.87 0 01-.484 1.13c-3.234 1.296-5.85 1.767-9.881 1.767zM89.782 35.379c-.985 0-1.827-.071-2.519-.13-.561-.048-1.044-.084-1.4-.076-.472.076-.884-.354-.903-.833s.353-.884.833-.903c.466-.021.999.026 1.618.079 1.586.136 3.761.321 6.609-.406a.87.87 0 01.429 1.684 18.621 18.621 0 01-4.667.585z"
      />
      <path fill="#D99467" d="M87.521 41.518L85.816 51.93c.123-.123 6.547-5.344 8.348-9.275 2.65-5.792-3.921-8.05-6.643-1.137z" />
      <path
        fill="#3D809C"
        d="M106.355 129.778c-.04-9.985 3.716-14.395 4.432-18.164.355-1.866.196-3.423-.514-8.199-5.29-3.147-15.923-4.775-22.494-11.453-2.887-2.94-4.368-6.176-5.179-10.316-8.018 4.646-16.498 4.536-25.398.113-2.012 7.179-6.686 10.091-15.778 15.438-3.251 1.918-5.854 3.502-7.957 4.956-.448.424-.881.974-1.302 1.616.722 4.724 3.3 9.254 3.984 14.073.57 4.016-.199 8.113.136 12.159.28 3.398 1.328 6.681 2.145 9.999h67.365c.346-1.483.585-4.221.56-10.222z"
      />
      <path
        fill="#EDAA7E"
        d="M36.149 117.842c-.684-4.819-3.262-9.35-3.984-14.073-4.02 6.126-6.899 21.712-9.081 36.231H38.43c-.816-3.318-1.864-6.601-2.145-9.999-.335-4.046.435-8.144-.136-12.159zM110.273 103.415c.71 4.776.869 6.333.514 8.199-.716 3.77-4.472 8.179-4.432 18.164.024 6.001-.215 8.738-.561 10.222h12.567c-1.763-19.251-3.68-31.181-7.511-36.237-.179-.119-.382-.233-.577-.348z"
      />
      <path
        fill="#D99467"
        d="M58.192 59.846c.507 10.5.345 17.145-.989 21.913 8.9 4.423 17.38 4.533 25.398-.113-1.013-5.172-.974-11.764-1.296-20.996l-23.113-.804z"
      />
      <path
        fill="#3D809C"
        d="M83.626 76.545c-.068-1.327-1.521-2.136-2.745-1.535-6.956 3.409-12.074 4.683-22.301-.535-1.268-.646-2.782.26-2.76 1.647.034 2.267-.078 5.297-.795 7.624-.236.766.028 1.603.713 2.046 9.125 5.912 18.821 5.95 28.696 1.145a1.819 1.819 0 00.821-2.497c-1.192-2.306-1.505-5.5-1.629-7.895z"
      />
      <path
        fill="#356987"
        d="M70.596 91.271c-5.321 0-10.446-1.583-15.331-4.75a.87.87 0 01.946-1.458c8.561 5.549 17.929 5.916 27.842 1.095a.87.87 0 011.162.4.872.872 0 01-.402 1.162c-4.867 2.366-9.617 3.551-14.217 3.551z"
      />
      <path
        fill="#356987"
        d="M58.78 88.226a.866.866 0 01-.867-.943c.204-2.354.642-8.001.838-12.507.021-.479.457-.88.905-.829a.868.868 0 01.83.904c-.197 4.536-.637 10.214-.842 12.58a.869.869 0 01-.864.795zM62.601 89.894h-.02a.872.872 0 01-.849-.891c.057-2.473.148-6.021.229-9.135l.091-3.571a.86.86 0 01.89-.847.87.87 0 01.847.891l-.091 3.571c-.081 3.113-.172 6.658-.229 9.133a.87.87 0 01-.868.849zM66.462 90.911a.867.867 0 01-.865-.812c-.237-3.7-.281-8.678-.112-12.683.02-.479.429-.872.904-.831a.87.87 0 01.832.902c-.165 3.949-.123 8.855.109 12.499a.867.867 0 01-.811.922c-.019.003-.038.003-.057.003zM70.053 91.248a.868.868 0 01-.863-.793c-.375-4.294-.522-9.377-.503-12.508a.87.87 0 01.869-.863h.006a.87.87 0 01.863.873c-.02 3.092.126 8.109.496 12.348a.866.866 0 01-.789.939c-.028.002-.054.004-.079.004zM74.346 90.971a.868.868 0 01-.861-.766 97.703 97.703 0 01-.656-12.567.87.87 0 01.869-.855h.013a.87.87 0 01.855.885A96.262 96.262 0 0075.21 90a.868.868 0 01-.864.971zM78.018 90.172a.866.866 0 01-.854-.725c-.754-4.44-1.002-10.407-1.073-12.766a.871.871 0 01.843-.896c.524.008.881.365.895.843.055 1.813.292 8.074 1.048 12.53a.867.867 0 01-.859 1.014zM81.77 88.827a.868.868 0 01-.85-.69c-1.205-5.747-1.423-8.833-1.617-12.887a.868.868 0 111.735-.086c.19 3.971.404 6.995 1.582 12.615a.866.866 0 01-.85 1.048z"
      />
      <g>
        <path
          fill="#EDAA7E"
          d="M66.309 9.27c-15.771 3.853-19.437 11.255-19.437 11.255L47.9 32.749c-.006.62.364 3.806.441 4.39 4.2 31.744 26.956 48.588 38.091 16.453 2.917-8.459 4.556-14.344 1.761-31.228 0-.001-6.114-16.947-21.884-13.094z"
        />
      </g>
      <g>
        <path
          fill="#D99467"
          d="M69.402 49.234c-.97 0-1.839-.604-2.589-1.185-1.141-.887-1.575-1.858-1.19-2.663.229-.479.792-.966 2.112-.85.537-3.21-.187-6.096-2.072-8.192a.87.87 0 011.291-1.163c2.429 2.701 3.251 6.445 2.315 10.542a.868.868 0 01-1.044.652 4.409 4.409 0 00-.802-.122c.102.118.248.261.453.422.811.628 1.3.877 1.625.811.438-.077 1.037-.716 1.782-1.9a.87.87 0 011.199-.271.872.872 0 01.271 1.199c-1.076 1.706-1.958 2.509-2.95 2.683a2.108 2.108 0 01-.401.037z"
        />
      </g>
      <g>
        <path
          fill="#395D80"
          d="M78.235 37.482c-.058 0-.115-.004-.175-.011a1.163 1.163 0 01-.972-1.32c.138-.901.171-1.257.193-1.486.019-.192.03-.314.067-.516a1.146 1.146 0 011.349-.929c.629.115 1.046.719.93 1.348-.022.124-.029.201-.041.317-.023.25-.06.634-.207 1.612-.085.574-.58.985-1.144.985zM59.705 37.477c-.525 0-1-.358-1.125-.892-.176-.74-.246-1.544-.28-1.931l-.015-.164a1.158 1.158 0 011.025-1.278 1.147 1.147 0 011.278 1.025l.02.215c.031.358.09 1.021.225 1.599a1.156 1.156 0 01-1.128 1.426z"
        />
      </g>
      <g>
        <path
          id="eyebrow"
          fill="#B07C5A"
          d="M80.749 30.58a.908.908 0 01-.229-.031 4.858 4.858 0 01-.289-.095c-.604-.211-2.021-.706-4.076-.199a.867.867 0 01-1.051-.633.865.865 0 01.632-1.052c2.558-.634 4.381.004 5.069.245.073.025.131.046.174.058a.868.868 0 01-.23 1.707zM56.787 30.799a.867.867 0 01-.777-.479.866.866 0 01.387-1.165c2.028-1.02 3.645-1.122 5.579-.35a.87.87 0 01.484 1.129.864.864 0 01-1.129.484c-1.262-.501-2.348-.615-4.155.288a.853.853 0 01-.389.093z"
        />
      </g>
      <g>
        <path
          id="smile"
          fill="#FFF"
          d="M74.633 53.447c-1.36-.471-3.284 1.859-5 1.665-4.056-.476-4.526-2.734-6.008-1.835-2.008 1.222 2.954 5.614 6.131 5.613 2.78 0 7.549-4.519 4.877-5.443z"
        />
      </g>
      <g opacity=".3">
        <path
          fill="#ED7278"
          d="M77.951 48.498c-.016 1.714 1.66 2.498 2.721 1.971 4.823-2.393-2.677-7.163-2.721-1.971zM56.065 48.738c1.467 4.314 6.28.162 3.691-1.995-1.34-1.098-4.601-.68-3.691 1.995z"
        />
      </g>
      <g>
        <path
          fill="#D4C0AC"
          d="M50.542 14.408c-3.314 1.195-5.556 2.275-7.076 5.466-2.361 4.936-1.442 15.185 3.311 21.734 5.232-6.266 5.356-15.646 4.172-23.735l-.407-3.465z"
        />
        <path
          fill="#E0D1C1"
          d="M47.594 42.116a.868.868 0 01-.838-.642c-4.349-16.072-1.308-20.559 3.83-25.567a.869.869 0 011.213 1.245c-4.837 4.716-7.477 8.676-3.367 23.868a.867.867 0 01-.838 1.096z"
        />
      </g>
      <g>
        <path
          fill="#E0D1C1"
          d="M94.49 17.417a22.52 22.52 0 00-2.993-6.156c-2.129-3.126-5.074-5.78-8.761-7.848-12.824-7.204-28.18-1.935-32.304 5.9-.256.463-.45.925-.621 1.4a8.865 8.865 0 00-.305 1.205 7.788 7.788 0 00-.011 2.908c.121.656.328 1.314.632 1.971 1.229 2.665 3.978 5.293 8.675 7.568 4.586 2.227 7.896 2.495 12.715 2.701-.693-.523-1.351-2.251-1.765-3.455-.048-.098-.072-.195-.109-.292 4.587 1.862 12.144 3.358 19.14 2.896 2.385-.158 4.708-.547 6.826-1.229 0-1.411-.109-2.787-.317-4.125a22.586 22.586 0 00-.802-3.444z"
        />
        <path
          fill="#EBDBCC"
          d="M69.646 24.187a.67.67 0 01-.125-.009c-5.515-.793-11.625-2.244-18.936-7.452a44.78 44.78 0 01-1.63-1.232.87.87 0 011.079-1.361c.526.417 1.05.811 1.563 1.18 7.355 5.239 13.236 6.436 18.171 7.145a.866.866 0 01.736.984.867.867 0 01-.858.745zM86.945 22.348c-12.971 0-33.472-6.13-37.982-9.752a.87.87 0 011.088-1.355c3.868 3.11 24.682 9.659 37.751 9.36a69.235 69.235 0 007.376-.6c.467-.073.911.27.976.745s-.269.913-.745.976a70.598 70.598 0 01-7.563.616c-.296.007-.597.01-.901.01z"
        />
        <path
          fill="#EBDBCC"
          d="M94.49 18.286a.874.874 0 01-.323-.062c-3.54-1.422-7.875-2.84-12.202-3.994-6.543-1.753-12.967-2.905-18.579-3.332-5.194-.398-9.695-.177-13.382.663a.869.869 0 01-.384-1.694c3.858-.876 8.536-1.113 13.898-.702 5.718.434 12.252 1.605 18.896 3.385 4.392 1.173 8.796 2.614 12.4 4.061a.869.869 0 01-.324 1.675z"
        />
        <path
          fill="#EBDBCC"
          d="M91.496 12.13a.866.866 0 01-.423-.111c-12.805-7.165-28.229-7.905-40.254-1.928a.87.87 0 01-.774-1.557c12.532-6.228 28.579-5.473 41.876 1.968a.868.868 0 01.333 1.182.86.86 0 01-.758.446z"
        />
      </g>
      <g>
        <path fill="#D99467" d="M51.189 49.729c-1.155-3.483-2.069-7.3-2.676-11.376-6.242-4.492-6.347 5.784 2.676 11.376z" />
      </g>
    </svg>
  ),
  avatar15: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#3B1D25"
        d="M96.118 51.81c.34-4.044 1.068-8.294-.521-12.027-2.02-4.744-7.768-7.391-12.803-6.282-2.285.503-4.451 1.668-6.791 1.682-4.897.027-8.422-4.809-13.119-6.192-4.846-1.427-9.897 1.026-14.351 3.407-1.668.892-3.4 1.84-4.469 3.4-2.746 4.01-1.701 15.125-4.916 23.239-.939 2.37-2.272 4.678-2.361 7.227-.093 2.729 1.262 5.291 1.666 7.992.293 1.954.088 3.988.669 5.877.953 3.095 3.853 5.295 4.802 8.39.731 2.385.408 5.408 2.412 6.893l2.303 2.279c1.446-1.727 3.889.587 5.506.795 1.605.207 3.109-.916 4.727-.938 2.745-.037 4.907 3.033 7.633 2.702 2-.242 3.537-2.29 5.549-2.191 1.972.097 3.796 2.264 5.575 1.403 1.542-.745.936-2.227 6.153-1.845 8.99.659 12.596-4.17 11.254-10.438-.278-1.302-.774-2.582-.754-3.914.046-2.88 2.437-5.176 3.175-7.961 1.224-4.613-2.484-9.878-1.339-23.498z"
      />
      <path
        fill="#4D2631"
        d="M55.837 99.188a.876.876 0 01-.667-1.447c.193-.226.396-.449.59-.663.293-.325.736-.815.813-.984.004-.076-.491-.4-.728-.556a6.624 6.624 0 01-.422-.292c-1.388-1.103-.647-2.698-.204-3.65.139-.302.375-.806.363-.972-.055-.125-.432-.334-.736-.5-.731-.402-2.094-1.152-1.6-2.961.198-.732.617-1.253.986-1.714.264-.329.514-.641.662-1.004.266-.651.178-.785-.854-1.299-.603-.301-1.285-.641-1.511-1.369-.135-.436-.067-.9.199-1.383.274-.51.606-.902.874-1.221.467-.553.572-.715.522-1.045-.063-.408-.53-.78-.981-1.141-.583-.463-1.308-1.04-1.142-1.952.158-.818.72-1.274 1.216-1.68.359-.293.7-.57.884-.973.003-.206-.577-.774-.856-1.046-.708-.693-1.513-1.477-1.339-2.525.154-.875.886-1.543 1.532-2.136.24-.22.604-.552.672-.689.118-.312-.147-.858-.405-1.388-.323-.666-.658-1.356-.491-2.095.253-1.06 1.083-1.549 1.751-1.942.369-.218.717-.422.997-.705.242-.248-.014-.833-.375-1.571-.163-.336-.317-.653-.407-.964a.877.877 0 01.602-1.084.87.87 0 011.084.602c.058.196.176.427.298.676.44.902 1.178 2.413.05 3.57-.445.451-.929.736-1.357.987-.608.358-.863.534-.934.829-.023.143.217.636.361.932.38.783.853 1.757.46 2.791-.189.494-.622.889-1.122 1.347-.351.321-.938.859-.987 1.137.023.18.552.696.835.974.76.74 1.798 1.754 1.231 3.024-.358.782-.922 1.242-1.376 1.61-.234.191-.445.363-.542.515.113.112.312.271.456.385.612.489 1.451 1.159 1.623 2.248.171 1.155-.432 1.868-.917 2.443-.238.28-.482.57-.675.928a.084.084 0 01-.015.027c.135.096.39.224.57.313.846.422 2.605 1.299 1.696 3.529-.243.601-.602 1.048-.92 1.442-.298.372-.557.695-.66 1.075-.11.402-.103.493.752.963.553.305 1.24.682 1.536 1.44.303.762-.063 1.547-.417 2.309-.479 1.027-.541 1.343-.301 1.533.079.063.183.128.295.2.59.387 1.692 1.105 1.477 2.397-.093.523-.503.996-1.222 1.79-.183.202-.374.412-.556.625a.871.871 0 01-.668.31z"
      />
      <path
        fill="#592A2A"
        d="M61.456 99.188a.88.88 0 01-.707-1.397c.92-1.254 1.261-3.049.998-3.556-.156-.3-.78-.718-1.193-.993-.462-.311-.83-.556-1.034-.873-.65-.975.095-2.042.541-2.68.083-.117.158-.219.207-.308.32-.57.288-.609-.232-1.267a9.482 9.482 0 01-.625-.866c-.742-1.207-.211-2.243.214-3.078.248-.482.481-.939.554-1.473.037-.262-.504-.715-.861-1.018-.448-.374-.869-.729-1.023-1.229-.254-.841.115-1.592.44-2.253.235-.48.458-.932.399-1.306-.045-.278-.317-.548-.631-.858-.65-.646-1.739-1.726-.626-3.587.242-.401.606-1.006.624-1.151a2.787 2.787 0 00-.112-.356c-.1-.287-.232-.666-.368-1.235-.347-1.465.417-2.674.976-3.559.153-.242.298-.466.396-.674.35-.74.181-1.404.031-1.988-.081-.317-.151-.591-.132-.877.031-.485.438-.866.931-.819.477.03.84.436.82.909.009.095.046.213.082.352.178.696.476 1.861-.144 3.172a8.65 8.65 0 01-.5.863c-.456.722-.929 1.47-.752 2.214.118.489.232.817.318 1.063.403 1.156.229 1.508-.664 2.989-.407.681-.259.825.358 1.438.442.438.994.985 1.127 1.83.147.921-.244 1.715-.558 2.354-.173.353-.389.792-.334.969.031.027.296.251.472.397.652.549 1.64 1.378 1.472 2.6-.114.828-.456 1.495-.73 2.032-.405.791-.485 1.028-.286 1.354.169.271.349.496.511.702.57.722 1.28 1.619.384 3.214a6.397 6.397 0 01-.297.453c-.121.174-.384.549-.455.759.106.078.319.22.484.329.628.422 1.412.945 1.774 1.644.701 1.346-.022 3.88-1.138 5.404a.88.88 0 01-.711.36z"
      />
      <path
        fill="#4D2631"
        d="M80.676 98.545a.876.876 0 01-.854-1.082c.266-1.113 1.219-1.841 2.06-2.481 1.24-.946 1.165-1.048.98-1.292-.104-.141-.394-.37-.604-.537-.341-.269-.635-.502-.819-.785-.794-1.234.597-2.248 1.612-2.988.313-.226.817-.595.977-.789-.01-.338-.236-.576-.739-1.024-.725-.649-1.938-1.735-.748-3.762.294-.498.567-.869.789-1.169.114-.156.254-.345.311-.448-.023-.017-.069-.085-.158-.188-.146-.175-.331-.303-.564-.468-.295-.208-.662-.467-1.015-.878-1.328-1.503.105-3.075.962-4.015.31-.338.63-.688.781-.955.15-.26.121-.405-.479-1.135-.396-.485-.849-1.033-.939-1.762-.109-.842.146-1.379.331-1.771.192-.408.332-.702.129-1.564-.278-1.194-.765-1.804-1.235-2.394-1.06-1.329-1.67-2.446-.518-5.728a.877.877 0 011.12-.537.88.88 0 01.537 1.12c-.917 2.609-.509 3.121.233 4.05.537.672 1.203 1.51 1.571 3.088.343 1.457 0 2.184-.251 2.715-.146.31-.221.464-.177.799.028.228.296.553.554.868.537.653 1.436 1.746.646 3.122-.247.433-.633.856-1.007 1.267-.954 1.044-1.163 1.422-.935 1.681.219.255.441.411.7.593.28.198.6.422.892.767 1.072 1.261.46 2.088-.08 2.818-.193.261-.432.581-.687 1.014-.462.786-.296.937.407 1.564.599.536 1.42 1.271 1.313 2.566-.063.788-.817 1.339-1.69 1.974-.296.215-.745.545-.982.78.08.066.172.14.246.198.337.267.687.543.926.868 1.297 1.731-.345 2.983-1.327 3.732-.606.462-1.296.987-1.416 1.495a.88.88 0 01-.853.673z"
      />
      <g>
        <path
          fill="#66353D"
          d="M82.333 77.698c-2.193-7.586-2.009-18.941-1.803-22.162l-21.734.094c.18 1.876.32 12.26-.467 17.501C55.95 88.966 53.8 89.396 42.897 96.104c-.269.165-.54.297-.811.451 12.444 16.293 47.61 11.741 56.148 1.103-6.213-2.904-12.165-7.031-15.901-19.96z"
        />
        <path
          fill="#6683B3"
          d="M98.234 97.658c-13.217 3.058-32.655 6.14-56.148-1.103-5.296 3.004-10.769 3.804-13.787 6.633-3.081 4.527-7.291 19.123-8.928 37.015h99.052c-1.806-15.882-5.108-30.884-8.058-36.168-3.776-3.061-8.011-4.451-12.131-6.377z"
        />
        <path
          fill="#5B73A3"
          d="M35.543 106.617a.878.878 0 01-.558-1.555c4.191-3.443 8.845-6.779 10.651-8.055a.883.883 0 011.224.212.879.879 0 01-.211 1.223c-1.79 1.264-6.402 4.57-10.548 7.976a.878.878 0 01-.558.199zM41.264 108.336a.875.875 0 01-.633-1.483c3.279-3.423 6.364-6.283 9.432-8.747a.877.877 0 111.099 1.368c-3.007 2.416-6.039 5.227-9.265 8.592a.872.872 0 01-.633.27zM47.733 109.893a.877.877 0 01-.714-1.386l1.878-2.638a828.594 828.594 0 004.832-6.831.878.878 0 011.443 1.001c-1.284 1.848-3.098 4.395-4.844 6.848l-1.877 2.637a.881.881 0 01-.718.369zM53.243 110.923a.878.878 0 01-.785-1.268c1.877-3.784 3.632-7.124 5.216-9.929a.878.878 0 011.529.863c-1.568 2.776-3.309 6.089-5.172 9.845a.88.88 0 01-.788.489zM58.041 111.565a.876.876 0 01-.829-1.166c1.241-3.563 2.851-7.713 3.853-10.184a.876.876 0 011.142-.484c.45.183.667.692.484 1.142-.994 2.453-2.592 6.571-3.823 10.104a.873.873 0 01-.827.588zM63.061 111.998a.877.877 0 01-.868-1.014c.616-3.893 1.479-6.956 2.173-9.417l.27-.966a.879.879 0 011.692.471l-.272.971c-.682 2.418-1.53 5.425-2.129 9.215a.88.88 0 01-.866.74zM67.495 112.186a.879.879 0 01-.875-.953c.275-3.155.876-7.054 1.607-10.43a.892.892 0 011.044-.672c.474.103.773.57.671 1.044-.717 3.308-1.306 7.124-1.575 10.21a.876.876 0 01-.872.801zM72.304 112.174h-.027a.88.88 0 01-.851-.903c.13-4.35.401-8.999.48-10.322a.896.896 0 01.929-.823.879.879 0 01.824.93c-.08 1.316-.351 5.943-.479 10.27a.877.877 0 01-.876.848zM77.216 111.929a.878.878 0 01-.873-.799l-.281-3.091c-.325-3.56-.489-5.346-.564-7.118a.876.876 0 01.839-.913c.454-.061.894.354.915.838.074 1.729.235 3.504.559 7.034l.282 3.093a.878.878 0 01-.877.956zM81.732 111.531a.876.876 0 01-.845-.645c-1.064-3.854-1.722-6.968-2.131-10.099a.877.877 0 01.756-.984c.479-.076.922.275.983.757.4 3.046 1.042 6.089 2.082 9.86a.88.88 0 01-.845 1.111zM86.717 110.898a.875.875 0 01-.832-.597c-1.437-4.276-2.473-7.571-3.079-9.794a.875.875 0 01.615-1.078.876.876 0 011.078.615c.597 2.19 1.623 5.454 3.049 9.696a.876.876 0 01-.831 1.158zM91.866 110.044a.874.874 0 01-.783-.478c-1.764-3.459-3.362-6.813-4.506-9.445a.88.88 0 01.457-1.154.88.88 0 011.154.456c1.128 2.6 2.711 5.92 4.457 9.347a.874.874 0 01-.779 1.274zM97.447 108.933a.877.877 0 01-.707-.355c-2.109-2.848-4.662-6.479-6.348-8.927a.879.879 0 011.447-.995c1.677 2.438 4.216 6.047 6.312 8.878a.877.877 0 01-.704 1.399zM104.021 107.367a.883.883 0 01-.591-.229 395.717 395.717 0 01-5.996-5.574c-1.011-.953-1.92-1.812-2.758-2.585a.876.876 0 111.187-1.29c.845.776 1.759 1.641 2.774 2.6a381.29 381.29 0 005.972 5.55.88.88 0 01.061 1.241.887.887 0 01-.649.287z"
        />
        <g>
          <path
            fill="#5B73A3"
            d="M69.69 112.238c-13.025 0-26.461-2.393-41.704-8.231a.876.876 0 11.628-1.638c30.792 11.794 54.152 9.309 81.859 1.484.474-.132.953.14 1.084.605s-.141.952-.605 1.084c-14.37 4.059-27.589 6.696-41.262 6.696z"
          />
        </g>
        <g>
          <path
            fill="#5B73A3"
            d="M102.12 141.084a.875.875 0 01-.87-.779l-.304-2.678c-.845-7.427-1.717-15.106-1.409-19.594.076-1.135.229-2.277.377-3.382.32-2.402.625-4.671.209-6.903a.876.876 0 01.703-1.022.88.88 0 011.023.703c.465 2.508.128 5.022-.196 7.455-.144 1.077-.293 2.189-.365 3.269-.297 4.328.567 11.928 1.402 19.277l.303 2.678a.879.879 0 01-.873.976z"
          />
        </g>
        <g>
          <path
            fill="#5B73A3"
            d="M35.621 141.084a.877.877 0 01-.877-.866c-.012-.865 0-1.514.012-1.802.142-2.936.799-5.813 1.437-8.594.643-2.808 1.308-5.71 1.405-8.588.041-1.165.11-2.298.18-3.411.236-3.778.459-7.347-.713-11.072a.88.88 0 011.676-.526c1.269 4.036 1.036 7.763.789 11.707-.068 1.096-.138 2.212-.176 3.361-.105 3.046-.789 6.031-1.45 8.922-.62 2.704-1.26 5.503-1.395 8.278-.01.268-.021.881-.01 1.701a.876.876 0 01-.866.889l-.012.001z"
          />
        </g>
      </g>
      <g>
        <path fill="#E8B48B" d="M89.661 37.967l-1.018 8.347c9.984-5.3 5.757-15.717 1.018-8.347z" />
        <path
          fill="#E6A57A"
          d="M88.643 43.554a.878.878 0 01-.873-.803c-.133-1.53 1.409-4.847 4.704-5.469a.878.878 0 01.324 1.725c-2.396.452-3.33 3.014-3.28 3.593a.875.875 0 01-.875.954z"
        />
        <path
          fill="#744149"
          d="M82.194 19.046c-19.982-6.273-27.158 4.644-32.477 18.053-.982 37.159 37.896 51.268 42.143-3.791-1.194-5.265-3.768-9.78-9.666-14.262z"
        />
        <path
          fill="#3B1D25"
          d="M60.585 38.547a1.16 1.16 0 01-1.155-1.003c-.027-.201-.118-2.246-.114-2.393a1.17 1.17 0 011.168-1.135h.036a1.17 1.17 0 011.136 1.18c.003.224.082 1.885.097 2.07a1.178 1.178 0 01-1.035 1.273c-.045.004-.09.008-.133.008zM80.813 38.549a1.171 1.171 0 01-1.163-1.315c.066-.531.068-.762.072-1.071.002-.252.006-.549.035-1.039.037-.645.57-1.122 1.235-1.099a1.17 1.17 0 011.099 1.237c-.024.435-.027.7-.029.925a9.88 9.88 0 01-.09 1.338 1.17 1.17 0 01-1.159 1.024z"
        />
        <path
          id="eyebrow"
          fill="#4D2631"
          d="M76.469 33.658a.876.876 0 01-.52-1.585c2.752-2.021 6.944-2.844 10.096-.135a.877.877 0 11-1.142 1.332c-2.423-2.082-5.722-1.392-7.916.217a.871.871 0 01-.518.171zM54.717 33.776a.878.878 0 01-.497-1.6c3.513-2.4 7.127-2.558 10.739-.468a.878.878 0 01-.878 1.519c-3.063-1.771-5.881-1.646-8.872.397a.855.855 0 01-.492.152z"
        />
        <g>
          <path
            fill="#613240"
            d="M69.968 51.786c-.105 0-.21-.008-.314-.024-1.347-.203-3.689-1.733-4.108-2.683-.259-.572-.182-1.155.209-1.554.466-.475 1.211-.531 1.885-.431.408-4.434.342-6.46-.277-11.279a.877.877 0 011.741-.224c.686 5.343.715 7.363.183 12.709a.877.877 0 01-1.22.719 2.871 2.871 0 00-.325-.115c.625.475 1.578 1.033 2.175 1.124.278.037 1.075-.311 2.225-1.904a.878.878 0 011.424 1.027c-1.266 1.75-2.474 2.635-3.598 2.635z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M72.152 54.961c-3.368 1.477-6.914-2.082-8.251-.538-1.572 1.819 4.708 4.444 7.281 4.098 5.328-.787 9.073-7.101.97-3.56z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#ED7278"
            d="M80.326 50.594c.699 3.615 6.779.831 3.858-2.012-1.334-1.3-4.417-.887-3.858 2.012zM55.898 50.288c.73 2.793 3.562 2.285 4.306.703 1.64-3.48-5.274-4.411-4.306-.703z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#4D2631"
          d="M123.499 72.495c-1.914-1.431 1.237-2.201.904-3.799-.214-1.045-1.691-1.32-1.903-2.212-.274-1.153 1.001-1.965 1.133-2.867.275-2.025-2.973-2.133-1.137-4.481.47-.606 1.021-1.293 1.068-1.381 1.291-2.468-3.697-2.127-1.959-4.686.735-1.083 2.782-2.286 1.168-3.65-.353-.294-1.58-.775-1.864-1.212-.599-.969 1.863-3.027 1.874-4.013.04-1.759-2.682-1.648-2.721-2.672-.039-1.046 1.065-1.923.985-3.006-.277-1.326-1.591-1.206-2.376-1.991-1.375-1.372 4.245-4.685.44-5.744-1.229-.337-1.714-.224-1.433-1.644.868-4.227-2.188-2.428-2.44-3.804-.178-.928.813-1.791.735-2.998-.133-2.111-2.463-1.458-3.012-2.115-.988-1.143 1.707-4.415-2.217-4.364-1.935.023-1.066-1.405-1.297-2.289-.48-1.853-2.797-.567-3.368-1.387-.57-.755.1-3.194-1.026-3.764-1.235-.64-1.997.353-2.5-1.236-.446-1.438-.317-3.313-2.432-2.736-.948.266-1.061.368-1.456.247-.822-.246-1.355-2.376-2.195-2.861-1.153-.666-2.14 1.581-2.981 1.133-.865-.423-1.119-2.222-2.577-1.717-1.171.405-1.776 1.007-3.042.629-1.448-.433-2.548-1.242-4.114-.605-.806.328-1.599.817-2.465.777-1.775-.083-3.269-2.506-4.996-1.443-.753.463-1.078 1.586-1.936 1.772-.685.148-1.313-.396-1.986-.592-2.991-.872-4.989 4.563-5.132 7.735-.06 1.368.786 7.23 1.604 7.72.985.593 1.269.832 2.377.965 2.072.267 1.019 1.974 1.668 3.333.669 1.386 2.138-.325 3.402.827 1.302 1.182.21 4.097 2.464 4.621 1.106.257 2.979-.863 3.809.564.966 1.683-.761 4.041.868 5.047.342.215 2.396.563 2.567 1.467.277 1.454-1.734 3.781-1.023 5.281.378.793 1.478 1.222 2.04 1.938 1.253 1.569-1.646 3.418-.444 5.287 1.449 2.213 2.889 1.32-.089 4.599-1.919 2.103.76 2.362 1.398 3.381 1.006 1.561-4.237 2.577-1.51 5.327 1.533 1.545 1.467 1.673 1.47 2.063 0 .951-1.499 2.551-1.632 3.76-.146 1.332 1.516 2.167 1.78 3.154.362 1.346-1.08 2.587-1.035 3.602.142 1.584 1.85 1.647 1.681 3.216-.121 1.218-2.882 3.854-.597 5.39 4.151 2.822-2.504 3.818.153 6.236 2.241 2.012-1.116 2.171-.993 4.354.065 1.192 1.574 1.569 1.387 2.785-.171 1.094-2.265 1.771-1.033 3.268.282.344.728.505 1.077.778.64.499 1.146 3.775 2.688 2.273.392-.381.637-1.157 1.146-1.372.821-.345 1.639.434 2.535.368 1.628-.121 1.413-2.072 2.313-2.323 1.048-.301 1.812 1.616 3.188 1.174 1.21-.391.788-2.546 1.542-3.356 1.065-1.167 2.639 1.479 4.053.358.622-.496.505-2.364 1.574-2.431 1.189-.057 3.94 3.548 4.958-.949.677-2.993 1.938-.855 3.55-1.481 1.89-.726-.057-3.669 3.046-3.957 2.722-.231 1.211-2.894 2.203-4.449.424-.676 1.633-.558 2.124-1.215.569-.803-.391-2.315-.196-3.344.352-1.869 5.399-1.371.145-5.283z"
        />
        <path
          fill="#613240"
          d="M93.485 100.265a.879.879 0 01-.813-1.205c.312-.77.836-1.315 1.26-1.756.114-.12.259-.271.355-.387a2.576 2.576 0 00-.339-.207l-.384-.202c-.728-.377-1.48-.769-1.383-1.63.097-.789.672-1.354 1.18-1.853.341-.335.767-.752.747-1-.054-.121-.513-.33-.76-.442-.636-.288-1.51-.683-1.745-1.616-.196-.763.103-1.634.937-2.737.375-.503.759-.907 1.067-1.232.278-.293.624-.659.652-.812.116-.561-.123-.84-.782-1.443-.569-.521-1.35-1.235-1.228-2.384.105-.931.776-1.759 1.424-2.563.387-.478.825-1.018.901-1.332.068-.277-.181-.522-.919-1.075-.597-.445-1.272-.951-1.512-1.734-.411-1.352.216-2.563.721-3.536.246-.475.583-1.123.494-1.351-.128-.327-.739-.864-1.144-1.22-.622-.547-1.114-.978-1.22-1.533-.196-1.057.487-1.83 1.036-2.45.351-.395.714-.805.694-1.112-.035-.224-.64-.769-.897-1.002-.473-.427-.848-.765-.848-1.286-.096-1.143.471-2.122.927-2.91.284-.491.579-1 .493-1.244-.086-.255-.522-.694-.812-.986-.39-.392-.727-.73-.902-1.117a.876.876 0 01-.076-.292c-.109-1.32.552-2.221 1.035-2.879.617-.84.784-1.065-.006-1.94l-.272-.297c-.739-.792-1.375-1.476-.804-3.098.274-.76.631-1.316.918-1.764.226-.352.438-.683.419-.844-.029-.225-.188-.357-.595-.65-.536-.386-1.347-.966-1.308-2.211.026-.845.415-1.541.759-2.154.477-.852.535-1.075.352-1.334-.117-.16-.674-.56-.972-.775-.412-.297-.768-.553-.985-.792a.852.852 0 01-.193-.341c-.284-.955-.075-1.722.108-2.399.066-.243.138-.496.184-.772.118-.697-.014-.928-.057-.983-.161-.2-.748-.232-1.178-.256-.702-.037-1.575-.085-1.954-.862-.297-.627-.258-1.373-.22-2.095.025-.5.058-1.123-.077-1.39-.141-.266-.546-.325-1.102-.377-.287-.027-.557-.054-.805-.147-.992-.372-1.254-1.26-1.445-1.91-.146-.499-.237-.744-.426-.835-.368-.175-1.128-.155-1.627-.142l-.413.007c-1.643.049-2.253-1.267-2.627-2.116-.456-1.031-.665-1.502-2.139-1.191-2.596.575-3.859-1.13-4.616-2.145-.205-.275-.416-.56-.556-.662a.879.879 0 011.04-1.415c.35.258.628.633.923 1.027.812 1.089 1.443 1.778 2.84 1.478 2.872-.612 3.648 1.147 4.113 2.197.403.914.547 1.071.996 1.071h.018l.374-.007c.706-.021 1.678-.045 2.432.313.916.445 1.168 1.298 1.351 1.922.155.524.231.707.384.764.084.024.211.029.351.042.661.063 1.891.18 2.493 1.317.353.699.31 1.542.271 2.287-.02.366-.042.802.002 1.075.147.02.358.031.515.041.761.042 1.803.098 2.454.913.453.567.591 1.344.416 2.371a9.83 9.83 0 01-.22.938c-.145.53-.227.861-.17 1.223.153.124.387.292.571.424.664.479 1.119.819 1.378 1.185.863 1.213.22 2.365-.252 3.207-.27.48-.523.934-.535 1.351-.01.271.065.365.574.73.498.357 1.182.847 1.313 1.855.098.796-.299 1.415-.681 2.013-.266.413-.538.84-.744 1.406-.214.615-.214.615.437 1.314l.291.315c1.749 1.937.767 3.272.118 4.157-.365.497-.687.933-.706 1.502.116.142.327.355.479.508.476.479 1.017 1.023 1.227 1.653.35.994-.173 1.896-.635 2.694-.346.6-.676 1.169-.696 1.765.075.073.172.156.276.25.592.536 1.402 1.267 1.472 2.185.063 1.047-.599 1.795-1.131 2.396-.279.313-.591.667-.625.889.128.151.438.423.652.611.628.553 1.341 1.178 1.621 1.904.377.965-.105 1.895-.572 2.793-.413.797-.804 1.55-.6 2.216.07.234.522.572.884.842.769.573 1.928 1.441 1.574 2.897-.171.695-.692 1.34-1.242 2.021-.444.548-.998 1.233-1.045 1.649-.025.234.186.454.669.896.654.599 1.642 1.504 1.318 3.076-.12.646-.575 1.127-1.102 1.683-.291.306-.62.654-.938 1.077-.708.938-.641 1.248-.64 1.252.03.113.549.35.771.45.673.305 1.688.765 1.784 1.898.082 1.069-.664 1.805-1.267 2.394-.154.153-.358.352-.499.524.091.05.19.101.281.149l.403.21c.517.277 1.216.73 1.335 1.487.124.791-.428 1.364-.915 1.872-.352.365-.713.742-.897 1.197a.87.87 0 01-.811.549zm-.756-39.234l.004.063a.26.26 0 00-.004-.063z"
        />
        <path
          fill="#613240"
          d="M101.452 97.924a.884.884 0 01-.354-.073l-.471-.202c-1.009-.42-2.391-.996-2.03-2.269.179-.62.719-1.108 1.241-1.583.179-.161.444-.401.603-.583a5.804 5.804 0 00-.87-.421c-.669-.275-1.791-.739-1.481-2.262.173-.9.868-1.649 1.481-2.313.412-.444 1.033-1.115.918-1.353-.085-.17-.574-.478-.867-.662-.428-.268-.83-.521-1.082-.872-.955-1.273.136-2.538 1.013-3.556.921-1.065 1.498-1.815 1.168-2.507-.185-.387-.948-.864-1.357-1.121-.428-.267-.735-.458-.887-.765-.574-.93-.091-1.959.265-2.717.164-.351.335-.714.387-.999.063-.347-.099-.558-.687-1.098-.518-.478-1.228-1.132-1.125-2.156.109-.983.755-1.863 1.276-2.571.214-.292.457-.621.526-.795.114-.277-.152-.58-.832-1.198-.45-.408-.913-.83-1.133-1.372-.57-1.355.472-2.872 1.233-3.981.197-.286.456-.664.552-.862-.082-.109-.321-.269-.473-.368-.55-.362-1.569-1.038-1.301-2.391.156-.791.559-1.364.882-1.825.46-.655.607-.911.413-1.472-.094-.275-.383-.546-.688-.833-.538-.502-1.207-1.129-1.187-2.151.022-.838.609-1.679 1.179-2.492.224-.322.456-.653.557-.863.32-.647.32-.647-.314-1.172-.203-.169-.429-.355-.662-.581-1.014-1.014-.419-2.371.06-3.462.562-1.28.729-1.882.318-2.29a17.838 17.838 0 00-.553-.509c-1.198-1.08-1.425-1.298-1.46-1.744-.011-1.165.183-1.943.324-2.511.036-.149.079-.324.1-.443-.167-.079-.56-.206-1.479-.381-2.098-.39-1.929-1.319-1.481-3.803l.092-.511c.063-.329.028-.438.028-.439-.017.037-.322.012-.522-.004-.418-.033-.892-.071-1.332-.293a.876.876 0 01-.426-.476c-.332-.886-.285-1.732-.247-2.414.023-.427.049-.912-.07-1.036-.045-.048-.325-.28-1.613-.249-2.019.083-2.238-1.653-2.348-2.486-.042-.322-.089-.689-.186-.843-.224-.37-.471-.414-1.606.013-.518.195-1.008.374-1.495.281-.976-.195-1.41-1.224-1.794-2.131-.155-.367-.414-.982-.577-1.099-.085-.042-.409.083-.672.182-.713.267-1.903.713-3.207-.271-.627-.474-1.065-.877-1.387-1.172-.444-.407-.604-.542-.773-.569-.198-.034-.589.113-.968.254-1.076.395-2.704.99-4.368-.663-.388-.388-1.219-1.511-1.367-1.849a.878.878 0 011.595-.73c.108.19.725 1.048 1.01 1.334.832.826 1.469.647 2.527.26.584-.214 1.183-.433 1.836-.342.717.113 1.149.509 1.695 1.011.312.286.699.642 1.259 1.065.514.387.841.287 1.532.027.564-.211 1.268-.473 2.033-.127.743.333 1.102 1.183 1.449 2.004.143.337.371.88.538 1.069.136-.036.359-.12.518-.179.869-.326 2.683-1.011 3.722.716.289.468.361 1.032.427 1.53.128.976.179.964.554.959 1.471-.036 2.37.207 2.928.782.653.673.604 1.565.562 2.354-.023.432-.048.877.03 1.303.114.014.241.024.359.033.56.044 1.327.104 1.804.729.333.438.425 1.021.278 1.785l-.09.502c-.132.729-.248 1.376-.265 1.7.112.025.251.052.344.069 1.469.282 2.287.538 2.689 1.167.371.582.217 1.203.068 1.805-.111.446-.245.987-.271 1.718.225.223.634.592.878.813.263.236.496.448.616.568 1.33 1.319.59 3.006.05 4.237-.206.472-.592 1.351-.435 1.507.187.179.376.337.549.479.762.628 1.707 1.411.774 3.291-.157.329-.419.705-.696 1.101-.3.427-.854 1.223-.862 1.529-.005.216.235.458.631.83.408.382.917.858 1.148 1.544.497 1.431-.158 2.365-.638 3.048-.273.392-.512.73-.597 1.159-.027.139-.039.196.548.585.498.328 1.252.827 1.282 1.79.034.563-.352 1.123-.883 1.897-.44.642-1.261 1.835-1.057 2.317.072.183.429.506.689.743.747.679 1.877 1.704 1.277 3.161-.151.373-.423.743-.738 1.171-.395.538-.889 1.209-.944 1.714-.014.145.296.43.569.681.583.538 1.466 1.352 1.224 2.702-.092.512-.321 1-.524 1.433-.137.291-.415.885-.364 1.039.081.06.197.127.327.208.641.4 1.608 1.006 2.012 1.854.849 1.775-.464 3.298-1.423 4.409-.335.39-.961 1.115-.94 1.353.097.119.407.313.613.443.562.353 1.196.751 1.509 1.371.645 1.326-.38 2.433-1.204 3.322-.453.488-.967 1.044-1.048 1.46-.024.118-.019.162-.019.162.007-.045.262.061.447.136.354.146.797.327 1.273.64.604.391.763.868.79 1.2.07.863-.651 1.517-1.287 2.09-.166.15-.406.368-.568.544.242.132.607.283.855.388l.506.216a.876.876 0 01-.355 1.678zm-1.346-21.159zm-1.136-17.21z"
        />
        <path
          fill="#613240"
          d="M106.915 94.613a.845.845 0 01-.391-.093c-.438-.218-1.463-.73-1.371-1.816.071-.832.855-1.482 1.687-2.173.442-.368.945-.785 1.11-1.064-.062-.2-.759-.537-1.132-.718-.825-.397-1.678-.81-1.811-1.651-.145-.835.308-1.517.786-2.24.326-.491.695-1.049.921-1.729.256-.744-.011-1.025-.69-1.646-.751-.685-2.005-1.828-.637-3.917.087-.134.203-.29.335-.465.425-.564 1.067-1.416.96-2.068-.049-.301-.27-.582-.672-.861-.248-.171-.474-.313-.673-.439-.827-.524-1.765-1.12-1.384-2.474.151-.521.529-1.017.93-1.541 1.108-1.45 1.221-1.901.605-2.417-.291-.242-.576-.436-.831-.61-.647-.444-1.316-.903-1.5-1.761-.267-1.325.505-2.466 1.127-3.383.306-.452.686-1.013.678-1.27-.006-.243-.708-.785-1.009-1.017-.373-.29-.696-.539-.91-.838-.874-1.194.314-2.457 1.27-3.473.341-.362.911-.967.97-1.2-.015-.229-.847-.694-1.246-.916-.517-.288-.961-.537-1.233-.909-1.27-1.711.129-3.473 1.053-4.639.301-.377.755-.949.788-1.161.044-.345-.353-.679-.876-1.079-.431-.327-.837-.639-.921-1.154-.222-.979.044-1.859.278-2.637.139-.457.269-.89.269-1.255.004-.518-.255-.723-1.146-1.161-.418-.206-.853-.42-1.203-.754a.872.872 0 01-.271-.598c-.063-1.494.216-2.562.419-3.341.179-.679.258-1.019.134-1.278a9.8 9.8 0 00-.537-.085c-.543-.079-1.288-.187-1.843-.786a.887.887 0 01-.211-.396c-.191-.824-.074-1.626.021-2.271a6.29 6.29 0 00.079-.725c-.278-.093-.507-.065-.762-.036-.334.041-.847.098-1.299-.273-.533-.436-.694-1.246-.809-2.588-.099-1.129-.34-1.383-.388-1.422-.087-.072-.388-.041-.652-.014-.466.047-1.049.109-1.613-.195-.581-.304-.815-.933-1.086-1.661-.092-.247-.193-.52-.319-.806-.175-.388-.214-.382-.82-.306-.536.067-1.428.179-2.116-.582a7.478 7.478 0 01-.499-.676c-.157-.23-.448-.657-.586-.742-.011.01-.267.009-.43.009-.361-.001-.771-.003-1.167-.11-.708-.181-1.178-.744-1.593-1.24-.305-.364-.62-.742-.868-.742h-.005c-.191 0-.441.052-.674.093-.439.079-.705.119-.949.086-1.004-.17-1.757-.952-2.362-1.582-.216-.224-.542-.562-.672-.624.016.021-.164.103-.283.157-.454.207-1.219.554-2.194.139-.909-.38-1.481-.877-1.941-1.277-.723-.628-.873-.763-2.031-.129-1.883 1.03-2.944.478-3.579.144-.136-.07-.29-.151-.357-.16a.876.876 0 01-.772-.971.89.89 0 01.971-.772c.393.045.701.207.974.349.498.263.859.452 1.921-.128 2.063-1.134 3.006-.543 4.026.344.401.349.817.71 1.472.983.262.112.403.058.783-.118.345-.156.771-.356 1.31-.281.618.068 1.092.56 1.638 1.128.427.443.958.995 1.367 1.064.021-.011.19-.048.374-.08.345-.062.711-.13 1.006-.121 1.047 0 1.709.791 2.193 1.371.232.277.522.624.696.668.187.05.473.052.725.053.44.003.896.003 1.283.216.492.282.839.791 1.175 1.284.128.186.247.366.364.5.044.05.132.062.582.005.673-.089 1.934-.245 2.644 1.334.144.326.256.629.359.906.107.287.254.68.337.776h.001c.03 0 .323-.03.537-.052.545-.055 1.296-.134 1.95.407.58.478.905 1.312 1.02 2.624.06.706.125 1.074.175 1.267.382-.046 1.012-.111 1.793.227 1.106.501.934 1.676.81 2.533-.064.444-.133.902-.093 1.327.162.067.396.102.642.137.575.083 1.447.209 1.863 1.055.412.86.204 1.652-.015 2.489-.173.661-.366 1.397-.372 2.412.146.086.322.172.504.262.851.419 2.137 1.05 2.126 2.741 0 .619-.176 1.197-.345 1.757-.178.592-.348 1.153-.262 1.66.075.065.194.157.289.229.646.493 1.727 1.317 1.551 2.706-.097.689-.586 1.305-1.152 2.019-1.028 1.296-1.417 1.965-1.015 2.508.08.083.438.284.675.417.883.493 2.092 1.168 2.142 2.435.036.845-.682 1.609-1.442 2.417-.336.356-.938.998-1.062 1.31.119.116.341.288.498.408.703.542 1.665 1.286 1.689 2.36.024.819-.485 1.571-.979 2.299-.483.713-.981 1.45-.862 2.042.035.164.378.399.776.672.294.202.622.428.96.71 2.047 1.711.499 3.74-.333 4.829-.259.339-.579.76-.638.957.027.123.365.338.638.51.216.138.459.292.727.477.806.556 1.281 1.237 1.41 2.024.225 1.391-.724 2.652-1.291 3.407-.105.14-.201.265-.271.371-.548.837-.375.994.351 1.657.722.655 1.811 1.65 1.172 3.505-.297.893-.752 1.582-1.119 2.136-.207.313-.458.69-.51.896.175.129.563.315.832.445.848.411 1.809.873 2.084 1.773.098.319.144.822-.199 1.412-.322.547-.923 1.046-1.504 1.527-.302.251-.771.64-.978.892.069.043.171.102.325.179a.877.877 0 01-.394 1.661zm-.177-7.804l.003.002-.003-.002z"
        />
        <path
          fill="#613240"
          d="M113.841 91.454a.876.876 0 01-.759-1.313c.204-.356.48-.678.747-.987.186-.214.546-.631.625-.843-.216-.14-.739-.307-1.038-.4-.766-.244-1.425-.455-1.734-1.018a.86.86 0 01-.094-.26c-.23-1.229.454-2.187 1.004-2.958.722-1.013.678-1.045.264-1.36-.224-.17-.504-.316-.801-.474-.711-.374-1.596-.841-1.854-1.851-.231-.901.093-1.949 1.05-3.398.966-1.469.735-1.644.112-2.106-.708-.533-2.029-1.52-.649-4.001.84-1.5.791-1.885.783-1.924-.028-.012-.24-.113-.396-.188-.429-.205-1.017-.486-1.494-1.102-1.01-1.363-.001-2.853.737-3.942.306-.451.765-1.13.752-1.394-.016-.31-.219-.483-.824-.846-.477-.287-1.07-.643-1.261-1.325-.293-1.053.407-2.017 1.024-2.865.852-1.171 1.07-1.636.693-2.082-.128-.155-.286-.302-.447-.455-.372-.354-.793-.755-1.034-1.271-.477-1.05.122-2.218.651-3.247.235-.459.629-1.227.582-1.467-.071-.079-.545-.391-.827-.579-.483-.318-.938-.621-1.215-.975a.873.873 0 01-.179-.422c-.202-1.496.605-2.53 1.194-3.286.434-.555.698-.913.662-1.245-.025-.224-.076-.307-.925-.51-.66-.157-1.563-.373-1.986-1.248-.4-.829-.227-1.959.566-3.665.776-1.646.594-2.056.592-2.06-.11-.08-.65-.09-.942-.096-.532-.011-1.082-.021-1.539-.276a.88.88 0 01-.415-.522c-.268-.923.077-1.954.381-2.862.14-.419.371-1.109.333-1.349-.023.007-.142-.018-.398-.018-.063 0-.135.002-.218.007l-.275.016c-1.308.091-2.062.115-2.413-.512a.715.715 0 01-.055-.119c-.19-.503-.13-1.277-.017-2.496.041-.436.104-1.095.08-1.27-.066-.018-.39-.013-.606-.009-.843.014-2.408.036-2.915-1.971-.031-.13-.063-.303-.102-.506-.062-.334-.231-1.263-.414-1.667a5.482 5.482 0 00-.624.185c-.633.215-1.353.46-2.023.104-.582-.304-.805-1.039-1.114-2.056-.146-.483-.393-1.291-.568-1.481-.04.027-.396.212-.609.323-.623.324-1.783.928-2.654-.041-.224-.249-.407-.587-.604-.947-.164-.301-.47-.862-.64-.965-.062.01-.5.11-.735.164-.338.077-.665.139-.941.144-1.104 0-1.807-.951-2.322-1.647-.164-.224-.414-.562-.526-.63-.271-.121-.494-.109-.837-.091-.457.024-1.091.054-1.808-.354a12.573 12.573 0 01-1.072-.682c-.73-.505-.729-.51-1.642.108-1.204.805-1.999.767-3.154-.145-1.77-1.417-1.771-1.417-2.466-1.201a12.02 12.02 0 01-1.148.307c-.622.121-1.302-.035-2.093-.216-1.13-.259-2.412-.556-3.681-.127a4.036 4.036 0 00-.772.367.876.876 0 11-.935-1.484 5.925 5.925 0 011.125-.537c1.761-.594 3.436-.209 4.657.071.519.118 1.105.257 1.351.208.412-.087.724-.186.978-.264 1.478-.458 1.933-.215 4.079 1.504.539.424.538.424 1.082.062 1.712-1.155 2.451-.903 3.62-.095.249.173.548.379.935.597.27.153.459.153.861.13.437-.022.981-.048 1.639.241.503.215.852.689 1.221 1.189.261.354.729.933.934.936.101 0 .356-.061.526-.099.646-.149 1.38-.319 1.974.009.61.334.995 1.04 1.336 1.662.103.19.227.417.315.545.153-.046.42-.184.592-.273.632-.33 1.814-.945 2.712.048.443.477.691 1.292.954 2.155.095.311.228.748.332.989.133-.042.393-.13.564-.188.496-.168 1.057-.358 1.629-.274 1.157.164 1.458 1.792 1.699 3.099.03.17.057.313.079.409.157.625.342.645 1.184.632.667-.008 1.925-.028 2.324 1.308.112.362.068.897-.023 1.891a24.68 24.68 0 00-.097 1.251c.27-.008.57-.031.71-.04l.317-.021c.357-.015 1.499-.085 2.109.712.632.826.27 1.911-.08 2.959-.146.433-.314.938-.369 1.341l.313.008c.779.016 1.849.037 2.401.929.495.799.343 1.948-.496 3.727-.771 1.658-.599 2.108-.577 2.154.062.127.497.23.814.306.778.187 2.08.497 2.263 2.021.112 1.066-.491 1.839-1.023 2.521-.508.651-.839 1.118-.854 1.695.177.139.442.315.639.443.641.426 1.246.825 1.479 1.371.392.929-.134 1.951-.641 2.94-.259.504-.741 1.442-.619 1.71.098.208.392.488.651.736.213.203.418.401.581.599 1.325 1.565.155 3.175-.618 4.241-.308.421-.819 1.127-.755 1.362.035.027.301.185.476.292.641.385 1.608.967 1.673 2.262.043.849-.488 1.636-1.052 2.467-.469.69-1.05 1.549-.793 1.898.212.27.51.413.855.579.457.218 1.081.518 1.312 1.245.241.761-.019 1.688-.926 3.304-.632 1.139-.447 1.28.17 1.74 1.053.787 2.031 1.848.302 4.48-.862 1.304-.858 1.829-.816 1.994.066.258.507.489.975.734.327.174.7.371 1.042.628 1.813 1.38.701 2.939.104 3.777-.331.466-.648.911-.71 1.324.182.073.445.158.64.219.946.302 2.124.676 2.262 1.763.13.933-.525 1.693-1.054 2.303-.223.257-.434.502-.554.711a.902.902 0 01-.771.442zm-.717-5.527zm-14.09-65.205z"
        />
        <path
          fill="#613240"
          d="M119.259 87.664a.886.886 0 01-.514-.166c-.391-.284-.934-.969-.176-2.37.542-1.013.665-1.502.688-1.705a5.342 5.342 0 00-.471-.04c-.6-.033-2.003-.109-2.099-1.532-.063-.803.437-1.519.919-2.211.597-.857.837-1.296.683-1.619-.145-.099-.48-.273-.711-.394-.791-.413-1.213-.646-1.433-1.009a.82.82 0 01-.115-.305c-.254-1.479.635-2.704 1.282-3.599.262-.361.619-.856.641-1.065-.07-.054-.552-.274-.811-.393-.604-.276-1.286-.593-1.545-1.256-.392-1.021.028-2.107.433-3.158.318-.825.648-1.678.51-2.324-.177-.78-.632-1.241-1.116-1.728-.49-.494-1.048-1.054-1.154-1.917-.148-1.167.521-2.274 1.168-3.344.841-1.39 1.071-1.948.695-2.302-.142-.127-.293-.217-.448-.313a5.018 5.018 0 01-.859-.631c-1.19-1.137-.386-2.609.204-3.685.325-.596.73-1.338.622-1.683-.053-.165-.282-.306-.466-.396-1.448-.725-1.884-.943-2.037-1.656-.212-.976.358-1.832.861-2.588.237-.357.635-.956.583-1.157-.012-.049-.12-.186-.442-.351-.964-.499-1.533-1.071-1.74-1.751-.274-.905.164-1.7.518-2.338.514-.929.686-1.242-.236-1.915-1.859-1.358-1.781-2.977-1.725-4.158.046-.962.022-1.358-.407-1.71-.246-.2-.53-.341-.807-.479-.563-.279-1.261-.626-1.429-1.496-.161-.827.032-1.611.188-2.241.1-.404.224-.907.127-1.052-.017-.026-.192-.257-1.126-.406-1.833-.286-1.799-1.734-1.778-2.6.011-.474.022-.963-.139-1.43-.066-.195-.137-.279-1.068-.198-.629.057-1.415.125-1.892-.508a.876.876 0 01-.146-.293c-.268-.96-.37-1.745-.453-2.376-.051-.396-.116-.889-.194-1.007-.047.031-.518.151-.799.221-.877.222-2.352.594-3.141-.715a9.2 9.2 0 01-.354-.781c-.127-.3-.39-.923-.569-1.264-.309.016-.592.13-.908.257-1.014.408-2.172.675-3.12-1.292-.306-.629-.499-.915-.603-1.038l-.028.013c-.338.139-.903.374-1.695.124-.56-.176-.909-.538-1.189-.829-.382-.396-.473-.493-1.023-.309-2.109.671-2.467.474-4.014-1.227-.531-.593-.634-.54-1.296-.169-.595.33-1.496.827-2.625.258-.158-.079-.479-.303-.797-.531-.096-.07-.191-.141-.28-.202l-.206.093c-1.688.764-1.982.667-4.122-.473l-.125-.063c-.684-.357-1.136-.226-2.014.08-1.231.43-2.92 1.017-5.572-.812-.399-.274-.499-.821-.223-1.22s.821-.5 1.22-.224c1.917 1.321 2.88.989 3.997.599.899-.313 2.021-.704 3.411.025l.127.067c1.612.858 1.614.858 2.573.424l.638-.285a.9.9 0 01.351-.073c.36 0 .604.175 1.251.644.221.159.44.322.56.387.274.137.44.078.984-.226.693-.387 1.986-1.1 3.449.528 1.004 1.104 1.003 1.106 2.151.738 1.609-.534 2.386.275 2.848.755.171.178.317.33.449.372.177.056.256.03.504-.073 1.379-.565 2.075.226 2.878 1.887.248.514.4.6.401.6.057-.002.315-.106.485-.174.504-.202 1.189-.477 2.07-.355.727.054 1.053.826 1.679 2.309.107.258.196.475.248.57.091.151.478.09 1.199-.094.779-.197 1.66-.419 2.358.142.591.481.685 1.204.806 2.119.062.469.134 1.033.286 1.68.104-.006.219-.016.31-.023.765-.067 2.35-.205 2.882 1.38.264.756.246 1.468.232 2.04-.007.26-.016.652.038.755.007 0 .076.04.261.069 1.177.189 1.911.561 2.316 1.169.521.788.304 1.667.112 2.443-.131.534-.256 1.038-.168 1.487.039.035.298.164.485.258.329.163.737.365 1.138.691 1.155.945 1.095 2.169 1.048 3.154-.051 1.078-.088 1.855 1.009 2.656 2.172 1.585 1.237 3.273.735 4.18-.202.367-.433.784-.374.978.021.071.148.331.868.702.733.38 1.182.875 1.335 1.472.248.96-.321 1.814-.822 2.569-.24.361-.558.838-.605 1.124.249.148.768.408 1.103.575.707.349 1.165.833 1.357 1.44.335 1.059-.245 2.119-.757 3.054-.332.609-.748 1.366-.541 1.565.189.174.371.287.58.416.217.134.464.286.717.517 1.49 1.398.406 3.19-.384 4.498-.469.776-1 1.654-.929 2.217.032.258.271.51.659.899.547.551 1.295 1.305 1.584 2.587.25 1.167-.194 2.317-.586 3.333-.286.741-.582 1.507-.433 1.893l.641.293c.723.331 1.93.886 1.825 2.152-.073.694-.507 1.295-.968 1.93-.471.65-.955 1.32-.99 1.978.188.11.46.254.646.351.713.372 1.094.58 1.31.889.941 1.393-.019 2.771-.652 3.683-.193.278-.493.707-.583.955.125.016.293.025.418.032.594.031 1.49.081 1.931.862.415.74.206 1.777-.698 3.469-.076.143-.12.243-.144.311.216.3.228.716 0 1.031a.878.878 0 01-.711.358zM97.402 14.296h.003-.003zm-.001 0zm-.002 0z"
        />
        <path
          fill="#613240"
          d="M112.553 24.148a2.4 2.4 0 01-1.287-.365c-1.651-1.005-1.485-2.751-1.364-4.026.034-.368.067-.718.063-1.028-.668.307-2.078.824-3.139-.806-.412-.626-.448-1.319-.478-1.876-.037-.702-.082-.854-.285-.96-.07-.007-.356.054-.526.094-.558.137-1.49.367-2.217-.396-.65-.672-.717-1.738-.778-2.769-.03-.506-.063-1.029-.166-1.301a1.169 1.169 0 00-.051-.12 5.918 5.918 0 00-.619.436c-.602.463-1.425 1.091-2.28.637-.708-.388-.961-1.293-1.229-2.25-.109-.385-.301-1.068-.466-1.319-.172.033-.364.122-.565.217-.648.3-1.853.857-3.011-.671-.144-.19-.541-.664-.813-.941-.19.132-.479.376-.672.54-.485.413-.988.84-1.563.955-1.094.241-1.748-.806-2.273-1.648-.221-.354-.681-1.089-.901-1.132-.354.112-.706.375-1.048.632-.59.444-1.485 1.118-2.363.456-.233-.159-.464-.452-.813-.913a7.479 7.479 0 01-.106-.142c-.368.209-.672.437-.95.644-.636.478-1.432 1.07-2.418.576-.595-.297-.99-.538-1.286-.718-.169-.105-.379-.232-.436-.244-.118-.023-.68.188-1.275.405l-.383.138c-1.255.459-2.061.244-2.712.072-.583-.157-.937-.249-1.722.127-.487.235-.835.425-1.107.572-1.211.658-1.416.649-3.266.327l-.38-.065a5.019 5.019 0 01-.288-.041l-.152-.024a.88.88 0 01-.748-.991.876.876 0 01.99-.749l.21.034c.069.011.135.025.203.03l.465.077c1.417.245 1.417.246 2.13-.141.289-.156.661-.358 1.18-.61 1.37-.659 2.237-.429 2.937-.244.534.142.924.244 1.662-.024l.382-.139c1.74-.632 2.063-.72 3.224-.012.266.161.622.377 1.158.646.063-.022.363-.247.582-.412.437-.325 1.032-.77 1.853-1.121a.871.871 0 01.676-.004c.338.138.568.428.979.968.088.116.214.281.316.406.126-.082.287-.203.407-.293.416-.312.934-.702 1.553-.896 1.477-.472 2.354.936 2.938 1.871.163.258.391.626.55.8.192-.116.478-.356.662-.515.588-.5 1.197-1.016 1.936-1.048.261.003.788-.001 2.085 1.73.303.4.305.4.872.135.365-.169.82-.379 1.38-.392h.052c1.295 0 1.699 1.448 2.027 2.615.082.295.206.736.32 1.011.142-.094.31-.224.43-.316.6-.461 1.346-1.034 2.197-.794.525.148.924.568 1.182 1.245.199.524.238 1.153.279 1.821.032.542.087 1.447.292 1.659.078.022.359-.051.532-.091.478-.119 1.134-.279 1.764.057 1.121.588 1.179 1.691 1.218 2.42.022.4.042.777.193 1.009.284.438.365.447 1.062.113.433-.206 1.021-.494 1.621-.153.561.318.68.951.722 1.4.053.525 0 1.073-.05 1.601-.128 1.339-.116 1.968.532 2.363.356.219.773.083 1.576-.253.767-.32 1.63-.684 2.546-.312.45.183.665.695.481 1.144a.876.876 0 01-1.144.481c-.243-.096-.731.107-1.204.306-.534.222-1.186.495-1.885.495zM97.852 8.083h-.003.003zm-4.713-1.572z"
        />
        <g>
          <path
            fill="#4D2631"
            d="M70.229 11.582c.264-.786-.49-1.451-.744-2.145-.179-.493.319-1.181.392-2.298.074-.988.761-1.832.997-2.732.453-1.737-1.305-3.125-2.82-2.577-.628.226-1.267.754-1.878.486-.667-.293-.768-1.344-1.435-1.636-1.254-.547-2.517 2.334-3.626 1.246-.583-.572-.003-1.607-2.551-1.939-1.187-.154-1.051.597-1.494 1.442C55.71 4.016 53.688.01 52.144.3c-1.195.236-1.4 2.619-2.641 2.82-1.445.253-3.149-2.415-4.877-.127-.662.884-.948 1.951-1.736 2.639-1.355 1.192-2.839.106-4.3.434-1.468.333-1.23 1.754-1.532 3.371-.259 1.415-.298 1.146-2.15 1.487-4.245.789-1.39 4.555-3.191 5.608-.638.395-2.734.712-3.107 1.824-.35 1.047.492 2.427.374 3.392-.247 2.018-2.119 1.325-2.474 3.523-.214 1.279.434 2.778.001 3.403-1.933 1.143-2.744 1.476-2.867 1.981-.37 1.731 1.963 3.041.807 4.108-.342.33-1.183.798-1.486 1.303-1.226 2.019 1.758 4.132-.29 5.141-4.478 2.242-.713 3.4-.876 5.035-.246.836-2.082 1.011-2.517 1.9-1.119 2.256 2.162 4.021 1.911 4.983-.273 1.062-3.302 1.851-2.318 3.964.64 1.379 2.535 2.351 2.045 3.734-.334.949-1.916 1.167-1.836 2.595.077 1.37 2.2 1.941 2.109 2.857-.093.954-2.689 1.33-1.948 3.066.496 1.17 1.941 1.627 1.557 2.517-.414.899-2.075 1.14-1.633 2.515.442 1.34 2.394 1.356 1.787 3.114-.371 1.084-.97 1.727-.265 2.807.68 1.057 1.663 1.112 2.355 2.285.806 1.385-.168 2.822 1.162 3.484.776.391 1.612.443 2.113.67 2.13 1.007 1.106 4.7 3.745 5.117.972.159 1.302-.188 2.091-.124 2.461.168 1.574 3.423 4.314 3.483 5.113.113 3.546 2.663 6.334 3.183 1.127.218 1.757-.366 2.776-.165 1.901.375 1.853 2.541 4.2 2.169 2.781-.437.463-3.532.414-3.956.552-1.171 1.96-2.455-.695-3.837-3.432-1.785 1.371-2.318 1.02-4.293-.358-1.995-4.248-2.512-3.086-4.744.554-1.059 2.435-1.706 2.491-2.889.08-1.657-2.669-2.712-2.747-3.786-.21-2.87 5.588-2.354 1.078-6.784-2.443-2.374 1.179-3.173 1.657-4.679.66-2.075-2.246-4.769.222-6.611.537-.409 2.773-1.47 2.944-2 .456-1.401-1.673-3.427-1.362-4.983.292-1.461 2.028-1.521 2.574-2.467.794-1.348-2.31-3.549-1.897-5.319.354-1.593 2.742-1.399 2.91-2.795.292-2.185-2.581-4.881.375-6.042 1.977-.797.387-4.166 1.9-5.504.796-.705 2.584-.16 3.32-.808 1.305-3.016.867-2.377 1.162-2.837.77-1.196 2.389.224 3.499-.689.423-.349.367-2.391.766-3.105.323-.576.903-.601 1.754-.718 2.529-.349.338-3.229 2.202-4.982 1.534-1.419 1.198-1.183-.21-2.862-.732-.865-.197-1.039.157-2.124z"
          />
          <path
            fill="#613240"
            d="M41.355 98.59a.857.857 0 01-.582-.227.976.976 0 01-.233-.325c-.7-1.695 1.045-2.543 2.088-3.051 1.098-.533 1.424-.778 1.34-1.006-.147-.408-.739-.703-1.311-.991-.775-.389-1.652-.827-1.764-1.796-.098-.846.448-1.697 1.826-2.845.513-.427.562-.63.563-.633-.078-.104-.665-.424-.98-.597-.784-.425-1.672-.91-1.786-1.84-.132-1.158.803-1.83 1.488-2.324.297-.215.606-.436.747-.629.12-.166.161-.224-.564-.943-.67-.663-1.682-1.668-1.142-3.126.275-.779.871-1.267 1.349-1.656.689-.563.693-.648.603-.928-.109-.364-.395-.697-.698-1.049-.563-.654-1.332-1.553-.887-2.843.2-.593.63-1.014 1.046-1.42.331-.326.644-.633.835-1.014.233-.474.062-.812-.61-1.651-.321-.4-.652-.816-.825-1.305-.473-1.486.646-2.405 1.462-3.077.943-.775 1.109-1.031.941-1.441-.159-.367-.506-.753-.843-1.126-.516-.572-1.049-1.164-1.049-1.923.015-1.143 1.021-1.773 1.832-2.279.286-.18.583-.365.749-.521.329-.313.333-.537.336-.611.014-.558-.682-1.283-1.056-1.673-.3-.312-.498-.519-.583-.811-.427-1.57.731-2.083 1.577-2.456.241-.106.514-.227.813-.382.547-.283.626-.46.626-.461-.027-.141-.461-.592-.694-.835-.622-.647-1.473-1.536-1.109-2.645.222-.732.98-1.274 1.648-1.75.195-.139.489-.349.561-.433.009-.162-.34-.681-.55-.99-.625-.926-1.569-2.325-.493-3.732.455-.586 1.259-.89 2.035-1.184.345-.131.922-.349 1.051-.48.114-.143-.286-1.013-.457-1.384-.343-.744-.698-1.514-.619-2.287.097-1.041.96-1.599 1.653-2.046.213-.138.43-.277.586-.409.096-.777.079-.874.039-1.114a9.668 9.668 0 01-.128-1.309c-.073-1.359.192-2.295.809-2.855.807-.729 1.897-.561 2.693-.439.241.038.58.086.765.08.071-.181.146-.563.194-.806.141-.725.286-1.473.808-1.931.608-.524 1.402-.467 2.101-.418.574.04 1.016.057 1.104-.113.159-.32.264-.683.367-1.035.196-.68.401-1.383 1.054-1.756.841-.5 1.719-.192 2.357.032.81.286.835.24.988 0 .093-.142.184-.371.293-.624.326-.757.695-1.615 1.322-1.987.641-.371 1.327-.222 1.987-.083.684.144 1.391.296 2.237.035a.878.878 0 01.517 1.678c-1.279.394-2.343.168-3.119.004-.272-.058-.646-.131-.759-.108-.126.119-.428.819-.573 1.155-.152.354-.284.661-.434.887-.925 1.443-2.301.961-3.042.699-.347-.121-.739-.258-.89-.171-.064.075-.178.468-.254.729-.118.406-.251.865-.487 1.341-.631 1.219-1.932 1.127-2.792 1.068-.271-.021-.727-.052-.849.008-.051.09-.153.613-.213.927-.136.693-.275 1.41-.775 1.833-.613.531-1.442.405-2.173.292-.445-.069-1.063-.163-1.248.006-.145.131-.282.585-.235 1.467.029.633.073.908.106 1.106.083.489.086.742-.065 1.918a.895.895 0 01-.189.441c-.315.387-.74.661-1.15.926-.354.229-.84.542-.858.743-.031.305.244.901.465 1.383.457.991 1.026 2.227.223 3.227-.392.482-1.071.74-1.79 1.013-.418.157-1.118.422-1.266.613-.263.342-.092.72.557 1.68.535.794 1.347 1.995.458 3.078-.204.255-.528.487-.905.755-.295.21-.908.648-.996.857.014.175.462.644.704.895.588.612 1.319 1.375 1.158 2.351-.112.675-.619 1.238-1.546 1.717-.333.175-.642.311-.914.431-.209.093-.459.202-.592.283.045.048.099.104.158.163.588.615 1.573 1.642 1.543 2.929-.017.684-.314 1.303-.885 1.843-.292.279-.665.512-1.024.736-.25.156-1.004.629-1.006.804.034.11.373.486.597.736.411.455.877.973 1.156 1.619.704 1.713-.588 2.775-1.444 3.48-.75.616-1 .885-.912 1.164.064.183.301.479.53.766.628.785 1.579 1.972.812 3.527-.324.648-.798 1.114-1.179 1.487-.28.274-.544.535-.612.734-.105.304.025.512.558 1.133.389.452.829.964 1.041 1.666.477 1.47-.513 2.278-1.169 2.813-.356.293-.693.565-.809.894-.131.355.058.617.729 1.284.625.62 1.789 1.775.748 3.219-.309.424-.731.728-1.14 1.022-.244.175-.749.539-.771.687.07.069.579.348.883.515.796.433 1.788.974 1.886 1.998.102 1.053-.867 1.855-1.186 2.121-1.134.941-1.202 1.308-1.205 1.322.063.027.511.251.807.399.799.399 1.792.897 2.173 1.96.659 1.783-1.145 2.66-2.222 3.184-.4.193-1.137.553-1.25.764a.882.882 0 01-.138.971.897.897 0 01-.653.286z"
          />
          <path
            fill="#613240"
            d="M36.449 96.089a.878.878 0 01-.865-.734c-.015-.09-.064-.21-.121-.352-.165-.409-.414-1.023-.188-1.858.228-.822.948-1.344 1.528-1.762.201-.146.518-.375.643-.518-.201-.29-.696-.76-1.03-1.078-.541-.514-.83-.794-.973-1.065-.63-1.195.266-2.183.859-2.833.886-.98 1.084-1.27.251-2.073-.776-.754-1.127-1.458-1.078-2.157.069-.967.864-1.54 1.501-2.001.348-.252.825-.595.849-.814.015-.129-.101-.411-.463-.821-.352-.392-.684-.699-.961-.958-.624-.582-1.164-1.083-1.15-1.869.014-.789.591-1.442 1.584-2.303.561-.493.864-.938.871-1.282.01-.472-.551-1.009-1.094-1.529-.745-.713-1.589-1.522-1.375-2.645.189-.967 1.081-1.446 1.798-1.83.436-.231.885-.473 1.056-.733.009-.281-.732-.945-1.089-1.263-.702-.63-1.308-1.173-1.369-1.901-.056-1.157.839-1.811 1.559-2.335.924-.676 1.084-.895.951-1.304-.167-.508-.455-.917-.735-1.313-.412-.585-.879-1.25-.659-2.076.208-.784.963-1.416 2.605-2.183.432-.206.616-.397.641-.499.069-.294-.5-1.034-.875-1.524-.655-.854-1.399-1.821-1.258-2.901.167-1.323 1.214-1.755 1.908-2.04.899-.371 1.271-.524.549-2.452-.534-1.452-.578-2.499-.139-3.298.528-.962 1.561-1.188 2.315-1.354a5.19 5.19 0 00.649-.169l-.018-.074c-.065-.235-.292-.652-.511-1.056-.504-.925-1.077-1.973-.938-2.92.222-1.689 1.44-1.94 2.169-2.089.773-.159 1.241-.256.918-2.663-.386-3.046 1.346-3.425 2.277-3.629.159-.035.407-.09.521-.143.119-.343.146-.772.178-1.26.051-.814.111-1.738.627-2.651.938-1.645 2.38-1.102 3.154-.812.699.261.884.282 1.053.129.098-.103.321-.636.47-.988.486-1.156 1.091-2.595 2.411-2.658.437-.029.878.059 1.304.149.622.129 1.018.197 1.253.008.159-.128.308-.332.479-.567.251-.345.564-.775 1.052-1.13.813-.585 1.704-.439 2.419-.321.421.071.818.137 1.196.081.4-.061.841-.393 1.268-.711.367-.276.713-.536 1.104-.689.573-.208 1.17-.196 1.797-.182.912.02 1.844.039 2.833-.532a.878.878 0 01.88 1.517c-1.416.82-2.768.789-3.751.77-.457-.01-.896-.019-1.139.069-.148.058-.414.258-.671.452-.544.408-1.223.917-2.06 1.042-.651.1-1.232.004-1.745-.083-.567-.094-.896-.139-1.101.009-.261.189-.447.447-.663.744-.213.292-.456.625-.796.9-.901.722-1.949.502-2.714.343-.324-.067-.633-.125-.837-.115-.276.105-.713 1.144-.9 1.587-.275.655-.514 1.222-.877 1.581-1.018.937-2.138.521-2.878.241-.815-.307-.831-.281-1.011.035-.318.563-.359 1.21-.403 1.898-.042.671-.087 1.366-.393 2.026a.896.896 0 01-.1.165c-.431.563-1.069.701-1.581.814-.797.175-1.097.241-.913 1.689.449 3.349-.549 4.247-2.306 4.608-.662.137-.724.162-.784.613-.055.379.443 1.292.741 1.838.281.513.546.999.664 1.431.154.559.108 1.048-.135 1.451-.4.662-1.151.827-1.813.972-.496.108-1.008.221-1.153.483-.076.142-.208.604.247 1.843 1.214 3.243-.152 4.119-1.528 4.684-.676.28-.802.375-.835.643-.048.362.505 1.082.909 1.607.682.888 1.456 1.893 1.189 3.003-.167.696-.69 1.244-1.599 1.677-1.472.688-1.645 1.017-1.66 1.053.022.068.241.381.401.608.32.453.719 1.019.968 1.778.558 1.702-.782 2.681-1.583 3.266-.339.248-.851.623-.843.803.055.051.497.447.789.708.877.785 2.342 2.099 1.381 3.54-.412.628-1.09.993-1.69 1.314-.285.152-.875.468-.904.613-.036.183.574.767.865 1.046.74.708 1.662 1.591 1.635 2.833-.018.873-.5 1.712-1.472 2.566-.844.733-.969.987-.987 1.048.042.004.35.289.595.52.31.287.678.631 1.074 1.072.683.771.977 1.482.899 2.182-.11.993-.917 1.577-1.566 2.046-.25.18-.767.554-.779.705-.004.062.085.32.548.77 2.089 2.019.561 3.703-.174 4.513-.226.248-.605.664-.616.821.058.072.396.393.64.627.522.495 1.063 1.008 1.328 1.437.887 1.404-.47 2.383-1.122 2.854-.338.243-.801.576-.863.803-.067.249-.011.404.123.735.084.207.179.441.226.723a.878.878 0 01-.722 1.01 3.606 3.606 0 01-.146.004z"
          />
          <path
            fill="#613240"
            d="M29.945 92.694a.883.883 0 01-.884-.877c0-.377.237-.701.571-.823.258-.125.574-.262.941-.417.785-.337.906-.558.908-.56-.035-.095-.383-.501-.614-.77-.296-.344-.63-.734-.888-1.182-.802-1.385.373-2.268 1.004-2.741.208-.157.432-.322.634-.517.196-.189.432-.469.429-.71-.004-.39-.579-.921-1.041-1.349-.701-.648-1.573-1.455-1.1-2.493.138-.326.416-.611.738-.94.927-.951 1.29-1.502.63-2.437-.094-.135-.273-.341-.466-.566-.507-.597-.85-1.013-1-1.351-.464-1.106.267-2.015.801-2.679.675-.838.942-1.27.671-1.887-.207-.465-.473-.737-.811-1.083-.239-.243-.51-.518-.757-.876-.902-1.317.231-2.17.775-2.58.37-.277.751-.565 1.02-.986.178-.292-.19-.763-.936-1.523a8.831 8.831 0 01-.588-.64c-1.122-1.419-.026-2.463.5-2.966.56-.534.71-.743.636-1.101-.068-.326-.26-.691-.445-1.043-.353-.671-.792-1.505-.411-2.368.221-.487.573-.87.884-1.208.538-.586.693-.817.615-1.118-.089-.347-.288-.743-.499-1.161-.549-1.092-1.379-2.743.199-3.975.484-.38 1.114-.625 1.722-.861.41-.159 1.371-.532 1.381-.746.033-.576-.453-1.243-.923-1.89-.658-.903-1.405-1.929-.93-3.083.318-.753 1.228-1.161 2.106-1.555.322-.144.724-.324.851-.428.068-.154-.114-.76-.224-1.121-.334-1.109-.955-3.174 1.336-4.228.21-.1.627-.316.918-.484-.081-.409-.286-.885-.484-1.35-.421-.981-.898-2.092-.258-3.006.283-.426.818-.547 2.464-.865.226-.045.5-.097.715-.144.083-.511.039-1.176-.004-1.823-.074-1.1-.149-2.235.42-3.077.461-.678 1.333-.766 2.178-.852a8.48 8.48 0 00.745-.099c.107-.524.125-1.047.141-1.518.028-.884.058-1.796.789-2.317.719-.516 1.729-.3 2.527-.055.526.166.676.127.681.125.055-.05.201-.353.308-.574.155-.323.338-.696.599-1.103.918-1.422 2.016-1.271 2.738-1.173.336.047.627.086.934.016.2-.044.49-.293.771-.535.511-.44 1.148-.987 2.048-1.061.34-.034.694.004 1.034.039.268.028.72.076.845.015.385-.276.68-.494.92-.672 1.146-.846 1.428-1.019 2.558-.729.195.049.444.113.781.177.325.072.666-.162 1.188-.539.508-.368 1.084-.785 1.828-.874.837-.097 1.557.149 2.194.37.88.307 1.414.461 2.13.078.137-.075.272-.159.401-.238.309-.189.601-.369.942-.471a.878.878 0 01.503 1.682c-.121.036-.316.157-.526.284-.151.093-.311.191-.484.287-1.438.764-2.604.361-3.54.036-.524-.181-.977-.336-1.412-.285-.292.035-.639.286-1.007.552-.653.473-1.472 1.058-2.559.84-.372-.073-.651-.144-.871-.199a3.412 3.412 0 00-.364-.082c-.054.029-.377.268-.72.521-.246.182-.548.405-.93.678-.605.466-1.414.381-2.059.313-.256-.026-.521-.057-.696-.038-.345.03-.694.329-1.063.646-.421.362-.9.774-1.528.917-.615.138-1.136.069-1.555.01-.633-.084-.715-.096-1.026.382-.215.338-.365.65-.494.917-.537 1.109-1.143 1.982-3.093 1.361-.788-.242-1.01-.174-1.02-.172.01.063-.006.562-.018.925-.022.664-.05 1.49-.314 2.364a.873.873 0 01-.335.461c-.491.345-1.163.414-1.813.479-.313.033-.836.085-.977.169-.156.263-.099 1.131-.047 1.897.063.942.134 2.011-.201 2.933-.231.545-.591.614-1.928.874-.372.073-.987.19-1.35.286.044.292.274.827.422 1.171.329.766.701 1.634.661 2.512a.886.886 0 01-.152.454c-.248.363-1.123.827-1.813 1.153-.823.378-.807.766-.396 2.13.274.912.65 2.159-.342 2.981-.313.255-.746.451-1.249.675-.38.171-1.086.487-1.227.671-.075.197.402.853.752 1.333.622.853 1.327 1.821 1.257 3.015-.063 1.343-1.413 1.868-2.499 2.289-.488.19-.994.386-1.274.607-.352.275-.355.53.286 1.806.243.482.495.983.629 1.511.331 1.272-.451 2.122-1.021 2.744-.243.265-.473.516-.573.738-.014.122.221.568.362.834.23.438.49.934.61 1.501.283 1.37-.575 2.188-1.143 2.731-.153.146-.38.362-.436.469.011.008.038.058.098.134.121.152.291.322.468.504.788.805 2.106 2.152 1.171 3.68-.446.705-1.028 1.142-1.454 1.46-.104.079-.232.176-.328.255.162.219.323.384.506.569.388.395.829.844 1.164 1.604.729 1.662-.257 2.885-.909 3.696-.214.267-.61.758-.558.884.072.139.497.638.726.906.237.279.453.537.566.699 1.57 2.224-.039 3.872-.811 4.665-.099.102-.22.227-.305.322.136.171.408.421.602.601.709.655 1.592 1.472 1.604 2.617.007.696-.318 1.366-.968 1.993a8.346 8.346 0 01-.798.655c-.209.156-.524.395-.58.501.219.269.484.578.741.876.563.655 1.202 1.398.985 2.329-.214.93-1.199 1.447-1.923 1.758-.369.156-.679.289-.924.411a.79.79 0 01-.386.096z"
          />
          <path
            fill="#613240"
            d="M23.629 86.401a.878.878 0 01-.545-1.566c.368-.29.761-.533 1.142-.769.393-.242 1.124-.694 1.16-.902.005-.021-.021-.146-.208-.382-.225-.28-.438-.521-.626-.735-.599-.684-1.116-1.273-1.045-2.086.067-.77.641-1.375 1.48-2.048.608-.491.643-.733.646-.76.013-.163-.334-.543-.587-.82-.475-.523-1.066-1.173-1.238-2.092-.188-1.026.394-1.781.819-2.333.314-.406.501-.667.46-.863-.069-.334-.448-.814-.781-1.237-.358-.454-.729-.923-.906-1.422-.584-1.635.522-2.529 1.183-3.065.583-.472.692-.613.651-.841-.052-.159-.419-.631-.639-.914-.407-.522-.759-.973-.869-1.416-.241-1.062.404-1.7.832-2.123.197-.194.38-.376.518-.594.119-.19-.48-.833-.839-1.218-.645-.695-1.313-1.412-1.32-2.331 0-.798.762-1.249 1.567-1.725.187-.11.466-.274.646-.401-.01-.294-.132-.703-.243-1.073-.271-.907-.609-2.034.179-2.933.27-.306.614-.533.947-.752.754-.496.764-.589.718-.725-.067-.203-.303-.563-.51-.879-.627-.96-1.578-2.408-.64-3.617.216-.273.563-.454 1.832-1.029.217-.098.419-.188.565-.259-.079-.175-.22-.419-.324-.599-.447-.766-1.057-1.817-.656-2.933.295-.821 1.062-1.451 2.342-1.923.735-.269.842-.483.843-.485.029-.167-.342-.722-.541-1.02-.444-.663-.946-1.415-.91-2.295a.87.87 0 01.221-.546c.501-.564 1.329-.851 1.992-1.082.222-.078.559-.194.649-.254.042-.167-.208-.927-.343-1.334-.352-1.071-.885-2.688.473-3.493.471-.284 1.118-.296 1.819-.279.312.003.791 0 1.025-.048.054-.309-.165-.935-.328-1.407-.349-1-.874-2.51.51-3.283.528-.292 1.068-.314 1.462-.331.101-.003.241-.009.332-.021.005-.017.008-.04.012-.065.049-.352-.051-.873-.146-1.378-.176-.924-.358-1.879.189-2.594.207-.269.606-.603 1.334-.658.914-.07 1.547.127 1.968.256l.017.006c.079-.22.199-.633.37-1.413.166-.738.41-1.467 1.079-1.796.547-.269 1.104-.145 1.691-.012.44.099.971.218 1.659.233.169-.221.327-.533.48-.837.439-.867 1.108-2.177 2.7-2.028.343.036.704.131 1.085.233.306.082.699.188.973.215.226-.26.598-.744.8-1.005.232-.301.424-.542.485-.603.895-.852 1.705-.505 2.827-.023l.624.264c.109-.035.364-.375.516-.579.455-.609 1.139-1.527 2.329-1.324.362.069.718.207 1.063.341.218.085.547.213.661.223-.025-.016.177-.166.311-.265.51-.381 1.284-.96 2.204-.701.324.091.654.282 1.004.487.277.161.791.46.979.46h.003c.028-.028.266-.215.457-.366.361-.284.735-.578 1.127-.709.78-.286 1.48.205 1.991.565.129.091.31.22.425.278.138-.072.351-.205.488-.292.382-.243.712-.452 1.05-.52.138-.033.31-.035.493-.001a.879.879 0 01-.168 1.739c-.108.055-.3.177-.436.263-.334.212-.681.433-1.012.531-.731.23-1.379-.231-1.852-.563a3.815 3.815 0 00-.477-.305 5.043 5.043 0 00-.542.393c-.292.23-.59.467-.893.607-.894.384-1.793-.142-2.517-.563-.205-.119-.483-.282-.591-.312-.128 0-.505.282-.687.417-.374.279-.762.567-1.241.605-.427.058-.906-.138-1.416-.335-.27-.105-.549-.214-.739-.25-.087-.033-.436.413-.61.648-.441.59-1.266 1.694-2.588 1.15l-.648-.276c-.401-.171-.817-.349-.944-.355.01.055-.124.231-.287.442-1.037 1.344-1.255 1.589-1.68 1.666-.622.098-1.289-.08-1.934-.252-.295-.079-.577-.16-.804-.182-.323-.032-.5.158-.962 1.074-.276.546-.59 1.165-1.12 1.598a.87.87 0 01-.529.2c-1.078.029-1.866-.146-2.441-.274a6.702 6.702 0 00-.499-.101 3.09 3.09 0 00-.174.577c-.352 1.604-.597 2.332-1.198 2.681-.518.302-1.02.149-1.421.022-.341-.107-.728-.227-1.315-.183-.093.007-.128.022-.128.022-.003.108.121.762.195 1.153.122.644.249 1.309.161 1.943-.208 1.53-1.472 1.58-2.012 1.603-.266.011-.519.02-.68.11-.056.164.163.796.295 1.172.315.904.706 2.028.143 2.986-.49.807-1.551.796-2.502.801-.317-.009-.803-.003-.949.049-.075.191.188.99.329 1.419.35 1.059.827 2.511-.323 3.324-.289.197-.654.324-1.074.47-.288.1-.677.236-.957.382.114.276.335.606.536.908.499.744 1.063 1.589.752 2.541-.223.681-.847 1.2-1.907 1.588-.719.265-1.192.582-1.296.87-.125.347.219.938.522 1.458.413.709 1.179 2.03-.043 2.852-.145.099-.374.206-.991.485-.343.155-.944.429-1.197.57-.053.292.502 1.138.749 1.516.293.448.57.87.706 1.282.51 1.483-.745 2.307-1.419 2.75-.236.156-.48.316-.593.444-.146.166.045.804.185 1.271.206.689.439 1.473.239 2.233a.876.876 0 01-.171.337c-.288.346-.759.624-1.258.918-.185.11-.458.271-.639.397.154.275.535.685.784.953.746.802 1.874 2.015 1.04 3.347-.246.39-.536.676-.769.907-.131.129-.35.346-.367.42.05.146.354.535.553.792.458.588.891 1.144.984 1.69.233 1.287-.675 2.021-1.276 2.508-.702.568-.779.704-.634 1.111.082.227.374.598.632.925.454.575.968 1.227 1.121 1.964.212.998-.366 1.748-.789 2.294-.328.426-.528.699-.483.942.08.426.435.815.812 1.231.52.57 1.108 1.218 1.038 2.135-.054.688-.465 1.321-1.295 1.994-.749.599-.828.821-.833.844.032.095.356.466.618.763.204.231.433.493.676.798.479.6.668 1.196.568 1.778-.171.986-1.084 1.551-1.967 2.096-.33.204-.674.414-.976.652a.893.893 0 01-.548.191zm12.892-65.176zM69.449 9.273z"
          />
          <path
            fill="#613240"
            d="M24.271 33.707a.879.879 0 01-.234-1.724l.218-.06c1.002-.273 1.284-.399 1.354-.76.075-.351.082-.599.089-.887.011-.425.025-.91.228-1.682.351-1.361 1.205-1.877 1.829-2.253.441-.267.658-.409.765-.716.193-.557.179-.849.163-1.159-.055-1.039.211-1.628 1.856-2.894.032-.161.08-.453.117-.68.11-.672.234-1.433.481-2.021a.87.87 0 01.205-.297c.368-.348.602-.455.957-.616.217-.1.526-.242 1.036-.516.02-.263.009-.637.001-.911-.027-.939-.053-1.825.439-2.42.455-.527 1.163-.662 1.849-.792.144-.026.292-.055.441-.088.019-.11.04-.24.056-.348.135-.899.416-2.769 2.279-2.98a4.78 4.78 0 01.995-.001c.258.021.464.036.685.001.117-.198.287-.525.409-.762.436-.841.66-1.256.979-1.481.574-.383 1.213-.326 1.728-.282.333.025.712.059.826-.056.164-.161.32-.388.471-.607.379-.554.85-1.24 1.717-1.24.557.019 1.016.29 1.42.528.826.485.897.456 1.2.068.305-.392.511-.725.676-.988.322-.516.627-1.004 1.25-1.116.711-.121 1.319.312 2.424 1.164.212.164.349.249.43.292.083-.097.192-.243.247-.317l.091-.126c1.454-2.004 1.911-2.303 3.887-1.241.208.112.444.241.72.382.206.104.245.122.708-.334.354-.351.946-.939 1.787-.702a.953.953 0 01.166.065c.16.083.498.292.868.524.367.23.979.613 1.142.682.119.023.458-.113.623-.181.298-.123.605-.25.945-.257h.033c.537 0 .721.103 1.655.626.355.187.478.154.84.049.426-.121 1.01-.288 1.872-.032.075.023.321.08 1.281.193a.876.876 0 01.768.975c-.057.48-.504.81-.974.768-.883-.105-1.343-.179-1.591-.258-.354-.106-.551-.051-.873.041-.492.141-1.166.335-2.163-.196-.323-.181-.704-.393-.794-.427a7.713 7.713 0 01-.33.141c-.488.202-1.217.502-1.974.179-.256-.104-.699-.377-1.395-.813-.176-.11-.341-.215-.479-.298-.06.055-.125.119-.178.171-.446.439-1.374 1.354-2.743.645-.284-.147-.532-.282-.749-.398-.287-.154-.606-.327-.769-.385-.174.159-.511.622-.865 1.111l-.095.131c-.32.434-.713.968-1.395 1.061-.654.098-1.266-.291-1.771-.682a15.423 15.423 0 00-.983-.715l-.13.208c-.189.303-.431.688-.782 1.137-1.287 1.648-2.764.783-3.472.366-.142-.083-.339-.2-.47-.254-.097.105-.233.305-.331.446-.189.275-.404.587-.682.861-.687.687-1.604.607-2.211.556-.169-.015-.412-.039-.538-.021-.124.193-.329.59-.46.844-.429.828-.649 1.235-.963 1.455a.919.919 0 01-.235.116c-.641.204-1.163.167-1.585.133a3.268 3.268 0 00-.654-.007c-.424.048-.584.37-.753 1.498-.101.668-.215 1.426-.926 1.676a9.982 9.982 0 01-.98.224c-.295.057-.743.141-.858.224-.033.117-.014.804-.002 1.213.019.687.039 1.336-.159 1.85a.879.879 0 01-.393.454c-.79.44-1.224.637-1.512.769-.188.086-.265.121-.334.171-.131.403-.226.976-.303 1.451-.114.699-.181 1.078-.343 1.367a.865.865 0 01-.239.272c-1.398 1.05-1.389 1.22-1.372 1.56.021.377.049.946-.256 1.829-.323.921-.984 1.32-1.516 1.641-.521.314-.865.522-1.037 1.192-.153.582-.162.91-.172 1.29-.009.325-.019.692-.122 1.186-.288 1.471-1.577 1.822-2.613 2.104l-.211.059a.944.944 0 01-.237.032z"
          />
        </g>
        <g>
          <path
            fill="#4D2631"
            d="M69.52 18.846a.878.878 0 01-.86-1.056c.156-.753.489-1.36 1.02-1.86.202-.187.475-.439.636-.614a13.251 13.251 0 00-.297-.336 25.753 25.753 0 01-.622-.708c-.825-.979-.608-1.638-.267-2.34.082-.167.18-.364.265-.622.051-.153-.132-.458-.311-.751-.147-.242-.313-.517-.423-.819-.194-.535-.042-1.041.104-1.53.102-.343.209-.698.237-1.126.056-.755.363-1.394.634-1.958.161-.334.313-.651.389-.939.176-.676-.22-1.107-.397-1.262A.876.876 0 1170.777 1.6c.887.769 1.241 1.9.946 3.031-.119.454-.315.862-.507 1.258-.222.463-.434.902-.464 1.318-.04.618-.194 1.133-.307 1.508-.051.173-.124.411-.121.488.048.107.156.274.26.447.33.544.783 1.293.476 2.211a6.092 6.092 0 01-.354.841 3.789 3.789 0 00-.118.256c.018.01.061.077.15.184.223.267.418.482.581.662 1.354 1.499.978 2.094-.444 3.41-.262.246-.417.535-.5.934a.872.872 0 01-.855.698zm.921-3.365h.011-.011z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar16: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path fill="#3B1D25" d="M60.725 5.549c-1.913 3.308-.143 6.301 2.167 9.336l11.544 1.059C85.349 4.45 65.996-3.439 60.725 5.549z" />
      <path
        fill="#4D2631"
        d="M66.14 14.834a.793.793 0 01-.785-.908c.659-4.468 6.177-8.08 11.132-8.989a.795.795 0 01.924.637.79.79 0 01-.637.923c-4.31.792-9.303 3.945-9.851 7.66a.791.791 0 01-.783.677z"
      />
      <path
        fill="#4D2631"
        d="M63.516 15.373a.792.792 0 01-.76-.566c-.707-2.373-.291-4.986 1.272-7.986 1.413-2.699 3.118-4.465 5.528-5.729a.792.792 0 11.736 1.404c-2.136 1.12-3.589 2.633-4.859 5.06-1.362 2.616-1.741 4.84-1.157 6.8a.792.792 0 01-.76 1.017z"
      />
      <g>
        <path
          fill="#3B1D25"
          d="M50.46 18.952c-4.479 7.2-1.967 19.384-.517 26.692l39.714 1.368c1.498-8.07 2.848-18.714-1.063-26.134-7.859-14.855-32.845-10.389-38.134-1.926z"
        />
        <path
          fill="#4D2631"
          d="M71.616 30.636a.796.796 0 01-.779-.646 1.173 1.173 0 01-.055-.391c.366-5.491-.592-12.356-1.163-16.458a181.94 181.94 0 01-.259-1.897.794.794 0 01.686-.889.803.803 0 01.889.686c.068.533.156 1.167.255 1.881.578 4.144 1.543 11.066 1.182 16.654.008.031.017.069.027.118a.794.794 0 01-.783.942zM76.46 28.129a.798.798 0 01-.781-.652l-.021-.128c-.044-.237-.047-.237-.078-.727-.021-.328-.058-.907-.142-2.03-.243-3.426-1.139-7.797-2.666-12.993a.793.793 0 111.521-.448c1.559 5.307 2.477 9.791 2.728 13.327.084 1.128.121 1.713.142 2.043.023.361.021.361.055.537l.025.135a.797.797 0 01-.783.936zM82.711 27.357a.793.793 0 01-.773-.625c-1.268-5.801-2.958-10.43-5.175-14.148a.794.794 0 011.364-.811c2.303 3.868 4.057 8.651 5.359 14.621a.791.791 0 01-.775.963zM86.214 39.372a.796.796 0 01-.761-1.02c.936-3.13 1.802-7.719.197-15.499-.618-2.979-1.307-5.229-2.108-6.879a.795.795 0 01.368-1.059.796.796 0 011.061.368c.857 1.768 1.588 4.139 2.232 7.249 1.677 8.126.759 12.966-.229 16.275a.794.794 0 01-.76.565zM67.789 30.7a.794.794 0 01-.737-.501c-2.42-6.106-1.005-15.407-.284-19.122a.794.794 0 011.557.302c-.694 3.579-2.063 12.518.203 18.235a.794.794 0 01-.739 1.086zM62.235 28.668a.793.793 0 01-.786-.692c-1.102-8.615 1.122-14.889 1.83-16.607a.794.794 0 011.467.605c-.671 1.625-2.776 7.572-1.722 15.799a.796.796 0 01-.789.895zM58.513 29.493a.79.79 0 01-.726-.474c-2.11-4.802-.716-11.9 1.121-16.52a.797.797 0 011.031-.445.795.795 0 01.444 1.031c-1.723 4.335-3.056 10.942-1.144 15.295a.793.793 0 01-.726 1.113zM55.044 37.944a.797.797 0 01-.736-.493c-3.074-7.52-3.138-16.483-.164-22.838a.797.797 0 011.056-.382.796.796 0 01.383 1.056c-2.797 5.972-2.721 14.436.194 21.564a.794.794 0 01-.733 1.093z"
        />
      </g>
      <g>
        <path
          fill="#66353D"
          d="M82.063 47.945l-26.528.723c.214 15.997 2.077 32.093-3.842 40.583-1.337 1.919 12.416 30.033 22.195 29.605 9.27-.405 19.891-22.999 13.385-30.882-6.126-7.417-4.796-23.46-5.21-40.029z"
        />
        <path
          fill="#9EC7D9"
          d="M19.981 109.072c-3.944 6.601-7.738 13.344-10.814 20.401-1.484 3.404-2.821 7.265-3.984 10.945h33.814c-.923-15.7-2.644-30.625-19.016-31.346zM120.06 102.952l-17.322 24.428 3.591 13.039h29.488c-9.195-35.615-13.207-35.649-15.757-37.467z"
        />
        <path
          fill="#9EC7D9"
          d="M114.361 128.797c2.128-19.453 4.273-18.612 5.698-25.845-7.54-2.906-23.896-5.877-30.912-13.702-4.104 4.729-8.384 8.992-13.53 10.966-2.784 4.875-2.562 19.283-1.694 27.621.629 6.262 1.492 9.831 1.849 12.582h36.931c.524-2.858 1.108-6.559 1.658-11.622z"
        />
        <path
          fill="#9EC7D9"
          d="M67.696 98.239L49.75 91.704c-2.672 3.258-7.251 6.227-16.598 11.29-4.17 2.258-8.452 2.617-13.17 6.078.71 1.866 5.316 7.296 7.894 14.359 2.419 6.651 4.217 12.236 5.529 16.987h45.708l-3.548-24.259c-5.304-11.094-7.647-12.702-7.869-17.92z"
        />
        <path
          fill="#9EC7D9"
          d="M54.512 82.837c.082-1.003 1.172-4.241 1.337-9.595-5.175 5.379-11.386 17.64-6.956 22.845 1.365 1.603 3.439 2.101 4.633 4.165.988 1.68 1.125 3.546 1.87 6.765 3.819 16.533.136-11.652 12.299-8.777-6.327-3.999-13.836-7.318-13.183-15.403zM82.612 72.534c-.106 2.822 2.777 10.878-.55 18.45-2.648 6.021-6.445 9.231-6.445 9.231s3.938 1.973 4.318 11.992c.032.827 1.114 1.13 1.542.421.691-1.142 1.317-2.443 1.895-3.555 1.254-2.399.758-2.397 2.873-5.865 2.621-4.295 3.371-3.271 5.327-8.517 1.903-5.271.957-5.97-.549-8.953-6.125-12.116-7.747-12.132-8.411-13.204z"
        />
        <path
          fill="#BDE2F2"
          d="M45.817 98.869l-.059-.002a.795.795 0 01-.733-.851c.042-.561.007-2.265-.001-2.497a.793.793 0 01.764-.821c.43-.065.806.327.82.765.001.019.052 1.944-.001 2.671a.792.792 0 01-.79.735zM45.943 106.997a.794.794 0 01-.79-.731 409.92 409.92 0 01-.198-3.075l-.039-.592a.793.793 0 011.58-.148c0 .009.018.265.041.641.059.926.167 2.641.198 3.051a.795.795 0 01-.729.853l-.063.001zM45.913 115.063a.793.793 0 01-.791-.75c-.005-.105-.014-.37-.026-.715-.026-.745-.086-2.49-.134-2.769a.807.807 0 01.617-.924.772.772 0 01.929.567c.061.242.099.93.174 3.069.011.33.02.585.025.686a.793.793 0 01-.75.834c-.015.002-.028.002-.044.002zM45.886 121.868h-.024a.792.792 0 01-.77-.815c.006-.239-.045-1.79-.091-2.106a.791.791 0 01.444-.938.79.79 0 011.045.403c.182.41.188 2.669.188 2.688a.792.792 0 01-.792.768zM38.638 121.246l-.039-.001a.794.794 0 01-.755-.83c.023-.492.03-.835.037-1.171.012-.517.022-1.017.085-1.976a.804.804 0 01.842-.739c.438.03.769.405.74.844-.061.925-.07 1.405-.082 1.906-.007.347-.014.702-.038 1.211a.792.792 0 01-.79.756zM38.825 113.707l-.05-.002a.793.793 0 01-.744-.833c.006-.188-.012-1.437-.024-2.288-.007-.422-.013-.748-.013-.816a.794.794 0 011.587 0l.01.793c.026 1.743.032 2.281.023 2.401a.79.79 0 01-.789.745zM38.981 106.153a.792.792 0 01-.793-.78c-.009-.629-.057-2.187-.071-2.67l-.006-.14a.793.793 0 01.771-.816c.417-.021.803.333.816.771l.004.136c.015.487.063 2.062.072 2.695a.793.793 0 01-.793.804zM49.302 87.437a.793.793 0 01-.793-.794c0-.242-.01-2.203-.042-3.125a.793.793 0 01.765-.82c.491-.03.805.329.819.766.034.938.044 2.934.044 3.18a.793.793 0 01-.793.793zM49.353 94.881a.793.793 0 01-.791-.764c-.075-2-.086-2.133-.107-2.404-.012-.152-.029-.347-.062-.922a.795.795 0 011.585-.089c.03.551.045.738.058.884.021.278.035.415.11 2.473a.79.79 0 01-.762.821l-.031.001zM49.243 102.263l-.054-.002a.791.791 0 01-.738-.844c.079-1.18.052-2.575.044-3.033l-.002-.149c0-.438.353-.793.791-.793h.001c.438 0 .793.354.794.793l.002.119c.009.476.037 1.921-.047 3.17a.794.794 0 01-.791.739zM49.228 110.442l-.026-.001a.793.793 0 01-.765-.82c.018-.52.028-1.296.038-2.016.019-1.216.027-1.729.051-1.918a.79.79 0 01.887-.688c.432.055.74.451.688.882-.016.157-.028 1.038-.039 1.746-.01.731-.021 1.521-.04 2.047a.796.796 0 01-.794.768zM49.214 118.677a.794.794 0 01-.786-.903c.19-1.365.067-4.016.04-4.265a.802.802 0 01.669-.882c.431-.056.816.208.895.625.055.287.183 3.189-.034 4.742a.791.791 0 01-.784.683zM42.271 103.021h-.042a.795.795 0 01-.751-.835c.037-.674-.003-2.295-.054-2.657a.797.797 0 01.68-.894.797.797 0 01.893.679c.07.517.101 2.278.066 2.955a.797.797 0 01-.792.752zM42.18 110.9l-.061-.002a.796.796 0 01-.732-.852c.062-.806-.031-3.438-.043-3.621a.796.796 0 01.735-.846.789.789 0 01.848.726c.013.166.115 2.915.044 3.862a.794.794 0 01-.791.733zM42.136 118.453a.79.79 0 01-.791-.869c.081-.844.065-2.66-.05-3.01a.771.771 0 01.344-1.049c.388-.204.875-.033 1.08.354.427.818.208 3.827.204 3.855a.79.79 0 01-.787.719zM35.564 118.208a.793.793 0 01-.737-1.088c.082-.275.153-1.561.159-2.881a.791.791 0 01.793-.789h.004a.791.791 0 01.789.795c-.005 1.301-.059 2.959-.278 3.478a.795.795 0 01-.73.485zM35.83 111.046a.794.794 0 01-.792-.856c.006-.222-.018-1.762-.034-2.686l-.018-1.137a.793.793 0 01.786-.801h.008c.434 0 .788.349.793.783l.018 1.127c.045 2.764.04 2.792.022 2.903a.797.797 0 01-.783.667zM28.512 118.04a.792.792 0 01-.776-.963c.097-.438.085-1.908.025-3.132a.794.794 0 111.585-.079c.03.628.118 2.74-.06 3.551a.793.793 0 01-.774.623zM28.713 110.666h-.025a.796.796 0 01-.769-.819c.015-.438.006-.885-.003-1.415-.01-.585-.022-1.268-.01-2.138a.784.784 0 01.803-.783c.439.007.79.365.783.804-.011.851 0 1.518.01 2.091.009.558.017 1.029.003 1.492a.792.792 0 01-.792.768zM21.964 117.727a.8.8 0 01-.781-.946c.026-.139.029-.799.035-1.995l.005-1.06a.793.793 0 01.793-.789h.004a.794.794 0 01.789.798l-.005 1.058c-.008 1.637-.01 2.026-.068 2.308a.785.785 0 01-.772.626zM21.899 110.078a.793.793 0 01-.79-.883c.015-.124.037-.666.048-1.423.008-.439.406-.762.806-.782a.794.794 0 01.78.806c-.003.209-.021 1.26-.058 1.581a.79.79 0 01-.786.701zM32.066 121.316l-.042-.001a.793.793 0 01-.752-.831c.015-.283-.03-2.269-.114-3.479a.794.794 0 011.582-.112c.088 1.246.136 3.304.117 3.67a.792.792 0 01-.791.753zM32.187 113.21a.792.792 0 01-.789-.872c.006-.13.005-.598.005-1.162-.001-.721-.001-1.591.011-2.14.012-.437.406-.765.812-.773.438.01.784.373.775.813-.013.537-.013 1.394-.013 2.101.001 1.091-.001 1.243-.017 1.352a.794.794 0 01-.784.681zM32.263 105.32a.794.794 0 01-.793-.784l-.042-1.037a.791.791 0 01.761-.823c.402-.028.807.322.824.762l.027.65.017.438a.795.795 0 01-.794.794zM25.01 121.424a.794.794 0 01-.765-1.003c.083-.3.075-1.282-.016-2.285a.794.794 0 01.717-.862.802.802 0 01.863.719c.055.614.165 2.123-.033 2.849a.797.797 0 01-.766.582zM25.667 114.196a.792.792 0 01-.792-.855c.027-.363-.04-2.503-.06-2.956a.79.79 0 01.756-.828c.438-.047.808.316.828.755.001.025.099 2.602.058 3.15a.794.794 0 01-.79.734zM18.475 121.795a.792.792 0 01-.792-.86c.047-.534.002-1.854-.025-2.412a.793.793 0 01.752-.833.808.808 0 01.833.751c.001.02.09 1.836.022 2.63a.794.794 0 01-.79.724zM18.641 114.502l-.056-.002a.793.793 0 01-.736-.848 89.62 89.62 0 00-.064-2.178.79.79 0 01.761-.822l.033-.001c.422 0 .774.335.791.762.001.021.081 2.086.063 2.35a.796.796 0 01-.792.739z"
        />
        <g>
          <path
            fill="#BDE2F2"
            d="M114.693 106.997a.794.794 0 01-.79-.731c-.033-.412-.142-2.141-.199-3.075l-.038-.592a.794.794 0 01.721-.849.802.802 0 01.859.701c0 .009.019.265.039.641.061.926.169 2.641.199 3.051a.794.794 0 01-.729.853l-.062.001zM114.663 115.063a.794.794 0 01-.792-.75c-.005-.105-.015-.37-.026-.715-.025-.745-.086-2.49-.133-2.769a.804.804 0 01.616-.924.773.773 0 01.928.567c.063.242.1.93.174 3.069.012.33.021.585.027.686a.795.795 0 01-.752.834c-.013.002-.028.002-.042.002zM114.635 121.868h-.024a.792.792 0 01-.77-.815c.007-.239-.044-1.79-.091-2.106a.791.791 0 01.444-.938.792.792 0 011.046.403c.182.41.188 2.669.188 2.688a.793.793 0 01-.793.768zM107.387 121.246l-.037-.001a.796.796 0 01-.757-.83c.023-.492.032-.835.039-1.171.01-.517.021-1.017.084-1.976a.806.806 0 01.844-.739.79.79 0 01.738.844c-.062.925-.069 1.405-.081 1.906-.009.347-.016.702-.038 1.211a.794.794 0 01-.792.756zM107.574 113.707l-.051-.002a.792.792 0 01-.743-.833c.005-.188-.012-1.437-.025-2.288l-.01-.816a.792.792 0 111.587 0l.01.793c.025 1.743.03 2.281.022 2.401a.792.792 0 01-.79.745zM107.73 106.153a.795.795 0 01-.795-.78 218.23 218.23 0 00-.071-2.67l-.004-.14a.793.793 0 01.771-.816.789.789 0 01.816.771l.005.136c.014.487.061 2.062.071 2.695a.793.793 0 01-.793.804zM117.979 110.442l-.028-.001a.794.794 0 01-.765-.82c.017-.52.027-1.296.037-2.016.019-1.216.027-1.729.052-1.918a.789.789 0 01.886-.688.795.795 0 01.688.882 54.312 54.312 0 00-.037 1.746c-.01.731-.023 1.521-.041 2.047a.796.796 0 01-.792.768zM117.964 118.677a.793.793 0 01-.786-.903c.191-1.365.067-4.016.039-4.265a.803.803 0 01.669-.882c.426-.056.817.208.896.625.056.287.186 3.189-.033 4.742a.794.794 0 01-.785.683zM111.019 103.024l-.052-.002a.794.794 0 01-.741-.843c.028-.42.023-1.329-.011-2.069a.791.791 0 01.757-.828c.427-.039.808.316.827.755.031.684.047 1.703.011 2.246a.794.794 0 01-.791.741zM110.93 110.9l-.063-.002a.795.795 0 01-.731-.852c.063-.806-.029-3.438-.042-3.621a.795.795 0 01.733-.846.789.789 0 01.849.726c.012.166.114 2.915.043 3.862a.792.792 0 01-.789.733zM110.886 118.453a.79.79 0 01-.79-.869c.08-.844.065-2.66-.052-3.01a.772.772 0 01.345-1.049c.39-.204.877-.033 1.08.354.427.818.208 3.827.205 3.855a.793.793 0 01-.788.719zM104.313 118.208a.797.797 0 01-.737-1.088c.084-.275.154-1.561.16-2.881a.79.79 0 01.793-.789h.003a.792.792 0 01.79.795c-.005 1.301-.059 2.959-.279 3.478a.794.794 0 01-.73.485zM104.578 111.046a.794.794 0 01-.792-.856c.007-.222-.019-1.762-.033-2.686l-.019-1.137a.793.793 0 01.785-.801h.009c.434 0 .788.349.793.783l.017 1.127c.045 2.764.04 2.792.021 2.903a.79.79 0 01-.781.667zM104.163 103.164h-.004a.794.794 0 01-.79-.797c.001-.24-.009-1.074-.02-1.896l-.02-1.581a.795.795 0 01.788-.8c.446-.049.796.351.799.788l.02 1.572c.01.834.021 1.681.021 1.923a.793.793 0 01-.794.791zM97.261 118.04a.79.79 0 01-.775-.963c.095-.438.085-1.908.023-3.132a.795.795 0 01.754-.833.795.795 0 01.831.754c.032.628.118 2.74-.06 3.551a.79.79 0 01-.773.623zM97.461 110.666h-.024a.797.797 0 01-.768-.819c.015-.438.007-.885-.003-1.415-.01-.585-.021-1.268-.01-2.138.006-.438.323-.787.802-.783.44.007.79.365.784.804-.013.851 0 1.518.01 2.091a31.1 31.1 0 01.003 1.492.794.794 0 01-.794.768zM97.271 103.065a.79.79 0 01-.789-.865c.048-.539.042-1.795.038-2.546a25.261 25.261 0 010-.632.793.793 0 01.794-.775h.018c.438.01.784.371.775.811-.002.098-.001.313 0 .59.004.827.01 2.081-.045 2.694a.797.797 0 01-.791.723zM90.713 117.727a.8.8 0 01-.781-.946c.026-.139.029-.799.035-1.995l.005-1.06a.794.794 0 01.794-.789h.005c.438.004.79.359.788.798l-.004 1.058c-.008 1.637-.01 2.026-.07 2.308a.783.783 0 01-.772.626zM90.65 110.073a.793.793 0 01-.792-.858c.021-.243.056-1.315.083-2.151.018-.528.031-.965.037-1.06.027-.439.435-.778.842-.741a.787.787 0 01.741.84c-.005.092-.017.51-.034 1.014-.029.866-.066 1.978-.088 2.231a.791.791 0 01-.789.725zM90.752 102.396a.792.792 0 01-.792-.76l-.039-.85c-.036-.835-.084-1.914-.096-2.306a.793.793 0 01.77-.816h.022c.429 0 .78.34.795.77.011.388.059 1.456.095 2.282l.039.853a.795.795 0 01-.759.826l-.035.001zM90.414 94.802l-.031-.001a.792.792 0 01-.763-.793c-.003-.116-.036-.743-.069-1.383-.033-.606-.066-1.225-.075-1.452a.793.793 0 01.76-.826c.444-.052.807.319.824.759.009.227.042.836.076 1.435.038.735.073 1.457.071 1.499a.792.792 0 01-.793.762zM90.298 87.487l-.064-.002a.795.795 0 01-.727-.856c.021-.253.021-.784.024-1.372l.006-.889c.004-.437.383-.753.802-.783a.792.792 0 01.784.803l-.006.875c-.002.642-.006 1.22-.028 1.498a.792.792 0 01-.791.726zM83.522 118.442a.794.794 0 01-.791-.858c.064-.761.031-2.313.021-2.899a17.342 17.342 0 01-.005-.321c.009-.439.386-.822.81-.779a.797.797 0 01.777.811l.004.257c.014.665.045 2.222-.025 3.065a.791.791 0 01-.791.724zM83.444 110.867a.797.797 0 01-.792-.874c.014-.257.045-2.053.057-2.78l.005-.316c.012-.437.388-.795.813-.771a.793.793 0 01.773.813l-.005.302c-.049 2.859-.054 2.891-.076 2.994a.79.79 0 01-.775.632zM83.81 103.401a.785.785 0 01-.788-.736c-.014-.189.009-2.815.013-2.954a.796.796 0 01.793-.767h.026a.796.796 0 01.768.819c-.006.19-.023 2.605-.018 2.814a.796.796 0 01-.754.822c-.015.002-.027.002-.04.002zM83.78 96.225a.79.79 0 01-.786-.686 204.39 204.39 0 01-.073-1.297c-.048-.859-.102-1.888-.115-2.07a.793.793 0 01.738-.843.8.8 0 01.846.736l.116 2.092.066 1.218a.796.796 0 01-.792.85zM84.155 80.863a.849.849 0 01-.788-.597c-.09-.285-.298-3.401-.3-3.431a.799.799 0 01.746-.841c.43.003.812.308.84.745.013.211.205 2.863.247 3.14.132.417-.112.82-.53.95a.67.67 0 01-.215.034zM76.801 118.852a.794.794 0 01-.78-.949c.035-.295.007-1.981-.071-3.352a.795.795 0 01.75-.835c.407-.036.81.309.836.747.001.033.166 3.247.035 3.784a.797.797 0 01-.77.605zM77.021 110.916a.796.796 0 01-.795-.768l-.079-2.856a.792.792 0 01.771-.816h.022c.427 0 .78.341.792.771l.082 2.851a.794.794 0 01-.768.819l-.025-.001zM76.934 103.678a.793.793 0 01-.767-.996c.009-.06.076-.509.082-2.762l.793-.063.794.005c-.009 2.774-.1 3.088-.141 3.239a.793.793 0 01-.761.577zM70.023 119.414a.792.792 0 01-.795-.817c-.005-.322-.216-3.41-.233-3.588a.794.794 0 01.718-.861.776.776 0 01.863.712c.003.03.256 3.563.236 3.82a.794.794 0 01-.789.734zM69.81 111.521a.776.776 0 01-.338-.077.782.782 0 01-.364-1.071c.035-.146.042-.905.058-2.57l.001-.158a.791.791 0 01.792-.786h.008a.793.793 0 01.787.8l-.001.16c-.026 2.854-.026 2.854-.217 3.247a.813.813 0 01-.726.455zM63.172 118.864c-.373 0-.716-.294-.799-.67-.02-.09-.02-.091-.236-3.862l-.01-.177a.793.793 0 01.744-.839c.437-.044.813.307.841.744l.009.181c.043.738.202 3.527.217 3.708.093.43-.185.805-.613.898a.665.665 0 01-.153.017zM62.89 110.803h-.008a.792.792 0 01-.786-.793c0-.024.065-3.261.105-3.781a.81.81 0 01.849-.733.798.798 0 01.733.851c-.032.432-.093 3.266-.1 3.679a.796.796 0 01-.793.777zM63.089 102.982h-.014a.793.793 0 01-.779-.807c.039-2.246.172-3.214.27-3.921l.021-.152a.792.792 0 111.571.212l-.021.156c-.096.704-.217 1.581-.254 3.731a.794.794 0 01-.794.781zM56.15 117.769a.793.793 0 01-.793-.77c-.01-.348-.049-1.118-.087-1.861a247.42 247.42 0 01-.073-1.528.793.793 0 111.585-.063c.013.332.042.912.073 1.511.038.757.077 1.54.088 1.894a.795.795 0 01-.769.818l-.024-.001zM56.117 110.136a.793.793 0 01-.793-.771c-.026-.9-.05-1.908-.059-2.882a.792.792 0 01.786-.8h.007c.435 0 .789.351.793.786.008.963.033 1.958.059 2.85a.793.793 0 01-.793.817zM55.945 103.034a.795.795 0 01-.792-.849c.004-.1 0-.444-.004-.896-.005-.695-.014-1.627-.004-2.359a.792.792 0 01.793-.784h.008c.438.004.79.364.785.801-.009.724-.001 1.644.005 2.327.005.554.005.963-.001 1.035a.794.794 0 01-.79.725zM56.097 95.496a.792.792 0 01-.763-1.01c.012-.038.012-.201.012-.357 0-.436 0-1.16.128-2.62a.785.785 0 01.861-.719.792.792 0 01.72.858c-.124 1.391-.124 2.073-.124 2.48-.001.325-.001.541-.071.789a.792.792 0 01-.763.579zM100.815 121.316l-.041-.001a.793.793 0 01-.752-.831c.015-.283-.03-2.269-.114-3.479a.793.793 0 111.582-.112c.087 1.246.135 3.304.117 3.67a.794.794 0 01-.792.753zM100.937 113.21a.792.792 0 01-.79-.872c.007-.13.006-.598.006-1.162a95.762 95.762 0 01.011-2.14c.01-.437.38-.765.812-.773.438.01.784.373.775.813-.013.537-.013 1.394-.013 2.101.001 1.091-.001 1.243-.018 1.352a.792.792 0 01-.783.681zM101.012 105.312a.79.79 0 01-.787-.699c-.02-.169-.113-2.938-.115-3.106a.795.795 0 01.783-.803h.01c.436 0 .789.351.794.785.003.255.094 2.779.107 2.969a.8.8 0 01-.792.854zM93.759 121.424a.795.795 0 01-.766-1.003c.083-.3.076-1.282-.016-2.285a.795.795 0 01.718-.862.8.8 0 01.861.719c.057.614.165 2.123-.032 2.849a.795.795 0 01-.765.582zM94.415 114.196a.794.794 0 01-.792-.855c.028-.363-.039-2.503-.06-2.956a.79.79 0 01.756-.828c.448-.047.809.316.829.755.001.025.1 2.602.058 3.15a.794.794 0 01-.791.734zM94.167 106.48l-.035-.001a.79.79 0 01-.757-.827c.035-.833.012-1.744-.006-2.408a27.346 27.346 0 01-.015-.634.793.793 0 01.789-.798h.006c.435 0 .789.352.792.788.002.153.007.359.013.603.02.688.042 1.629.004 2.52a.793.793 0 01-.791.757zM93.814 98.737a.792.792 0 01-.785-.907c.006-.083.024-.583-.086-3.331l.788-.127.793-.029c.134 3.368.094 3.607.071 3.734a.794.794 0 01-.781.66zM52.14 83.444c-.134-3.37-.093-3.608-.071-3.735a.805.805 0 01.917-.646.795.795 0 01.65.896c-.006.081-.024.58.085 3.327l-.789.131-.792.027zM52.469 91.866l-.083-.003a.794.794 0 01-.708-.871l.08-.816c.21-2.168.219-2.2.245-2.3a.792.792 0 01.968-.566.79.79 0 01.578.916c-.028.202-.133 1.289-.211 2.104l-.081.825a.794.794 0 01-.788.711zM52.67 99.168l-.034-.001a.79.79 0 01-.759-.825c.076-1.868.109-2.497.192-2.811a.793.793 0 011.534.406c-.049.221-.096 1.363-.141 2.472a.795.795 0 01-.792.759zM52.695 106.523a.791.791 0 01-.792-.766c-.018-.533-.048-1.119-.073-1.608-.028-.55-.047-.987-.044-1.134.012-.438.37-.8.815-.771a.793.793 0 01.771.813c-.004.13.018.521.042 1.011.026.497.056 1.092.073 1.635a.789.789 0 01-.765.818c-.009.002-.018.002-.027.002zM52.896 114.179a.794.794 0 01-.793-.773c-.003-.199-.095-2.469-.112-2.908l.789-.104.792-.031-.792.031.795.042c.018.44.109 2.734.115 2.932a.793.793 0 01-.774.813c-.007-.002-.014-.002-.02-.002zM53.174 122.039a.794.794 0 01-.793-.781c-.002-.136-.042-.945-.081-1.714-.035-.7-.067-1.365-.07-1.481a.793.793 0 01.776-.81h.017c.431 0 .784.345.793.775.002.11.034.758.069 1.438.039.793.08 1.628.082 1.766a.795.795 0 01-.78.808l-.013-.001zM87.224 121.795a.793.793 0 01-.791-.86c.047-.534.002-1.854-.025-2.412a.795.795 0 01.753-.833c.396-.016.81.313.831.751.001.02.09 1.836.021 2.63a.793.793 0 01-.789.724zM87.386 114.502a.793.793 0 01-.791-.874c.016-.298-.062-2.439-.076-2.795a.79.79 0 01.758-.826c.406-.026.806.319.825.758.001.027.112 2.725.068 3.052a.795.795 0 01-.784.685zM87.345 106.818a.793.793 0 01-.791-.864c.005-.173-.011-.89-.025-1.645l-.021-.995a.796.796 0 01.779-.809h.015c.432 0 .784.347.793.779l.019.992c.035 1.673.032 1.755.015 1.87a.796.796 0 01-.784.672zM87.303 99.32l-.057-.002a.794.794 0 01-.738-.802c-.002-.165-.044-1.547-.06-2.142l-.01-.281a.79.79 0 01.775-.809h.018c.43 0 .782.341.795.771l.007.271c.064 2.18.063 2.195.06 2.254a.794.794 0 01-.79.74zM86.916 92.095a.792.792 0 01-.792-.78c-.009-.559-.021-.89-.034-1.203a37.544 37.544 0 01-.035-1.762c0-.438.354-.793.792-.794h.001c.438 0 .792.354.793.791.001.886.017 1.274.032 1.703.015.322.028.664.038 1.24a.793.793 0 01-.78.805h-.015zM86.842 84.367a.793.793 0 01-.787-.897c.013-.138.016-.719-.028-2.695l-.006-.284a.793.793 0 01.787-.799h.006c.436 0 .789.351.793.787l.006.26c.054 2.459.035 2.801.014 2.957a.798.798 0 01-.785.671zM80.313 120.386h-.015c-.438-.009-.786-.319-.777-.758l.002-.101c.006-.325.005-.325-.046-.915l-.082-1.01a.792.792 0 01.728-.853c.405-.049.817.289.853.727l.083 1.002c.059.695.058.695.051 1.079-.01.434-.367.829-.797.829zM80.423 113.36a.793.793 0 01-.79-.874c.016-.276.054-2.433.055-2.512a.792.792 0 01.793-.784h.012a.794.794 0 01.782.804c0 .025-.038 2.522-.073 2.712a.793.793 0 01-.779.654zM80.337 105.806a.793.793 0 01-.79-.751c-.009-.172-.052-2-.051-2.331a.793.793 0 01.794-.79h.002a.792.792 0 01.791.794c0 .319.038 2.071.048 2.24a.793.793 0 01-.749.835c-.016 0-.029.003-.045.003zM80.427 98.548a.794.794 0 01-.791-.859c.007-.167-.012-.769-.033-1.395-.01-.394-.023-.795-.03-1.116a.794.794 0 01.777-.811c.428-.008.8.34.81.776l.031 1.102c.03 1.016.04 1.412.025 1.583a.794.794 0 01-.789.72zM73.434 122.134h-.021a.794.794 0 01-.772-.814c.008-.313.002-1.429-.002-2.112l-.002-.521a.794.794 0 011.586 0l.003.514c.004.7.009 1.841.002 2.163a.794.794 0 01-.794.77zM73.324 114.359a.791.791 0 01-.793-.83c.001-.131-.019-.705-.034-1.222l-.024-.865a.794.794 0 01.776-.809.803.803 0 01.811.778l.023.845c.035 1.149.037 1.286.031 1.373a.793.793 0 01-.79.73zM66.479 121.562l-.057-.002a.793.793 0 01-.737-.831c.002-.112-.018-.744-.081-2.168l1.583-.096c.095 2.159.085 2.295.082 2.359a.793.793 0 01-.79.738zM66.362 114.199h-.021a.794.794 0 01-.771-.814c.006-.219-.008-.715-.023-1.202-.009-.333-.019-.665-.021-.907a.793.793 0 01.783-.803c.463-.015.797.344.804.781.003.236.012.559.021.882.014.525.029 1.058.023 1.292a.795.795 0 01-.795.771zM66.311 106.968l-.042-.001a.793.793 0 01-.751-.833c.012-.248.018-1.184.022-1.982.004-.57.007-1.073.011-1.222.016-.439.358-.792.818-.769a.793.793 0 01.769.817c-.005.146-.008.63-.012 1.185a91.368 91.368 0 01-.024 2.051.794.794 0 01-.791.754zM59.825 121.253a.795.795 0 01-.791-.763l-.029-.82c-.014-.418-.018-.539-.085-1.64a.792.792 0 01.743-.839.804.804 0 01.839.743c.07 1.131.074 1.256.087 1.687l.029.807a.794.794 0 01-.762.824l-.031.001zM59.722 113.796h-.02a.794.794 0 01-.773-.813c.004-.179-.013-.807-.031-1.456l-.028-1.169a.795.795 0 01.777-.81c.469-.021.801.341.809.778l.028 1.158c.019.685.035 1.349.031 1.536a.793.793 0 01-.793.776zM59.49 106.154l-.063-.002a.792.792 0 01-.729-.847c.008-.153-.006-.774-.019-1.434l-.022-1.183a.795.795 0 01.783-.804h.01c.434 0 .787.347.794.782l.02 1.173c.021 1.029.028 1.433.017 1.583a.796.796 0 01-.791.732zM59.88 98.49a.793.793 0 01-.791-.759c-.011-.246-.022-2.155-.017-2.417a.794.794 0 01.794-.776h.016a.794.794 0 01.777.809c-.005.249.007 2.134.014 2.317a.79.79 0 01-.758.825l-.035.001z"
          />
        </g>
        <g>
          <path
            fill="#BDE2F2"
            d="M124.899 117.769a.792.792 0 01-.793-.77c-.01-.348-.05-1.118-.087-1.861-.03-.606-.06-1.192-.072-1.528a.791.791 0 111.583-.063c.015.332.044.912.074 1.511.037.757.078 1.54.089 1.894a.794.794 0 01-.769.818l-.025-.001zM124.864 110.133a.793.793 0 01-.794-.773l-.031-1.441a.792.792 0 111.586-.035l.032 1.436a.794.794 0 01-.775.813h-.018zM121.445 106.526c-.42 0-.77-.33-.79-.756l-.032-.649c-.021-.456-.041-.907-.063-1.277a.796.796 0 01.745-.84.79.79 0 01.839.747c.022.374.044.833.064 1.296l.031.646a.792.792 0 01-.754.831c-.012.002-.026.002-.04.002zM121.645 114.179a.796.796 0 01-.794-.773c-.004-.199-.094-2.469-.112-2.908l.79-.104.792-.031-.792.031.795.042c.018.44.11 2.734.115 2.932a.793.793 0 01-.774.813c-.007-.002-.014-.002-.02-.002zM121.923 122.039a.793.793 0 01-.792-.781c-.002-.136-.044-.945-.082-1.714-.035-.7-.066-1.365-.07-1.481a.793.793 0 01.777-.81c.43.033.8.337.809.775.003.11.034.758.068 1.438.04.793.081 1.628.083 1.766a.795.795 0 01-.78.808l-.013-.001zM128.574 121.253a.794.794 0 01-.79-.763l-.029-.82c-.014-.418-.018-.539-.085-1.64a.793.793 0 01.742-.839.8.8 0 01.84.743c.07 1.131.074 1.256.088 1.687l.027.807a.791.791 0 01-.761.824l-.032.001z"
          />
        </g>
        <g>
          <path
            fill="#BDE2F2"
            d="M45.955 128.829a.793.793 0 01-.788-.711 272.694 272.694 0 00-.253-2.41 1.033 1.033 0 01-.003-.137.8.8 0 01.771-.816c.454.023.799.32.813.756a.662.662 0 010 .063c.029.264.095.865.25 2.38a.795.795 0 01-.79.875zM45.876 136.661a.793.793 0 01-.791-.764c-.025-.69-.044-1.442-.06-2.064-.016-.628-.026-1.119-.041-1.264a.796.796 0 01.718-.863.802.802 0 01.862.717c.015.155.03.688.046 1.37.016.616.035 1.361.06 2.045a.793.793 0 01-.763.822l-.031.001zM38.981 136.578h-.006a.793.793 0 01-.788-.799c.004-.572-.051-2.707-.079-3.297a.794.794 0 111.585-.071c.028.617.084 2.774.08 3.379a.791.791 0 01-.792.788zM39.28 128.833l-.058-.002a.792.792 0 01-.737-.767c-.005-.072-.026-.291-.053-.577-.11-1.176-.208-2.261-.208-2.632a.794.794 0 01.793-.79h.003a.794.794 0 01.79.798c-.001.323.135 1.776.2 2.477.041.429.059.734.058.756a.79.79 0 01-.788.737zM49.426 125.749a.796.796 0 01-.784-.671c-.168-1.071-.229-2.154-.269-2.872-.016-.282-.025-.49-.04-.586a.802.802 0 01.645-.913.77.77 0 01.914.612c.021.108.043.396.066.798.038.686.096 1.721.253 2.714a.797.797 0 01-.785.918zM49.457 133.696a.793.793 0 01-.784-.683c-.158-1.104-.32-3.305-.383-4.316a.792.792 0 01.741-.84.8.8 0 01.84.742c.063.987.22 3.134.371 4.191a.791.791 0 01-.785.906zM49.416 141.077a.792.792 0 01-.79-.729c-.052-.624-.106-1.501-.156-2.3-.046-.753-.104-1.69-.13-1.852a.793.793 0 011.568-.246c.034.223.076.871.145 2 .049.785.104 1.651.153 2.27a.792.792 0 01-.79.857zM42.699 126.288a.793.793 0 01-.791-.762l-.054-1.335c-.067-1.699-.068-1.705-.096-1.857-.014-.083-.034-.195-.066-.429a.795.795 0 01.683-.892.792.792 0 01.89.684c.025.191.042.282.055.351.05.27.05.27.121 2.08l.053 1.334a.793.793 0 01-.76.824c-.013.002-.023.002-.035.002zM42.772 134.108a.794.794 0 01-.789-.729c-.26-3.169-.28-3.265-.32-3.472l-.026-.134a.793.793 0 111.562-.279l.021.104c.059.302.077.393.344 3.65a.791.791 0 01-.792.86zM42.667 141.38a.793.793 0 01-.792-.761c-.026-.619-.16-2.85-.184-3.061a.799.799 0 01.686-.884c.42-.043.825.239.885.67.038.255.178 2.742.198 3.21a.791.791 0 01-.76.824c-.011.002-.022.002-.033.002zM35.501 141.245a.794.794 0 01-.794-.794c0-.154-.023-.859-.138-3.356l-.008-.192a.793.793 0 01.758-.827c.389-.037.809.319.826.758l.01.188c.094 2.086.139 3.176.139 3.43a.794.794 0 01-.793.793zM35.265 133.671l-.063-.001a.794.794 0 01-.73-.852c.022-.297-.007-1.52-.029-2.41l-.027-1.167a.795.795 0 01.781-.806c.445-.028.798.344.806.781l.026 1.149c.033 1.327.053 2.224.025 2.573a.792.792 0 01-.789.733zM35.458 126.032a.791.791 0 01-.792-.85c.004-.072.004-.278.005-.588.003-.681.007-1.834.041-3.212.011-.436.377-.761.813-.773a.795.795 0 01.774.813c-.034 1.365-.038 2.504-.041 3.178-.001.395-.004.645-.01.706a.792.792 0 01-.79.726zM28.684 141.21a.793.793 0 01-.791-.744l-.11-1.683c-.066-1.005-.132-2.009-.146-2.299a.793.793 0 01.757-.828c.433-.044.808.32.827.758.013.286.079 1.274.145 2.267l.109 1.686a.792.792 0 01-.742.84c-.015 0-.032.003-.049.003zM28.58 133.199a.785.785 0 01-.769-.975l.007-.027c-.01-.001-.024-.213-.06-.869l-.106-1.973a.792.792 0 01.75-.834c.392-.032.81.313.834.75l.106 1.97c.063 1.157.063 1.157.009 1.358a.802.802 0 01-.771.6zM28.499 126.074a.795.795 0 01-.793-.782c-.01-.741.091-3.327.126-4.05.02-.437.413-.8.831-.753a.791.791 0 01.753.83c-.034.688-.134 3.253-.124 3.948a.795.795 0 01-.781.807h-.012zM21.671 141.21a.795.795 0 01-.791-.756c-.05-1.022-.118-2.824-.107-3.407.009-.438.395-.811.809-.778a.795.795 0 01.777.81c-.009.486.048 2.142.105 3.297a.792.792 0 01-.753.832c-.013.002-.025.002-.04.002zM21.873 133.402a.794.794 0 01-.792-.851c.002-.336-.153-2.993-.174-3.317a.794.794 0 01.74-.844.798.798 0 01.843.74c.002.033.21 3.294.167 3.592a.795.795 0 01-.784.68zM21.693 125.526a.8.8 0 01-.786-.917c.03-.359-.104-2.745-.148-3.129a.792.792 0 01.698-.879.802.802 0 01.877.698c.023.198.229 3.089.137 3.58a.794.794 0 01-.778.647zM14.903 141.21h-.017a.797.797 0 01-.776-.811c.021-1.026.019-2.427.01-2.585a.792.792 0 01.75-.833.788.788 0 01.834.747c.012.24.01 1.76-.009 2.702a.793.793 0 01-.792.78zM14.845 134.26a.793.793 0 01-.793-.77c-.021-.745-.141-2.66-.178-3.25l-.011-.177a.794.794 0 011.585-.089l.01.166c.038.601.158 2.545.181 3.302a.794.794 0 01-.77.817l-.024.001zM14.786 126.51a.792.792 0 01-.793-.787c-.005-.27-.13-3.441-.152-3.685a.8.8 0 01.708-.866c.436-.026.817.257.869.688.033.271.162 3.831.162 3.855a.796.796 0 01-.794.795zM8.09 141.21a.793.793 0 01-.789-.73 31.948 31.948 0 01-.098-2.862.794.794 0 01.793-.787h.007c.438.004.79.361.786.8-.008.953.022 1.87.092 2.721a.791.791 0 01-.726.854c-.022.001-.044.004-.065.004zM8.287 134.036l-.059-.002a.793.793 0 01-.734-.85c.011-.146.015-.521-.031-1.48a.791.791 0 01.754-.829.78.78 0 01.83.754c.042.868.051 1.384.03 1.671a.795.795 0 01-.79.736zM32.036 136.698a.787.787 0 01-.782-.677c-.022-.153-.211-3.049-.214-3.074a.795.795 0 01.748-.837c.396-.023.812.309.837.749.007.141.181 2.756.203 2.962a.796.796 0 01-.792.877zM31.919 129.163a.793.793 0 01-.793-.786c-.001-.122-.028-.831-.057-1.567-.026-.695-.053-1.417-.063-1.73a.793.793 0 01.77-.815c.442.013.804.334.816.771.009.31.035 1.025.063 1.714.027.761.056 1.488.057 1.614a.795.795 0 01-.787.801c-.002-.002-.004-.002-.006-.002zM24.343 136.176l.793-.03-.795-.04c-.017-.443-.11-2.736-.114-2.935a.794.794 0 01.774-.813c.434.039.802.337.812.776.004.195.095 2.468.112 2.904l-.788.106-.794.032zM24.892 129.285a.793.793 0 01-.793-.777c-.002-.11-.034-.757-.068-1.437-.04-.79-.081-1.627-.083-1.767a.795.795 0 01.78-.806c.428-.025.8.344.806.782.002.134.042.943.081 1.711.034.702.066 1.367.07 1.483a.795.795 0 01-.776.81l-.017.001zM18.373 137.01a.791.791 0 01-.789-.889c.009-.22-.041-1.313-.072-1.971l-.041-.912a.794.794 0 011.584-.059l.041.896c.084 1.797.088 2.1.056 2.278a.792.792 0 01-.779.657zM18.172 129.229a.795.795 0 01-.793-.834c.001-.266-.122-2.246-.144-2.564a.791.791 0 01.734-.847.797.797 0 01.848.735c.002.025.168 2.517.145 2.784a.795.795 0 01-.79.726zM11.544 136.19a.792.792 0 01-.795-.793l-.016-.498c-.023-.774-.065-2.172-.068-2.573a.794.794 0 01.79-.797h.003c.437 0 .792.353.794.791.001.396.044 1.769.068 2.53.011.396.008.662.006.667a.792.792 0 01-.782.673zM11.237 128.145l-.061-.002a.792.792 0 01-.731-.852c.018-.244.004-.595-.014-1.078-.01-.316-.023-.685-.031-1.108a.793.793 0 01.778-.809c.455-.04.8.34.809.776.007.415.02.777.03 1.088.02.559.031.966.01 1.251a.794.794 0 01-.79.734z"
          />
        </g>
        <g>
          <path
            fill="#BDE2F2"
            d="M114.704 128.829a.795.795 0 01-.789-.711 308.007 308.007 0 00-.252-2.41.885.885 0 01-.004-.137.798.798 0 01.771-.816c.455.023.8.32.814.756a.662.662 0 010 .063c.029.264.094.865.25 2.38a.793.793 0 01-.79.875zM114.626 136.661a.793.793 0 01-.792-.764 237.22 237.22 0 01-.061-2.064c-.015-.628-.026-1.119-.039-1.264a.795.795 0 01.717-.863.804.804 0 01.863.717c.015.155.029.688.045 1.37.017.616.033 1.361.06 2.045a.793.793 0 01-.763.822l-.03.001zM107.73 136.578h-.005a.795.795 0 01-.79-.799c.005-.572-.051-2.707-.077-3.297a.793.793 0 01.756-.829.804.804 0 01.828.758c.028.617.085 2.774.081 3.379a.793.793 0 01-.793.788zM108.028 128.833l-.057-.002a.79.79 0 01-.736-.767c-.005-.072-.028-.291-.054-.577-.111-1.176-.209-2.261-.208-2.632a.792.792 0 01.794-.79h.003a.795.795 0 01.79.798c-.001.323.135 1.776.2 2.477.042.429.06.734.059.756a.793.793 0 01-.791.737zM118.174 125.749a.794.794 0 01-.782-.671c-.169-1.071-.229-2.154-.271-2.872-.015-.282-.022-.49-.038-.586a.803.803 0 01.644-.913.77.77 0 01.913.612c.023.108.043.396.066.798.039.686.098 1.721.253 2.714a.796.796 0 01-.785.918zM118.207 133.696a.794.794 0 01-.785-.683c-.158-1.104-.319-3.305-.384-4.316a.793.793 0 01.743-.84.811.811 0 01.841.742c.062.987.22 3.134.37 4.191a.791.791 0 01-.785.906zM118.164 141.077a.791.791 0 01-.789-.729c-.051-.624-.107-1.501-.157-2.3-.045-.753-.104-1.69-.128-1.852a.793.793 0 011.566-.246c.037.223.078.871.147 2 .049.785.101 1.651.151 2.27a.791.791 0 01-.79.857zM111.447 126.288a.79.79 0 01-.789-.762l-.055-1.335c-.067-1.699-.068-1.705-.096-1.857a7.192 7.192 0 01-.066-.429.794.794 0 01.684-.892.789.789 0 01.888.684c.026.191.043.282.056.351.049.27.049.27.12 2.08l.052 1.334a.79.79 0 01-.759.824c-.012.002-.023.002-.035.002zM111.521 134.108a.793.793 0 01-.789-.729c-.26-3.169-.28-3.265-.32-3.472l-.025-.134a.793.793 0 111.563-.279l.019.104c.061.302.077.393.345 3.65a.791.791 0 01-.726.855.378.378 0 01-.067.005zM111.405 141.21a.793.793 0 01-.791-.762c-.034-.814-.145-2.669-.172-2.875a.802.802 0 01.667-.896.78.78 0 01.897.643c.048.271.169 2.521.191 3.062a.79.79 0 01-.76.825c-.008.003-.021.003-.032.003zM104.25 141.245a.793.793 0 01-.793-.794c0-.154-.023-.859-.138-3.356l-.008-.192a.789.789 0 01.758-.827c.012-.002.021-.002.034-.002.423 0 .773.335.791.76l.01.188c.094 2.086.139 3.176.139 3.43a.793.793 0 01-.793.793zM104.013 133.671l-.062-.001a.793.793 0 01-.73-.852c.023-.297-.007-1.52-.028-2.41l-.027-1.167a.795.795 0 01.781-.806c.401-.028.799.344.807.781l.024 1.149c.032 1.327.054 2.224.026 2.573a.794.794 0 01-.791.733zM104.208 126.032a.79.79 0 01-.792-.85c.004-.072.004-.278.005-.588.002-.681.007-1.834.04-3.212.012-.436.353-.761.813-.773a.795.795 0 01.774.813c-.035 1.365-.039 2.504-.042 3.178-.002.395-.005.645-.01.706a.79.79 0 01-.788.726zM97.433 141.21a.793.793 0 01-.79-.744l-.108-1.683c-.067-1.005-.134-2.009-.146-2.299a.79.79 0 01.757-.828c.442-.044.807.32.827.758.012.286.078 1.274.143 2.267l.109 1.686a.791.791 0 01-.74.84c-.018 0-.035.003-.052.003zM97.329 133.199a.787.787 0 01-.77-.975l.008-.027c-.011-.001-.023-.213-.061-.869l-.105-1.973a.793.793 0 01.751-.834c.391-.032.811.313.833.75l.106 1.97c.063 1.157.063 1.157.012 1.358a.808.808 0 01-.774.6zM97.248 126.074a.793.793 0 01-.792-.782c-.012-.741.09-3.327.124-4.05.021-.437.41-.8.834-.753a.791.791 0 01.751.83c-.033.688-.135 3.253-.123 3.948a.796.796 0 01-.782.807h-.012zM90.422 141.21a.793.793 0 01-.792-.756c-.051-1.022-.12-2.824-.108-3.407.009-.438.328-.811.81-.778a.795.795 0 01.778.81c-.011.486.046 2.142.104 3.297a.791.791 0 01-.752.832c-.013.002-.027.002-.04.002zM90.621 133.402a.795.795 0 01-.791-.851c.002-.336-.152-2.993-.174-3.317a.794.794 0 01.739-.844.797.797 0 01.843.74c.003.033.211 3.294.169 3.592a.796.796 0 01-.786.68zM90.441 125.526a.799.799 0 01-.785-.917c.03-.359-.104-2.745-.149-3.129a.795.795 0 01.699-.879.799.799 0 01.878.698c.023.198.229 3.089.136 3.58a.795.795 0 01-.779.647zM83.653 141.21h-.018a.797.797 0 01-.777-.811 83.55 83.55 0 00.012-2.585.79.79 0 01.75-.833.806.806 0 01.835.747c.013.24.011 1.76-.01 2.702a.795.795 0 01-.792.78zM83.596 134.26a.795.795 0 01-.795-.77c-.021-.745-.143-2.66-.178-3.25l-.011-.177a.794.794 0 011.585-.089l.01.166c.036.601.157 2.545.182 3.302a.795.795 0 01-.771.817l-.022.001zM83.533 126.51a.796.796 0 01-.793-.787c-.005-.27-.129-3.441-.15-3.685a.799.799 0 01.707-.866c.431-.026.819.257.868.688.035.271.163 3.831.163 3.855a.795.795 0 01-.795.795zM76.839 141.21a.793.793 0 01-.789-.73 33.093 33.093 0 01-.099-2.862.795.795 0 01.794-.787h.007a.793.793 0 01.787.8c-.01.953.023 1.87.091 2.721a.79.79 0 01-.726.854c-.021.001-.044.004-.065.004zM77.041 134.033a.79.79 0 01-.791-.857c.038-.493-.08-2.345-.15-3.179a.794.794 0 011.581-.132c.002.026.214 2.639.148 3.438a.792.792 0 01-.788.73zM76.83 126.339h-.006a.793.793 0 01-.787-.799c.001-.073-.01-.523-.117-3.063a.793.793 0 01.757-.827c.477-.042.809.322.826.759.122 2.854.12 3.071.12 3.144a.793.793 0 01-.793.786zM69.924 141.21c-.02 0-.039-.003-.06-.004a.794.794 0 01-.732-.849c.042-.576.107-1.331.16-1.917l.018-.267c.011-.15.023-.284.038-.4a.798.798 0 01.889-.684c.434.056.74.454.685.889-.013.092-.02.198-.029.32l-.021.241c-.052.62-.115 1.368-.157 1.935a.796.796 0 01-.791.736zM70.154 134.475a.792.792 0 01-.792-.792c0-.147.031-3.215.033-3.362a.793.793 0 01.793-.783h.011a.794.794 0 01.783.804 928.53 928.53 0 00-.034 3.342.794.794 0 01-.794.791zM70.145 126.926a.789.789 0 01-.785-.693 35.04 35.04 0 01-.051-.688 246.69 246.69 0 00-.193-2.665.792.792 0 111.581-.127c.073.907.149 2.003.196 2.683.022.335.038.566.044.62a.797.797 0 01-.705.866c-.031.002-.059.004-.087.004zM62.667 140.568a.793.793 0 01-.791-.848 523.417 523.417 0 00.094-2.872.783.783 0 01.837-.748c.438.025.772.4.747.838l-.029.89c-.063 1.992-.063 1.994-.072 2.056a.793.793 0 01-.786.684zM63.019 133.588a.794.794 0 01-.794-.793v-.319c-.001-.756-.003-2.585-.001-2.734a.773.773 0 01.807-.78.794.794 0 01.78.808c-.002.147 0 1.956.001 2.705v.321a.795.795 0 01-.793.792zM62.958 126.447a.792.792 0 01-.793-.783c-.006-.565-.027-3.167-.025-3.546a.793.793 0 01.793-.789h.004c.438.003.792.36.79.799-.002.376.018 2.958.024 3.519a.792.792 0 01-.785.801l-.008-.001zM55.813 141.21a.795.795 0 01-.793-.795c0-1.135.012-2.493.033-2.995.02-.438.422-.791.827-.758a.792.792 0 01.758.825c-.021.492-.031 1.82-.031 2.928a.796.796 0 01-.794.795zM55.99 134.009h-.013a.794.794 0 01-.78-.807c.02-1.117.124-3.155.145-3.347.046-.438.437-.771.873-.704a.792.792 0 01.704.873 90.69 90.69 0 00-.134 3.204.797.797 0 01-.795.781zM56.145 126.497l-.034-.001a.792.792 0 01-.76-.824c.044-1.098.033-2.042.023-2.956-.006-.502-.013-.997-.009-1.509a.793.793 0 01.792-.79h.004a.796.796 0 01.791.799c-.004.503.003.989.008 1.48.011.935.021 1.901-.025 3.04a.792.792 0 01-.79.761zM100.785 136.698a.785.785 0 01-.782-.677c-.022-.153-.213-3.049-.215-3.074a.797.797 0 01.749-.837c.4-.023.812.309.837.749.006.141.183 2.756.201 2.962a.796.796 0 01-.79.877zM100.667 129.163a.795.795 0 01-.793-.786c-.001-.122-.027-.831-.055-1.567-.028-.695-.055-1.417-.063-1.73a.795.795 0 01.771-.815c.46.013.803.334.816.771.008.31.034 1.025.062 1.714.027.761.057 1.488.058 1.614a.795.795 0 01-.787.801l-.009-.002zM93.093 136.176l.792-.03-.796-.04c-.017-.443-.108-2.736-.113-2.935a.795.795 0 01.774-.813h.018c.431 0 .783.343.795.776.004.195.094 2.468.112 2.904l-.79.106-.792.032zM93.642 129.285a.792.792 0 01-.793-.777c-.002-.11-.036-.757-.068-1.437-.04-.79-.081-1.627-.083-1.767a.795.795 0 01.781-.806h.013c.433 0 .785.348.792.782.004.134.043.943.081 1.711.036.702.067 1.367.07 1.483a.795.795 0 01-.776.81l-.017.001zM52.896 129.266a.795.795 0 01-.79-.721c-.055-.614-.165-2.122.033-2.849a.797.797 0 01.975-.555.792.792 0 01.556.974c-.083.302-.075 1.283.017 2.286a.793.793 0 01-.791.865zM52.308 136.983a.796.796 0 01-.792-.759c-.001-.024-.099-2.601-.058-3.15.033-.438.405-.75.851-.732a.795.795 0 01.731.853c-.027.364.04 2.504.06 2.958a.794.794 0 01-.756.83h-.036zM87.121 137.01a.792.792 0 01-.788-.889c.01-.22-.04-1.313-.071-1.971l-.041-.912a.792.792 0 01.763-.822.789.789 0 01.822.763l.041.896c.083 1.797.088 2.1.055 2.278a.794.794 0 01-.781.657zM86.92 129.229a.796.796 0 01-.792-.834c.001-.266-.122-2.246-.144-2.564a.793.793 0 111.58-.112c.004.025.17 2.517.146 2.784a.795.795 0 01-.79.726zM80.293 136.19a.792.792 0 01-.795-.793l-.014-.498a181.96 181.96 0 01-.069-2.573.795.795 0 01.791-.797h.002c.438 0 .792.353.794.791.001.396.045 1.769.068 2.53.012.396.007.662.006.667a.794.794 0 01-.783.673zM79.989 128.144l-.047-.001a.794.794 0 01-.746-.838c.015-.225 0-.544-.015-.977a48.306 48.306 0 01-.042-1.709.793.793 0 01.787-.798h.006c.436 0 .791.351.794.787.004.675.023 1.224.04 1.664.017.498.027.867.014 1.124a.795.795 0 01-.791.748zM73.67 137.113a.793.793 0 01-.792-.776 48.706 48.706 0 00-.039-1.144c-.016-.386-.03-.755-.043-1.52a.792.792 0 01.782-.803c.403.014.799.343.806.78.01.742.026 1.1.04 1.476.014.309.027.631.04 1.176a.796.796 0 01-.794.811zM73.572 129.335a.792.792 0 01-.793-.767c-.006-.129-.071-.807-.19-2.03a.792.792 0 01.712-.866.79.79 0 01.866.712c.196 1.992.197 2.098.198 2.147a.794.794 0 01-.782.804h-.011zM66.574 136.837l-.047-.001a.793.793 0 01-.746-.838c.006-.146-.01-.733-.023-1.275-.011-.419-.02-.81-.02-.975a.792.792 0 111.586 0c0 .156.009.532.02.936.015.606.03 1.268.021 1.407a.794.794 0 01-.791.746zM66.454 129.45a.795.795 0 01-.794-.774l-.007-.22c-.019-.599-.072-2.2-.077-2.586a.795.795 0 01.783-.804h.01c.434 0 .788.349.793.783.005.38.057 1.962.076 2.555l.009.253a.792.792 0 01-.793.793zM59.576 136.798a.793.793 0 01-.789-.881c.008-.166.004-.777.002-1.364-.001-.443-.002-.874 0-1.11a.793.793 0 01.793-.784h.009c.438.005.79.363.784.802-.002.232-.001.652 0 1.087.006 1.499.002 1.517-.028 1.642a.795.795 0 01-.771.608zM59.668 129.255a.784.784 0 01-.773-.628c-.048-.244-.3-3.109-.302-3.135a.794.794 0 01.74-.843c.438-.014.815.302.843.74.018.276.247 2.731.279 2.95a.8.8 0 01-.787.916z"
          />
        </g>
        <g>
          <path
            fill="#BDE2F2"
            d="M131.418 140.568a.794.794 0 01-.793-.848c.006-.135.039-1.162.063-1.942l.03-.93a.786.786 0 01.838-.748c.438.025.771.4.746.838l-.028.89c-.064 1.992-.064 1.994-.073 2.056a.791.791 0 01-.783.684zM131.768 133.588a.794.794 0 01-.794-.793v-.319c-.001-.756-.003-2.585-.001-2.734a.78.78 0 01.807-.78.794.794 0 01.78.808c-.003.147 0 1.956.001 2.705v.321a.794.794 0 01-.793.792zM124.563 141.21a.796.796 0 01-.794-.795c0-1.135.011-2.493.033-2.995.021-.438.433-.791.827-.758a.792.792 0 01.758.825c-.022.492-.031 1.82-.031 2.928a.795.795 0 01-.793.795zM124.739 134.009h-.013a.793.793 0 01-.779-.807c.019-1.117.123-3.155.145-3.347.045-.438.438-.771.871-.704a.792.792 0 01.704.873 98.061 98.061 0 00-.135 3.204.793.793 0 01-.793.781zM124.893 126.497l-.031-.001a.793.793 0 01-.761-.824c.046-1.098.032-2.042.021-2.956-.006-.502-.013-.997-.01-1.509a.793.793 0 01.795-.79h.005c.437.003.79.359.788.799-.003.503.003.989.009 1.48a56.44 56.44 0 01-.023 3.04.795.795 0 01-.793.761zM121.645 129.266a.793.793 0 01-.788-.721c-.056-.614-.166-2.122.033-2.849a.794.794 0 011.531.419c-.083.302-.075 1.283.017 2.286a.794.794 0 01-.793.865zM121.056 136.983a.795.795 0 01-.791-.759c-.001-.024-.1-2.601-.058-3.15a.808.808 0 01.852-.732.794.794 0 01.73.853c-.026.364.039 2.504.061 2.958a.795.795 0 01-.756.83h-.038zM128.325 136.798a.793.793 0 01-.79-.881c.007-.166.004-.777.002-1.364-.001-.443-.002-.874 0-1.11a.793.793 0 01.795-.784h.008a.793.793 0 01.784.802c-.002.232-.001.652 0 1.087.005 1.499.001 1.517-.028 1.642a.795.795 0 01-.771.608zM128.416 129.255a.782.782 0 01-.771-.628c-.051-.244-.302-3.109-.303-3.135a.794.794 0 01.739-.843c.439-.014.815.302.843.74.019.276.248 2.731.279 2.95a.8.8 0 01-.787.916z"
          />
        </g>
        <g>
          <path
            fill="#8DB2C2"
            d="M112.824 141.21a.71.71 0 01-.122-.012.792.792 0 01-.663-.905c.383-2.465.958-6.347 1.53-11.587.071-.68.146-1.338.221-1.966 1.365-11.536 2.711-15.229 3.897-18.489.608-1.671 1.134-3.112 1.591-5.45.085-.43.51-.7.931-.627.431.085.71.5.627.93-.481 2.463-1.053 4.029-1.657 5.69-1.159 3.178-2.471 6.782-3.813 18.135-.074.62-.147 1.274-.222 1.948a250.65 250.65 0 01-1.538 11.66.792.792 0 01-.782.673zM70.219 141.21a.795.795 0 01-.792-.752 51.078 51.078 0 00-.135-1.875c-.042-.467-.091-.959-.143-1.479-.077-.789-.162-1.641-.239-2.568a140.014 140.014 0 01-.316-4.714c-.248-4.56-.351-6.445-3.744-17.455-1.424-4.621-3.208-8.644-4.425-11.271a.796.796 0 01.386-1.054.797.797 0 011.054.388c1.236 2.666 3.049 6.757 4.5 11.47 3.452 11.196 3.558 13.14 3.813 17.836.072 1.286.15 2.744.314 4.668.075.919.16 1.763.237 2.543.052.525.102 1.023.144 1.494.064.696.105 1.331.14 1.932a.793.793 0 01-.75.835c-.016.002-.03.002-.044.002zM73.438 112.676l-.037-.001a.795.795 0 01-.756-.828c.263-5.776 1.029-9.82 2.283-12.023a.793.793 0 011.378.786c-1.112 1.953-1.83 5.863-2.076 11.309a.794.794 0 01-.792.757z"
          />
          <path
            fill="#8DB2C2"
            d="M57.115 113.041c-.911 0-1.303-.708-2.49-5.848-.205-.883-.364-1.666-.507-2.37-.375-1.843-.622-3.061-1.275-4.167-.601-1.042-1.477-1.639-2.403-2.271-.739-.505-1.503-1.025-2.149-1.784-1.126-1.322-1.684-3.095-1.657-5.266a.794.794 0 01.793-.785h.009a.794.794 0 01.784.803c-.022 1.777.408 3.197 1.278 4.219.508.597 1.153 1.037 1.836 1.503.984.672 2.099 1.434 2.879 2.782.782 1.331 1.067 2.724 1.458 4.649.141.692.298 1.462.499 2.33.378 1.64.663 2.737.877 3.467.067-.304.135-.622.201-.93.713-3.353 1.906-8.958 5.417-11.183 1.496-.945 3.246-1.19 5.214-.726a.795.795 0 01-.366 1.545c-1.553-.366-2.863-.198-4 .521-2.947 1.867-4.052 7.064-4.713 10.171-.502 2.355-.709 3.331-1.669 3.339l-.016.001zM80.782 113.819a1.635 1.635 0 01-1.639-1.581c-.353-9.291-3.846-11.295-3.882-11.312a.796.796 0 01-.354-1.066.798.798 0 011.066-.354c.177.089 4.362 2.303 4.756 12.672.583-.806 1.057-1.736 1.515-2.642l.424-.83c.476-.908.682-1.436.9-1.996.35-.9.68-1.751 2.001-3.915a23.366 23.366 0 012.479-3.396c.953-1.118 1.642-1.925 2.781-4.983 1.573-4.358 1.137-5.187-.035-7.399-.149-.285-.311-.588-.476-.919a.788.788 0 01.35-1.064.786.786 0 011.065.351c.162.32.316.615.464.891 1.342 2.54 1.863 3.865.121 8.688-1.239 3.329-2.046 4.273-3.066 5.468a21.944 21.944 0 00-2.331 3.192c-1.245 2.042-1.552 2.83-1.876 3.665-.225.576-.456 1.171-.97 2.152l-.416.817c-.473.927-.96 1.887-1.502 2.781-.299.494-.821.78-1.375.78zM33.402 141.21a.795.795 0 01-.764-.582 181.739 181.739 0 00-1.37-4.698 259.7 259.7 0 00-3.521-10.499.402.402 0 01-.022-.075c-.143-.404-.292-.811-.441-1.22l-.16-.436c-1.684-4.628-4.294-8.595-6.023-11.219-.927-1.406-1.596-2.422-1.862-3.123a.792.792 0 111.483-.562c.205.535.9 1.592 1.704 2.813 1.77 2.685 4.442 6.745 6.191 11.549l.156.432c.16.437.318.869.47 1.301a.502.502 0 01.02.066 258.386 258.386 0 013.522 10.507c.51 1.67.967 3.241 1.382 4.739a.796.796 0 01-.765 1.007z"
          />
        </g>
        <g>
          <path
            fill="#7BA0B0"
            d="M72.641 116.349c-.162-.731-.947-1.182-1.885-.813-1.354.536-.979 2.617.31 2.617.804-.001 1.788-.847 1.575-1.804zM66.153 101.211c-.99-.72-2.051-.385-2.345.438-.322.891.51 1.916 1.42 1.916 1.238-.001 2.085-1.514.925-2.354zM74.777 129.015c-.517-.802-1.746-.854-2.356.302-.529 1.003.314 2.136 1.29 2.136 1.117-.001 1.608-1.598 1.066-2.438z"
          />
        </g>
        <g>
          <path
            fill="#8DB2C2"
            d="M79.11 141.212a.795.795 0 01-.784-.68l-3.53-24.14c-1.849-3.856-3.313-6.52-4.493-8.663-2.163-3.933-3.25-5.906-3.399-9.458a.79.79 0 01.759-.825c.419-.054.808.319.825.756.135 3.183 1.097 4.932 3.205 8.763 1.2 2.182 2.694 4.895 4.585 8.854a.767.767 0 01.069.227l3.55 24.258a.794.794 0 01-.787.908z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#66353D"
          d="M47.687 43.19c-1.238 2.271.869 9.097 4.1 10.374 1.586.625 2.198-.542 2.895-1.32l-1.51-7.898c-.823-.479-3.907-3.96-5.485-1.156zM86.678 45.146l-1.698 7.093c.636 1.735 2.025 2.062 3.18 1.379 1.804-1.106 4.093-7.69 4.04-9.273-.111-3.185-3.781-3.011-5.522.801z"
        />
        <path
          fill="#592A2A"
          d="M53.167 48.71c-.369 0-.7-.26-.777-.638-.233-1.162-1.271-2.258-2.098-2.61-.145-.06-.498-.188-.697-.06a.792.792 0 11-.857-1.334c.596-.383 1.367-.408 2.173-.066 1.42.601 2.726 2.217 3.036 3.759a.795.795 0 01-.78.949zM85.758 49.783a.79.79 0 01-.752-1.044c.694-2.083 2.653-4.407 4.109-4.878.682-.223 1.148-.033 1.421.161a.793.793 0 01-.924 1.289c-.498.024-2.446 1.97-3.103 3.931a.792.792 0 01-.751.541z"
        />
        <path
          fill="#744149"
          d="M81.195 22.614c-2.652.083-6.342 4.381-9.587 5.047-4.583.939-10.978-6.137-14.178-3.998-7.223 4.866-6.656 14.925-6.257 20.067 2.984 38.476 31.541 44.13 36.66 2.506 1.302-10.577-1.368-23.789-6.638-23.622z"
        />
        <path
          fill="#3B1D25"
          d="M85.599 53.894c-2.32 5.983-6.056 15.062-9.833 14.567-1.945-.25-3.576-.484-3.682-.521.422-4.438-4.402-3.64-4.911-2.176-.098.293-.192 1.259-.049 2.062-.903.378-1.805.546-3.101.539-3.768 0-8.428-9.11-10.824-14.945-.226-.553-1.052-.311-.959.278 1.059 6.681 4.596 14.323 7.405 19.358 3.738 6.659 5.352 2.712 13.214 3.84 2.267.295 4.201.539 5.854-1.339 2.876-3.252 6.28-14.256 7.843-21.376.132-.604-.735-.862-.957-.287z"
        />
        <path
          fill="#66353D"
          d="M67.226 55.003c-.396 0-.802-.1-1.166-.395-.802-.65-1.039-1.992-.744-4.226.246-1.762.601-2.517 1.092-3.564.51-1.085 1.208-2.571 2.164-6.168a.794.794 0 011.532.408c-.992 3.735-1.725 5.295-2.26 6.437-.464.987-.744 1.583-.956 3.103-.307 2.318.119 2.738.169 2.778.169.138.788-.084 1.087-.19.124-.045.24-.086.346-.118.713-.219 1.226-.072 1.637.046.241.069.47.133.778.142.388.011.438-.046.629-.238.123-.122.275-.275.495-.405a.79.79 0 011.087.278.792.792 0 01-.279 1.087c-.05.029-.108.088-.182.163-.371.369-.793.746-1.795.702-.506-.014-.875-.12-1.171-.205-.331-.095-.468-.134-.733-.054-.084.026-.179.06-.279.096-.379.135-.906.323-1.451.323z"
        />
        <path
          fill="#3B1D25"
          d="M79.952 44.01a1.058 1.058 0 01-1.053-1.179c.052-.442.066-.68.081-.882.016-.243.027-.445.081-.821a1.06 1.06 0 012.095.298c-.044.302-.054.464-.067.661-.014.227-.031.493-.089.988-.062.539-.52.935-1.048.935zM60.134 44.142c-.491 0-.931-.344-1.035-.844-.103-.499-.233-2.05-.235-2.065a1.06 1.06 0 01.968-1.142 1.072 1.072 0 011.141.968c.046.563.149 1.574.199 1.812a1.058 1.058 0 01-1.038 1.271z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#4D2631"
            d="M57.253 37.918a.792.792 0 01-.394-1.481c1.658-1.124 3.636-1.499 5.613-1.084a.794.794 0 01-.325 1.554c-1.581-.334-3.09-.048-4.366.821-.045.03-.174.108-.224.129a.778.778 0 01-.304.061zM82.445 37.695a.798.798 0 01-.599-.272c-.528-.609-2.327-.959-3.668-.501a.793.793 0 11-.513-1.501c1.895-.647 4.359-.208 5.379.961a.795.795 0 01-.078 1.12.796.796 0 01-.521.193z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M69.824 59.079c-1.1 0-2.423-.477-3.303-1.009-2.098-1.27-2.822-.357-2.312.507 1.44 2.444 7.167 7.129 10.973.263.158-.287.488-.882.106-1.288-.784-.825-3.359 1.527-5.464 1.527z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#ED7278"
            d="M78.384 55.626c.749 1.88 3.765 1.11 3.286-1.326-.466-2.38-4.629-2.05-3.286 1.326zM57.83 55.86c1.317 2.055 4.404-.292 3.152-2.326-1.047-1.701-4.864-.346-3.152 2.326z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar17: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#42527D"
        d="M41.285 17.832c-4.313 5.414-1.121 10.567-2.197 15.88-1.005 5.071-7.39 6.244-5.37 13.489 1.323 4.751 5.912 5.536 7.945 8.815 2.159 3.484-.498 9.884 1.308 13.702 1.823 3.88 6.048 1.735 9.495 4.771 5.41 4.731-.349 11.753 8.496 13.74l6.047-58.712-14.394-14.326c-5.398-.478-8.086-1.41-11.33 2.641z"
      />
      <path
        fill="#4D5F91"
        d="M62.364 79.641a.928.928 0 01-.214-.026c-4.256-1.083-4.618-4.057-4.909-6.444-.258-2.125-.486-3.357-2.134-3.995-.814-.313-1.758-.345-2.67-.375-1.558-.052-3.323-.112-4.435-1.695-1.349-1.938-.023-4.04.945-5.574.34-.539.662-1.047.806-1.438.525-1.415-.038-1.772-1.745-2.595-1.671-.806-3.961-1.909-3.57-5.205.255-2.146 1.015-3.691 1.47-4.615.09-.18.168-.341.232-.482.909-2.002-.05-3.434-1.162-5.092-1.054-1.573-2.25-3.356-1.31-5.566.379-.891.982-1.395 1.514-1.839.603-.503 1.078-.901 1.344-1.85.263-.939-.581-2.006-1.475-3.139-1.016-1.288-2.167-2.746-1.967-4.479.376-3.244 2.734-4.11 4.813-4.874 1.778-.653 3.458-1.269 4.36-3.206a.861.861 0 011.559.727c-1.203 2.579-3.393 3.382-5.325 4.092-2.2.809-3.455 1.367-3.698 3.458-.119 1.025.72 2.089 1.609 3.214 1.068 1.354 2.28 2.887 1.781 4.668-.411 1.464-1.236 2.152-1.897 2.707-.457.381-.817.682-1.034 1.192-.547 1.287.083 2.333 1.156 3.936 1.161 1.731 2.604 3.885 1.301 6.756-.068.155-.157.335-.256.535-.432.878-1.085 2.206-1.304 4.06-.235 1.977.838 2.599 2.608 3.454 1.564.753 3.708 1.786 2.61 4.741-.207.559-.574 1.141-.964 1.756-.986 1.564-1.636 2.743-.99 3.672.587.836 1.554.91 3.083.961 1.005.034 2.146.072 3.231.489 2.691 1.04 2.974 3.352 3.222 5.391.286 2.343.511 4.193 3.626 4.988.46.115.738.583.62 1.046a.857.857 0 01-.831.646zM40.86 55.83a.86.86 0 01-.781-1.22l.095-.206c.975-2.117 1.817-3.947 1.103-6.268-.405-1.307-1.184-1.904-2.083-2.594-.677-.52-1.377-1.056-1.94-1.908-1.426-2.183.107-4.016 1.461-5.634 1.45-1.732 2.949-3.523 2.118-6.161-.436-1.344-1.06-2.136-1.719-2.976-.251-.319-.503-.639-.746-.987a.858.858 0 111.408-.985c.225.321.457.616.688.909.725.921 1.474 1.873 2.005 3.516 1.118 3.542-.853 5.896-2.436 7.789-1.47 1.758-2.004 2.574-1.343 3.584.401.608.958 1.036 1.55 1.489.99.759 2.111 1.619 2.68 3.451.908 2.951-.155 5.26-1.185 7.495l-.094.205a.857.857 0 01-.781.501z"
      />
      <path
        fill="#4D5F91"
        d="M99.596 70.392c.137 3.509 4.872 6.271 4.643 10.536l-8.428-1.812-9.687-2.099-10.17-2.188c.138-.402.287-.837.471-1.319 2.225-5.893.286-10.57-.597-12.909L63.274 31.846c-6.432-.516-6.432-6.593-8.233-8.61-.446-.493-1.307-1.319-2.155-2.167a31.461 31.461 0 01-1.789-1.892 7.085 7.085 0 01-1.1-1.766c-1.411-3.21-.103-6.971 3.611-8.782 2.615-1.272 4.128-1.192 6.341-1.594a18.482 18.482 0 001.903-.447C67.08 5.087 67.596-1.3 76.046.971c4.231 1.135 4.666 4.081 8.542 5.515 3.921 1.445 7.51.768 11.006 4.196 6.559 6.443 2.901 10.651 3.956 14.423.011.08.034.149.057.229.952 2.9 3.543 3.543 4.7 6.615 2.007 5.309-1.513 9.31-2.785 12.474-2.201 5.446.734 7.796 2.12 10.571 4.093 8.152-4.219 10.261-4.046 15.398z"
      />
      <path
        fill="#5B73A3"
        d="M85.826 47.689a.86.86 0 01-.828-.63c-.84-3.036.26-5.218 1.322-7.328 1.196-2.377 2.229-4.43.749-7.755-1.389-3.109-3.288-3.366-5.485-3.665-1.606-.218-3.429-.465-4.888-1.997-.712-.754-1.163-1.812-1.64-2.93-.915-2.145-1.578-3.448-3.065-3.464h-.014c-1.021 0-1.829.837-2.762 1.807-1.383 1.434-3.098 3.214-5.945 1.909-1.194-.541-1.927-1.368-2.574-2.096-.6-.675-1.167-1.313-2.08-1.733-1.838-.846-3.712-.191-5.016 1.74a.859.859 0 11-1.426-.96c1.789-2.653 4.533-3.546 7.161-2.342 1.242.573 1.988 1.414 2.647 2.154.611.688 1.137 1.282 2.003 1.673 1.659.763 2.553-.044 3.993-1.536 1.055-1.095 2.249-2.334 4.002-2.334h.027c2.721.028 3.779 2.513 4.632 4.51.415.974.807 1.892 1.307 2.421 1.04 1.09 2.351 1.268 3.87 1.475 2.365.321 5.045.685 6.824 4.668 1.813 4.071.434 6.812-.783 9.229-1 1.984-1.863 3.7-1.202 6.095a.86.86 0 01-.829 1.089zM86.125 77.878a.863.863 0 01-.729-.402c-.381-.604-.86-1.193-1.368-1.814-1.566-1.925-3.344-4.104-2.078-7.074.385-.887 1.186-1.777 2.111-2.807 1.439-1.603 3.071-3.417 3.071-5.249 0-.76-.563-1.797-1.156-2.895-.664-1.224-1.417-2.613-1.633-4.077-.227-1.47.067-4.294.254-4.788a.861.861 0 011.608.611c-.071.281-.354 2.68-.161 3.92.172 1.168.818 2.36 1.442 3.514.702 1.296 1.365 2.518 1.365 3.714 0 2.491-1.947 4.658-3.513 6.398-.791.88-1.538 1.712-1.809 2.337-.856 2.009.388 3.537 1.83 5.307.518.635 1.053 1.292 1.49 1.986a.86.86 0 01-.724 1.319z"
      />
      <path
        fill="#5B73A3"
        d="M95.811 79.976a.86.86 0 01-.737-1.3c1.531-2.573.224-4.26-1.947-6.54-1.061-1.112-2.062-2.163-2.378-3.398-.819-3.343 1.585-5.438 3.708-7.284 1.902-1.658 3.546-3.09 3.169-5.171-.199-1.106-.825-1.807-1.551-2.619-.837-.937-1.785-1.999-1.934-3.742-.196-2.363.883-4.008 1.835-5.46 1.304-1.987 2.332-3.558.687-6.79-.916-1.79-2.217-2.7-3.475-3.579-1.729-1.209-3.519-2.458-3.042-5.707.516-3.331.259-5.616-.76-6.797-1.136-1.318-3.289-1.308-5.354-1.295-1.569.007-3.043.015-4.252-.496-2.01-.855-2.559-2.375-3.042-3.716-.412-1.142-.769-2.128-1.978-2.818-1.88-1.066-3.278.285-5.2 2.471-.733.834-1.426 1.622-2.152 2.059-3.535 2.149-5.487.153-7.057-1.45-1.277-1.304-2.381-2.425-4.311-2.14-1.963.292-2.438.925-3.095 1.802-.521.697-1.171 1.563-2.603 2.194a.86.86 0 01-.694-1.574c1.02-.449 1.438-1.006 1.921-1.651.729-.973 1.555-2.075 4.215-2.471 2.806-.417 4.459 1.273 5.795 2.638 1.545 1.577 2.565 2.622 4.938 1.181.5-.301 1.107-.992 1.75-1.723 1.732-1.973 4.104-4.676 7.342-2.83 1.762 1.002 2.283 2.451 2.744 3.729.435 1.204.777 2.155 2.098 2.716.881.375 2.187.364 3.569.36 2.355-.015 5.013-.026 6.666 1.892 1.382 1.603 1.761 4.276 1.158 8.175-.321 2.191.675 2.888 2.326 4.042 1.297.906 2.91 2.033 4.021 4.208 2.1 4.122.57 6.455-.779 8.512-.878 1.339-1.706 2.604-1.561 4.374.101 1.17.751 1.899 1.504 2.742.785.879 1.674 1.875 1.96 3.457.551 3.043-1.724 5.025-3.731 6.774-2.005 1.747-3.737 3.255-3.17 5.569.204.792 1.055 1.686 1.955 2.632 1.896 1.992 4.494 4.72 2.18 8.605a.856.856 0 01-.738.419z"
      />
      <path
        fill="#5B73A3"
        d="M99.55 25.962a.865.865 0 01-.277-.046c-3.724-1.265-4.772-4.544-5.697-7.438-.683-2.133-1.327-4.147-2.911-5.259-1.504-1.055-3.097-.565-4.784-.05-1.085.332-2.108.652-3.131.545-2.453-.231-3.281-1.968-4.158-3.805-.305-.637-.618-1.295-1.026-1.991-.808-1.37-1.849-2.227-3.013-2.476a3.36 3.36 0 00-2.651.553c-.608.43-1.104.996-1.627 1.594-1.318 1.505-2.817 3.209-6.207 2.525-1.436-.286-2.39-.932-3.314-1.556-.384-.259-.777-.526-1.22-.771a.86.86 0 01.833-1.504c.49.271.925.564 1.35.851.853.578 1.591 1.075 2.689 1.294 2.426.491 3.323-.543 4.574-1.972.567-.648 1.153-1.318 1.927-1.865a5.092 5.092 0 014.005-.831c1.149.246 2.799 1.016 4.136 3.286.446.761.791 1.483 1.096 2.122.893 1.868 1.346 2.7 2.771 2.834.687.075 1.546-.198 2.463-.478 1.819-.556 4.084-1.247 6.273.287 2.059 1.444 2.824 3.833 3.563 6.144.879 2.751 1.711 5.349 4.613 6.335a.859.859 0 01-.277 1.672z"
      />
      <g>
        <path
          fill="#5B73A3"
          d="M63.271 32.706l-.069-.002c-5.131-.408-6.597-4.021-7.666-6.66-.371-.912-.72-1.774-1.134-2.237-.305-.336-.81-.833-1.371-1.388-.897-.889-1.915-1.894-2.586-2.691-1.197-1.415-1.84-3.088-1.862-4.835a.86.86 0 01.85-.87c.472-.022.863.374.87.85.016 1.342.52 2.638 1.457 3.746.623.739 1.61 1.715 2.481 2.577a42.674 42.674 0 011.439 1.461c.617.69 1.021 1.688 1.449 2.742 1.001 2.469 2.136 5.268 6.209 5.591a.86.86 0 01-.067 1.716z"
        />
      </g>
      <g>
        <path
          fill="#E8B48B"
          d="M78.994 55.463l-20.418-.647c.419 14.733-.538 23.668-3.52 30.063l8.288 5.43c.155.296 3.682 5.659 3.896 6.121 1.118-4.174 4.194-5.384 5.895-6.3l8.642-3.682c-2.703-6.72-3.977-16.451-2.783-30.985z"
        />
        <path
          fill="#EBDBCC"
          d="M81.775 86.449l-8.642 3.682c-1.7.916-4.776 2.126-5.895 6.3-.602 8.008 1.266 9.066 2.822 15.233 2.714 10.747.851 20.299-.759 28.826h44.249c-.339-11.797-.835-25.028-7.834-35.97-8.314-3.354-18.756-5.161-23.941-18.071z"
        />
        <path
          fill="#EBDBCC"
          d="M70.062 111.664c-1.556-6.167-3.424-7.226-2.822-15.233-.214-.462-3.741-5.825-3.896-6.121l-8.288-5.43c-4.081 8.753-11.96 12.743-25.355 20.254-2.974 5.49-4.985 22.098-6.005 35.356h45.606c1.61-8.527 3.473-18.079.76-28.826z"
        />
        <path
          fill="#FFF"
          d="M101.782 141.349h-.015a.86.86 0 01-.846-.874c.083-5.074.074-9.687-.022-12.337-.513-13.895 1.009-16.953 2.352-19.651.595-1.196 1.108-2.23 1.431-4.174a.861.861 0 011.697.282c-.364 2.198-.987 3.448-1.589 4.657-1.25 2.515-2.669 5.365-2.173 18.823.099 2.679.107 7.325.024 12.428a.858.858 0 01-.859.846zM35.215 141.349h-.021a.86.86 0 01-.838-.881c.174-7.026.095-12.312-.25-16.638-.63-7.937-2.124-11.361-3.568-14.671-.549-1.256-1.066-2.442-1.517-3.833a.86.86 0 011.637-.53c.424 1.312.925 2.459 1.456 3.675 1.432 3.28 3.054 6.997 3.708 15.223.35 4.387.43 9.731.254 16.816a.861.861 0 01-.861.839z"
        />
        <path
          fill="#EBDBCC"
          d="M57.036 79.101c-.008-.267-.371-.342-.466-.094-.801 2.115-2.024 5.092-3.912 6.943a1.921 1.921 0 00-.459 2.058c.925 2.45 2.985 6.073 7.013 9.871.494.465 1.293.161 1.368-.513.302-2.729 1.299-4.801 3.213-7.762-3.77-3.19-6.594-5.144-6.757-10.503z"
        />
        <path
          fill="#FFF"
          d="M59.766 98.963a1.67 1.67 0 01-1.145-.458c-4.564-4.306-6.487-8.234-7.227-10.193a2.79 2.79 0 01.662-2.975c1.675-1.646 2.816-4.277 3.711-6.636a1.092 1.092 0 011.203-.69c.528.089.909.525.926 1.062.14 4.586 2.329 6.42 5.642 9.195l.811.681a.86.86 0 01.167 1.124c-1.771 2.735-2.786 4.726-3.082 7.389a1.67 1.67 0 01-1.091 1.397c-.19.069-.385.104-.577.104zM56.46 81.559c-.822 1.852-1.842 3.671-3.2 5.005a1.06 1.06 0 00-.257 1.14c.688 1.821 2.484 5.482 6.798 9.55.235-2.746 1.234-4.885 2.861-7.475l-.229-.192c-2.837-2.378-5.178-4.339-5.973-8.028zm.915-2.247z"
        />
        <path
          fill="#EBDBCC"
          d="M79.89 77.996c-.08-.208-.381-.159-.4.064-.388 4.192-2.671 7.954-7.091 11.466 1.799 3.748 2.377 6.252 2.597 8.11.08.689.902 1.006 1.433.558 1.903-1.604 4.8-3.98 7.595-10.549.298-.701.207-1.519-.282-2.103-2.152-2.562-3.256-5.975-3.852-7.546z"
        />
        <path
          fill="#FFF"
          d="M75.843 99.258a1.714 1.714 0 01-1.702-1.52c-.174-1.477-.625-3.896-2.518-7.839a.86.86 0 01.24-1.044c4.188-3.327 6.402-6.884 6.768-10.872.049-.505.43-.902.925-.969.501-.066.96.212 1.137.676v.001l.227.61c.625 1.695 1.668 4.532 3.479 6.688.691.823.85 1.97.415 2.992-2.836 6.666-5.794 9.155-7.752 10.802-.378.32-.803.475-1.219.475zm-2.38-9.488c1.762 3.817 2.207 6.247 2.386 7.767l.105-.068c1.833-1.542 4.602-3.872 7.276-10.16.177-.417.119-.893-.148-1.212-1.482-1.765-2.475-3.87-3.158-5.577-.893 3.347-3.024 6.395-6.461 9.25z"
        />
        <g>
          <path
            fill="#FFF"
            d="M67.239 97.291a.863.863 0 01-.831-1.083c1.084-4.043 3.669-5.333 5.38-6.186.224-.111.437-.216.635-.324a.857.857 0 011.164.35.859.859 0 01-.349 1.165c-.213.116-.442.229-.684.349-1.604.801-3.602 1.799-4.485 5.093a.858.858 0 01-.83.636z"
          />
        </g>
        <g>
          <path
            fill="#FFF"
            d="M69.211 141.349a.86.86 0 01-.847-1.019l.26-1.367c.845-4.455 1.721-9.062 1.917-14.009a46.807 46.807 0 00-.125-5.99c-.035-.47-.08-.927-.135-1.396a43.278 43.278 0 00-1.045-5.691c-.461-1.82-.957-3.211-1.396-4.438-1.04-2.912-1.865-5.223-1.478-10.81-.376-.634-1.705-2.682-2.533-3.956-.885-1.366-1.178-1.816-1.247-1.947a.859.859 0 01.349-1.163.854.854 0 011.161.342c.086.149.578.905 1.179 1.831 1.793 2.765 2.616 4.05 2.753 4.357.057.13.081.272.071.411-.403 5.408.338 7.483 1.365 10.356.451 1.263.963 2.694 1.444 4.595a45.29 45.29 0 011.227 7.37c.174 1.986.216 4.017.128 6.197-.201 5.075-1.087 9.744-1.945 14.261l-.259 1.364a.86.86 0 01-.844.702z"
          />
        </g>
        <g>
          <circle fill="#FFF" cx="63.51" cy="97.577" r="1.146" />
          <circle fill="#FFF" cx="67.124" cy="114.293" r="1.146" />
          <circle fill="#FFF" cx="67.444" cy="131.007" r="1.146" />
        </g>
        <g>
          <path
            fill="#FFF"
            d="M50.19 133.822a.87.87 0 01-.343-.07c-1.243-.54-7.445-3.382-7.47-6.345-.018-2.274-.046-4.054-.067-5.445-.084-5.361-.091-5.801 1.522-5.999.104-.012.225-.026.364-.058 3.015-.684 12.954-.63 13.648.275.241.303.241.303.226 3.747-.006 1.688-.018 4.284-.025 8.284-.001.465-.003 1.428-7.442 5.504a.85.85 0 01-.413.107zm-6.136-16.154c-.082.553-.058 2.084-.023 4.268.021 1.396.049 3.179.067 5.458.01 1.179 3.078 3.258 6.052 4.609 2.668-1.481 5.608-3.314 6.177-3.978.008-3.897.019-6.441.025-8.104.004-1.216.008-2.003.007-2.471-2.043-.215-8.554-.601-11.781.132a4.75 4.75 0 01-.524.086z"
          />
          <path
            fill="#FFF"
            d="M43.168 122.354a.858.858 0 01-.857-.824.857.857 0 01.823-.894c.391-.019.784-.027 1.174-.031h.01a.86.86 0 01.01 1.72c-.375.004-.75.013-1.123.027-.013.002-.025.002-.037.002zM52.052 122.49l-.496-.002a.858.858 0 01.006-1.719h.005l.485.002c.433 0 .866-.004 1.296-.019.451.019.871.36.886.834a.86.86 0 01-.833.886c-.447.014-.898.018-1.349.018zm-3.207-.07h-.029l-1.806-.061a.862.862 0 01-.834-.886c.015-.474.352-.84.886-.834l1.813.061a.861.861 0 01-.03 1.72zM56.08 122.267a.86.86 0 01-.11-1.713c.365-.047.727-.104 1.088-.169a.852.852 0 011.001.689.86.86 0 01-.689 1.001 22.35 22.35 0 01-1.178.185.863.863 0 01-.112.007z"
          />
          <g>
            <path
              fill="#FFF"
              d="M87.556 133.862a.851.851 0 01-.359-.078c-1.125-.516-6.782-3.195-7.681-5.104-.772-1.642-.585-4.383.026-10.248.184-1.754.407-2.348 2.366-2.658.118-.018 12.105-1.103 13.133.656.758 1.298-.191 11.942-.203 12.048-.042.416-.122 1.193-6.836 5.261a.867.867 0 01-.446.123zm-5.379-16.387c-.563.087-.744.15-.798.187-.036.081-.084.542-.127.951-.516 4.95-.785 8.049-.18 9.335.398.85 3.564 2.727 6.43 4.083 2.437-1.495 5.109-3.292 5.643-3.895.226-2.344.633-9.194.417-10.712-1.598-.47-9.412-.263-11.385.051zm11.024 10.588zm.536-10.573z"
            />
            <path
              fill="#FFF"
              d="M81.236 122.49c-.011 0-.022 0-.033-.002-.387-.015-.771-.03-1.156-.049a.859.859 0 11.085-1.717c.378.021.757.034 1.137.049a.859.859 0 01-.033 1.719zM84.95 122.558l-.941-.004a.861.861 0 01-.851-.869c.004-.475.362-.816.869-.851l.923.004.914-.004h.009a.86.86 0 01.008 1.72l-.931.004zm3.705-.068a.858.858 0 01-.857-.828.859.859 0 01.826-.892c.613-.023 1.226-.053 1.84-.086a.86.86 0 01.093 1.718c-.622.033-1.246.063-1.868.086-.011.002-.022.002-.034.002zM93.285 122.207a.859.859 0 01-.071-1.716c.377-.033.755-.066 1.133-.103.464-.056.894.302.938.774a.86.86 0 01-.772.937 77.078 77.078 0 01-1.228.108z"
            />
          </g>
        </g>
      </g>
      <g>
        <path
          fill="#4D5F91"
          d="M106.853 125.31c-1.72 4.219-4.288 6.156-7.234 6.982-2.911.813-6.192.527-9.367.263a33.826 33.826 0 01-2.832-.332c-4.586-.71-8.002-2.407-9.963-7.052-3.038-7.107 5.033-9.228 2.109-13.849-2.281-3.6-7.383-3.199-4.047-9.643 1.398-2.647 3.623-4.275 3.852-7.119.448-5.676-8.854-5.087-5.17-13.931 1.151-2.766 3.715-11.702 4.451-14.664l3.124 10.116 4.349.936 9.687 2.099 8.428 1.812c0 .355-.057.723-.148 1.09-.757 3.049-3.223 4.058-3.669 7.349-.86 6.479 7.027 7.074 7.303 11.764.104 1.856-.779 2.683-2.487 5.273-5.551 8.426 5.958 8.151 1.614 18.906z"
        />
        <path
          fill="#5B73A3"
          d="M87.419 133.082a.862.862 0 01-.81-.568c-.352-.982-1.37-1.958-2.269-2.819-.843-.809-1.638-1.569-1.971-2.386-1.346-3.303 1.123-5.071 3.105-6.491 1.372-.981 2.79-1.998 3.189-3.433.521-1.883-.579-2.998-2.455-4.61-1.45-1.246-2.949-2.532-3.054-4.538-.092-1.699.929-3.053 1.915-4.362 1.208-1.602 2.35-3.114 1.958-5.396-.273-1.631-1.244-2.531-2.369-3.572-1.434-1.328-3.059-2.833-3.03-5.982.025-2.745 1.359-4.286 2.536-5.646.566-.653 1.102-1.271 1.501-2.004.7-1.287.623-2.387-.27-3.796a.86.86 0 111.454-.919c.771 1.218 1.644 3.117.326 5.537-.488.896-1.11 1.614-1.711 2.309-1.125 1.299-2.098 2.422-2.116 4.534-.021 2.388 1.138 3.462 2.479 4.705 1.185 1.096 2.526 2.338 2.896 4.547.517 3.012-1.034 5.067-2.279 6.72-.874 1.16-1.63 2.161-1.572 3.235.067 1.27 1.229 2.269 2.458 3.324 1.712 1.472 3.842 3.302 2.991 6.376-.563 2.02-2.307 3.269-3.846 4.37-2.2 1.576-3.311 2.488-2.515 4.442.196.478.894 1.146 1.568 1.793 1.036.994 2.209 2.119 2.698 3.481a.861.861 0 01-.52 1.101.878.878 0 01-.287.048zM99.618 133.15a.86.86 0 01-.8-1.172c.152-.391.247-.754.291-1.108.274-2.111-.98-2.803-2.436-3.601-.613-.339-1.193-.656-1.658-1.094-1.556-1.463-1.546-3.882.023-5.753.448-.541.989-.964 1.512-1.374 1.216-.952 2.095-1.639 1.816-3.495-.25-1.71-1.593-2.964-2.89-4.177-1.608-1.502-3.429-3.204-2.73-5.772.221-.824.832-1.749 1.541-2.819 1.123-1.696 2.52-3.807 2.267-5.644-.266-1.923-1.84-3.076-3.507-4.297-.818-.598-1.591-1.165-2.221-1.836-1.309-1.408-1.926-2.87-1.835-4.346.165-2.672 2.57-4.692 4.327-6.168.631-.53 1.228-1.031 1.459-1.359.112-.154.197-.298.284-.439l1.473.888c-.113.186-.226.372-.36.558-.353.497-1 1.041-1.75 1.67-1.518 1.274-3.597 3.021-3.716 4.958-.062 1.001.389 2.004 1.376 3.065.517.554 1.227 1.072 1.979 1.624 1.795 1.312 3.828 2.801 4.194 5.448.341 2.48-1.254 4.889-2.536 6.826-.6.907-1.166 1.763-1.314 2.318-.408 1.496.587 2.521 2.242 4.068 1.444 1.349 3.08 2.878 3.419 5.182.425 2.845-1.174 4.096-2.458 5.102-.473.368-.918.718-1.251 1.122-.832.99-1.203 2.422-.165 3.397.306.288.792.556 1.308.839 1.489.817 3.738 2.055 3.313 5.323-.061.492-.19.993-.396 1.52a.86.86 0 01-.801.546z"
        />
      </g>
      <g>
        <path
          fill="#E8B48B"
          d="M86.993 42.235c-1.006.983-1.853 2.342-2.012 2.805l-2.098 7.98c2.013-1.219 8.946-4.144 9.01-8.936.033-2.255-2.247-4.393-4.9-1.849zM46.476 41.384c-3.538-.763-5.977 5.389 6.81 12.81l-2.273-9.397c-1.278-1.322-2.701-3.01-4.537-3.413z"
        />
        <path
          fill="#D99467"
          d="M50.18 48.304a.856.856 0 01-.65-.298l-.29-.344c-.623-.753-1.161-1.402-2.668-1.723a.86.86 0 11.356-1.682c2.094.443 2.949 1.477 3.637 2.306l.266.319a.859.859 0 01-.651 1.422zM84.956 48.245a.862.862 0 01-.731-1.312c1.009-1.637 2.387-2.457 4.465-2.657.457-.049.892.3.938.772a.858.858 0 01-.772.938c-1.53.149-2.447.684-3.165 1.849a.865.865 0 01-.735.41z"
        />
        <path
          fill="#F2C296"
          d="M85.179 41.539c-2.063-.03-4.092-1.086-5.405-3.011-2.58-3.772-.769-9.401-5.504-11.74-3.76-1.869-8.541.504-12.566.092-3.451-.367-4.896-1.628-6.661-3.646-.562.367-1.146.791-1.514 1.146-3.142 3.027-.699 6.443-.563 8.232.253 2.774-4.503 3.789-4.116 6.73 1.929 32.836 29.931 51.435 37.467 3.588.114-.707-.421-1.381-1.138-1.391z"
        />
        <path
          fill="#4D2323"
          d="M77.412 42.851a1.146 1.146 0 01-1.146-1.139c-.004-.538.101-1.589.115-1.713a1.14 1.14 0 011.271-1.005c.63.073 1.08.643 1.007 1.271-.015.127-.103 1.048-.1 1.432a1.146 1.146 0 01-1.139 1.154h-.008zM57.785 42.848c-.561 0-1.05-.408-1.132-.98-.007-.051-.093-.929-.145-1.462l-.037-.378a1.146 1.146 0 012.276-.273 259.003 259.003 0 00.178 1.81 1.15 1.15 0 01-1.14 1.283z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#75473D"
            d="M74.133 36.765a.858.858 0 01-.49-1.567c1.515-1.05 3.13-1.577 4.694-1.482.475.025.84.428.815.902a.883.883 0 01-.902.815c-1.181-.048-2.445.359-3.629 1.179a.858.858 0 01-.488.153zM53.913 37.262a.86.86 0 01-.619-1.457c2.328-2.407 5.148-2.766 7.952-1.011a.862.862 0 01-.914 1.458c-2.099-1.317-4.051-1.064-5.802.748a.853.853 0 01-.617.262z"
          />
        </g>
        <g>
          <path
            fill="#D99467"
            d="M67.75 54.537c-.172 0-.349-.018-.53-.057-1.236-.259-3.693-1.792-3.805-3.205-.047-.586.289-1.091.875-1.316.439-.167.899-.097 1.344-.026.089.013.205.032.315.045.405-2.296-.312-6.286-1.015-8.585a.858.858 0 01.57-1.073.857.857 0 011.074.569c.8 2.615 1.697 7.471.89 10.131a.864.864 0 01-.459.529c-.46.214-.966.179-1.407.118.523.466 1.358 1.002 1.972 1.132.859.176 1.836-1.164 2.376-1.881a.861.861 0 011.375 1.034c-.746.99-1.947 2.585-3.575 2.585zm-1.104-3.768h.011-.011z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M71.379 58.487c-.043.006-2.038 1.252-3.465 1.289-2.315.058-1.928-.612-3.311-.994-2.655-.73-.939 3.697 2.923 4.141 3.029.347 6.347-4.794 3.853-4.436z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M75.306 55.282c1.328 3.053 5.413.115 3.288-2.347-.94-1.087-4.411-.232-3.288 2.347zM56.868 54.867c.15 1.684 2.014 2.154 2.979 1.542.945-.595 1.413-2.178.584-3.287-.865-1.155-3.823-1.176-3.563 1.745z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar18: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#4D5F91"
        d="M51.758 10.634c-3.294.196-5.868.391-7.413 3.716-1.324 2.85-2.337 12.846-2.328 15.971.015 8.756 3.615 12.554 4.208 17.723 1.082 9.462-1.703 11.107-1.918 13.686-.237 3.046 2.801 2.685 4.21 3.255 2.053.839.57 3.444 2.498 4.537 2.073 1.187 4.476-.736 9.321 2.217l9.277.409-10.95-49.151c-.94-1.518-4.676-8.129-6.905-12.363z"
      />
      <path
        fill="#5B73A3"
        d="M47.79 45.225a.868.868 0 01-.852-.71c-.417-2.254-1.059-4.159-1.625-5.841-1.299-3.855-2.325-6.901.877-10.244.552-.577 1.056-.969 1.499-1.315.974-.762 1.462-1.145 1.596-2.889.071-.931.109-1.767.144-2.522.221-4.808.558-6.819 6.768-8.355a.869.869 0 01.416 1.686c-5.198 1.286-5.247 2.334-5.449 6.75a82.882 82.882 0 01-.147 2.575c-.193 2.508-1.15 3.256-2.258 4.124-.417.325-.848.661-1.313 1.148-2.475 2.583-1.727 4.806-.487 8.488.585 1.736 1.248 3.704 1.688 6.079a.868.868 0 01-.857 1.026zM49.622 67.047a.868.868 0 01-.85-1.048c.05-.237.105-.53.178-.916.092-.49.212-1.13.387-1.992.238-1.177.519-2.005.765-2.737.579-1.715.927-2.751.037-6.777a5.781 5.781 0 00-.071-.363.867.867 0 011.469-.851c.213.234.284.658.308.88.983 4.463.53 5.808-.097 7.666-.23.683-.492 1.456-.708 2.524-.172.852-.291 1.485-.382 1.972-.075.4-.133.706-.186.952a.87.87 0 01-.85.69z"
      />
      <g>
        <path
          fill="#5B73A3"
          d="M97.112 19.109c-1.275-3.397-3.706-3.223-4.958-6.097-.455-1.025-.459-1.636-1.046-2.781-2.727-5.311-10.189.166-14.701-5.73-7.988-10.458-17.54 5.711-24.63 6.132 2.21 4.234 5.945 10.846 6.886 12.363l10.949 49.152 7.231.319c2.415-1.114 3.594-2.525 4.685-2.765 2.317-.505 7.338 2.155 7.896-1.876.394-2.616.19-2.827 3.098-3.858 4.783-1.692 3.251-5.279 1.597-10.064-3.894-11.491 2.189-14.305 1.865-17.956-.266-2.985-2.773-4.025-2.013-6.651.783-2.672 4.818-5.719 3.141-10.188z"
        />
        <path
          fill="#6683B3"
          d="M84.39 70.738a.868.868 0 01-.862-.772c-.134-1.218-.011-2.376.108-3.495.226-2.132.421-3.972-1.065-5.966-.131-.17-.201-.249-.239-.292a1.039 1.039 0 01-.273-.524c-.101-.464.177-.97.639-1.08.443-.1.891.115 1.021.55.059.068.135.163.239.299 1.898 2.549 1.638 5.018 1.404 7.195-.113 1.076-.221 2.091-.107 3.122a.865.865 0 01-.865.963zM90.282 65.901a.867.867 0 01-.83-.613c-.495-1.613-.067-2.785.313-3.819.299-.818.537-1.463.352-2.301-.245-1.099-1.193-1.81-2.291-2.632-.918-.689-1.96-1.471-2.693-2.605a.867.867 0 111.457-.943c.565.875 1.437 1.527 2.278 2.159 1.258.943 2.559 1.918 2.944 3.645.296 1.335-.082 2.366-.416 3.276-.339.926-.607 1.657-.284 2.711a.866.866 0 01-.83 1.122zM94.09 29.846a.857.857 0 01-.249-.036c-3.857-1.154-5.141-4.355-6.077-6.693-.386-.964-.751-1.874-1.188-2.345-2.229-2.438-5.087-1.825-8.111-1.18-1.603.343-3.256.697-4.836.576-3.541-.281-4.698-1.825-5.72-3.187-.538-.716-1.002-1.337-1.808-1.78-3.509-1.932-6.279.218-8.958 2.3-.362.281-.713.554-1.056.809a.868.868 0 01-1.033-1.394c.333-.247.675-.513 1.025-.785 2.68-2.084 6.353-4.932 10.86-2.45 1.134.624 1.785 1.493 2.36 2.261.917 1.221 1.708 2.277 4.465 2.496 1.317.102 2.788-.209 4.339-.542 3.216-.688 6.858-1.462 9.753 1.701.649.704 1.054 1.709 1.521 2.876.895 2.231 1.907 4.761 4.963 5.674a.87.87 0 01.583 1.081.872.872 0 01-.833.618z"
        />
        <path
          fill="#6683B3"
          d="M78.429 14.437c-1.004 0-2.029-.348-2.954-1.437-.647-.762-1.032-1.643-1.404-2.496-.495-1.136-.924-2.117-1.856-2.491-.718-.294-1.421.232-2.504 1.121-1.443 1.182-3.417 2.802-5.961.737-1.533-1.244-2.604-.667-5.474 1.199-1.283.834-2.88 1.871-4.849 2.792a.868.868 0 11-.735-1.573c1.859-.869 3.336-1.828 4.638-2.674 2.749-1.785 4.917-3.198 7.516-1.091 1.376 1.12 2.239.519 3.766-.732 1.134-.927 2.545-2.081 4.254-1.389 1.588.64 2.231 2.11 2.797 3.407.337.771.654 1.499 1.137 2.066 1.034 1.221 2.156.896 3.902.265.401-.145.798-.287 1.184-.398 5.893-1.656 8.274-.377 10.582.859l.362.193a.869.869 0 01-.813 1.535l-.37-.197c-2.187-1.17-4.071-2.183-9.289-.719-.347.1-.704.229-1.065.359-.844.303-1.842.664-2.864.664z"
        />
      </g>
      <g>
        <path
          fill="#4D5F91"
          d="M58.661 23.862a.867.867 0 01-.738-.41c-1.691-2.723-6.565-11.65-6.945-12.445a.868.868 0 011.567-.748c.295.622 5.099 9.453 6.852 12.277a.869.869 0 01-.736 1.326z"
        />
      </g>
      <g>
        <path
          fill="#D99467"
          d="M81.022 57.224l-25.151 1.982c1.876 10.596 2.54 19.977-2.466 26.994-.195.274-.423.521-.634.781 10.918 6.08 21.502 6.504 32.917-.479-3.755-6.752-4.949-16.141-4.666-29.278z"
        />
        <path
          fill="#9FBA7D"
          d="M105.897 140.584h31.052c-6.889-18.557-13.801-31.906-15.764-38.053-10.332 7.102-14.247 21.048-15.288 38.053zM20.901 101.156c-6.879 12.033-13.708 24.942-18.929 39.428h33.132c1.337-17.98-1.284-32.806-14.203-39.428z"
        />
        <path
          fill="#9FBA7D"
          d="M121.186 102.531c-19.348-2.054-30.086-6.301-35.497-16.028-11.415 6.982-21.999 6.559-32.917.479-6.54 8.037-21.256 9.896-31.87 14.175 8.592 17.658 8.805 26.221 9.467 39.428h81.893c2.108-14.387 3.274-24.636 8.924-38.054z"
        />
        <path
          fill="#B3CF91"
          d="M3.35 139.167a.867.867 0 01-.863-.79 31.906 31.906 0 01-.049-1.369.869.869 0 01.852-.885h.016a.87.87 0 01.868.852c.01.608.032 1.128.042 1.248a.869.869 0 01-.788.942l-.078.002zM7.152 141.448a.868.868 0 01-.866-.82c-.052-.958-.121-1.823-.177-2.204a.868.868 0 01.735-.983.88.88 0 01.984.734c.095.652.17 1.97.192 2.357a.868.868 0 01-.819.914c-.018.002-.034.002-.049.002zM6.224 134.527l.864-.074-.871.009c-.009-.089-.011-.089-.035-.839l-.108-3.332a.868.868 0 01.84-.896l.028-.001c.467 0 .853.369.868.84l.107 3.335c.021.645.02.645.027.721l-.856.163-.864.074zM11.432 140.159a.861.861 0 01-.859-.761c-.041-.354-.163-4.162-.167-4.34a.87.87 0 01.85-.888c.519-.05.877.37.887.849.009.428.127 3.884.156 4.182a.873.873 0 01-.867.958zM11.288 131.375a.867.867 0 01-.86-.759c-.119-.939.021-4.278.08-4.873.045-.477.474-.846.946-.78.477.045.827.47.781.945-.064.679-.171 3.8-.084 4.49a.87.87 0 01-.863.977zM11.614 122.083a.868.868 0 01-.859-.749c-.067-.495-.099-2.02-.077-2.874.014-.479.437-.848.892-.845a.87.87 0 01.844.892c-.025.89.014 2.257.061 2.59a.868.868 0 01-.861.986zM15.379 119.263a.869.869 0 01-.868-.844l-.004-.161c-.017-.546-.069-2.249-.08-2.939a.868.868 0 01.855-.88h.013c.474 0 .862.38.868.855.009.684.062 2.369.079 2.911l.005.164a.872.872 0 01-.843.894h-.025zM15.518 127.187h-.006a.868.868 0 01-.861-.875v-.181c.007-3.49.037-3.647.062-3.774a.862.862 0 011.015-.689.867.867 0 01.696.978c-.01.119-.032.702-.038 3.491v.189a.868.868 0 01-.868.861zM15.281 135.18h-.012a.87.87 0 01-.856-.881c.001-.034.056-3.583.144-3.989a.862.862 0 011.028-.669.87.87 0 01.676.997c-.04.349-.102 2.839-.112 3.685a.868.868 0 01-.868.857zM15.278 141.448a.868.868 0 01-.865-.811c-.032-.464-.117-1.7-.172-1.938a.876.876 0 01.635-1.049.863.863 0 011.046.617c.079.302.137.996.223 2.253a.87.87 0 01-.808.925c-.019.001-.039.003-.059.003zM19.197 106.806a.868.868 0 01-.868-.868c0-.284.011-1.123.046-1.913.021-.479.428-.863.905-.829.478.021.85.426.828.906a53.077 53.077 0 00-.044 1.836.867.867 0 01-.867.868zM19.199 115.338a.869.869 0 01-.868-.86l-.02-1.24c-.047-3.009-.042-3.043-.024-3.158a.879.879 0 01.989-.727.867.867 0 01.734.921c-.005.24.021 1.924.038 2.936l.02 1.251a.87.87 0 01-.859.878l-.01-.001zM19.64 123.581a.869.869 0 01-.868-.861l-.02-1.723c-.011-.911-.023-1.839-.022-2.105a.867.867 0 01.868-.863h.004a.87.87 0 01.864.873c-.001.263.01 1.175.022 2.073l.021 1.73a.87.87 0 01-.861.876h-.008zM19.789 131.592a.868.868 0 01-.868-.844c-.03-1.04-.034-1.524-.038-1.939-.005-.491-.008-.881-.053-2.007a.867.867 0 01.832-.902l.037-.001c.462 0 .848.366.866.834.047 1.156.051 1.558.056 2.06.003.409.008.885.038 1.906a.872.872 0 01-.844.894l-.026-.001zM19.653 139.186h-.01a.866.866 0 01-.858-.877c.014-1.224-.019-2.745-.039-3.609l-.009-.434a.87.87 0 01.851-.885c.486-.024.876.372.886.851l.008.427c.02.881.054 2.428.04 3.669a.87.87 0 01-.869.858zM27.618 107.334a.869.869 0 01-.866-.824c-.034-.688-.129-3.002.066-3.887a.866.866 0 111.695.37c-.104.479-.092 2.088-.027 3.431a.867.867 0 01-.824.909l-.044.001zM27.459 115.944h-.011a.87.87 0 01-.857-.879c.013-.925 0-1.652-.011-2.278-.01-.613-.02-1.133-.003-1.642.015-.479.442-.814.896-.841a.869.869 0 01.841.895c-.017.483-.007.976.003 1.559.011.64.023 1.384.011 2.33a.87.87 0 01-.869.856zM27.606 123.581h-.022a.87.87 0 01-.846-.89 28.5 28.5 0 000-.672c-.003-.897-.01-2.258.051-2.923a.877.877 0 01.944-.786.87.87 0 01.785.944c-.054.583-.047 1.944-.044 2.758.001.339.002.603 0 .722a.87.87 0 01-.868.847zM27.704 131.784h-.002a.868.868 0 01-.866-.87c.001-.343-.007-.595-.014-.834-.018-.662-.035-1.234.099-3.113a.878.878 0 01.927-.805.868.868 0 01.805.927c-.127 1.795-.112 2.325-.094 2.941.007.257.015.524.014.889a.869.869 0 01-.869.865zM27.251 139.563c-.014 0-.03 0-.044-.002a.867.867 0 01-.824-.909c.039-.774.065-1.435.087-1.973.05-1.209.068-1.604.129-1.848a.868.868 0 011.687.409c-.027.156-.053.813-.082 1.511-.022.54-.05 1.207-.088 1.986a.867.867 0 01-.865.826zM35.536 106.879h-.004a.869.869 0 01-.864-.872l.005-1.075c.008-1.898.011-2.295.072-2.604a.858.858 0 011.018-.675.871.871 0 01.685 1.017c-.029.154-.033.906-.039 2.271l-.005 1.075a.868.868 0 01-.868.863zM35.53 115.229l-.06-.002a.866.866 0 01-.807-.924c.006-.104.024-.609.043-1.205.031-.933.07-2.073.091-2.339.039-.479.484-.843.934-.796a.867.867 0 01.795.934c-.02.258-.056 1.36-.086 2.258-.021.625-.039 1.154-.046 1.266a.865.865 0 01-.864.808zM35.696 123.082a.869.869 0 01-.868-.845c-.012-.471-.075-1.858-.117-2.786l-.029-.641a.867.867 0 111.735-.077l.028.641c.042.937.105 2.339.119 2.816a.87.87 0 01-.844.892h-.024zM36.08 131.127a.868.868 0 01-.866-.83c-.01-.229-.041-.83-.074-1.445-.089-1.679-.089-1.696-.085-1.767a.867.867 0 011.735.034c.003.137.044.899.083 1.643.033.619.065 1.226.076 1.458a.867.867 0 01-.829.906l-.04.001zM36.012 138.906h-.011a.868.868 0 01-.857-.879c.006-.397.005-.846.005-1.276 0-.773.001-1.495.028-1.823a.868.868 0 111.73.141c-.024.303-.021.969-.021 1.681 0 .439 0 .896-.005 1.301a.869.869 0 01-.869.855zM44.053 97.673a.868.868 0 01-.866-.831c-.02-.471-.06-2.298-.019-3.036.027-.48.46-.868.915-.819a.87.87 0 01.819.915c-.036.643-.001 2.401.019 2.866a.867.867 0 01-.829.904l-.039.001zM44.083 106.235h-.018a.868.868 0 01-.85-.886l-.004-.28c-.017-.728-.052-2.431.027-3.355a.878.878 0 01.937-.792.866.866 0 01.792.937c-.07.834-.035 2.534-.022 3.173.005.192.006.32.006.355a.866.866 0 01-.868.848zM44.119 113.981h-.021a.87.87 0 01-.847-.889l.005-.331c.054-3.129.06-3.163.083-3.276a.867.867 0 011.714.26c-.015.281-.048 2.247-.061 3.044l-.005.348a.868.868 0 01-.868.844zM43.768 122.829h-.028a.87.87 0 01-.84-.896c.007-.208.026-2.853.02-3.079a.875.875 0 01.825-.902c.506-.009.877.334.908.806.013.209-.012 3.082-.016 3.232a.87.87 0 01-.869.839zM44.02 131.225a.869.869 0 01-.865-.811c-.014-.199-.075-1.326-.127-2.274-.038-.686-.069-1.276-.075-1.346a.872.872 0 01.777-.926.863.863 0 01.949.74c.002.016.041.671.082 1.437.051.939.111 2.054.125 2.252a.868.868 0 01-.807.925c-.02.001-.039.003-.059.003zM44.492 139.102a.868.868 0 01-.865-.803c-.105-1.409-.214-3.674-.21-3.888.007-.479.458-.868.881-.855a.869.869 0 01.854.875c.002.186.096 2.266.206 3.739a.87.87 0 01-.866.932zM52.393 98.015a.868.868 0 01-.868-.855 66.815 66.815 0 00-.152-3.321 12.862 12.862 0 01-.024-.438.868.868 0 01.868-.861h.008a.87.87 0 01.86.856l.02.329c.044.678.137 2.087.156 3.41a.868.868 0 01-.855.88h-.013zM52.314 106.134a.869.869 0 01-.866-.82c-.001-.034-.182-3.551-.038-4.14a.867.867 0 011.694.377c-.036.322-.004 2.169.078 3.668a.868.868 0 01-.819.914l-.049.001zM52.099 115.099a.87.87 0 01-.868-.844l-.088-3.119a.87.87 0 01.84-.897.852.852 0 01.896.84l.088 3.128a.869.869 0 01-.843.893l-.025-.001zM51.988 122.388l-.868-.006c.007-3.036.105-3.38.152-3.545a.869.869 0 011.675.458c-.011.066-.084.559-.09 3.023l-.869.07zM52.185 131.26a.87.87 0 01-.868-.844c-.068-2.407-.069-2.504-.074-3.007l-.001-.119a.87.87 0 01.86-.877c.485-.056.871.381.876.86l.001.121c.004.495.004.593.073 2.972a.87.87 0 01-.843.894h-.024zM52.592 139.446a.869.869 0 01-.865-.811c-.002-.033-.212-3.561-.195-3.805.032-.479.487-.844.923-.807a.869.869 0 01.811.89c.003.302.175 3.338.193 3.605a.866.866 0 01-.867.928zM60.146 97.839a.864.864 0 01-.855-.731c-.004-.026-.213-3.905-.163-4.213a.861.861 0 01.993-.722.869.869 0 01.729.913c-.001.359.145 3.55.164 3.814a.875.875 0 01-.768.934c-.033.002-.066.005-.1.005zM60.521 106.479a.866.866 0 01-.863-.79c-.003-.035-.278-3.901-.259-4.17a.856.856 0 01.927-.805.869.869 0 01.807.887c.006.333.229 3.635.254 3.936a.867.867 0 01-.866.942zM60.333 114.6l-.868-.008c.029-3.299.029-3.299.24-3.73a.876.876 0 011.164-.413c.431.21.617.716.409 1.146l-.013.026c-.039.162-.047 1.016-.063 2.886l-.869.093zM60.31 123.097a.869.869 0 01-.868-.847l-.013-.469c-.031-1.112-.076-2.793-.021-3.595a.878.878 0 01.925-.809.869.869 0 01.807.925c-.049.722-.005 2.351.024 3.431l.014.474a.871.871 0 01-.846.89h-.022zM60.18 131.641l-.041-.001a.867.867 0 01-.827-.907 36.641 36.641 0 00-.043-3.614.87.87 0 01.814-.919c.46-.015.89.336.919.815.077 1.284.093 2.704.043 3.799a.866.866 0 01-.865.827zM60.49 139.815a.87.87 0 01-.868-.852 83.783 83.783 0 00-.066-1.396c-.08-1.575-.096-1.968-.089-2.106a.856.856 0 01.912-.821.868.868 0 01.822.899c-.001.188.047 1.109.089 1.941.034.668.065 1.28.068 1.449a.87.87 0 01-.852.886h-.016zM68.193 98.559h-.019a.871.871 0 01-.85-.887l.002-.119c.054-3.786.138-4.144.173-4.296a.87.87 0 011.694.385c-.015.088-.084.656-.13 3.936l-.002.131a.869.869 0 01-.868.85zM68.506 106.417a.868.868 0 01-.868-.841c-.006-.11-.222-3.892-.246-4.219a.87.87 0 01.653-.938.872.872 0 011.052.632c.047.186.275 4.432.277 4.471a.87.87 0 01-.841.895h-.027zM68.428 115.762l-.064-.002a.868.868 0 01-.803-.929c.021-.285.056-1.553.104-3.764.009-.395.014-.612.26-.858a.867.867 0 011.481.645l-.005.252c-.033 1.45-.079 3.427-.109 3.852a.867.867 0 01-.864.804zM68.011 123.436a.867.867 0 01-.862-.985l.022-.165c.105-.771.238-1.73.278-4.091a.869.869 0 01.868-.853h.015a.869.869 0 01.854.883c-.042 2.464-.188 3.523-.294 4.297l-.022.163a.87.87 0 01-.859.751zM68.353 130.99a.867.867 0 01-.868-.86c-.007-.238-.191-3.488-.223-3.765a.877.877 0 01.736-.97.854.854 0 01.979.701c.051.298.244 3.993.244 4.02a.868.868 0 01-.861.874h-.007zM68.421 139.504a.868.868 0 01-.868-.855l-.028-1.45c-.049-2.405-.048-2.424-.038-2.508a.863.863 0 01.948-.778c.46.045.801.44.782.897-.001.181.023 1.346.044 2.354l.028 1.461a.866.866 0 01-.855.879h-.013zM76.554 98.405a.866.866 0 01-.864-.955c.071-.725.146-1.609.212-2.396.143-1.729.172-2.018.225-2.201a.873.873 0 011.077-.592.867.867 0 01.602 1.037c-.032.192-.107 1.098-.174 1.9-.066.797-.142 1.691-.214 2.424a.87.87 0 01-.864.783zM76.736 106.521a.865.865 0 01-.866-.832c-.016-.366-.047-1.005-.081-1.663-.042-.826-.085-1.678-.098-2.063a.872.872 0 01.841-.896c.446-.027.88.36.895.841.012.381.056 1.219.096 2.028.034.666.066 1.313.082 1.682a.867.867 0 01-.832.901c-.013.002-.025.002-.037.002zM76.66 114.686a.867.867 0 01-.867-.86c-.01-1.054-.037-2.145-.063-3.121a.868.868 0 01.844-.892c.506-.033.877.365.893.845.026.985.054 2.087.063 3.151a.87.87 0 01-.86.877h-.01zM76.793 122.406h-.01a.87.87 0 01-.859-.878c.011-.791.002-1.799-.005-2.546a27.947 27.947 0 01.001-1.133c.041-.477.443-.818.939-.79a.868.868 0 01.791.925c-.005.109 0 .487.005.983.007.758.016 1.778.005 2.58a.868.868 0 01-.867.859zM76.436 130.316a.87.87 0 01-.865-.945c.136-1.523.136-2.269.136-2.716 0-.356 0-.591.077-.863a.867.867 0 111.67.473c-.011.042-.011.218-.011.39 0 .475 0 1.27-.143 2.869a.868.868 0 01-.864.792zM76.415 138.428a.87.87 0 01-.869-.854c-.021-1.315-.049-1.655-.154-2.915l-.052-.632a.868.868 0 01.794-.937.857.857 0 01.936.793l.054.631c.105 1.273.138 1.658.159 3.032a.868.868 0 01-.854.882h-.014zM23.617 102.627a.869.869 0 01-.865-.804 46.612 46.612 0 01-.08-1.575.885.885 0 01.832-.922c.46-.059.883.333.901.812.023.573.044 1.112.079 1.556a.868.868 0 01-.8.932l-.067.001zM23.336 111.114h-.021a.869.869 0 01-.848-.889c.015-.596.014-1.545.014-2.328-.001-1.169.001-1.331.019-1.449a.86.86 0 01.98-.737.866.866 0 01.743.942c-.007.142-.006.641-.005 1.244 0 .796.001 1.762-.014 2.369a.868.868 0 01-.868.848zM23.396 119.411a.868.868 0 01-.868-.857c-.003-.28-.102-3.043-.116-3.25a.874.874 0 01.787-.93c.488-.062.888.293.94.761.022.202.123 3.235.125 3.398a.87.87 0 01-.858.878h-.01zM23.673 127.249a.869.869 0 01-.865-.812l-.089-1.233c-.066-.888-.141-1.906-.152-2.193a.867.867 0 01.832-.902.856.856 0 01.902.831c.011.282.084 1.273.149 2.137l.09 1.246a.87.87 0 01-.809.925l-.058.001zM23.44 135.625a.869.869 0 01-.868-.861c-.003-.413-.09-2.999-.098-3.218a.866.866 0 01.835-.898.853.853 0 01.898.835c.008.224.097 2.85.101 3.269a.868.868 0 01-.861.874l-.007-.001zM23.196 141.448c-.014 0-.026 0-.039-.002a.868.868 0 01-.83-.904c.024-.537.034-.983.045-1.442.013-.478.379-.822.89-.847.479.014.857.41.847.89-.012.469-.024.924-.047 1.474a.867.867 0 01-.866.831zM31.707 101.997a.868.868 0 01-.863-.789c-.062-.67-.185-2.318.035-3.117a.872.872 0 011.066-.609.871.871 0 01.609 1.068c-.092.33-.083 1.405.019 2.498a.867.867 0 01-.784.944c-.028.002-.055.005-.082.005zM31.063 111.127a.869.869 0 01-.866-.826c-.008-.172-.109-2.867-.064-3.449a.877.877 0 01.931-.801.868.868 0 01.8.931c-.03.396.043 2.743.067 3.234a.868.868 0 01-.826.91l-.042.001zM31.29 119.406a.867.867 0 01-.868-.861c-.001-.169-.007-.393-.013-.655-.021-.754-.047-1.787-.004-2.763.021-.48.466-.85.905-.828a.867.867 0 01.829.904c-.041.915-.015 1.914.005 2.642.006.275.013.511.014.688a.869.869 0 01-.863.874l-.005-.001zM31.746 127.008a.87.87 0 01-.868-.844l-.007-.202c-.137-3.492-.096-3.725-.07-3.878a.879.879 0 011.003-.707.868.868 0 01.711.979c-.01.129-.019.732.089 3.539l.01.219a.871.871 0 01-.844.894h-.024zM31.237 134.632a.868.868 0 01-.864-.957l.087-.891c.23-2.374.24-2.411.268-2.519a.867.867 0 011.692.382c-.031.221-.146 1.414-.231 2.305l-.088.9a.87.87 0 01-.864.78zM31.484 141.448c-.013 0-.026 0-.039-.002a.868.868 0 01-.83-.904c.071-1.678.1-2.274.191-2.608a.868.868 0 011.676.45c-.048.211-.09 1.194-.133 2.233a.866.866 0 01-.865.831zM39.597 101.967a.868.868 0 01-.866-.826c-.004-.082-.097-2.031-.024-2.874a.869.869 0 011.729.148c-.046.54-.009 1.876.028 2.643a.868.868 0 01-.825.908l-.042.001zM39.477 111.161a.868.868 0 01-.866-.831c-.001-.029-.123-2.979-.074-3.338a.864.864 0 01.978-.742.867.867 0 01.746.947c-.014.316.065 2.616.085 3.059a.867.867 0 01-.83.904l-.039.001zM39.488 118.667a.868.868 0 01-.868-.852l-.021-1.001c-.039-1.91-.036-2.004-.017-2.133a.864.864 0 01.992-.723.866.866 0 01.73.934c-.007.198.012 1.029.03 1.886l.02 1.005a.867.867 0 01-.852.884h-.014zM39.563 126.974a.869.869 0 01-.868-.846l-.01-.344c-.068-2.327-.066-2.347-.064-2.399a.85.85 0 01.907-.826.866.866 0 01.827.872c.002.158.045 1.621.065 2.303l.011.354a.868.868 0 01-.847.887l-.021-.001zM39.983 135.58a.87.87 0 01-.868-.868c-.001-.963-.019-1.389-.036-1.854-.013-.354-.029-.73-.038-1.365a.87.87 0 01.854-.882h.013c.474 0 .86.379.868.854.009.616.023.981.037 1.325.018.48.037.922.038 1.919a.87.87 0 01-.867.87h-.001zM40.002 141.448a.87.87 0 01-.868-.846c0-.021-.051-2.063-.006-2.432a.868.868 0 111.723.212c-.011.153-.007 1.166.019 2.174a.871.871 0 01-.846.892h-.022zM47.819 93.9a.868.868 0 01-.866-.817c-.041-.693-.054-1.229-.066-1.629l-.004-.171a.87.87 0 01.844-.892c.46-.033.878.365.892.845l.005.173c.01.386.024.901.063 1.572a.869.869 0 01-.816.918l-.052.001zM47.916 101.336a.868.868 0 01-.864-.799l-.09-1.096c-.065-.762-.064-.762-.056-1.182.01-.475.398-.905.871-.905h.016c.479.009.861.351.852.829l-.002.11c-.006.355-.005.355.049 1.001l.09 1.104a.867.867 0 01-.866.938zM47.592 110.313h-.011a.869.869 0 01-.856-.88c0-.026.042-2.761.08-2.967a.877.877 0 011.005-.703c.451.08.758.494.712.942-.018.305-.06 2.662-.061 2.75a.87.87 0 01-.869.858zM47.801 118.208h-.002a.867.867 0 01-.866-.869 138.3 138.3 0 00-.052-2.453.867.867 0 01.819-.914c.514.002.888.341.915.819.01.19.055 2.189.054 2.552a.868.868 0 01-.868.865zM47.719 127.072a.868.868 0 01-.868-.851l-.034-1.204c-.034-1.111-.045-1.547-.029-1.73a.864.864 0 01.945-.785.867.867 0 01.784.938c-.009.181.014.84.036 1.524.012.431.026.872.033 1.223a.869.869 0 01-.85.886l-.017-.001zM47.85 135.591a.869.869 0 01-.865-.818l-.077-1.225c-.054-.83-.112-1.729-.114-1.878a.866.866 0 01.854-.878l.015-.001c.473 0 .859.379.868.854.002.148.059 1.003.11 1.79l.079 1.236a.87.87 0 01-.816.918c-.021.002-.037.002-.054.002zM47.883 141.448a.87.87 0 01-.868-.843c-.038-1.303-.057-2.069-.045-2.385.018-.48.426-.89.9-.835a.868.868 0 01.834.9c-.01.293.019 1.323.047 2.268a.871.871 0 01-.842.895h-.026zM55.985 94.079h-.002a.868.868 0 01-.866-.87c0-.361-.025-2.094-.053-2.874a.864.864 0 01.834-.899c.468-.055.882.354.899.834.03.8.056 2.574.055 2.944a.865.865 0 01-.867.865zM56.049 101.848a.868.868 0 01-.868-.867l-.002-.588c-.004-.77-.011-1.992-.003-2.339a.868.868 0 01.868-.847h.021a.87.87 0 01.846.89c-.009.338-.001 1.533.002 2.286l.003.598a.867.867 0 01-.867.867zM56.229 109.923a.867.867 0 01-.868-.851 69.122 69.122 0 00-.027-.938c-.04-1.247-.042-1.395-.034-1.489a.877.877 0 01.934-.796c.468.037.82.438.798.904-.001.143.02.762.037 1.326.013.411.025.793.028.959a.868.868 0 01-.851.884l-.017.001zM55.968 120.039l-.045-.001a.868.868 0 01-.823-.91l.026-.803c.027-.874.069-2.189.086-2.608.02-.479.474-.856.901-.834a.867.867 0 01.833.9 479.08 479.08 0 00-.084 2.597l-.027.836a.87.87 0 01-.867.823zM56.157 127.418a.868.868 0 01-.868-.848 54.63 54.63 0 00-.147-2.668.867.867 0 111.73-.145c.097 1.155.146 2.438.154 2.773a.87.87 0 01-.849.888h-.02zM56.401 135.176a.867.867 0 01-.866-.834c-.007-.165-.051-.795-.091-1.374a65.993 65.993 0 01-.071-1.091.867.867 0 01.832-.901.864.864 0 01.902.832c.004.102.036.554.069 1.042.042.6.086 1.251.093 1.423a.868.868 0 01-.832.902l-.036.001zM56.518 141.448a.87.87 0 01-.868-.859c-.006-.489-.026-.963-.044-1.411-.016-.385-.032-.753-.037-1.096a.868.868 0 01.853-.882c.522-.027.875.375.883.854.006.329.02.683.036 1.053.019.463.039.953.045 1.463a.869.869 0 01-.857.879l-.011-.001zM64.083 94.108c-.032 0-.063-.003-.095-.006a.868.868 0 01-.771-.94c.011-.183.032-1.268.043-1.974a.867.867 0 01.868-.854h.013a.867.867 0 01.854.882c0 .018-.029 1.911-.052 2.116a.865.865 0 01-.86.776zM64.063 101.997a.87.87 0 01-.866-.825c-.001-.022-.106-2.326-.088-2.588.033-.479.458-.819.926-.806a.868.868 0 01.808.909c-.005.244.075 2.13.088 2.397a.866.866 0 01-.822.909c-.014.004-.03.004-.046.004zM64.151 110.205a.869.869 0 01-.868-.857c-.004-.254-.014-.603-.024-.954-.016-.577-.033-1.168-.025-1.426a.87.87 0 01.868-.843h.027a.87.87 0 01.841.895c-.007.241.009.789.024 1.324.011.362.021.718.025.98a.87.87 0 01-.857.881h-.011zM64.122 118.993h-.027a.87.87 0 01-.841-.895c.006-.158.009-.69.013-1.295.006-.905.012-1.967.027-2.244.024-.479.49-.855.911-.824a.868.868 0 01.823.911 94.04 94.04 0 00-.025 2.168 101.46 101.46 0 01-.013 1.339.87.87 0 01-.868.84zM63.838 128.339h-.021a.868.868 0 01-.848-.888c.028-1.211.023-1.913.01-3.64a.868.868 0 01.861-.874h.007c.476 0 .865.385.868.861.014 1.75.018 2.465-.01 3.692a.866.866 0 01-.867.849zM63.998 135.215a.869.869 0 01-.868-.85c-.007-.342-.029-.889-.047-1.374-.015-.367-.027-.7-.033-.891a.87.87 0 01.846-.891c.52.023.877.367.891.846.004.188.017.509.032.867.019.497.041 1.056.049 1.406a.869.869 0 01-.87.887zM63.96 141.448h-.015a.872.872 0 01-.854-.884l.011-.829c.007-.688.007-.73.039-.854a.867.867 0 011.705.3c-.003.088-.004.301-.008.572l-.01.841a.869.869 0 01-.868.854zM72.033 94.154a.867.867 0 01-.866-.832 94.864 94.864 0 01-.049-1.521l-.01-.293a.871.871 0 01.842-.896c.531-.01.88.362.894.842l.009.299c.008.358.022.837.049 1.498a.869.869 0 01-.832.902l-.037.001zM72.019 101.779a.866.866 0 01-.865-.814c-.077-1.239-.081-1.375-.096-1.846l-.031-.883a.868.868 0 01.833-.901.847.847 0 01.901.833l.031.896c.015.457.02.59.093 1.793a.867.867 0 01-.813.919l-.053.003zM72.072 110.559a.87.87 0 01-.868-.852l-.03-1.268a59.01 59.01 0 01-.034-1.681.869.869 0 01.869-.846h.02c.479.012.858.41.848.89-.006.194.014.881.033 1.59l.031 1.281a.87.87 0 01-.852.885l-.017.001zM72.307 118.678a.866.866 0 01-.868-.856l-.023-1.279c-.022-1.13-.029-1.571-.019-1.735a.87.87 0 011.733.129c-.008.169.007.849.021 1.57l.023 1.294a.867.867 0 01-.856.878l-.011-.001zM71.851 126.454h-.019a.87.87 0 01-.85-.886c.006-.272-.008-2.335-.016-2.536a.868.868 0 01.83-.904.885.885 0 01.904.831c.012.269.022 2.358.018 2.646a.868.868 0 01-.867.849zM71.966 136.02a.87.87 0 01-.869-.845c-.021-.855-.042-1.167-.063-1.513-.018-.298-.038-.62-.062-1.308a.865.865 0 01.836-.898c.485-.064.882.358.897.838.024.663.043.973.061 1.261.023.359.043.684.067 1.574a.868.868 0 01-.846.891h-.021zM72.2 141.448a.865.865 0 01-.865-.832l-.094-1.998a.868.868 0 01.827-.907.864.864 0 01.907.826l.094 2.005a.87.87 0 01-.831.904c-.012.002-.025.002-.038.002zM80.07 141.448a.867.867 0 01-.865-.82c-.052-.958-.121-1.823-.177-2.204a.868.868 0 01.734-.983.876.876 0 01.983.734c.095.652.171 1.97.192 2.357a.867.867 0 01-.819.914c-.016.002-.031.002-.048.002zM79.144 134.527l.863-.074-.87.009c-.009-.089-.011-.089-.035-.839l-.108-3.332a.868.868 0 01.84-.896l.028-.001c.467 0 .853.369.867.84l.108 3.335c.021.645.02.645.027.721l-.857.163-.863.074zM80.038 126.548a.866.866 0 01-.866-.831c-.007-.12-.056-2.153.001-2.927.034-.479.47-.826.929-.803.479.034.838.45.804.929-.047.64-.007 2.562.001 2.726a.87.87 0 01-.83.905l-.039.001zM80.103 119.008a.867.867 0 01-.861-.773c0-.009-.02-.288-.044-.699-.065-1.015-.183-2.891-.217-3.337a.87.87 0 01.798-.936c.512-.028.896.321.934.799.034.453.153 2.342.217 3.364l.041.649a.87.87 0 01-.868.933zM80.105 109.99a.842.842 0 01-.826-.637c-.068-.266-.11-1.021-.191-3.361a51.974 51.974 0 00-.028-.751.87.87 0 011.734-.093c.005.114.016.405.029.784.026.814.093 2.721.145 3.022.077.461-.216.918-.672 1.014a.823.823 0 01-.191.022zM80.187 101.219a.868.868 0 01-.794-.516c-.198-.448-.206-2.921-.206-2.944.017-.479.406-.841.894-.842a.87.87 0 01.843.894c-.007.263.048 1.957.099 2.307a.867.867 0 01-.836 1.101zM79.956 94.152a.854.854 0 01-.849-.71c-.058-.34-.079-2.794-.059-4.025a.87.87 0 01.868-.854h.015a.87.87 0 01.854.883c-.023 1.446.011 3.474.038 3.734a.882.882 0 01-.867.972zM84.351 140.159a.86.86 0 01-.858-.761c-.042-.354-.163-4.162-.168-4.34a.87.87 0 01.85-.888h.019c.472 0 .858.377.868.849.009.428.127 3.884.156 4.182a.873.873 0 01-.867.958zM84.205 131.375a.865.865 0 01-.858-.759c-.119-.939.021-4.278.078-4.873.045-.477.477-.846.946-.78.477.045.827.47.781.945-.065.679-.171 3.8-.084 4.49a.868.868 0 01-.863.977zM84.53 122.082a.868.868 0 01-.859-.753c-.071-.538-.112-2.441-.07-3.235.025-.479.404-.87.914-.819a.868.868 0 01.819.914c-.039.728.004 2.506.059 2.91a.869.869 0 01-.863.983zM84.611 114.036a.867.867 0 01-.864-.804c-.015-.202-.124-3.195-.046-4.22.037-.478.464-.824.931-.801a.87.87 0 01.801.932c-.065.873.034 3.755.046 3.967a.87.87 0 01-.808.923l-.06.003zM84.77 105.248a.906.906 0 01-.795-.484c-.465-.89-.229-4.185-.226-4.217a.867.867 0 111.728.163c-.087.926-.071 2.916.057 3.296.221.425.047.927-.379 1.149a.828.828 0 01-.385.093zM84.563 97.102a.856.856 0 01-.858-.767c-.028-.261-.032-2.341.062-3.253a.868.868 0 011.727.176c-.084.812-.075 2.698-.062 2.913a.876.876 0 01-.869.931zM88.77 93.957a.866.866 0 01-.857-.741c-.117-.789-.114-1.804-.092-2.516a.87.87 0 01.868-.84h.029a.869.869 0 01.839.896c-.018.524-.03 1.51.072 2.207a.868.868 0 01-.859.994zM88.461 102.387l-.058-.002a.87.87 0 01-.81-.924c.065-1.01.076-1.536.089-2.082.009-.381.017-.77.042-1.329.021-.478.405-.865.908-.825a.865.865 0 01.825.907c-.024.54-.031.916-.039 1.284-.014.566-.024 1.111-.093 2.158a.868.868 0 01-.864.813zM88.427 109.921a.87.87 0 01-.869-.868c0-.073-.006-.44-.013-.907-.026-1.875-.032-2.455-.025-2.585a.864.864 0 01.916-.817.867.867 0 01.817.908c-.005.197.015 1.534.028 2.469.006.479.013.856.013.933a.868.868 0 01-.867.867zM88.298 119.263a.87.87 0 01-.868-.844l-.004-.161c-.018-.546-.069-2.249-.08-2.939a.867.867 0 01.855-.88h.014c.473 0 .86.38.867.855.009.684.062 2.369.078 2.911l.006.164a.87.87 0 01-.843.894h-.025zM88.438 127.187h-.007a.87.87 0 01-.862-.875v-.181c.008-3.49.038-3.647.063-3.774a.86.86 0 011.015-.689.867.867 0 01.696.978c-.011.119-.032.702-.038 3.491v.189a.867.867 0 01-.867.861zM88.199 135.18h-.011a.87.87 0 01-.856-.881c.001-.034.056-3.583.144-3.989a.861.861 0 011.028-.669.87.87 0 01.676.997c-.041.349-.102 2.839-.112 3.685a.868.868 0 01-.869.857zM88.196 141.448a.867.867 0 01-.864-.811c-.032-.464-.117-1.7-.172-1.938a.877.877 0 01.635-1.049.863.863 0 011.046.617c.078.302.136.996.223 2.253a.869.869 0 01-.808.925c-.019.001-.039.003-.06.003zM92.3 97.441a.869.869 0 01-.868-.867l-.033-.537c-.034-.534-.085-1.347-.127-2.087a.87.87 0 01.817-.917.865.865 0 01.916.816c.043.737.093 1.548.127 2.079.023.375.036.624.036.646a.868.868 0 01-.868.867zM92.116 106.806h-.007a.865.865 0 01-.86-.873c.02-3.131.233-3.639.304-3.804a.869.869 0 011.606.659c-.076.257-.162 1.443-.174 3.155a.87.87 0 01-.869.863zM92.117 115.338a.868.868 0 01-.867-.86l-.021-1.24c-.047-3.009-.043-3.043-.024-3.158a.878.878 0 01.989-.727.867.867 0 01.734.921c-.006.24.021 1.924.037 2.936l.021 1.251a.87.87 0 01-.86.878l-.009-.001zM92.56 123.581a.87.87 0 01-.869-.861l-.02-1.723c-.011-.911-.024-1.839-.023-2.105a.868.868 0 01.869-.863h.004a.87.87 0 01.863.873c-.001.263.011 1.175.023 2.073l.02 1.73a.868.868 0 01-.86.876h-.007zM92.707 131.592a.867.867 0 01-.867-.844c-.03-1.04-.034-1.524-.038-1.939-.005-.491-.008-.881-.054-2.007a.869.869 0 01.832-.902c.436-.047.883.354.902.833.047 1.156.051 1.558.056 2.06.004.409.008.885.038 1.906a.872.872 0 01-.844.894l-.025-.001zM92.571 139.186h-.01a.866.866 0 01-.858-.877c.015-1.224-.019-2.745-.038-3.609l-.011-.434a.871.871 0 01.853-.885c.449-.024.874.372.884.851l.01.427c.02.881.054 2.428.039 3.669a.869.869 0 01-.869.858zM100.537 107.334a.869.869 0 01-.866-.824c-.034-.688-.128-3.002.066-3.887a.867.867 0 111.695.37c-.104.479-.093 2.088-.027 3.431a.868.868 0 01-.824.909l-.044.001zM100.378 115.944h-.012a.87.87 0 01-.857-.879c.014-.925 0-1.652-.01-2.278a33.53 33.53 0 01-.004-1.642c.015-.479.389-.814.896-.841a.87.87 0 01.841.895c-.017.483-.007.976.003 1.559.011.64.023 1.384.011 2.33a.869.869 0 01-.868.856zM100.524 123.581h-.022a.871.871 0 01-.846-.89c.004-.109.003-.356 0-.672-.003-.897-.01-2.258.051-2.923a.88.88 0 01.945-.786.87.87 0 01.784.944c-.054.583-.047 1.944-.044 2.758v.722a.868.868 0 01-.868.847zM100.622 131.784h-.002a.868.868 0 01-.865-.87c.001-.343-.007-.595-.014-.834-.019-.662-.035-1.234.099-3.113a.869.869 0 011.732.122c-.127 1.795-.112 2.325-.094 2.941.007.257.015.524.014.889a.87.87 0 01-.87.865zM100.17 139.563c-.015 0-.03 0-.044-.002a.867.867 0 01-.824-.909c.038-.774.064-1.435.087-1.973.05-1.209.067-1.604.129-1.848a.868.868 0 011.688.409c-.027.156-.054.813-.081 1.511-.023.54-.05 1.207-.09 1.986a.866.866 0 01-.865.826zM108.455 106.879h-.005a.869.869 0 01-.864-.872l.006-1.075c.009-1.898.011-2.295.072-2.604a.86.86 0 011.019-.675.87.87 0 01.684 1.017c-.028.154-.032.906-.038 2.271l-.006 1.075a.869.869 0 01-.868.863zM108.449 115.229l-.061-.002a.866.866 0 01-.807-.924c.006-.104.023-.609.044-1.205.029-.933.069-2.073.091-2.339.038-.479.488-.843.933-.796a.867.867 0 01.796.934c-.021.258-.056 1.36-.085 2.258a80.39 80.39 0 01-.047 1.266.866.866 0 01-.864.808zM108.615 123.082a.869.869 0 01-.868-.845c-.013-.471-.075-1.858-.117-2.786l-.028-.641a.867.867 0 01.828-.906.856.856 0 01.906.829l.029.641c.042.937.104 2.339.118 2.816a.87.87 0 01-.845.892h-.023zM108.998 131.127a.866.866 0 01-.865-.83c-.011-.229-.042-.83-.075-1.445-.089-1.679-.089-1.696-.086-1.767a.868.868 0 01.866-.835l.035.001a.868.868 0 01.834.868c.003.137.044.899.084 1.643l.076 1.458a.869.869 0 01-.829.906l-.04.001zM108.931 138.906h-.012a.866.866 0 01-.856-.879c.005-.397.004-.846.004-1.276 0-.773.001-1.495.029-1.823a.867.867 0 111.73.141c-.024.303-.022.969-.022 1.681 0 .439 0 .896-.004 1.301a.87.87 0 01-.869.855zM117.002 106.236a.869.869 0 01-.869-.864l-.002-.176c-.014-.598-.047-2.187.014-3.212.03-.479.459-.817.92-.814a.867.867 0 01.814.918c-.058.955-.024 2.549-.013 3.073l.003.209c0 .48-.387.865-.867.866zM117.037 113.981h-.021a.871.871 0 01-.847-.889l.006-.331c.054-3.129.061-3.163.083-3.276a.868.868 0 011.713.26c-.015.281-.048 2.247-.061 3.044l-.006.348a.865.865 0 01-.867.844zM116.688 122.829h-.03a.87.87 0 01-.839-.896c.007-.208.026-2.853.02-3.079a.875.875 0 01.825-.902c.511-.009.878.334.907.806.015.209-.011 3.082-.016 3.232a.87.87 0 01-.867.839zM116.938 131.225a.868.868 0 01-.864-.811c-.014-.199-.075-1.326-.127-2.274-.037-.686-.069-1.276-.074-1.346a.872.872 0 01.776-.926.86.86 0 01.949.74c.003.016.041.671.083 1.437.051.939.11 2.054.124 2.252a.868.868 0 01-.808.925c-.019.001-.039.003-.059.003zM117.41 139.102a.867.867 0 01-.864-.803c-.105-1.409-.214-3.674-.21-3.888.008-.479.452-.868.882-.855a.871.871 0 01.854.875c.002.186.097 2.266.207 3.739a.87.87 0 01-.803.93l-.066.002zM125.021 115.104a.866.866 0 01-.867-.842l-.036-1.197c-.019-.66-.027-1.012-.044-1.249a.87.87 0 01.81-.924c.512-.014.892.329.923.809.018.25.027.62.047 1.314l.035 1.193a.868.868 0 01-.841.896h-.027zM124.905 122.388l-.867-.006c.009-3.036.106-3.38.153-3.545a.868.868 0 011.674.458c-.012.066-.084.559-.09 3.023l-.87.07zM125.103 131.26a.868.868 0 01-.867-.844c-.068-2.407-.069-2.504-.074-3.007l-.001-.119a.87.87 0 01.86-.877c.48-.056.871.381.876.86l.001.121c.005.495.005.593.074 2.972a.87.87 0 01-.844.894h-.025zM125.511 139.446a.869.869 0 01-.865-.811c-.002-.033-.213-3.561-.195-3.805.032-.479.487-.844.923-.807a.869.869 0 01.811.89c.004.302.176 3.338.192 3.605a.864.864 0 01-.866.928zM133.408 139.815a.869.869 0 01-.867-.852 97.17 97.17 0 00-.066-1.396c-.08-1.575-.096-1.968-.088-2.106a.868.868 0 011.733.078c-.001.188.048 1.109.089 1.941.034.668.064 1.28.068 1.449a.87.87 0 01-.852.886h-.017zM96.536 102.624a.868.868 0 01-.865-.807c-.096-1.35-.147-3.605-.127-4.017a.869.869 0 011.733.084c-.014.276.029 2.436.126 3.81a.868.868 0 01-.867.93zM96.255 111.114h-.021a.87.87 0 01-.848-.889c.016-.596.015-1.545.015-2.328-.001-1.169.001-1.331.018-1.449a.858.858 0 01.98-.737.864.864 0 01.742.942c-.006.142-.005.641-.004 1.244 0 .796.001 1.762-.015 2.369a.867.867 0 01-.867.848zM96.314 119.411a.868.868 0 01-.868-.857c-.003-.28-.103-3.043-.116-3.25a.873.873 0 01.786-.93c.49-.062.888.293.939.761.023.202.125 3.235.127 3.398a.869.869 0 01-.868.878zM96.591 127.249a.868.868 0 01-.864-.812l-.09-1.233c-.065-.888-.14-1.906-.151-2.193a.867.867 0 111.733-.071c.013.282.085 1.273.149 2.137l.09 1.246a.87.87 0 01-.808.925l-.059.001zM96.359 135.625a.87.87 0 01-.868-.861c-.004-.413-.09-2.999-.099-3.218a.866.866 0 01.836-.898.863.863 0 01.898.835c.009.224.097 2.85.101 3.269a.868.868 0 01-.861.874l-.007-.001zM96.114 141.448c-.013 0-.025 0-.037-.002a.867.867 0 01-.83-.904c.023-.537.034-.983.045-1.442a.87.87 0 01.868-.847h.021c.479.014.857.41.847.89-.011.469-.024.924-.047 1.474a.869.869 0 01-.867.831zM104.626 102.002a.868.868 0 01-.863-.789 23.53 23.53 0 01-.096-1.591.869.869 0 01.851-.885c.46-.01.875.372.886.852.01.544.055 1.1.088 1.465a.869.869 0 01-.866.948zM103.981 111.127a.866.866 0 01-.865-.826c-.009-.172-.109-2.867-.065-3.449a.876.876 0 01.932-.801.867.867 0 01.8.931c-.03.396.043 2.743.067 3.234a.869.869 0 01-.826.91l-.043.001zM104.208 119.406a.867.867 0 01-.868-.861c-.001-.169-.007-.393-.014-.655-.02-.754-.046-1.787-.003-2.763a.885.885 0 01.905-.828c.479.021.85.426.828.904-.04.915-.014 1.914.005 2.642.007.275.014.511.015.688a.869.869 0 01-.862.874l-.006-.001zM104.664 127.008a.87.87 0 01-.868-.844l-.007-.202c-.138-3.492-.096-3.725-.07-3.878a.88.88 0 011.003-.707.868.868 0 01.711.979c-.01.129-.019.732.091 3.539l.009.219a.87.87 0 01-.844.894h-.025zM104.156 134.632a.868.868 0 01-.865-.957l.088-.891c.229-2.374.239-2.411.269-2.519a.867.867 0 011.691.382c-.03.221-.146 1.414-.231 2.305l-.088.9a.87.87 0 01-.864.78zM104.402 141.448c-.012 0-.025 0-.037-.002a.867.867 0 01-.83-.904c.07-1.678.1-2.274.19-2.608a.868.868 0 011.676.45c-.048.211-.09 1.194-.134 2.233a.866.866 0 01-.865.831zM112.396 111.161a.867.867 0 01-.866-.831c-.001-.029-.122-2.979-.074-3.338a.863.863 0 01.978-.742.867.867 0 01.746.947c-.016.316.065 2.616.085 3.059a.867.867 0 01-.83.904l-.039.001zM112.406 118.667a.867.867 0 01-.868-.852l-.021-1.001c-.039-1.91-.036-2.004-.016-2.133a.863.863 0 01.992-.723.865.865 0 01.729.934c-.007.198.012 1.029.03 1.886l.021 1.005a.868.868 0 01-.853.884h-.014zM112.48 126.974a.868.868 0 01-.867-.846l-.01-.344c-.068-2.327-.067-2.347-.065-2.399.023-.478.431-.861.908-.826.467.021.83.408.827.872.002.158.045 1.621.065 2.303l.011.354a.867.867 0 01-.847.887l-.022-.001zM112.901 135.58a.868.868 0 01-.867-.868c-.001-.963-.019-1.389-.037-1.854-.013-.354-.028-.73-.038-1.365a.869.869 0 01.854-.882c.494.049.873.375.882.854.009.616.023.981.036 1.325.02.48.038.922.039 1.919a.87.87 0 01-.869.871zM112.921 141.448a.871.871 0 01-.869-.846c0-.021-.051-2.063-.006-2.432a.868.868 0 111.725.212c-.013.153-.008 1.166.018 2.174a.87.87 0 01-.846.892h-.022zM120.511 110.313h-.012a.87.87 0 01-.856-.88c0-.026.042-2.761.078-2.967a.879.879 0 011.007-.703c.451.08.759.494.712.942-.018.305-.061 2.662-.062 2.75a.866.866 0 01-.867.858zM120.72 118.208h-.002a.866.866 0 01-.865-.869c.001-.35-.043-2.267-.052-2.453a.867.867 0 01.818-.914c.494.002.888.341.914.819.01.19.056 2.189.055 2.552a.868.868 0 01-.868.865zM120.638 127.072a.87.87 0 01-.869-.851l-.033-1.204c-.034-1.111-.045-1.547-.028-1.73a.865.865 0 01.944-.785.867.867 0 01.785.938c-.009.181.014.84.035 1.524.012.431.025.872.033 1.223a.868.868 0 01-.85.886l-.017-.001zM120.769 135.591a.868.868 0 01-.865-.818l-.077-1.225c-.055-.83-.112-1.729-.115-1.878a.868.868 0 01.854-.878l.016-.001c.473 0 .858.379.867.854.003.148.06 1.003.11 1.79l.079 1.236a.87.87 0 01-.816.918c-.02.002-.036.002-.053.002zM120.802 141.448a.87.87 0 01-.868-.843c-.037-1.303-.057-2.069-.045-2.385.018-.48.427-.89.9-.835a.868.868 0 01.834.9c-.01.293.019 1.323.047 2.268a.87.87 0 01-.842.895h-.026zM129.076 127.418a.87.87 0 01-.869-.848 54.63 54.63 0 00-.147-2.668.868.868 0 01.793-.938.876.876 0 01.937.793 55.06 55.06 0 01.154 2.773.869.869 0 01-.849.888h-.019zM129.319 135.176a.864.864 0 01-.865-.834c-.008-.165-.052-.795-.092-1.374a74.35 74.35 0 01-.07-1.091.866.866 0 01.831-.901c.49-.03.884.353.903.832.003.102.035.554.068 1.042.041.6.086 1.251.093 1.423a.868.868 0 01-.833.902l-.035.001zM129.437 141.448a.87.87 0 01-.868-.859c-.006-.489-.026-.963-.044-1.411-.015-.385-.031-.753-.037-1.096a.869.869 0 01.854-.882c.464-.027.875.375.883.854.006.329.02.683.034 1.053.02.463.04.953.046 1.463a.868.868 0 01-.856.879l-.012-.001zM136.879 141.448h-.016a.872.872 0 01-.854-.884l.011-.829c.008-.688.008-.73.039-.854a.874.874 0 011.05-.638.867.867 0 01.655.938c-.003.088-.004.301-.009.572l-.01.841a.866.866 0 01-.866.854z"
        />
        <g>
          <path
            fill="#E0D1C1"
            d="M71.453 97.656c-9.408 0-16.491-2.039-22.873-6.567a.866.866 0 01-.206-1.21.864.864 0 011.209-.206c6.255 4.438 13.288 6.351 22.693 6.241 4.993-.063 10.726-2.274 15.726-6.063a.867.867 0 111.049 1.383C83.763 95.243 77.656 97.58 72.3 97.65c-.283.003-.567.006-.847.006z"
          />
        </g>
        <g>
          <path
            fill="#87A368"
            d="M30.36 141.448a.868.868 0 01-.866-.826l-.053-1.07c-.626-12.647-1.04-21.004-9.317-38.015a.87.87 0 01.401-1.161.872.872 0 011.16.401c8.431 17.331 8.852 25.827 9.489 38.689l.053 1.069a.867.867 0 01-.824.91c-.014.003-.029.003-.043.003zM112.262 141.448a.869.869 0 01-.86-.995l.478-3.281c1.817-12.57 3.253-22.5 8.505-34.975a.873.873 0 011.138-.463.87.87 0 01.463 1.137c-5.167 12.271-6.588 22.102-8.388 34.55l-.477 3.284a.87.87 0 01-.859.743z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#D99467"
          d="M46.239 41.247c-3.976-1.565-3.11 9.292-.226 11.516 1.652 1.274 2.765.272 3.907-.368l-.87-6.528c-.537-1.755-1.309-4.028-2.811-4.62zM88.965 46.162l-.174 7.366c.918.292 1.951.798 3.271-.443 1.353-1.274 3.555-7.487 3.229-9.902-.5-3.731-4.56-2.301-6.326 2.979z"
        />
        <path
          fill="#C77F54"
          d="M51 50.787a.866.866 0 01-.868-.854c-.009-.574-.377-1.223-1.035-1.83-1.047-.965-2.464-1.479-3.021-1.467a.87.87 0 01-.114-1.732c1.192-.073 3.038.749 4.312 1.922 1.027.946 1.578 2.011 1.594 3.079a.868.868 0 01-.854.881l-.014.001zM87.593 52.813a.868.868 0 01-.854-1.03c.385-2.034 3.096-6.595 5.205-6.875.465-.076.91.27.975.746a.867.867 0 01-.747.974c-.901.121-3.356 3.525-3.727 5.479a.87.87 0 01-.852.706z"
        />
        <path
          fill="#EDAA7E"
          d="M86.971 27.718c-7.754-9.319-16.342-.649-21.124-3.45-2.28-1.332-1.725-3.345-5.405-4.652-1.284-.453-2.686-.892-4.073-.325-2.813 3.9.242 7.176-1.551 9.248-.856.984-2.57.856-3.901 2.569-2.037 2.686 1.158 6.32-1.158 8.6a4.592 4.592 0 01-.86.678c-.772.479-1.293 1.291-1.331 2.198-1.25 29.873 28.021 36.616 38.454 18.791 2.882-4.918 4.027-11.659 4.341-18.071-5.371-3.403.959-10.366-3.392-15.586z"
        />
        <path
          id="eyebrow"
          fill="#A15F51"
          d="M84.89 34.564a.866.866 0 01-.616-.257c-1.362-1.373-5.461-2.682-8.776-.401a.87.87 0 11-.982-1.432c3.971-2.733 9.021-1.375 10.99.609a.867.867 0 01-.616 1.481zM53.099 34.636a.867.867 0 01-.357-1.66c.108-.05.255-.149.444-.27 1.051-.672 3.241-2.074 6.357-1.73 1.292.144 2.419.627 3.243.982.192.082.37.159.529.222a.87.87 0 01.491 1.125.87.87 0 01-1.126.49 21.714 21.714 0 01-.579-.242c-.764-.329-1.714-.737-2.749-.852-2.508-.28-4.278.856-5.228 1.466a6.06 6.06 0 01-.668.391.852.852 0 01-.357.078z"
        />
        <g>
          <path
            fill="#5C2F3F"
            d="M58.172 40.695c-.609 0-1.12-.477-1.154-1.092l-.035-.649c-.029-.549-.035-.702-.084-1.027a1.156 1.156 0 01.969-1.319 1.147 1.147 0 011.319.969c.061.399.074.584.108 1.257l.034.641a1.155 1.155 0 01-1.09 1.22h-.067zM79.861 40.744c-.625 0-1.14-.499-1.157-1.127-.015-.611.072-1.775.089-2.003.047-.638.616-1.105 1.243-1.066a1.156 1.156 0 011.065 1.242c-.047.599-.092 1.407-.082 1.766a1.158 1.158 0 01-1.127 1.188h-.031z"
          />
        </g>
        <g>
          <path
            fill="#D99467"
            d="M69.315 54.135c-1.466 0-3.216-.704-5.578-2.704a.867.867 0 01-.239-1c.356-.843 1.43-1.195 3.372-1.083.312-4.451-.17-9.126-1.294-12.387a.868.868 0 111.642-.566c1.271 3.688 1.774 9.042 1.311 13.972a.88.88 0 01-.925.785 13.806 13.806 0 00-1.523-.083c3.041 2.195 4.289 1.354 6.528-.154.258-.174.524-.354.805-.535a.868.868 0 11.944 1.456c-.27.176-.53.351-.78.519-1.372.924-2.645 1.78-4.263 1.78z"
          />
        </g>
        <g opacity=".3">
          <path
            fill="#ED7278"
            d="M78.775 52.148c.742 4.494 6.075 1.559 5.465-1.111-.54-2.357-6.199-3.331-5.465 1.111zM57.407 48.935c-1.772-.103-2.747 1.088-2.727 2.889.025 2.306 3.085 3.485 4.44 2.296 1.616-1.457 1.269-5.015-1.713-5.185z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M62.194 57.034c-.546-.298-1.119.369-.737.86 5.425 6.958 10.297 6.765 15.024.4.358-.411.651-.844.434-1.161-.871-1.27-5.985 4.672-14.721-.099z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar19: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#CF8A5F"
        d="M79.619 54.476l-19.199-.257c-.557 6.587 3.455 26.932-7.472 37.429-3.702 3.556-9.003 5.735-12.985 8.115 6.761 5.466 20.893 8.949 29.219 8.881 10.932-.088 23.825-3.438 30.225-8.395C76.949 89.864 79.23 83.404 79.619 54.476zM39.963 111.085c-3.114-4.947-2.182-5.99-4.313-7.699-3.309 4.077-6.984 11.484-8.545 22.649-.408 2.917-1.253 8.635-2.021 13.785h18.479c.905-7.067 3.782-17.011-3.6-28.735zM105.268 104.534c-.089.121-.177.254-.275.375 0 .011-.012.011-.012.021-.77 1.089-1.518 2.133-2.211 3.167-1.264 1.892-2.387 3.773-3.277 5.875-1.374 3.211-2.211 6.95-2.266 12.043v.011c-.011.32-.011.649 0 .99v.021c0 .243 0 .484.011.727.1 3.938 1.298 7.787 1.485 11.704 0 .109.011.229.011.352h16.521c-.793-5.423-1.65-11.044-2.2-14.046-1.981-10.933-2.168-16.433-7.787-21.24z"
      />
      <path
        fill="#7997C7"
        d="M103.397 139.82c-.878-3.611-1.359-5.613-.198-9.778 0-.773 2.406-6.118 2.364-10.109-.078-5.444-3.493-10.145-.374-15.365-8.338-9.764-10.84-.874-39.102-1.639-24.339-.385-22.282-6.988-28.62-1.353 0 .113-.922.694-1.957 1.99-.012.011-.012.022-.012.033-1.073 1.61.812 2.428.848 7.447 0 2.849-.262 5.162.286 7.556 1.259 5.383 2.739 3.857.429 11.186-1.147 3.429-1.444 7.316-1.056 10.032h67.392z"
      />
      <path
        fill="#89A6D9"
        d="M41.605 140.646a.827.827 0 01-.743-.466 663.709 663.709 0 01-1.986-4.126c-.59-1.235-.804-1.683-1.069-2.148a.819.819 0 01-.058-.859l-.002.002c-.004 0 .021-.078.051-.183 1.08-3.037 1.996-5.175 2.739-6.4-1.055-3.387-1.517-4.74-1.892-5.836-.159-.466-.306-.896-.477-1.419a.822.822 0 01.021-.57c.754-1.833 1.186-3.01 1.502-3.87.28-.765.483-1.315.754-1.912l.123-.261a65.014 65.014 0 01-2.889-6.342l-.247-.621a.824.824 0 01.021-.684c.037-.09.134-.343.273-.704l.22-.566c.198-.505.433-1.109.696-1.741a81.694 81.694 0 011.07-2.674c.18-.417.674-.635 1.094-.46.419.181.624.64.444 1.059l-.19.454a90.24 90.24 0 00-.886 2.233 78.802 78.802 0 00-.69 1.728l-.218.56c-.075.199-.135.354-.184.478l.125.316a63.981 63.981 0 003.015 6.568.826.826 0 01.01.753c-.113.226-.202.404-.282.583-.249.545-.442 1.071-.709 1.802-.304.827-.714 1.944-1.409 3.646.13.392.249.739.375 1.112.39 1.143.877 2.565 2.019 6.245.075.24.037.5-.105.709-.48.706-1.345 2.369-2.741 6.287.236.438.475.935.985 2.004.42.88 1.029 2.154 1.981 4.117a.825.825 0 01-.741 1.186zM48.611 140.646a.829.829 0 01-.748-.473 932.85 932.85 0 00-2.748-5.727l-.318-.659c-.103-.214-.141-.517-.048-.734l.101-.247c.93-2.277 1.5-3.725 1.869-4.659.352-.894.531-1.346.677-1.638-.069-.198-.162-.472-.271-.79-.67-1.955-1.96-5.717-2.017-5.877-.088-.174-.073-.288-.027-.479.359-1.463 1.967-5.548 2.479-6.773-.333-.887-1.863-4.401-2.469-5.794l-.5-1.136c-.104-.238-.116-.563.009-.788.044-.094.133-.367.261-.736l.055-.158c.03-.089.063-.184.098-.277.034-.106.087-.253.142-.405l.071-.2c.297-.851.663-1.869 1.017-2.81a.826.826 0 011.544.582c-.35.928-.711 1.934-1.005 2.775l-.368 1.044c-.083.24-.146.425-.197.569l.385.882c2.211 5.077 2.604 6.074 2.648 6.389a.826.826 0 01-.091.509c-.111.244-1.924 4.746-2.416 6.494.181.52.652 1.895 1.941 5.655l.396 1.155a.822.822 0 01-.135.786c-.101.128-.274.566-.692 1.627-.365.925-.926 2.349-1.842 4.592l.189.386c.658 1.362 2.087 4.323 2.755 5.737a.828.828 0 01-.745 1.178zM55.661 140.646a.824.824 0 01-.713-.41c-.816-1.398-2.524-4.506-3.145-6.254a3.463 3.463 0 01-.11-.335.822.822 0 01.078-.605 3.57 3.57 0 00.181-.372c.676-1.448 2.18-5.02 2.61-6.181-.3-1.022-2.214-6.159-2.418-6.599-.167-.252-.136-.496.006-.764.105-.262 1.847-5.123 2.317-6.454-.209-.449-.567-1.318-1.303-3.136-.516-1.272-1.047-2.586-1.37-3.306a.866.866 0 01-.062-.139c-.057-.13-.1-.227-.132-.282-.185-.23-.196-.49-.088-.757a.798.798 0 01.055-.14c.08-.16.151-.409.22-.649.202-.671.427-1.419.929-2.328l.17-.311a.825.825 0 011.476.738c-.04.077-.083.156-.129.238l-.07.125c-.42.761-.61 1.39-.778 1.945a9.633 9.633 0 01-.197.636l.056.126a.754.754 0 01.061.136c.333.745.869 2.067 1.388 3.349.536 1.325 1.204 2.975 1.353 3.23.169.213.184.442.104.702-.015.047-1.832 5.166-2.391 6.658.621 1.532 2.431 6.427 2.479 6.959a.827.827 0 01-.04.339c-.338 1.004-2.039 5.027-2.74 6.531a4.86 4.86 0 01-.074.168c.515 1.397 1.878 3.998 2.986 5.898a.824.824 0 01-.296 1.127.78.78 0 01-.413.117zm-3.135-34.802h.011-.011zm-1.045-.565v0zm0-.001zM62.745 140.646a.827.827 0 01-.748-.475c-.319-.678-.783-1.482-1.274-2.335-.82-1.428-1.67-2.901-2.016-4.089-.06-.205-.071-.544.028-.732.003-.012.05-.127.12-.299.759-1.885 2.046-5.01 2.727-6.263-.448-1.286-2.312-6.265-2.422-6.55a.825.825 0 01-.044-.445c.044-.246 1.532-5.241 2.346-6.927-.311-.846-1.152-2.844-1.79-4.358l-.245-.585a60.978 60.978 0 00-.628-1.48c-.008-.022-.016-.044-.022-.066l-.14-.325c-.093-.222-.115-.543-.007-.759l.979-2.556a.827.827 0 011.066-.475.828.828 0 01.474 1.067l-.891 2.316.063.146a.864.864 0 01.036.101c.036.085.076.181.124.282.141.324.298.701.47 1.113l.212.507c1.041 2.473 1.826 4.354 1.989 4.92a.817.817 0 01-.114.695c-.443.642-1.905 5.306-2.244 6.486.462 1.227 2.405 6.409 2.493 6.821a.827.827 0 01-.125.638c-.345.505-1.435 2.982-2.776 6.311l-.043.104c.36 1.057 1.097 2.336 1.811 3.575.509.885.989 1.719 1.337 2.458a.827.827 0 01-.746 1.179zM69.653 140.646a.825.825 0 01-.739-.458 48.499 48.499 0 00-.492-.944c-.646-1.226-1.531-2.902-2.589-5.417a1.293 1.293 0 01-.098-.396c0-.104.012-.245.15-.619.309-.812 1.173-2.829 1.867-4.45.337-.788.628-1.466.776-1.82-.104-.305-.104-.342-.111-.383-.054-.205-.786-2.253-2.236-6.239a.816.816 0 01.052-.676c.446-.818 1.492-4.076 2.281-6.713l-.519-1.254-1.933-4.677a11.657 11.657 0 01-.246-.582l-.135-.293a.83.83 0 01-.021-.606l.288-.795c.117-.326.272-.741.446-1.207l.173-.464a.825.825 0 011.547.576l-.175.467c-.17.457-.323.865-.438 1.186l-.174.48.014.031c.068.17.142.347.235.555l1.941 4.699c.693 1.672.693 1.672.693 1.843a.824.824 0 01-.042.261c-.498 1.675-1.643 5.427-2.319 6.935 2.14 5.889 2.162 6.02 2.193 6.2l.141.394a.813.813 0 01.038.412c-.024.148-.026.154-.954 2.322-.685 1.598-1.536 3.585-1.835 4.368.999 2.352 1.833 3.931 2.446 5.093.196.371.367.694.509.979a.824.824 0 01-.734 1.192zM76.657 140.646a.828.828 0 01-.749-.481c-.188-.408-.404-.844-.641-1.323-.654-1.321-1.469-2.967-2.309-5.235a.827.827 0 01.006-.586c.082-.213 1.915-4.909 2.569-6.444-.339-1.07-2.023-5.962-2.354-6.525a.849.849 0 01-.082-.668c.013-.041.2-.529.473-1.238.579-1.5 1.73-4.481 2.088-5.518-.143-.371-.561-1.361-1.723-3.948-.339-.757-.66-1.481-.901-2.027a6.453 6.453 0 01-.239-.524c-.266-.591-.294-.655-.294-.855a.83.83 0 01.147-.471c.055-.093.148-.32.274-.62.006-.021.014-.042.021-.062.183-.457.397-.994.623-1.583a.824.824 0 111.54.588c-.221.582-.434 1.113-.606 1.547-.009.029-.02.058-.03.085-.097.228-.173.405-.236.549l.075.168c.055.133.109.264.184.401.01.019.043.092.051.109.239.543.559 1.265.896 2.018 1.911 4.257 1.911 4.389 1.911 4.629a.832.832 0 01-.037.243c-.215.695-1.25 3.392-2.205 5.864l-.328.852c.683 1.572 2.391 6.573 2.441 6.94a.834.834 0 01-.065.452c-.426.943-2.088 5.185-2.542 6.345.771 2.039 1.522 3.555 2.13 4.784.245.493.468.943.662 1.364a.826.826 0 01-.75 1.17zM83.621 140.646a.829.829 0 01-.729-.437c-1.021-1.905-2.845-5.954-3.023-6.573a.827.827 0 01.002-.465c.208-.693 1.355-3.512 2.452-6.179l.181-.439c-.444-.96-1.116-3-1.966-5.71-.149-.477-.254-.814-.289-.906-.148-.277-.091-.533.092-.79.283-.439 1.293-3.511 1.778-4.987.231-.703.391-1.186.497-1.493-.013-.029-.025-.062-.038-.094-.358-.892-1.262-3.146-2.014-4.884a47.122 47.122 0 00-.617-1.351c-.003 0-.033-.063-.06-.12a3.847 3.847 0 00-.279-.518.825.825 0 01-.109-.76c.005-.016.032-.079.077-.187.064-.152.179-.423.322-.773l.824-2.022a.822.822 0 011.074-.452c.423.17.626.651.454 1.073l-.825 2.024-.227.548c.052.1.106.205.162.322l.079.161c.179.38.402.859.637 1.396a220.52 220.52 0 012.031 4.925l.148.369c.086.204.089.44.004.646-.067.16-.325.944-.574 1.703-.877 2.668-1.421 4.262-1.778 5.025l.204.649c.437 1.395 1.597 5.097 1.994 5.718a.823.823 0 01.082.722 47.33 47.33 0 01-.34.832c-.547 1.329-1.922 4.675-2.313 5.776.378.957 1.883 4.302 2.813 6.033a.826.826 0 01-.338 1.117.803.803 0 01-.388.101zM90.628 140.646a.827.827 0 01-.735-.448c-.593-1.152-1.505-3.205-2.17-4.703-.372-.837-.658-1.484-.749-1.653l-.016-.029a.827.827 0 01.038-.828l.004-.008c.167-.325.721-1.814 1.211-3.13.794-2.132 1.142-3.038 1.346-3.47-.159-.618-1.022-2.875-2.373-6.378a.817.817 0 01-.052-.354c.024-.35.838-3.688 2.494-7.014-.661-1.377-2.189-5.049-2.761-6.535l-.06-.156a5.92 5.92 0 01-.19-.519.813.813 0 01.011-.509l.05-.146c.054-.158.112-.327.183-.503.291-.813.718-1.907 1.333-3.415a.823.823 0 111.527.623 89.287 89.287 0 00-1.317 3.376 7.4 7.4 0 00-.123.332l.054.134c.028.068.055.138.084.224.697 1.813 2.497 6.069 2.851 6.687a.823.823 0 01.017.788c-1.479 2.855-2.284 5.799-2.473 6.619 2.546 6.607 2.533 6.644 2.375 7.167a.837.837 0 01-.13.254c-.134.241-.807 2.051-1.299 3.372-.543 1.461-.923 2.473-1.152 3.01.148.324.369.815.625 1.393.657 1.479 1.559 3.508 2.131 4.617a.825.825 0 01-.734 1.202zM97.744 140.646a.827.827 0 01-.747-.472 934.823 934.823 0 00-3.037-6.364.86.86 0 01-.091-.507c.036-.255.259-.943 2.564-6.505l.003-.007a.741.741 0 01.04-.108c.023-.048.044-.096.063-.139l-.482-1.39c-1.097-3.184-1.708-4.979-1.792-5.346a.855.855 0 01.004-.38c.008-.035 1.742-5.328 2.31-6.859l-1.234-3.033c-.771-1.897-1.157-2.85-1.395-3.354a2.557 2.557 0 00-.203-.375.823.823 0 01-.04-.95c-.009.001.05-.144.173-.449l.175-.428c.173-.424.391-.969.619-1.566.346-.858.729-1.824 1.092-2.747a.825.825 0 011.536.603c-.364.929-.75 1.897-1.093 2.746-.228.597-.45 1.152-.627 1.587l-.175.427-.084.207c.036.071.075.15.116.236.261.551.652 1.517 1.434 3.44l1.358 3.337a.822.822 0 01-.013.654c-.228.499-1.906 5.572-2.287 6.736.247.803 1.167 3.47 1.686 4.976l.493 1.422c.121.336.14.387.14.537a.81.81 0 01-.095.383 7.318 7.318 0 01-.134.313c-.009.027-.018.054-.028.079l-.032.068c-1.595 3.852-2.196 5.377-2.391 5.927.27.556.98 2.042 2.918 6.118a.827.827 0 01-.744 1.183zM102.542 135.991a.824.824 0 01-.742-.464c-.337-.691-.63-1.277-.796-1.61a2.653 2.653 0 01-.084-.181.824.824 0 01.013-.706l.07-.135c.023-.046.05-.091.067-.137.537-1.034.958-1.97 1.359-3.022.26-.647.476-1.248.693-1.851.169-.467.34-.938.526-1.427l-.033-.12c-.372-1.192-1.627-4.605-2.101-5.891l-.198-.54a.828.828 0 01.009-.545c.108-.395.536-1.649 2.273-6.537l.06-.182c-.077-.22-.213-.602-.387-1.072-.533-1.423-1.555-4.034-2.392-5.48a4.75 4.75 0 00-.247-.418.824.824 0 01-.059-.813l.34-.787c.249-.586.611-1.452.982-2.36a.825.825 0 011.527.625c-.376.918-.74 1.789-.993 2.386l-.185.427.076.139c.883 1.526 1.944 4.232 2.496 5.708.007.019.471 1.283.514 1.458a.84.84 0 01-.024.471c-.057.161-.104.294-.143.419-1.589 4.466-2.059 5.848-2.197 6.272l.096.26c.477 1.297 1.743 4.738 2.133 5.992.073.256.11.428.125.509a.818.818 0 01-.044.443c-.22.56-.412 1.093-.604 1.624-.223.62-.446 1.237-.707 1.892a28.696 28.696 0 01-1.375 3.065c.172.345.416.838.69 1.403a.822.822 0 01-.738 1.185z"
      />
      <g>
        <path
          fill="#89A6D9"
          d="M98.557 140.646a.828.828 0 01-.307-.061.822.822 0 01-.459-1.071 3.63 3.63 0 01.119-.26l.061-.126c.688-1.416 1.971-4.002 2.666-5.404l.336-.677c-.32-1.091-.824-2.202-1.45-3.583-.388-.854-.82-1.807-1.286-2.922a.818.818 0 01-.049-.474c.041-.213.366-1.188 1.586-4.742.285-.832.532-1.552.652-1.912-.208-.615-.565-1.7-.937-2.824l-.779-2.357c-.263-.83-.462-1.43-.495-1.521a.907.907 0 01-.053-.291c0-.434 1.671-4.606 2.667-7.054l.145-.34.022-.054-.025-.071-.081-.23c-.29-.769-.818-2.093-1.32-3.355l-.204-.514a.83.83 0 01.765-1.136c.376 0 .693.249.793.593l.178.446a243.683 243.683 0 011.34 3.405l.087.245c.067.196.119.346.146.445a.824.824 0 01-.12.689c.025-.029-.003.041-.063.181l-.142.332c-.827 2.035-2.192 5.503-2.499 6.397.094.28.248.751.429 1.321l.777 2.354c.428 1.294.838 2.541 1.019 3.057.05.144.06.299.026.449-.019.087-.045.171-.768 2.279a346.245 346.245 0 00-1.462 4.315c.415.98.802 1.835 1.152 2.604.699 1.541 1.251 2.758 1.602 4.049.003.009.005.018.009.025a.826.826 0 01-.069.698l-.451.902c-.693 1.4-1.973 3.981-2.649 5.373l-.074.151c-.024.051-.05.1-.067.147a.83.83 0 01-.768.522zM91.616 140.646a.825.825 0 01-.729-1.211c1.73-3.281 2.267-4.705 2.621-5.648.085-.226.16-.426.237-.613-.099-.317-.381-1.018-.676-1.752a145.122 145.122 0 01-1.845-4.794.835.835 0 01-.047-.344c.021-.281 1.831-5.771 2.24-7.008-.06-.191-.163-.444-.298-.78-.389-.963-1.04-2.572-2.02-5.861a.81.81 0 01-.032-.294c.063-.87 1.073-2.891 1.284-3.258.641-1.117 1.203-2.555 1.569-3.538l.139-.364.075-.196-.121-.498a18.538 18.538 0 00-.321-1.03 49.142 49.142 0 00-1.09-2.793.826.826 0 01.443-1.08.829.829 0 011.079.444 50.401 50.401 0 011.129 2.897c.164.488.277.855.358 1.153.08.335.135.561.188.766.06.226.02.468-.109.663v-.001c.008 0-.032.108-.088.256l-.14.368c-.384 1.029-.979 2.553-1.683 3.776-.313.543-.926 1.922-1.048 2.435.928 3.096 1.543 4.619 1.915 5.536.229.569.368.913.438 1.272a.843.843 0 01-.032.434c-.112.323-1.826 5.56-2.188 6.733.694 1.9 1.292 3.39 1.733 4.491.746 1.857.884 2.221.806 2.625a.781.781 0 01-.055.176c-.103.232-.192.472-.3.759-.369.981-.928 2.466-2.706 5.839a.817.817 0 01-.726.44zM84.576 140.646a.826.826 0 01-.717-1.23l.301-.53c.773-1.354 1.937-3.393 2.742-5.649-.146-.335-.382-.864-.659-1.485-.764-1.713-1.811-4.057-2.224-5.114a.825.825 0 01-.025-.526c.057-.199 2.134-5.442 2.67-6.791-.563-1.506-1.948-5.021-2.424-6.23l-.168-.427a.816.816 0 01-.053-.346c.025-.438 2.429-6.144 2.702-6.793.049-.129.077-.199.107-.264l.088-.215c-.02-.059-.043-.129-.071-.206-.233-.603-.664-1.751-1.116-2.977a.826.826 0 011.547-.571 292.7 292.7 0 001.118 2.979c.13.374.191.589.205.655a.834.834 0 01-.065.514l-.203.501-.087.221c-.764 1.812-2.168 5.232-2.524 6.183l.055.14c.513 1.304 2.073 5.266 2.548 6.563a.824.824 0 01-.016.606c-.114.275-2.144 5.409-2.634 6.675.46 1.126 1.386 3.201 2.077 4.752.39.874.7 1.57.802 1.815a.824.824 0 01.039.512 1.46 1.46 0 01-.096.27 1.523 1.523 0 01-.017.051h.001c-.856 2.421-2.077 4.561-2.887 5.977l-.296.522a.83.83 0 01-.72.418zM77.384 140.646a.824.824 0 01-.749-1.172c.276-.599.772-1.553 1.313-2.595.681-1.31 1.444-2.778 1.896-3.787-.445-1.175-2.435-5.92-2.646-6.382a.868.868 0 01-.059-.541c.009-.037 1.799-5.217 2.346-6.695l-.181-.488c-.364-.968-1.04-2.768-2.306-6.462a.82.82 0 01-.015-.488c.02-.07.046-.167 2.075-4.723l.725-1.646.829.173-.765-.308.217-.494-.909-2.303a.826.826 0 011.536-.604l.936 2.372c.122.308.154.39.154.56a.82.82 0 01-.087.368c-.015.033-.141.317-.323.733a1.734 1.734 0 01-.128.262l-.676 1.552a577.307 577.307 0 00-1.906 4.309c1.191 3.47 1.836 5.186 2.186 6.119.15.398.244.649.3.82.07.214.05.446-.057.646a683.18 683.18 0 00-2.268 6.45c.612 1.411 2.729 6.362 2.729 6.811 0 .11-.022.221-.065.322-.453 1.063-1.314 2.722-2.074 4.186-.527 1.014-1.011 1.943-1.281 2.525a.824.824 0 01-.747.48zM70.421 140.646a.824.824 0 01-.748-1.173c.385-.832.94-1.876 1.478-2.883.647-1.216 1.437-2.697 1.671-3.385-.446-1.164-2.396-6.167-2.559-6.518a.93.93 0 01-.083-.363c0-.196 0-.201.743-2.339.487-1.4 1.376-3.955 1.513-4.546-.188-.919-2.026-6.128-2.305-6.715a.828.828 0 01-.117-.425c0-.171 0-.171.533-1.446l2.088-4.984c.062-.15.117-.287.174-.407l.082-.193.135-.318c-.021-.06-.049-.128-.08-.204a.864.864 0 01-.028-.081c-.15-.376-.367-.893-.614-1.466a.825.825 0 011.517-.651c.268.623.502 1.181.656 1.571.01.024.019.049.026.073.167.417.333.873.103 1.26-.031.073-.101.235-.195.461l-.094.22a7.842 7.842 0 00-.154.362l-2.093 4.993-.336.807c.692 1.642 2.342 6.541 2.361 7.127-.015.432-.331 1.421-1.612 5.105-.241.691-.488 1.402-.606 1.759.566 1.396 2.639 6.573 2.639 6.879a.805.805 0 01-.017.163c-.147.731-.813 2.013-1.89 4.036-.526.989-1.071 2.012-1.438 2.802a.832.832 0 01-.75.479zM63.469 140.646a.825.825 0 01-.721-1.224c.37-.669 1.005-1.82 1.162-2.078.962-1.689 1.561-3.225 1.848-3.962l.063-.161c-.496-1.207-2.604-6.187-2.755-6.502a.892.892 0 01-.076-.521c.138-.757 1.948-5.529 2.477-6.859-.103-.274-.325-.884-.589-1.609-1.542-4.242-1.812-5.053-1.842-5.333-.004-.306-.004-.389 1.622-4.245L65.994 105l-.034-.096a37.89 37.89 0 00-.636-1.668.825.825 0 011.531-.614c.271.676.508 1.285.653 1.713.084.24.143.42.17.551a.825.825 0 01-.072.54l-1.429 3.369c-.991 2.351-1.34 3.223-1.462 3.544.231.752 1.181 3.363 1.713 4.827.71 1.954.711 1.961.729 2.085a.815.815 0 01-.077.49c-.183.395-2.037 5.307-2.408 6.533.614 1.397 2.732 6.464 2.754 6.517.058.148.104.267.104.431a.82.82 0 01-.084.361l-.151.399c-.301.773-.929 2.384-1.961 4.2-.166.271-.782 1.387-1.139 2.035a.831.831 0 01-.726.429zM56.474 140.646a.824.824 0 01-.694-1.27c1.562-2.447 2.548-5.082 2.92-6.073a3.053 3.053 0 01.076-.186c-.199-.5-.837-2.052-2.564-6.146l-.125-.298a.824.824 0 01-.01-.608c.494-1.298.509-1.346.739-2.025.205-.611.583-1.727 1.617-4.681-.388-1.15-2.199-6.242-2.371-6.656-.118-.218-.104-.419-.01-.648.085-.207.32-.764.627-1.489.41-.973.952-2.252 1.431-3.399l.55-1.329c.045-.099.071-.168.096-.232a.626.626 0 00.017-.044.743.743 0 01.039-.106c.064-.146.12-.279.169-.402l-.066-.149-.836-1.993a.824.824 0 111.521-.639l.824 1.966c.093.202.159.364.191.443.081.196.103.466.026.663-.079.201-.172.438-.291.712l-.02.055a7.65 7.65 0 01-.16.391l-.538 1.304a733.076 733.076 0 01-1.434 3.404c-.209.496-.385.91-.501 1.188.555 1.515 2.401 6.599 2.427 6.911a.851.851 0 01-.043.342c-1.1 3.134-1.49 4.292-1.702 4.919-.216.641-.247.734-.642 1.774 1.549 3.672 2.442 5.822 2.656 6.393l.041.126c.021.063.056.167.056.307a.818.818 0 01-.142.463c.004 0-.036.092-.095.225-.396 1.064-1.427 3.817-3.083 6.41a.833.833 0 01-.696.377zM49.434 140.646a.826.826 0 01-.713-1.24c.754-1.298 2.54-4.651 3.096-6.014.039-.096.07-.18.091-.25-.157-.679-.71-2.002-.927-2.39-.71-1.23-1.333-2.59-1.705-3.402-.134-.293-.229-.504-.277-.588-.137-.195-.158-.4-.103-.631.201-.831.671-1.997 1.216-3.346.462-1.146.938-2.326 1.284-3.391-.083-.237-.248-.726-.452-1.325a518.891 518.891 0 01-1.833-5.463c-.104-.503.055-.866.724-2.4a88.326 88.326 0 001.886-4.604.74.74 0 01.024-.076l.167-.444-.111-.323c-.219-.646-.6-1.716-1.015-2.816a.827.827 0 01.482-1.063.83.83 0 011.063.482c.421 1.12.809 2.208 1.031 2.862.211.615.242.725.242.893a.814.814 0 01-.051.282 46.46 46.46 0 01-.244.654.55.55 0 01-.021.065 88.092 88.092 0 01-1.943 4.746c-.252.579-.513 1.175-.604 1.441a876.95 876.95 0 001.765 5.232c.55 1.624.55 1.624.565 1.695a.832.832 0 01-.023.403c-.368 1.191-.92 2.558-1.406 3.763-.437 1.084-.854 2.114-1.065 2.832l.199.431c.36.785.962 2.103 1.639 3.273.294.526.944 2.063 1.106 2.894.015.042.05.202.05.368a.718.718 0 01-.018.167c-.029.14-.094.365-.207.646-.608 1.485-2.441 4.921-3.199 6.224a.824.824 0 01-.713.413zM42.416 140.646a.825.825 0 01-.728-1.212c.306-.58.874-1.673 1.596-3.127h.001c.004-.011.01-.02.015-.028.436-.908.935-1.956 1.454-3.111-.104-.28-.366-.948-.77-1.947a244.351 244.351 0 00-1.886-4.538.867.867 0 01-.077-.499c.085-.533 1.187-3.641 1.523-4.58l.586-1.665.226-.637c-.346-1.047-2.059-5.958-2.282-6.472a.825.825 0 01-.068-.599c.373-1.392 1.059-2.969 1.855-4.798.281-.648.58-1.333.887-2.063.069-.153.125-.287.182-.424l.009-.021c-.018-.062-.042-.147-.081-.261-.062-.203-.096-.315-.143-.442a.975.975 0 01-.03-.096c-.092-.267-.204-.566-.322-.888a115.07 115.07 0 00-1.371-3.281.825.825 0 011.513-.657c.443 1.02.975 2.282 1.397 3.347.14.374.263.712.364 1.004.006.02.013.038.017.058.049.137.088.261.124.379.134.408.194.66.21.869a.824.824 0 01-.064.387l-.101.239c-.063.15-.125.297-.19.444a175.7 175.7 0 01-.889 2.064c-.717 1.649-1.345 3.091-1.701 4.311.617 1.561 2.351 6.715 2.36 6.76a.844.844 0 01-.018.39c-.019.06-.143.415-.328.937l-.587 1.666c-.718 2.009-1.228 3.521-1.395 4.088.377.87 1.332 3.18 1.81 4.36.534 1.322.799 2.007.884 2.295.022.076.056.255.056.334a.811.811 0 01-.083.359 132.657 132.657 0 01-1.592 3.421l-.024.044a139.109 139.109 0 01-1.608 3.15.83.83 0 01-.731.44zm2.406-7.249v0zM36.335 111.893a.823.823 0 01-.738-1.19 38.929 38.929 0 002.07-5.016l.039-.112c.069-.195.139-.397.208-.61a9.248 9.248 0 01-.123-.333c-.184-.451-.479-1.203-.802-2.023l-.287-.73a.82.82 0 01.465-1.067.82.82 0 011.069.464l.288.729c.321.814.615 1.562.81 2.045.108.306.181.482.202.531a.86.86 0 01.043.591c-.102.333-.212.647-.315.945l-.037.107a40.405 40.405 0 01-2.152 5.21.822.822 0 01-.74.459zM35.907 139.677a.825.825 0 01-.743-1.181l2.565-5.37a20.062 20.062 0 00-.226-.445c-.271-.521-.683-1.312-1.203-2.579a.824.824 0 111.525-.627c.493 1.198.883 1.948 1.141 2.445.231.444.373.716.431 1.002.025.093.042.188.042.265a.817.817 0 01-.072.337s-.049.111-.136.285l-2.578 5.398a.826.826 0 01-.746.47zM37.568 122.441a.825.825 0 01-.774-1.109c.435-1.187.572-1.633.615-1.792-.001-.067.005-.14.02-.217-.142-.406-.578-1.593-1.896-5.036a.823.823 0 01.475-1.065.822.822 0 011.065.475c1.921 5.017 1.994 5.31 2.021 5.419a.837.837 0 01-.022.478c-.043.434-.29 1.109-.729 2.306a.825.825 0 01-.775.541z"
        />
      </g>
      <g>
        <path
          fill="#E0D1C1"
          d="M46.121 104.893a.877.877 0 01-.195-.022c-1.419-.342-2.366-.569-2.994-.752a.844.844 0 01-.325-.065 2.132 2.132 0 00-.118-.026l.006-.03-.048-.032c-.763-.273-.719-.473-.615-.931.1-.439.561-.711.999-.621.077.016.195.04.324.086.367.091 1.213.301 3.159.767a.826.826 0 01-.193 1.626zM52.508 106.145a.77.77 0 01-.15-.015 85.869 85.869 0 00-1.491-.254c-.476-.08-1.003-.167-1.609-.272a.824.824 0 01-.671-.954.838.838 0 01.955-.672c.602.105 1.123.191 1.594.27.561.093 1.052.174 1.521.262a.824.824 0 01-.149 1.635zM59.827 107.021a.825.825 0 01-.086-.004l-3.591-.372a.825.825 0 11.17-1.64l3.591.371a.825.825 0 01-.084 1.645zM67.128 107.135c-.021 0-.043 0-.063-.002-.534-.041-1.15-.082-1.715-.119-.648-.043-1.23-.081-1.549-.111a.825.825 0 01.149-1.644c.311.028.878.065 1.51.107.57.039 1.191.08 1.73.121a.825.825 0 01-.062 1.648zM71.294 107.28a.824.824 0 01-.036-1.648c.183-.01 2.518-.19 3.644-.283a.826.826 0 01.138 1.645c-1.063.088-3.523.279-3.708.287l-.038-.001zM78.546 107.031a.826.826 0 01-.065-1.648c1.029-.083 1.252-.115 1.463-.146.226-.033.437-.063 1.48-.145a.836.836 0 01.886.76.826.826 0 01-.76.886c-.965.074-1.161.103-1.369.132-.225.033-.465.069-1.567.158a.79.79 0 01-.068.003zM84.784 106.355a.825.825 0 01-.131-1.638l2.319-.383a.826.826 0 01.27 1.629l-2.325.384a1 1 0 01-.133.008zM90.711 105.315a.824.824 0 01-.126-1.64s2.568-.402 2.802-.449a.832.832 0 01.972.616.817.817 0 01-.573.983c-.057.018-.134.039-2.945.48a.822.822 0 01-.13.01zM96.695 104.211a.827.827 0 01-.126-1.641l2.709-.426a.825.825 0 11.255 1.63l-2.709.427a1.12 1.12 0 01-.129.01zM39.963 103.238a.856.856 0 01-.217-.028l-2.248-.612a.827.827 0 01-.579-1.015.823.823 0 011.013-.578l2.247.613a.825.825 0 01-.216 1.62z"
        />
      </g>
      <g>
        <path
          fill="#4D2323"
          d="M101.066 22.632c-.956-.805-2.438-1.014-2.979-1.821-.726-1.035.332-2.407.338-3.745.01-1.819-1.278-1.651-3.48-2.752-4.022-2.029-1.436-6.349-5.36-7.396-1.109-.303-2.326-.077-3.172-.487-1.244-.603-1.371-2.354-2.986-3.2-2.608-1.363-6.04.092-7.517 2.31-.03 3.044-.99 2.697-.354 5.081.508 1.902 1.607 3.245 1.365 5.703-.243 2.656-3.586 3.814-.477 7.274 2.062 3.501-.572 7.171-3.683 10.167-2.043 1.967-1.708 5.882-.335 8.815l13.792-.562c1.527 1.364 6.564.378 8.08-3.708 1.02-2.749 5.296-.683 6.877-4.054 1.237-2.658-.809-3.529-1.245-5.016-.72-2.417 3.833-4.314 1.136-6.609z"
        />
        <path
          fill="#592A2A"
          d="M96.463 37.496a.824.824 0 01-.766-.517c-.233-.581-.57-1.054-1.124-1.581-.73-.696-1.669-.909-2.662-1.134-1.171-.265-2.381-.54-3.089-1.677-.751-1.199-.265-2.395.127-3.356.505-1.24.538-1.521-.22-1.95-.487-.305-1.336-.241-2.235-.171-1.129.088-2.407.185-3.527-.368-1.552-.745-1.522-2.295-1.498-3.54.029-1.547.048-2.569-1.957-2.956-.177-.032-.875-.087-2.595.604-.382.151-1.208.573-1.702.825l-.382.194a.824.824 0 11-.737-1.476l.368-.188c.588-.299 1.392-.71 1.843-.887 1.527-.614 2.71-.846 3.518-.692 3.368.65 3.323 3.031 3.293 4.608-.023 1.233.021 1.762.57 2.026.722.355 1.719.276 2.683.206 1.124-.086 2.285-.173 3.203.397 2.054 1.166 1.334 2.935.904 3.99-.347.853-.545 1.398-.256 1.859.329.53.995.704 2.055.944 1.113.253 2.374.539 3.435 1.549.726.69 1.194 1.356 1.517 2.159a.823.823 0 01-.766 1.132z"
        />
        <path
          fill="#592A2A"
          d="M100.367 36.198a.822.822 0 01-.591-.25c-2.369-2.43-2.404-4.063-2.432-5.375-.015-.662-.026-1.184-.31-1.792-.301-.643-.916-.826-1.897-1.072-1.169-.294-2.772-.697-3.14-2.739-.229-1.247.234-2.309.606-3.16.512-1.171.64-1.571-.055-2.166-1.05-.894-2.424-.77-3.883-.64-1.894.166-4.49.401-5.093-3.035-.071-.446-.073-1.016-.075-1.617-.004-.863-.008-2.043-.261-2.516-.273-.536-.797-.78-1.189-.893-.753-.217-1.632-.125-2.233.234-.305.185-.634.542-.981.919-.742.807-1.666 1.81-3.182 2.063a.823.823 0 01-.95-.679.827.827 0 01.68-.949c.957-.159 1.578-.834 2.238-1.551.411-.446.836-.908 1.345-1.216.993-.594 2.347-.75 3.539-.407.999.287 1.779.896 2.198 1.717.437.82.442 2.124.446 3.272.001.537.003 1.044.053 1.353.324 1.854 1.202 1.847 3.32 1.663 1.569-.14 3.521-.315 5.099 1.027 1.658 1.419.987 2.958.496 4.081-.325.747-.634 1.451-.495 2.205.172.956.745 1.139 1.92 1.434 1.043.262 2.341.589 2.989 1.973.431.924.448 1.738.464 2.456.024 1.179.05 2.292 1.964 4.258a.825.825 0 01-.59 1.402z"
        />
        <g>
          <path
            fill="#592A2A"
            d="M76.922 16.324c.242-2.458-.857-3.801-1.365-5.703-.637-2.384.323-2.038.353-5.081-1.141-.861-2.323-3.229-6.617-4.817-3.117-1.13-6.772.072-8.206 2.161-4.304 6.04-5.976-.971-10.127 1.596-1.908 1.188-1.379 3.338-2.524 4.749-2.178 2.686-4.937-.26-6.881 3.444-2.333 4.391.452 7.313.396 9.083-.105 3.314-7.39 7.361-3.879 11.917 1.808 2.346 5.032 1.23 6.309 2.454 1.473 1.383-.365 4.14.988 6.273 1.521 2.405 3.893.508 5.642 3.896l21.418-3.717c-1.373-2.933-1.708-6.849.335-8.815 3.11-2.995 5.744-6.666 3.683-10.167-3.111-3.459.232-4.617.475-7.273z"
          />
          <path
            fill="#6B3232"
            d="M47.17 21.892c-.705 0-1.382-.311-1.953-.571-.652-.297-1.325-.606-2.101-.649-.501-.028-.607.035-.814.286a.824.824 0 11-1.277-1.044c.694-.85 1.452-.935 2.184-.889 1.086.06 1.979.469 2.695.797 1.232.563 1.466.604 1.97-.083.49-.662.319-1.543.138-2.476-.262-1.353-.658-3.398 2.099-4.083.958-.246 1.76-.076 2.406.061.284.062.53.112.718.112.761 0 .909-.255 1.213-1.351.128-.463.274-.989.563-1.451 1.007-1.584 3.193-1.914 4.838-1.432 1.091.315 1.947 1.182 2.702 1.945 1.146 1.158 1.588 1.465 2.111 1.145.243-.146.517-.935.716-1.509.42-1.208.895-2.576 2.141-3.094.775-.324 1.703-.231 2.758.273.524.253.951.723 1.446 1.268 1.234 1.356 2.168 2.198 3.831 1.585a.826.826 0 01.57 1.549c-2.83 1.038-4.511-.802-5.62-2.024-.348-.382-.708-.777-.941-.889-.611-.293-1.086-.375-1.408-.24-.563.235-.91 1.233-1.217 2.114-.344.991-.669 1.927-1.419 2.378-1.724 1.055-3.118-.362-4.139-1.395-.645-.652-1.309-1.324-1.994-1.521-1.047-.309-2.44-.12-2.979.728-.159.252-.261.62-.368 1.01-.283 1.02-.71 2.561-2.803 2.561-.361 0-.716-.075-1.06-.148-.552-.117-1.07-.227-1.661-.075-1.198.297-1.175.664-.883 2.17.218 1.124.489 2.522-.43 3.768-.654.888-1.355 1.174-2.032 1.174z"
          />
          <path
            fill="#6B3232"
            d="M42.566 36.275a.82.82 0 01-.599-.258c-.756-.799-1.095-1.825-.951-2.887.145-1.073.786-2.073 1.672-2.609 1.008-.609 2.146-.552 3.153-.501.947.048 1.767.089 2.318-.378.312-.263.242-.686-.127-1.828-.403-1.249-.955-2.958.377-4.44 1.364-1.496 3.061-1.041 4.293-.712.963.257 1.446.349 1.709.085.437-.438.409-.957.32-1.836-.111-1.099-.262-2.603 1.385-3.756 3.066-2.163 5.245-.694 6.837.379 1.431.963 2.229 1.434 3.397.707.426-.262.647-.706.903-1.218.292-.585.623-1.249 1.314-1.684 1.723-1.043 3.798-.467 5.714 1.563.095.098.207.251.328.43.381.563.58.76 1.108.625a.824.824 0 11.415 1.596c-1.707.444-2.535-.774-2.889-1.294-.058-.085-.105-.163-.154-.216-.795-.841-2.311-2.112-3.655-1.3-.289.182-.481.568-.705 1.016-.308.614-.688 1.379-1.513 1.885-2.122 1.326-3.821.178-5.186-.741-1.579-1.063-2.825-1.906-4.968-.398-.819.574-.8 1.162-.692 2.241.097.96.218 2.155-.795 3.167-.966.966-2.259.62-3.3.343-1.219-.326-1.996-.487-2.646.225-.646.718-.441 1.547-.029 2.827.371 1.146.832 2.576-.379 3.593-1.045.886-2.331.822-3.465.766-.847-.044-1.644-.082-2.215.265-.464.28-.814.837-.893 1.418-.054.395-.007.981.515 1.533a.826.826 0 01-.597 1.392z"
          />
          <g>
            <path
              fill="#6B3232"
              d="M72.763 34.588a.825.825 0 01-.573-1.419c3.854-3.711 4.995-6.602 3.582-9.087-2.39-2.706-1.342-4.452-.498-5.857.392-.651.761-1.266.825-1.976.147-1.494-.253-2.492-.716-3.647-.223-.553-.452-1.124-.624-1.769-.386-1.441-.263-2.071-.012-2.936.151-.528.324-1.126.336-2.367a.825.825 0 01.825-.816h.008a.823.823 0 01.816.833c-.015 1.464-.238 2.24-.401 2.806-.182.633-.272.951.021 2.054.146.548.348 1.048.561 1.579.5 1.244 1.016 2.528.828 4.418-.099 1.08-.605 1.925-1.054 2.67-.799 1.332-1.28 2.133.37 3.971a.903.903 0 01.098.132c2.818 4.789-2.18 9.599-3.821 11.179a.81.81 0 01-.571.232z"
            />
          </g>
        </g>
      </g>
      <g>
        <path
          fill="#CF8A5F"
          d="M88.976 41.645c-.653.489-1.836 1.905-1.99 2.642l-1.793 6.774c1.173-1.072 5.068-3.054 6.782-5.609 1.985-2.935.071-6.12-2.999-3.807zM50.117 41.047c-2.525-.846-3.492 1.161-2.884 3.681.852 3.492 4.702 4.828 7.444 6.218l-1.532-7.17c-.484-.431-1.29-2.146-3.028-2.729z"
        />
        <path
          fill="#C77F54"
          d="M53.885 47.377a.822.822 0 01-.817-.724c-.174-1.425-1.738-2.352-3.983-2.361a.825.825 0 01.003-1.649h.003c3.129.013 5.333 1.508 5.613 3.81a.823.823 0 01-.819.924zM85.619 48.068a.824.824 0 01-.802-1.021c.503-2.053 3.065-3.924 5.144-4.385a.826.826 0 01.356 1.611c-1.526.338-3.561 1.794-3.897 3.166a.827.827 0 01-.801.629z"
        />
        <path
          fill="#D99467"
          d="M85.463 37.859c-1.814-3.219 2.621-6.223-2.535-8.243-1.277-.512-4.07-.723-4.421-2.518-.301-1.202-.488-3.501-2.062-3.501-3.478 0-.673 6.214-5.457 5.964-4.548-.224-3.902-5.917-7.271-6.041-2.537-.14-2.745 3.67-2.906 4.22-.776 2.595-3.229 1.21-4.953 1.032-3.823-.396-1.063 3.952-2.488 5.736-.896 1.133-2.405.365-3.711 1.15-1.747 1.061.997 2.862 1.691 3.702.754.903-.078 1.721.056 2.674 5.949 42.629 34.027 35.612 37.644-2.341-.814-.047-2.578-.047-3.587-1.834z"
        />
        <path
          fill="#2E3B59"
          d="M78.746 42.532c-.043 0-.086-.004-.131-.009-.599-.077-1.03-.579-.957-1.18l1.104.044-1.087-.171.025-1.424c.015-.607.471-1.056 1.125-1.076a1.1 1.1 0 011.075 1.125l-.023 1.23c-.006.34-.009.34-.025.462-.076.557-.557.999-1.106.999zM60.277 42.688c-.524 0-.988-.374-1.082-.908-.058-.33-.181-1.899-.16-2.163a1.102 1.102 0 012.197.114c.005.24.092 1.448.131 1.669a1.1 1.1 0 01-1.086 1.288z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#6B3232"
            d="M75.243 36.487a.826.826 0 01-.675-1.299c.819-1.168 2.354-2.013 4.008-2.206 1.867-.218 3.725.4 5.234 1.741a.825.825 0 01-1.096 1.234c-1.479-1.312-2.961-1.445-3.947-1.336-1.182.139-2.3.732-2.848 1.515a.825.825 0 01-.676.351zM56.044 36.916a.825.825 0 01-.666-1.311c1.059-1.455 2.704-2.438 4.396-2.631 1.57-.171 3.043.294 4.271 1.36a.825.825 0 11-1.083 1.247c-.871-.756-1.907-1.091-3.002-.966-1.243.141-2.458.875-3.249 1.962a.822.822 0 01-.667.339z"
          />
        </g>
        <g>
          <path
            fill="#C77F54"
            d="M69.891 53.375c-.442 0-.921-.1-1.431-.341-.03-.014-3.031-1.803-2.481-3.249.333-.876 1.377-.85 2.519-.591.087-3.256-.054-7.416-1.488-10.018a.826.826 0 011.445-.797c1.771 3.213 1.814 8.056 1.655 11.917a.827.827 0 01-1.059.756 16.932 16.932 0 00-.828-.224c.352.317.745.619.938.711.838.395 1.588.279 2.95-1.479a.822.822 0 011.157-.147.824.824 0 01.147 1.158c-.581.75-1.785 2.304-3.524 2.304z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#FFF"
            d="M67.059 56.893c-1.657-1.016-2.312-.388-2.517.12-.39.965 1.687 3.411 5.231 3.411 3.546 0 5.883-3.092 4.761-4.047-1.716-1.461-2.758 3.398-7.475.516z"
          />
        </g>
        <g opacity=".5">
          <path
            fill="#ED7278"
            d="M78.167 54.058c.688 2.276 3.72 1.992 4.118-.098.576-2.993-5.17-3.382-4.118.098zM58.32 54.525c.358.735 1.302 1.152 2.054 1.13 1.757-.069 2.08-1.785 1.59-2.872-.974-2.157-5.151-1.345-3.644 1.742z"
          />
        </g>
      </g>
    </svg>
  ),
  avatar20: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
      <path
        fill="#943A32"
        d="M95.628 43.24c-1.696-4.918-7.384-6.013-10.647-8.442-3.228-2.418-3.307-5.469-4.785-8.032-3.085-5.376-9.785-4.7-13.961-9.768.116 1.229-.015 2.25-.738 3.349-3.167 4.831-10.645 3.273-15.223 8.28-5.344 5.866.73 15.141-16.061 13.786-3.343 9.496 3.319 12.513 6.368 17.627 2.375 3.996 3.018 9.84 8.586 13.326 6.126 3.835 15.475.268 20.375 5.84 4.583 5.214 1.199 12.838 6.31 20.154 3.653 5.232 8.25 7.542 12.534 8.51-8.943-11.377 6.242-14.074 8.765-17.99 3.013-4.693-4.458-9.766-5.035-12.857-.772-4.129 4.021-6.627 5.859-9.743 2.925-4.92-2.711-7.816-4.116-10.412-2.008-3.68 3.798-7.744 1.769-13.628z"
      />
      <path
        fill="#B54933"
        d="M73.287 94.435a.893.893 0 01-.815-1.254c1.583-3.565 5.279-5.415 8.249-6.9 2.212-1.106 4.303-2.152 4.57-3.464.315-1.518-.846-2.77-2.189-4.219-1.481-1.599-3.162-3.411-2.61-5.857.364-1.64 1.67-2.958 2.933-4.234.79-.797 1.606-1.62 2.122-2.468 1.357-2.256-.062-4.063-2.381-6.562a29.31 29.31 0 01-1.31-1.474c-3.017-3.716-2.354-6.499-1.59-9.72.548-2.301 1.168-4.909.538-8.498-.086-.487-.121-.763-.121-.951a.892.892 0 011.784-.001 5.7 5.7 0 00.094.643c.695 3.951 0 6.872-.558 9.219-.737 3.1-1.226 5.148 1.24 8.185.359.446.787.906 1.229 1.383 2.007 2.16 4.753 5.121 2.6 8.7-.627 1.029-1.518 1.93-2.38 2.799-1.135 1.146-2.207 2.228-2.46 3.368-.346 1.533.823 2.794 2.178 4.255 1.468 1.583 3.13 3.377 2.629 5.792-.441 2.158-2.794 3.336-5.52 4.698-2.855 1.43-6.093 3.05-7.416 6.03a.894.894 0 01-.816.53zm9.179-55.601h.012-.012z"
      />
      <path
        fill="#EBB686"
        d="M77.241 53.33l-21.231-.802c3.911 32.128-6.488 35.53-18.294 40.636 9.401 27.823 41.196 36.064 57.709 1.925-10.543-4.574-21.466-9.96-18.184-41.759z"
      />
      <path
        fill="#EBDBCC"
        d="M95.425 95.089c-16.514 34.14-48.309 25.898-57.709-1.925-3.267 1.412-6.64 2.954-9.85 5.271-10.416 7.504-7.898 18.917-12.379 41.832h100.255c-4.157-24.605-1.438-29.978-8.008-37.605-3.243-3.761-7.74-5.592-12.309-7.573z"
      />
      <path
        fill="#F26D57"
        d="M36.387 101.904a.89.89 0 01-.798-.491l-.117-.234c-.452-.898-.964-1.917-1.346-2.799a.893.893 0 01.464-1.173.896.896 0 011.173.465c.361.834.86 1.83 1.302 2.707l.117.234a.89.89 0 01-.795 1.291zM40.327 108.813a.892.892 0 01-.678-.313c-1.269-1.486-1.662-1.968-1.904-2.264a18.853 18.853 0 00-.47-.556.893.893 0 011.345-1.173c.243.28.34.399.505.599.239.293.628.767 1.881 2.236a.891.891 0 01-.679 1.471zM45.935 115.336a.879.879 0 01-.597-.23l-.596-.534c-.851-.764-2.197-1.972-2.979-2.693a.893.893 0 011.213-1.309c.775.719 2.111 1.917 2.957 2.674l.599.539a.89.89 0 01-.597 1.553zM53.282 119.963a.887.887 0 01-.398-.094c-3.272-1.639-3.476-1.76-3.623-1.848-.047-.027-.083-.048-.339-.175a.89.89 0 11.797-1.595c.344.172.389.199.453.239.096.056.296.174 3.511 1.783a.893.893 0 01-.401 1.69zM61.888 122.02c-.043 0-.086-.004-.129-.009l-1.454-.218c-.939-.141-1.945-.292-2.22-.324a.895.895 0 01-.782-.991c.058-.489.497-.824.991-.781.282.033 1.313.188 2.277.333l1.443.216a.892.892 0 01-.126 1.774zM69.537 122.669l-.041-.001c-1.951-.086-2.583-.108-3.149-.128l-.319-.013a.89.89 0 01-.858-.924c.018-.491.447-.905.923-.857l.318.01c.569.021 1.203.045 3.164.131a.89.89 0 01-.038 1.782zM73.368 122.242a.893.893 0 01-.28-1.739c.373-.124.731-.229 1.146-.351a60.529 60.529 0 002.594-.813.893.893 0 01.571 1.691 62.892 62.892 0 01-2.663.835 30.32 30.32 0 00-1.089.332.867.867 0 01-.279.045zM80.441 119.587a.892.892 0 01-.555-1.59c.28-.223.549-.451.906-.755.426-.362.976-.826 1.807-1.511a.891.891 0 111.131 1.38c-.821.674-1.362 1.133-1.783 1.491-.374.317-.656.559-.95.79a.891.891 0 01-.556.195zM85.825 115.133a.871.871 0 01-.651-.28c-.329-.364-.329-.904.036-1.235l.055-.05c.301-.271 1.202-1.085 2.522-2.289a.892.892 0 011.2 1.32c-1.322 1.205-2.225 2.021-2.526 2.293a.947.947 0 01-.636.241zM90.616 110.234a.89.89 0 01-.685-1.461l2.551-3.048a.891.891 0 111.365 1.148l-2.544 3.039a.893.893 0 01-.687.322zM95.446 103.905a.892.892 0 01-.803-1.28c.125-.259 1.503-3.153 1.697-3.568a.895.895 0 011.188-.426.894.894 0 01.426 1.188c-.197.417-1.579 3.321-1.704 3.583a.892.892 0 01-.804.503z"
      />
      <g>
        <path
          fill="#E0D1C1"
          d="M99.612 141.158h-.002a.893.893 0 01-.89-.896c.027-12.809.764-23.104 2.249-31.472.026-.148.055-.297.094-.461.42-1.917 1.615-5.159 3.043-8.237l.138-.31a.89.89 0 111.628.727l-.143.321c-1.361 2.937-2.535 6.107-2.929 7.901a5.414 5.414 0 00-.075.37c-1.467 8.266-2.193 18.461-2.222 31.165a.891.891 0 01-.891.892zM32.099 141.158c-.018 0-.035 0-.052-.002a.893.893 0 01-.84-.942c.945-16.549-.55-29.6-4.704-41.072A.892.892 0 0127.038 98a.896.896 0 011.142.536c4.239 11.707 5.766 24.981 4.808 41.78a.893.893 0 01-.889.842z"
        />
      </g>
      <g>
        <path
          fill="#EDAA7E"
          d="M88.902 37c-2.116 1.531-3.265 3.825-3.357 3.944l-1.08 6.149C98.774 40.814 93.249 33.892 88.902 37zM41.913 36.254c-2.957.389-4.134 7.065 7.342 11.328l-1.362-6.324c-.811-3.245-4.01-5.263-5.98-5.004z"
        />
        <path
          fill="#D99467"
          d="M85.231 44.111a.875.875 0 01-.507-.16.876.876 0 01-.235-1.208c.301-.45 2.702-2.839 3.94-3.528.386-.216.491-.264 1.595-.68a.892.892 0 11.628 1.669c-1.042.393-1.079.414-1.285.53-.996.554-3.162 2.687-3.404 3.012a.918.918 0 01-.732.365zM47.535 43.708a.891.891 0 01-.756-.417l-.098-.154c-1.094-1.738-1.354-2.151-3.527-2.929a.892.892 0 11.602-1.679c2.753.985 3.247 1.768 4.436 3.658l.098.155a.891.891 0 01-.755 1.366z"
        />
        <path
          fill="#F2C296"
          d="M87.211 36.86c0-.359.002-.442-.001-.331l.001.331zM66.725 14.597C62.42 25.894 58.234 18.945 49.4 28.351c-.254.271-.959 1.981-1.164 2.214a7.831 7.831 0 00-1.955 4.773c-.785 15.695 8.671 36.68 23.569 33.734 16.357-3.264 17.311-31.303 17.359-32.542-.019-2.313-.239-7.809-1.655-9.25-9.848-10.027-12.459-5.746-18.829-12.683z"
        />
        <path
          fill="#4D2323"
          d="M56.008 38.09a1.19 1.19 0 01-1.18-1.048 31.578 31.578 0 00-.226-1.643 1.188 1.188 0 01.952-1.386 1.185 1.185 0 011.386.952c.089.482.193 1.318.25 1.794a1.19 1.19 0 01-1.182 1.331zM75.21 37.962a1.19 1.19 0 01-1.189-1.189v-1.589a1.188 1.188 0 112.378 0v1.589a1.19 1.19 0 01-1.189 1.189z"
        />
        <g>
          <path
            id="eyebrow"
            fill="#943A32"
            d="M72.545 32.27a.87.87 0 01-.61-.243c-.343-.331-.381-.857-.065-1.215.235-.267 1.093-.871 1.681-1.146 1.879-.872 3.208-.324 4.628.768a.892.892 0 11-1.087 1.415c-1.183-.91-1.778-1.033-2.788-.566a6.292 6.292 0 00-1.12.735.939.939 0 01-.639.252zM52.924 32.332a.893.893 0 01-.683-1.466c1.957-2.324 4.087-1.712 5.724-.919a.891.891 0 01-.775 1.605c-1.699-.82-2.6-.704-3.582.464a.897.897 0 01-.684.316z"
          />
        </g>
        <g>
          <path
            fill="#E6A57A"
            d="M66.422 50.537c-.047 0-.096 0-.145-.003-1.248-.071-2.805-.998-3.274-1.944-.235-.472-.218-.966.045-1.357.28-.416.741-.593 1.216-.656.003-.561.015-1.159.028-1.781.063-3.076.14-6.906-.887-9.488a.894.894 0 01.499-1.159.897.897 0 011.159.5c1.16 2.918 1.079 6.947 1.012 10.183-.019.942-.037 1.827-.023 2.606a.894.894 0 01-.822.906c.344.208.77.389 1.142.41.574.042.915-.341 1.517-.941l.308-.304a.89.89 0 011.261.026c.342.356.33.92-.025 1.261l-.283.278c-.66.654-1.471 1.463-2.728 1.463z"
          />
        </g>
        <g opacity=".2">
          <path
            fill="#ED7278"
            d="M73.735 51.025c-.423 3.585 5.314 3.16 4.686-.511-.368-2.071-4.287-2.868-4.686.511zM53.584 51.393c.135 3.729 5.93 1.412 4.538-1.289-.875-1.688-4.654-1.918-4.538 1.289z"
          />
        </g>
        <g>
          <path
            id="smile"
            fill="#F26D57"
            d="M66.56 58.202c-.074 0-.148 0-.223-.004-1.504-.061-2.936-.745-3.831-1.83a.893.893 0 011.377-1.134c.576.699 1.521 1.141 2.525 1.183a3.83 3.83 0 002.844-1.172.891.891 0 111.282 1.24c-1.076 1.112-2.48 1.717-3.974 1.717z"
          />
        </g>
      </g>
      <g>
        <path
          fill="#B54933"
          d="M133.49 65.609c-2.047-9.46-10.521-11.329-14.189-13.593-10.175-6.274 3.662-20.885-15.259-31.769-3.958-2.272-6.209-2.334-9.355-4.21C87.548 11.779 88.114 3.71 72.15 1.042a36.392 36.392 0 00-5.811-.5c.14 2.817-1.292 4.826-1.197 8.049.118 4.06.909 6.489 1.091 8.407 4.177 5.067 10.875 4.392 13.961 9.768 2.26 3.936 2.924 8.877 6.151 11.296 3.265 2.43 7.339-.297 9.281 5.178 2.082 5.866-3.777 9.949-1.771 13.628 1.405 2.596 7.041 5.492 4.116 10.412-1.838 3.116-6.632 5.614-5.859 9.743.577 3.092 6.898 7.879 3.885 12.569-2.726 4.233-12.961 6.077-9.788 13.261 2.864 6.49 10.87 5.068 14.513 5.47 3.142.349 6.176 2.468 10.261 1.642 4.01-.786 4.333-3.706 10.228-5.527 5.639-1.813 12.315-2.601 13.912-9.315 1.095-4.554-1.337-8.912-2.333-12.937-1.383-5.477 2.231-9.516.7-16.577z"
        />
        <path
          fill="#CC543D"
          d="M103.443 109.833a.889.889 0 01-.746-.402.889.889 0 01.255-1.233c.328-.218.662-.427.99-.635 1.478-.927 2.87-1.805 3.223-2.988.507-1.675-1.005-2.53-3.555-3.739-2.228-1.056-4.752-2.253-4.14-4.802.411-1.732 2.256-2.8 4.209-3.931 2.387-1.381 4.853-2.808 4.745-5.37-.079-2.188-1.681-3.803-3.376-5.515-1.464-1.478-2.978-3.005-3.361-4.945-.518-2.599 1.617-5.403 3.332-7.656a39.59 39.59 0 001.041-1.406c3.466-5.002.958-7.459-1.698-10.06-1.352-1.323-2.627-2.573-2.905-4.129-.295-1.614.245-3.685.722-5.512.269-1.03.522-2.003.526-2.558.013-2.262-1.402-3.537-2.898-4.885-.85-.767-1.729-1.559-2.343-2.545-.829-1.342-1.207-2.91-1.574-4.425-.345-1.425-.67-2.769-1.33-3.843-1.182-1.934-2.999-1.876-5.103-1.805-1.516.048-3.082.1-4.365-.716-1.18-.747-1.682-1.8-2.124-2.73-.395-.832-.769-1.616-1.613-2.26-.574-.443-1.542-.878-2.662-1.382-3.655-1.641-9.771-4.391-14.268-12.882a.892.892 0 111.578-.833c4.208 7.948 9.753 10.44 13.422 12.088 1.272.573 2.278 1.025 3.016 1.592 1.185.903 1.692 1.97 2.139 2.91.404.849.723 1.518 1.469 1.991.82.521 2.05.48 3.352.438 2.209-.071 4.96-.163 6.683 2.656.806 1.313 1.18 2.86 1.542 4.357.35 1.444.679 2.807 1.356 3.904.479.771 1.229 1.445 2.021 2.16 1.644 1.482 3.505 3.161 3.487 6.221-.006.779-.273 1.806-.583 2.997-.409 1.566-.917 3.516-.692 4.745.178.998 1.256 2.053 2.397 3.172 2.633 2.579 6.238 6.111 1.917 12.348-.308.447-.686.944-1.088 1.472-1.42 1.864-3.363 4.417-3.003 6.229.279 1.413 1.543 2.688 2.879 4.038 1.776 1.791 3.787 3.821 3.892 6.698.154 3.636-3.055 5.492-5.633 6.984-1.612.934-3.134 1.814-3.369 2.801-.255 1.067 1.027 1.762 3.169 2.776 2.317 1.098 5.488 2.602 4.499 5.863-.54 1.824-2.29 2.924-3.98 3.987-.319.2-.642.403-.961.612a.894.894 0 01-.491.148z"
        />
        <path
          fill="#CC543D"
          d="M116.805 107.419a.89.89 0 01-.861-.664c-1.095-4.186 1.608-6.504 3.781-8.368.99-.848 1.926-1.65 2.317-2.47.597-1.236-.166-2.106-2.046-3.793-1.184-1.066-2.525-2.272-3.06-3.849-.995-2.877 1.157-5.166 3.239-7.381 2.148-2.283 4.178-4.441 3.219-7.215-.836-2.407-3.058-2.919-5.408-3.458-2.137-.493-4.347-1-5.184-3.116-.704-1.783-.376-3.493.04-5.659.195-1.019.417-2.172.557-3.492.42-3.971-1.124-6.342-2.914-9.088-1.01-1.55-2.054-3.154-2.791-5.146-.92-2.475-.814-5.165-.712-7.766.144-3.668.269-6.834-2.287-8.929-1.095-.898-2.275-1.038-3.644-1.202-1.34-.16-2.857-.342-4.271-1.37-.534-.388-.932-.784-1.351-1.201-.788-.784-1.604-1.596-3.578-2.587-.858-.435-1.713-.742-2.539-1.039-1.71-.614-3.325-1.195-4.609-2.745-.625-.748-1.157-1.694-1.671-2.61-.563-1.002-1.146-2.04-1.741-2.571-.714-.628-1.356-.622-2.525-.55-1.235.073-2.778.169-4.572-1.027-.956-.643-1.374-1.036-1.778-1.417-.261-.244-.534-.5-.994-.855C69.913 6.675 68 5.848 65.571 5.318a.89.89 0 11.379-1.742c2.697.587 4.844 1.524 6.565 2.866.517.397.826.687 1.122.966.384.361.716.671 1.55 1.231 1.29.861 2.348.795 3.472.73 1.181-.075 2.514-.153 3.816.996.823.731 1.45 1.849 2.114 3.032.474.845.964 1.719 1.486 2.343.976 1.178 2.304 1.655 3.841 2.207.878.315 1.785.641 2.739 1.125 2.228 1.118 3.229 2.114 4.033 2.917.387.382.72.714 1.143 1.022 1.037.755 2.2.895 3.434 1.042 1.437.172 3.064.366 4.562 1.593 3.242 2.657 3.087 6.583 2.938 10.379-.095 2.426-.193 4.935.602 7.076.669 1.805 1.657 3.323 2.614 4.792 1.809 2.776 3.68 5.648 3.193 10.25-.149 1.396-.378 2.587-.58 3.641-.375 1.954-.646 3.366-.133 4.666.492 1.245 2.083 1.609 3.925 2.033 2.465.567 5.534 1.273 6.693 4.612 1.313 3.795-1.3 6.571-3.604 9.022-1.876 1.994-3.495 3.718-2.852 5.582.386 1.139 1.494 2.134 2.564 3.096 1.734 1.559 3.7 3.326 2.462 5.895-.553 1.156-1.627 2.076-2.765 3.053-2.072 1.776-4.029 3.454-3.217 6.559a.892.892 0 01-.862 1.117z"
        />
      </g>
      <g>
        <path
          fill="#CC543D"
          d="M44.103 9.788c-9.322 9.555-4.238 19.006-6.998 26-.764 1.933-2.032 4.178-2.894 6.625 16.791 1.355 10.717-7.919 16.061-13.786 4.579-5.007 12.057-3.449 15.223-8.28.723-1.1.854-2.121.738-3.349-.182-1.918-.973-4.347-1.091-8.407-.094-3.224 1.337-5.232 1.197-8.049-8.726-.045-16.401 3.253-22.236 9.246z"
        />
        <path
          fill="#E05D43"
          d="M43.679 42.248h-.009a.892.892 0 01-.883-.901 26.345 26.345 0 00-.172-3.441c-.068-.563-.148-1.152-.232-1.757-.734-5.344-1.648-11.996 3.782-15.417 1.598-1.006 3.291-1.354 4.927-1.69 2.156-.443 4.018-.825 5.34-2.625.459-.628.845-1.462 1.252-2.348 1.208-2.617 2.71-5.875 7.372-6.323.479-.058.925.311.973.801a.891.891 0 01-.801.973c-3.643.353-4.75 2.755-5.923 5.296-.446.969-.869 1.884-1.435 2.656-1.729 2.354-4.113 2.844-6.419 3.317-1.549.319-3.012.619-4.335 1.454-4.456 2.807-3.664 8.576-2.965 13.665.085.614.166 1.212.236 1.786.139 1.163.199 2.364.185 3.673a.895.895 0 01-.893.881z"
        />
        <path
          fill="#943A32"
          d="M66.233 17.89a.893.893 0 01-.887-.807c-.058-.621-.189-1.32-.34-2.129-.301-1.606-.675-3.605-.755-6.337-.051-1.766.328-3.212.661-4.489.308-1.178.6-2.292.537-3.541a.892.892 0 01.845-.936c.53-.054.911.354.936.846.077 1.523-.264 2.824-.592 4.082-.318 1.217-.646 2.476-.603 3.986.076 2.592.436 4.516.725 6.061.159.852.296 1.587.363 2.287a.894.894 0 01-.89.977z"
        />
      </g>
    </svg>
  ),

  //tablet
  female: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.78,15.461c0,0-1.996,0.842-2.891-0.98c0.62-0.532,1.769-1.178,1.769-1.178S4.583,9.44,6.069,5.917 S9.574,1.609,12,1.609s6.016,0.772,6.772,6.99c-0.057,2.348-0.897,4.592-0.897,4.592l1.56,1.486c0,0-0.896,1.454-2.476,0.783 M12.291,14.854c5.145-0.749,4.098-6.008,3.145-8.28c-1.121,1.683-7.319,3.225-7.319,3.225 C8.341,15.436,12.291,14.854,12.291,14.854z M18.885,21.954v-1.582c0,0-0.141-0.673-0.562-1.233s-3.589-2.468-3.589-2.468 l-2.574,4.188l-2.53-4.188c0,0-2.047,1.374-3.197,2.215s-0.981,1.402-0.981,1.402v1.666 M15.968,21.406h-0.925" />
    </svg>
  ),
  male: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.02,9.575c0,3.185-2.092,5.765-4.672,5.765s-4.672-2.581-4.672-5.765l1.543-2.356h6.219L17.02,9.575z M17.316,9.969c0,0,0.215-3.938,0.277-4.25S17.02,4.594,17.02,4.594c-0.531-1.188-4.051-0.969-5.363-1.125S8.594,1.813,8.594,1.813 S7.375,4.25,7.188,5.375S7.5,9.625,7.5,9.625 M8.938,14.542c0,0-4.542,2.604-5.25,3.417S3.031,20.09,3.031,20.09v1.941 M21.6,22.031 V20.09c0,0,0.052-1.318-0.656-2.131s-5.25-3.417-5.25-3.417 M17.02,20.09h0.96 M12.35,16.765c-0.828,0-1.5,0.671-1.5,1.5 s0.673,1.5,1.5,1.5c0.83,0,1.5-0.671,1.5-1.5S13.18,16.765,12.35,16.765z M10.104,22.031l1.298-2.604 M13.602,19.427l1.32,2.648" />
    </svg>
  ),
  item: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.46,6.94L5.458,3.479 M14.359,6.88V5.946c0-0.477-0.254-0.917-0.666-1.154L9.027,2.125c-0.413-0.239-0.923-0.239-1.333,0L3.027,4.792 C2.612,5.029,2.36,5.47,2.36,5.946v5.335c0,0.475,0.252,0.912,0.667,1.155l4.667,2.666 M2.539,5.254l5.819,3.367l5.823-3.367 M8.358,10.875V8.614 M11.359,8.524V6.88 M19.46,13.94l-6.003-3.462 M22.359,18.281v-5.335c0-0.477-0.254-0.917-0.666-1.154 l-4.666-2.667c-0.413-0.239-0.924-0.239-1.334,0l-4.667,2.667c-0.415,0.237-0.667,0.678-0.667,1.154v5.335 c0,0.475,0.252,0.912,0.667,1.155l4.667,2.666c0.41,0.24,0.921,0.24,1.334,0l4.666-2.666C22.105,19.194,22.359,18.757,22.359,18.281 z M10.538,12.254l5.819,3.367l5.824-3.367 M16.357,15.614v6.721 M19.358,16.284V13.88 M13.359,18v-0.99 M5.36,11.038v-0.99" />
    </svg>
  ),
  inventory: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M18.355,16.921v-5.335c0-0.477-0.254-0.917-0.666-1.154l-4.666-2.667c-0.412-0.239-0.924-0.239-1.334,0
	l-4.667,2.667c-0.415,0.237-0.667,0.678-0.667,1.154v5.335c0,0.476,0.252,0.912,0.667,1.155l4.667,2.666
	c0.41,0.24,0.922,0.24,1.334,0l4.666-2.666C18.102,17.834,18.355,17.396,18.355,16.921z M6.535,10.894l5.818,3.368l5.824-3.368
	 M12.353,14.254v6.721 M4.36,21.945c-1.104,0-2-0.896-2-2v-11l10-7l10,7v11c0,1.104-0.895,2-2,2"
      />
    </svg>
  ),
  warehouse: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.36,9.891l9-7l9,7v11 c0,1.104-0.895,2-2,2h-14c-1.104,0-2-0.896-2-2V9.891z M9.36,22.891v-11h10v11 M9.36,15.945h10" />
    </svg>
  ),
  decimal: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="currentColor">
      <path d="M3.69,18.24a.78.78,0,1,1,.78-.78A.78.78,0,0,1,3.69,18.24Z" />
      <path d="M17.46,19a3.63,3.63,0,0,1-3.62-3.62V8.65a3.63,3.63,0,1,1,7.25,0v6.71A3.63,3.63,0,0,1,17.46,19Zm0-12.48a2.14,2.14,0,0,0-2.14,2.15v6.71a2.15,2.15,0,0,0,4.29,0V8.65A2.15,2.15,0,0,0,17.46,6.5Z" />
      <path d="M8.44,19a3.63,3.63,0,0,1-3.62-3.62V8.65a3.62,3.62,0,1,1,7.24,0v6.71A3.63,3.63,0,0,1,8.44,19Zm0-12.48A2.15,2.15,0,0,0,6.29,8.65v6.71a2.15,2.15,0,0,0,4.3,0V8.65A2.15,2.15,0,0,0,8.44,6.5Z" />
    </svg>
  ),
  building: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.163,3h11.673C19.029,3,20,3.969,20,5.163v13.675C20,20.029,19.029,21,17.836,21H6.163C4.969,21,4,20.029,4,18.838V5.163C4,3.969,4.969,3,6.163,3z M15,20.344V17H9.031v3.344 M8,7h2 M8,11h2 M14,7h2 M14,11h2"></path>
    </svg>
  ),
  switch_off: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,5h8c3.866,0,7,3.134,7,7l0,0c0,3.866-3.134,7-7,7H8c-3.866,0-7-3.134-7-7l0,0C1,8.134,4.134,5,8,5z M6,15 l6-6 M12,15L6,9" />
    </svg>
  ),
  // brand
  // google: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" fill="#3E82F1" d="M23.77 12.273c0-.852-.076-1.67-.217-2.456H12.25v4.641h6.458a5.513 5.513 0 0 1-2.395 3.623v3.012h3.877c2.271-2.091 3.58-5.165 3.58-8.82"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#32A753" d="M12.25 24c3.241 0 5.958-1.074 7.94-2.906l-3.877-3.012c-1.074.721-2.447 1.145-4.063 1.145-3.125 0-5.771-2.111-6.714-4.947h-4.01v3.111A11.998 11.998 0 0 0 12.25 24"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#F9BB00" d="M5.536 14.279a7.213 7.213 0 0 1-.376-2.28c0-.791.136-1.56.376-2.28V6.611h-4.01a12.02 12.02 0 0 0 0 10.78l4.01-3.112z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#E74133" d="M12.25 4.772c1.762 0 3.344.605 4.588 1.794l3.441-3.441C18.199 1.189 15.484 0 12.25 0A11.996 11.996 0 0 0 1.526 6.611L5.535 9.72c.944-2.837 3.59-4.948 6.715-4.948"/></svg>,
  duckduckgo: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle fill="#DE5833" cx="12" cy="12" r="12" />
      <path
        fill="#FFF"
        d="M22.16 7.7c-.56-1.32-1.36-2.5-2.36-3.5-1.02-1.02-2.2-1.8-3.5-2.36-1.36-.58-2.8-.86-4.3-.86-1.48 0-2.94.3-4.3.86-1.32.54-2.5 1.34-3.5 2.36-1.02 1.02-1.8 2.2-2.36 3.5C1.26 9.06.98 10.5.98 12s.3 2.94.86 4.3c.56 1.32 1.36 2.5 2.36 3.5 1.02 1.021 2.2 1.8 3.5 2.36 1.36.58 2.8.859 4.3.859 1.48 0 2.94-.3 4.3-.859 1.3-.561 2.48-1.36 3.5-2.36 1.021-1.02 1.8-2.2 2.36-3.5.58-1.359.859-2.8.859-4.3s-.279-2.94-.859-4.3zM14.4 21.9c-.641-1.08-2.32-4.101-2.32-6.341 0-5.16 3.46-.739 3.46-4.859 0-.98-.48-4.42-3.48-5.14-.74-.98-2.48-1.92-5.24-1.54 0 0 .46.14.98.4 0 0-1 .14-1.04.82 0 0 1.98-.1 3.1.26-2.58.34-3.9 1.7-3.66 4.16.34 3.5 1.82 9.74 2.34 11.92C4.62 20.18 1.8 16.42 1.8 12 1.8 6.38 6.36 1.8 12 1.8S22.2 6.36 22.2 12a10.23 10.23 0 0 1-7.8 9.9z"
      />
      <path
        fill="#FED30A"
        d="M11.44 13.66c0-1.32 1.8-1.74 2.48-1.74 1.84 0 4.44-1.18 5.08-1.16.66.02 1.08.28 1.08.58 0 .44-3.68 2.101-5.1 1.96-1.36-.12-1.681.021-1.681.58 0 .48.98.92 2.061.92 1.62 0 3.199-.72 3.68-.38.42.3-1.1 1.38-2.84 1.38s-4.76-.82-4.76-2.14z"
      />
      <path
        fill="#2D4F8D"
        d="M14.64 8.06c-.48-.62-1.34-.64-1.64.08.46-.36 1.02-.44 1.64-.08zm-5.34.02c-.66-.4-1.76-.44-1.7.82.32-.78.76-.92 1.7-.82zm4.94 1.16c-.36 0-.66.3-.66.66s.3.66.66.66c.359 0 .66-.3.66-.66s-.3-.66-.66-.66zm.24.62a.2.2 0 1 1 0-.4c.119 0 .199.08.199.2-.019.1-.099.2-.199.2zM9.12 9.6a.76.76 0 1 0 0 1.52.76.76 0 0 0 0-1.52zm.28.7c-.12 0-.22-.1-.22-.22s.1-.22.22-.22.22.1.22.22-.1.22-.22.22z"
      />
      <path
        fill="#D5D7D8"
        d="M7.46 6.36c-.96.7-1.4 1.78-1.26 3.3.34 3.5 1.82 9.76 2.34 11.939l.54.181c-.32-1.32-1.86-7.761-2.54-12.7-.18-1.32.34-2.1.92-2.72zm2.38-.86c.08 0 .14-.02.14-.02-1.04-.5-2.68-.52-3.12-.52-.04.08-.08.18-.08.28-.02.02 1.92-.1 3.06.26zM7.96 4.42c-.32-.22-.58-.36-.74-.44-.14.02-.26.02-.4.04 0 0 .46.14.98.4h-.04.2z"
      />
      <path
        fill="#67BD47"
        d="M16.02 17.72c-.34-.08-1.659.86-2.159 1.221a1.108 1.108 0 0 0-.061-.221c-.06-.2-1.34-.08-1.64.24-.8-.38-2.4-1.12-2.42-.66-.06.601 0 3.101.32 3.28.24.14 1.6-.6 2.28-.98h.02c.42.101 1.2 0 1.48-.18.04-.02.061-.06.08-.1.62.239 1.96.72 2.24.62.36-.1.28-3.12-.14-3.22z"
      />
      <path
        fill="#43A347"
        d="M12.36 20.6c-.42-.08-.28-.5-.28-1.479-.1.06-.18.14-.18.22 0 .98-.16 1.42.28 1.48.42.1 1.2 0 1.52-.181.06-.04.08-.1.1-.199-.3.179-1.04.259-1.44.159z"
      />
    </svg>
  ),
  naver: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#03C75A">
      <polygon points="15.927,12.77 7.751,1.066 0.974,1.066 0.974,22.934 8.073,22.934 8.073,11.231 16.249,22.934 23.026,22.934 23.026,1.066 15.927,1.066 " />
    </svg>
  ),
  daum: (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24">
      <image
        id="image0"
        width="24"
        height="24"
        x="0"
        y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAE pElEQVRIx22Vv6tuRxWGn3etmf2dc3LOJRgSwhUsFDuJpVYWphICFhYWSS0IEqIQiwQRxcrSaEoR VBDRSsE/QEjjr1sEsTBiEm6M5IbceE7O9+09M2tZ7P2dK5KBYTZ7w/Ou953Za/S1l966K40LEYgA JUZgaqCBNJD6Oum4X18Wu/x7Le/9/qT++1cPTf+8IwWmTh/nHJZHkQYAX//ydyiucVt0RCIF0sA0 EBtUDdsE0IC0izFu3R5x9rnWH35xxNmvz3evfbOWd/7ROef/R3HaJeSFadyAjLVqU7txsH5bMC3I FkwzaNDaR750mfZFncQ3IF4asQPlAwFjYFojsQ1u1jahfiNktsG1YNa25xmzPaksS3vsB8XvP342 /evFFW2rQNmqM7UNvoKNo4OGb5WbGrJ5EzxgOmB2FGmkxgvnu9funpZ3Xh45HSNacBrOJsTqZIV2 fKv86MC04HYEH7DNhXQgrUGc/4h8/zc7u35zdUBbBXScy82KAjEoNIxG0YLbnmLXa/Ub3GzenO1J WxD1J70/8uT/CCwUlgerGqbGiV2+PvnlXdOQ25ymxaT+aCg/4Trgdr060Yy2yGR7gv75buVTwKtl YsFYKLlQdLgRMgaP+JvfP5/efrnLt/8iAJC1p1qc/NS0PLyKHOEz0gw24+U/zwJfKZ6dokZlprBQ mCnMayT0nXohSiUEloOOc67L356VqydH2p9cG1wrXDaDLZB8BqDUbNRYqDZTcqbqQOGAs1CZvUbH FmPeJXs7Y5d7Luxddtr/ecmzn0M+bVxjWkAzYiHpQHsMoOw2eM2ZEgcqeyoH3Gd2sVDVqZmwPyUf 2vOx0zuc5jUtdxRd/QLl07aBYUHqJA3UL1YH0ZhoTLlQfKHmQs0Zj5mqRqGzqHDaZz559TfKdI+D 7TiJmZQGJMaCaLBWDnQiuwDKFCt8ZwuVFV5zpuSeHUtKYsrO7XiD8/nA1XuPU27dJ5VYjqfcZizX dgIdspEKkn61RjQakxpTdqZcmGKh+npcKyMKnVtxj1O75lAmNOBsn3By9dGu+lXPhmVDOSAHMMgc JOPeGlHvVA0ma+zUmLxRs1GyMVncP+MDqs00qyRBejLSP+t9+lnxIaOvXYAODLAgI0nLP64R9c7O GlN0JnV22anWKdGZbDwn1xe6JisZIUaZcvm4hT6t5lh23NfmacB6p4z1RcYPVwejU8dgssGkQY1B taBaUJwnCnrCU1ganollYCnMQRiWjnxgacgNMjHrf5GNP6wCLZjY4Aqq5SrgiY+kjKSUxAZ4GLhj PpA75gHFsHDkiTLBgYxnclR0jKiywQmKJcXABxQXPlaAu2NRsBIoAiKwTMhAAUpBGMr8rhR/BW33 QQ9qBkVBUVKUuIGb8DDcHAtD7sgLitgqX1uTChCCcOTLjxXxbSjcCNQelAwKiQtcwiXMDQ1H5uAV SsJIGEARCkMODAMvqCzf08n8LUKQBUiOveiiRFCCTQAMw8aaNVbWJhqAGRQjQzC2TfXxiur8PN5e QWz3cTy4k0u0t0q0i5KNMgIDTEImiLKevwCGSDMi9IHc3ja3O1H1S9Phd9sm8GHjv5WeoNEhzFNM AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTEwLTE5VDAxOjI5OjA1KzAwOjAwD9mYwAAAACV0RVh0 ZGF0ZTptb2RpZnkAMjAyMS0xMC0xOVQwMToyOTowNSswMDowMH6EIHwAAAAZdEVYdFNvZnR3YXJl AEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC"
      />
    </svg>
  ),
  yahoo: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#6B0094"
        d="M8.901 3.375C3.854 3.375 0 7.108 0 11.999s3.855 8.625 8.901 8.625 8.901-3.734 8.901-8.625-3.855-8.624-8.901-8.624zm4.941 7.092a624.357 624.357 0 0 1-3.727 3.322l-.064 2.576a71.65 71.65 0 0 1 2.172.086v.787H5.536v-.787c.724-.064 1.448-.105 2.172-.17v-2.407c-1.299-1.575-2.576-3.129-3.854-4.684-.681-.043-1.342-.107-2.022-.149v-.895h6.771c-.042.298-.064.596-.085.895-.619.042-1.236.084-1.853.149.937 1.15 1.874 2.321 2.811 3.471.916-.788 1.832-1.555 2.748-2.343-.702-.022-1.406-.042-2.108-.085v-.874c1.895-.042 3.769-.063 5.664-.085v1.044c-.661.064-1.301.107-1.938.149zM24 4.229l-5.133-.257-.256 12.225c.809.085 1.64.169 2.448.255.98-4.089 1.961-8.157 2.941-12.223zm-5.623 16.375h2.938v-2.448c-1.064-.086-2.128-.171-3.194-.255.085.913.172 1.809.256 2.703z"
      />
    </svg>
  ),
  zum: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#1B52ED"
        d="M20.267 17.381H11.04L21.611 5.667c.948-1.051.864-2.396.864-2.396l-.002-.067a3.3 3.3 0 0 0-.827-2.08l-.009-.012-.006-.005A3.311 3.311 0 0 0 19.149.001L19.127 0H4.273l-.024.001a3.25 3.25 0 0 0-2.937 1.853l-.019.039-.014.03a3.31 3.31 0 0 0-.307 1.393v.035c0 1.546 1.041 2.797 2.461 3.165.009.001.018.004.026.006l.053.012c.247.059.504.084.77.084h7.42c-.319.36-10.072 11.226-10.505 11.707-.565.63-.777 1.377-.777 2.099 0 .033.002.064.004.096a4.765 4.765 0 0 0-.004.17v.004C.42 22.541 1.857 24 3.703 24H20.266c1.847 0 3.313-1.463 3.313-3.31s-1.466-3.309-3.312-3.309"
      />
    </svg>
  ),
  bing: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <linearGradient
        id="BING_1_"
        gradientUnits="userSpaceOnUse"
        x1="139.331"
        y1="-398.543"
        x2="145.442"
        y2="-395.012"
        gradientTransform="translate(-225.93 691.467) scale(1.7087)"
      >
        <stop offset="0" stopColor="#37bdff" />
        <stop offset=".18" stopColor="#33bffd" />
        <stop offset=".36" stopColor="#28c5f5" />
        <stop offset=".53" stopColor="#15d0e9" />
        <stop offset=".55" stopColor="#12d1e7" />
        <stop offset=".59" stopColor="#1cd2e5" />
        <stop offset=".77" stopColor="#42d8dc" />
        <stop offset=".91" stopColor="#59dbd6" />
        <stop offset="1" stopColor="#62dcd4" />
      </linearGradient>
      <path
        fill="url(#BING_1_)"
        d="M22.109 15.385a6.427 6.427 0 0 1-1.722 4.378c.116-.129.221-.269.313-.416a2.756 2.756 0 0 0 .238-.476c.017-.04.031-.082.045-.123a3.24 3.24 0 0 0 .07-.245l.004-.015c.01-.041.018-.083.026-.125a2.704 2.704 0 0 0 .052-.539 2.881 2.881 0 0 0-.885-2.085 2.897 2.897 0 0 0-1.288-.722h-.006l-.053-.018-.748-.257-1.96-.674h-.02l-.123-.044a1.828 1.828 0 0 1-.923-.815l-.713-1.829-.82-2.09-.157-.404-.04-.082a.924.924 0 0 1-.068-.353.721.721 0 0 1 0-.093.912.912 0 0 1 1.265-.748l3.651 1.871.721.368c.381.227.737.493 1.063.794a6.407 6.407 0 0 1 2.078 4.742z"
      />
      <linearGradient
        id="BING_2_"
        gradientUnits="userSpaceOnUse"
        x1="135.696"
        y1="-393.283"
        x2="144.587"
        y2="-393.283"
        gradientTransform="translate(-225.93 691.467) scale(1.7087)"
      >
        <stop offset="0" stopColor="#39d2ff" />
        <stop offset=".15" stopColor="#38cefe" />
        <stop offset=".29" stopColor="#35c3fa" />
        <stop offset=".43" stopColor="#2fb0f3" />
        <stop offset=".55" stopColor="#299aeb" />
        <stop offset=".58" stopColor="#2692ec" />
        <stop offset=".76" stopColor="#1a6cf1" />
        <stop offset=".91" stopColor="#1355f4" />
        <stop offset="1" stopColor="#104cf5" />
      </linearGradient>
      <path
        fill="url(#BING_2_)"
        d="M21.132 17.822c0 .182-.016.362-.049.541l-.03.139a3.284 3.284 0 0 1-.07.245c-.015.042-.028.083-.044.123l-.053.124a2.812 2.812 0 0 1-.499.768c-.532.589-2.339 1.639-3.005 2.064l-1.479.9c-1.083.669-2.107 1.141-3.396 1.173h-.18c-.083 0-.166 0-.248-.005a6.432 6.432 0 0 1-6.14-5.672 2.851 2.851 0 0 0 4.159 2.007l.009-.005.145-.088.589-.347.749-.443v-.021l.097-.057 6.703-3.971.516-.307.051.018h.006a2.88 2.88 0 0 1 1.288.722c.101.095.193.197.276.306a2.89 2.89 0 0 1 .605 1.786z"
      />
      <linearGradient
        id="BING_3_"
        gradientUnits="userSpaceOnUse"
        x1="137.336"
        y1="-392.381"
        x2="137.336"
        y2="-404.272"
        gradientTransform="translate(-225.93 691.467) scale(1.7087)"
      >
        <stop offset="0" stopColor="#1b48ef" />
        <stop offset=".12" stopColor="#1c51f0" />
        <stop offset=".32" stopColor="#1e69f5" />
        <stop offset=".57" stopColor="#2190fb" />
        <stop offset="1" stopColor="#26b8f4" />
      </linearGradient>
      <path
        fill="url(#BING_3_)"
        d="M11.59 4.569v14.783l-.751.439-.589.347-.145.09c-.003 0-.006.002-.009.004a2.852 2.852 0 0 1-4.185-2.194 5.796 5.796 0 0 1-.017-.347V1.058A.955.955 0 0 1 7.381.267l2.916 1.905a2.851 2.851 0 0 1 1.293 2.397z"
      />
    </svg>
  ),
  nate: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#FF2C2E"
        d="M14.271.403H.559A.558.558 0 0 0 0 .961v22.086a.55.55 0 0 0 .551.551h5.727a.55.55 0 0 0 .551-.551V7.093h5.881a4.436 4.436 0 0 1 4.436 4.436v11.518a.55.55 0 0 0 .551.551h5.755a.55.55 0 0 0 .55-.551V10.133C24 4.759 19.644.403 14.271.403"
      />
    </svg>
  ),
  baidu: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#2319DC"
        d="M4.312 12.672c2.624-.576 2.24-3.712 2.176-4.352-.128-1.088-1.344-2.88-3.072-2.752-2.112.192-2.368 3.2-2.368 3.2-.319 1.408.64 4.48 3.264 3.904m4.864-5.248c1.408 0 2.56-1.664 2.56-3.712S10.584 0 9.176 0C7.704 0 6.552 1.664 6.552 3.712s1.152 3.712 2.624 3.712m6.144.256c1.983.256 3.199-1.792 3.456-3.392C19.032 2.752 17.752.96 16.408.64s-3.072 1.856-3.2 3.328c-.192 1.728.192 3.456 2.112 3.712M23 10.304c0-.768-.64-3.008-2.944-3.008s-2.624 2.112-2.624 3.648c0 1.408.128 3.392 3.008 3.328 2.88-.064 2.56-3.264 2.56-3.968m-2.944 6.528s-2.943-2.304-4.735-4.8c-2.305-3.648-5.696-2.176-6.784-.32-1.152 1.856-2.88 3.072-3.136 3.392-.256.257-3.584 2.112-2.816 5.376.704 3.328 3.328 3.265 3.328 3.265s1.92.191 4.16-.32 4.16.128 4.16.128 5.184 1.728 6.655-1.6c1.408-3.393-.832-5.121-.832-5.121"
      />
      <path
        fill="#FFF"
        d="M9.624 13.632v2.176H7.832s-1.856.192-2.496 2.24c-.192 1.344.256 2.176.32 2.304.064.192.64 1.216 2.112 1.473h3.392v-8.192H9.624zm-.064 6.847H8.216s-.96-.063-1.216-1.151c-.192-.448 0-1.024.064-1.28.064-.192.384-.704 1.088-.896H9.56v3.327zM11.992 16v4.352s.063 1.088 1.536 1.473h3.903V16h-1.664v4.352h-1.6s-.512-.063-.64-.448V16h-1.535z"
      />
    </svg>
  ),
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#FE121A"
        d="M22.902 6.503a2.862 2.862 0 0 0-2.012-2.025C19.115 4 12 4 12 4s-7.116 0-8.891.479a2.862 2.862 0 0 0-2.012 2.025C.621 8.29.621 12.017.621 12.017s0 3.726.476 5.513a2.819 2.819 0 0 0 2.012 1.992C4.884 20 12 20 12 20s7.115 0 8.891-.479a2.82 2.82 0 0 0 2.012-1.992c.476-1.787.476-5.513.476-5.513s-.001-3.726-.477-5.513zM9.673 15.399V8.633l5.947 3.383-5.947 3.383z"
      />
    </svg>
  ),
  instgram: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <radialGradient
        id="INSTA_1_"
        cx="10.177"
        cy="-693.161"
        r="11.998"
        gradientTransform="matrix(0 -1.982 -1.8439 0 -1271.744 46.014)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fd5" />
        <stop offset=".1" stopColor="#fd5" />
        <stop offset=".5" stopColor="#ff543e" />
        <stop offset="1" stopColor="#c837ab" />
      </radialGradient>
      <path
        fill="url(#INSTA_1_)"
        d="M12.004.003c-5.01 0-6.475.005-6.76.029C4.216.117 3.577.279 2.88.626a4.804 4.804 0 0 0-1.379 1.009C.739 2.426.278 3.398.111 4.554c-.081.561-.105.675-.11 3.542-.002.956 0 2.213 0 3.899 0 5.005.005 6.47.029 6.753.083 1.001.24 1.631.572 2.318a5.058 5.058 0 0 0 3.276 2.678c.495.127 1.041.197 1.743.23.297.013 3.326.021 6.356.021 3.031 0 6.062-.004 6.352-.018.813-.039 1.283-.102 1.805-.236a5.025 5.025 0 0 0 3.277-2.683c.325-.672.49-1.325.565-2.273.018-.205.024-3.502.024-6.793 0-3.292-.007-6.582-.023-6.789-.076-.964-.24-1.612-.577-2.296A4.743 4.743 0 0 0 22.374 1.5C21.579.742 20.608.28 19.452.113c-.561-.081-.672-.105-3.541-.11h-3.907z"
      />
      <radialGradient
        id="INSTA_2_"
        cx="657.794"
        cy="-389.811"
        r="11.997"
        gradientTransform="matrix(.1739 .8687 3.5818 -.7172 1277.788 -849.271)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#3771c8" />
        <stop offset=".128" stopColor="#3771c8" />
        <stop offset="1" stopColor="#60f" stopOpacity="0" />
      </radialGradient>
      <path
        fill="url(#INSTA_2_)"
        d="M12.004.003c-5.01 0-6.475.005-6.76.029C4.216.117 3.577.279 2.88.626a4.804 4.804 0 0 0-1.379 1.009C.739 2.426.278 3.398.111 4.554c-.081.561-.105.675-.11 3.542-.002.956 0 2.213 0 3.899 0 5.005.005 6.47.029 6.753.083 1.001.24 1.631.572 2.318a5.058 5.058 0 0 0 3.276 2.678c.495.127 1.041.197 1.743.23.297.013 3.326.021 6.356.021 3.031 0 6.062-.004 6.352-.018.813-.039 1.283-.102 1.805-.236a5.025 5.025 0 0 0 3.277-2.683c.325-.672.49-1.325.565-2.273.018-.205.024-3.502.024-6.793 0-3.292-.007-6.582-.023-6.789-.076-.964-.24-1.612-.577-2.296A4.743 4.743 0 0 0 22.374 1.5C21.579.742 20.608.28 19.452.113c-.561-.081-.672-.105-3.541-.11h-3.907z"
      />
      <path
        fill="#FFF"
        d="M11.999 3.141c-2.406 0-2.708.011-3.653.054-.943.043-1.587.192-2.15.412a4.32 4.32 0 0 0-1.57 1.02 4.335 4.335 0 0 0-1.022 1.57c-.22.563-.37 1.208-.412 2.15-.043.945-.054 1.247-.054 3.653 0 2.406.011 2.708.054 3.652.043.943.193 1.588.412 2.15a4.34 4.34 0 0 0 1.022 1.57c.492.492.986.796 1.569 1.022.563.219 1.208.368 2.15.411.945.043 1.247.054 3.653.054 2.407 0 2.708-.011 3.653-.054.943-.043 1.588-.192 2.151-.411a4.346 4.346 0 0 0 1.568-1.022 4.327 4.327 0 0 0 1.022-1.57c.218-.563.367-1.207.412-2.149.042-.945.053-1.247.053-3.653 0-2.406-.011-2.708-.053-3.653-.045-.943-.194-1.587-.412-2.15-.227-.583-.529-1.077-1.022-1.57s-.985-.795-1.569-1.021c-.564-.219-1.209-.369-2.152-.412-.944-.043-1.245-.054-3.652-.054h.002zm-.795 1.596h.795c2.366 0 2.646.009 3.58.051.864.04 1.333.184 1.646.305a2.76 2.76 0 0 1 1.018.663c.311.311.502.605.663 1.019.121.312.266.781.305 1.645.042.934.052 1.215.052 3.579 0 2.365-.01 2.645-.052 3.58-.039.863-.184 1.332-.305 1.645a2.76 2.76 0 0 1-.663 1.018c-.311.31-.604.502-1.018.662-.313.122-.781.266-1.646.306-.935.042-1.214.052-3.58.052s-2.646-.01-3.58-.052c-.864-.04-1.333-.185-1.646-.306a2.76 2.76 0 0 1-1.019-.662 2.755 2.755 0 0 1-.663-1.019c-.121-.313-.265-.783-.304-1.647-.042-.934-.051-1.214-.051-3.58s.008-2.645.051-3.579c.04-.864.184-1.333.305-1.645.161-.414.353-.709.663-1.019s.605-.502 1.018-.663c.313-.122.782-.266 1.646-.305.817-.037 1.134-.048 2.785-.05v.002zm5.525 1.471a1.062 1.062 0 1 0-.001 2.125 1.062 1.062 0 0 0 .001-2.125zm-4.73 1.243a4.55 4.55 0 1 0 0 9.1 4.55 4.55 0 0 0 0-9.1zm0 1.596a2.953 2.953 0 1 1 0 5.906 2.953 2.953 0 0 1 0-5.906z"
      />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#1E9BF0"
        d="M21.533 7.112c.016.213.016.426.016.64 0 6.502-4.949 13.995-13.996 13.995-2.787 0-5.375-.807-7.553-2.208.396.045.777.061 1.188.061a9.849 9.849 0 0 0 6.106-2.102 4.93 4.93 0 0 1-4.599-3.412c.305.046.61.076.93.076.441 0 .883-.061 1.294-.167A4.92 4.92 0 0 1 .975 9.167v-.061a4.958 4.958 0 0 0 2.223.625 4.915 4.915 0 0 1-2.193-4.096c0-.914.244-1.751.67-2.482A13.98 13.98 0 0 0 11.817 8.3a5.555 5.555 0 0 1-.122-1.126 4.917 4.917 0 0 1 4.919-4.919 4.91 4.91 0 0 1 3.594 1.553A9.686 9.686 0 0 0 23.33 2.62a4.906 4.906 0 0 1-2.162 2.711A9.87 9.87 0 0 0 24 4.568a10.587 10.587 0 0 1-2.467 2.544z"
      />
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#1877F1"
        d="m17.584 13.5.668-4.343h-4.168V6.338c0-1.188.582-2.347 2.448-2.347h1.896V.293S16.707 0 15.065 0c-3.433 0-5.676 2.08-5.676 5.846v3.311H5.573V13.5h3.815V24h4.696V13.5h3.5z"
      />
    </svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#FF004F"
        d="M22.365 6.974v3.708c-.199 0-.438.04-.678.04a7.381 7.381 0 0 1-4.743-1.754v7.894c0 1.595-.52 3.109-1.436 4.305a7.112 7.112 0 0 1-5.701 2.872 7.088 7.088 0 0 1-6.021-3.35c1.276 1.195 2.99 1.953 4.864 1.953a6.981 6.981 0 0 0 5.661-2.87c.877-1.195 1.436-2.671 1.436-4.306V7.533c1.274 1.116 2.91 1.754 4.743 1.754.24 0 .439 0 .678-.04V6.855c.36.08.678.119 1.036.119h.161z"
      />
      <path
        fill="#FF004F"
        d="M10.804 9.725v4.107a3.311 3.311 0 0 0-.877-.121c-1.754 0-3.189 1.476-3.189 3.271 0 .398.08.757.199 1.116-.797-.599-1.355-1.555-1.355-2.632 0-1.793 1.436-3.269 3.189-3.269.32 0 .598.04.877.119v-2.63h.239c.319 0 .638 0 .917.039zM17.541 4.024c-.718-.638-1.235-1.515-1.515-2.432h.957v.558c.08.639.28 1.276.558 1.874z"
      />
      <path d="M21.209 6.895v2.392c-.2.04-.438.04-.677.04a7.39 7.39 0 0 1-4.744-1.754v7.894c0 1.595-.52 3.11-1.436 4.306-1.316 1.755-3.349 2.87-5.661 2.87-1.874 0-3.588-.758-4.864-1.953a7.232 7.232 0 0 1-1.077-3.788c0-3.867 3.07-7.016 6.897-7.135v2.631a3.31 3.31 0 0 0-.877-.12c-1.754 0-3.189 1.475-3.189 3.27 0 1.075.519 2.071 1.355 2.63.438 1.236 1.635 2.153 2.99 2.153 1.754 0 3.189-1.475 3.189-3.27V1.592h2.91a5.157 5.157 0 0 0 1.515 2.432 5.472 5.472 0 0 0 3.669 2.871z" />
      <path
        fill="#00F7EF"
        d="M9.648 8.33v1.355c-3.827.119-6.897 3.269-6.897 7.136 0 1.396.398 2.671 1.077 3.787a7.215 7.215 0 0 1-2.193-5.222c0-3.947 3.19-7.136 7.096-7.136.319 0 .638.04.917.08z"
      />
      <path
        fill="#00F7EF"
        d="M16.026 1.592h-2.91v15.389c0 1.793-1.435 3.269-3.189 3.269-1.396 0-2.552-.877-2.99-2.152.519.358 1.157.598 1.834.598 1.754 0 3.19-1.435 3.19-3.229V.038h3.865v.08c0 .159 0 .318.041.478 0 .319.08.677.159.996zM21.209 5.419v1.436c-1.595-.319-2.95-1.395-3.707-2.831a5.17 5.17 0 0 0 3.707 1.395z"
      />
    </svg>
  ),
  pinterest: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#B32025"
        d="M12.1 0a12 12 0 0 0-4.328 23.213c-.099-.983-.197-2.36 0-3.442l1.376-6A4.346 4.346 0 0 1 8.755 12c0-1.672.984-2.951 2.164-2.951 1.181 0 1.475.787 1.475 1.672 0 .885-.688 2.558-.982 4.032-.295 1.477.59 2.164 1.771 2.164 1.18 0 3.738-2.262 3.738-5.508s-2.066-4.918-5.017-4.918c-2.952 0-5.312 2.656-5.312 5.312 0 .984.393 2.164.885 2.754a.395.395 0 0 1 .098.295L7.28 16.23c-.098.195-.196.295-.394.195-1.476-.688-2.459-2.852-2.459-4.622 0-3.738 2.754-7.278 7.966-7.278 5.214 0 7.378 2.951 7.378 6.885 0 3.935-2.655 7.475-6.196 7.475-1.182 0-2.361-.59-2.755-1.376l-.786 2.853c-.295 1.082-.984 2.36-1.476 3.147A12 12 0 1 0 12.1 0"
      />
    </svg>
  ),
  google_plus: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#DD4B39"
        d="M23.744 13.323h-1.881v2.136H19.218v-2.136h-2.136v-2.646h2.136V8.542H21.863v2.135h2.136v2.646zM7.728 19.729a7.703 7.703 0 0 1-5.479-2.25A7.702 7.702 0 0 1-.001 12c0-2.153.856-4.085 2.25-5.479a7.704 7.704 0 0 1 5.479-2.25c1.029 0 1.979.187 2.839.534a7.077 7.077 0 0 1 2.36 1.569l.186.185-.19.18-2.029 1.922-.181.171-.175-.175a3.676 3.676 0 0 0-1.255-.82 4.21 4.21 0 0 0-1.554-.28 4.26 4.26 0 0 0-3.06 1.296A4.496 4.496 0 0 0 3.393 12c0 1.22.485 2.338 1.276 3.146a4.259 4.259 0 0 0 3.06 1.296c1.15 0 1.996-.329 2.607-.788a3.827 3.827 0 0 0 1.335-1.904H7.473v-3.074h7.5l.049.194c.114.459.114.791.114 1.343 0 2.204-.747 4.081-2.049 5.41-1.301 1.331-3.152 2.106-5.359 2.106z"
      />
    </svg>
  ),
  reddit: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle fill="#FF4500" cx="12" cy="12" r="12" />
      <path
        fill="#FFF"
        d="M20 12c0-.968-.786-1.754-1.755-1.754-.477 0-.897.182-1.206.491-1.193-.856-2.85-1.418-4.674-1.488l.8-3.748 2.597.547a1.25 1.25 0 1 0 1.249-1.305c-.491 0-.912.281-1.109.702l-2.905-.618a.349.349 0 0 0-.238.042.34.34 0 0 0-.14.196l-.884 4.183c-1.867.056-3.537.604-4.744 1.488a1.77 1.77 0 0 0-1.207-.491c-.968 0-1.754.786-1.754 1.754 0 .716.421 1.319 1.039 1.6a3.298 3.298 0 0 0-.042.533c0 2.695 3.13 4.871 7.004 4.871 3.873 0 7.003-2.176 7.003-4.871 0-.182-.014-.352-.042-.52A1.815 1.815 0 0 0 20 12zM8 13.248C8 12.561 8.562 12 9.249 12c.688 0 1.249.562 1.249 1.249 0 .689-.561 1.25-1.249 1.25A1.253 1.253 0 0 1 8 13.248zm6.976 3.299c-.856.855-2.484.912-2.961.912-.478 0-2.12-.07-2.961-.912a.33.33 0 0 1 0-.463.329.329 0 0 1 .463 0c.534.533 1.685.73 2.513.73.827 0 1.965-.197 2.512-.73a.33.33 0 0 1 .464 0 .364.364 0 0 1-.03.463zm-.225-2.049a1.252 1.252 0 0 1-1.249-1.25c0-.687.562-1.249 1.249-1.249S16 12.561 16 13.248c0 .69-.562 1.25-1.249 1.25z"
      />
    </svg>
  ),
  vimeo: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#32B8E8"
        d="M23.988 6.412c-.106 2.341-1.738 5.546-4.895 9.614-3.263 4.249-6.023 6.374-8.282 6.374-1.398 0-2.583-1.294-3.55-3.882l-1.937-7.117C4.606 8.814 3.836 7.52 3.013 7.52c-.18 0-.808.378-1.884 1.133L0 7.195a305.481 305.481 0 0 0 3.502-3.129c1.58-1.368 2.766-2.087 3.556-2.16 1.868-.18 3.018 1.1 3.449 3.838.466 2.955.789 4.792.97 5.512.539 2.451 1.131 3.675 1.778 3.675.502 0 1.257-.795 2.263-2.385 1.005-1.59 1.544-2.8 1.616-3.631.144-1.373-.396-2.06-1.616-2.06-.574 0-1.167.132-1.776.394 1.18-3.871 3.434-5.751 6.76-5.644 2.466.072 3.629 1.674 3.486 4.807"
      />
    </svg>
  ),
  blogger: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#F06A35"
        d="M2.743 23.885a3.768 3.768 0 0 1-1.194-.536c-.302-.205-.743-.63-.911-.877a4.571 4.571 0 0 1-.536-1.176c-.098-.365-.1-.511-.101-9.277-.002-8.723 0-8.915.096-9.29A3.615 3.615 0 0 1 2.842.094c.39-.087 17.792-.102 18.211-.016a3.582 3.582 0 0 1 2.55 1.947c.411.82.374-.083.393 9.656.013 6.196.001 8.798-.038 9.122-.186 1.517-1.231 2.693-2.737 3.077-.385.099-.519.1-9.261.098-8.454-.002-8.888-.006-9.217-.093z"
      />
      <path
        fill="#FFF"
        d="M15.396 19.384c1.078-.146 1.923-.579 2.716-1.389.573-.586.932-1.22 1.166-2.062.098-.35.105-.52.124-2.572.014-1.549.002-2.275-.038-2.458-.059-.266-.225-.512-.413-.615-.059-.032-.432-.072-.829-.09-.666-.029-.74-.042-.951-.166-.333-.196-.425-.407-.426-.979-.002-1.095-.457-2.111-1.357-3.029-.642-.654-1.357-1.096-2.174-1.344-.195-.06-.633-.08-2.099-.097-2.3-.027-2.811.02-3.594.332-1.444.576-2.481 1.788-2.86 3.342-.071.292-.084.76-.102 3.446-.021 3.366.002 3.86.212 4.527.174.551.349.889.71 1.368.688.913 1.719 1.573 2.75 1.759.492.089 6.545.112 7.165.027z"
      />
      <path
        fill="#F06A35"
        d="M9.034 10.144c-.551-.152-.757-.943-.352-1.352.259-.261.331-.271 1.951-.271 1.455 0 1.504.003 1.718.111.309.156.443.376.443.726 0 .316-.126.538-.407.716-.151.096-.241.102-1.667.11-.88.005-1.581-.012-1.686-.04zM8.965 15.466a.93.93 0 0 1-.495-.644.936.936 0 0 1 .271-.743c.235-.213.338-.22 3.227-.222 2.971-.003 2.956-.004 3.238.26.398.371.314 1.033-.165 1.305l-.493.08-2.569.03c-2.257.027-2.896-.015-3.014-.066z"
      />
    </svg>
  ),
  flickr: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#0059D4"
        d="M10.533 12c0 3.16-2.357 5.722-5.267 5.722C2.359 17.722 0 15.16 0 12s2.357-5.722 5.266-5.722S10.533 8.84 10.533 12z"
      />
      <path
        fill="#DA1593"
        d="M24 11.925c0 3.118-2.424 5.646-5.416 5.646s-5.418-2.527-5.418-5.646 2.426-5.646 5.418-5.646S24 8.807 24 11.925z"
      />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#007BB5"
        d="M23.859 21.602A2.394 2.394 0 0 1 21.468 24H2.532A2.395 2.395 0 0 1 .14 21.602V2.4A2.397 2.397 0 0 1 2.532 0h18.937a2.395 2.395 0 0 1 2.391 2.399v19.203z"
      />
      <path
        fill="#FFF"
        d="M7.856 5.869c0 .882-.651 1.596-1.722 1.596-1.008 0-1.658-.714-1.658-1.596 0-.902.672-1.595 1.7-1.595s1.659.692 1.68 1.595M4.561 8.724h3.19V18.99h-3.19V8.724zM9.661 12c0-1.281-.042-2.352-.083-3.275h2.771l.147 1.428h.063c.42-.672 1.448-1.659 3.17-1.659 2.1 0 3.674 1.407 3.674 4.43v6.067h-3.19v-5.689c0-1.323-.463-2.225-1.617-2.225-.882 0-1.406.608-1.637 1.196-.085.21-.105.504-.105.798v5.92H9.661V12z"
      />
    </svg>
  ),
  kakao_story: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#FFC10E"
        d="M23.999 22.078c0 1.061-.86 1.922-1.921 1.922H1.922A1.923 1.923 0 0 1 0 22.078V1.922C0 .862.862 0 1.922 0h20.156c1.061 0 1.921.862 1.921 1.922v20.156zM15.116 5.42H8.752a.771.771 0 0 0-.773.77v6.312a.77.77 0 0 0 .773.769h2.935c-.02.751-.334 1.567-.789 2.293-.511.815-1.6 1.719-1.61 1.727a.423.423 0 0 0-.149.31c-.001.101.051.178.109.26l2.046 2.295s.099.104.182.124c.092.021.197.024.27-.031 3.543-2.725 4.055-6.142 4.144-7.991l.001-6.067a.772.772 0 0 0-.775-.771"
      />
    </svg>
  ),
  naver_band: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="#00C300"
        d="M12 5.058c-.805 0-1.586.101-2.332.29V3.552a.571.571 0 0 0-.014-.122C9.506 1.459 7.971 0 6.099 0 4.226 0 2.69 1.459 2.542 3.43c-.008.041-.013 6.74-.013 6.74v4.359l.001.091A9.471 9.471 0 1 0 12 5.058m0 17.487a8.017 8.017 0 0 1-8.017-8.016V3.622c0-1.179.947-2.134 2.115-2.134 1.167 0 2.114.955 2.114 2.134l-.003 10.812c0 2.097 1.694 3.892 3.791 3.892s3.796-1.699 3.796-3.796-1.699-3.798-3.796-3.798c-.88 0-1.688.301-2.332.803V9.91a5.174 5.174 0 1 1-2.842 4.619V3.552c0-.355-.326-.693-.728-.693-.402 0-.728.338-.728.693V14.53a6.63 6.63 0 0 0 6.629 6.629A6.63 6.63 0 1 0 9.668 8.323V6.858A8.016 8.016 0 1 1 12 22.545m-2.332-8.016a2.333 2.333 0 1 1 4.666 0 2.333 2.333 0 0 1-4.666 0"
      />
    </svg>
  ),
  // marketing
  publish: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18,15.094V8l-6-6H4 C2.896,2,2,2.896,2,4v16c0,1.104,0.896,2,2,2h6 M12,2v6h6 M14,13H6 M9,17H6 M8,9H7H6 M22,16l-6,6l-2.896-2.896" />
    </svg>
  ),
  temp1: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#E7E6E8" d="M0 0h150v150H0z" />
      <path fill="#FFF" d="M15 10h120v140H15z" />
      <path fill="#D6D6D6" d="M97.5 42a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V25a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 28.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V29.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#D6D6D6" d="M120 101a2 2 0 0 1-2 2H33a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h85a2 2 0 0 1 2 2v17z" />
      <path
        fill="#E7E6E8"
        d="M120.5 55h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 68H30.5v2H70v-2zm50.5 43h-90v2h90v-2zm0 5h-90v2h90v-2zm0 5h-90v2h90v-2zM70 126H30.5v2H70v-2z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.224 87.389h7.775c.614 0 1.112.498 1.112 1.112v7.775c0 .614-.498 1.112-1.112 1.112h-7.775a1.112 1.112 0 0 1-1.112-1.112v-7.775a1.11 1.11 0 0 1 1.112-1.112zm1.943 2.224a.832.832 0 1 1 0 1.664.832.832 0 0 1 0-1.664zm6.944 4.444-2.775-2.78-6.112 6.112"
      />
    </svg>
  ),
  temp2: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#E7E6E8" d="M0 0h150v150H0z" />
      <path fill="#FFF" d="M15 10h120v140H15z" />
      <path fill="#D6D6D6" d="M97.5 42a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V25a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 28.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V29.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#E7E6E8" d="M120.5 55h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 68H30.5v2H70v-2z" />
      <path fill="#D6D6D6" d="M71 106a2 2 0 0 1-2 2H33a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M47.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path fill="#D6D6D6" d="M119.5 106a2 2 0 0 1-2 2h-36a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z" />
      <path
        fill="#E7E6E8"
        d="M71 117H30.5v-2H71v2zm0 3H30.5v2H71v-2zm-21 10H30.5v2H50v-2zm21-5H30.5v2H71v-2zM119.5 117H79v-2h40.5v2zm0 3H79v2h40.5v-2zm0 5H79v2h40.5v-2zm-21 5H79v2h19.5v-2z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M96.111 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777A1.11 1.11 0 0 1 95 98.389v-7.777c0-.614.498-1.112 1.111-1.112zm1.944 2.223a.833.833 0 1 1 .002 1.666.833.833 0 0 1-.002-1.666zM105 96.166l-2.777-2.777-6.112 6.111"
      />
    </svg>
  ),
  temp3: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#E7E6E8" d="M0 0h150v150H0z" />
      <path fill="#FFF" d="M15 10h120v140H15z" />
      <path fill="#D6D6D6" d="M97.5 42a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V25a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 28.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V29.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path
        fill="#E7E6E8"
        d="M120.5 55h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 68H30.5v2H70v-2zM120.5 117h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 130H30.5v2H70v-2z"
      />
      <path fill="#D6D6D6" d="M71 106a2 2 0 0 1-2 2H33a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M47.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path fill="#D6D6D6" d="M119.5 106a2 2 0 0 1-2 2h-36a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M96.111 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777A1.11 1.11 0 0 1 95 98.389v-7.777c0-.614.498-1.112 1.111-1.112zm1.944 2.223a.833.833 0 1 1 .002 1.666.833.833 0 0 1-.002-1.666zM105 96.166l-2.777-2.777-6.112 6.111"
      />
    </svg>
  ),
  temp4: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#E7E6E8" d="M0 0h150v150H0z" />
      <path fill="#FFF" d="M13.75 10h120v140h-120z" />
      <path fill="#D6D6D6" d="M97.5 42a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V25a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 28.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V29.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path
        fill="#E7E6E8"
        d="M120.5 55h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 68H30.5v2H70v-2zM56 117H30.5v-2H56v2zm0 3H30.5v2H56v-2zm0 5H30.5v2H56v-2zm-12 5H30.5v2H44v-2zM87.5 117H62v-2h25.5v2zm0 3H62v2h25.5v-2zm0 5H62v2h25.5v-2zm-12 5H62v2h13.5v-2zM120.5 117H95v-2h25.5v2zm0 3H95v2h25.5v-2zm0 5H95v2h25.5v-2zm-12 5H95v2h13.5v-2z"
      />
      <path
        fill="#D6D6D6"
        d="M56 106c0 1.104-1.019 2-2.273 2H33.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M39.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M87 106c0 1.104-1.019 2-2.273 2H64.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M70.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M120 106c0 1.104-1.019 2-2.273 2H97.273c-1.255 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.453c1.255 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M103.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.111 6.111"
      />
    </svg>
  ),
  temp5: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#E7E6E8" d="M0 0h150v150H0z" />
      <path fill="#FFF" d="M13.75 10h120v140h-120z" />
      <path fill="#D6D6D6" d="M97.5 42a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V25a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 28.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V29.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path
        fill="#E7E6E8"
        d="M120.5 55h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 68H30.5v2H70v-2zM120.5 117h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 130H30.5v2H70v-2z"
      />
      <path
        fill="#D6D6D6"
        d="M56 106c0 1.104-1.019 2-2.273 2H33.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M39.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M87 106c0 1.104-1.019 2-2.273 2H64.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M70.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M120 106c0 1.104-1.019 2-2.273 2H97.273c-1.255 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.453c1.255 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M103.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.111 6.111"
      />
    </svg>
  ),
  temp_full1: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#FFF" d="M.5.5h149v149H.5z" />
      <path fill="#E7E6E8" d="M149 1v148H1V1h148m1-1H0v150h150V0z" />
      <path fill="#D6D6D6" d="M97.5 32a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 18.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V19.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#D6D6D6" d="M120 101a2 2 0 0 1-2 2H33a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h85a2 2 0 0 1 2 2v17z" />
      <path fill="#F2F2F2" d="M0 44h150v30H0z" />
      <path fill="#D6D6D6" d="M120.5 52h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 65H30.5v2H70v-2z" />
      <path fill="#E7E6E8" d="M120.5 111h-90v2h90v-2zm0 5h-90v2h90v-2zm0 5h-90v2h90v-2zM70 126H30.5v2H70v-2z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.224 87.389h7.775c.614 0 1.112.498 1.112 1.112v7.775c0 .614-.498 1.112-1.112 1.112h-7.775a1.112 1.112 0 0 1-1.112-1.112v-7.775a1.11 1.11 0 0 1 1.112-1.112zm1.943 2.224a.832.832 0 1 1 0 1.664.832.832 0 0 1 0-1.664zm6.944 4.444-2.775-2.78-6.112 6.112"
      />
    </svg>
  ),
  temp_full2: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#FFF" d="M.5.5h149v149H.5z" />
      <path fill="#E7E6E8" d="M149 1v148H1V1h148m1-1H0v150h150V0z" />
      <path fill="#D6D6D6" d="M97.5 32a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 18.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V19.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#F2F2F2" d="M0 44h150v30H0z" />
      <path
        fill="#D6D6D6"
        d="M120.5 52h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 65H30.5v2H70v-2zM71 106a2 2 0 0 1-2 2H33a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M47.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.111 3.055a.834.834 0 1 0 1.668 0 .834.834 0 0 0-1.668 0zm7.778 3.611-2.777-2.777-6.112 6.111"
      />
      <path fill="#D6D6D6" d="M119.5 106a2 2 0 0 1-2 2h-36a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z" />
      <path
        fill="#E7E6E8"
        d="M71 117H30.5v-2H71v2zm0 3H30.5v2H71v-2zm-21 10H30.5v2H50v-2zm21-5H30.5v2H71v-2zM119.5 117H79v-2h40.5v2zm0 3H79v2h40.5v-2zm0 5H79v2h40.5v-2zm-21 5H79v2h19.5v-2z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M96.111 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777A1.11 1.11 0 0 1 95 98.389v-7.777c0-.614.498-1.112 1.111-1.112zm1.112 3.055a.833.833 0 1 0 1.666.002.833.833 0 0 0-1.666-.002zM105 96.166l-2.777-2.777-6.112 6.111"
      />
    </svg>
  ),
  temp_full3: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#FFF" d="M.5.5h149v149H.5z" />
      <path fill="#E7E6E8" d="M149 1v148H1V1h148m1-1H0v150h150V0z" />
      <path fill="#D6D6D6" d="M97.5 32a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 18.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V19.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#F2F2F2" d="M0 44h150v30H0z" />
      <path
        fill="#D6D6D6"
        d="M120.5 52h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 65H30.5v2H70v-2zM71 106a2 2 0 0 1-2 2H33a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M47.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.111 3.055a.834.834 0 1 0 1.668 0 .834.834 0 0 0-1.668 0zm7.778 3.611-2.777-2.777-6.112 6.111"
      />
      <path fill="#D6D6D6" d="M119.5 106a2 2 0 0 1-2 2h-36a2 2 0 0 1-2-2V84a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v22z" />
      <path fill="#E7E6E8" d="M119 117H30.5v-2H119v2zm0 3H30.5v2H119v-2zm-49 10H30.5v2H70v-2zm49-5H30.5v2H119v-2z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M96.111 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777A1.11 1.11 0 0 1 95 98.389v-7.777c0-.614.498-1.112 1.111-1.112zm1.112 3.055a.833.833 0 1 0 1.666.002.833.833 0 0 0-1.666-.002zM105 96.166l-2.777-2.777-6.112 6.111"
      />
    </svg>
  ),
  temp_full4: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#FFF" d="M.5.5h149v149H.5z" />
      <path fill="#E7E6E8" d="M149 1v148H1V1h148m1-1H0v150h150V0z" />
      <path fill="#D6D6D6" d="M97.5 32a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 18.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V19.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#F2F2F2" d="M0 44h150v30H0z" />
      <path fill="#D6D6D6" d="M120.5 52h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 65H30.5v2H70v-2z" />
      <path
        fill="#E7E6E8"
        d="M61 117H35.5v-2H61v2zm0 3H35.5v2H61v-2zm0 5H35.5v2H61v-2zm-12 5H35.5v2H49v-2zM92.5 117H67v-2h25.5v2zm0 3H67v2h25.5v-2zm0 5H67v2h25.5v-2zm-12 5H67v2h13.5v-2zM125.5 117H100v-2h25.5v2zm0 3H100v2h25.5v-2zm0 5H100v2h25.5v-2zm-12 5H100v2h13.5v-2z"
      />
      <path
        fill="#D6D6D6"
        d="M61 106c0 1.104-1.019 2-2.273 2H38.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M44.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M92 106c0 1.104-1.019 2-2.273 2H69.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M75.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M125 106c0 1.104-1.019 2-2.273 2h-20.453c-1.255 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.453c1.255 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M108.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.111 6.111"
      />
    </svg>
  ),
  temp_full5: (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <path fill="#FFF" d="M.5.5h149v149H.5z" />
      <path fill="#E7E6E8" d="M149 1v148H1V1h148m1-1H0v150h150V0z" />
      <path fill="#D6D6D6" d="M97.5 32a2 2 0 0 1-2 2h-41a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h41a2 2 0 0 1 2 2v17z" />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M71.223 18.389H79c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111V19.5a1.11 1.11 0 0 1 1.111-1.111zm1.944 2.221a.834.834 0 1 1-.002 1.668.834.834 0 0 1 .002-1.668zm6.944 4.445-2.777-2.777-6.111 6.111"
      />
      <path fill="#F2F2F2" d="M0 44h150v30H0z" />
      <path fill="#D6D6D6" d="M120.5 52h-90v-2h90v2zm0 3h-90v2h90v-2zm0 5h-90v2h90v-2zM70 65H30.5v2H70v-2z" />
      <path fill="#E7E6E8" d="M125 117H35.5v-2H125v2zm0 3H35.5v2H125v-2zm0 5H35.5v2H125v-2zm-55 5H35.5v2H70v-2z" />
      <path
        fill="#D6D6D6"
        d="M61 106c0 1.104-1.019 2-2.273 2H38.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M44.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M92 106c0 1.104-1.019 2-2.273 2H69.273c-1.254 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.454c1.254 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M75.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.112 6.111"
      />
      <path
        fill="#D6D6D6"
        d="M125 106c0 1.104-1.019 2-2.273 2h-20.453c-1.255 0-2.273-.896-2.273-2V84c0-1.104 1.019-2 2.273-2h20.453c1.255 0 2.273.896 2.273 2v22z"
      />
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M108.611 89.5h7.777c.613 0 1.111.498 1.111 1.111v7.777c0 .613-.498 1.111-1.111 1.111h-7.777a1.112 1.112 0 0 1-1.111-1.111v-7.777c0-.613.498-1.111 1.111-1.111zm1.945 2.223a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666zm6.944 4.443-2.777-2.777-6.111 6.111"
      />
    </svg>
  ),
  submit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19,20.063L23,16l-4-4 M23,16h-8 M17,8l-6-6H3C1.896,2,1,2.896,1,4v16c0,1.104,0.896,2,2,2h12 M11,2v6h6 M11,13H5 M11,17H5 M7,9H6H5" />
    </svg>
  ),
  send_test: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 1-5 4.92m-8.609 4.92L1 8l20-7-2.143 6.121M16 14.091a1.909 1.909 0 1 1 0 3.818 1.909 1.909 0 0 1 0-3.818zm4.709 3.818c-.174.393-.09.852.211 1.158l.038.038a1.275 1.275 0 0 1 0 1.801h0a1.273 1.273 0 0 1-1.801.001l-.001-.001-.038-.038a1.049 1.049 0 0 0-1.158-.21 1.048 1.048 0 0 0-.636.961v.108a1.273 1.273 0 0 1-2.545 0v-.057a1.047 1.047 0 0 0-.688-.961 1.047 1.047 0 0 0-1.158.211l-.038.038a1.274 1.274 0 0 1-1.8 0h0a1.274 1.274 0 0 1-.001-1.801l.001-.001.038-.038c.3-.307.384-.766.21-1.158a1.05 1.05 0 0 0-.961-.636h-.108a1.273 1.273 0 0 1-.002-2.545h.058a1.05 1.05 0 0 0 .961-.688 1.05 1.05 0 0 0-.21-1.158l-.038-.038a1.272 1.272 0 0 1-.001-1.8h.001a1.273 1.273 0 0 1 1.801 0l.038.038c.307.3.766.384 1.158.21h.051a1.05 1.05 0 0 0 .637-.961v-.108a1.272 1.272 0 1 1 2.544-.002v.058c.001.418.253.796.637.961.393.173.852.09 1.158-.21l.038-.038a1.273 1.273 0 0 1 1.801-.001v.001c.498.497.498 1.303.001 1.8l-.001.001-.038.038a1.049 1.049 0 0 0-.21 1.158v.051c.165.385.542.636.961.637h.108a1.272 1.272 0 1 1 .001 2.544h-.058a1.05 1.05 0 0 0-.961.637z" />
    </svg>
  ),
  revenue: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.5 1v12M9 11h5a2 2 0 0 0 0-4h-3a2 2 0 0 1 0-4h4m-5 16h4.5a1.5 1.5 0 0 0 1.5-1.5h0a1.5 1.5 0 0 0-1.5-1.5H7s-1.484.016-3.016 1.016m.016 6h12.781l5.696-4.32a1.5 1.5 0 0 0 .292-2.101h0a1.502 1.502 0 0 0-2.103-.291L16.984 19H14.5M4 15.996H1v7.02h3v-7.02z" />
    </svg>
  ),
  click: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19.971 23-3.884-4.258-2.38 3.367-1.103-10.505 10.197 2.675-3.685 1.853L23 20.391 19.971 23zM1 9h3m7-5V1M6.121 5.061 4 2.939m12.884 9.519a4.5 4.5 0 1 0-4.5 4.499" />
    </svg>
  ),
  discuss: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      &gt;
      <path d="M6.164 16.007a7.02 7.02 0 0 1-1.215-.479l-3.79.597.597-3.79A7.037 7.037 0 0 1 1 9.142a7.142 7.142 0 0 1 3.949-6.386A7.04 7.04 0 0 1 8.142 2h.42a7.124 7.124 0 0 1 5.505 3.113m-4.231 10a6.565 6.565 0 0 1 6.195-6.195h.388a6.487 6.487 0 0 1 2.941.696A6.589 6.589 0 0 1 23 15.501a6.5 6.5 0 0 1-.697 2.941l.472 3.414-3.414-.472c-.911.461-1.921.7-2.941.697a6.585 6.585 0 0 1-5.886-3.64 6.49 6.49 0 0 1-.696-2.941v-.387z" />
    </svg>
  ),
  dicision_maker: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M16,21v-2c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4v2 M8.5,3c2.209,0,4,1.791,4,4s-1.791,4-4,4s-4-1.791-4-4
	S6.291,3,8.5,3z M17,4.959l2,2l4-4 M18,11l5,5 M23,11l-5,5"
      />
    </svg>
  ),
  buying_role: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M16,21v-2c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4v2 M8.5,3c2.209,0,4,1.791,4,4s-1.791,4-4,4s-4-1.791-4-4
	S6.291,3,8.5,3z M19.875,14.457V3 M22.479,5.083h-3.906c-1.007,0-1.823,0.816-1.823,1.823c0,1.006,0.816,1.823,1.823,1.823h2.604
	c1.008,0,1.823,0.815,1.823,1.823s-0.815,1.823-1.823,1.823H16.75"
      />
    </svg>
  ),

  // marketing design toolbox
  column1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,20H2V4h20V20z" />
    </svg>
  ),
  column2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10,20H2V4h8V20z M22,4h-8v16h8V4z" />
    </svg>
  ),
  column2_2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,20H2V4h6V20z M22,4H12v16h10V4z" />
    </svg>
  ),
  column2_3: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16,4h6v16h-6V4z M2,20h10V4 H2V20z" />
    </svg>
  ),
  column3: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6,20H2V4h4V20z M14,4h-4v16h4V4z M22,4h-4v16h4V4z" />
    </svg>
  ),
  divider: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  heading: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,20h6 M3,4h6 M6,4v16 M15,20h6 M15,4h6 M18,4v16 M6,12h12" />
    </svg>
  ),
  cta: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M15.5 10h0a1.5 1.5 0 0 1 1.5 1.5v2.502M19.5 14v-1.5A1.5 1.5 0 0 0 18 11h0M14.172 14V8.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v7.625l-1.381-1.197c-.459-.689-1.922-.9-2.384-.389s-.572 1.363-.112 2.053c0 0 1.878 1.405 3.086 3.408s2.955 1.997 2.955 1.997H19s3-.075 3-4.943V14.5a1.5 1.5 0 0 0-1.5-1.5h0M22 9V2H2v9h5" />
    </svg>
  ),
  personalize_code: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M7 22c-2 0-3-2-3-3v-4c0-1.656-.343-3-2-3 2 0 2-3 2-3V5a3 3 0 0 1 3-3m10 0c2 0 3 2 3 3v4c0 1.656.344 3 2 3-2 0-2 3-2 3v4c0 1.656-1.344 3-3 3M8 12h0m4 0h0m4 0h0" />
    </svg>
  ),
  form: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M16 4a2 2 0 0 0-2-2H8L2 8v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2M2 8h6V2m3 15H6m3-4H6m12.396-6.671c1.104-1.104 2.563-.453 3 0s1.104 1.896 0 3L15.725 15.5l-4.5 1.5 1.5-4.5 5.671-6.171z" />
    </svg>
  ),
  event: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm11-2v4M8 2v4m4 3.01 1.468 2.962 3.282.478-2.375 2.305.561 3.255L12 16.472 9.064 18.01l.561-3.255L7.25 12.45l3.282-.478L12 9.01z" />
    </svg>
  ),
  // survey: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 3h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m1-1h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-1.998 9 .923 1L11 9m3 8h3m-3-6h3m-9.667 4h2.335c.184 0 .332.149.332.334v2.332a.332.332 0 0 1-.333.334H7.333A.332.332 0 0 1 7 17.666v-2.332c0-.185.148-.334.333-.334z"/></svg>,
  button: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 6h6M7 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  option_set: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5,3h14c1.104,0,2,0.896,2,2 v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M17,14H7 M17,17H7 M17,7H7v3h10V7z" />
    </svg>
  ),
  social_share: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M12 22C6.477 22 2 17.522 2 12 2 6.477 6.477 2 12 2c5.522 0 10 4.477 10 10a9.968 9.968 0 0 1-1.742 5.644l-.001-.001L22 22H12zm.996-13.482c0 .801.672 1.449 1.5 1.449s1.5-.648 1.5-1.449-.672-1.45-1.5-1.45-1.5.649-1.5 1.45zM6.067 12.52c0 .801.672 1.448 1.5 1.448s1.5-.647 1.5-1.448c0-.8-.673-1.448-1.5-1.448s-1.5.648-1.5 1.448zm6.929 3.064c0 .801.672 1.449 1.5 1.449s1.5-.648 1.5-1.449-.672-1.45-1.5-1.45-1.5.649-1.5 1.45zM8.84 13.236l4.388 1.631m-.005-5.632L8.84 11.802" />
    </svg>
  ),
  tablet: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18,22H6c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h12c1.104,0,2,0.896,2,2v16C20,21.104,19.104,22,18,22z M13.016,18H11l0,0" />
    </svg>
  ),
  smartphone: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8,2h8c1.104,0,2,0.896,2,2 v16c0,1.104-0.896,2-2,2H8c-1.104,0-2-0.896-2-2V4C6,2.896,6.896,2,8,2z M13.031,18H11l0,0" />
    </svg>
  ),
  input_text: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,5h18c1.104,0,2,0.896,2,2v10c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2V7C1,5.896,1.896,5,3,5z M5,15 l2.328-6.031L10.005,15 M13,9v6 M6,13h3 M15,11c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2s2-0.896,2-2C17,11.896,16.104,11,15,11z" />
    </svg>
  ),
  input_number: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,5h18c1.104,0,2,0.896,2,2v10c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2V7C1,5.896,1.896,5,3,5z M7.063,15V9L5,11 M14.588,15H10l2.902-2.299c0,0,1.33-0.805,1.477-1.701c0.178-1.09-0.896-2-2-2c-0.828,0-1.539,0.504-1.843,1.222" />
    </svg>
  ),
  select_option: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,5h18c1.104,0,2,0.896,2,2v10c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2V7C1,5.896,1.896,5,3,5z M15.982,11l1.979,1.979L20.004,11 M13,9v6.031" />
    </svg>
  ),
  img_on_top: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.332 2h9.334C17.402 2 18 2.597 18 3.334v9.332c0 .736-.598 1.334-1.334 1.334H7.332A1.334 1.334 0 0 1 6 12.666V3.334C6 2.597 6.597 2 7.332 2zm2.335 2.666a1 1 0 1 1-.003 2 1 1 0 0 1 .003-2zM18 9.999l-3.332-3.331L7.332 14M6 18h12M6 22h12" />
    </svg>
  ),
  img_on_bottom: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.332 10h9.334c.736 0 1.334.598 1.334 1.334v9.332c0 .736-.598 1.334-1.334 1.334H7.332A1.334 1.334 0 0 1 6 20.666v-9.332C6 10.598 6.597 10 7.332 10zm2.335 2.666a1 1 0 1 1-.003 2 1 1 0 0 1 .003-2zM18 17.999l-3.332-3.331L7.332 22M6 2h12M6 6h12" />
    </svg>
  ),
  img_on_left: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.332 6h9.334C12.402 6 13 6.598 13 7.334v9.332c0 .736-.598 1.334-1.334 1.334H2.332A1.334 1.334 0 0 1 1 16.666V7.334C1 6.598 1.597 6 2.332 6zm2.335 2.666a1 1 0 1 1-.003 2 1 1 0 0 1 .003-2zM13 13.999l-3.332-3.331L2.332 18M17 8h6m-6 8h6m-6-4h6" />
    </svg>
  ),
  img_on_right: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.332 6h9.334C22.402 6 23 6.598 23 7.334v9.332c0 .736-.598 1.334-1.334 1.334h-9.334A1.335 1.335 0 0 1 11 16.666V7.334C11 6.598 11.598 6 12.332 6zm2.335 2.666a1 1 0 1 1-.003 2 1 1 0 0 1 .003-2zM23 13.999l-3.332-3.331L12.332 18M1 8h6m-6 8h6m-6-4h6" />
    </svg>
  ),
  navigation_bar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3,6h18c1.104,0,2,0.896,2,2v8c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2V8C1,6.896,1.896,6,3,6z M7,12H5 M13,12h-2 M19.041,12h-2" />
    </svg>
  ),
  slider: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23,20H1V4h22V20z M7,10l-2,2l2,2 M17,14l2-2l-2-2" />
    </svg>
  ),
  tab: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9,8h14v12H1V8c0,0,2,0,2,0V4h6V8z M15,8V4H9 M21,8V4h-6" />
    </svg>
  ),
  typed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1,7V4h16v3 M6,20h6 M9,4v16 M22,4v16 M23,20h-2 M23,4h-2" />
    </svg>
  ),
  calendar_arrow_previous: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  calendar_arrow_next: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  column_settings: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M7.979,19.042H3
	c-1.104,0-2-0.896-2-2v-14c0-1.104,0.896-2,2-2h14c1.105,0,2,0.896,2,2v6 M1.063,7H19 M7.042,19.042v-12 M13.042,10.042v-3
	 M16.938,12.792v-1.334 M16.938,23v-1.286 M21.275,13.346l-1.384,1.188 M14.015,20.021l-1.306,1.309 M12.486,13.082l1.706,1.707
	 M19.892,20.021l1.307,1.309 M12.709,17.278h-1.812 M20.875,17.276L23,17.278 M16.938,13.55c2.059,0,3.729,1.671,3.729,3.729
	s-1.67,3.727-3.729,3.727s-3.728-1.668-3.728-3.727C13.208,15.218,14.879,13.55,16.938,13.55z"
      />
    </svg>
  )
};

const mainIcons: any = {
  statistics: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9,17H4c-1.104,0-2-0.896-2-2V5c0-1.104,0.896-2,2-2h16c1.104,0,2,0.896,2,2v6.021 M16.44,12.016c2.459,0,4.453,1.999,4.453,4.463c0,2.467-1.994,4.467-4.453,4.467s-4.452-2-4.452-4.467C11.988,14.015,13.981,12.016,16.44,12.016z M22,22.052l-2.407-2.407 M6,9.042V13 M9,6.042V13 M12,7.042v3.979 M15.056,9V8.042 M18.042,10V9.042 M1.986,21h9.083" />
    </svg>
  ),
  product: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M16.5,9.4l-9-5.19 M21,16V8c0-0.714-0.382-1.373-1-1.73l-7-4c-0.619-0.357-1.381-0.357-2,0l-7,4
	C3.382,6.627,3,7.286,3,8v8c0,0.714,0.382,1.373,1,1.73l7,4c0.619,0.356,1.381,0.356,2,0l7-4C20.618,17.373,21,16.714,21,16z
	 M3.27,6.96L12,12.01l8.73-5.05 M12,22.08V12 M16.5,9.4v3.605"
      />
    </svg>
  ),
  marketing: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M21,20.072
		C21,21.139,20.133,22,19.063,22H2.938C1.867,22,1,21.139,1,20.072V3.923c0-1.064,0.868-1.927,1.938-1.927h16.125
		c1.07,0,1.938,0.863,1.938,1.927L21,20.072L21,20.072z M21,15h2L20.755,3 M15,16V7.984l-4.008,6.032L7.016,8v8.016"
      />
    </svg>
  ),
  desk: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M4.38,7.172C5.337,3.905,8.058,2,12,2c3.975,0,6.707,1.936,7.645,5.253 M10.643,19.869l-1.374-0.223
	c-2.408-0.674-4.09-2.293-4.836-4.646 M6.001,8H3.64C2.735,8,2.001,8.734,2.001,9.639v2.721c0,0.906,0.734,1.64,1.639,1.64h0.722
	c0.905,0,1.639-0.734,1.639-1.64V8z M18.001,12.36c0,0.906,0.733,1.64,1.64,1.64h0.723c0.904,0,1.639-0.734,1.639-1.64V9.639
	C22.001,8.734,21.268,8,20.361,8h-2.36V12.36z M13.501,20.5c0-0.829-0.672-1.5-1.5-1.5l0,0c-0.828,0-1.5,0.671-1.5,1.5l0,0
	c0,0.829,0.671,1.5,1.5,1.5l0,0C12.829,22,13.501,21.329,13.501,20.5L13.501,20.5z"
      />
    </svg>
  ),
  feed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9,21H4c-1.104,0-2-0.896-2-2V6c0-1.104,0.896-2,2-2h2 M14,4h2c1.104,0,2,0.896,2,2v1 M7,2h6c0.553,0,1,0.448,1,1v2c0,0.552-0.447,1-1,1H7C6.448,6,6,5.552,6,5V3C6,2.448,6.448,2,7,2z M17,9h-3.707C12.579,9,12,9.58,12,10.294v10.412C12,21.42,12.579,22,13.293,22h7.413C21.42,22,22,21.42,22,20.706V14L17,9z M17,9.47V14h4.529" />
    </svg>
  ),
  dashboard: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M11.117,15.722L8.47,10.72 M12,15.428c-0.974,0-1.764,0.787-1.764,1.762c0,0.977,0.79,1.767,1.764,1.767
	c0.974,0,1.766-0.79,1.766-1.767C13.766,16.215,12.974,15.428,12,15.428z M20.662,9.25l-2.04,1.177 M12,6.603V4.25 M5.377,10.427
	L3.34,9.25 M18.113,17.778l2.547,1.472c0.852-1.472,1.34-3.176,1.34-5c0-5.522-4.477-10-10-10c-5.523,0-10,4.478-10,10
	c0,1.824,0.488,3.528,1.342,5l2.545-1.472"
      ></path>
    </svg>
  ),
  sales: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12.5,4v12 M9,14h5c1.104,0,2-0.896,2-2c0-1.104-0.896-2-2-2h-3c-1.104,0-2-0.896-2-2s0.896-2,2-2h4 M10,19h4.5
	c0.828,0,1.5-0.672,1.5-1.5l0,0c0-0.828-0.672-1.5-1.5-1.5H7c0,0-1.484,0.016-3.016,1.016 M4,23.016h12.781l5.695-4.32
	c0.662-0.498,0.791-1.438,0.293-2.1l0,0c-0.5-0.66-1.441-0.791-2.104-0.291L16.984,19H14.5 M4,15.996H1v7.02h3V15.996z
	 M19.579,15.561c1.204-1.531,1.922-3.461,1.922-5.56C21.501,5.03,17.471,1,12.5,1c-4.971,0-9.001,4.03-9.001,9.001
	c0,2.085,0.709,4.004,1.899,5.53"
      />
    </svg>
  ),
  quotes: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17,1H4C2.896,1,2,1.896,2,3v18c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2V7L17,1z M17,1v6h5 M12,7v12 M15.486,9.512h-5.229c-0.962,0-1.743,0.78-1.743,1.743s0.781,1.743,1.743,1.743h3.486c0.962,0,1.743,0.781,1.743,1.743 c0,0.963-0.781,1.743-1.743,1.743H8.514" />
    </svg>
  ),
  customization: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.083,10H4.689c-1.451,0-2.626,1.273-2.626,2.724v1.313 M7.5,2C8.88,2,10,3.119,10,4.5C10,5.88,8.88,7,7.5,7C6.119,7,5,5.88,5,4.5C5,3.119,6.119,2,7.5,2z M14.625,12.614c1.11,0,2.011,0.9,2.011,2.011s-0.9,2.011-2.011,2.011s-2.011-0.9-2.011-2.011S13.515,12.614,14.625,12.614z M19.587,16.636c-0.184,0.415-0.096,0.898,0.221,1.222l0.04,0.04c0.524,0.522,0.524,1.371,0.001,1.896c0,0,0,0-0.001,0c-0.523,0.525-1.372,0.525-1.896,0.001c0,0,0,0-0.001-0.001l-0.04-0.04c-0.323-0.317-0.807-0.403-1.221-0.222c-0.404,0.174-0.669,0.572-0.67,1.014v0.113c0,0.74-0.6,1.341-1.341,1.341c-0.74,0-1.341-0.601-1.341-1.341v-0.061c-0.01-0.454-0.298-0.855-0.724-1.012c-0.415-0.184-0.898-0.096-1.221,0.221l-0.041,0.04c-0.523,0.524-1.372,0.525-1.896,0.001c0,0,0,0-0.001-0.001c-0.524-0.523-0.524-1.372-0.001-1.896c0,0,0.001,0,0.001-0.001l0.041-0.04c0.316-0.323,0.404-0.807,0.221-1.221c-0.174-0.404-0.571-0.669-1.012-0.67H8.591c-0.741,0-1.341-0.6-1.341-1.341c0-0.74,0.6-1.341,1.341-1.341h0.06c0.455-0.011,0.856-0.298,1.013-0.724c0.183-0.414,0.095-0.897-0.222-1.221l-0.04-0.04C8.878,10.83,8.878,9.981,9.401,9.457c0,0,0,0,0.001-0.001c0.523-0.524,1.372-0.524,1.896-0.001c0,0,0,0.001,0.001,0.001l0.04,0.041c0.323,0.316,0.807,0.404,1.221,0.221h0.054c0.405-0.174,0.669-0.571,0.67-1.012V8.591c0-0.741,0.601-1.341,1.341-1.341s1.341,0.6,1.341,1.341v0.06c0.001,0.441,0.265,0.839,0.67,1.013c0.415,0.183,0.898,0.095,1.222-0.222l0.04-0.04c0.522-0.524,1.371-0.524,1.896-0.001c0,0,0,0,0,0.001c0.525,0.523,0.525,1.372,0.001,1.896c0,0,0,0.001-0.001,0.001l-0.04,0.041c-0.317,0.323-0.403,0.806-0.222,1.221v0.054c0.174,0.405,0.572,0.668,1.013,0.67h0.114c0.74,0,1.341,0.601,1.341,1.341s-0.601,1.341-1.341,1.341h-0.061C20.157,15.967,19.761,16.23,19.587,16.636z" />
    </svg>
  ),
  layout: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-layout"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  ),
  customer: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20,21v-2c0-2.209-1.791-5-4-5l-4,4.016L8,14c-2.209,0-4,2.791-4,5v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  activity: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22,19h-2.163c-0.567,0-0.87-0.463-0.87-1.031V10c0-0.569,0.303-1.03,0.87-1.03L22,8.972V19z M18.967,10.5C17.717,8.021,15.363,7,14.535,7H9.509c-0.828,0-1.5,0.672-1.5,1.5l0,0c0,0.828,0.672,1.5,1.5,1.5h3.458c0,0,1,2,3,2 M4.311,11.98H3.467c-0.828,0-1.5,0.672-1.5,1.5l0,0c0,0.828,0.672,1.5,1.5,1.5l1.5,0.005 M4.472,14.98c-0.828,0-1.5,0.672-1.5,1.5l0,0c0,0.828,0.672,1.5,1.5,1.5L5.966,18 M6.467,18c-0.828,0-1.5,0.672-1.5,1.5l0,0c0,0.828,0.672,1.5,1.5,1.5h5.993c0,0,3.512-0.02,6.512-3.02 M12.208,6.187L11.325,4.19c-0.447-1.01-1.629-1.466-2.639-1.019L4.117,5.196C3.107,5.643,2.65,6.825,3.098,7.834l4.472,10.097c0.447,1.01,1.629,1.465,2.639,1.018l4.569-2.023c1.01-0.447,1.465-1.629,1.018-2.639l-1.154-2.607 M6.636,8.421l2.82,6.368 M12.209,13.57l-1.41-3.184" />
    </svg>
  ),
  paid: (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  loyalty: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.423,10.32l-3.527,0.525l2.552,2.564l-0.602,3.612L12,15.313l3.154,1.709l-0.604-3.612l2.553-2.564 l-3.528-0.525L12,7.031L10.423,10.32z M1,16c1.214-0.912,2-2.364,2-4c0-1.616-0.766-3.052-1.955-3.966L1,8.004V4 c0-1.104,0.896-2,2-2h18c1.104,0,2,0.896,2,2v4.035l-0.002-0.002c-1.189,0.914-1.957,2.351-1.957,3.968 c0,1.617,0.768,3.055,1.958,3.969L23,15.966V20c0,1.104-0.896,2-2,2H3c-1.104,0-2-0.896-2-2v-4.002L1,16z" />
    </svg>
  ),
  order: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M19.979,15H7.104L4.083,1H1.021 M23,5l-3,10 M8,19c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S9.104,19,8,19
	z M18,19c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S19.104,19,18,19z M20.958,5H23 M11.917,5H5.333 M11,9l2.456,2.583 M17,5
	l-3.544,6.583"
      />
    </svg>
  ),
  purchase: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M7.313,11.393l6.666-10.394l9.015,6.003l-9.027,14.165l-1.654-1 M3.507,22.568l5.145-3.006l4.456-3.953
	c0.451-0.399,0.328-1.604-0.021-2.098l0,0c-0.381-0.533-1.124-0.658-1.656-0.275l-3.843,1.839L7.055,8.938l1.26-0.703 M10.871,3.722
	L5.53,5.991c-0.426,0.18-0.785,0.485-1.031,0.877L2.565,17.88l-0.552,0.369 M2.787,16.621l-1.811,1.996L3.698,23l2.075-1.406
	L2.787,16.621z M17.779,3.53l-6.348,9.707"
      />
    </svg>
  ),
  invoice: icons.invoice,
  connect_ss: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.56,10.29H23.14a.86.86,0,0,0,0-1.72H7.71a.85.85,0,0,1-.85-.86V4.29a.85.85,0,0,1,.85-.86H23.14a.86.86,0,0,0,0-1.72H7.56A2.43,2.43,0,0,0,5.14,4.13v1h-.9A4.24,4.24,0,0,0,0,9.38v5.24a4.24,4.24,0,0,0,4.24,4.24h9.47v1a2.43,2.43,0,0,0,2.42,2.42h7a.86.86,0,0,0,0-1.72H16.29a.85.85,0,0,1-.86-.86V16.29a.85.85,0,0,1,.86-.86h6.85a.86.86,0,0,0,0-1.72h-7a2.43,2.43,0,0,0-2.42,2.42v1H4.54a2.83,2.83,0,0,1-2.83-2.82V9.68A2.83,2.83,0,0,1,4.54,6.86h.6v1A2.43,2.43,0,0,0,7.56,10.29Z" />
    </svg>
  ),
  connect_fs: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23.14,20.57H16.29a.85.85,0,0,1-.86-.86V16.29a.85.85,0,0,1,.86-.86h6.85a.86.86,0,0,0,0-1.72h-7a2.43,2.43,0,0,0-2.42,2.42v1.21A2.62,2.62,0,0,1,12,15V10.71c0-3.37-1.95-4.88-3.43-5.38V4.13A2.42,2.42,0,0,0,6.15,1.71H.86a.86.86,0,0,0,0,1.72H6a.86.86,0,0,1,.86.86V7.71A.86.86,0,0,1,6,8.57H.86a.86.86,0,1,0,0,1.72H6.15A2.42,2.42,0,0,0,8.57,7.87V7.2a3.67,3.67,0,0,1,1.72,3.51V15a4.35,4.35,0,0,0,3.42,4.13v.74a2.43,2.43,0,0,0,2.42,2.42h7a.86.86,0,0,0,0-1.72Z" />
    </svg>
  ),
  connect_sf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23.14,6.86h-12A.86.86,0,0,1,10.29,6V2.57a.86.86,0,0,1,.85-.86h12a.86.86,0,1,0,0-1.71H11A2.42,2.42,0,0,0,8.57,2.42v1H7.12c-.46-.05-2.25-.06-3.41,2.25l-.06.12,0,.13a8,8,0,0,0,0,2.79,4,4,0,0,0,2.65,2.34c.55.16,5.69,2.2,8.83,3.46l.05,0s2,.69,2,2.17-.67,1.75-1.11,2l-.09,0a14.84,14.84,0,0,1-2.23.13v-1a2.41,2.41,0,0,0-2.41-2.42H.86a.86.86,0,1,0,0,1.71H11.14A.86.86,0,0,1,12,18v3.43a.86.86,0,0,1-.86.86H.86A.86.86,0,1,0,.86,24H11.3a2.41,2.41,0,0,0,2.41-2.42v-1a9.08,9.08,0,0,0,3-.3l.09-.05a3.43,3.43,0,0,0,2.1-3.51c0-2.61-2.78-3.67-3.12-3.79C10,10.62,6.93,9.43,6.63,9.38S5.42,8.73,5.3,8.28a6,6,0,0,1,0-1.94C6,5.05,6.84,5.12,6.91,5.13H8.57v1A2.42,2.42,0,0,0,11,8.57H23.14a.86.86,0,1,0,0-1.71Z" />
    </svg>
  ),
  connect_ff: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.76,5.14H10.29v-1A2.43,2.43,0,0,0,7.87,1.71h-7a.86.86,0,0,0,0,1.72H7.71a.85.85,0,0,1,.86.86V7.71a.85.85,0,0,1-.86.86H.86a.86.86,0,1,0,0,1.72h7a2.43,2.43,0,0,0,2.42-2.42v-1h9.17a2.83,2.83,0,0,1,2.83,2.82v4.64a2.83,2.83,0,0,1-2.83,2.82h-.6v-1a2.43,2.43,0,0,0-2.42-2.42H.86a.86.86,0,1,0,0,1.72H16.29a.85.85,0,0,1,.85.86v3.42a.85.85,0,0,1-.85.86H.86a.86.86,0,1,0,0,1.72H16.44a2.43,2.43,0,0,0,2.42-2.42v-1h.9A4.24,4.24,0,0,0,24,14.62V9.38A4.24,4.24,0,0,0,19.76,5.14Z" />
    </svg>
  ),
  group: <AccountTreeOutlined fontSize="small" />,
  lead: icons.m_lead,
  crown: (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.7867 3.26489L12.8773 5.6736L9.12863 0.673373C9.11355 0.653247 9.09398 0.636912 9.07149 0.62566C9.049 0.614409 9.0242 0.608551 8.99905 0.608551C8.9739 0.608551 8.9491 0.614409 8.92661 0.62566C8.90412 0.636912 8.88455 0.653247 8.86947 0.673373L5.12282 5.6736L1.21144 3.26489C1.09693 3.19458 0.948267 3.289 0.966348 3.4236L2.50117 15.0874C2.52327 15.2461 2.65987 15.3687 2.8226 15.3687H15.1795C15.3402 15.3687 15.4788 15.2482 15.4989 15.0874L17.0338 3.4236C17.0498 3.289 16.9032 3.19458 16.7867 3.26489ZM14.2554 13.9946H3.74269L2.66188 5.77003L5.47037 7.49971L9.00005 2.79078L12.5297 7.49971L15.3382 5.77003L14.2554 13.9946ZM9.00005 7.93565C7.75251 7.93565 6.738 8.95016 6.738 10.1977C6.738 11.4452 7.75251 12.4598 9.00005 12.4598C10.2476 12.4598 11.2621 11.4452 11.2621 10.1977C11.2621 8.95016 10.2476 7.93565 9.00005 7.93565ZM9.00005 11.168C8.46568 11.168 8.03175 10.7341 8.03175 10.1977C8.03175 9.66333 8.46568 9.22739 9.00005 9.22739C9.53443 9.22739 9.96836 9.66132 9.96836 10.1977C9.96836 10.7321 9.53443 11.168 9.00005 11.168Z"
        fill="#FAAD14"
      />
    </svg>
  )
};

const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-folder"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const Icon = (key: string) => {
  const icon = icons[key] || mainIcons[key] || defaultIcon;

  if (typeof icon == 'string') return icons[icon];
  else return icon;
};

export default Icon;

export const SortDESC = ({ size = 24 }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className="custom-svg" viewBox="0 0 24 24">
    <path d="M19 7H22L18 3L14 7H17V21H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
  </svg>
);
export const SortASC = ({ size = 24 }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className="custom-svg" viewBox="0 0 24 24">
    <path d="M19 17H22L18 21L14 17H17V3H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
  </svg>
);
export const MoveFirst = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15,18l-6-6l6-6 M4,18V6" />
  </svg>
);
export const MoveLast = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9,6l6,6l-6,6 M20,6v12" />
  </svg>
);

export const RightCollapse = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="70" viewBox="0 0 15 70">
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1="284.13"
      y1="-335.205"
      x2="321.789"
      y2="-364.628"
      gradientTransform="rotate(180 152.55 -157.995)"
    >
      <stop offset="0" style={{ stopColor: 'rgb(153, 41, 234)' }}></stop>
      <stop offset=".035" style={{ stopColor: 'rgb(148, 39, 235)' }}></stop>
      <stop offset=".265" style={{ stopColor: 'rgb(122, 25, 242)' }}></stop>
      <stop offset=".499" style={{ stopColor: 'rgb(103, 16, 247)' }}></stop>
      <stop offset=".741" style={{ stopColor: 'rgb(92, 10, 250)' }}></stop>
      <stop offset="1" style={{ stopColor: 'rgb(88, 8, 251)' }}></stop>
    </linearGradient>
    <path fill="url(#a)" d="M0 0v70c0-8.284 15-2.938 15-15V15C15 2.875 0 8.284 0 0z"></path>
    <path fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m5.031 30 5 5-5 5"></path>
  </svg>
);

export const LeftCollapse = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="70" viewBox="0 0 15 70" fill="none" stroke="currentColor">
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1="284.131"
      y1="-335.205"
      x2="321.79"
      y2="-364.628"
      gradientTransform="matrix(1 0 0 -1 -290.1 -315.99)"
    >
      <stop offset="0" style={{ stopColor: 'rgb(153, 41, 234)' }}></stop>
      <stop offset=".035" style={{ stopColor: 'rgb(148, 39, 235)' }}></stop>
      <stop offset=".265" style={{ stopColor: 'rgb(122, 25, 242)' }}></stop>
      <stop offset=".499" style={{ stopColor: 'rgb(103, 16, 247)' }}></stop>
      <stop offset=".741" style={{ stopColor: 'rgb(92, 10, 250)' }}></stop>
      <stop offset="1" style={{ stopColor: 'rgb(88, 8, 251)' }}></stop>
    </linearGradient>
    <path fill="url(#a)" d="M0 15v40c0 12.062 15 6.716 15 15V0C15 8.284 0 2.875 0 15z"></path>
    <path fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m9.969 40-5-5 5-5"></path>
  </svg>
);

export { mainIcons, SvgIcons, icons };
