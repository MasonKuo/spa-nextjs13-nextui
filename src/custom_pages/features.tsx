import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
// import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import ConfigTable, { PlusIcon } from "src/components/ConfigTable";
import { VerticalDotsIcon, renderFn } from "src/components/data";
import { useRequest } from "@lib/request";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// export async function fetcher(...args: Parameters<typeof fetch>) {
//   const res = await fetch(...args);
//   return res.json();
// }

const Features = (props) => {
  const [cache, setCache] = useState(0);
  const toggle = () => setCache(new Date().getTime());
  const [isLoading, setIsLoading] = useState(false);

  const { loading, result } = useRequest("/api/hello", {
    trigger: cache,
  });

  const handleCreateUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/hello", { name: "Jacky123" });
      toggle();
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
    setIsLoading(false);
  };
  const handleDelUser = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/hello/${id}`);
      // alert("Del User Success!");
      toggle();
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
    setIsLoading(false);
  };

  const customerRender = {
    actions: (v, r) => {
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon
                  className="text-default-300"
                  width={undefined}
                  height={undefined}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>View</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem color="danger" onClick={() => handleDelUser(r.id)}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    },
  };

  const wrapperColumns = columns.map((i) => ({
    ...i,
    render: renderFn[i.uid] ?? customerRender[i.uid],
  }));

  return (
    <>
      <h2>Features</h2>
      <Button
        size="sm"
        color="primary"
        endContent={<PlusIcon width={undefined} height={undefined} />}
        onClick={handleCreateUser}
        isLoading={isLoading}
      >
        Add New
      </Button>
      <div className="py-2">
        <ConfigTable
          loading={loading}
          columns={wrapperColumns}
          dataSource={result?.data}
        />
      </div>
    </>
  );
};
export default Features;
