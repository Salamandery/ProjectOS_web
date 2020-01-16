import styled from 'styled-components';
import {
    Container
} from '../../Style';
import bg from './img/bg.jpg';

export const ContentMV = styled(Container)`
    background: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
`;