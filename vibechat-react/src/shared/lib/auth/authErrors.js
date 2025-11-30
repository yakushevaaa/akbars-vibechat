export const handleAuthErrors = (response) => {
  const details = response?.details ?? [];
  const newErrors = {};
  
  if (!details.length) {
    return {}
  };

  // [].forEach()
  for (const detail of response.details) {
    const message = detail.message.toLowerCase();

    // todo
    if (message.includes("email")) newErrors.email = detail.message;
    else if (message.includes("никнейм")) newErrors.nickName = detail.message;
    else if (message.includes("пароль")) newErrors.password = detail.message;
    else if (message.includes("фио")) newErrors.full_name = detail.message;
  }

  return newErrors;
};
