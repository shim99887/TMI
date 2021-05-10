import "moment";
import moment from "moment";

export default function datetime(dt) {
  return moment(dt).format("YYYY-MM-DD HH:mm:ss");
}
