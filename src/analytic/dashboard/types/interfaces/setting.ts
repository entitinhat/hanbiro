import {EUserType} from "@analytic/main/types/enum";

export interface DragAndDropItem {
  key: string;
  hide?: boolean;
  items?: DragAndDropItem[];
}

export interface Setting {
  userType: EUserType;
  sections: DragAndDropItem[];
}