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
  Inject,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SimplemdeConfig, SimplemdeOptions } from './config';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'simplemde',
  template: ` <textarea #con></textarea> `,
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
  @ViewChild('con') private con: ElementRef<HTMLElement>;
  private instance: any;
  private value: string;

  private onChange: (value: string) => void;

  @Input() options: SimplemdeOptions;
  /** 风格，默认：`antd` */
  @Input() style: 'default' | 'antd';
  /** 延迟初始化 */
  @Input() delay: number;
  @Input() disabled: boolean;

  get Instance(): any {
    return this.instance;
  }

  /**
   * Call [setOption](https://codemirror.net/doc/manual.html#setOption) method of Codemirror.
   */
  setOptions(option: string, value: any): void {
    if (!this.instance) {
      return;
    }
    this.instance.codemirror.setOption(option, value);
  }

  private _getWin(): any {
    return this.doc.defaultView || window;
  }

  constructor(
    private cog: SimplemdeConfig,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc: any,
  ) {
    cog = { ...new SimplemdeConfig(), ...cog };
    this.style = cog.style;
    this.delay = cog.delay || 0;
  }

  private initDelay(): void {
    if (!(typeof document === 'object' && !!document)) {
      return;
    }
    if (this.delay > 0) {
      setTimeout(() => this.init(), this.delay);
    } else {
      this.init();
    }
  }

  private init(): void {
    const win = this._getWin();
    if (typeof win.SimpleMDE === 'undefined') {
      throw new Error(`Could not find SimpleMDE object.`);
    }
    this.destroy();
    const config: SimplemdeOptions = {
      ...this.cog,
      ...this.options,
      ...(this.style === 'antd'
        ? {
            spellChecker: false,
            autoDownloadFontAwesome: false,
          }
        : {}),
    };
    config.element = this.con.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.instance = new win.SimpleMDE(config);
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

  private destroy(): void {
    if (this.instance) {
      this.instance.toTextArea();
      this.instance = null;
    }
  }

  private setDisable(): void {
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
    if (changes.options && !changes.options.firstChange) {
      this.initDelay();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
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
