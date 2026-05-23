interface ReviewCardProps {
  name: string;
  text: string;
}

function ReviewCard({ name, text }: ReviewCardProps) {
  return (
    <div className="review-card">
      <h3 className="review-card-name">{name}</h3>
      <p className="review-card-text">{text}</p>
    </div>
  );
}

export default ReviewCard;
