import  { useState, useEffect } from 'react';
import axios from 'axios';
import "./Log.css"
const LogTable = () => {
  const [logs, setLogs] = useState([]);
  // const [logData, setLogData] = useState('');
  // const fetchLogData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/log');
  //     setLogData(response.data); // Assuming the response contains logged information
  //   } catch (error) {
  //     console.error('Error fetching log data:', error);
  //   }
  // };

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/logs');

    eventSource.onmessage = (event) => {
      setLogs((prevLogs) => [event.data, ...prevLogs]);
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      
      <div className='flex flex-row justify-between'>
        <div className="bg-black text-green-500 shadow w-1/2 overflow-y-auto h-[500px] p-4 hide-scrollbar">
          <ul className="divide-y divide-gray-200">
            {logs.map((log, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="ml-2 flex-1 w-0 truncate">{log}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='w-1/2 bg-green-500 text-white h-[500px] p-4' >
          <h2 className="font-bold text-xl">Latest Log</h2>
          <p className="mt-2">{logs[0]}</p>
          {/* <button onClick={fetchLogData} className='text-white'>Fetch Log Data</button>
      <pre className='text-white'>{logData}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default LogTable;