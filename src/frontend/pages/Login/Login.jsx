import "./login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/hook-export";

export function Login() {
  const { authState, authDispatch, login } = useAuth();

  return (
    <div className="flex">
      <div className="card card-width p-2">
        <h2 className="text-center">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div className="pt-1">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abcd@gmail.com"
              className="input"
              required
              value={authState.email}
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
          </div>
          <div className="pt-1">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="input"
              required
              value={authState.password}
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <div className="pt-1 pb-1 flex flex-start small-gap">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <div className="pt-1">
            <Link to="/login" className="link text-info">
              Forgot your Password ?
            </Link>
          </div>
          <button className="btn btn-primary full-width mt-1">Login</button>
          &nbsp;
          <p
            className="flex outline-btn"
            onClick={() => authDispatch({ type: "TEST_CREDENTIALS" })}
          >
            Login with test credentials
          </p>
          <h3 className="flex pt-1 incorrect">{authState.errorMsg}</h3>
          <Link to="/signup" className="link">
            <div className="flex small-gap">
              Create new Account
              <span className="material-icons-outlined icon chevron-right">
                chevron_right
              </span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
