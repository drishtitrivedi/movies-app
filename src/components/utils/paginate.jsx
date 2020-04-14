import _ from "lodash";

const Paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const pageData = _(items).slice(startIndex).take(pageSize).value();

  return pageData;
};

export default Paginate;
