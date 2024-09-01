import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "@/types";
import { useFormContext } from "react-hook-form";

const UserInfo: React.FC = () => {
  const { control, watch } = useFormContext<FormValues>();

  const username = watch("username");
  const email = watch("email");
  const phone = watch("phone");
  const altPhone = watch("altPhone");

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Abdullah" {...field} value={username || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="example@gmail.com"
                {...field}
                value={email || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="017******21"
                  {...field}
                  value={phone || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="altPhone"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Alt Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="018******37"
                  {...field}
                  value={altPhone || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default UserInfo;
