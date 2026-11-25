export const stats = [
  { label: "Patients Today", value: 12 },
  { label: "Appointments", value: 18 },
  { label: "Revenue Today", value: "4,500 EGP" },
  { label: "Pending Bills", value: 7 },
];

export const patients = [
  { id: 1, name: "Mohamed Ali", phone: "01012345678", age: 32, lastVisit: "2026-11-20" },
  { id: 2, name: "Sara Ahmed", phone: "01123456789", age: 27, lastVisit: "2026-11-22" },
  { id: 3, name: "Omar Hassan", phone: "01234567890", age: 41, lastVisit: "2026-11-18" },
  { id: 4, name: "Nour Khaled", phone: "01098765432", age: 24, lastVisit: "2026-11-24" },
];

export const appointments = [
  { id: 1, patient: "Mohamed Ali", treatment: "Filling", time: "10:00 AM", status: "Confirmed" },
  { id: 2, patient: "Sara Ahmed", treatment: "Whitening", time: "11:30 AM", status: "Pending" },
  { id: 3, patient: "Omar Hassan", treatment: "Cleaning", time: "01:00 PM", status: "Confirmed" },
  { id: 4, patient: "Nour Khaled", treatment: "Root Canal", time: "03:00 PM", status: "Cancelled" },
];

export const treatments = [
  { id: 1, name: "Cleaning", duration: 30, price: 300 },
  { id: 2, name: "Filling", duration: 45, price: 500 },
  { id: 3, name: "Whitening", duration: 60, price: 1500 },
  { id: 4, name: "Root Canal", duration: 90, price: 2500 },
  { id: 5, name: "Crown", duration: 60, price: 3000 },
];

export const invoices = [
  { id: "INV-001", patient: "Mohamed Ali", treatment: "Filling", amount: 500, date: "2026-11-20", status: "Paid" },
  { id: "INV-002", patient: "Sara Ahmed", treatment: "Whitening", amount: 1500, date: "2026-11-22", status: "Pending" },
  { id: "INV-003", patient: "Omar Hassan", treatment: "Cleaning", amount: 300, date: "2026-11-18", status: "Overdue" },
  { id: "INV-004", patient: "Nour Khaled", treatment: "Root Canal", amount: 2500, date: "2026-11-24", status: "Paid" },
];

export const weeklyPatients = [
  { day: "Sat", patients: 10 },
  { day: "Sun", patients: 14 },
  { day: "Mon", patients: 9 },
  { day: "Tue", patients: 16 },
  { day: "Wed", patients: 12 },
  { day: "Thu", patients: 18 },
];