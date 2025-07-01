import { useRegisterUserMutation } from '@/app/api/authApi';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { configs } from '@/configs/site_configs';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { registerSchema } from '@/schema';
import type { TRegisterUser } from '@/types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [registerUser, { isLoading, error }] = useRegisterUserMutation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TRegisterUser>({
		resolver: zodResolver(registerSchema),
	});

	const handleRegister = async (data: TRegisterUser) => {
		try {
			const { success } = await registerUser(data).unwrap();
			if (success) {
				navigate('/login');
			}
		} catch (err) {
			console.error('Registration failed:', err);
		}
	};

	useDocumentTitle(`Register - ${configs.site_title}`);

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center mb-4">
						<Calendar className="h-8 w-8 text-primary" />
					</div>
					<CardTitle className="text-2xl font-bold text-center">
						Join {configs.site_title}
					</CardTitle>
					<CardDescription className="text-center">
						Create your account to start managing events
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>
									{'data' in error &&
									error.data &&
									typeof error.data === 'object' &&
									'message' in error.data
										? String(error.data.message)
										: 'Registration failed. Please try again.'}
								</AlertDescription>
							</Alert>
						)}

						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your full name"
								{...register('name')}
								className={errors.name ? 'border-red-500' : ''}
							/>
							{errors.name && (
								<p className="text-sm text-red-500">
									{errors.name.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								{...register('email')}
								className={errors.email ? 'border-red-500' : ''}
							/>
							{errors.email && (
								<p className="text-sm text-red-500">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									{...register('password')}
									className={errors.password ? 'border-red-500' : ''}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</div>
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="photo_url">Photo URL</Label>
							<Input
								id="photo_url"
								type="url"
								placeholder="Enter your photo URL"
								{...register('photo_url')}
								className={errors.photo_url ? 'border-red-500' : ''}
							/>
							{errors.photo_url && (
								<p className="text-sm text-red-500">
									{errors.photo_url.message}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Creating account...' : 'Create Account'}
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{' '}
							<Link
								to="/login"
								className="font-medium text-primary hover:underline"
							>
								Sign in
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
