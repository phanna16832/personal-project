import { useEffect, useState } from "react";

const Calculator = () => {
  // ===== Date =====
  const [dateText, setDateText] = useState("");

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDateText(`Current date and time: ${date}`);
  }, []);

  // ===== Main Calculator =====
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("6");
  const [result, setResult] = useState("");
  const [result0, setResult0] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const mainCal = () => {
    if (isNaN(price) || price <= 0) {
      setResult("输入错误，请重新输入");
      setResult0("");
      return;
    }

    const cal = price / rate;
    setResult0(`${price} / ${rate} = $${cal.toFixed(3)}`);

    setResult(
      `សួស្តីបង សរុបហាងទំនិញទាំងអស់ $${cal.toFixed(2)}

📌 ចំពោះការទិញទំនិញក្នុងហាងតែមួយ បើហាងបំបែកជាច្រើនកញ្ចប់ នឹងគិតថ្លៃដឹកតាមចំនួនកញ្ចប់។
📌 កញ្ចប់ក្រោម 1 គីឡូ គិតជា 1 គីឡូ។
📌 ខាងប្អូនធានាតែចំពោះការបាត់បង់ឥវ៉ាន់ ប៉ុន្តែមិនធានាលើទំនិញបែកបាក់។

សូមអរគុណ 🙏`
    );
  };

  // ===== System Calculator =====
  const rateOutput = 6.1;
  const [nPrice, setNPrice] = useState("");
  const [sysPrice, setSysPrice] = useState("");
  const [syConvertPrice, setSyConvertPrice] = useState("");
  const [syChangePrice, setSyChangePrice] = useState("");

  const sysCal = () => {
    const systemCal = (nPrice / rateOutput).toFixed(2);
    setSyConvertPrice(systemCal);

    const change = (systemCal - sysPrice).toFixed(2);
    setSyChangePrice(change);
  };

  const clearSyscal = () => {
    setNPrice("");
    setSysPrice("");
    setSyConvertPrice("");
    setSyChangePrice("");
  };

  // ===== Copy =====
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopyMsg("សារបានត្រូវចម្លង | Text copied!");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  // ===== Tracking =====
  const [batchCode, setBatchCode] = useState("");
  const [trackingNum, setTrackingNum] = useState("");
  const [trackingList, setTrackingList] = useState([]);
  const [trackingMsg, setTrackingMsg] = useState("");

  const submitTracking = (e) => {
    e.preventDefault();

    const cleaned = trackingNum
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    if (!batchCode || cleaned.length === 0) {
      setTrackingMsg("Please fill all fields");
      return;
    }

    setTrackingList(cleaned);
    setTrackingMsg("");
  };

  const copyAll = () => {
    const text = `${batchCode} 集${trackingList.length}件包：\n${trackingList.join(
      "\n"
    )}`;
    navigator.clipboard.writeText(text);
    setTrackingMsg("Copied full result!");
  };

  return (
    <div className="container">
      {/* ===== Header ===== */}
      <header className="header">
        <select>
          <option>English</option>
          <option>Chinese</option>
          <option>Khmer</option>
        </select>
        <span className="date">{dateText}</span>
      </header>

      {/* ===== Main Calculator ===== */}
      <section className="card">
        <h3>Main Calculator</h3>

        <input
          type="number"
          placeholder="Price in RMB"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select value={rate} onChange={(e) => setRate(e.target.value)}>
          {[6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button onClick={mainCal}>Calculate</button>
        <button onClick={() => copyText(result)}>Copy</button>

        <p className="result0">{result0}</p>
        <pre className="result">{result}</pre>
        <span className="copy-msg">{copyMsg}</span>
      </section>

      {/* ===== System Calculator ===== */}
      <section className="card">
        <h3>System Calculator</h3>

        <input
          type="number"
          placeholder="Price in RMB"
          value={nPrice}
          onChange={(e) => setNPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="System price"
          value={sysPrice}
          onChange={(e) => setSysPrice(e.target.value)}
        />

        <p>System Rate: {rateOutput}</p>
        <p>Converted: {syConvertPrice}</p>
        <p>Changed: {syChangePrice}</p>

        <button onClick={sysCal}>Calculate</button>
        <button onClick={clearSyscal}>Clear</button>
      </section>

      {/* ===== Tracking ===== */}
      <section className="card">
        <h3>Tracking Numbers</h3>

        <form onSubmit={submitTracking}>
          <input
            placeholder="Batch code"
            value={batchCode}
            onChange={(e) => setBatchCode(e.target.value)}
          />
          <input
            placeholder="Tracking numbers (comma)"
            value={trackingNum}
            onChange={(e) => setTrackingNum(e.target.value)}
          />

          <button type="submit">Submit</button>
          <button type="button" onClick={copyAll}>
            Copy All
          </button>
        </form>

        {trackingList.map((n, i) => (
          <div key={i} className="tracking-line">
            {n}
            <button onClick={() => copyText(n)}>copy</button>
          </div>
        ))}

        <p className="msg">{trackingMsg}</p>
      </section>
    </div>
  );
};

export default Calculator;
