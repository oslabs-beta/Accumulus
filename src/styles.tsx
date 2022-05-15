import react from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import myTheme from './globals';

// PALETTE
// DARK GREY: #232323
// LIGHT LILAC: #eae6f0

//---------------------EVERY WHERE ----
export const MainGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
    'nav'
    'pages';
  text-align: center;
  /* grid-gap: 0.25rem; */
  transition: all 0.25s ease-in-out;
  color: white;
  margin: 0px;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  background: transparent;
  border-bottom: 1px solid #dfdfdf;
  /* background-image: linear-gradient(
    to right,
    rgb(208, 177, 228),
  
    rgb(198, 145, 200),
    rgb(219, 149, 195)
  ); */

  /* rgb(219, 149, 195) */
  grid-area: nav;
`;

export const SideBarDiv = styled.div`
  margin-top: 4px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border-right: 1px solid #dfdfdf;
  /* background-image: linear-gradient(
    to bottom,
    rgb(255, 123, 106),
    rgb(233, 143, 91),
    rgb(255, 236, 160)
  ); */
  /* background-image: linear-gradient(
    to bottom,
    rgb(208, 177, 228),
    rgb(198, 145, 200),
    rgb(219, 149, 195)
  ); */
  grid-area: sidebar;
  /* padding: 0.25rem; */
`;
export const Pages = styled.div`
  grid-area: pages;
`;


export const StartedButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  margin: 60px;
  width: 170px;
  height: 70px;
  border-radius: 7px;
  border: none;
  background-color: #a48fc5;
  color: white;
  font-weight: 500;
  font-size: 27px;

  &:hover {
    background-color: #7a6899;
  }
`;



//---------------------LOGIN PAGE------
export const LogRegCont = styled.section`
  background-image: linear-gradient(
    to bottom right,
    white,
    rgb(208, 177, 228),
    rgba(190, 146, 212, 0.964),
    rgb(198, 145, 200),
    rgb(219, 149, 195)
  );
`;
export const LogInWrapper = styled.section`
  border: 1px solid black;
  width: 70%;
  height: 70%;
  border-radius: 7px;
  margin: auto;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  background-color: #eae6f0;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
`;

export const LogInLeft = styled.section`
  align-self: flex-start;
`;

export const LogInHeader = styled.section`
  width: 100vw;
  top: 0;
  left: 0;
  background-color: white;
  text-align: center;
`;
export const LogInBody = styled.section`
  background-image: linear-gradient(
    to bottom right,
    white,
    rgb(208, 177, 228),
    rgba(190, 146, 212, 0.964),
    rgb(198, 145, 200),
    rgb(219, 149, 195)
  );
  /* background: linear-gradient(
    120deg,
    rgb(228, 215, 248) 0%,
    rgba(94, 193, 211, 0.904) 99%
  ); */
  width: 100vw;
  height: 90vh;
  left: 0;
`;
export const H1 = styled.h1`
  font-size: 4em;
  width: 600px;
  padding-left: 50px;
  padding-top: 50px;
`;
export const Text = styled.section`
  width: 400px;
  /* border: 1px solid white; */
  /* padding: 20px; */
  margin: 50px;
  font-size: 1.4em;
`;

export const LogInFooter = styled.section`
  width: 100vw;
  height: 10vh;
  padding-left: 20px;
  padding-bottom: 100px;
  bottom: 0;
  left: 0;
  background-color: #c1b2d8;
  align-self: flex-start;
`;

export const LogInButton = styled.button`
  margin: 30px;
  width: 170px;
  height: 70px;
  border-radius: 7px;
  border: none;
  background-color: #a48fc5;
  color: white;
  font-weight: 500;
  font-size: 27px;

  &:hover {
    background-color: #7a6899;
  }
`;

export const ButtonContainer = styled.section`
  position: relative;
  right: 0;
  top: 5;
`;

// const {
//   default: styled,
//   css,
//   ThemeProvider
// } = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<ThemeInterface>;

// export const Button = styled.button`
//   width: 200px;
//   height: 50px;
//   background-color: ${(props) => props.backgroundColor ? props.backgroundColor : '#ffffff'};
// `;

//------------------Registration-----------------------------
export const RegistrationWrapper = styled.section`
  /* background-image: linear-gradient(to bottom right, white, rgb(208, 177, 228), rgba(190, 146, 212, 0.964), rgb(198, 145, 200), rgb(219, 149, 195)); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  text-align: center;
  padding: 10px;
`;

export const ErrorMessage = styled.section`
  color: red;
  font-size: 0.8em;
`;

//------------------DASHBOARD-----------------------------
export const DashboardWrapper = styled.section`
  /* margin-left: 12%; */
`;

export const GraphContainer = styled.section`
  /* background: #fcf1ff; */
  background: #d3b6e0;
  padding-top: 10px;
  /* width: 100%; */
  height: 250px;
  box-shadow: 2px 2px 2px #d8d8d8;
`;
export const GraphContainered = styled.section`
  background: #eae6f0;
  /* padding: 0.25rem; */
  margin-bottom: 400px;
  margin-right: 200px;
  margin-left: 300px;
  width: 1600px;
  height: 450px;
  box-shadow: 2px 2px 2px #d8d8d8;

  &:hover {
    box-shadow: 3px 3px 7px #828282;
    transition: box-shadow 0.5s ease;
  }
`;


