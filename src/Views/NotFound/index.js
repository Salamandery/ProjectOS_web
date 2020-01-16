import React from 'react';

import {
    Container
} from '../../Style';
export default function NotFound() {
    document.title = "404 NOT FOUND";
    return (
        <Container pad="20px">
            <h1> 404 - Not found: Página não encontrada</h1>
        </Container>
    );
}