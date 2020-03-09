import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() numberSet = new EventEmitter<number>();
  private interval;
  constructor() { }

  ngOnInit(): void {
  }
  onStartGame() {
    let number = 1;
    this.interval = setInterval(() => {
      this.numberSet.emit(number)
      number += 1;
    }, 1000);
  }
  onStopGame() {
    clearInterval(this.interval);
  }
}
