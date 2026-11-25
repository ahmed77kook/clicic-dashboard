import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { patients as initialPatients } from "../data/mockData";

export default function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", age: "" });

  const filtered = patients.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.phone.includes(query)
  );

  const addPatient = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setPatients([
      ...patients,
      {
        id: Date.now(),
        name: form.name,
        phone: form.phone,
        age: Number(form.age) || "-",
        lastVisit: new Date().toISOString().slice(0, 10),
      },
    ]);
    setForm({ name: "", phone: "", age: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700"
        >
          <Plus size={16} /> Add Patient
        </button>
      </div>

      {showForm && (
        <form onSubmit={addPatient} className="bg-white border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <button className="bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700">Save</button>
        </form>
      )}

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input
          className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm bg-white"
          placeholder="Search by name or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                <td className="px-4 py-3">{p.phone}</td>
                <td className="px-4 py-3">{p.age}</td>
                <td className="px-4 py-3">{p.lastVisit}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}