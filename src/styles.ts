import styled from "styled-components";

import Top from "./assets/Top.png";
import BG from "./assets/Bg.png";

interface DivProps {
  isActive: number;
}

export const Container = styled.div`
height: 100vh;
width: 100%;

flex-direction: column;
align-items: center;
display: flex;

video {
 position: fixed;
 top: 50%;
 left: 50%;
 min-width: 100%;
 min-height: 100%;
 transform: translate(-50%, -50%);
 object-fit: cover;
 z-index: -1;
}

.opacity {
 width: 100%;
 height: 100%;

 background-color: #01183f;
 opacity: 99%;

 position: absolute;
 z-index: 1;
}

.firstPage {
 height: 100%;
 width: fit-content;

 position: relative;
 z-index: 2;

 flex-direction: column;
 align-items: center;
 display: flex;
 
 .Logo {
  width: 17rem;
  height: 7rem;
 }

 h1 {
    font-family: 'Zumme';
    font-weight: 300;
    font-size: 8rem;
    color: #fff;
    margin-top: 2rem;
 }

 .pokeball {
  width: 28rem;

  margin-top: 5rem;
  position: relative;
  align-items: center;

  img {
   width: 100%;
   transition: all.3s ease-in-out;
  }

  .TOP {
    height: 17.42rem;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background-image: url(${Top});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transition: all.3s ease-in-out;

    img {
     height: 16rem;
     width: 16rem;

     position: absolute;
     top: .8rem;
     right: 6rem;

     transition: all.3s ease-in-out;
     filter: saturate(150%);

     opacity: 0;
    }
  }
  .BOTTOM {
    position: absolute;
    top: 9.2rem;
    right: .2rem;

  }
  .SHADOW {
   position: absolute;
    top: 21rem;
    left: 0;
    height: 10rem;
    opacity: 0;
    transform: scale(100%);
    transition: all.3s ease-in-out;
  }
  .LIGHT {
    position: absolute;
    top: 3rem;
    margin-left: 4rem;
    transition: 2.5s ease-in-out;


    height: 20rem;
    width: 20rem;
    opacity: 0;
  }
  &:hover {
    cursor: pointer;

    .TOP, .BOTTOM {
     transform: rotate(2deg);
    }
    .TOP {
     left: .3rem;
     img {
      opacity: 1;
     }
    }
   .SHADOW {
    opacity: 1;
    transform: scale(110%);
   }
  }
 }
}

.me {
 position: absolute;
 bottom: 3rem;
 left: 50%;
 transform: translateX(-50%);
 z-index: 1000;

 p {
  font-family: 'Zummer', sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: .1rem;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
  }
 }
}

&[data-search="true"] {
.firstPage{
.pokeball {
  animation: vibrate-1 0.3s linear infinite both;
.TOP {
 img {
    animation: fade 1s ease-in-out infinite;
 }
}
}

}
}

&[data-stage='2'] {
  .firstPage {
   .pokeball {
    .TOP {
     animation: fadeTop 1.5s ease-in-out forwards;
    }
    .BOTTOM {
      animation: fadeBottom 1.5s ease-in-out forwards;
    }
    .SHADOW {
      display: none;
    }
    .LIGHT {
      transition: 2.5s ease-in-out;
      opacity: 1;
      transform: scale(150%);
    }
   }
  }

 @keyframes fadeTop {
  0% {
    transform: translateY(0) rotate(0);
  }
  100% {
    transform: translateY(-30%) rotate(-10deg) translateX(-5%);
  }
}

@keyframes fadeBottom {
  0% {
    transform: translateY(0) rotate(0);
  }
  100% {
    transform: translateY(30%) rotate(-20deg) translateX(10%);
  }
}
}

&[data-stage='3'] {
  .firstPage {
   .pokeball {
    .TOP {
     animation: fadeTop 1.5s ease-in-out forwards;
    }
    .BOTTOM {
      animation: fadeBottom 1.5s ease-in-out forwards;
    }
    .SHADOW {
      display: none;
    }
    .LIGHT {
      transition: .5s ease-in-out;
      opacity: 1;
      transform: scale(150%);
    }
   }
  }

 @keyframes fadeTop {
  0% {
    transform: translateY(0) rotate(0);
  }
  100% {
    transform: translateY(-30%) rotate(-10deg) translateX(-5%);
  }
}

@keyframes fadeBottom {
  0% {
    transform: translateY(0) rotate(0);
  }
  100% {
    transform: translateY(30%) rotate(-20deg) translateX(10%);
  }
}
}

@keyframes fade {
    0%, 50%, 100% {
    opacity: 1; /* visível */
  }
  25%, 75% {
    opacity: 0; /* invisível */
  }
}

@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}
@media (max-width: 450px) {
  max-height: 100vh;
  overflow: hidden;
  video {
    display: none;
  }

  justify-content: center;
  .firstPage {
    h1 {
      font-size: 5rem;
      text-align: center;

      margin-top: 4rem;
      margin-bottom: 4rem;
    }
  }

  .me {
    position: fixed;
  }
}
`

