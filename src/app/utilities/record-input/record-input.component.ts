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
    this.vservice.voiceTextObs.subscribe(value=>{
      this.text = value;
    })
  }
  ngOnInit(): void {}

  startService(event:Event) {
    this.mic = true;
    this.vservice.start();
    //event.preventDefault();
  }
  stopService(event:Event) {
    //event.preventDefault();
    //event.stopImmediatePropagation();
    this.mic = false;
    this.vservice.stop();
    //this.text = this.vservice.text;
    //this.text.replace('.','')
    setTimeout(() => {
      this.voiceText.emit(this.text.trim());
    }, 1000);
    
    //this.text = ''
    ///this.vservice.text = ''
  }
}
