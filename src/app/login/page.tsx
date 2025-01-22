import { Suspense } from "react";
import { Form } from "../components/form";

export default function Home() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  )
}
