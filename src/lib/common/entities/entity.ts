export abstract class Entity<Props> {
  private _id: string;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}
