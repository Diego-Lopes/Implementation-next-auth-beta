"use client";

import { logout } from "@/lib/actions";


export default function Dashboard() {
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
