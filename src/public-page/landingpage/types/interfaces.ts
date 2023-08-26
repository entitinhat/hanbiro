import { Token } from '@public-page/types';

//// http://localhost:8080/site/view/?tk=RD05MDg2MTdiYS1iMzczLTQ1ODgtYjBlMC00MDE2MThlODg5NjImUD0yJlM9MyZDPTI0YTEwMDdkLTNiMjEtNDAwOS1hY2Q1LTYwZmM1ZGUyYmY0MiZUPS1FZHFuSEZEZmVB
export interface PublicParams {
  id: string;
  // source: string;
  token: Token;
  tk: string;
  readOnly: string;
}
