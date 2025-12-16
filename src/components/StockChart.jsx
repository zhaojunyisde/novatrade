import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getStockCandles } from '../services/stockService';

const StockChart = ({ data, loading }) => {
    // Data filtering or processing can happen here if needed, but for now we trust parent

    if (loading) {
        return <div className="flex-center" style={{ height: '400px', color: 'var(--text-secondary)' }}>Loading Chart...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="flex-center" style={{ height: '400px', color: 'var(--text-secondary)' }}>No chart data available</div>;
    }

    const isPositive = data[0].price <= data[data.length - 1].price;
    const color = isPositive ? '#10B981' : '#EF4444';

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        minTickGap={50}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
