import React from "react"
import {Chart} from "react-google-charts"

const ShittyGanttChart = props => {
    let extData = [];
    let cIndex = 0;

    for(let x of props.seq) {
        let startDate = new Date(cIndex);
        let endDate = new Date(cIndex + 1);
        let current = [
            `${cIndex}-${x}`,
            `P${x}`,
            `p${x}`,
            startDate,
            endDate,
            1,
            100,
            null
        ];
        extData.push(current);
        cIndex++;
    }

    return (
        <Chart
            width={'100%'}
            height={'100%'}
            chartType='Gantt'
            loader={<div>Loading Chart...</div>}
            data={
            [
                [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'string', label: 'Resource' },
                    { type: 'date', label: 'Start Date' },
                    { type: 'date', label: 'End Date' },
                    { type: 'number', label: 'Duration' },
                    { type: 'number', label: 'Percent Complete' },
                    { type: 'string', label: 'Dependencies' },
                ],
                ...extData
            ]}
        />  
    )
}

export default ShittyGanttChart