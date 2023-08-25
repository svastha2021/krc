import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-record-input',
  templateUrl: './record-input.component.html',
  styleUrls: ['./record-input.component.scss'],
})
export class RecordInputComponent implements OnInit {
  @Input() mic: boolean = false;
  @Output() voiceText = new EventEmitter();
  text = '';
  constructor(private vservice: VoiceRecognitionService) {
    this.vservice.init();
  }
  ngOnInit(): void {}

  start() {
    this.mic = true;
    this.vservice.start();
  }
  stopService() {
    this.mic = false;
    this.vservice.stop();
    this.text = this.vservice.text;
    this.voiceText.emit(this.text);
    this.text = ''
  }
}
