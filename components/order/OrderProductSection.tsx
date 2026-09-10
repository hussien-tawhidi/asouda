import Select from "@/components/common/CustomeSelect";
import OrderSectionTitle from "./OrderSectionTitle";
import { bedSizeOptions } from "@/constant/orderOptions";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function OrderProductSection({ value, onChange }: Props) {
  return (
    <section>
      <OrderSectionTitle number='01' title='اندازه تخت' />

      <div className='grid gap-4 md:grid-cols-2'>
        <Select
          label='اندازه تخت'
          name='size'
          value={value}
          onChange={onChange}
          options={bedSizeOptions}
        />
      </div>
    </section>
  );
}
