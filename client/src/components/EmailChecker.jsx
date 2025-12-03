import { useState } from "react";

export default function EmailChecker() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkEmail = async () => {
    if (!email) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:4000/api/breach/email/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      setResult({ error: true, message: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="p-5 border rounded bg-gray-50 mt-10">
      <h2 className="text-xl font-semibold mb-3">📧 Email Breach Checker</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="email"
          className="border p-2 rounded w-full"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={checkEmail}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <div className="mt-3">
          {result.error ? (
            <div className="text-red-600">
              Error: {result.error.message || result.error || "Unknown error"}
              </div>
          ) : (
            <>
              <p><b>Breached:</b> {result.hibp?.breached ? "YES" : "NO"}</p>

              {result.hibp?.breaches?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold">Breaches:</h3>
                  <ul className="list-disc ml-5">
                    {result.hibp.breaches.map((b, idx) => (
                      <li key={idx}>
                        <b>{b.Title || b.Name}</b> — {b.BreachDate}
                        <div className="text-sm text-gray-600">
                          {b.DataClasses.join(", ")}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <pre className="mt-3 text-xs p-2 bg-white border">
                {JSON.stringify(result.flags_used, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
