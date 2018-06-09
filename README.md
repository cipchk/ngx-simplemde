# ngx-simplemde

Angular for [simplemde](https://simplemde.com/), better use [ng-zorro-antd](https://ng.ant.design/) components.

[![NPM version](https://img.shields.io/npm/v/ngx-simplemde.svg)](https://www.npmjs.com/package/ngx-simplemde)
[![Build Status](https://travis-ci.org/cipchk/ngx-simplemde.svg?branch=master)](https://travis-ci.org/cipchk/ngx-simplemde)

## Installation instructions

1. Install `ngx-simplemde` from `npm`

```
npm install ngx-simplemde --save
```

2. Import the `SimplemdeModule` in to your root `AppModule`.

```
import { SimplemdeModule } from 'ngx-simplemde';

@NgModule({
  imports: [
    BrowserModule,
    SimplemdeModule.forRoot({
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
  "node_modules/ngx-simplemde/src/index.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/simplemde-antd/dist/simplemde.min.js"
]
```

4. Happy coding.

```html
<simplemde [(ngModel)]="demo"></simplemde>
<simplemde [(ngModel)]="customize" [options]="{ toolbar: ['bold', 'italic', 'heading', '|', 'quote'] }"></simplemde>
```

## Usage & Demo

- [Live Demo](https://cipchk.github.io/ngx-simplemde/)
- [Stackblitz](https://stackblitz.com/edit/ngx-simplemde)

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-simplemde/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-simplemde/blob/master/LICENSE) file for the full text)
