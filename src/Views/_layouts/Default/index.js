import React from 'react';
import ProtoTypes from 'prop-types';
import {
    Container,
} from './style';
import HeaderHome from '../../../Components/HeaderHome';

const Default = ({children, noHeader}) => {
    return (
        <Container>
            { noHeader === false ? <HeaderHome /> : null }
            {children}
        </Container>
    );
}

Default.propTypes = {
    children: ProtoTypes.element.isRequired
}

export default Default;