import Select from "@/components/common/CustomeSelect";
import OrderSectionTitle from "./OrderSectionTitle";
import { woodColorOptions, woodOptions } from "@/constant/orderOptions";

interface Props {
  wood: string;
  woodColor: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function OrderMaterialSection({
  wood,
  woodColor,
  onChange,
}: Props) {
  return (
    <section>
      <OrderSectionTitle number='02' title='جنس و رنگ چوب' />

      <div className='grid gap-4 md:grid-cols-2'>
        <Select
          label='جنس چوب'
          name='wood'
          value={wood}
          onChange={onChange}
          options={woodOptions}
        />

        <Select
          label='رنگ چوب'
          name='woodColor'
          value={woodColor}
          onChange={onChange}
          options={woodColorOptions}
        />
      </div>
    </section>
  );
}
