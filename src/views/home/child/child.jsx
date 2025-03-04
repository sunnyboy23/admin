import { useEffect, useRef } from "react"
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

export default function Child() {
    let dom = useRef();

    useEffect(() => {
            init( [
                { value: 484, name: '会员总数' },
                { value: 300, name: '代理总数' },
                { value: 100, name: '浏览总数' },
            ])
        
    }, [])

    const init = (data) =>{
        let myChart = echarts.init(dom.current);

        myChart.setOption({
            title: {
                text: '会员与代理数据',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data:data,
                }
            ]
        });
    }
    return (
        <div ref={dom} style={{ width: 500, height: 500 }}>

        </div>
    )
}
