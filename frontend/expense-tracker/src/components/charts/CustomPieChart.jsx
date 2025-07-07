import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
} from 'recharts';
import CustomToolTip from './CustomToolTip';

const CustomPieChart = ({
    data,
    label,
    colors,
    totalAmount,
    showTextAnchor 
}) => {
  return <ResponsiveContainer width="100%" height={380}>
    <PieChart>
        <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            fill="#8884d8"
            labelLine={false}
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend />

        {showTextAnchor && (
            <>
                <text
                    x="50%"
                    y="50%"
                    dy={-25}
                    textAnchor="middle"
                    fill="#666"
                    fontSize={14}
                >{label}
                </text>
                <text
                    x="50%"
                    y="50%"
                    dy={8}
                    textAnchor="middle"
                    fill="#333"
                    fontSize={24}
                    fontWeight="semibold"
                >{totalAmount}
                </text>
            </>
        )}
    </PieChart>
  </ResponsiveContainer>
}

export default CustomPieChart