import React from 'react';
import {
    Container
} from '../../Style';
import { Doughnut } from 'react-chartjs-2';

export default function GraphVel({data, title}) {
    
    return (
        <Container w="100%" h="100%" direction="column" items="center" style={{position: "relative"}}>
            <h3 style={{paddingBottom: 15}}>{title}</h3>
            <Doughnut 
                options={data.options}
                width={100}
                height={40}
                data={data}
            />
        </Container>
    );
}
