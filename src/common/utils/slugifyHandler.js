import slugify from "slugify";

const slugifyHandler = (arr) => {
  if (arr || arr.length || arr == undefined) {
    if (typeof arr == "string") {
      arr = arr.split(",");
      return arr.map((i) => slugify(i, "_"));
    } else {
      return arr.map((i) => slugify(i, "_"));
    }
  } else {
    return [];
  }
};

export default slugifyHandler;
