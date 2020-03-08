import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare let { webkitSpeechRecognition }: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  speech$ = new BehaviorSubject('');

  setupSpeech() {
    if (!this.isSpeechSupported()) {
      console.log('not supported');
      return;
    } else {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      return recognition;
    }
  }

  private isSpeechSupported() {
    return 'webkitSpeechRecognition' in window;
  }
}
