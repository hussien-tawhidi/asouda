export default function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='p-5'>
      <p className='text-xs text-espresso-clay/50'>{label}</p>

      <p className='mt-2 text-sm font-medium text-espresso-clay'>{value}</p>
    </div>
  );
}
