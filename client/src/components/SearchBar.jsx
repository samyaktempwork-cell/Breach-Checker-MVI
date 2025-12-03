import { useState } from "react";

export default function SearchBar({ onCheck }) {
  const [mobile, setMobile] = useState("");

  return (
    <div>
      <input
        className="border p-2 rounded"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onCheck(mobile)}
      >
        Check
      </button>
    </div>
  );
}
