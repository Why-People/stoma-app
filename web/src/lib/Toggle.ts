export default class Toggle {
  private toggleFn: (value: boolean) => void;
  private value: boolean;

  public constructor(value: boolean, toggleFn: (value: boolean) => void) {
    this.toggleFn = toggleFn;
    this.value = value;
  }

  public switch() {
    this.value = !this.value;
    this.toggleFn(this.value);
  }

  public switchOn() {
    this.value = true;
    this.toggleFn(this.value);
  }

  public switchOff() {
    this.value = false;
    this.toggleFn(this.value);
  }

  public getValue() {
    return this.value;
  }
}
