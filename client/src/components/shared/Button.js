import styled from "styled-components";

const Button = styled.button`
  -webkit-appearance: none;
  appearance: none;
  background-color: #ec8f39;
  border: 0;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  padding: 0.7em 0.85em;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.25s, box-shadow 0.25s, color 0.25s,
    transform 0.25s;
  vertical-align: middle;
  width: 100%;

  :disabled {
    background-color: #cccccc;
    color: #555555;

    :hover {
      cursor: not-allowed;
    }
  }
`;

export default Button;
