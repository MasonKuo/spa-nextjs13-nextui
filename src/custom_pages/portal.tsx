import { Input } from '@nextui-org/react';
import ConfigTable from 'src/components/ConfigTable';
import { users } from 'src/components/data';

const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'AGE', uid: 'age', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'TEAM', uid: 'team' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const Portal = (props) => {
  return (
    <>
      <div>
        <Input isClearable label="Search" size="sm" variant="faded" className="max-w-xs" />
        <div className="mt-2">
          <ConfigTable columns={columns} dataSource={users} />
        </div>
      </div>
      {/* <Link to="/redirect">Redirect</Link> */}
    </>
  );
};
export default Portal;
