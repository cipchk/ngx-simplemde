import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SimplemdeComponent } from 'ngx-simplemde';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('simplemde', { static: true }) private readonly simplemde!: SimplemdeComponent;
  demo = '';
  customize = '';
  autoSaving = '';
  hiddenToolbar = `# This one is bare
You can also choose to hide the statusbar and/or toolbar for a simple and clean appearance. This one also checks for misspelled words as you type!`;

  autoSavingOptions = {
    autosave: { enabled: true, uniqueId: 'MyUniqueID' },
    renderingConfig: {
      codeSyntaxHighlighting: true,
    },
  };

  isVisible = false;

  f: FormGroup;

  constructor(http: HttpClient, fb: FormBuilder) {
    http.get('./assets/demo.md', { responseType: 'text' }).subscribe((res) => (this.demo = res));
    http.get('./assets/autoSaving.md', { responseType: 'text' }).subscribe((res) => (this.autoSaving = res));

    this.f = fb.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.simplemde.setOptions('lineNumbers', true);
  }

  onSubmit() {
    console.log(this.f.value);
  }

  disabled = false;
  setDisabledForForm() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.f.controls.text.disable();
    } else {
      this.f.controls.text.enable();
    }
  }
}
