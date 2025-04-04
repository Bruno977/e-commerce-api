import { User, UserProps } from './user';

type AdminProps = {
  role: string;
} & UserProps;
export class Admin extends User {
  private adminProps: AdminProps;

  constructor(adminProps: AdminProps) {
    super(adminProps);
    // this.adminProps = adminProps;
  }

  // get role() {
  //   return this.adminProps.role;
  // }
  // set role(role: string) {
  //   this.adminProps.role = role;
  // }
}
