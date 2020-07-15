/**
 * find more available plugins here:
 * - https://www.npmjs.com/search?q=%40editorjs
 * - or https://github.com/editor-js
 *
 * or create your own: https://editorjs.io/the-first-plugin
 */
// import CheckList from '@editorjs/checklist'
import Checklist from "./checklist/index";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
//import Image from '@editorjs/image'
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
// import Quote from '@editorjs/quote'
import Quote from "./quote/index";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
// import Warning from "@editorjs/warning";
const Marker = require("@editorjs/marker");
const Underline = require("@editorjs/underline");


export const TOOLS = {
  image: SimpleImage,
  table: Table,
  embed: Embed,
  list: { class: List, inlineToolbar: true },
  code: Code,
  quote: {class: Quote, inlineToolbar: true},
  Marker: {
    class: Marker,
    shortcut: "CMD+M",
  },
  checklist: Checklist,
  delimiter: Delimiter,
  InlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C"
  },
  Underline: {
    class: Underline,
    shortcut: "CMD+U"
  }
};
