import { Button } from "@nextui-org/react";
import useSWR from "swr";
import axios from "axios";

export async function fetcher(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);
  return res.json();
}

const Features = () => {
  // const { isLoading, data } = useSWR("/api/hello", fetcher);
  // if (isLoading) return <>Loading</>;

  const handleCreateUser = async () => {
    try {
      const res = await axios.post("/api/hello", { name: "Jacky123" });
      alert("Add User Success!");
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
  };
  const handleDelUser = async () => {
    try {
      const res = await axios.delete("/api/hello/5");
      alert("Del User Success!");
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
  };

  return (
    <>
      <h2>Features</h2>
      <Button onClick={handleCreateUser}>InSert Name</Button>
      <Button onClick={handleDelUser} color="danger" variant="solid">
        Del Name
      </Button>
    </>
  );
};
export default Features;
