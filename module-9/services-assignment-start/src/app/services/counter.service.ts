export class CounterService {
  activeInactiveActions = 0;
  inactiveActiveActions = 0;

  onActiveInactiveAction() {
    this.activeInactiveActions++;
    console.log("Active -> Inactive actions counter: " + this.activeInactiveActions);
  }

  onInactiveActiveAction() {
    this.inactiveActiveActions++;
    console.log("Inactive -> Active actions counter: " + this.inactiveActiveActions);
  }

}
