import styles from "./index.less";
import Slider from "@/components/slider"

export default function index() {
  return (
    <div>
      <ul className={styles["setting-list"]}>
        <li>最大个数:120(个)<Slider></Slider></li>
        <li>最大层数:5(层)</li>
        <li>最大行数:10(行)</li>
        <li>最大列数:10(列)</li>
      </ul>
    </div>
  );
}
