import styled from "styled-components";

export const Button = styled.button`
  background: grey;
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  width: 250px;
  border-radius: 10px;
  box-sizing: border-box;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid grey;
  outline: none;
  font-size: 1rem;
  padding: 10px 15px;
  width: 250px;
  box-sizing: border-box;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 20px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 50px;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20%;
`;

export const ErrorText = styled.div`
  color: red;
  width: 250px;
`;

export const Title = styled.h2``;
