import { Input } from "@nextui-org/react";
import ConfigTable from "src/components/ConfigTable";

const Portal = () => {
  return (
    <>
      <div>
        <Input
          isClearable
          label="Search"
          size="sm"
          variant="faded"
          className="max-w-xs"
        />
        <div className="mt-2">
          <ConfigTable />
        </div>
      </div>
      {/* <Link to="/redirect">Redirect</Link> */}
    </>
  );
};
export default Portal;
