import {SusClick as SSusClick} from "@analytic/sus-log/types/interfaces";

export interface SusClick extends SSusClick{
  createdDate?: string;
  createdTime?: string;
  ip?: string;
  userAgent?: string;
}