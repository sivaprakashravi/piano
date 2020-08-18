import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
})
export class KeyComponent implements OnInit {
  context: AudioContext = new AudioContext();
  oscillator: OscillatorNode;
  constructor() {}

  ngOnInit(): void {
    this.oscillator = this.context.createOscillator();
  }

  down() {
    this.oscillator.frequency.value = 440;
    this.oscillator.type = 'sine';
    this.oscillator.connect(this.context.destination);
    this.oscillator.start()
  }

  up() {
    this.oscillator.stop();
  }
}
