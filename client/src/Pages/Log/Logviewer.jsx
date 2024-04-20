import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogViewer = () => {
  const [logdatas, setLogdatas] = useState([]);

  useEffect(() => {
    // Fetch log data initially when the component mounts
    fetchLogData();

    // Set up an interval to fetch log data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchLogData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once

  const fetchLogData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/log/generate');
      console.log(response.data);
      setLogdatas(response.data);
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  };

  return (
    <div>
      <h2>Log Viewer</h2>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Time</th>
            <th>Environment</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* {logdatas.map((logs, index) => (
            <tr key={index}>
              <td>{logs.level}</td>
              <td>{logs.time}</td>
              <td>{logs.env}</td>
              <td>{logs.description}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default LogViewer;