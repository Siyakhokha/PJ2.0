/* Select custom styles to be extracted */
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '16px',
    border: '2px solid',
    width: '100%',
    padding: state.isFocused ? '5px' : '5px',
    borderColor: state.isFocused ? '#00adbb' : '#00000',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    fill: '#000000',
    color: '#000000',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
