export const initials = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  return `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`;
};
