import Input from "@/components/common/Input";
import OrderSectionTitle from "./OrderSectionTitle";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OrderContactSection({ value, onChange }: Props) {
  return (
    <section>
      <OrderSectionTitle number='06' title='اطلاعات تماس' />

      <Input
        type='tel'
        name='phone'
        label=''
        value={value}
        onChange={onChange}
        required
        placeholder='09xxxxxxxxx'
      />
     
    </section>
  );
}
