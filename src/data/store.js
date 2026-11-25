import { useState, useEffect } from "react";

const KEY = "clinic_appointments";
const AUTH_KEY = "clinic_auth";

export const SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const write = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export function useAppointments() {
  const [appointments, setAppointments] = useState(read);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setAppointments(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = (list) => {
    write(list);
    setAppointments(list);
  };

  const add = (data) => {
    const item = {
      ...data,
      id: Date.now(),
      code: "BK-" + Math.floor(1000 + Math.random() * 9000),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    update([...read(), item]);
    return item;
  };

  const setStatus = (id, status) =>
    update(read().map((a) => (a.id === id ? { ...a, status } : a)));

  const remove = (id) => update(read().filter((a) => a.id !== id));

  return { appointments, add, setStatus, remove };
}

export const isLoggedIn = () => localStorage.getItem(AUTH_KEY) === "true";

export const login = (email, password) => {
  if (email === "admin@clinic.com" && password === "clinic123") {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const logout = () => localStorage.removeItem(AUTH_KEY);