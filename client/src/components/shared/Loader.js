import React from "react";
import styled, { keyframes } from "styled-components";

const roller = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: inline-block;
  margin: auto;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    animation: ${roller} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;

    :after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff9d00;
      margin: -4px 0 0 -4px;
    }

    :nth-child(1) {
      animation-delay: -0.036s;

      :after {
        left: 63px;
        top: 63px;
      }
    }

    :nth-child(2) {
      animation-delay: -0.072s;

      :after {
        left: 56px;
        top: 68px;
      }
    }

    :nth-child(3) {
      animation-delay: -0.108s;

      :after {
        left: 48px;
        top: 71px;
      }
    }

    :nth-child(4) {
      animation-delay: -0.144s;

      :after {
        left: 40px;
        top: 72px;
      }
    }

    :nth-child(5) {
      animation-delay: -0.18s;

      :after {
        left: 32px;
        top: 71px;
      }
    }

    :nth-child(6) {
      animation-delay: -0.216s;

      :after {
        left: 24px;
        top: 68px;
      }
    }

    :nth-child(7) {
      animation-delay: -0.252s;

      :after {
        left: 17px;
        top: 63px;
      }
    }

    :nth-child(8) {
      animation-delay: -0.288s;

      :after {
        left: 12px;
        top: 56px;
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Container>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Container>
    </Wrapper>
  );
};

export default Loader;
