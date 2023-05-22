import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 100%;
  margin: 0px 0px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  min-height: 8vh;
  padding: 20px;
  color: black;
  font-family: "Poppins", sans-serif;
  background-color: #d3d3d3;
  align-items: center;

  .logo {
    font-size: 30px;
    text-align: left;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    gap: 2rem;
  }

  li {
    list-style: none;
  }
  .nav {
    width: 40%;
  }

  /* @media screen and (max-width: 1024px) {
    .nav {
      width: 60%;
      font-size: 23px;
    }
  }

  @media screen and (max-width: 768px) {
    #root {
      overflow-x: hidden;
    }

    .nav {
      position: absolute;
      right: 0px;
      height: 120vh;
      top: 20vh;
      background-color: #2ec1ac;
      color: #fff;
      width: 50%;
      transform: translateX(100%);
      transition: transform 0.5s ease-in;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    li {
      padding: 10%;
      opacity: 0;
    }
    .burger {
      display: block;
    }

    .nav-active {
      nav {
        transform: translateX(100%);
      }
      li {
        opacity: 1;
      }
    }

    .nav-active {
      transform: translateX(0%);
    }
  } */
`;

export const Button = styled.button`
  background: grey;
  border: none;
  color: white;
  border-radius: 6px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
`;
