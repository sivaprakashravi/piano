import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Constants } from '../../constants';
@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  context: AudioContext = new AudioContext();
  oscillator: OscillatorNode;
  @ViewChild('board', { static: false }) board: ElementRef;
  white = Constants.white;
  black = Constants.black;
  wKeys = Constants.wKeys;
  bKeys = Constants.bKeys;
  activeKey = null;
  shift = false;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => this.board.nativeElement.focus());
  }

  down({ altKey, ctrlKey, shiftKey, key, code, keyCode }) {
    this.shift = shiftKey;
    const actionKeys = altKey || ctrlKey;
    if (this.oscillator) {
      this.oscillator.stop();
    }
    this.activeKey = keyCode;
    const index = this[this.shift ? 'bKeys' : 'wKeys'].findIndex(
      ({ keyCode }) => keyCode === this.activeKey
    );
    if (index > -1) {
      this.oscillator = this.context.createOscillator();
      this.oscillator.frequency.value = this[this.shift ? 'black' : 'white'][
        index
      ];
      this.oscillator.setPeriodicWave(this.setWave);
      this.oscillator.connect(this.context.destination);
      this.oscillator.start();
    }
  }

  up(event?) {
    if (this.oscillator) {
      this.oscillator.stop();
    }
    this.activeKey = null;
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

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
