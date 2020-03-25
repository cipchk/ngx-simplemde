export class SimplemdeConfig {
  /**
   * 风格，默认：`antd`
   */
  style?: 'default' | 'antd' = 'antd';
  /**
   * 延迟初始化
   */
  delay?: number;
  /**
   * [Simplemde configuration](https://github.com/sparksuite/simplemde-markdown-editor#configuration)
   */
  options?: SimplemdeOptions;
}

export interface SimplemdeOptions {
  [key: string]: any;

  /**
   * Saves the text that's being written and will load it back in the future. It will forget the text when the form it's contained in is submitted.
   *
   * - **enabled**: If set to `true`, autosave the text. Defaults to `false`.
   * - **delay**: Delay between saves, in milliseconds. Defaults to `10000` (10s).
   * - **uniqueId**: You must set a unique string identifier so that SimpleMDE can autosave. Something that separates this from other instances of SimpleMDE elsewhere on your website.
   */
  autosave?: { enabled?: boolean; uniqueId?: string; delay?: number };

  /**
   * Customize how certain buttons that style blocks of text behave.
   *
   * - **bold** Can be set to `**` or `__`. Defaults to `**`.
   * - **code** Can be set to  ```` ``` ```` or `~~~`.  Defaults to ```` ``` ````.
   * - **italic** Can be set to `*` or `_`. Defaults to `*`.
   */
  blockStyles?: { bold?: string; code?: string; italic?: string };

  /**
   * If set to `true`, force text changes made in SimpleMDE to be immediately stored in original textarea. Defaults to `false`.
   */
  forceSync?: boolean;

  /**
   * An array of icon names to hide. Can be used to hide specific icons shown by default without completely customizing the toolbar.
   */
  hideIcons?: string[];

  /**
   * If set to `false`, indent using spaces instead of tabs. Defaults to `true`.
   */
  indentWithTabs?: boolean;

  /**
   * Customize how certain buttons that insert text behave. Takes an array with two elements. The first element will be the text inserted before the cursor or highlight, and the second element will be inserted after. For example, this is the default link value: `["[", "](http://)"]`.
   */
  insertTexts?: {
    horizontalRule?: string[];
    image?: string[];
    link?: string[];
    table?: string[];
  };

  /**
   * Adjust settings for parsing the Markdown during editing (not previewing).
   * - **allowAtxHeaderWithoutSpace**: If set to `true`, will render headers without a space after the `#`. Defaults to `false`.
   * - **strikethrough**: If set to `false`, will not process GFM strikethrough syntax. Defaults to `true`.
   * - **underscoresBreakWords**: If set to `true`, let underscores be a delimiter for separating words. Defaults to `false`.
   */
  parsingConfig?: {
    allowAtxHeaderWithoutSpace?: boolean;
    strikethrough?: boolean;
    underscoresBreakWords?: boolean;
  };

  /**
   * Custom placeholder that should be displayed
   */
  placeholder?: string;

  /**
   * Custom function for parsing the plaintext Markdown and returning HTML. Used when user previews.
   */
  previewRender?: (plainText: string, preview?: HTMLElement) => string;

  /**
   * If set to `true`, a JS alert window appears asking for the link or image URL. Defaults to `false`.
   */
  promptURLs?: boolean;

  /**
   * Adjust settings for parsing the Markdown during previewing (not editing).
   * - **singleLineBreaks**: If set to `false`, disable parsing GFM single line breaks. Defaults to `true`.
   * - **codeSyntaxHighlighting**: If set to `true`, will highlight using [highlight.js](https://github.com/isagalaev/highlight.js). Defaults to `false`. To use this feature you must include highlight.js on your page. For example, include the script and the CSS files like:<br>`<script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>`<br>`<link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css">`
   */
  renderingConfig?: {
    singleLineBreaks?: boolean;
    codeSyntaxHighlighting?: boolean;
  };

  /**
   * Keyboard shortcuts associated with this instance. Defaults to the [array of shortcuts](https://github.com/sparksuite/simplemde-markdown-editor#keyboard-shortcuts).
   */
  shortcuts?: { [key: string]: any };

  /**
   * An array of icon names to show. Can be used to show specific icons hidden by default without completely customizing the toolbar.
   */
  showIcons?: string[];

  /**
   * If set to `false`, disable the spell checker. Defaults to `true`.
   */
  spellChecker?: boolean;

  /**
   * If set to `false`, hide the status bar. Defaults to the array of built-in status bar items.
   * - Optionally, you can set an array of status bar items to include, and in what order. You can even define your own custom status bar items.
   */
  status?: any;

  /**
   * If set to `false`, remove the `CodeMirror-selectedtext` class from selected lines. Defaults to `true`.
   */
  styleSelectedText?: boolean;

  /**
   * If set, customize the tab size. Defaults to `2`.
   */
  tabSize?: number;

  /**
   * If set to `false`, hide the toolbar. Defaults to the [array of icons](#toolbar-icons).
   */
  toolbar?: boolean;

  /**
   * If set to `false`, disable toolbar button tips. Defaults to `true`.
   */
  toolbarTips?: boolean;
}
