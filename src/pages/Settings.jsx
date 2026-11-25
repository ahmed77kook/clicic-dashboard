import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Settings() {
  const [clinic, setClinic] = useState({
    name: "Dental Clinic",
    phone: "",
    address: "",
    hours: "10:00 AM - 8:00 PM",
  });
  const [saved, setSaved] = useState(false);
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Ahmed", specialty: "General Dentistry" },
    { id: 2, name: "Dr. Mona", specialty: "Orthodontics" },
  ]);
  const [doc, setDoc] = useState({ name: "", specialty: "" });

  const saveClinic = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addDoctor = (e) => {
    e.preventDefault();
    if (!doc.name) return;
    setDoctors([...doctors, { id: Date.now(), ...doc }]);
    setDoc({ name: "", specialty: "" });
  };

  const inputClass = "w-full border rounded-lg px-3 py-2 text-sm";

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <form onSubmit={saveClinic} className="bg-white border rounded-xl p-5 space-y-4">
        <h3 className="font-semibold">Clinic Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-500">Clinic name</label>
            <input className={inputClass} value={clinic.name} onChange={(e) => setClinic({ ...clinic, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input className={inputClass} value={clinic.phone} onChange={(e) => setClinic({ ...clinic, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-gray-500">Address</label>
            <input className={inputClass} value={clinic.address} onChange={(e) => setClinic({ ...clinic, address: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-gray-500">Working hours</label>
            <input className={inputClass} value={clinic.hours} onChange={(e) => setClinic({ ...clinic, hours: e.target.value })} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700">Save changes</button>
          {saved && <span className="text-sm text-green-600">Saved ✓</span>}
        </div>
      </form>

      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h3 className="font-semibold">Doctors</h3>
        <div className="space-y-2">
          {doctors.map((d) => (
            <div key={d.id} className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm">
              <div>
                <p className="font-medium text-gray-800">{d.name}</p>
                <p className="text-gray-500">{d.specialty}</p>
              </div>
              <button onClick={() => setDoctors(doctors.filter((x) => x.id !== d.id))} className="text-gray-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={addDoctor} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className={inputClass} placeholder="Doctor name" value={doc.name} onChange={(e) => setDoc({ ...doc, name: e.target.value })} />
          <input className={inputClass} placeholder="Specialty" value={doc.specialty} onChange={(e) => setDoc({ ...doc, specialty: e.target.value })} />
          <button className="flex items-center justify-center gap-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700">
            <Plus size={16} /> Add
          </button>
        </form>
      </div>
    </div>
  );
}