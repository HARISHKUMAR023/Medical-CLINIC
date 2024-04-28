// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const LogViewer = () => {
//   const [logdatas, setLogdatas] = useState([]);

//   useEffect(() => {
//     const fetchLogData = async () => {
//       const response = await axios.get('http://localhost:5000/logs');
//       setLogdatas(response.data);
//     };

//     fetchLogData();

//     const intervalId = setInterval(fetchLogData, 5000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const getStatusCodeClass = (statusCode) => {
//     switch (statusCode) {
//       case 200:
//         return 'bg-green-600 font-bold text-white';
//       case 404:
//         return 'bg-yellow-500 font-bold';
//       case 500:
//         return 'bg-red-500 font-bold';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 px-2 bg-black h-screen overflow-hidden">
//       <h1 className="text-2xl font-bold mb-4 text-center text-white mt-2">
//         Logs Management log Medical CRM
//       </h1>
//       <div className="table-container max-h-[600px] overflow-y-auto">
//         <table className="table-auto w-full bg-white rounded-sm">
//           <thead>
//             <tr className="bg-gray-600 text-white">
//               <th className="px-4 py-2">Level</th>
//               <th className="px-4 py-2">Method</th>
//               <th className="px-4 py-2">URL</th>
//               <th className="px-4 py-2">Status Code</th>
//               <th className="px-4 py-2">Response Time</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Time</th>
//               <th className="px-4 py-2">IP</th>
//             </tr>
//           </thead>
//           <tbody className="max-h-[550px] overflow-y-auto">
//             {logdatas.slice().reverse().map((log, index) => {
//               const message = JSON.parse(log.message);
//               let levelClass = '';
//               if (log.level === 'info') {
//                 levelClass = 'bg-yellow-500';
//               } else if (log.level === 'warn') {
//                 levelClass = 'bg-red-500';
//               }
//               const statusCodeClass = getStatusCodeClass(message.statusCode);
//               return (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? 'bg-gray-100 ' : ''}
//                 >
//                   <td
//                     className={`border px-4 py-2 text-center ${levelClass}`}
//                   >
//                     {log.level}
//                   </td>
//                   <td className="border px-4 py-2 text-center">
//                     {message.method}
//                   </td>
//                   <td className="border px-4 py-2">{message.url}</td>
//                   <td
//                     className={`border px-4 py-2 text-center ${statusCodeClass}`}
//                   >
//                     {message.statusCode}
//                   </td>
//                   <td className="border px-4 py-2 text-center">
//                     {message.responseTime}
//                   </td>
//                   <td className="border px-4 py-2 text-center">
//                     {new Date(log.timestamp).toLocaleDateString()}
//                   </td>
//                   <td className="border px-4 py-2 text-center">
//                     {new Date(log.timestamp).toLocaleTimeString()}
//                   </td>
//                   <td className="border px-4 py-2 text-center">{log.ip}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LogViewer;

import  { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Logviewer = () => {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socket = io('http://localhost:5000'); // replace with your server URL

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('log', (message) => {
      console.log(message);
      setLogs((prevLogs) => [...prevLogs, message]);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });
    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className=' h-52 pb-24 shadow-md  backdrop-blur-sm bg-black/70'>
      <div className=''>
        <div className='flex items-center py-2'>
        <div className={`bg-green-500 rounded-full h-4 w-4  ml-3 ${isConnected?'bg-green-500':'bg-red-500'}`}></div><h2 className='ml-1 text-white'>Server Logs </h2>
        </div>
     
      <div className='bg-black text-white  h-40 mx-2 mb-1 rounded-sm overflow-y-scroll hide-scrollbar'>
      {logs.map((log, index) => {
  const parts = log.split(' ');
  const ip = parts.find(part => part.includes('.')); // assuming the IP is in IPv4 format
  const messageWithoutIp = parts.filter(part => part !== ip).join(' ');

  return (
    <div key={index}>
      <p className='text-red-600 italic p-0.5 px-1 text-sm'>
        <span className='text-white'>Harish@</span>erp $  
        <span className='text-white'>{messageWithoutIp}</span> 
        {ip && <span className='text-blue-500'>{ip}</span>}
      </p>
    </div>
  );
})}
      </div>
      </div>
     
    
    </div>
  );
};

export default Logviewer;