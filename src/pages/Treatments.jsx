import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { treatments as initialTreatments } from "../data/mockData";

export default function Treatments() {
  const [treatments, setTreatments] = useState(initialTreatments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", duration: "", price: "" });

  const addTreatment = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setTreatments([
      ...treatments,
      { id: Date.now(), name: form.name, duration: Number(form.duration) || 30, price: Number(form.price) },
    ]);
    setForm({ name: "", duration: "", price: "" });
    setShowForm(false);
  };

  const remove = (id) => setTreatments(treatments.filter((t) => t.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Treatments</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700"
        >
          <Plus size={16} /> Add Treatment
        </button>
      </div>

      {showForm && (
        <form onSubmit={addTreatment} className="bg-white border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Treatment name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Duration (min)"
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <input
            className="border rounded-lg px-3 py-2 text-sm"
            placeholder="Price (EGP)"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button className="bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700">Save</button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {treatments.map((t) => (
          <div key={t.id} className="bg-white border rounded-xl p-5 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">{t.name}</h3>
              <button onClick={() => remove(t.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500">{t.duration} min</p>
            <p className="text-xl font-bold text-teal-600">{t.price.toLocaleString()} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}