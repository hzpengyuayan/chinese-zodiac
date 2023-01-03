import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li className={styles.nav}>
          <Link to="/">Play</Link>
        </li>
        <li className={styles.nav}>
          <Link to="/setting">Setting</Link>
        </li>
        <li className={styles.nav}>
          <a href="https://gitee.com/hzpenyuyan/chinese-zodiac">Gitee</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
