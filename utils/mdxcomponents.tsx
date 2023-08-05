import React, { PropsWithChildren } from "react";

// MDX 파일에 주입하여 해당 파일에서 컴포넌트를 사용할 수 있게 해줌.

const Button = (props: PropsWithChildren) => (
  <button {...props} style={{backgroundColor:"blue",borderRadius:"5px",color:"white",padding:"2px 10px"}}  >{props.children}</button>
 );
 
 const MDXComponents = {
   Button,
 };

export default MDXComponents;