# ng2-alt-summernote

Component to use [Summernote](http://summernote.org/) in Angular 2.

Example:
--------
[Example](https://carlescs.github.io/testangular/)

The example repo is located [here](https://github.com/carlescs/testangular).

Usage with Angular CLI:
-----------------------
To use it with angular-cli:

1. Install jquery, bootstrap and summernote:

   ```bash
   npm install --save jquery
   npm install --save bootstrap
   npm install --save summernote
   ```

2. Add styles to `angular-cli.json`:

   ```json 
   "styles": [
      "styles.css",
      "../node_modules/bootstrap/dist/css/bootstrap.min.css",
      "../node_modules/codemirror/lib/codemirror.css",
      "../node_modules/summernote/dist/summernote.css"
      ],
   ```

3. Add `vendor.ts` file with the following content:

    ```typescript
    import * as jquery from 'jquery';
    window['jQuery'] = window['$'] = jquery;
    ```

    and add it to `angular-cli.json' scripts:

    ```json
    "scripts": [
       "vendor.ts"
    ]
    ```

4. Install `ng2-alt-summernote`:

   ```
   npm install --save npm-alt-summernote
   ```

5. Import `SummernoteModule`, `bootstrap` and `summernote` in `app.module.ts`:

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule } from '@angular/http';

    import 'bootstrap/dist/js/bootstrap.min.js';
    import 'summernote/dist/summernote.min.js';

    import {SummernoteComponent} from 'ng2-alt-summernote';

    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        SummernoteComponent,
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

6. Use it in you components:

    ```html
    <summernote [(ngModel)]="text" [options]="options" [disabled]="disabled"></summernote>
    ```

Usage with Webpack:
-------------------
To install in a webpack project:

1. Install required packages:

   ```bash
   npm install --save bootstrap
   npm install --save font-awesome
   npm install --save codemirror
   npm install --save summernote
   npm install --save ng2-alt-summernote
   ```

2. Import modules in `vendor.ts` (if available, if not use another typescript file):

   ```typescript
   import 'jquery';

   import 'bootstrap/dist/js/bootstrap.min.js';
   import 'bootstrap/less/bootstrap.less';
   import 'font-awesome/less/font-awesome.less';

   import 'bootstrap/js/tooltip';
   import 'bootstrap/js/transition';

   import 'summernote/dist/summernote.js';
   import 'summernote/src/less/summernote.less';
   ```

3. Import module in you `NgModule`:

   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { HttpModule } from '@angular/http';
   import {FormsModule} from '@angular/forms';
   import { RouterModule } from '@angular/router';

   import {TestComponent} from './TestComponent';
   import {SummernoteModule} from 'ng2-alt-summernote/ng2-alt-summernote';

   import { AppComponent } from './AppComponent';

   @NgModule({
       imports: [
           BrowserModule,
           HttpModule,
           FormsModule,
           SummernoteModule
       ],
       declarations: [
           TestComponent,
           AppComponent
       ],
       bootstrap: [AppComponent]
   })
   export class AppModule {

   }
   ```

4. Use it in your components:

    ```html
    <summernote [(ngModel)]="text" [options]="options" [disabled]="disabled"></summernote>
    ```

---
# Note:

This module is based on [ng2-summernote](https://github.com/martinsvb/ng2-summernote). I tried forking the repo to fix the issues I was having but decided to start from scratch because it had some things that I didn't need.

