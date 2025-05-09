import { Id } from './id';

export abstract class Entity<Props> {
  private _id: Id;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = Id.create(id);
    this.props = props;
  }
}
