export class SimplemdeConfig {
  /**
   * 风格，默认：`antd`
   */
  style?: 'default' | 'antd' = 'antd';
  /**
   * 延迟初始化
   */
  delay?: number;
  /** 全局 `options` */
  options?: { [key: string]: any };
}
