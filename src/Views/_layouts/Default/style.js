import styled from 'styled-components';
import bg from './bg-principal.jpg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: url(${bg});
    background-size: cover;
`;
