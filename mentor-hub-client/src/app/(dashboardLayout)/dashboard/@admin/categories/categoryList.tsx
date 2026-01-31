export default function CategoryList({ categories }: any) {
  return (
    <div className="space-y-2">
      {categories.map((cat: any) => (
        <div
          key={cat.id}
          className="p-3 border rounded-md bg-white shadow-sm"
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
}