import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {/* Loading Title */}
      <div className="mb-4">
        <Skeleton className="h-6 w-1/3" />
      </div>

      {/* Loading Task Items */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-6">
          {/* Task Name */}
          <Skeleton className="h-5 w-1/4 mb-2" />
          {/* Task Description */}
          <Skeleton className="h-4 w-1/2 mb-2" />
          {/* Task Dates */}
          <div className="flex gap-2 mb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}

      {/* Loading Footer Button */}
      <Skeleton className="h-8 w-36 mx-auto" />
    </div>
  );
};

export default SkeletonLoader;
