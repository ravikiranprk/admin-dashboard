import Table from "@/components/Table";
import { Suspense } from "react";

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/users');
  const users = await data.json();

  // console.log(users);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Table data={users.users} />
      </Suspense>
    </>
  );
}
