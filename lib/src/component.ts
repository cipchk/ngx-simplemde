import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
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
  template: `
    <textarea #con></textarea>
  `,
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

  @Input() options: any;
  /** 风格，默认：`antd` */
  @Input() style: 'default' | 'antd';
  /** 延迟初始化 */
  @Input() delay: number;
  @Input() disabled: boolean;

  constructor(private cog: SimplemdeConfig, private zone: NgZone) {
    cog = { ...new SimplemdeConfig(), ...cog };
    this.style = cog.style;
    this.delay = cog.delay || 0;
  }

  private initDelay() {
    if (this.delay > 0) {
      setTimeout(() => this.init(), this.delay);
    } else {
      this.init();
    }
  }

  private init() {
    if (typeof SimpleMDE === 'undefined') {
      throw new Error(`Could not find SimpleMDE object.`);
    }
    this.destroy();
    const config = Object.assign(
      {},
      this.cog,
      this.options,
      this.style === 'antd'
        ? {
            spellChecker: false,
            autoDownloadFontAwesome: false,
          }
        : {},
    );
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
      this.setDisable();
    });
  }

  private destroy() {
    if (this.instance) {
      this.instance.toTextArea();
      this.instance = null;
    }
  }

  private setDisable() {
    if (this.instance) {
      this.zone.runOutsideAngular(
        () => (this.instance.codemirror.options.readOnly = this.disabled),
      );
    }
  }

  ngAfterViewInit(): void {
    this.initDelay();
  }

  ngOnChanges(
    changes: { [P in keyof this]?: SimpleChange } & SimpleChanges,
  ): void {
    if (changes.options && !changes.options.firstChange) this.initDelay();
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
    this.initDelay();
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

  registerOnTouched(_fn: () => {}): void {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.setDisable();
  }
}
