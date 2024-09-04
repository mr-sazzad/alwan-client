"use client";

const Account = () => {
  return (
    <div className="w-full h-[70%]">
      <div className="">
        <h2 className="text-xl font-semibold">{/* <Image src={} /> */}</h2>
        <p className="text-sm text-muted-foreground">
          Please Select A Section First
        </p>
      </div>
      <div className="flex md:flex-row flex-col md:justify-between place-items-start">
        <div className="w-full">
          <p>address section</p>
        </div>
        <div className="w-full">
          <p>Order section</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
