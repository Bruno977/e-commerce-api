import { Entity } from 'src/lib/common/entities/entity';
import { UserRole } from '../enums/user-role.enum';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
export class User extends Entity<UserProps> {
  protected props: UserProps;
  static create(props: UserProps) {
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
    return user;
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
  get role() {
    return this.props.role;
  }
  set role(role: UserRole) {
    this.props.role = role;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
}
