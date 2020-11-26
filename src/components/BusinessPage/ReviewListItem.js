import { useContext, useState } from 'react';
import 'styles/Register.scss';
import 'styles/ReviewListItem.scss';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { YelpContext } from 'YelpContext.js';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function ReviewListItem(props) {

  const { businessDetails, setBusinessDetails, appState, getIndividualBusinessData } = useContext(YelpContext);

  const [err, setErr] = useState('');

  const showErr = () => {
    setErr('Log in first!');
    setTimeout(() => {
      setErr('');
    }, 2000);
  };

  const updateHelpfulCount = (id, name) => {

    if (props.isProfile) {
      return axios.post('/reviews/helpful', { id, username: name })
        .then((response) => {
          props.profileHelpCount(id, response.data);
          return;
        });
    } else {

      return axios.post('/reviews/helpful', { id, username: name })
        .then((response) => {
          console.log(response);
          if (response.data === "add") {
            const updatedBusinessDetails = { ...businessDetails };
            updatedBusinessDetails.reviews.map
              (review => review.id === id ?
                review.helpful_count += 1
                : "");
            setBusinessDetails(updatedBusinessDetails);
          }
          if (response.data === "delete") {
            const updatedBusinessDetails = { ...businessDetails };
            updatedBusinessDetails.reviews.map
              (review => review.id === id && review.helpful_count > 0 ?
                review.helpful_count -= 1
                : "");
            setBusinessDetails(updatedBusinessDetails);
          };
        });
    }
  };

  const convertTime = (date) => {
    const time = new Date(date).getTime();
    let unit = "second";
    let diff = (new Date().getTime() - time) / 1000;

    if (diff >= 60) {
      // convert to minutes
      diff /= 60;
      unit = "minute";
      if (diff >= 60) {
        // '' hours
        diff /= 60;
        unit = "hour";
        if (diff >= 24) {
          // '' days
          diff /= 24;
          unit = "day";
          if (diff >= 30) {
            // '' months
            diff /= 30;
            unit = "month";
            if (diff >= 12) {
              // '' years
              diff /= 12;
              unit = "year";
            }
          }
        }
      }
    }
    diff = parseInt(diff);
    if (diff !== 1) unit += "s";
    return `${diff} ${unit} ago`;
  };
  const pageRedirect = () => {
    if(props.isProfile) {

    }
  }


  const formatDateString = date => {
    const newDate = new Date(date);
    const dateShortened = newDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    return dateShortened
  };

  return (
    <div className='review-container'>
      <div className='user'>
        {
          props.picture &&
          <Link to={`/users/${props.user_id}`} >

            <img className='profile-img' src={props.picture} alt='no img found' />
          </Link>
        }
        <div className="username-date">
          <Link to={props.isProfile ? `/search/${props.venue_id}`: `/users/${props.user_id}`}> 
            <span onClick={props.isProfile ? () => getIndividualBusinessData(props.venue_id) : null}className='review-header-link'>{props.isProfile ? props.venue_name : props.username}</span>
          </Link>
          <span class="date">{formatDateString(props.date)}</span>
        </div>
      </div>
      <div className='review-content'>
        <div className='review-numbers'>
          <table className='review-table'>
            <tr>
              <td>
                Cleanliness
              </td>
              <td>
                {props.cleanliness}
              </td>
            </tr>
            <tr>
              <td>
                Distancing
              </td>
              <td>
                {props.social_distancing}
              </td>
            </tr>
            <tr>
              <td>
                Transaction
              </td>
              <td>
                {props.transaction_process}
              </td>
            </tr>
            <tr>
              <td>
                Overall
              </td>
              <td>
                {props.overall_rating}
              </td>
            </tr>
          </table>
          <div>
            <p>{props.description}</p>
          </div>

        </div>
      </div>
      <div className='review-footer'>
        {/*eslint-disable-next-line */}
        { appState.authorized ? (
          <div className='helpful-count'>
            <ThumbUpAltIcon onClick={updateHelpfulCount(props.id, appState.name)} style={{ color: '#1E0253' }} />
          </div>
        ) : (
          <div className='helpful-count-read-only'>
            <ThumbUpAltIcon style={{ color: '#1E0253' }} />
          </div>
        )}
        {props.helpful_count}
        <div className='error-container'>
          <div className='error'>
            {err && err}
          </div>
        </div>
        <div className='date'>
          {convertTime(props.date)}
        </div>
      </div>

    </div>
  );
}