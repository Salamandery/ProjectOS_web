import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;

    > msg {
        width: 20%;
        color: red;
        padding: 10px;
        margin: 10px;
        border: 1px solid red;
        text-align: center;
    }
`;
export const LoginForm = styled.div`
    margin: auto 0;
    background: #fff;
    padding: 20px 40px;
    width: 25%;
    display: flex;
    color: #fff;
    align-self: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > span {
        margin-bottom: 30px;
        align-self: center;
        color: #333;
        font-size: 44px;
        font-family: sans-serif;
    }
    a {
        text-decoration: none;
        color: #fff;
        &:hover {
            color: #666;
        }
    }
`;
export const Login = styled.button`
    background: #3366ff;
    border-radius: 5px;
    border: 0px;
    align-self: stretch;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    color: #fff;
    font-weight: bold;
    &:hover {
        background: #002699;
        color: #fff;
    }
`;