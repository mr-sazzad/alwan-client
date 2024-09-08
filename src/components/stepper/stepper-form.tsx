import { Button } from "@/components/ui/button";
import { FormValues, IUserAddress, IUserCartProduct } from "@/types";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import AddressInfo from "./steps/address-info";
import OrderSummary from "./steps/order-summery";
import ProductReview from "./steps/product-review";

interface StepperFormProps {
  form: UseFormReturn<FormValues>;
  products: IUserCartProduct[];
  district: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setShippingCost: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  buttonLoading: boolean;
  userAddresses: IUserAddress[];
  handlePlaceOrder: () => void;
  defaultAddress: IUserAddress;
  setSelectedDivisionName: (name: string) => void;
  setSelectedDistrictName: (name: string) => void;
  setSelectedUpazilaName: (name: string) => void;
  setSelectedUnionName: (name: string) => void;
}

const StepperForm: React.FC<StepperFormProps> = ({
  form,
  products,
  district,
  handlePlaceOrder,
  setTotalPrice,
  setShippingCost,
  totalPrice,
  buttonLoading,
  userAddresses,
  defaultAddress,
  setSelectedDivisionName,
  setSelectedDistrictName,
  setSelectedUpazilaName,
  setSelectedUnionName,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    const isValid = validateStep(step);
    if (isValid) {
      setStep(step + 1);
    } else {
      form.trigger();
    }
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = (currentStep: number) => {
    const values = form.getValues();
    switch (currentStep) {
      case 1:
        return form.trigger(["recipientName", "email", "phone"]);
      case 2:
        return form.trigger([
          "division",
          "district",
          "upazila",
          "union",
          "streetAddress",
        ]);
      case 3:
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddressInfo
            setSelectedDivisionName={setSelectedDivisionName}
            setSelectedDistrictName={setSelectedDistrictName}
            setSelectedUpazilaName={setSelectedUpazilaName}
            setSelectedUnionName={setSelectedUnionName}
            isLoggedIn={buttonLoading}
            userAddresses={userAddresses}
            defaultAddress={defaultAddress}
          />
        );
      case 2:
        return <ProductReview products={products} />;
      case 3:
        return (
          <OrderSummary
            products={products}
            district={district}
            buttonLoading={buttonLoading}
            handlePlaceOrder={handlePlaceOrder}
            setTotalPrice={setTotalPrice}
            setShippingCost={setShippingCost}
            totalPrice={totalPrice}
          />
        );
      default:
        return (
          <AddressInfo
            setSelectedDivisionName={setSelectedDivisionName}
            setSelectedDistrictName={setSelectedDistrictName}
            setSelectedUpazilaName={setSelectedUpazilaName}
            setSelectedUnionName={setSelectedUnionName}
            isLoggedIn={buttonLoading}
            userAddresses={userAddresses}
            defaultAddress={defaultAddress}
          />
        );
    }
  };

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < step) return "Completed";
    if (stepNumber === step) return "In Progress";
    return "Pending";
  };

  return (
    <FormProvider {...form}>
      <div className="space-y-8">
        <div className="mt-10">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-start">
                <motion.div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold ${
                    stepNumber < step
                      ? "bg-black text-white"
                      : stepNumber === step
                      ? "bg-blue-800"
                      : "bg-sky-300/40"
                  }`}
                  initial={{ scale: 1 }}
                  animate={{ scale: stepNumber === step ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepNumber < step ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                <motion.div
                  className="mt-2 text-sm font-medium text-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs text-muted-foreground tracking-widest font-light">
                    Step {stepNumber}
                  </div>
                  <div className="text-foreground">
                    {stepNumber === 1 && "Address"}
                    {stepNumber === 2 && "Review"}
                    {stepNumber === 3 && "Summary"}
                  </div>
                  <div
                    className={`text-xs font-light ${
                      getStepStatus(stepNumber) === "Completed"
                        ? "text-green-600"
                        : getStepStatus(stepNumber) === "In Progress"
                        ? "text-blue-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {getStepStatus(stepNumber)}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <motion.div
            className="w-full bg-gray-200 h-1 rounded-full mt-4 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (step - 1) / (totalSteps - 1) }}
            transition={{ duration: 0.5 }}
            style={{ originX: 0 }}
          >
            <div className="h-full bg-green-500 rounded-full" />
          </motion.div>
        </div>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
        <div className="flex justify-between">
          {step > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="rounded-full py-6 px-6"
            >
              Previous
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              className="ml-auto rounded-full py-6 px-6"
              disabled={!validateStep(step)}
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handlePlaceOrder}
              className="ml-auto rounded-full py-6 px-6"
              disabled={buttonLoading}
            >
              {buttonLoading ? "Processing..." : "Place Order"}
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default StepperForm;
