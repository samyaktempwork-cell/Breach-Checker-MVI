import { useState } from "react";

function App() {
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("IN");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBreach = async () => {
    if (!mobile) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:4000/api/breach/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: mobile,
          countryCode: country,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        📱 Mobile Breach Checker
      </h1>

      {/* Input row */}
      <div className="flex gap-3 mb-5">
        
        {/* Country Dropdown */}
        <select
          className="border p-2 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="IN">🇮🇳 India (IN)</option>
          <option value="US">🇺🇸 United States (US)</option>
          <option value="GB">🇬🇧 United Kingdom (GB)</option>
          <option value="CA">🇨🇦 Canada (CA)</option>
          <option value="AU">🇦🇺 Australia (AU)</option>
          <option value="SG">🇸🇬 Singapore (SG)</option>
        </select>

        {/* Mobile input */}
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Button */}
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          onClick={checkBreach}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Output */}
      {result && (
        <div className="border p-5 rounded bg-gray-50">
          
          <h2 className="text-xl font-semibold mb-2">
            Results for{" "}
            <span className="text-blue-600">{result.mobile}</span>
          </h2>

          {/* METADATA */}
          <h3 className="font-bold text-lg mb-1">📌 Phone Metadata</h3>

          <p><b>Valid:</b> {result.valid ? "YES" : "NO"}</p>
          <p><b>Country:</b> {result.metadata?.country}</p>
          <p><b>Location:</b> {result.metadata?.location}</p>
          <p><b>Carrier:</b> {result.metadata?.carrier}</p>
          <p><b>Line Type:</b> {result.metadata?.line_type}</p>

          <p className="mt-3">
            <b>Breached:</b> {result.breached ? "YES" : "NO"}
          </p>

          {/* OSINT */}
          {result.osint && (
            <>
              <h3 className="font-bold text-lg mt-5 mb-1">🔍 OSINT Data</h3>
              <pre className="bg-white p-3 rounded border overflow-auto text-sm">
                {JSON.stringify(result.osint, null, 2)}
              </pre>
            </>
          )}

          {/* Feature Flags */}
          {result.flags_used && (
            <>
              <h3 className="font-bold text-lg mt-5 mb-1">⚙ Feature Flags (Backend)</h3>
              <pre className="bg-white p-3 rounded border overflow-auto text-xs">
                {JSON.stringify(result.flags_used, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
