import { Entity } from 'src/lib/common/entities/entity';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export abstract class User extends Entity<UserProps> {
  protected props: UserProps;
  constructor(props: UserProps) {
    super(props);
  }
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get email() {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }
  get password() {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
}
