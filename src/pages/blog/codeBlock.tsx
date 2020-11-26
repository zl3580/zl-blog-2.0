import React, {  useEffect } from "react";
import PropTypes from "prop-types";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮样式
import { dracula,dark,coy,coldarkDark,atomDark,materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// 设置高亮的语言
import { jsx, javascript, sass, scss } from "react-syntax-highlighter/dist/esm/languages/prism";

const CodeBlock=(props)=>{
  // static propTypes = {
  //   value: PropTypes.string.isRequired,
  //   language: PropTypes.string
  // };

  // static defaultProps = {
  //   language: null
  // };
  
  useEffect(()=>{
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
    SyntaxHighlighter.registerLanguage("sass", sass);
    SyntaxHighlighter.registerLanguage("scss", scss);
  },[])

    const { language, value } = props;
    return (
      <SyntaxHighlighter language={language} style={dracula}>
      {value}
    </SyntaxHighlighter>
    );
}

export default CodeBlock;
