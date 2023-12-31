'use client';

import { Link, CardFooter, CardBody, Divider, Image, Card, CardHeader, Input, Spacer, Button } from '@nextui-org/react';
import { useState } from 'react';
import { EmailService } from 'service/common';

const MailIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);

const Steps = () => ({});

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const handleSendCode = async () => {
    try {
      await EmailService.SendCode({ email });
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  const handleSignUp = async () => {
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
              <p className="text-primary-400 text-md">Sign Up</p>
              <p className="text-small text-default-500">spa.vercel.com</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="">
              <div className="flex items-center">
                <Input
                  fullWidth
                  label="Email"
                  placeholder="you@example.com"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  // startContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                />
                <Button size="lg" variant="light" onClick={handleSendCode}>
                  验证码
                </Button>
              </div>
              <Spacer y={4} />
              <Input label="Username" placeholder="Enter your Username" />
              <Spacer y={4} />
              <Input label="Password" type="password" placeholder="Enter your Password" />
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="justify-end">
            <Button color="primary" onClick={handleSignUp}>
              Sign Up
            </Button>
            <Button className="ml-2" as={Link} color="success" href="/login" variant="light">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;
