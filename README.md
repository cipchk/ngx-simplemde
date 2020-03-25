# ngx-simplemde

Angular for [simplemde](https://simplemde.com/), better use [ng-zorro-antd](https://ng.ant.design/) components.

[![NPM version](https://img.shields.io/npm/v/ngx-simplemde.svg)](https://www.npmjs.com/package/ngx-simplemde)
[![Build Status](https://travis-ci.org/cipchk/ngx-simplemde.svg?branch=master)](https://travis-ci.org/cipchk/ngx-simplemde)

## Usage & Demo

- [Live Demo](https://cipchk.github.io/ngx-simplemde/)
- [Stackblitz](https://stackblitz.com/edit/ngx-simplemde)

## Installation instructions

1. Install `ngx-simplemde` from `npm`

```bash
yarn add ngx-simplemde --save
```

2. Import the `SimplemdeModule` in to your root `AppModule`.

```ts
import { SimplemdeModule } from 'ngx-simplemde';

@NgModule({
  imports: [
    BrowserModule,
    SimplemdeModule.forRoot({
      // Global options
      autosave: { enabled: true, uniqueId: 'MyUniqueID' }
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Add `simplemde-antd.min.js` and styles to `angular.json`.

```
"styles": [
  "src/styles.less"
],
"scripts": [
  "node_modules/simplemde-antd/dist/simplemde.min.js"
]
```

4. Add simplemde style.

```less
// src/style.less
@import '~ngx-simplemde/lib/index.less';
// Change existing parameters here:
@simplemde-icon-url: '//at.alicdn.com/t/font_700857_mnodkd1cp9l766r';
@simplemde-statusbar-lines: 'Lins:';
@simplemde-statusbar-words: 'words:';
@simplemde-statusbar-characters: '字符：';
@simplemde-statusbar-counts: '字数：';
```

> **NOTICE:** If you need to deploy ICON offline, [download](icons.zip) and change `@simplemde-icon-url` the path.

5. Happy coding.

```ts
import { Component, ViewChild, OnInit } from '@angular/core';
import { SimplemdeComponent, SimplemdeOptions } from 'ngx-simplemde';

@Component({
  selector: 'app-root',
  template: `
  <simplemde [(ngModel)]="demo" [disabled]="false"></simplemde>
  <simplemde #simplemde [(ngModel)]="customize" [options]="options"></simplemde>  
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('simplemde', { static: true }) private readonly simplemde: SimplemdeComponent;

  options: SimplemdeOptions = {
    toolbar: ['bold', 'italic', 'heading', '|', 'quote']
  };

  ngOnInit(): void {
    this.simplemde.setOptions('lineNumbers', true);
  }  
}
```

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-simplemde/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-simplemde/blob/master/LICENSE) file for the full text)
