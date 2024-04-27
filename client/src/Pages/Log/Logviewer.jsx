import { useState, useEffect } from 'react';
import axios from 'axios';

const LogViewer = () => {
  const [logdatas, setLogdatas] = useState([]);

  useEffect(() => {
    const fetchLogData = async () => {
      const response = await axios.get('http://localhost:5000/logs');
      setLogdatas(response.data);
    };

    fetchLogData();

    const intervalId = setInterval(fetchLogData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatusCodeClass = (statusCode) => {
    switch (statusCode) {
      case 200:
        return 'bg-green-600 font-bold text-white';
      case 404:
        return 'bg-yellow-500 font-bold';
      case 500:
        return 'bg-red-500 font-bold';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto py-8 px-2 bg-black h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center text-white mt-2">
        Logs Management log Medical CRM
      </h1>
      <div className="table-container max-h-[600px] overflow-y-auto">
        <table className="table-auto w-full bg-white rounded-sm">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Status Code</th>
              <th className="px-4 py-2">Response Time</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">IP</th>
            </tr>
          </thead>
          <tbody className="max-h-[550px] overflow-y-auto">
            {logdatas.slice().reverse().map((log, index) => {
              const message = JSON.parse(log.message);
              let levelClass = '';
              if (log.level === 'info') {
                levelClass = 'bg-yellow-500';
              } else if (log.level === 'warn') {
                levelClass = 'bg-red-500';
              }
              const statusCodeClass = getStatusCodeClass(message.statusCode);
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-100 ' : ''}
                >
                  <td
                    className={`border px-4 py-2 text-center ${levelClass}`}
                  >
                    {log.level}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {message.method}
                  </td>
                  <td className="border px-4 py-2">{message.url}</td>
                  <td
                    className={`border px-4 py-2 text-center ${statusCodeClass}`}
                  >
                    {message.statusCode}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {message.responseTime}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="border px-4 py-2 text-center">{log.ip}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogViewer;