export const InputWapper = styled.div`
height: 5rem;
  width: 60%;
 
  justify-content: center;
  align-items: center;
  display: flex;

  margin-top: 32rem;
  position: relative;

  input {
   height: 100%;
   width: 0;

   border-radius: 5rem;
   padding: 0 2rem;
   border: none;
   outline: none;

   transition: all.3s ease-in-out;
   font-family: 'Roboto', sans-serif;
   font-weight: 500;
   border: 3px solid #445c74;
   font-size: 1.4rem;
   color: #000;
  }

  .search {
   height: 5rem;
   width: 5rem;

   background-color: #445c74;

   margin-right: -5rem;
   border-radius: 50%;
   border: none;

   transition: all.3s ease-in-out;
   left: 50%;
   transform: translateX(-50%);
   position: absolute;
   z-index: 3;
   top: 0;

   justify-content: center;
   align-items: center;
   display: flex;

   .loading {
    width: 2rem;
    height: 2rem;
   }

   &:hover {
    cursor: pointer;
   }
  }

  &:hover {
    input {
     width: 100%;
    }
   
    .search {
     transform: translateX(0);
     left: 85%;
     right: 5rem;
    }
  }

  &[data-focused="true"] {
    input {
     width: 100%;
    }
   
    .search {
     transform: translateX(0);
     left: 85%;
     right: 5rem;
    }
  }
  &[data-search="true"] {
    .search {
     left: 50%;
     transform: translateX(-50%);
     user-select: none;
     cursor: auto;
    }
    input {
        width: 0;
    }

  }

  @media (max-width: 450px) {
    width: 95%;
  }
`

export const Background = styled.div<DivProps>`
height: 100vh;
width: 100%;

position: absolute;
z-index: 3;

transform: ${({ isActive }) => isActive == 3 ? 'translateY(0)' : 'translateY(100%)'};
transition: ${({ isActive }) => isActive == 3 ? '.5s ease-out' : '1.5s ease-in'};
opacity: ${({ isActive }) => isActive == 3 ? 1 : 0};

@media (max-width: 450px) {
position: fixed;
}
`

