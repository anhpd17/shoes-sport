import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import BestSellingProducts from './ProductStatistical';
import HighestRevenueProducts from './TopRevenue';
import HighestProfitProducts from './TopProfit';
import instance from '@/core/api';
import { DatePicker, Segmented, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/locale/vi_VN';

dayjs.locale('vi');

const fetchProducts = async (endpoint, startDate, endDate) => {
    const url = `${endpoint}?startDate=${startDate}&endDate=${endDate}`;

    try {
        const { data } = await instance.get(url);
        console.log(`Data fetched from ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw new Error(error.response?.data?.message || 'Error fetching data');
    }
};

const StatisticalProduct = () => {
    const [activeTab, setActiveTab] = useState('WEEK');
    const [datePickerVal, setDatePickerVal] = useState(dayjs());

    const { startDate, endDate } = useMemo(() => {
        const startDate = dayjs(datePickerVal.startOf(activeTab.toLowerCase())).format('YYYY-MM-DD');
        const endDate = dayjs(datePickerVal.endOf(activeTab.toLowerCase())).format('YYYY-MM-DD');

        return { startDate, endDate };
    }, [datePickerVal, activeTab]);

    const fetchBestSellingProducts = () => fetchProducts('/api/order/top-5-product-best-seller', startDate, endDate);
    const fetchHighestRevenueProducts = () => fetchProducts('/api/order/top-revenue-product', startDate, endDate);
    const fetchHighestProfitProducts = () => fetchProducts('/api/order/topProfitableProducts', startDate, endDate);

    const { data: bestSellingProducts, isLoading: isLoadingBestSelling } = useQuery(
        ['bestSellingProducts', startDate, endDate],
        fetchBestSellingProducts,
        {
            enabled: !!startDate && !!endDate,
        }
    );

    const { data: highestRevenueProducts, isLoading: isLoadingHighestRevenue } = useQuery(
        ['highestRevenueProducts', startDate, endDate],
        fetchHighestRevenueProducts,
        {
            enabled: !!startDate && !!endDate,
        }
    );

    const { data: highestProfitProducts, isLoading: isLoadingHighestProfit } = useQuery(
        ['highestProfitProducts', startDate, endDate],
        fetchHighestProfitProducts,
        {
            enabled: !!startDate && !!endDate,
        }
    );

    const isLoading = isLoadingBestSelling || isLoadingHighestRevenue || isLoadingHighestProfit;

    const onTabChange = (tab) => {
        setActiveTab(tab);
        setDatePickerVal(dayjs());
    };

    return (
        <ConfigProvider locale={locale}>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="flex flex-col justify-center items-center max-w-2xl mx-auto mb-4 space-y-4">
                    <h1 className="text-2xl font-bold mb-4">Top sản phẩm</h1>
                    <div className="flex items-center space-x-4">
                        <Segmented
                            value={activeTab}
                            options={[
                                { label: 'Tuần', value: 'WEEK' },
                                { label: 'Tháng', value: 'MONTH' },
                                { label: 'Năm', value: 'YEAR' }
                            ]}
                            onChange={onTabChange}
                        />
                        <DatePicker
                            value={datePickerVal}
                            onChange={setDatePickerVal}
                            picker={activeTab.toLowerCase()}
                        />
                    </div>
                </div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h2 className="text-lg font-bold mb-2">Top 5 Sản Phẩm Bán Chạy Nhất</h2>
                            <BestSellingProducts products={bestSellingProducts} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-2">Top 5 Sản Phẩm Có Doanh Thu Cao</h2>
                            <HighestRevenueProducts products={highestRevenueProducts} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-2">Top 5 Sản Phẩm Có Lợi Nhuận Cao</h2>
                            <HighestProfitProducts products={highestProfitProducts} />
                        </div>
                    </div>
                )}
            </div>
        </ConfigProvider>
    );
};

export default StatisticalProduct;
