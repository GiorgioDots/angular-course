export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  onActiveInactiveAction() {
    this.activeToInactiveCounter++;
    console.log("Active -> Inactive actions counter: " + this.activeToInactiveCounter);
  }

  onInactiveActiveAction() {
    this.inactiveToActiveCounter++;
    console.log("Inactive -> Active actions counter: " + this.inactiveToActiveCounter);
  }

}
