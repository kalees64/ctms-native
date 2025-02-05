export const validateForm = (data: any, setErrors: any) => {
  const inputs = Object.keys(data) as Array<keyof typeof data>;

  setErrors((prevErrors: any) => {
    const newErrors = { ...prevErrors };

    inputs.forEach((input) => {
      //   console.log("--Input: ", data[input]);
      newErrors[input] = !data[input].length; // Set true if empty, false otherwise
    });

    console.log("--New Errors: ", newErrors);

    return newErrors;
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^[\w-]+(\.[\w-]+)*@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
