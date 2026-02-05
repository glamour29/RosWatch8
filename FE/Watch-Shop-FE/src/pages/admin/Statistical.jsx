import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import vi from 'date-fns/locale/vi';
import DatePicker, { registerLocale } from 'react-datepicker';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import 'react-datepicker/dist/react-datepicker.css';
import requestHandle from '../../utils/requestHandle';
import { lamTronGia } from '../../utils/functionCommon';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
registerLocale('vi', vi);

const Statistical = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [topGoodPrice, setTopGoodPrice] = useState({ labels: [], datas: [] });
  const [topBestRating, setTopBestRating] = useState({ labels: [], datas: [] });
  const [statistical, setStatistical] = useState({ labels: [], datas: [] });
  const [statisticalByYear, setStatisticalByYear] = useState(0);
  const [monthSelect, setMonthSelect] = useState(0);
  const [yearSelect, setYearSelect] = useState(0);

  useEffect(() => {
    window.document.title = 'Statistical';
    window.scrollTo(0, 0);

    getTopBestSeller();
    getTopBestRatingFromApi();
    getStatistical(monthSelect, yearSelect);
    getStatisticalByYear(yearSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopBestSeller = async () => {
    const response = await requestHandle.get('statistical/top-5-best-sellers');
    const result = await response.data.data;
    const labels = [];
    const datas = [];
    result.forEach((product) => {
      labels.push(product.productName);
      datas.push(product.quantitySold);
    });
    setTopGoodPrice({ ...topGoodPrice, labels, datas });
  };

  const getTopBestRatingFromApi = async () => {
    const response = await requestHandle.get('statistical/best-rating');
    const result = await response.data;
    const labels = [];
    const datas = [];
    result.forEach((product) => {
      labels.push(product.productName);
      datas.push(product.star);
    });
    setTopBestRating({ ...topBestRating, labels, datas });
  };

  const getStatistical = async (m, y) => {
    try {
      const date = new Date();
      m === 0 && (m = date.getMonth() + 1);
      y === 0 && (y = date.getFullYear());
      const response = await requestHandle.get(`statistical/${m}/${y}`);
      const result = await response.data;
      const labels = [];
      result.forEach((rs, index) => {
        labels.push(index + 1);
      });
      setStatistical({ ...statistical, labels, datas: result });
    } catch (error) {
      console.error(error);
    }
  };

  const getStatisticalByYear = async (y) => {
    const date = new Date();
    y === 0 && (y = date.getFullYear());

    try {
      const response = await requestHandle.get(`statistical/year/${y}`);
      const result = await response.data;
      setStatisticalByYear(result);
    } catch (error) {
      console.error(error);
    }
  };

  const sumTotalPrice = () => {
    const datas = statistical.datas;
    return datas.length > 0
      ? datas.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      : 0;
  };

  return (
    <main className='flex-1 overflow-y-auto pt-8 px-6 bg-base-200'>
      <div className='card w-full p-6 bg-base-100 shadow-xl mt-2'>
        <div className='container mx-auto'>
          <h1 className='text-2xl my-5 text-gray-800'>Statistical</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-3'>
            <div className='shadow-xl rounded-lg h-full'>
              <div className='py-3 text-2xl text-center font-bold'>Sản phẩm bán chạy nhất</div>
              <div className='p-4'>
                <Pie
                  data={{
                    labels: topGoodPrice.labels,
                    datasets: [
                      {
                        label: 'quantity sold',
                        data: topGoodPrice.datas,
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 205, 86)',
                          'rgb(255, 134, 86)',
                          'rgb(4, 205, 86)',
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
            </div>

            <div className='shadow-xl rounded-lg h-full'>
              <div className='py-3 text-2xl text-center font-bold'>
                Sản phẩm khách hàng mua nhiều nhất
              </div>
              <div className='p-4' style={{ minHeight: 280 }}>
                <Bar
                  data={{
                    labels: topGoodPrice.labels.map((name) =>
                      name.length > 25 ? `${name.slice(0, 25)}...` : name
                    ),
                    datasets: [
                      {
                        label: 'Số lượng đã mua',
                        data: topGoodPrice.datas,
                        backgroundColor: 'rgba(54, 162, 235)',
                      },
                    ],
                  }}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1.1,
                    plugins: {
                      legend: { display: true },
                      tooltip: {
                        titleAlign: 'left',
                        bodyAlign: 'left',
                        padding: 12,
                        titleFont: { size: 13 },
                        bodyFont: { size: 12 },
                        callbacks: {
                          title: (items) => {
                            const idx = items[0]?.dataIndex;
                            return idx !== undefined ? topGoodPrice.labels[idx] : '';
                          },
                          label: (ctx) => `Số lượng đã mua: ${ctx.raw}`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 },
                      },
                      y: {
                        ticks: { autoSkip: false, font: { size: 12 } },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className='shadow-xl rounded-lg h-full'>
              <div className='py-3 text-2xl text-center font-bold'>
                Sản phẩm được đánh giá cao nhất
              </div>
              <div className='p-4'>
                <Pie
                  data={{
                    labels: topBestRating.labels,
                    datasets: [
                      {
                        label: 'star',
                        data: topBestRating.datas,
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 205, 86)',
                          'rgb(255, 134, 86)',
                          'rgb(4, 205, 86)',
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='shadow-xl rounded-lg'>
              <div className='py-3 text-2xl text-center font-bold'>Thống kê doanh thu</div>
              <div className='p-4 flex'>
                <div className='basis-1/4 px-5'>
                  <div className='py-3'>
                    <p className='font-bold'>Chọn mốc thời gian</p>
                    <DatePicker
                      className='w-20 text-red-400 font-bold hover:text-red-500 outline-none cursor-pointer rounded-md'
                      selected={startDate}
                      onChange={(date) => {
                        console.log(date);
                        const month = date.getMonth() + 1;
                        const year = date.getFullYear();
                        setStartDate(date);
                        setMonthSelect(month);
                        getStatistical(month, year);
                        setYearSelect(year);
                        getStatisticalByYear(year);
                      }}
                      showMonthYearPicker
                      dateFormat='MM/yyyy'
                      locale='vi'
                    ></DatePicker>
                  </div>
                  <div className='py-3'>
                    <p className='font-bold'>Tổng doanh thu tháng:</p>
                    <span>{lamTronGia(sumTotalPrice())} vnd</span>
                  </div>
                  <div className='py-3'>
                    <p className='font-bold'>Tổng doanh thu năm:</p>
                    <span>{lamTronGia(statisticalByYear)} vnd</span>
                  </div>
                </div>
                <div className='basis-3/4'>
                  <Bar
                    width={100}
                    height={50}
                    data={{
                      labels: statistical.labels,
                      datasets: [
                        {
                          label: 'Doanh thu',
                          data: statistical.datas,
                          backgroundColor: 'rgba(54, 162, 235)',
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Statistical;
