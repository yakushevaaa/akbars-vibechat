export const handleAuthErrors = (response) => {
  const details = response?.details ?? [];
  if (!details.length) return {};

  const newErrors = {};

  for (const detail of response.details) {
    const message = detail.message.toLowerCase();

    if (message.includes("email")) newErrors.email = detail.message;
    else if (message.includes("никнейм")) newErrors.nickName = detail.message;
    else if (message.includes("пароль")) newErrors.password = detail.message;
    else if (message.includes("фио")) newErrors.full_name = detail.message;
  }

  return newErrors;
};
