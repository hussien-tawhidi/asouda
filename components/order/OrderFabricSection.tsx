import Select from "@/components/common/CustomeSelect";
import OrderSectionTitle from "./OrderSectionTitle";
import { fabricColorOptions, fabricOptions } from "@/constant/orderOptions";

interface Props {
  fabric: string;
  fabricColor: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function OrderFabricSection({
  fabric,
  fabricColor,
  onChange,
}: Props) {
  return (
    <section>
      <OrderSectionTitle number='03' title='پارچه و رنگ' />

      <div className='grid gap-4 md:grid-cols-2'>
        <Select
          label='نوع پارچه'
          name='fabric'
          value={fabric}
          onChange={onChange}
          options={fabricOptions}
        />

        <Select
          label='رنگ پارچه'
          name='fabricColor'
          value={fabricColor}
          onChange={onChange}
          options={fabricColorOptions}
        />
      </div>
    </section>
  );
}
