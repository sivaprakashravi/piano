import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  context: AudioContext = new AudioContext();
  oscillator: OscillatorNode;
  @ViewChild('board', { static: false }) board: ElementRef;
  white = Array.from({ length: 52 }, (v, i) => i + 1);
  black = Array.from({ length: 36 }, (v, i) => i + 1);
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => this.board.nativeElement.focus());
  }

  down(event) {
    if (this.oscillator) {
      this.oscillator.stop();
    }
    this.oscillator = this.context.createOscillator();
    this.oscillator.frequency.setValueAtTime(880, this.context.currentTime);
    this.oscillator.setPeriodicWave(this.setWave);
    this.oscillator.connect(this.context.destination);
    this.oscillator.start();
  }

  up(event) {
    this.oscillator.stop();
  }

  get setWave() {
    const real = new Float32Array(2);
    const imag = new Float32Array(2);
    const ac = new AudioContext();
    const osc = ac.createOscillator();

    real[0] = 0;
    imag[0] = 0;
    real[1] = 1;
    imag[1] = 1;

    const wave = ac.createPeriodicWave(real, imag, {
      disableNormalization: true,
    });
    return wave;
  }
}
