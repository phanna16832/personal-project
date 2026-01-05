import React, { useState, useEffect } from 'react';
import './src/App.css';

const Home = () => {
  // --- State for Main Calculator ---
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('6');
  const [mainResult, setMainResult] = useState({ r0: '', r1: '', color: '#000' });
  const [copyMsg, setCopyMsg] = useState('');

  // --- State for System Calculator ---
  const [nPrice, setNPrice] = useState('');
  const [sysPrice, setSysPrice] = useState('');
  const sysRate = 6.1;
  const [sysResults, setSysResults] = useState({ converted: '', change: '' });

  // --- State for Tracking ---
  const [batchCode, setBatchCode] = useState('');
  const [trackingNum, setTrackingNum] = useState('');
  const [trackingList, setTrackingList] = useState([]);
  const [trackMsg, setTrackMsg] = useState({ text: '', color: '' });

  const currentDate = new Date().toLocaleDateString("en-GB", {
    year: "numeric", month: "long", day: "numeric"
  });

  // --- Functions ---
  const mainCal = () => {
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) {
      setMainResult({ r0: '', r1: '输入错误，请重新输入', color: 'red' });
    } else {
      const cal = p / parseFloat(rate);
      setMainResult({
        r0: `${p} / ${rate} = $${cal.toFixed(3)}`,
        r1: `សួស្តីបង សរុបហាងទំនិញទាំងអស់ $${cal.toFixed(2)} \n\n📌 ចំពោះការទិញទំនិញក្នុងហាងតែមួយ បើហាងបំបែកជាច្រើនកញ្ចប់ នឹងគិតថ្លៃដឹកតាមចំនួនកញ្ចប់...`,
        color: '#000'
      });
    }
  };

  const handleSysCal = () => {
    const converted = (parseFloat(nPrice) / sysRate).toFixed(2);
    const change = (converted - parseFloat(sysPrice)).toFixed(2);
    setSysResults({ 
      converted: isNaN(converted) ? '0' : converted, 
      change: isNaN(change) ? '0' : change 
    });
  };

  const clearSys = () => {
    setNPrice('');
    setSysPrice('');
    setSysResults({ converted: '', change: '' });
  };

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    if (!batchCode || !trackingNum) {
      setTrackMsg({ text: 'Please fill all fields', color: 'red' });
      return;
    }
    const cleaned = trackingNum.split(',').map(t => t.trim()).filter(t => t !== '');
    setTrackingList(cleaned);
    setTrackMsg({ text: 'List Generated', color: 'green' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyMsg('សារបានត្រូវចម្លង | Copied!');
    setTimeout(() => setCopyMsg(''), 2000);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand">Home</span>
          <div className="language-div text-white">
            <span>Current date: {currentDate}</span>
          </div>
        </div>
      </nav>

      <main className="container">
        <div className="row">
          {/* Main Calculator Card */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">Main Calculator</div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Price in RMB:</label>
                  <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rate</label>
                  <select className="form-select" value={rate} onChange={(e) => setRate(e.target.value)}>
                    <option value="6">6</option>
                    <option value="6.5">6.5</option>
                    <option value="6.8">6.8</option>
                  </select>
                </div>
                <div id="result0" className="fw-bold text-warning mb-2">{mainResult.r0}</div>
                <div id="result" style={{ color: mainResult.color, whiteSpace: 'pre-wrap' }} className="mb-3">
                  {mainResult.r1}
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <button className="btn btn-primary" onClick={mainCal}>Calculate</button>
                  <button className="btn btn-secondary" onClick={() => copyToClipboard(mainResult.r1)}>Copy</button>
                  {copyMsg && <span className="copy-success">{copyMsg}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* System Calculator Card */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">System Calculator</div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>RMB</th>
                      <th>Sys Price</th>
                      <th>Rate</th>
                      <th>Converted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="number" className="form-control form-control-sm" value={nPrice} onChange={(e) => setNPrice(e.target.value)} /></td>
                      <td><input type="number" className="form-control form-control-sm" value={sysPrice} onChange={(e) => setSysPrice(e.target.value)} /></td>
                      <td>{sysRate}</td>
                      <td style={{ color: 'green' }}>{sysResults.converted}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleSysCal}>Calculate</button>
                  <button className="btn btn-danger btn-sm" onClick={clearSys}>Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Card */}
        <div className="card mb-5 shadow-sm">
          <div className="card-header bg-primary text-white">Tracking Numbers</div>
          <div className="card-body">
            <form onSubmit={handleTrackingSubmit}>
              <input type="text" className="form-control mb-2" placeholder="Batch Code (e.g. CC...)" value={batchCode} onChange={(e) => setBatchCode(e.target.value)} />
              <input type="text" className="form-control mb-3" placeholder="Tracking numbers (comma separated)" value={trackingNum} onChange={(e) => setTrackingNum(e.target.value)} />
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Generate List</button>
                <button type="button" className="btn btn-secondary" onClick={() => copyToClipboard(`${batchCode} 集${trackingList.length}件包：\n${trackingList.join('\n')}`)}>Copy All</button>
              </div>
            </form>
            <div className="mt-3">
              {trackingList.length > 0 && <strong>{batchCode} 集{trackingList.length}件包：</strong>}
              {trackingList.map((num, index) => (
                <div key={index} className="tracking-output-line">
                  <span>{num}</span>
                  <button className="btn btn-sm btn-link" onClick={() => copyToClipboard(num)}>copy</button>
                </div>
              ))}
              <div style={{ color: trackMsg.color }}>{trackMsg.text}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;