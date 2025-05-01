import { StarRatingProps } from "@/types/common";
import { Star } from "lucide-react";

export default function StarRating({ value, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < value ? "text-red-400 fill-red-400" : "text-gray-300"
          }`}
          fill={index < value ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}