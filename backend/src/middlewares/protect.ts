// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { authenticateSession } from "@/services/session.services";

// Authentication middleware to protect routes from unauthenticated access
export const protect = catchAsync(async (req, res, next) => {
    const accessToken = req.cookies.accessToken as string;

    // 1) Authenticate session (verify JWT, session & user)
    const { user, session } = await authenticateSession({ accessToken });

    // 2) Grant access to protected route and assign user & session to request object
    req.user = user;
    req.session = session;

    next();
});