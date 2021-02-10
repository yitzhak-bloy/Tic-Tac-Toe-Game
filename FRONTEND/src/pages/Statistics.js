import { useState, useContext, useEffect } from 'react';

import { UserContext } from '../shared/context/User-context';
import { useHttpClient } from '../shared/hooks/http-hook';

const Statistics = () => {
  const emailOfUser = useContext(UserContext).user.user.email;

  const [userStatistic, setUserStatistic] = useState(undefined);

  const { loading, error, sendRequest, handleClosePopsUp } = useHttpClient();

  let allUsers;
  useEffect(() => {
    const a = async () => {
      try {
        allUsers = await sendRequest('http://localhost:5000/api/userStatistics/');
        setUserStatistic(allUsers.users)
      } catch (err) { }
    }
    a()
  }, [])

  if (!emailOfUser) {
    return "מצטערים חבל של נרשמת"
  }

  if (!userStatistic) {
    return <h1>i am Statistics!</h1>
  }

  let userSta = userStatistic.filter((user) => user.email == emailOfUser)[0];

  return (
    <div>
      <h1>{userSta.name}</h1>
      <h2>hard</h2>
      <h3>averageRating: {userSta.statistic.hard.averageRating}</h3>
      <h3>victory: {userSta.statistic.hard.victory}</h3>
      <h3>loss: {userSta.statistic.hard.loss}</h3>
      <h3>draw: {userSta.statistic.hard.draw}</h3>
      <h2>easy</h2>
      <h3>averageRating: {userSta.statistic.easy.averageRating}</h3>
      <h3>victory: {userSta.statistic.easy.victory}</h3>
      <h3>loss: {userSta.statistic.easy.loss}</h3>
      <h3>draw: {userSta.statistic.easy.draw}</h3>
    </div>
  )
};

export default Statistics;