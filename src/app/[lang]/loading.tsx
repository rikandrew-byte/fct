import SkeletonLoader from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#020617] pt-44 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <SkeletonLoader type="card" className="h-[400px]" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkeletonLoader type="card" className="h-[250px]" />
          <SkeletonLoader type="card" className="h-[250px]" />
          <SkeletonLoader type="card" className="h-[250px]" />
        </div>
      </div>
    </div>
  );
}
