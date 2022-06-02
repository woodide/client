import { useState } from "react";

function useForm(initValue) {
  const [value, setValue] = useState(initValue);

  const handleChange = (e) =>
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

  return { handleChange, value };
}

export default useForm;
