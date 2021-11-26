import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from "react-loader-spinner";

const StyledContainer = styled.div `
  position: relative;
`;
const StyledMainDiv = styled.div `
    margin: auto;
    width: 50%;
    text-align:center;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 25%;

    @media only screen and (max-width: 992px) {
      width: 100%;
      left: 0;
    }
`;

const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

const StyledFormRow = styled.div `
    display: flex;
    padding: 20px;
`;

const StyledLoader = styled.div `
  text-align:center;
`;

const StyledLabel = styled.label `
  padding-left: 5px;
  font-size: 24px;

  @media only screen and (max-width: 992px) {
    font-size: 15px;
  }
`;

const StyledInput = styled.input `
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
  &:focus {
    outline: none;
  }

  width: ${props => props.width};
`;

const StyledHeadlinePrimary = styled.h1 `
    font-size: 35px;
    font-weight: 300;
    letter-spacing: 2px;
`;

const StyledButton = styled.button `
  background: transparent;
  border: 1px solid #171212;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    background: #171212;
    color: #ffffff;
    fill: #ffffff;
    stroke: #ffffff;
  }
`;

const StyledModal = styled.div `
  background-color: transparent;
  z-index: 9;
  margin: 20px;
  height: 520px;
  text-align: center;

  p {
    margin: 0;
    width: 10%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    background-color: #171212;
    opacity: 0.3;
    padding: 10px;
  }
`;

const endpoint = 'http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/'

const registerReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_POST_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'REGISTER_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.key
      };
    case 'REGISTER_POST_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state
  }
}

const Register = () => {

    const [email, setEmail] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [register, dispatchRegister] = React.useReducer(
      registerReducer,
      {data: null, isError: false, isLoading: false}
    )

    const handleEmailChange = e => {
      setEmail(e.target.value);
    };

    const handlePassword1Change = e => {
      setPassword1(e.target.value);
    };

    const handlePassword2Change = e => {
      setPassword2(e.target.value);
    };

    const handleSubmit = e => {
      const data = {
        'email' : e.target.email.value,
        'password1' : e.target.password1.value,
        'password2' : e.target.password2.value
      }
      handlePostRegister(data);
      e.preventDefault();
    }

    const handlePostRegister = data => {
      dispatchRegister({type: 'REGISTER_POST_INIT'})
      axios.post(endpoint, data)
        .then(res => {
          dispatchRegister({
            type: 'REGISTER_POST_SUCCESS',
            payload: res.data
          });
        })
        .catch(e => {
          dispatchRegister({
            type: 'REGISTER_POST_SUCCESS',
            payload: e.response
          })
        });
    }

    return (
      <StyledContainer>
        <StyledMainDiv>
            <StyledHeadlinePrimary>Register</StyledHeadlinePrimary>
            <StyledForm onSubmit={handleSubmit}>
                <StyledFormRow>
                <StyledLabel>Email : </StyledLabel>
                <StyledInput
                  width="81%"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                </StyledFormRow>
                <StyledFormRow>
                <StyledLabel>Password : </StyledLabel>
                <StyledInput
                  width="75%"
                  type="password"
                  name="password1"
                  value={password1}
                  onChange={handlePassword1Change}
                />
                </StyledFormRow>
                <StyledFormRow>
                <StyledLabel>Password again : </StyledLabel>
                <StyledInput
                  width="66%"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={handlePassword2Change}
                />
                </StyledFormRow>
                <StyledFormRow>
                    <StyledButton type="submit">Register</StyledButton>
                </StyledFormRow>
            </StyledForm>
        </StyledMainDiv>
      </StyledContainer>
    )
}

const Modal = () => {

  const [, spinnerLoading] = React.useState(true);

  return (
    <StyledModal>
      <p>
      <StyledLoader>
            <Loader
              type="TailSpin"
              color="white"
              height={60}
              width={60}
              visible={spinnerLoading}
            />
          </StyledLoader> 
      </p>
    </StyledModal>
  )
}

export default Register;