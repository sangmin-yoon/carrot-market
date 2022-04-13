import { useState } from "react";

interface UseMutaionState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutaionResult<T> = [(data: any) => void, UseMutaionState<T>];

export default function useMutaion<T = any>(url: string): UseMutaionResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
