import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { treatments } from "../data/mockData";
import { useAppointments, SLOTS } from "../data/store";

const emptyForm = { name: "", phone: "", treatmentId: "", date: "", time: "", notes: "" };

export default function Booking() {
  const { appointments, add } = useAppointments();
  const [form, setForm] = useState(emptyForm);
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");

  const todayStr = new Date().toLocaleDateString("en-CA");
  const treatment = treatments.find((t) => t.id === Number(form.treatmentId));
  const taken = appointments
    .filter((a) => a.date === form.date && a.status !== "Cancelled")
    .map((a) => a.time);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !treatment || !form.date || !form.time) {
      setError("Please fill in all fields and choose a time.");
      return;
    }
    const item = add({
      patient: form.name,
      phone: form.phone,
      treatment: treatment.name,
      price: treatment.price,
      duration: treatment.duration,
      date: form.date,
      time: form.time,
      notes: form.notes,
    });
    setError("");
    setDone(item);
  };

  const inputClass = "w-full border rounded-lg px-3 py-2 text-sm bg-white";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-teal-600">🦷 Dental Clinic</h1>
          <p className="text-gray-500 text-sm mt-1">Book your appointment online</p>
        </div>

        {done ? (
          <div className="bg-white border rounded-xl p-6 space-y-4 text-center">
            <CheckCircle2 className="mx-auto text-green-500" size={48} />
            <h2 className="text-xl font-bold text-gray-800">Booking received!</h2>
            <p className="text-sm text-gray-500">The clinic will contact you to confirm.</p>
            <div className="border rounded-lg p-4 text-sm text-left space-y-2">
              <p><span className="text-gray-500">Booking code:</span> <b>{done.code}</b></p>
              <p><span className="text-gray-500">Name:</span> {done.patient}</p>
              <p><span className="text-gray-500">Treatment:</span> {done.treatment}</p>
              <p><span className="text-gray-500">Date:</span> {done.date}</p>
              <p><span className="text-gray-500">Time:</span> {done.time}</p>
              <p><span className="text-gray-500">Cost:</span> <b className="text-teal-600">{done.price.toLocaleString()} EGP</b></p>
            </div>
            <button
              onClick={() => { setDone(null); setForm(emptyForm); }}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700"
            >
              Book another appointment
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white border rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full name</label>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone number</label>
              <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Treatment</label>
              <select className={inputClass} value={form.treatmentId} onChange={(e) => setForm({ ...form, treatmentId: e.target.value })}>
                <option value="">Select a treatment</option>
                {treatments.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} - {t.price.toLocaleString()} EGP</option>
                ))}
              </select>
            </div>

            {treatment && (
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-3 text-sm flex justify-between">
                <span className="text-gray-600">{treatment.name} ({treatment.duration} min)</span>
                <b className="text-teal-700">{treatment.price.toLocaleString()} EGP</b>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-500">Date</label>
              <input
                type="date"
                min={todayStr}
                className={inputClass}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })}
              />
            </div>

            {form.date && (
              <div>
                <label className="text-sm text-gray-500">Available times</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1">
                  {SLOTS.map((s) => {
                    const isTaken = taken.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        disabled={isTaken}
                        onClick={() => setForm({ ...form, time: s })}
                        className={`py-2 rounded-lg text-xs border ${
                          isTaken
                            ? "bg-gray-100 text-gray-300 line-through cursor-not-allowed"
                            : form.time === s
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-500">Notes (optional)</label>
              <textarea rows={2} className={inputClass} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700">
              Confirm booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}