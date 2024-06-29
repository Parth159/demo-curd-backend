exports.GetHighestRole = (userRoleList) => {
  return userRoleList.sort((a, b) => {
    if (a.slug < b.slug) {
      return -1;
    }
    if (a.slug > b.slug) {
      return 1;
    }
    return 0;
  })[0];
};
