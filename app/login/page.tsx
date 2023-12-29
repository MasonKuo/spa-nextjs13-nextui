'use client';

import { Link, CardFooter, CardBody, Divider, Image, Card, CardHeader, Input, Spacer, Button } from '@nextui-org/react';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.replace('/');
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <Card className="w-6/12 max-w-[500px] min-w-[300px]">
          <CardHeader className="flex gap-3 justify-center">
            {/* <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            /> */}
            <div className="flex flex-col">
              <p className="text-md">Login</p>
              <p className="text-small text-default-500">spa.vercel.com</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="">
              <Input isClearable fullWidth label="Username" placeholder="Enter your Username" />
              <Spacer y={4} />
              <Input isClearable fullWidth label="Password" type="password" placeholder="Enter your Password" />
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="justify-between">
            <Link isExternal showAnchorIcon size="sm" href="https://github.com/nextui-org/nextui">
              Forgot Password?
            </Link>
            <div>
              <Button color="primary" onClick={handleLogin}>
                Login
              </Button>
              <Button className="ml-2" as={Link} color="success" href="/signup" variant="light">
                Sign Up
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
