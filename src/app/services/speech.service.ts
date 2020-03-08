import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare let { webkitSpeechRecognition }: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  speech$ = new BehaviorSubject('');

  setupSpeechRecognition() {
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

  setupTextToSpeech() {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'en-US';
    return speech;
    // speech.text = 'Hello world. This is a sample text';
    // speechSynthesis.speak(msg);
  }

  private isSpeechSupported() {
    return 'webkitSpeechRecognition' in window;
  }
}
