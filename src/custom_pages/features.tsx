import { Button } from "@nextui-org/react";
// import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

export async function fetcher(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);
  return res.json();
}

const Features = () => {
  // const { isLoading, data } = useSWR("/api/hello", fetcher);
  // if (isLoading) return <>Loading</>;
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/hello", { name: "Jacky123" });
      alert("Add User Success!");
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
    setIsLoading(false);
  };
  const handleDelUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete("/api/hello/5");
      alert("Del User Success!");
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
    setIsLoading(false);
  };

  return (
    <>
      <h2>Features</h2>
      <Button onClick={handleCreateUser} isLoading={isLoading}>
        Insert Name
      </Button>
      <Button
        onClick={handleDelUser}
        isLoading={isLoading}
        color="danger"
        variant="solid"
      >
        Del Name
      </Button>
    </>
  );
};
export default Features;
