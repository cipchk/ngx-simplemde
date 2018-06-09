import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  demo = '';
  customize = '';
  autoSaving = '';
  hiddenToolbar = `# This one is bare
You can also choose to hide the statusbar and/or toolbar for a simple and clean appearance. This one also checks for misspelled words as you type!`;

  autoSavingOptions = {
    autosave: { enabled: true, uniqueId: 'MyUniqueID' },
    renderingConfig: {
      codeSyntaxHighlighting: true
    },
  };

  isVisible = false;

  constructor(private http: HttpClient) {
    http
      .get('./assets/demo.md', { responseType: 'text' })
      .subscribe(res => (this.demo = res));
    http
      .get('./assets/autoSaving.md', { responseType: 'text' })
      .subscribe(res => (this.autoSaving = res));
  }
}
