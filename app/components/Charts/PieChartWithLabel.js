import React from 'react'
import { Dimensions,View} from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line,Image,Text } from 'react-native-svg'
import colors from '../../config/colors';

class PieChartWithLabel extends React.PureComponent {
   
    render() {

        const data = this.props.data
       
        const array=this.props.icon
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: randomColor() },
                key: `pie-${index}`,
            }))

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={ index } >
                        <Line
                            x1={ labelCentroid[ 0 ] }
                            y1={ labelCentroid[ 1 ] }
                            x2={ pieCentroid[ 0 ] }
                            y2={ pieCentroid[ 1 ] }
                            stroke={ data.svg.fill }
                        />
                        
                        
                       
                       <Image 
                        x={labelCentroid[ 0 ]-15}
                        y={labelCentroid[ 1 ]-15}
                        preserveAspectRatio="xMidYMid slice"
                       width={30}
                       height={30}
                       href={array[index]}>

                       </Image>
                       
                       
                    </G>
                )
            })
        }

        return (
           
                
                 <PieChart
                style={ { height: 200,width:200} }
                data={ pieData }
                innerRadius={ 20 }
                outerRadius={ 55 }
                labelRadius={ 80 }
            >
                <Labels/>
            </PieChart>
           
           
        )
    }

}

export default PieChartWithLabel