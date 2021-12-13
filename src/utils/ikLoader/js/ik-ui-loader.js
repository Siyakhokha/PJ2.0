//loader
export const showLoader = (textLabel = 'loading') => {
  let loaderAnimContainer = document.createElement('div');
  loaderAnimContainer.className = 'loaderAnimContainer';

  let loaderImage = document.createElement('img');
  loaderImage.src =
    'https://f.hubspotusercontent40.net/hubfs/6412394/Sales%20Breakout%20Page/Icons/iK-Load-Animation.gif';
  loaderImage.className = 'loaderImage';

  let _textLabel = document.createElement('label');
  _textLabel.innerHTML = textLabel;

  loaderAnimContainer.append(loaderImage);
  loaderAnimContainer.append(_textLabel);
  document.body.append(loaderAnimContainer);
};

export const clearLoader = () => {
  let ele = document.querySelector('.loaderAnimContainer');
  ele.parentNode.removeChild(ele);
};

export const changeLoaderText = textValue => {
  document.querySelector('.loaderAnimContainer label').innerHTML = textValue;
};

export const changeLoaderIcon = icoSrc => {
  document.querySelector('.loaderAnimContainer .loaderImage').src = icoSrc;
  document
    .querySelector('.loaderAnimContainer .loaderImage')
    .classList.add('customIcon');
};

export const loaderAppendElement = ele => {
  document.querySelector('.loaderAnimContainer').appendChild(ele);
  document.querySelector('.loaderAnimContainer').classList.add('expanded');
};
