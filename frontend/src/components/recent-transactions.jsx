import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";

import Title from "./title";
import { formatCurrency } from "../libs";
import { Link } from 'react-router-dom';

const data = [
  {
    date: "2024-01-05",
    name: "Online Store",
    contact: "+1234567890",
    status: "Completed",
    source: "Credit Card",
    amount: 150,
  },
  {
    date: "2024-01-12",
    name: "Grocery Store",
    contact: "+1987654321",
    status: "Rejected",
    source: "Debit Card",
    amount: 75,
  },
  {
    date: "2024-01-20",
    name: "Utility Bill",
    contact: "+1122334455",
    status: "Pending",
    source: "Bank Transfer",
    amount: 100,
  },
  {
    date: "2024-02-03",
    name: "Restaurant",
    contact: "+1555666777",
    status: "Completed",
    source: "Cash",
    amount: 50,
  },
  {
    date: "2024-02-10",
    name: "Online Subscription",
    contact: "+1444333222",
    status: "Completed",
    source: "Credit Card",
    amount: 25,
  },
  {
    date: "2024-02-18",
    name: "Gas Station",
    contact: "+1777888999",
    status: "Completed",
    source: "Debit Card",
    amount: 40,
  },
  {
    date: "2024-03-07",
    name: "Electronics Store",
    contact: "+1987654321",
    status: "Completed",
    source: "Credit Card",
    amount: 200,
  },
  {
    date: "2024-03-15",
    name: "Online Service",
    contact: "+1122334455",
    status: "Pending",
    source: "Bank Transfer",
    amount: 120,
  },
  {
    date: "2024-03-22",
    name: "Coffee Shop",
    contact: "+1234567890",
    status: "Rejected",
    source: "Cash",
    amount: 10,
  },
  {
    date: "2024-04-01",
    name: "Grocery Store",
    contact: "+1555666777",
    status: "Completed",
    source: "Debit Card",
    amount: 90,
  },
  {
    date: "2024-04-08",
    name: "Online Shopping",
    contact: "+1444333222",
    status: "Completed",
    source: "Credit Card",
    amount: 180,
  },
  {
    date: "2024-04-15",
    name: "Car Maintenance",
    contact: "+1777888999",
    status: "Completed",
    source: "Cash",
    amount: 300,
  },
];

// <td className='py-2 px-2'>
//   <p
//     className={`w-fit flex items-center gap-2 px-2 py-1 rounded-full text-base ${
//       item.status === "Completed"
//         ? "bg-emerald-200 text-emerald-800"
//         : item.status === "Pending"
//         ? "bg-yellow-200 text-yellow-800"
//         : "bg-red-200 text-red-800"
//     }`}
//   >
//     {item.status === "Pending" && <RiProgress3Line />}
//     {item.status === "Completed" && <IoCheckmarkDoneCircle />}
//     {item.status === "Rejected" && <TiWarning />}
//     <span> {item.status}</span>
//   </p>
// </td>;

const RecentTransactions = ({ data }) => {
  return (
    <div className='py-20 w-full flex-1'>
      <div className="flex items-center justify-between">
        <Title title='Latest Transactions' />
        <Link
        to="/transactions"
        className="text-sm text-gray-600 dark:text-gray-500 hover:text-violet-600 hover:underline mr-5"
      >
        View All
      </Link>
      </div>

      <div className='overflow-x-auto mt-5'>
        <table className='w-full'>
          <thead className='w-full border-b border-gray-300 dark:border-gray-700'>
            <tr className='w-full text-black dark:text-gray-400  text-left'>
              <th className='py-2'>Date</th>
              <th className='py-2'>Name</th>
              <th className='py-2'>Status</th>
              <th className='py-2'>Source</th>
              <th className='py-2'>Amount</th>
            </tr>
          </thead>

          <tbody>
            {data?.slice(0, 5).map((item, index) => (
              <tr
                key={index}
                className='text-sm border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-500 hover:bg-gray-300/10'
              >
                <td className='py-4'>{new Date(item.createdat).toLocaleDateString()}</td>

                <td className='py-3 px-2'>
                  <div className='flex flex-col'>
                    <p className='font-medium text-lg text-black 2xl:text-lg dark:text-gray-400 line-clamp-1'>
                      {item?.description}
                    </p>
                    {/* <span className='text-sm text-gray-600'>
                      {item.contact}
                    </span> */}
                  </div>
                </td>
                <td className='py-3 px-2 flex items-center gap-2'>
                  {item?.status === "Pending" && (
                    <RiProgress3Line className='text-amber-600' size={24} />
                  )}
                  {item.status === "Completed" && (
                    <IoCheckmarkDoneCircle
                      className='text-emerald-600'
                      size={24}
                    />
                  )}
                  {item?.status === "Rejected" && (
                    <TiWarning className='text-red-600' size={24} />
                  )}

                  <span>{item?.status}</span>
                </td>

                <td className='py-2 px-2'>{item?.source}</td>

                <td className='flex items-center py-4 px-2 text-black dark:text-gray-400 text-base font-medium'>
                  <span
                  className={`${
                    item?.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
                  >
                    {item?.type === "income" ? "+" : "-"}
                  </span>
                  ${formatCurrency(item?.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
