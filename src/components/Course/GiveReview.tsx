import { useState } from "react";
import { Star } from "lucide-react";
import { giveReviewApi } from "@/api/courseService";
import { toast } from "react-toastify";

export const GiveReview: React.FC<{
  course_id: string | undefined;
}> = ({ course_id }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = (index: number) => {
    setRating(index);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!course_id) return;
      const response = await giveReviewApi(course_id, rating);
      toast.success(
        `Hurray! Review received. The course average rating is now :${response.data.courseAvgrating} `
      );
    } catch (error) {
      console.log("Error giving review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <Star
            key={index}
            size={32}
            className={`cursor-pointer transition-all ${
              index <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleRating(index)}
          />
        ))}
      </div>
      <button
        className="mt-4 bg-brand-primary text-white hover:opacity-90 cursor-pointer px-6 py-2 rounded-2xl "
        onClick={handleSubmit}
        disabled={rating === 0 || loading}
      >
        Submit Review
      </button>
    </div>
  );
};