export const DashboardGrid = styled.div`
  display: grid;
  /* height: 66vh; */
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    'sidebar content'
    'sidebar content1'
    'sidebar content2';
  text-align: center;
  /* grid-gap: 0.25rem; */
  transition: all 0.25s ease-in-out;
  color: white;
  margin: 0px;
  /* margin-top: 5px; */
`;


export const Row1GraphBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8px;
  padding-left: 5px;
  padding-top: 5px;
  /* align-items: center; */
  grid-area: content;
  justify-content: center;
`;

export const Row2GraphBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  padding-top: 5px;
  padding-left: 5px;
  /* align-items: center; */
  grid-area: content1;
  justify-content: center;
`;

export const EvenDashGraphBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding-left: 5px;
  padding-top: 5px;
  /* align-items: center; */
  grid-area: content2;
  /* justify-content: center; */
`;

export const DashSideWrapper = styled.div`
  margin-top: 5px;
  margin-bottom: 0;
  color: black;
`;

//--------------------FUNCTIONS & ALLOCATIONS-------------------------

export const FnGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 1fr;
  /* grid-template-rows: 0.02fr 0.5fr 0.75fr 0.1fr; */
  grid-template-areas:
    'sidebar graph';
  grid-gap: 10px;
  transition: all 0.25s ease-in-out;
  color: white;
  margin: 0px;
`;

export const FnGraphContainer = styled.section`
  background: #d3b6e0;
  /* padding: 0.25rem; */
  margin-top: 10px;
  /* margin-right: 10px; */
  width: 100%;
  height: 350px;
  box-shadow: 2px 2px 2px #d8d8d8;
`;


// export const SelectContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 7%;
//   margin-top: 3%;
//   width: 77%;
//   border-radius: 0.6rem;
//   cursor: pointer;
//   `;
  
  
  export const Scroll = styled.div`
    overflow: scroll;
    height: 100vh;
  `;

export const FnSelectButton = styled.button`
  border: none;
  height: 40px;
  width: 80px;
  font-family: 'open sans', sans-serif; 
  font-size: 16;
  font-weight: 500;
  border-radius: 5px;
  /* border: 1px solid #9b4ac6; */
  background-color: #a674c1;
  color: white;
  margin: 5px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  &:hover {
    background: #9b4ac6;
    overflow: visible;
  }
`;
// HOVER??? HOW
export const FnSideBarWrapper = styled.div`
  margin-top: 5px;
  color: #000000;
  /* font-family: 'Fira Sans', sans-serif;  */

`;

//------------------MEMORY-----------------------
export const MemoryGrid = styled.div`
  display: grid;
  /* width: auto; */
  height:auto;
  grid-template-columns: 100px 1fr;
  /* grid-template-rows: 1fr 1fr; */
  /* grid-template-rows: 0.02fr 0.5fr 0.75fr 0.1fr; */
  grid-template-areas:
    'sidebar graph'
    'sidebar reduction';
  grid-gap: 10px;
  /* align-items: start; */
  transition: all 0.25s ease-in-out;
  color: white;
  /* margin: 0px; */
`;

export const MemoryReductionContainer = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: row;
  /* justify-content: flex-start; */
  list-style: none;
  height: 300px;
  grid-area: reduction;
`;

//--------------------NAV-------------------------
export const MainNav = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  /* margin:10px; */

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 20px;
  margin-inline-end: 20px;
  padding-inline-start: 0px;

  li {
    margin-right: 20px;
    /* font-family: 'Roboto'; */
    color: #552a63;
  }
  
  li:nth-child(1) {
    margin-left: 2px;
    font-size: 30px;
  }

  li:nth-child(2) {
    font-family: 'Montserrat Alternates';
    color: #a674c1;
    margin-left: 10px;
    font-size: 55px;
    font-weight: 500;
  }

  li:nth-last-child(3) {
    margin-left: auto;
  }
  /* li:nth-last-child(2) {
    margin-left: auto;
  } */
  li:last-child {
    margin-right: 20px;
  }
`;
export const BasicBtn = styled.button`
  height: 45px;
  width: 140px;
  margin: 0.5rem;
  margin-bottom: 2px;
  font-size: 20px;
  /* font-family: 'Open Sans', sans-serif; */
  font-weight: 500;
  outline: none;
  /* background: #ffffff; */
  background: transparent;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: transparent;
    border: 1px solid #9b4ac6;
    color: #9b4ac6;
    /* box-shadow: 2px 2px 2px #eeeeee; */
  }
`;

export const LogoutBtn = styled.button`
  height: 50px;
  width: 140px;
  font-size: 18px;
  font-weight: 500;
  outline: none;
  background: #9d67ab;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  /* font-family: 'Fira Sans', sans-serif;  */
  cursor: pointer;
`;


export const SideAct = styled.div`
  /* display: flex; */
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  /* font-family: 'Fira Sans', sans-serif;  */
`;

