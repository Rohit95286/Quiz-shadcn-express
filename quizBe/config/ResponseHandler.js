export const responseHandler = ({
  req,
  res,
  data = [],
  success = true,
  message = "Unknown Error",
  status = 500,
  count,
}) => {
  res.status(status).json({
    success: success,
    message: message,
    data: data,
    ...(count ? {count} : {}),
  });
};
