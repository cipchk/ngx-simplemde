import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SimplemdeModule } from './module';
import { SimplemdeComponent } from './component';
import { By } from '@angular/platform-browser';

describe('Component: ngx-simplemde', () => {
  let fixture: ComponentFixture<any>;
  let context: TestNGComponent;
  let page: PageObject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SimplemdeModule.forRoot()],
      declarations: [TestNGComponent],
    });
    fixture = TestBed.createComponent(TestNGComponent);
    context = fixture.componentInstance;
    page = new PageObject();
    fixture.detectChanges();
  });
  afterEach(() => context.comp.ngOnDestroy());

  it('should be renderer', () => {
    page.checkCount();
  });

  it('should be change value via ngModel', fakeAsync(() => {
    spyOn(context.comp.Instance, 'value');
    context.value = 'test';
    fixture.detectChanges();
    tick();
    expect(context.comp.Instance.value).toHaveBeenCalled();
  }));

  it('should be throw error when not found SimpleMDE object', () => {
    expect(() => {
      delete (window as any).SimpleMDE;
      context.options = {};
      fixture.detectChanges();
    }).toThrowError(`Could not find SimpleMDE object.`);
  });

  class PageObject {
    getEl(cls: string): DebugElement {
      return fixture.debugElement.query(By.css(cls));
    }
    checkCount(cls: string = '.CodeMirror', num: number = 1): this {
      expect(document.querySelectorAll(cls).length).toBe(num);
      return this;
    }
  }
});

@Component({
  template:
    '<simplemde #comp [(ngModel)]="value" (ngModelChange)="change($event)" [options]="options"></simplemde>',
})
class TestNGComponent {
  @ViewChild('comp') comp: SimplemdeComponent;
  value: string;
  options: any;
  change(_: string): void {}
}
