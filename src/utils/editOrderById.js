import axios from 'axios';

export const editdraftoerderbyid = id => {
  let data = JSON.stringify({
    id: id,
  });

  let config = {
    method: 'post',
    url: 'https://www.ikhokha.com/_hcms/api/editdraftorderById',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};
