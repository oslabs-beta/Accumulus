 import {createGlobalStyle} from "styled-components"

 const GlobalStyle = createGlobalStyle`
    *{
        /* margin: 0; */
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
        /* padding: 0; */
        outline:0;
        box-sizing:border-box;
        font-family: 'Quicksand', sans-serif; 
    }
    #root{
        margin:0 auto;
    }
 `

 export default GlobalStyle;