export const PokeInfo = styled.div<DivProps>`
height: 100vh;
width: 100%;

position: absolute;
z-index: 4;

background-image: url(${BG});
background-size: cover;

transform: ${({ isActive }) => isActive == 3 ? 'translateX(0)' : 'translateX(100%)'};
transition: ${({ isActive }) => isActive == 3 ? '1.5s ease-out' : '0.2s ease-in'};
opacity: ${({ isActive }) => isActive == 3 ? 1 : 0};
 
flex-direction: column;
align-items: center;
display: flex;

.header {
  width: 100%;

  justify-content: space-between;
  align-items: center;
  display: flex;

 .Logo {
  transform: scale(90%);
 }

 .close {
  height: 5.1rem;
  width: 4.5rem;

  transition: all.2s ease-in-out;
  margin-right: 2rem;

  position: relative;

  .circle1 {
    height: 4rem;
    width: 4rem;

    border-radius: 50%;
    position: relative;
    z-index: 5;

    justify-content: center;
    align-items: center;
    display: flex;

    box-shadow: 1px 17px 12px -7px rgba(0,0,0,0.57);
-webkit-box-shadow: 1px 17px 12px -7px rgba(0,0,0,0.57);
-moz-box-shadow: 1px 17px 12px -7px rgba(0,0,0,0.57);
  }
  .circle2 {
    height: 2.3rem;
    width: 2.3rem;

    border-radius: 50%;
    position: absolute;
    top: 3rem;
    left: -.2rem;
  }

  &:hover {
    transform: scale(105%);
    cursor: pointer;
  }
 }
}

main {
  flex: 1;
  width: 100%;

  padding: 2rem 10rem 7rem 15rem;

  align-items: center;
  display: flex;

  .left {
    flex: 1;

    img {
      height: 50rem;
      width: 50rem;

      transition: all.2s ease-in-out;
      &:hover {
        transform: scale(102%);

      }
    }
  }
  .right {
    flex: 1;

    flex-direction: column;
    display: flex;

    h2 {
     font-family: 'ZummeLight';
     font-size: 5.5rem;
     font-weight: 400;
     color: #FFF;
     text-align: left;
    }

    h1 {
     font-family: 'ZummeBlackI';
     letter-spacing: .1rem;
     line-height: normal;
     font-size: 16rem;
     text-align: left;
     color: #fff;

     margin-top: -2rem;
    }

    p {
      font-family: 'Product';
      font-size: 1.8rem;
      color: #fff;

      display: flex;
      max-width: 40rem;
    }

    h3 {
      font-family: 'Product';
      letter-spacing: .5rem;
      font-size: 1.8rem;
      font-weight: 300;
      color: #fff;

      margin: 2rem 0;
    }

    .elements {
    height: fit-content;
    width: 100%;

    align-items: center;
    display: flex;
    gap: 2rem;

.icon {
    border-radius: 50%;
    border: none;
    height: 9rem;
    width: 9rem;

    transition: 200ms all;

    justify-content: center;
    align-items: center;
    display: flex;
}

.icon:hover{
    filter: saturate(200%);
    transform: scale(1.1);
    cursor: pointer;
}
.icon img {
    height: 50%;
    width: 50%;
}
.bug {
    background: #92BC2C;
    box-shadow: 0 0 20px #92BC2C;
}
.dark {
    background: #595761;
    box-shadow: 0 0 20px #595761;
}
.dragon {
    background: #0C69C8;
    box-shadow: 0 0 20px #0C69C8;
}
.electric {
    background: #F2D94E;
    box-shadow: 0 0 20px #F2D94E;
}
.fire {
    background: #FBA54C;
    box-shadow: 0 0 20px #FBA54C;
}
.fairy {
    background: #EE90E6;
    box-shadow: 0 0 20px #EE90E6;
}
.fighting {
    background: #D3425F;
    box-shadow: 0 0 20px #D3425F;
}
.flying {
    background: #A1BBEC;
    box-shadow: 0 0 20px #A1BBEC;
}
.ghost {
    background: #5F6DBC;
    box-shadow: 0 0 20px #5F6DBC;
}
.grass {
    background: #5FBD58;
    box-shadow: 0 0 20px #5FBD58;
}
.ground {
    background: #DA7C4D;
    box-shadow: 0 0 20px #DA7C4D;
}
.ice {
    background: #75D0C1;
    box-shadow: 0 0 20px #75D0C1;
}
.normal {
    background: #A0A29F;
    box-shadow: 0 0 20px #A0A29F;
}
.poison {
    background: #B763CF;
    box-shadow: 0 0 20px #B763CF;
}
.psychic {
    background: #FA8581;
    box-shadow: 0 0 20px #FA8581;
}
.rock {
    background: #C9BB8A;
    box-shadow: 0 0 20px #C9BB8A;
}
.steel {
    background: #5695A3;
    box-shadow: 0 0 20px #5695A3;
}
.water {
    background: #539DDF;
    box-shadow: 0 0 20px #539DDF;
}

    }

    .evolutions {
      height: fit-content;
      width: 100%;

      align-items: center;
      display: flex;
      gap: 2rem;

      .evo {
        height: 7rem;
        width: 7rem;

        border-radius: 50%;
        border: none;

        transition: all.2s ease-in-out;
        justify-content: center;
        align-items: center;
        display: flex;
        
        img {
          height: 75%;
          width: 75%;
        }

        &:hover {
          filter: saturate(120%);
          transform: scale(1.1);
          cursor: pointer;
        }
      }

      .poke1 {
        height: 7rem;
        width: 7rem;
      }
      .poke2 {
        height: 9rem;
        width: 9rem;
      }
      .poke3 {
        height: 11rem;
        width: 11rem;
      }

      .this {
       border: 2px solid #fff;
      }
    }
  }
}

@media (max-width: 450px) {
  position: fixed;
  height: fit-content;

  .header {

   .Logo {
    transform: scale(80%);
   }

   .close {
    height: 4.8rem;
    width: 4.2rem;
   }
  }

  main {
  flex: 1;
  width: 100%;

  padding: 2rem;

  flex-direction: column;
  align-items: center;
  display: flex;

  .left {
    height: fit-content;
    margin: 0;
    img {
      height: 28rem;
      width: 30rem;
      margin-top: -5rem;
    }
  }
  .right {
    align-items: center;
    gap: 1rem;

    .element {
      display: none;
    }
    h2 {
     font-family: 'ZummeLight';
     font-size: 5rem;
     font-weight: 400;
     color: #FFF;
     text-align: left;
    }

    h1 {
     font-family: 'ZummeBlackI';
     letter-spacing: .1rem;
     line-height: normal;
     font-size: 6rem;
     text-align: left;
     color: #fff;

     margin-top: 0rem;
    }

    p {

      max-width: 30rem;
    }

    h3 {
      font-family: 'Product';
      letter-spacing: .5rem;
      font-size: 1.8rem;
      font-weight: 300;
      color: #fff;

      margin: 1rem 0;
    }

    .elements {
    gap: 1rem;

.icon {
    height: 4rem;
    width: 4rem;
}



    }

    .evolutions {
      height: fit-content;
      width: 100%;

      align-items: center;
      display: flex;
      gap: 2rem;

      .evo {
        height: 7rem;
        width: 7rem;

        border-radius: 50%;
        border: none;

        transition: all.2s ease-in-out;
        justify-content: center;
        align-items: center;
        display: flex;
        
        img {
          height: 75%;
          width: 75%;
        }

        &:hover {
          filter: saturate(120%);
          transform: scale(1.1);
          cursor: pointer;
        }
      }

      .poke1 {
        height: 7rem;
        width: 7rem;
      }
      .poke2 {
        height: 9rem;
        width: 9rem;
      }
      .poke3 {
        height: 11rem;
        width: 11rem;
      }

      .this {
       border: 2px solid #fff;
      }
    }
  }
}
}
`