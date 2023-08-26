import { AssignToName } from "@base/types/user";


export interface AssignReport {
  id: string;
  module: any;
  assignedOn:any;
  userGroup:AssignToName;
  assignedNumber:string;
  assignedPercent:string
  // rulesEntry: RuleEntry;
}