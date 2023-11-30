import { logout } from "@/app/services/authService";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className={styles.title}>
      <a className="navbar-brand" href="/">
        Financial Dashboard
      </a>
      <div className={styles.logoutButtonContainer}>
        <form className="d-flex" role="search">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => {
              logout();
              router.push("/pages/login");
            }}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
