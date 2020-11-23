import {useContext} from 'react';
import { YelpContext } from 'YelpContext';
import ReviewListItem from './ReviewListItem';
import Sort from 'components/Sort';


export default function ReviewList(props) {

  const {sortBy, businessDetails} = useContext(YelpContext);

  

  const reviews = props.reviews.map(review => {
    return <ReviewListItem 
    username={review.user_id}
    social_distancing={review.socialdistancing}
    transaction_process={review.socialdistancing}
    cleanliness={review.cleanliness}
    overall_rating={review.overall_rating}
    date={review.date}
    helpful_count={review.helpful_count}
    description={review.description}
    id={review.id}
    />
  });

  const sortOptions = [
    {
      id: "overall_rating",
      value: "Safe Score"
    },
    {
      id: "helpful_count",
      value: "Helpful Count"
    }
  ];

  const handleSort = (property) => {
    sortBy(businessDetails.reviews, property, false);
  }
  

  return (
    <div>
      <Sort sortOptions={sortOptions} defaultOption={sortOptions[0].id} onClick={handleSort} />
      {reviews}
    </div>
  )

}