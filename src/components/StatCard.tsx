interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-400">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}