import Textarea from "@/components/common/TextArea";
import OrderSectionTitle from "./OrderSectionTitle";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function OrderDescriptionSection({ value, onChange }: Props) {
  return (
    <section>
      <OrderSectionTitle number='05' title='توضیحات سفارش' />

      <Textarea
        label=''
        name='description'
        value={value}
        onChange={onChange}
        rows={4}
        placeholder='اگر اندازه، رنگ یا طراحی خاصی مدنظر دارید اینجا بنویسید...'
      />
    </section>
  );
}
