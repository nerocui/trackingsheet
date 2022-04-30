import { useLocation, Navigate } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	getAuth,
	onAuthStateChanged,
	User,
	signOut,
	updatePassword,
} from "firebase/auth";
import {
	createContext,
	ReactNode,
	useState,
	useCallback,
	useEffect,
	useContext,
} from "react";

export interface AuthContextType {
	authenticated: boolean;
	user: null | User;
	signin: (email: string, password: string, callback: VoidFunction) => void;
	signup: (email: string, password: string, callback: VoidFunction) => void;
	signout: (callback: VoidFunction) => void;
	changePassword: (newPassword: string, callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<null | User>(null);
	const [authenticated, setAuthenticated] = useState(false);
	const onAuthChanged = useCallback(
		(_user: null | User) => {
			if (!_user) {
				setUser(null);
				setAuthenticated(false);
			} else {
				setUser(_user);
				setAuthenticated(true);
			}
		},
		[setAuthenticated]
	);
	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, onAuthChanged);
		if (!authenticated && auth.currentUser) {
			setUser(auth.currentUser);
			setAuthenticated(true);
		}
	}, [onAuthStateChanged, auth, onAuthChanged, authenticated]);

	const signin = async (
		email: string,
		password: string,
		callback: VoidFunction
	) => {
		await setPersistence(auth, browserSessionPersistence);
		await signInWithEmailAndPassword(auth, email, password);
		callback();
	};

	const signup = async (
		email: string,
		password: string,
		callback: VoidFunction
	) => {
		await setPersistence(auth, browserSessionPersistence);
		await createUserWithEmailAndPassword(auth, email, password);
		callback();
	};

	const signout = (callback: VoidFunction) => {
		signOut(auth);
		callback();
	};

	const changePassword = useCallback(
		async (newPassword: string, callback: () => void) => {
			if (!!user) {
				try {
					await updatePassword(user, newPassword);
					callback();
				} catch (err) {
					console.log(err);
				}
			}
		},
		[user, updatePassword]
	);

	const value = {
		user,
		signin,
		signup,
		signout,
		authenticated,
		changePassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	let auth = useAuth();
	let location = useLocation();

	if (!auth.authenticated) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}

	return children;
};

export const RequirePublic = ({ children }: { children: JSX.Element }) => {
	let auth = useAuth();
	let location = useLocation();

	if (auth.authenticated) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};
