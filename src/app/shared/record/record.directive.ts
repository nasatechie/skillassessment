import {
  Directive,
  OnInit,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { SpeechService } from 'src/app/services/speech.service';

@Directive({
  selector: '[appRecord]'
})
export class RecordDirective implements OnInit {
  recognition: any;
  private _isRecording = false;

  @Output('textCaptured') textCaptured: EventEmitter<
    string
  > = new EventEmitter();
  constructor(private speechRecognitionService: SpeechService) {}

  ngOnInit() {
    this.recognition = this.speechRecognitionService.setupSpeechRecognition();

    this.recognition.onresult = event => {
      if (typeof event.results == 'undefined') {
        this.recognition.onend = null;
        this.recognition.stop();
        console.log('no results found from this audio');
        return;
      }
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const finalTranscript = event.results[i][0].transcript;
          console.log('final_transcript', finalTranscript);
          this.textCaptured.emit(finalTranscript);
        }
      }
    };

    this.recognition.onstart = event => {
      this._isRecording = true;
      console.log('capture started');
    };

    this.recognition.onend = event => {
      this._isRecording = false;
      console.log('capture ended');
    };
  }

  @HostListener('click')
  buttonClicked() {
    if (this._isRecording) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }
}
