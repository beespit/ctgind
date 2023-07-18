import { createGlobalStyle } from 'styled-components';

import localFont from 'next/font/local'



const GlobalStyle = createGlobalStyle`
//fonts


@font-face{
  font-family: windsor;
  src: url('/fonts/windsor.woff');
  src: url('/fonts/windsor.woff2');
  font-weight: normal;
}

html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline-offset: -1px;
}
*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
  outline-offset: -1px;
  }

a{
  text-decoration: none;
  color: inherit;
}


body{
  margin: 0;

  &.nav-switch {
    .fixnav{
      position: fixed;
      width: calc(100% - var(--Margin) * 2);
      z-index: 13;
    }
  }

  &.nav-switch2 {
    .fixnav{
      position: absolute;
      width: calc(100% - var(--Margin) * 2);
      z-index: 13;
    }

    .fixfoot{
      position: absolute;
      width: calc(100% - var(--Margin) * 2);
      bottom: 0;
    }
  }

  &.nav-switch3 {


  }
}

:root{
  --Margin: 30px;

  @media(max-width: 900px){
    --Margin: 20px;
  }
}

html, body, ul{
  margin: 0;
  padding: 0;
}

ul, li{
  text-decoration: none;
  list-style: none;
}

button{
  :hover{
    cursor: pointer;
  }
}

.fixed{
  position: fixed;
  width: calc(100% - var(--Margin) * 2);
  z-index: 13;
}

.noOutline{
  outline: none;
  div{
    outline: none;
  }
}



.activeCart{
  div{
  background-color: #000;
  }
  img{
  filter: invert(1);
  }
}

.player-wrapper {
  position: relative;
  padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
}

.react-player {
  position: absolute;
  outline: 2px solid;
}

.videxpand{
  padding-bottom: 56.25%;
}

.underline{
a{
    text-decoration: underline !important;
  }
}

.threeD{
  div{
  width: 100%;
  height: 500px !important;
  }
}

`



export default GlobalStyle
