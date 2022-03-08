import axios from 'axios';

export const getSurburbList = (searchTerm, setShowElipsis, setRamData) => {
  if (searchTerm !== '' && searchTerm.length > 3) {
    setShowElipsis(true);
    axios({
      url: `https://www.ikhokha.com/_hcms/api/fetchramzone`,
      method: 'post',
      data: {
        searchTerm: searchTerm,
      },
    })
      .then(function(response) {
        setShowElipsis(false);
        if (response.data.length > 0) {
          setRamData(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    setRamData(null);
  }
};
