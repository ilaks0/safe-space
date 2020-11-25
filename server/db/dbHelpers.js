const request = require('request-promise-native');

module.exports = (db) => {
  
  const getAllReviews = () => {
    const queryString = `
    SELECT *
    FROM reviews;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getReviewsPerBusiness = (id) => {
    const queryString = `
    SELECT *
    FROM reviews
    JOIN users ON users.id = user_id
    WHERE venue_id = $1;
    `;
    const queryParams = [id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };
  
  const submitReview = (user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating) => {
    const queryString = `
    INSERT INTO reviews (user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;
    const queryParams = [user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getIdByUsername = (username) => {
    const queryString = `
    SELECT id 
    FROM users
    WHERE username = $1;
    `;
    const queryParams = [username];
    return db.query(queryString, queryParams)
      .then (response => {
        return response.rows
      });
  };

  const hasUserMadeAPreviousReview = (id, venue_id) => {
    const queryString = `
    SELECT user_id
    FROM reviews 
    WHERE user_id = $1 AND venue_id = $2;
    `;
    const queryParams = [id, venue_id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows[0]
      })
  };

  const increaseHelpfulCount = (id) => {
    const queryString = `
    UPDATE reviews
    SET helpful_count = helpful_count + 1
    where id = $1;
    `;
    const queryParams = [id];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getAllUsersImages = () => {
    const queryString = `
    SELECT id, username, profile_pic, city 
    FROM users 
    `;
    return db.query(queryString, [])
      .then(response => response.rows);

  };
  const getUserRatingChart = (id) => {
    const queryString = `
    SELECT overall_rating 
    FROM reviews 
    WHERE user_id = $1  
    `;
    const queryParams = [Number(id)];
    return db
      .query(queryString, queryParams)
      .then(res => res.rows);
  };
  const getProfileReviews = (id) => {
    const queryString = `
    SELECT * 
    FROM reviews 
    WHERE user_id = $1  
    `;
    const queryParams = [Number(id)];
    return db
      .query(queryString, queryParams)
      .then(res => res.rows);
  };

  const descreaseHelpfulCount = (id) => {
    const queryString = `
    UPDATE reviews
    SET helpful_count = helpful_count - 1
    where id = $1;
    `;
    const queryParams = [id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  }

  const registration = (username, email, password, city) => {
    const queryString = `
    INSERT INTO users (username, email, password , city)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `;
    const queryParams = [username, email, password, city];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  };

  const serverRegistrationValidation = () => {
    const queryString = `
    SELECT username, email 
    FROM users;
    `;
    return db.query(queryString)
      .then(response => {
        return response.rows
      })
  }

  const serverLoginValidation = () => {
    const queryString = `
    SELECT *
    FROM users;
    `;
    return db.query(queryString)
    .then(response => {
      return response.rows
    })
  };

  const checkIfLikesExist = (reviewId, userId) => {
    const queryString = `
    SELECT * 
    FROM liked_reviews
    WHERE review_id = $1 AND user_id = $2;
    `
    const queryParams = [reviewId, userId];

    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows
    })
  };

  const getReviewIdByVenueAndUser = (userId, venue_id) => {
    const queryString = `
    SELECT id 
    FROM reviews
    WHERE user_id = $1 AND venue_id = $2;
    `
    const queryParams = [userId, venue_id]

    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows
    })
  };

  const addLikes = (reviewId, userId) => {
    const queryString = `
    INSERT INTO liked_reviews (review_id, user_id)
    VALUES($1, $2)
    RETURNING *;
    `
    const queryParams = [reviewId, userId];
    console.log("trying to run addLikes with ", reviewId, userId);

    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows[0]
    })
  }; 

  const deleteLikes = (reviewId, userId) => {
    const queryString = `
    DELETE
    FROM liked_reviews
    WHERE review_id = $1 AND user_id = $2
    RETURNING *;
    `
    const queryParams = [reviewId, userId];
    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows;
    })

  }


  return {
    getAllReviews,
    submitReview,
    getIdByUsername,
    getReviewsPerBusiness,
    getAllUsersImages,
    getUserRatingChart,
    getProfileReviews,
    increaseHelpfulCount,
    registration,
    serverRegistrationValidation,
    serverLoginValidation,
    hasUserMadeAPreviousReview,
    checkIfLikesExist,
    getReviewIdByVenueAndUser,
    addLikes,
    deleteLikes,
    descreaseHelpfulCount
  };
};