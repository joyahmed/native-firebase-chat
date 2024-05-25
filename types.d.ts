interface User {
	email: string;
	userName: string;
	profileUrl: string;
	userId: string;
}

interface ChatProps {
	user: User;
	router: ExpoRouter.Router;
}

interface Message {
	userId: string;
	text: string;
	profileUrl?: string;
	senderName: string;
	createdAt: { seconds: number; nanoseconds: number };
}
