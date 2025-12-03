export default function BreachResult({ result }) {
  return (
    <div className="mt-5 p-4 border rounded">
      <h2 className="font-semibold">Results for {result.mobile}</h2>

      {result.breached ? (
        <p className="text-red-600">⚠ Breach Found!</p>
      ) : (
        <p className="text-green-600">✔ No breach found</p>
      )}

      <ul className="mt-3">
        {result.sources.map((src, idx) => (
          <li key={idx}>
            <strong>{src.name}:</strong> {src.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
