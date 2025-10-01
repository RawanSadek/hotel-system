import Home from "./components/Home";
import AdsSwiper from "./components/AdsSwiper";
import MostAds from "./components/MostAds";
import reviewImg from "../../../Images/review.png";
import ReviewCard from "./components/ReviewCard";

export default function LandingPage() {
  return (
    <>
      <Home />
      <MostAds />
      <AdsSwiper />
      <ReviewCard
        imageUrl={reviewImg}
        title="Happy Family "
        reviewerName="John Doe"
        rating={4.5}
        reviewText="We had a wonderful stay at this hotel. The service was excellent and the rooms were very comfortable."
        reviewerRole="Product Designer"
      />
    </>
  );
}
