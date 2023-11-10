import { ReactNode } from "react";
import StepsBody from "./StepsBody";
import StepsFooter from "./StepsFooter";
import StepsHeader from "./StepsHeader";

export interface Step {
  label: String;
  value: String | Number | undefined;
  children: ReactNode;
}

interface Props {
  steps: Step[];
}

const StepsContainer = ({ steps }: Props) => {
  return (
    <>
      <StepsHeader></StepsHeader>
      <StepsBody></StepsBody>
      <StepsFooter></StepsFooter>
    </>
  );
};

export default StepsContainer;
