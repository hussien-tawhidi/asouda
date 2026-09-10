import Select from "@/components/common/CustomeSelect";
import MultiSelect from "@/components/common/MultiSelect";
import OrderSectionTitle from "./OrderSectionTitle";
import { drawerOptions, extraOptions, mattressOptions } from "@/constant/orderOptions";

interface Props {
  mattress: string;
  drawers: string;
  extras: string[];

  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  onExtrasChange: (values: string[]) => void;
}

export default function OrderOptionsSection({
  mattress,
  drawers,
  extras,
  onChange,
  onExtrasChange,
}: Props) {
  return (
    <section>
      <OrderSectionTitle number='04' title='امکانات و تجهیزات' />

      <div className='grid gap-4 md:grid-cols-2'>
        <Select
          label='نوع تشک'
          name='mattress'
          value={mattress}
          onChange={onChange}
          options={mattressOptions}
        />

        <Select
          label='تعداد کشو'
          name='drawers'
          value={drawers}
          onChange={onChange}
          options={drawerOptions}
        />
      </div>
      <div className='mt-4'>
        <MultiSelect
          label='امکانات اضافی'
          options={extraOptions}
          value={extras}
          onChange={onExtrasChange}
          placeholder='جستجو یا اضافه کنید...'
          creatable
        />
      </div>
     
    </section>
  );
}
