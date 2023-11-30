"use client";

import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { authenticate } from "@/app/services/authService";

export type UserDetails = {
  username: string;
  password: string;
  isAuthenticated: boolean;
};

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    password: "",
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserDetails((prev: UserDetails) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
      let token = sessionStorage.getItem("userLoginToken");
      if (token) {
        token = window.atob(token);
        let { isAuthenticated, error } = authenticate({
          username: token.split("_")[0],
          password: token.split("_")[1],
          isAuthenticated: true,
        });
        if (isAuthenticated) router.push("/");
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    return () => {
      isMounted = false;
    };
  }, [router]);
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { isAuthenticated, error } = authenticate(userDetails);
    if (isAuthenticated) {
      setErrorMessage("");
      router.push("/");
    } else {
      setErrorMessage(error);
    }
  };
  return (
    <main className={styles.main}>
      {!loading && (
        <div className={styles.loginFormContainer}>
          <h3>Financial Dashboard</h3>
          <form
            onSubmit={(e) => {
              handleLogin(e);
            }}
            className={styles.loginForm}
          >
            {errorMessage.length > 0 && (
              <div className={styles.errorMessageContainer}>
                <span className={styles.errorMessage}>{errorMessage}</span>
              </div>
            )}
            <div className="input-group mb-3">
              <label
                className="input-group-text text-bg-dark"
                htmlFor="username-input"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control text-bg-dark"
                aria-label="Username Input"
                id="username-input"
                aria-describedby="usernameValidationFeedback"
                name="username"
                required
                value={userDetails.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className={`input-group mb-3`}>
              <label
                className="input-group-text text-bg-dark"
                htmlFor="password-input"
              >
                Password
              </label>
              <input
                type="password"
                className={`form-control text-bg-dark`}
                id="password-input"
                aria-label="Password Input"
                aria-describedby="passwordValidationFeedback"
                name="password"
                required
                value={userDetails.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-md">
              LOGIN
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
