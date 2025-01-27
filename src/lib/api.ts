import { auth } from "@/auth";

export async function fetchProtectedData() {
  const session = await auth();

  const response = await fetch('https://sua-api.com/dados', {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  });

  return response.json();
} 