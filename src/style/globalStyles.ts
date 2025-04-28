import { createGlobalStyle } from 'styled-components';

import ZummeFont from "../assets/zuume-cut-regular.otf";
import ZummeFontLight from "../assets/zuume-cut-extralight.otf";
import ZummeFontBlackI from "../assets/zuume-cut-black-italic.otf";
import ProductFont from "../assets/Product Sans Regular.ttf";

export default createGlobalStyle`
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

@font-face {
    font-family: 'Zumme';
    src: url(${ZummeFont}) format('opentype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'ZummeLight';
    src: url(${ZummeFontLight}) format('opentype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'ZummeBlackI';
    src: url(${ZummeFontBlackI}) format('opentype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Product';
    src: url(${ProductFont}) format('opentype');
    font-weight: normal;
    font-style: normal;
}

:root {
 font-size: 62.5%;
}

body {
 max-height: 100vh;
 min-height: 100vh;
 width: 100%;

 overflow: hidden;
}

.swal1 {
 font-family: 'Roboto', sans-serif;
 font-size: 1.1rem;

 flex-direction: row;
 display: flex;

 .swal2-title {
  display: flex;
 }
}

.swal2-popup {
 display: flex;
}
`