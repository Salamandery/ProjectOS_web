import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-self: stretch;
    width: 100%;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    color: #fff;
    padding: 0px 15px;
    background: #0059b3;
`;
export const Intranet = styled.button`
    background: transparent;
    border: 0;
    text-decoration: none;
    align-self: center;
    color: #e6e6e6;
    font-size: 28px;
    font-family: sans-serif;
    font-weight: bold;

    &:hover {
        color: #fff;
    }
`;
export const User = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 5px;
    align-items: center;
`;
export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 5px;
`;
export const Username = styled.p`
    color: #fff;
    font-weight: bold;
`;
export const ButtonPerfil = styled.button`
    background: transparent;
    border: 0;
    color: #e6e6e6;
    text-decoration: none;
    
    &:hover {
        color: #fff;
        cursor: pointer;
    }
`;
export const Sair = styled.button`
    background: #cc0000;
    height: 36px;
    border-radius: 5px;
    border: 0px;
    margin: 5px;
    padding: 5px 20px;
    color: #fff;
    font-weight: bold;
    &:hover {
        background: #800033;
        color: #fff;
    }
`;