import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import Button from "#components/shared/Button";
import firebaseApp from "#root/firebase";

const ButtonWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
`;

const InnerForm = styled.form`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: auto;
  width: 20rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 0.25rem;
  width: 100%;
`;

const SignInWrapper = styled.div`
  margin-top: 1rem;
`;

const TextInput = styled.input`
  appearance: none;
  background: white;
  border: 0.0625em solid #cccccc;
  border-radius: 0.125em;
  box-sizing: border-box;
  display: block;
  font-size: 1rem;
  font-weight: 300;
  height: 2.5em;
  line-height: 1.25;
  padding: 0.5em 0.55em;
  transition: background-color 0.25s, border-color 0.25s, color 0.25s;
  width: 100%;

  :focus {
    border-color: #3c72ff;
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SignUp = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register
  } = useForm({ mode: "onChange" });

  const onSubmit = async ({ email, password }) => {
    try {
      await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
      setShouldRedirect(true);
    } catch (error) {
      alert(error);
    }
  };

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <InnerForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <TextInput
            autoFocus
            data-testid="email"
            disabled={isSubmitting}
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
            size="lg"
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            data-testid="password"
            disabled={isSubmitting}
            name="password"
            placeholder="Password"
            ref={register({ required: true })}
            type="password"
            size="lg"
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            block
            color="primary"
            data-testid="sign-up"
            disabled={isSubmitting || !isValid}
            size="lg"
            type="submit"
          >
            Sign Up
          </Button>
        </ButtonWrapper>
        <SignInWrapper>
          Already have an account? - <Link to="/login">Sign In</Link>
        </SignInWrapper>
      </InnerForm>
    </Wrapper>
  );
};

export default SignUp;
