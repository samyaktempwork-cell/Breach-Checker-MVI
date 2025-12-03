import { useState } from "react";
import EmailChecker from "./components/EmailChecker.jsx";

function App() {
  // PHONE STATES
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("IN");
  const [phoneResult, setPhoneResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- PHONE CHECK FUNCTION ---
  const checkPhone = async () => {
    if (!mobile) return;

    setLoading(true);
    setPhoneResult(null);

    try {
      const res = await fetch("http://localhost:4000/api/breach/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: mobile,
          countryCode: country
        })
      });

      const data = await res.json();
      setPhoneResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🔐 Breach Checker
      </h1>

      {/* ======================== PHONE CHECKER ======================== */}
      <div className="border p-5 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">📱 Phone Breach Checker</h2>

        {/* Input Row */}
        <div className="flex gap-3 mb-4">

          {/* Country Dropdown */}
          <select
            className="border p-2 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="IN">🇮🇳 IN</option>
            <option value="US">🇺🇸 US</option>
            <option value="GB">🇬🇧 UK</option>
            <option value="CA">🇨🇦 CA</option>
            <option value="AU">🇦🇺 AU</option>
            <option value="SG">🇸🇬 SG</option>
          </select>

          {/* Mobile Input */}
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          {/* Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={checkPhone}
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>

        {/* PHONE RESULT */}
        {phoneResult && (
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">
              Results for <span className="text-blue-700">{phoneResult.mobile}</span>
            </h3>

            {/* Metadata */}
            <div className="mb-3">
              <p><b>Valid:</b> {phoneResult.valid ? "YES" : "NO"}</p>
              <p><b>Country:</b> {phoneResult.metadata?.country}</p>
              <p><b>Location:</b> {phoneResult.metadata?.location}</p>
              <p><b>Carrier:</b> {phoneResult.metadata?.carrier}</p>
              <p><b>Line Type:</b> {phoneResult.metadata?.line_type}</p>
            </div>

            {/* Breach Info */}
            <p className="mt-3">
              <b>Breached:</b> {phoneResult.breached ? "YES" : "NO"}
            </p>

            {/* OSINT */}
            {phoneResult.osint && (
              <>
                <h4 className="font-semibold mt-4">🔍 OSINT Result:</h4>
                <pre className="bg-white p-2 border rounded text-sm">
                  {JSON.stringify(phoneResult.osint, null, 2)}
                </pre>
              </>
            )}

            {/* Flags */}
            {phoneResult.flags_used && (
              <>
                <h4 className="font-semibold mt-4">⚙ Flags Used:</h4>
                <pre className="bg-white p-2 border rounded text-xs">
                  {JSON.stringify(phoneResult.flags_used, null, 2)}
                </pre>
              </>
            )}
          </div>
        )}
      </div>

      {/* SPACING */}
      <div className="my-10"></div>

      {/* ======================== EMAIL CHECKER ======================== */}
      <EmailChecker />
    </div>
  );
}

export default App;
