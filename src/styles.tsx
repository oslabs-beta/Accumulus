import react from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import myTheme from './globals';

// PALETTE
// DARK GREY: #232323
// LIGHT LILAC: #eae6f0

//---------------------EVERY WHERE ----
export const HeaderLabel = styled.h1`
  font-family: 'Roboto, sans-serif';
  font-weight: '300';
  color: '#232323';
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
  margin-left: 12%;
`;

// export const DashboardGrid = styled.section`
//   display: grid, inline-grid;
//   grid-template-columns:
//     repeat(3, 1fr)
//     auto;
//   grid-template-rows: auto;
//   gap: 20px;
//   background-color: #c4e1e3;
// `;

export const GraphContainer = styled.section`
  background: #eae6f0;
  /* padding: 0.25rem; */
  padding-top: 10px;
  width: 100%;
  height: 350px;
  box-shadow: 2px 2px 2px #d8d8d8;
  transition: height 0s 10000s;
  &:focus {
    height: 500px;
    color: #419e41;
    transition: height 0s;
  };
  /* &:hover {
    box-shadow: 3px 3px 7px #828282;
    transition: box-shadow 0.5s ease;
  } */
`;
export const GraphContainered = styled.section`
  /* grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 3; */
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


// grid-column: ${props => props.gridColumn};
// grid-row: ${(props: Props) => props.gridRow};

// export { css, ThemeProvider };
// export default styled;

export const DashboardGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.1fr 0.75fr 0.75fr 0.75fr;
  grid-template-rows: 0.02fr 0.75fr 0.75fr 0.1fr;
  grid-template-areas:
    'sidebar nav nav nav'
    'sidebar content content content'
    'sidebar content1 content1 content1'
    'sidebar content2 content2 content2'
    'footer footer footer footer';
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  color: white;
  margin: 0px;
`;
export const Header = styled.nav`
  display: flex;
  align-items: center;
  background: white;
  color: #232323;
  grid-area: nav;
  padding: 0.25rem;
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  /* padding: 20px; */
`;

export const DashSideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #232323;
  grid-area: sidebar;
  padding: 0.25rem;
`;

export const Row1GraphBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.85rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
`;

export const Row2GraphBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.85rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content1;
  justify-content: center;
`;

export const EvenDashGraphBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.85rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content2;
  justify-content: center;
`;

/* export const Content1 = styled.div`
  background: #a6b8b9;
  width: 100%;
  height: 100%;
`;
const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;
const Footer = styled.footer`
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
`; */

//--------------------FUNCTIONS & ALLOCATIONS-------------------------

export const FnGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0.1fr 0.1fr 0.75fr;
  /* grid-template-rows: 0.02fr 0.75fr 0.75fr 0.1fr; */
  grid-template-areas:
    'sidebar  fnbar graph'
    'sidebar fnbar  graph';
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  color: white;
  margin: 0px;
`;

export const FnGraphContainer = styled.section`
  background: #eae6f0;
  /* padding: 0.25rem; */
  padding-top: 10px;
  width: 100%;
  height: 350px;
  box-shadow: 2px 2px 2px #d8d8d8;
`;


export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 7%;
  margin-top: 3%;
  width: 77%;
  border-radius: 0.6rem;
  cursor: pointer;
  `;
  
  export const FnSideBar = styled.div`
    padding-top: 200px;
    display: flex;
    flex-direction: column;
    background: #ab71b9;
    grid-area: fnbar;
    padding: 0.25rem;
  `;
  
  export const Scroll = styled.div`
    overflow: scroll;
    height: 100vh;
  `;

export const FnSelectButton = styled.button`
  border: 1px solid white;
  height: 50px;
  width: 120px;
  border-radius: 5px;
  background-color: white;
  margin: 5px;
`;
// HOVER??? HOW

export const ContainerLabel = styled.div`
  /* margin-left: 1.7rem;
  font-size: 0.9rem;
  color: colors.$navText; */
`;

//--------------------SIDEBAR-------------------------
export const MainNav = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  list-style: none;
  
  li:nth-last-child(2) {
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 620%;
  }

 
  li:last-child {
    margin-top: auto;
    margin-bottom: 30px;
  }
`;
export const BasicBtn = styled.button`
  height: 70px;
  width: 130px;
  /* margin: 0.5rem; */
  /* border-radius: 5px; */
  /* padding: 12px 26px; */
  font-size: 20px;
  outline: none;
  background: #232323;
  color: white;
  border: 1px solid #232323;
  cursor: pointer;
`;

export const SideAct = styled.div`
  /* display: flex; */
  font-size: 20px;
  color: white;
  /* margin-top: auto; */
`;

