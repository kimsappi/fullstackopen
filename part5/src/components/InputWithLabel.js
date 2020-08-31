import React from 'react';

const CustomInputField = ({ type, name, state, eventHandler, step = 1, pattern, required, max, min, id }) => {
  if (type === 'textarea')
    return <textarea id={id} name={name} className="form-control" onChange={event => eventHandler(event)} value={state || ''} required={required ? true : false} />;
  else if (type === 'number' && typeof max !== 'undefined' && typeof min !== 'undefined')
    return <input id={id} type={type} className="form-control" name={name} value={state} onChange={event => eventHandler(event)} step={step} min={min} max={max} required={required} />;
  else if (type === 'number')
    return <input id={id} type={type} className="form-control" name={name} value={state} onChange={event => eventHandler(event)} step={step} required={required} />;
  else if (type === 'text' && pattern)
    return <input id={id} type={type} className="form-control" name={name} value={state} onChange={event => eventHandler(event)} pattern={pattern} required={required} />;
  else
    return <input id={id} type={type} className="form-control" name={name} value={state} onChange={event => eventHandler(event)} required={required} />;

};

const InputWithLabel = ({ type, name, label, state, setState, step, integer, pattern, required, max, min, id }) => {
  const eventHandler = event => {
    if (!integer || Number.isInteger(Number(event.target.value)))
      setState(event.target.value);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <CustomInputField id={id} type={type} name={name} state={state} eventHandler={eventHandler} step={step} pattern={pattern} required={required} max={max} min={min} />
      <br />
    </div>
  );
};

export default InputWithLabel;
