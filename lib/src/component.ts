import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  NgZone,
  ViewChild,
  SimpleChange,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SimplemdeConfig } from './config';

declare const SimpleMDE: any;

@Component({
  selector: 'simplemde',
  template: `<textarea #con></textarea>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimplemdeComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplemdeComponent
  implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  @ViewChild('con') private con: ElementRef;
  private instance: any;
  private value: string;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  @Input() options: any;

  constructor(
    private cog: SimplemdeConfig,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
  ) {}

  private init() {
    if (typeof SimpleMDE === 'undefined') {
      throw new Error(`Could not find SimpleMDE object.`);
    }
    this.destroy();
    const config = { ...this.cog, ...this.options };
    config.element = this.con.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.instance = new SimpleMDE(config);
      if (this.value) {
        this.instance.value(this.value);
      }
      this.instance.codemirror.on('change', () => {
        this.value = this.instance.value();
        this.zone.run(() => this.onChange(this.value));
      });
    });
  }

  private destroy() {
    if (this.instance) {
      this.instance.toTextArea();
      this.instance = null;
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnChanges(
    changes: { [P in keyof this]?: SimpleChange } & SimpleChanges,
  ): void {
    if (!changes.options.firstChange) this.init();
  }

  /**
   * 获取UE实例
   *
   * @readonly
   */
  get Instance(): any {
    return this.instance;
  }

  ngOnDestroy() {
    this.destroy();
  }

  // reuse-tab: http://ng-alain.com/components/reuse-tab#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F
  _onReuseInit() {
    this.init();
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.instance) {
      this.instance.value(this.value);
    }
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
