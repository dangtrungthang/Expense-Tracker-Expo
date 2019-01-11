import React from 'react'
import {View} from 'react-native'
import { AreaChart, Grid,YAxis,XAxis } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import PropTypes from 'prop-types';


export default class AreaChartComponent extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        color:PropTypes.string,
        colorArea:PropTypes.string
       
    }
    static defaultProps = {
        data: [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ],
        color:'rgba(234, 72, 58)',
        colorArea:'rgba(234, 72, 58,0.2)'
    }
    
    render() {



        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ this.props.color }
                    fill={ this.props.color }
                />
            ))
        }

        const Line = ({ line }) => (
            <Path
                d={ line }
                stroke={  this.props.color }
                fill={ 'none' }
            />
        )

        return (
            <View style={{flexDirection:'row',height:200}}> 
            <YAxis
            data={this.props.data}
            contentInset={{top:20,bottom:20}}/>
                  <AreaChart
                style={{ flex:1,marginHorizontal:10 }}
                data={ this.props.data}
                svg={{ fill:  this.props.colorArea}}
                contentInset={{ top: 20, bottom: 30 }}
            >
                <Grid/>
                <Line/>
                <Decorator/>
            </AreaChart>
            </View>
          
        )
    }

}