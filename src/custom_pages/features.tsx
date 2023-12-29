import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useRef, useState, useImperativeHandle } from "react";
import ConfigTable, { PlusIcon } from "src/components/ConfigTable";
import { VerticalDotsIcon, renderFn } from "src/components/data";
import ActionsModal, { ModalProps } from "src/components/ActionsModal";
import { UserService } from "service/user";

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

const initModalProps: ModalProps = {
  title: "",
  isOpen: false,
  onOK: null,
  onClose: null,
  otherActions: null,
  children: null,
};

const CreatePanel = ({ myref, callback }: { myref?; callback? }) => {
  const [username, setUsername] = useState<any>();
  useImperativeHandle(myref, () => ({
    username,
  }));

  return (
    <>
      <Input
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && callback?.()}
      />
    </>
  );
};

const Features = (props) => {
  const myref = useRef<any>();
  const modref = useRef<any>();
  const [cache, setCache] = useState(0);
  const [modalProps, setModalProps] = useState(initModalProps);
  const initModal = () => setModalProps(initModalProps);
  const toggle = () => setCache(new Date().getTime());
  const [isLoading, setIsLoading] = useState(false);

  const { loading, result } = UserService.UserList({
    trigger: cache,
  });

  const createUser = async (name) => {
    try {
      setIsLoading(true);
      await UserService.CreateUser({ name });
      toggle();
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data?.msg));
    }
    setIsLoading(false);
  };

  const handleCreateUser = () => {
    setModalProps({
      title: "Add New User",
      isOpen: true,
      onClose: initModal,
      onOK: () => {
        const username = myref.current.username;
        createUser(username);
        initModal();
      },
      children: (
        <CreatePanel myref={myref} callback={() => modref.current.onOK()} />
      ),
    });
  };

  const handleDelUser = async (id) => {
    try {
      setIsLoading(true);
      await UserService.DelUser(id);
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
        Add
      </Button>
      <div className="py-2">
        <ConfigTable
          loading={loading || isLoading}
          columns={wrapperColumns}
          dataSource={result?.data ?? []}
        />
      </div>
      <ActionsModal myref={modref} {...modalProps} />
    </>
  );
};
export default Features;
