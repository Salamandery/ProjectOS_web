import React from 'react';
import {
    Container
} from '../../Style';
import { Bar, Chart } from 'react-chartjs-2';

export default function GraphBar({data, title}) {
    Chart.defaults.global.responsive = true;

    const options = {
        legend: {
            display: false
        },
        animation: {
            onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "black";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset)
                {
                    for (var i = 0; i < dataset.data.length; i++) {
                        for(var key in dataset._meta)
                        {
                            var model = dataset._meta[key].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 5);
                        }
                    }
                });
            }
        }
    };
    return (
        <Container w="100%" h="100%" direction="column" items="center" style={{position: "relative"}}>
            <h3 style={{paddingBottom: 15}}>{title}</h3>
            <Bar 
                options={options}
                width={100}
                height={38}
                data={data}
            />
        </Container>
    );
}
