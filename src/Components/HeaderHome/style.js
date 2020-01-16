import styled from 'styled-components';

export const Link = styled.a`
    text-align: center;
    text-decoration: none;
    padding: 0px 15px;
    color: #e6e6e6;
    font-weight: bold;
    font-size: ${props => props.fSize};

    &:hover {
        color: #fff;
    }
`;

export const NavBar = styled.div`
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    background: #0059b3;
`;
